window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["error_x","error_saving_customizations","profile_style_customizations","saving","style_applied_as_site_default","kilobytes"]);var cssMappings={profcustom_navbar_background_active:[".profileTabs .widget-tabs-nav li.ui-tabs-selected a"],profcustom_navbar_border_active:[".profileTabs .widget-tabs-nav li.ui-tabs-selected a"],profcustom_navbar_text_color_active:[".profileTabs .widget-tabs-nav li.ui-tabs-selected a"],profcustom_navbar_background:[".profileTabs .widget-tabs-nav li.ui-state-default a"],profcustom_navbar_border:[".profileTabs .widget-tabs-nav li.ui-state-default a"],profcustom_navbar_text_color:[".profileTabs .widget-tabs-nav li.ui-state-default a"],toolbar_background:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar",".forum-list-container .forum-list-header"],side_nav_divider_border:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar",".forum-list-container .forum-list-header"],profcustom_navbar_toolbar_text_color:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar",".forum-list-container .forum-list-header"],profcustom_navbarbutton_background:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar .button.primary"],profcustom_navbarbutton_border:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar .button.primary"],profcustom_navbarbutton_color:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar .button.primary"],profile_button_secondary_background:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar .button.secondary"],profcustom_navbarbuttonsecondary_border:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar .button.secondary"],profcustom_navbarbuttonsecondary_color:[".profileTabs .conversation-toolbar-wrapper .conversation-toolbar .button.secondary"],profile_content_background:["#profileTabs","#profileTabs .conversation-list.stream-view .list-item"],profile_content_border:[".profileTabs .tab .list-container","#profileTabs .conversation-list.stream-view"],profile_content_divider_border:[".profileTabs .post-footer-wrapper .post-footer .divider"],profile_section_background:[".profileTabs .section .section-header"],profile_section_border:[".profileTabs .section .section-header"],profile_section_text_color:[".profileTabs .section .section-header"],profile_section_font:[".profileTabs .section .section-header"],profile_content_primarytext:["#profileTabs.profileTabs","#profileTabs.profileTabs .conversation-list.stream-view .list-item","#profileTabs.profileTabs .widget-content","#profileTabs.profileTabs .post-content"],profile_content_secondarytext:[".profile-widget .post-footer-wrapper .post-footer ul li",".profile-widget .conversation-list.stream-view .list-item-header .info .subscribed",".canvas-layout-container .canvas-widget .widget-content .profileTabs .post-date"],profile_content_linktext:[".profile-widget .widget-tabs.ui-tabs .ui-widget-content a",".profile-widget .widget-tabs.ui-tabs .ui-widget-content a:active",".profile-widget  .widget-tabs.ui-tabs .ui-widget-content a:visited"],profile_content_font:["#profileTabs"],side_nav_background:[".profile_sidebar_content"],form_dropdown_border:[".profile_sidebar_content"],side_nav_avatar_border:[".profile-sidebar-widget .profileContainer .profile-photo-wrapper .profile-photo"],side_nav_divider_border:[".profile-sidebar-widget .profile-menulist .profile-menulist-item"],profile_userpanel_textcolor:[".profile_sidebar_content",".profile_sidebar_content .profile-menulist-item a label"],profile_userpanel_linkcolor:[".profile_sidebar_content .profile-menulist-item a .subscriptions-count, .profile_sidebar_content .profile-menulist-item a .subscriptions-count:hover, .profile_sidebar_content .profile-menulist-item a .subscriptions-count:visited"],profile_userpanel_font:[".profile_sidebar_content"],profilesidebar_button_background:[".profile_sidebar_content .button.primary"],profilesidebar_button_border:[".profile_sidebar_content .button.primary"],profilesidebar_button_text_color:[".profile_sidebar_content .button.primary"],button_primary_text_color:[".profileTabs .button.primary",".profileTabs .button.primary:hover"],button_primary_border:[".profileTabs .button.primary",".profileTabs .button.primary:hover"],profile_button_primary_background:[".profileTabs .button.primary",".profileTabs .button.primary:hover"]};var colorTypes={profcustom_navbar_background_active:3,profcustom_navbar_background:3,profile_button_primary_background:3,profile_button_secondary_background:3,toolbar_background:3,profile_content_background:3,profile_section_background:3,side_nav_background:3,profilesidebar_button_background:3,module_tab_border_active:2,module_tab_border:2,button_primary_border:2,button_secondary_border:2,side_nav_divider_border:2,profile_content_border:2,profile_section_border:2,profile_content_divider_border:2,profile_section_border:2,form_dropdown_border:2,side_nav_avatar_border:2,side_nav_divider_border:2,profilesidebar_button_border:2,profcustom_navbar_text_color_active:1,profcustom_navbar_text_color:1,button_secondary_text_color:1,profcustom_navbar_toolbar_text_color:1,profile_section_color:1,profile_section_text_color:1,profile_content_primarytext:1,profile_content_secondarytext:1,profile_content_linktext:1,profile_userpanel_textcolor:1,profile_userpanel_linkcolor:1,profilesidebar_button_text_color:1,button_primary_text_color:1,button_primary_border:2,profile_button_primary_background:3,profcustom_navbarbutton_color:1,profcustom_navbarbutton_border:2,profcustom_navbarbutton_background:3,profcustom_navbarbuttonsecondary_color:1,profcustom_navbarbuttonsecondary_border:2,profile_button_secondary_background:3};var newSettings={};var revertChanges=function(A){$.each(A,function(C,B){targetEl=$("[name="+C+"]");$.each(B,function(D,E){if(E&&E!=""){switch(D){case"color":targetEl.val(E);targetEl.trigger("keyup");break;case"image":setBackgroundImage("",E,C);break;case"family":if(targetEl.length>1){$.each(targetEl,function(G,F){if($(F).attr("data-type")=="family"){$(F).val(E);$(F).trigger("change")}})}else{targetEl.val(E);targetEl.trigger("change")}break;case"size":if(targetEl.length>1){$.each(targetEl,function(G,F){if($(F).attr("data-type")=="size"){$(F).val(E);$(F).trigger("change")}})}else{targetEl.val(E);targetEl.trigger("change")}break;case"repeat":targetEl=$("[name=repeat_type]");if(targetEl.length>1){$.each(targetEl,function(G,F){if($(F).attr("data")==C){$(F).val(E);$(F).trigger("change")}})}else{targetEl.val(E);targetEl.trigger("change")}break;default:break}}})})};var uploadFromUrl=function(A){form=$(A.target).closest(".frmBgImageUrl");if(form.length){remoteUrl=$(form).find(".profCustomBgImageUrl");if(remoteUrl&&$(remoteUrl).val()){$.ajax({url:vBulletin.getAjaxBaseurl()+"/uploader/url",data:{urlupload:remoteUrl.val()},type:"post",dataType:"json",success:function(B){if(B){if(B.errors){if(typeof (B.errors[0])=="undefined"){openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get(B.errors),iconType:"error"})}else{openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get(B.errors[0][0]),iconType:"error"})}}else{if(B.imageUrl){setBackgroundImage(A,B.imageUrl)}else{openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get("unable_to_upload_file"),iconType:"error"})}}}else{openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get("invalid_server_response_please_try_again"),iconType:"error"})}},fail:function(C){var D=vBulletin.phrase.get("error_uploading_image");var B="error";if(C&&C.files.length>0){switch(C.files[0].error){case"acceptFileTypes":D=vBulletin.phrase.get("invalid_image_allowed_filetypes_are");B="warning";break}}openAlertDialog({title:vBulletin.phrase.get("upload"),message:D,iconType:B,onAfterClose:function(){$editProfilePhotoDlg.find(".fileText").val("");$editProfilePhotoDlg.find(".browse-option").focus()}})}})}}};var setBgRepeat=function(A){ident=$(A.target).attr("data");repeat=A.target.value;if(typeof (cssMappings[ident])!="undefined"){selectors=cssMappings[ident];addNewSetting(ident,"repeat",repeat);if(typeof newSettings[ident]["image"]=="undefined"){newSettings[ident]["image"]=$(selectors[0]).css("background-image")}for(i=0;i<selectors.length;i++){$(selectors[i]).css("background-repeat",repeat)}}};var clearBgImage=function(A){ident=$(A.target).attr("data");if(typeof (cssMappings[ident])!="undefined"){selectors=cssMappings[ident];addNewSetting(ident,"image","none");for(i=0;i<selectors.length;i++){$(selectors[i]).css("background-image","none")}}};var clearBgColor=function(A){$element=$(A.target);ident=$element.attr("data");checked=$element.is(":checked");if(typeof (cssMappings[ident])!="undefined"){selectors=cssMappings[ident];if(checked){addNewSetting(ident,"color","transparent");val="transparent"}else{addNewSetting(ident,"color","none");val="none"}for(i=0;i<selectors.length;i++){$(selectors[i]).css("background-color",val)}}};var setBackgroundImage=function(C,A,F){var E,B;if(typeof F!=="undefined"){E=F;B=A}else{E=$(C.target).attr("data");var D=A.indexOf("?")==-1?"?":"&";B='url("'+A+D+"random="+Math.random()+'")'}if(typeof (cssMappings[E])!="undefined"){selectors=cssMappings[E];addNewSetting(E,"image",B);for(i=0;i<selectors.length;i++){$(selectors[i]).css("background-image",B)}}};var makeServerRequest=function(C,B,A,E){window.vBulletin.loadingIndicator.show();var D=$.post(vBulletin.getAjaxBaseurl()+C,B,function(F){if(F&&F.error){if($.isArray(F.error)){$.each(F.error,function(H,I){F.error[H]=vBulletin.phrase.get(I)});var G=F.error.join("<br />")}else{var G=vBulletin.phrase.get(F.error)}openAlertDialog({title:vBulletin.phrase.get("profile_customization"),message:G,iconType:"error"});return }else{if(typeof E==="function"){E(F)}}},"json").error(function(){openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("error_saving_customizations"),iconType:"error"})}).complete(function(){window.vBulletin.loadingIndicator.hide()})};function addNewSetting(C,A,B){if(newSettings[C]){newSettings[C][A]=B}else{newSettings[C]={};newSettings[C][A]=B}}function toggleBgType(A){imgRadio=$(A.target).closest(".profCustomBackgroundEdit").find(".profCustomBgTypeColor");if(A.target.value=="color"){$(A.target).closest(".profCustomBackgroundEdit").find(".profCustomBgImage").addClass("h-hide");$(A.target).closest(".profCustomBackgroundEdit").find(".profCustomBgColor").removeClass("h-hide")}else{$(A.target).closest(".profCustomBackgroundEdit").find(".profCustomBgColor").addClass("h-hide");$(A.target).closest(".profCustomBackgroundEdit").find(".profCustomBgImage").removeClass("h-hide")}}function toggleImgSource(A){if(A.target.value=="file"){$(A.target).closest(".profCustomBackgroundEdit").find(".frmBgImageUrl").addClass("h-hide");$(A.target).closest(".profCustomBackgroundEdit").find(".frmBgImageFile, .ProfCustomBgRepeat").removeClass("h-hide")}else{if(A.target.value=="url"){$(A.target).closest(".profCustomBackgroundEdit").find(".frmBgImageFile").addClass("h-hide");$(A.target).closest(".profCustomBackgroundEdit").find(".frmBgImageUrl, .ProfCustomBgRepeat").removeClass("h-hide")}else{$(A.target).closest(".profCustomBackgroundEdit").find(".frmBgImageFile, .frmBgImageUrl, .ProfCustomBgRepeat").addClass("h-hide")}}}function updateColorFromComponent(A){addNewSetting($(this).attr("data"),"color",A);$(this).parent().find(".rdProfCustomBgColorClear").prop("checked",false);if(typeof (cssMappings[$(this).attr("data")])!="undefined"){selectors=cssMappings[$(this).attr("data")];for(selector in selectors){switch(colorTypes[$(this).attr("data")]){case 1:$(selectors[selector]).css("color",A);break;case 2:$(selectors[selector]).css("border-color",A);break;case 3:$(selectors[selector]).css("background-color",A);$(selectors[selector]).css("background-image","none");break}}}}function setFontFamily(A){fontname=$(A.target).find(">option:selected").text();ident=$(A.target).attr("data");addNewSetting(ident,"family",fontname);displayname=A.target.options[A.target.selectedIndex].innerHTML;$(A.target).closest(".fontselectorWrapper").find(".fontDisplay").css("font-family",fontname).html(fontname);if(typeof (cssMappings[ident])!="undefined"){selectors=cssMappings[ident];for(selector in selectors){$(selectors[selector]).css("font-family",fontname)}}}function setFontSize(A){ident=$(A.target).attr("data");$(A.target).closest(".fontselectorWrapper").find(".fontDisplay").css("font-size",A.target.value);addNewSetting(ident,"size",A.target.value);if(typeof (cssMappings[ident])!="undefined"){selectors=cssMappings[ident];for(selector in selectors){$(selectors[selector]).css("font-size",A.target.value)}}}function setCurrentBgValues(G){var F=G.attr("data");if(typeof cssMappings[F]!="undefined"){selector=cssMappings[F][0];var E=$(selector),D={},C="";D.color=E.css("background-color");D.image=E.css("background-image");D.repeat=E.css("background-repeat");if((typeof D.image!="undefined")&&(D.image!="none")){var H=D.image.lastIndexOf("/")+1,B=D.image.length,A=B-H-2;C=D.image.substr(H,A);G.find(".fileText").val(C);if(D.repeat!=""){G.find(".ProfCustomBgRepeatType").val(D.repeat)}}else{if(D.color=="transparent"){G.find(".rdProfCustomBgColorClear").prop("checked",true)}}if(C!=""){G.find(".rdProfCustomBgTypeImage").trigger("click")}else{G.find(".rdProfCustomBgTypeColor").trigger("click")}}}(function(A){var B=[".profileEditContent"];if(!vBulletin.pageHasSelectors(B)){return false}A(document).ready(function(){bgCount=0;A(".profile_custom_edit .profileTabs").tabs();A(".profCustomBackgroundEdit").each(function(D){bgCount++;content=A(".profCustomBgTemplate").clone();var C=A(this);A(content).removeClass("h-hide profCustomBgTemplate");A(content).css("display","block");C.append(content);C.find(".colorPicker").attr("data",C.attr("data"));C.find(".colorPicker").attr("name",C.attr("data"));C.find(".colorPicker").removeClass("template");C.find(".rdProfCustomBgTypeColor, .rdProfCustomBgTypeImage").off("click").on("click",toggleBgType);C.find(".rdProfCustomBgTypeColor, .rdProfCustomBgTypeImage").prop("name","profCustomBgType"+bgCount);C.find(".rdProfCustomFile, .rdProfCustomUrl, .rdProfCustomBgImageNone").off("click").on("click",toggleImgSource);C.find(".rdProfCustomFile, .rdProfCustomUrl, .rdProfCustomBgImageNone").attr("name","profCustomBgSrc"+bgCount);C.find(".profCustomBgImageFile, .profCustomBgImageUrl, .rdProfCustomBgColorClear, .rdProfCustomBgImageNone, .ProfCustomBgRepeatType, .profCustomUploadUrl").attr("data",A(this).attr("data"));setCurrentBgValues(C);A(this).find(".profCustomBgImageFile").fileupload({url:vBulletin.getAjaxBaseurl()+"/uploader/upload_file",add:function(F,E){E.submit()},done:function(F,E){if(E){if(E.result.errors){if(typeof (E.result.errors[0])=="undefined"){openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get(E.result.errors),iconType:"error"})}else{openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get(E.result.errors[0][0]),iconType:"error"})}}else{if(E.result.imageUrl){C.find(".profile-img-option-container .profile-img-option-field input.fileText").val(E.result.filename);setBackgroundImage(F,E.result.imageUrl)}else{openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get("unable_to_upload_file"),iconType:"error"})}}}else{openAlertDialog({title:vBulletin.phrase.get("profile_style_customizations"),message:vBulletin.phrase.get("invalid_server_response_please_try_again"),iconType:"error"})}},fail:function(H,F){var G=vBulletin.phrase.get("error_uploading_image");var E="error";if(F&&F.files.length>0){switch(F.files[0].error){case"acceptFileTypes":G=vBulletin.phrase.get("invalid_image_allowed_filetypes_are");E="warning";break}}openAlertDialog({title:vBulletin.phrase.get("upload"),message:G,iconType:E,onAfterClose:function(){$editProfilePhotoDlg.find(".fileText").val("");$editProfilePhotoDlg.find(".browse-option").focus()}})}})});if(A("body").is(".view-mode")){vBulletin_ColorPicker(".colorPicker",{onChange:updateColorFromComponent});A(".selectCustomProfFontfamily").off("change").on("change",setFontFamily);A(".selectCustomProfFontsize").off("change").on("change",setFontSize);A(".rdProfCustomBgImageNone").off("click").on("click",clearBgImage);A(".rdProfCustomBgColorClear").off("click").on("click",clearBgColor);A(".ProfCustomBgRepeatType").off("change").on("change",setBgRepeat);A(".profCustomUploadUrl").off("click").on("click",uploadFromUrl)}A(".profCustomSave").off("click").on("click",function(){if(A.isEmptyObject(newSettings)){var D=vBulletin.phrase.get("there_are_no_changes_to_save");openAlertDialog({title:vBulletin.phrase.get("profile_customization"),message:D,iconType:"error"});return }var C=newSettings;newSettings={};makeServerRequest("/profile/save-stylevar",{stylevars:C,userid:pageData.userid},vBulletin.phrase.get("saving")+"...",function(E){openAlertDialog({title:vBulletin.phrase.get("profile_customization"),message:vBulletin.phrase.get("usercss_saved"),})})});A(".profCustomRevert").off("click").on("click",function(){var C=[],D=0;if(A.isEmptyObject(newSettings)){var E=vBulletin.phrase.get("there_are_no_changes_to_revert");openAlertDialog({title:vBulletin.phrase.get("profile_customization"),message:E,iconType:"error"});return }A.each(newSettings,function(F,G){C[D]=F;D++});makeServerRequest("/profile/revert-stylevars",{stylevars:C,userid:pageData.userid},"Reverting...",function(F){revertChanges(F)});newSettings={}});A(".profCustomDefault").off("click").on("click",function(){var C=[],D=0;if(!A.isEmptyObject(newSettings)){A.each(newSettings,function(E,F){C[D]=E;D++})}makeServerRequest("/profile/reset-default",{stylevars:C,userid:pageData.userid},"Resetting...",function(E){window.location.reload()});newSettings={}});A(".profCustomApplyAll").off("click").on("click",function(){makeServerRequest("/profile/save-default",{stylevars:newSettings,userid:pageData.userid},"Saving...",function(C){openAlertDialog({title:vBulletin.phrase.get("profile_customization"),message:vBulletin.phrase.get("style_applied_as_site_default")})})});A(".profCustomCancel").off("click").on("click",function(){A(".profile_custom_edit").addClass("h-hide")})})})(jQuery);