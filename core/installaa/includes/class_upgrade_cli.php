<?php
/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 5.0.3
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2013 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| # http://www.vbulletin.com | http://www.vbulletin.com/license.html # ||
|| #################################################################### ||
\*======================================================================*/

if (!isset($GLOBALS['vbulletin']->db))
{
	exit(1);
}

class vB_Upgrade_Cli extends vB_Upgrade_Abstract
{
	/*Constants=====================================================================*/

	/*Properties====================================================================*/
	/**
	* The vBulletin registry object
	*
	* @var	vB_Registry
	*/
	protected $registry = null;

	/**
	* The object that will be used to execute queries
	*
	* @var	vB_Database
	*/
	protected $db = null;

	/**
	* vB_Upgrade Object
	*
	* @var vB_Upgrade
	*/
	protected $upgrade = null;

	/**
	* Identifier for this library
	*
	* @var	string
	*/
	protected $identifier = 'cli';

	/**
	* Limit Step Queries
	*
	* @var	boolean
	*/
	protected $limitqueries = false;

	/**
    * Location of the CLI config file relative to the site root
    * @var string
    */
   	private static $cli_config_file = "includes/config_cli.php";

   	/**
	 *
	 * @var array
	 */
	private static $config_cli = null;

	/**
	* Constructor.
	*
	* @param	vB_Registry	Reference to registry object
	*/
	public function __construct(&$registry, $phrases, $setuptype = 'upgrade', $version = null)
	{
		parent::__construct($registry, $phrases, $setuptype, $version);
	}

	/**
	* Stuff to setup specific to Ajax upgrading - executes after upgrade has been established
	*
	*/
	protected function init($script)
	{
		define('SUPPRESS_KEEPALIVE_ECHO', true);

		parent::init($script);

		if (!empty($this->startup_errors))
		{
			$this->echo_phrase("\r\n");
			foreach ($this->startup_errors AS $error)
			{
				$this->echo_phrase("$error\r\n");
			}
			die();
		}

		// Where does this upgrade need to begin?
		if ($script)
		{
			$this->scriptinfo['version'] = $script;
		}
		else
		{
			$this->scriptinfo = $this->get_upgrade_start();
		}
		$this->process_script($this->scriptinfo['version'], $script);
		exit(0);
	}

	/**
	* Echo a phrase after converting to console charset
	*
	* @var	string	Phrase to do charset conversion on for
	*
	*/
	private function echo_phrase($string)
	{
		if (strtoupper(substr(PHP_OS, 0, 3)) == 'WIN')
		{
			echo to_charset($string, 'ISO-8859-1', 'IBM850');
		}
		else
		{
			echo $string;
		}
	}

	/**
	*	Attempt to make a standard phrase, with HTML markup, useable by the CLI system
	*
	*	@var	string	Phrase to do HTML rudimentery replacement on
	*
	* @return string
	*/
	private function convert_phrase($phrase)
	{
		$phrase = str_replace('\r\n', "\r\n", $phrase);
		$search = array(
			'#<br\s+/?>#i',
			'#</p>#i',
			'#<p>#i',
		);
		$replace = array(
			"\r\n",
			"",
			"\r\n",
		);
		$phrase = strip_tags(preg_replace($search, $replace, $phrase));
		if (!(preg_match("#\r\n$#si", $phrase)))
		{
			$phrase .= "\r\n";
		}

		return $phrase;
	}

	/**
	* Process a script
	*
	* @var	string	script version
	* @var	string	execute a single script
	*/
	protected function process_script($version, $singlescript = false)
	{
		$script = $this->load_script($version);

		if (!$this->verify_version($version, $script))
		{
			if ($version == 'final')
			{
				end($this->versions);
				$version = key($this->versions);
			}
			$response = $this->prompt(sprintf($this->phrase['core']['wrong_version_cli'], $this->versions[$version], $this->registry->options['templateversion']), array('1','2'));
		}

		if (!$response OR $response == 1)
		{
			$startstep = isset($this->scriptinfo['step']) ? $this->scriptinfo['step'] : 1;
			$endstep = $script->stepcount;

			$this->echo_phrase("\r\n");
			if (in_array($this->scriptinfo['version'], $this->endscripts))
			{
				$this->echo_phrase($this->convert_phrase($this->phrase['core']['processing_' . $this->scriptinfo['version']]));
			}
			else
			{
				// <!-- "upgradeing" is a purposeful typo -->
				$this->echo_phrase($this->convert_phrase(sprintf($this->phrase['core']['upgradeing_to_x'], $script->LONG_VERSION)));
			}
			$this->echo_phrase("----------------------------------\r\n");

			if ($endstep)
			{
				for ($x = $startstep; $x <= $endstep; $x++)
				{
					$this->echo_phrase(sprintf($this->phrase['core']['step_x'], $x));
					$this->execute_step($x, $script);
					$script->log_upgrade_step($x);
				}
			}
			else
			{
				$script->log_upgrade_step(0);
			}
			$this->echo_phrase($this->convert_phrase($this->phrase['core']['upgrade_complete']));
			$version = $script->SHORT_VERSION;
		}
		else
		{
			$version = $this->fetch_short_version($this->registry->options['templateversion']);
		}

		if ($endstep)
		{
			$this->process_script_end();
		}

		if ($version == 'final' OR $singlescript)
		{
			if ($this->registry->options['storecssasfile'])
			{
				$this->echo_phrase($this->convert_phrase($this->phrase['core']['after_upgrade_cli']));
			}
			return;
		}

		$this->scriptinfo = $this->get_upgrade_start($version);
		$this->process_script($this->scriptinfo['version']);
	}

