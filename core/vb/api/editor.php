<?php

/**
 * vB_Api_Editor
 *
 * @package vBApi
 * @access public
 */
class vB_Api_Editor extends vB_Api
{

	/*
	 * Smiley Locations
	 */
	protected $smilieImages = array();

	/*
	 * Smiley Titles
	 */
	protected $smilieDescriptions = array();

	/*
	 * Smiley Categories
	 */
	protected $smilieCategories = array();

	protected $smilieData = null;

	protected function __construct()
	{
		parent::__construct();
	}

	/**
	 * Returns the array of custom bbcode info
	 *
	 * @return	array
	 */
	public function fetchCustomBbcode()
	{
		$bbcodeCache = vB::getDatastore()->get_value('bbcodecache');
		$data = array();
		if ($bbcodeCache)
		{
			foreach ($bbcodeCache AS $bbcode)
			{
				if ($bbcode['buttonimage'] != '')
				{
					$data[] = array(
						'title'       => $bbcode['title'],
						'bbcodetag'   => $bbcode['bbcodetag'],
						'buttonimage' => $bbcode['buttonimage'],
						'twoparams'   => $bbcode['twoparams'],
					);
				}
			}
		}

		return $data;
	}

	/**
	 * Returns the array of smilie info
	 *
	 * @return 	array	The icons
	 */
	public function fetchSmilies()
	{
		// if smilieData is set then addSmilie has also been called
		if ($this->smilieData !== null)
		{
			return $this->smilieData;
		}

		$this->smilieData = array();

		$options = vB::getDatastore()->get_value('options');

		if (!$options['wysiwyg_smtotal'])
		{
			return $this->smilieData;
		}

		$smilies = vB::get_db_assertor()->assertQuery('vBForum:fetchImagesSortedLimited',
			array(
				vB_dB_Query::TYPE_KEY => vB_dB_Query::QUERY_METHOD,
				'table'                       => 'smilie',
				vB_dB_Query::PARAM_LIMITSTART => 0,
				vB_dB_Query::PARAM_LIMIT      => $options['wysiwyg_smtotal'],
			)
		);
		if ($smilies AND $smilies->valid())
		{
			foreach ($smilies AS $smilie)
			{
				$this->addSmilie($smilie);
			}

			$this->smilieData = array(
				'images'        => $this->smilieImages,
				'descriptions'  => $this->smilieDescriptions,
				'categories'    => $this->smilieCategories,
			);
		}

		return $this->smilieData;
	}

	/**
	 * Add smilie to array and build categories in the process
	 *
	 * @param	mixed	Output to write
	 */
	protected function addSmilie($smilie)
	{
		static $prevcat = '';

		$this->smilieImages[$smilie['smilieid']] = $smilie['smiliepath'];
		$this->smilieDescriptions[$smilie['smilieid']] = vB_String::htmlSpecialCharsUni($smilie['title'] . ' ' . $smilie['smilietext']);

		if ($prevcat != $smilie['category'])
		{
			$prevcat = $this->smilieCategories[$smilie['smilieid']] = $smilie['category'];
		}
		else
		{
			$this->smilieCategories[$smilie['smilieid']] = '';
		}
	}

