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

class vB5_Route_Legacy_Subscription extends vB5_Route_Legacy
{
	protected $prefix = 'subscription.php';
	
	protected function getNewRouteInfo()
	{
		if ($session = vB::getCurrentSession())
		{
			$userid = $session->get('userid');
		}

		if (empty($userid))
		{
			throw new vB_Exception_404('invalid_page');
		}
		
		$this->arguments['userid'] = $userid;
		$this->arguments['tab'] = 'subscriptions';
		return 'subscription';
	}
	
	public function getRedirect301()
	{
		$data = $this->getNewRouteInfo();
		$this->queryParameters = array();
		return $data;
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/
