<?php

class Api_Interface_Light extends Api_Interface_Collapsed
{
	/**  This enables a light session. The main issue is that we skip testing control panel, last activity, and shutdown queries.
	 *
	 *
	 */
	public function init()
	{
		if ($this->initialized)
		{
			return true;
		}

		//initialize core
		$core_path = vB5_Config::instance()->core_path;
		require_once($core_path . '/vb/vb.php');
		vB::init();

		//todo -- this is a hack to communicate the base url to the core for links and redirects.
		$_SERVER['x-vb-presentation-base'] = vB5_Config::instance()->baseurl;
		$request = new vB_Request_WebApi();
		vB::setRequest($request);
		$config = vB5_Config::instance();
		$cookiePrefix = $config->cookie_prefix;

		if (empty($_COOKIE[$cookiePrefix . 'sessionhash']))
		{
			$sessionhash = false;
		}
		else
		{
			$sessionhash = $_COOKIE[$cookiePrefix . 'sessionhash'];
		}

		if (empty($_COOKIE[$cookiePrefix . 'cpsession']))
		{
			$cphash = false;
		}
		else
		{
			$cphash = $_COOKIE[$cookiePrefix . 'cpsession'];
		}
		vB_Api_Session::startSessionLight($sessionhash, $cphash);
		$this->initialized = true;
	}

}