	/**
	 * Returns a hierarchical array of smilie data for displaying the smilies panel.
	 *
	 * @return 	array	The smilies
	 */
	public function fetchAllSmilies()
	{
		$smilies = vB::get_db_assertor()->getRows('vBForum:fetchImagesSortedLimited',
			array(
				vB_dB_Query::TYPE_KEY => vB_dB_Query::QUERY_METHOD,
				'table' => 'smilie',
			)
		);

		$options = vB::getDatastore()->get_value('options');

		$smilieInfo = array();
		$previewSmilies = array();
		$previewCount = 0;
		$smilieCount = 0;

		foreach ($smilies AS $smilie)
		{
			if (!isset($smilieInfo[$smilie['category']]))
			{
				$smilieInfo[$smilie['category']] = array();
			}

			$smilieInfo[$smilie['category']][$smilie['smilieid']] = array(
				'image' => $smilie['smiliepath'],
				'description' => vB_String::htmlSpecialCharsUni($smilie['title'] . ' ' . $smilie['smilietext']),
			);
			++$smilieCount;

			if ($previewCount < $options['wysiwyg_smtotal'])
			{
				$previewSmilies[$smilie['smilieid']] = $smilieInfo[$smilie['category']][$smilie['smilieid']];
			}
			++$previewCount;
		}

		return array(
			'categories' => $smilieInfo,
			'previewSmilies' => $previewSmilies,
			'categoryCount' => count($smilieInfo),
			'smilieCount' => $smilieCount,
			'previewCount' => count($previewSmilies),
			'moreSmilies' => ($smilieCount > count($previewSmilies)),
		);
	}

	/**
	 * Convert CKEditor HTML into bbcode
	 * - Received from editor mode switch to source
	 *
	 * @param	string	HTML text
	 *
	 * @return	string	BBcode text
	 */
	public function convertHtmlToBbcode($data)
	{
		return array('data' => vB_Api::instanceInternal('bbcode')->parseWysiwygHtmlToBbcode($data));
	}

	/**
	 * Fetch list of supported video types
	 *
	 * @return	array	List of providers and associated urls
	 */
	public function fetchVideoProviders()
	{
		$bbcodes = vB::getDbAssertor()->assertQuery('bbcode_video', array(
				vB_dB_Query::TYPE_KEY => vB_dB_Query::QUERY_SELECT
			),
			array('field' => array('priority'), 'direction' => array(vB_dB_Query::SORT_ASC))
		);

		$codes = array();
		foreach ($bbcodes AS $bbcode)
		{
			$codes[$bbcode['provider']] = $bbcode['url'];
		}
		return array('data' => $codes);
	}

	/**
	 * Save autosave data from editor
	 *
	 */
	public function autosave($nodeid, $parentid, $mode, $pagetext)
	{
		$options = vB::getDatastore()->get_value('options');
		if (!$options['autosave'])
		{
			return false;
		}

		// User must be logged in
		if (!vB::getCurrentSession()->get('userid'))
		{
			return false;
		}

		if ($mode != 'source')
		{
			$pagetext = vB_Api::instanceInternal('bbcode')->parseWysiwygHtmlToBbcode($pagetext);
		}

		/*replace query*/
		vB::getDbAssertor()->replace('vBForum:autosavetext', array(
			'nodeid'   => intval($nodeid),
			'parentid' => intval($parentid),
			'userid'   => vB::getCurrentSession()->get('userid'),
			'pagetext' => $pagetext,
			'dateline' => vB::getRequest()->getTimeNow()
		));

		return true;
	}

	/**
	 * Discard autosave text
	 *
	 */
	public function discardAutosave($nodeid, $parentid)
	{
		// User must be logged in
		if (!vB::getCurrentSession()->get('userid'))
		{
			throw new vB_Exception_Api('no_permission');
		}

		/*delete query*/
		vB::getDbAssertor()->delete('vBForum:autosavetext', array(
			'nodeid'   => intval($nodeid),
			'parentid' => intval($parentid),
			'userid'   => vB::getCurrentSession()->get('userid')
		));
	}

	/**
	 * Retrieve Autoload Text
	 */
	public function fetchAutoLoadText($parentid, $nodeid)
	{
		$options = vB::getDatastore()->get_value('options');
		if (!$options['autosave'])
		{
			return false;
		}

		if (!vB::getCurrentSession()->get('userid'))
		{
			return false;
		}

		$row = vB::get_db_assertor()->getRow('vBForum:autosavetext',
			array(
				'nodeid'   => intval($nodeid),
				'parentid' => intval($parentid),
				'userid'   => vB::getCurrentSession()->get('userid')
			)
		);

		return $row;
	}
}
