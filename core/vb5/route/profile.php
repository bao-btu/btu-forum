<?php

/* ======================================================================*\
  || #################################################################### ||
  || # vBulletin 5.0.3
  || # ---------------------------------------------------------------- # ||
  || # Copyright ©2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
  || # This file may not be redistributed in whole or significant part. # ||
  || # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
  || # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
  || #################################################################### ||
  \*====================================================================== */

class vB5_Route_Profile extends vB5_Route
{
	const DEFAULT_PREFIX = 'member';
	const REGEXP = '(?P<userid>[0-9]+)(?P<username>(-[^\?/]*)*)(?:/(?P<tab>media))?';

	public function __construct($routeInfo, $matches, $queryString = '', $anchor = '')
	{
		parent::__construct($routeInfo, $matches, $queryString, $anchor);

		// if we don't have a numeric userid at this point, make it 0
		$this->arguments['userid'] = isset($this->arguments['userid']) ? intval($this->arguments['userid']) : 0;

		$userInfo = vB_User::fetchUserinfo($this->arguments['userid']);
		$this->arguments['username'] = $userInfo['username'];
		$this->arguments['titleprefix'] = $userInfo['username'];

		/*
		 * WE ARE CURRENTLY ALLOWING IGNORED USERS TO SEE THE PROFILE
		$currentUser = vB::getCurrentSession()->get('userid');
		$ignoreList = explode(',', $userInfo['ignorelist']);
		array_walk($ignoreList, 'intval');
		if ($currentUser != $userInfo['userid'] AND in_array($currentUser, $ignoreList))
		{
			throw new vB_Exception_NodePermission('profile');
		}
		 */

		$this->setPageKey('pageid', 'userid');
		$this->setUserAction('viewing_user_profile', $this->arguments['username'], $this->getFullUrl('nosession|fullurl'));
	}

	/**
	* Sets the breadcrumbs for the route
	*/
	protected function setBreadcrumbs()
	{
		$this->breadcrumbs = array(
			0 => array(
				'title' => $this->arguments['username'],
				'url'	=> ''
			),
		);
	}

	protected static function validInput(array &$data)
	{
		if (
			!isset($data['pageid'])
			OR !is_numeric($data['pageid'])
			OR !isset($data['prefix'])
		)
		{
			return FALSE;
		}
		$data['pageid'] = intval($data['pageid']);

		$data['prefix'] = $data['prefix'];
		$data['regex'] = $data['prefix'] . '/' . self::REGEXP;
		$data['arguments'] = serialize(array(
			'userid'	=> '$userid',
			'pageid'	=> $data['pageid'],
			'tab'		=> '$tab'
		));

		$data['class'] = __CLASS__;
		$data['controller']	= 'page';
		$data['action']		= 'index';
		// this field will be used to delete the route when deleting the channel (contains channel id)

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
		
		vB_Cache::allCacheEvent($events);
	}

	public function getUrl()
	{
		if (!empty($this->arguments['userid']) AND !empty($this->arguments['username']))
		{
			$result = '/' . $this->prefix . '/' . $this->arguments['userid'] . '-' . vB_String::getUrlIdent($this->arguments['username']);
		}
		else if (empty($this->arguments['userid']))
		{
			return false;
		}
		else
		{
			$user = vB_User::fetchUserinfo($this->arguments['userid']);

			if (!$user)
			{
				return false;
			}

			$result = '/' . $this->prefix . '/' . $this->arguments['userid'] . '-' . vB_String::getUrlIdent($user['username']);
		}

		if (isset($this->arguments['tab']) AND $this->arguments['tab']=='media')
		{
			$result .= '/media';
		}

		if (strtolower(vB_String::getCharset()) != 'utf-8')
		{
			$result = vB_String::encodeUtf8Url($result);
		}

		return $result;
	}

	public function  getCanonicalRoute()
	{
		if (!isset($this->canonicalRoute))
		{
			$cache = vB_Cache::instance(vB_Cache::CACHE_FAST);
			$hashKey = 'routepageid_' . $this->arguments['pageid'];
			$page = $cache->read($hashKey);
			if (empty($page))
			{
				$page = vB::getDbAssertor()->getRow('page', array('pageid' => $this->arguments['pageid']));
				$cache->write($hashKey, $page, 1440, 'routepageid_Chg_' . $this->arguments['pageid']);
			}
			$this->canonicalRoute = self::getRoute($page['routeid'], $this->arguments, $this->queryParameters);
		}

		return $this->canonicalRoute;
	}

	public static function exportArguments($arguments)
	{
		$data = unserialize($arguments);

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

		$page = vB::getDbAssertor()->getRow('page', array('guid' => $data['pageGuid']));
		if (empty($page))
		{
			throw new Exception('Couldn\'t find page');
		}
		$data['pageid'] = $page['pageid'];
		unset($data['pageGuid']);

		return serialize($data);
	}

	protected static function getHashKey($options = array(), $data = array(), $extra = array())
	{
		$routeId = array_shift($options);
		$hashKey = 'vbRouteURL_'. $routeId;
		if (!empty($data['userid']))
		{
			$hashKey = 'vbRouteURL_'. $routeId . '_' . $data['userid'];
		}
		elseif(!empty($data['username']))
		{
			$hashKey = 'vbRouteURL_'. $routeId . '_' . $data['username'];
		}
		return $hashKey;
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