	/**
	* Executes the specified step
	*
	* @param	int			Step to execute
	* @param		object	upgrade script object
	* @param	boolen	Check if table exists for create table commands
	* @param	array		Data to send to step (startat, prompt results, etc)
	*
	*/
	public function execute_step($step, $script, $check_table = true, $data = null, $recurse = true)
	{
		$result = $script->execute_step($step, $check_table, $data);

		$output = false;
		if ($result['message'])
		{
			$count = 0;
			foreach ($result['message'] AS $message)
			{
				if (trim($message['value']))
				{
					$output = true;
					if ($count > 0)
					{
						$this->echo_phrase(str_pad('  ', strlen(sprintf($this->phrase['core']['step_x'], $step)), ' ', STR_PAD_LEFT));
					}
					$this->echo_phrase($this->convert_phrase($message['value']));
					$count++;
				}
			}
		}

		if ($result['error'])
		{
			foreach($result['error'] AS $error)
			{
				if ($error['fatal'])
				{
					switch ($error['code'])
					{
						case vB_Upgrade_Version::MYSQL_HALT:
							$this->echo_phrase("\r\n----------------------------------\r\n");
							$this->echo_phrase($error['value']['error']);
							$this->echo_phrase("\r\n----------------------------------\r\n");
							$this->echo_phrase($error['value']['message']);
							exit(2);
							break;
						case vB_Upgrade_Version::PHP_TRIGGER_ERROR:
							trigger_error($this->convert_phrase($error['value']), E_USER_ERROR);
							break;
						case vB_Upgrade_Version::APP_CREATE_TABLE_EXISTS:
							$response = $this->prompt(sprintf($this->phrase['core']['tables_exist_cli'], $error['value']), array('1',''));
							if ($response !== '1')
							{
								exit(2);
							}
							else
							{
								$this->execute_step($step, $script, false);
								if (!$output)
								{
									$output = true;
								}
							}
							break;
                        case vB_Upgrade_Version::CLI_CONF_USER_DATA_MISSING:
                            $this->echo_phrase("\r\n\r\n--- CLI_CONFIG_FILE_ERRORS: ---\r\n\r\n");
                            foreach ($error['value'] AS $key => $value)
                            {
                                $this->echo_phrase("\r\n- $value -\r\n");
                            }
                            exit(6);
                            break;
						default:
							break;
					}
				}
			}
		}

		if (!$output)
		{
			$this->echo_phrase("\r\n\r\n--- MISSING OUTPUT ---\r\n\r\n");
			exit(3);
		}

		if ($result['returnvalue']['startat'])
		{
			$script->log_upgrade_step($step, $result['returnvalue']['startat']);

			if ($recurse)
			{
				$args = $result['returnvalue'];
				do
				{
					$detailResult = $this->execute_step($step, $script, true, $args, FALSE);
					$args = $detailResult['returnvalue'];
				}
				while (!empty($detailResult['returnvalue']['startat']));
			}
			else
			{
				return $result;
			}
		}
		else if ($result['returnvalue']['prompt'])
		{
			$response = $this->prompt($result['returnvalue']['prompt']);
			$result = $this->execute_step($step, $script, true, array('response' => $response, 'startat' => $result['returnvalue']['startat']));
		}
		return $result;
	}

	/**
	* Output a command prompt
	*
	* @var	string	String to echo
	* @var	array		Accepted responses
	*
	* @return	string	Response value
	*/
	private function prompt($value, $responses = null)
	{
		do
		{
			$this->echo_phrase("\r\n----------------------------------\r\n");
			$this->echo_phrase($this->convert_phrase($value));
			$this->echo_phrase('>');
			$response = trim(@fgets(STDIN));
		}
		while (!empty($responses) AND is_array($responses) AND !in_array($response, $responses));

		$this->db->ping();

		return $response;
	}

	/**
    * Fetches database/system configuration file when called from CLI
    *
    */
	private static function fetch_config_cli()
	{
		// parse the config file
		if (file_exists(CWD . '/' . self::$cli_config_file))
		{
			include(CWD . '/' . self::$cli_config_file);
		}
		else
		{
			if(defined('STDIN')) exit(5);
			die('<br /><br /><strong>Configuration</strong>: includes/config_cli.php does not exist. Please fill out the data in config_cli.php.new and rename it to config_cli.php');
		}

		// TODO: this should be handled with an exception, the backend shouldn't produce output
		if (sizeof($config_cli) == 0)
		{
			// config.php exists, but does not define $config
			if(defined('STDIN')) exit(5);
			die('<br /><br /><strong>Configuration</strong>: includes/config_cli.php exists, but is not in the 3.6+ format. Please fill out the data in config_cli.php.new and rename it to config_cli.php.');
		}
		self::$config_cli = $config_cli;
	}

	/**
    * Returns a by-reference the cli-config object
    * @return array
    */
	public static function &getConfigCLI()
	{
		if (!isset(self::$config_cli)) {
			self::fetch_config_cli();
		}

		return self::$config_cli;
	}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 35750 $
|| ####################################################################
\*======================================================================*/
