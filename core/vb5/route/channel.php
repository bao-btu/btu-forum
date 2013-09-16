<?php

/* ======================================================================*\
  || #################################################################### ||
  || # vBulletin 5.0.3
  || # ---------------------------------------------------------------- # ||
  || # Copyright  2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
  || # This file may not be redistributed in whole or significant part. # ||
  || # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
  || # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
  || #################################################################### ||
  \*====================================================================== */

class vB5_Route_Channel extends vB5_Route
{
	public function __construct($routeInfo, $matches, $queryString = '', $anchor = '')
	{
		parent::__construct($routeInfo, $matches, $queryString);

		if (isset($this->arguments['channelid']))
		{
			if (! vB::getUserContext()->getChannelPermission('forumpermissions', 'canview', $this->arguments['channelid']))
			{
				throw new vB_Exception_NodePermission($this->arguments['channelid']);
			}
			// check if we need to force a styleid
			$channel = vB_Library::instance('Content_Channel')->getContent($this->arguments['channelid']);
			if (is_array($channel))
			{
				$channel = array_pop($channel);
			}

			if (!empty($channel['styleid']))
			{
				$forumOptions = vB::getDatastore()->getValue('bf_misc_forumoptions');
				if($channel['options']['styleoverride'])
				{
					// the channel must force the style
					$this->arguments['forceStyleId'] = $channel['styleid'];
				}
				else
				{
					// the channel suggests to use this style
					$this->arguments['routeStyleId'] = $channel['styleid'];
				}
			}

			if(!empty($this->queryParameters))
			{
				$this->arguments['noindex'] = 1;
			}

			// styleid for channels are not final at this point, so let's not include them in the key
			$this->setPageKey('pageid', 'channelid');

			// set user action
			$this->setUserAction('viewing_forum_x', $channel['title'], $this->getFullUrl('nosession|fullurl'));

			// remove link from last crumb
			$this->breadcrumbs[(count($this->breadcrumbs) - 1)]['url'] = '';
		}
	}
	
	/**
	 * Verifies the channel prefix from a title or a url identifier and the parent channel.
	 * 
	 * @param	array	The data we are using to create the channel
	 */
	public static function validatePrefix($data)
	{
		// see self::validInput
		if (!isset($data['prefix']))
		{
			//use urlident if we have it.
			if (empty($data['urlident']))
			{
				$url = self::createPrefix($data['parentid'], $data['title'], false);
			}
			else
			{
				$url = self::createPrefix($data['parentid'], $data['urlident'], true);
			}
			$data['prefix'] = $data['regex'] = $url;
		}
		else
		{
			$data['regex'] = $data['prefix'];
		}
		
		// this will return an exception is prefix/regex is invalid
		parent::validInput($data);
	}

	/**
	 * Create the channel prefix from a title or a url identifier and the parent channel.
	 * 
	 * @param	int		The channel id of the parent channel.
	 * @param	string	The title (or url identifier) of this channel
	 * @param	bool	If true, $title is treated as if it's already been turned into a url identifier (already url safe, already utf-8)
	 * 
	 * @return	string	The prefix of the title combined with the parent's prefix. (UTF-8 encoded)
	 */
	public static function createPrefix($parentId, $title, $isUrlIdent)
	{
		$channelApi = vB_Api::instanceInternal('content_channel');
		$parentChannel = $channelApi->fetchChannelById($parentId);
		$parentUrl = self::buildUrl("{$parentChannel['routeid']}|nosession");

		if ($parentUrl AND $parentUrl{0} == '/')
		{
			$parentUrl = substr($parentUrl, 1);
		}

		$url = '';
		if (!empty($parentUrl))
		{
			$url .= $parentUrl . '/';
			if (strtolower(vB_String::getCharset()) != 'utf-8')
			{
				// buildUrl will return an encoded url in this case.
				$url = urldecode($url);
			}
		}
		
		if ($isUrlIdent)
		{
			$url .= self::prepareUrlIdent($title);
		}
		else
		{
			$url .= self::prepareTitle($title);
		}

		return $url;
	}

