<?php

/* ======================================================================*\
  || #################################################################### ||
  || # vBulletin 5.0.3
  || # ---------------------------------------------------------------- # ||
  || # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
  || # This file may not be redistributed in whole or significant part. # ||
  || # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
  || # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
  || #################################################################### ||
  \*====================================================================== */

class vB5_Route_PrivateMessage_Subscribers extends vB5_Route_PrivateMessage_List
{
	protected $subtemplate = 'privatemessage_subscribers';

	public function __construct(&$routeInfo, &$matches, &$queryString = '')
	{
		$this->overrideDisable = true;
		parent::__construct($routeInfo, $matches, $queryString);
	}

	public function getBreadcrumbs()
	{
		$breadcrumbs = array(
			array(
				'phrase' => 'inbox',
				'url'	=> vB5_Route::buildUrl('privatemessage|nosession')
			),
			array(
				'phrase' => 'subscribers',
				'url' => ''
			)
		);

		return $breadcrumbs;
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
