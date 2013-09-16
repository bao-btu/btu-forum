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

class vB5_Route_Legacy_Forumhome extends vB5_Route_Legacy
{
	protected $prefix = 'forum.php';
	
	protected function getNewRouteInfo()
	{
		$forumHomeChannel = vB_Library::instance('content_channel')->getForumHomeChannel();
		return $forumHomeChannel['routeid'];
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
