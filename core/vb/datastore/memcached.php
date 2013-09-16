<?php
/**
* Class for fetching and initializing the vBulletin datastore from a Memcache Server
*
* @package	vBulletin
* @version	$Revision: 37901 $
* @date		$Date: 2010-07-14 19:28:12 -0300 (Wed, 14 Jul 2010) $
*/
class vB_Datastore_Memcached extends vB_Datastore
{
	/**
	* The Memcache object
	*
	* @var	Memcache
	*/
	protected $memcache = null;

	/**
	* To prevent locking when the memcached has been restarted we want to use add rather than set
	*
	* @var	boolean
	*/
	protected $memcache_set = true;

	/**
	* Indicates if the result of a call to the register function should store the value in memory
	*
	* @var	boolean
	*/
	protected $store_result = false;

	public function __construct(&$config, &$db_assertor)
	{
		parent::__construct($config, $db_assertor);
		if (!empty($config['Cache']['memcacheprefix']))
		{
			$this->prefix = & $config['Cache']['memcacheprefix'];
		}
		
		$this->memcache = vB_Memcache::instance();
	}
	
	public function resetCache()
	{
		$this->memcache->flush();
	}

	/**
	* Fetches the contents of the datastore from a Memcache Server
	*
	* @param	array	Array of items to fetch from the datastore
	*
	* @return	void
	*/
	public function fetch($items)
	{
		if (!sizeof($items = $this->prepare_itemarray($items)))
		{
			return;
		}

		$check = $this->memcache->connect();

		if ($check == 3)
		{ // Connection failed
			return parent::fetch($items); 
		}
		
		$this->memcache_set = false;

		$unfetched_items = array();
		foreach ($items AS $item)
		{
			$this->do_fetch($item, $unfetched_items);
		}

		$this->store_result = true;

		// some of the items we are looking for were not found, lets get them in one go
		if (!empty($unfetched_items))
		{
			if($this->prefix)
			{ // Remove any prefix for datastore call
				foreach ($unfetched_items as &$data)
				{ 
					if (strpos($data, $this->prefix) === 0)
					{
					$data = substr_replace($data, '', 0, strlen($this->prefix));
					}
				}
				unset($data);
			}

			if (!($result = $this->do_db_fetch($this->prepare_itemlist($unfetched_items))))
			{
				$this->memcache_set = true;
				return false;
			}
		}

		$this->memcache_set = true;

		$this->store_result = false;

		$this->check_options();

		$this->memcache->close();
		return true;
	}

	/**
	* Fetches the data from shared memory and detects errors
	*
	* @param	string	title of the datastore item
	* @param	array	A reference to an array of items that failed and need to fetched from the database
	*
	* @return	boolean
	*/
	protected function do_fetch($title, &$unfetched_items)
	{
		$ptitle = $this->prefix . $title;

		if (($data = $this->memcache->get($ptitle)) === false)
		{ 
			// appears its not there, lets grab the data
			$unfetched_items[] = $title;
			return false;
		}

		$this->register($title, $data);
		return true;
	}

	/**
	* Sorts the data returned from the cache and places it into appropriate places
	*
	* @param	string	The name of the data item to be processed
	* @param	mixed	The data associated with the title
	*
	* @return	void
	*/
	protected function register($title, $data, $unserialize_detect = 2)
	{
		if ($this->store_result === true)
		{
			$this->storeMemcache($title, $data);
		}
		parent::register($title, $data, $unserialize_detect);
	}

	/**
	* Updates the appropriate cache file
	*
	* @param	string	title of the datastore item
	*
	* @return	void
	*/
	public function build($title = '', $data = '', $unserialize = 0)
	{
		parent::build($title, $data, $unserialize);

		$this->storeMemcache($title, $data);
	}
	
	protected function storeMemcache($title, $data)
	{
		$check = $this->memcache->connect();

		if ($check == 3)
		{ 
			// Connection failed
			trigger_error('Unable to connect to memcache server', E_USER_ERROR);
		}

		$ptitle = $this->prefix . $title;

		if ($this->memcache_set)
		{
			$this->memcache->set($ptitle, $data);
		}
		else
		{
			$this->memcache->add($ptitle, $data);
		}
		
		// if we caused the connection above, then close it
		if ($check == 1)
		{
			$this->memcache->close();
		}
	}
}