	protected static function validInput(array &$data)
	{
		// ignore page number
		unset($data['pagenum']);
		
		if (isset($data['channelid']))
		{
			$data['nodeid'] = $data['channelid'];
			unset($data['channelid']);
		}

		if (
				!isset($data['nodeid']) OR !is_numeric($data['nodeid']) OR
				!isset($data['pageid']) OR !is_numeric($data['pageid']) // this is used for rendering the page
		)
		{
			return FALSE;
		}
		$data['nodeid'] = intval($data['nodeid']);
		$data['pageid'] = intval($data['pageid']);

		if (!isset($data['prefix']))
		{
			$newChannel = vB_Library::instance('node')->getNodeBare($data['nodeid']);

			//use urlident if we have it.
			if (empty($data['urlident']))
			{
				$url = self::createPrefix($newChannel['parentid'], $newChannel['title'], false);
			}
			else
			{
				$url = self::createPrefix($newChannel['parentid'], $newChannel['urlident'], true);
			}
			$data['prefix'] = $url;
		}
		
		$data['regex'] = preg_quote($data['prefix']) . '(?:/page(?P<pagenum>[0-9]+))?';

		$data['class'] = __CLASS__;
		$data['controller'] = 'page';
		$data['action'] = 'index';
		$data['arguments'] = serialize(array(
			'channelid' => $data['nodeid'], 
			'nodeid' => $data['nodeid'], 
			'pagenum'	=> '$pagenum',
			'pageid' => $data['pageid']));
		// this field will be used to delete the route when deleting the channel (contains channel id)
		$data['contentid'] = $data['nodeid'];

		unset($data['nodeid']);
		unset($data['pageid']);

		return parent::validInput($data);
	}

	protected static function updateContentRoute($oldRouteInfo, $newRouteInfo)
	{
		$db = vB::getDbAssertor();
		$events = array();

		// update redirect301 fields
		$updateIds = $db->assertQuery('get_update_route_301', array('oldrouteid' => $oldRouteInfo['routeid']));
		
		if (!empty($updateIds))
		{
			$routeIds = array();
			foreach($updateIds AS $route)
			{
				$routeid = $route['routeid'];
				$events[] = "routeChg_$routeid";
				$routeIds[] = $routeid;
			}
			
			$db->update('routenew', array('redirect301' => $newRouteInfo['routeid'], 'name' => ''), array('routeid' => $routeIds));
		}

		// update routeid in nodes table
		$updateIds = $db->assertQuery('vBForum:node', array(
			vB_dB_Query::TYPE_KEY => vB_dB_Query::QUERY_SELECT,
			vB_dB_Query::COLUMNS_KEY => array('nodeid'),
			vB_dB_Query::CONDITIONS_KEY => array('routeid' => $oldRouteInfo['routeid']),
		));
		
		if (!empty($updateIds))
		{
			$nodeIds = array();
			foreach($updateIds AS $node)
			{
				$nodeid = $node['nodeid'];
				// this does not affect parents, so we don't need to clear they cache
				$events[] = "nodeChg_$nodeid";
				$nodeIds[] = $nodeid;
			}
			$db->update('vBForum:node', array('routeid' => $newRouteInfo['routeid']), array('nodeid' => $nodeIds));
		}
		
		// don't modify the routeid for default pages, as it will still be used
		$updateIds = $db->assertQuery('page', array(
			vB_dB_Query::TYPE_KEY => vB_dB_Query::QUERY_SELECT,
			vB_dB_Query::COLUMNS_KEY => array('pageid'),
			vB_dB_Query::CONDITIONS_KEY => array('routeid' => $oldRouteInfo['routeid'], 'pagetype' => vB_Page::TYPE_CUSTOM),
		));
		
		if (!empty($updateIds))
		{
			$pageIds = array();
			foreach($updateIds AS $page)
			{
				$pageid = $page['pageid'];
				$events[] = "pageChg_$pageid";
				$pageIds[] = $pageid; 
			}
			$db->update('page', array('routeid' => $newRouteInfo['routeid']), array('pageid' => $pageIds));
		}
		
		// update conversation generic route
		$routes = $db->getRows('routenew', array(
					vB_dB_Query::TYPE_KEY => vB_dB_Query::QUERY_SELECT,
					vB_dB_Query::CONDITIONS_KEY => array(
						array('field'=>'class',		'value'=>'vB5_Route_Conversation'),
						array('field'=>'prefix',	'value'=>$oldRouteInfo['prefix']),
						array('field'=>'contentid',	'value'=>$oldRouteInfo['channelid']),
						array('field'=>'redirect301', 'operator' => vB_dB_Query::OPERATOR_ISNULL)
					)
				));
		foreach ($routes AS $route)
		{
			$events[] = "routeChg_{$route['routeid']}";
			
			$db->update(
				'routenew',
				array(
					'prefix'	=> $newRouteInfo['prefix'],
					'regex'		=> str_replace($oldRouteInfo['prefix'], $newRouteInfo['prefix'], $route['regex'])
				),
				array('routeid' => $route['routeid'])
			);
		}
		
		vB_Cache::allCacheEvent($events);
	}

