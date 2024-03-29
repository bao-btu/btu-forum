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

class vB_DataManager_StyleVarPadding extends vB_DataManager_StyleVar
{
	var $childfields = array(
		'top'				=> array(vB_Cleaner::TYPE_NUM,			vB_DataManager_Constants::REQ_NO),
		'right'				=> array(vB_Cleaner::TYPE_NUM,			vB_DataManager_Constants::REQ_NO),
		'bottom'			=> array(vB_Cleaner::TYPE_NUM,			vB_DataManager_Constants::REQ_NO),
		'left'				=> array(vB_Cleaner::TYPE_NUM,			vB_DataManager_Constants::REQ_NO),
		'same'				=> array(vB_Cleaner::TYPE_BOOL,			vB_DataManager_Constants::REQ_NO),
		'units'				=> array(vB_Cleaner::TYPE_STR,			vB_DataManager_Constants::REQ_NO,		vB_DataManager_Constants::VF_METHOD,	'verify_units'),
	);

	public $datatype = 'Padding';

}
/*======================================================================*\
|| ####################################################################
|| # CVS: $RCSfile$ - $Revision: 40911 $
|| ####################################################################
\*======================================================================*/