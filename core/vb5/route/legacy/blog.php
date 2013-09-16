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

class vB5_Route_Legacy_Blog extends vB5_Route_Legacy_Node
{
	protected $idkey = array('u', 'userid');

	protected $prefix = 'blog.php';

	protected function getNewRouteInfo()
	{
		// go to home page if path is exactly like prefix
		if (count($this->matches) == 1 AND empty($this->queryParameters))
		{
			$blogHomeChannelId = vB_Api::instance('blog')->getBlogChannel();
			$blogHomeChannel = vB_Library::instance('content_channel')->getContent($blogHomeChannelId);
			$blogHomeChannel = $blogHomeChannel[$blogHomeChannelId];
			return $blogHomeChannel['routeid'];
		}
		$this->oldcontenttypeid = vB_Api_ContentType::OLDTYPE_BLOGCHANNEL;
		return parent::getNewRouteInfo();
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