	public function getUrl()
	{
		$url = '/' . $this->prefix;
		
		if (isset($this->arguments['pagenum']) AND is_numeric($this->arguments['pagenum']) AND $this->arguments['pagenum']>1)
		{
			$url .= '/page' . intval($this->arguments['pagenum']);
		}
		
		if (strtolower(vB_String::getCharset()) != 'utf-8')
		{
			$url = vB_String::encodeUtf8Url($url);
		}
		
		return $url;
	}

	public function getCanonicalRoute()
	{
		if (!isset($this->canonicalRoute))
		{
			if (empty($this->arguments['channelid']))
			{
				return array();
			}
			
			$node = vB_Library::instance('node')->getNodeBare($this->arguments['channelid']);
			$data = array();
			
			if (isset($this->arguments['pagenum']) AND is_numeric($this->arguments['pagenum']) AND $this->arguments['pagenum']>1)
			{
				$data['pagenum'] = $this->arguments['pagenum'];
			}
			
			$this->canonicalRoute = self::getRoute($node['routeid'], $data, $this->queryParameters);
		}

		return $this->canonicalRoute;
	}

	public static function exportArguments($arguments)
	{
		$data = unserialize($arguments);

		$channel = vB::getDbAssertor()->getRow('vBForum:channel', array('nodeid' => $data['channelid']));
		if (empty($channel))
		{
			throw new Exception('Couldn\'t find channel');
		}
		$data['channelGuid'] = $channel['guid'];
		unset($data['channelid']);

		$page = vB::getDbAssertor()->getRow('page', array('pageid' => $data['pageid']));
		if (empty($page))
		{
			throw new Exception('Couldn\'t find page');
		}
		$data['pageGuid'] = $page['guid'];
		unset($data['pageid']);

		return serialize($data);
	}

	public static function importArguments($arguments)
	{
		$data = unserialize($arguments);

		$channel = vB::getDbAssertor()->getRow('vBForum:channel', array('guid' => $data['channelGuid']));
		if (empty($channel))
		{
			throw new Exception('Couldn\'t find channel');
		}
		$data['channelid'] = $channel['nodeid'];
		unset($data['channelGuid']);

		$page = vB::getDbAssertor()->getRow('page', array('guid' => $data['pageGuid']));
		if (empty($page))
		{
			throw new Exception('Couldn\'t find page');
		}
		$data['pageid'] = $page['pageid'];
		unset($data['pageGuid']);

		return serialize($data);
	}

	public static function importContentId($arguments)
	{
		return $arguments['channelid'];
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
