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

/**
* HV Class for when HV is disabled
*
* @package 		vBulletin
* @version		$Revision: 68365 $
* @date 		$Date: 2012-11-12 10:27:40 -0800 (Mon, 12 Nov 2012) $
*
*/
class vB_HumanVerify_Disabled extends vB_HumanVerify_Abstract
{

	/**
	 * Deleted a Human Verification Token
	 *
	 * @param	string	The hash to delete
	 * @param	string	The Corresponding Option
	 * @param	integer	Whether the token has been viewd
	 *
	 * @return	boolean	Was anything deleted?
	 *
	*/
	function delete_token($hash, $answer = NULL, $viewed = NULL)
	{
		return true;
	}

	/**
	 * Returns the HTML to be displayed to the user for Human Verification
	 *
	 * @param	string	Passed to template
	 *
	 * @return 	string	HTML to output
	 *
	 */
	function output_token($var_prefix = 'humanverify') {}

	/**
	 * Generates a Random Token and stores it in the database
	 *
	 * @param	boolean	Delete the previous hash generated
	 *
	 * @return	array	an array consisting of the hash, and the answer
	 *
	*/
	function generate_token($deletehash = true)
	{
		return array();
	}

	/**
	 * Verifies whether the HV entry was correct
	 *
	 * @param	array	An array consisting of the hash, and the inputted answer
	 *
	 * @return	boolean
	 *
	*/
	function verify_token($input)
	{
		return true;
	}

	/**
	 * Returns any errors that occurred within the class
	 *
	 * @return	mixed
	 *
	*/
	function fetch_error()
	{
		return $this->error;
	}

	/**
	 * Generates an expected answer
	 *
	 * @return	mixed
	 *
	*/
	function fetch_answer() {}
}

/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 68365 $
|| ####################################################################
\*======================================================================*/
?>
