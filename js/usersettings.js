window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["aim","email_addresses_must_match","google_talk_im","icq","passwords_must_match","please_add_signature","signature","signature_saved","skype","usersetting_signatures_link","usersetting_signature_errorsaving","yahoo_im","end_subscription","end_subscription_confirm","cancel"]);window.vBulletin.options=window.vBulletin.options||{};window.vBulletin.options.precache=window.vBulletin.options.precache||[];window.vBulletin.options.precache=$.merge(window.vBulletin.options.precache,["ctMaxChars"]);(function(C){window.vBulletin=window.vBulletin||{};var D=[".profile-settings-widget"];if(!vBulletin.pageHasSelectors(D)){return false}var A="usersettings";vBulletin.usersettings=vBulletin.usersettings||{};vBulletin.usersettings.signature;vBulletin.usersettings.updatePreview=function(E){C.ajax({url:vBulletin.getAjaxBaseurl()+"/profile/previewSignature",type:"post",data:{signature:E},dataType:"json",success:function(F){if(F){if(F.errors){openAlertDialog({title:vBulletin.phrase.get("usersetting_signatures_link"),message:vBulletin.phrase.get("usersetting_signature_errorsaving")+": "+vBulletin.phrase.get(F.errors[0]),iconType:"error"});C(".list-item[data-node-id="+nodeid+"] .voteCtrl").removeClass("h-disabled")}else{C(".js-signature__preview").html(F).slideDown()}}},complete:function(){C("body").css("cursor","default")}})};var B;vBulletin.usersettings.init=function(){C(".js-signature__edit").off("click").on("click",function(E){E.preventDefault();C("#editSignatureDialog").dialog({title:vBulletin.phrase.get("usersetting_signatures_link"),autoOpen:false,modal:true,resizable:false,closeOnEscape:false,showCloseButton:false,width:500,dialogClass:"signature-dialog-container dialog-container dialog-box",create:function(){var F=C(this),G=C(".js-editor",F);vBulletin.ckeditor.initEditor(G,{success:function(I){var H=vBulletin.ckeditor.getEditor(I);H.setData(G.prev(".js-editor-parsed-text").html(),function(){H.resetDirty()});F.on("dialogopen",function(){H.setData(C(".js-signature__preview").html(),function(){H.resetDirty()})})},error:function(){G.val(G.prev(".js-editor-parsed-text").html().replace(/<br\s*[\/]?>/gi,"\n")).data("orig-value",G.val());F.on("dialogopen",function(){G.val(C(".js-signature__preview").html().replace(/<br\s*[\/]?>/gi,"\n")).data("orig-value",G.val())})},hideLoadingDialog:true});C(".js-signature__cancel",F).off("click").on("click",function(H){var I=vBulletin.ckeditor.editorExists(G)?vBulletin.ckeditor.getEditor(G).checkDirty():G.val()!=G.data("orig-value");if(I){openConfirmDialog({title:vBulletin.phrase.get("cancel_edit"),message:vBulletin.phrase.get("all_changes_made_will_be_lost_would_you_like_to_continue"),iconType:"warning",onClickYes:function(){F.dialog("close")}})}else{F.dialog("close")}});C(".js-signature__submit",F).off("click").on("click",function(J){J.preventDefault();var H=vBulletin.ckeditor.editorExists(G)?vBulletin.ckeditor.getEditor(G).getData():G.val();if(!C.trim(H)){openAlertDialog({title:vBulletin.phrase.get("signature"),message:vBulletin.phrase.get("please_add_signature"),iconType:"warning",onAfterClose:function(){vBulletin.ckeditor.editorExists(G)?vBulletin.ckeditor.getEditor(G).focus():G.focus()}});return false}var I=[];C('input[name|="filedataids[]"]',F).each(function(){I.push(C(this).val())});C.ajax({url:this.form.action,type:this.form.method,data:{signature:H,filedataids:I},dataType:"json",success:function(K){if(K){if(K.errors){openAlertDialog({title:vBulletin.phrase.get("signature"),message:vBulletin.phrase.get("error_saving_signature")+": "+vBulletin.phrase.get(K.errors[0]),iconType:"error"})}else{C(".js-signature__preview").html(K);openAlertDialog({title:vBulletin.phrase.get("signature"),message:vBulletin.phrase.get("signature_saved")});F.dialog("close")}}},complete:function(){C("body").css("cursor","default")}});return false})}}).dialog("open");return false})};C(document).ready(function(){C(".js-user-settings form").trigger("reset");vBulletin.usersettings.init();C(".b-form-select__select").selectBox();var J=window.vBulletin.options.get("ctMaxChars");C(".js-user-settings__reset").off("click").on("click",resetFormFields);setSelectedOption(C(".js-birth__month"),C("#bd_month"));C(".js-birth__month").selectBox().change(function(){C("#bd_day").val(C(".js-birth__day option:selected").val());updateDaySelectBox(C(".js-birth__day"),C(".js-birth__month").val())});C(".js-birth__year").off("blur").on("blur",function(){C("#bd_day").val(C(".js-birth__day option:selected").val());updateDaySelectBox(C(".js-birth__day"),C(".js-birth__month").val())});C("#profileSettings_form").ajaxForm({dataType:"json",beforeSubmit:function(P,O,N){if(C(".js-user_title").length&&(C(".js-user_title").val().length>J)){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("please_enter_user_title_with_at_least_x_characters",J),iconType:"warning"});return false}return true},success:function(P,Q,R,O){if(P&&P.response&&P.response.errors){var S=[];for(var N in P.response.errors){if(P.response.errors[N][0]!="exception_trace"&&P.response.errors[N][0]!="errormsg"){S.push(vBulletin.phrase.get(P.response.errors[N]))}}openAlertDialog({title:vBulletin.phrase.get("error"),message:S.join("<br />"),iconType:"warning"})}else{window.location.reload(true)}}});createDaySelectBox(C(".js-birth__day"));B=C(".b-tabbed-pane").tabbedPane({isResponsive:true,callback:function(){C("select.b-form-select__select").selectBox()}});var H={aim:vBulletin.phrase.get("aim"),google:vBulletin.phrase.get("google_talk_im"),skype:vBulletin.phrase.get("skype"),yahoo:vBulletin.phrase.get("yahoo_im"),icq:vBulletin.phrase.get("icq")};var L=Object.keys(H).length;var E=function(N){var O=0;N.find(".selectBox.js-im").each(function(){var P=C(this).width();if(P>O){O=P}});return O};var G=function(O,N){O.find(".selectBox.js-im").each(function(){var P=C(this);P.width(N);P.find(".selectBox-label").css("width","auto")})};C(document).off("change",".selectBox.js-im").on("change",".selectBox.js-im",function(){$screenNamesContainer=C(this).closest(".js-screen-name__container");var N=E($screenNameContainer);updateProviders($screenNamesContainer,H);G($screenNameContainer,N)});setIMSelectedOption(C("select.js-im"),H);var F="b-icon b-icon__x-circle--light h-margin-horiz-l h-margin-top-xs h-left js-screen-name__remove";C(".js-screen-name__new").off("click").on("click",function(R){R.preventDefault();var P=C(this);var S=C(this).parents(".js-screen-names").find(".js-screen-name__container");var N=S.find(".js-screen-name").length;var Q=E(S);if(N<L){var O='<div class="h-margin-bottom-xs h-clearfix js-screen-name">';O+='<input type="text" name="user_screennames[]" class="js-user_screenname h-left b-form-input__input h-margin-right-l h-margin-bottom-s b-user-settings__user-screenname" value="" />';O+='<select name="user_im_providers[]" class="js-im--'+N+' js-im b-form-select__select h-left" data-orig-value-class="js-im--'+N+'">';O+=getAvailableIMs(S,H);O+="</select>";O+='<div class="'+F+'"></div></div>';S.append(O);S.find(".js-im--"+N).selectBox();S.find(".js-user_screenname:last").focus();if(S.find(".js-screen-name").length>=L){P.hide()}updateProviders(S,H);G(S,Q)}});C(".js-screen-names").each(function(){$container=C(this);var N=E($container);G($container,N);if($container.find(".selectBox.js-im").length>=L){$container.find(".js-screen-name__new").hide()}});C(document).off("click",".js-screen-name__remove").on("click",".js-screen-name__remove",function(){var O=C(this).parents(".js-screen-name");var Q=C(this).closest(".js-screen-names");var P=E(Q);var N=O.siblings(".js-screen-name").length;if(N<1){O.find(".js-user_screenname").val("")}else{O.find("select.js-im").selectBox("destroy");O.remove()}updateProviders(Q,H);G(Q,P);Q.find(".js-screen-name__new").show()});C("#new_useremail").off("focus."+A).on("focus."+A,function(N){N.preventDefault();C("#new_email_container").addClass("isActive").slideDown("3000")});C("#user_newpass").off("focus."+A).on("focus."+A,function(N){N.preventDefault();C("#new_pass_container").addClass("isActive").slideDown("3000")});C("#settingsErrorClose").off("click").on("click",function(){C("#settingsErrorDialog").dialog("close")});C("#accountSettings_form").ajaxForm({dataType:"json",beforeSubmit:function(P,N,O){return I()},success:function(P,Q,R,O){if(P&&P.response&&P.response.errors){var S=[];for(var N in P.response.errors){if(P.response.errors[N][0]!="exception_trace"&&P.response.errors[N][0]!="errormsg"){S.push(vBulletin.phrase.get(P.response.errors[N]))}}openAlertDialog({title:vBulletin.phrase.get("error"),message:S.join("<br />"),iconType:"warning"})}else{window.location.reload(true)}}});var I=function(){var N=C("#user_newpass"),U=C("#user_newpass2"),V=N.val(),T=U.val();if(V||T){var R=C("#user_currentpass");if(R.val()==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("enter_current_password"),iconType:"error",onAfterClose:function(){R[0].focus()}});return false}if(V!=T){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("passwords_must_match"),iconType:"error",onAfterClose:function(){N[0].focus()}});return false}}else{N.removeAttr("name");U.removeAttr("name")}var S=C("#new_useremail"),O=C("#new_useremail2"),P=S.val(),Q=O.val();if(P||Q){var R=C("#user_currentpass");if(R.val()==""){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("enter_current_password"),iconType:"error",onAfterClose:function(){R[0].focus()}});return false}if(P!=Q){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("email_addresses_must_match"),iconType:"error",onAfterClose:function(){S[0].focus()}});return false}if(!isValidEmailAddress(S.val())){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("invalid_email_address"),iconType:"error",onAfterClose:function(){S[0].focus()}});return false}}else{S.removeAttr("name");O.removeAttr("name")}return true};C("#accountSettings_form input:checkbox[name=enable_pm]").off("change").on("change",function(){if(C(this).prop("checked")){C("#pm_controls :input").prop("disabled",false)}else{C("#pm_controls :input").prop("disabled",true)}});M();function M(){var O=C("#ignorelist_container").val();var N=new vBulletin_Autocomplete(C("#ignorelist_container"),{apiClass:"user",minLength:C("#minuserlength").val(),maxItems:C("#maxitems").val()});if(O){O=O.split(",");C.each(O,function(P,Q){Q=C.trim(Q);N.addElement(Q)})}}C("#follower_request").off("change").on("change",function(){if(C(this).attr("checked")=="checked"){C("#general_followrequest").attr("checked",true)}});C("#general_followrequest").off("change").on("change",function(){if(!C(this).prop("checked")){C("#follower_request").prop("checked",false)}});var K=C("#subscriptionsTab");if(K.length>0){C(".js-subscription-cost",K).change(function(){var V=C(this).closest(".js-newsubscription_row"),P=C(this).find("option:selected").first(),R=P.attr("data-currency"),S=V.attr("data-id"),O=P.attr("data-subid"),T=C(this).closest(".js-subscriptions_list"),Q=C(".js-order_confirm",K),U=C(".js-payment-form",K),N=C.parseJSON(V.attr("data-allowedapis"));C(this).selectBox("value","");C('<tr class="confirm_data"><td>'+P.attr("data-subtitle")+"</td><td>"+P.attr("data-duration")+"</td><td>"+P.attr("data-value")+"</td></tr>").appendTo(C(".js-order_confirm_table",Q));T.addClass("h-hide");Q.off("click",".js-subscription__remove").on("click",".js-subscription__remove",function(){C(".confirm_data",Q).remove();C(".js-paymentapi",Q).closest("label").removeClass("h-hide");C(".js-subscriptions-order",Q).prop("disabled",false);C(".js-subscription-cost",T).selectBox("value","");Q.addClass("h-hide");T.removeClass("h-hide");return false});Q.off("click",".js-paymentapi").on("click",".js-paymentapi",function(){C(".js-subscriptions-order",Q).prop("disabled",false)});C(".js-paymentapi",Q).each(function(){var W=C(this).attr("data-currency").split(",");if(C.inArray(R,W)==-1||C.inArray(C(this).val(),N)==-1){C(this).closest("label").addClass("h-hide")}});Q.off("click",".js-subscriptions-order").on("click",".js-subscriptions-order",function(){C(".js-subscriptions-order",Q).prop("disabled",true);C("body").css("cursor","wait");C.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/paidsubscription/placeorder",data:{subscriptionid:S,subscriptionsubid:O,paymentapiclass:C(".js-paymentapi:checked",Q).val(),currency:R},type:"POST",dataType:"json",complete:function(){C("body").css("cursor","auto")},success:function(W){if(W&&!W.error){U.html(W);Q.addClass("h-hide");T.addClass("h-hide");U.off("click",".js-subscription__cancel").on("click",".js-subscription__cancel",function(){U.html("").addClass("h-hide");C(".js-subscription__remove",Q).click();return false});U.removeClass("h-hide")}},error:function(Y,X,W){console.log("Unable to fetch payment api form! error:"+W);openAlertDialog({title:"Error",message:"Error fetching payment form.",iconType:"error"})}})});Q.removeClass("h-hide")});C(".js-subscription__end",K).click(function(){var N=C(this).attr("data-id"),O=C(this).closest("tr"),P=C(this).closest("table");openConfirmDialog({title:vBulletin.phrase.get("end_subscription"),message:vBulletin.phrase.get("end_subscription_confirm"),iconType:"warning",buttonLabel:{yesLabel:vBulletin.phrase.get("end_subscription"),noLabel:vBulletin.phrase.get("cancel")},onClickYes:function(){C("body").css("cursor","wait");C.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/paidsubscription/endsubcription",data:{subscriptionid:N},type:"POST",dataType:"json",complete:function(){C("body").css("cursor","auto")},success:function(Q){if(Q&&!Q.error){O.remove();if(P.find("tr").length<=1){P.closest(".current_subscriptions").remove()}}},error:function(S,R,Q){console.log("Unable to end subscription! error:"+Q);openAlertDialog({title:"Error",message:"Error ending subscription.",iconType:"error"})}})}});return false})}});createDaySelectBox=function(E){var G="";var I=C(".js-birth__month").val();var H=C("#bd_year").val();var J=new Date(H,I,0);if(C("#bd_day").val()==""||C("#bd_day").val()==null){G+="<option name='day' value='' selected='selected'></option>"}for(var F=1;F<=J.getDate();F++){F=(F<10)?("0"+F):F;if(F==C("#bd_day").val()){G+="<option name='day' value='"+F+"' selected='selected'>"+F+"</option>"}else{G+="<option name='day' value='"+F+"'>"+F+"</option>"}}E.html(G);E.selectBox("destroy").selectBox()};updateDaySelectBox=function(E,I){var H=(C(".js-birth__year").val()!="")?C(".js-birth__year").val():0;var J=new Date(H,I,0);J=J.getDate();var G="";for(var F=1;F<=J;F++){F=(F<10)?("0"+F):F;G+="<option name='day' value='"+F+"'>"+F+"</option>"}updateSelectBox(E,G)};updateSelectBox=function(E,F,H){F=(F)?F:E.html();var G=E.attr("class").split(" ");E.selectBox("destroy");E.removeData("selectBoxControl");E.removeData("selectBoxSettings");E.html(F);if(C("#"+G[0]).val()!=undefined){E.val(C("#"+G[0]).val())}E.selectBox()};setSelectedOption=function(F,E){F.val(E.val())};setIMSelectedOption=function(E,G){var F="";C.each(E,function(K,I){var J=C(I).data("orig-value-class");F=C(I).parent().children(":input[type=hidden]."+J).val();C(I).val(F)});var H="";C.each(E,function(J,I){$screenNameContainer=C(E).closest(".js-screen-name__container");H=C(I).closest(".js-screen-name").find("select.js-im option:selected");C.each(C(H),function(K,L){if(C(I).val()!=C(L).val()){C(I).find("option[value= "+C(L).val()+"]").remove()}});updateProviders($screenNameContainer,G)})};getAvailableIMs=function(F,G){var E="";C.each(G,function(H,I){if(F.find("select.js-im option:selected[value= "+H+"]").length==0){E+="<option name='im_provider' value='"+H+"'> "+I+"</option>"}});return E};updateImSelectBox=function(E,F){E.selectBox("destroy");E.removeData("selectBoxControl");E.removeData("selectBoxSettings");E.html(F);E.selectBox()};updateProviders=function(F,E){F.find("select.js-im").each(function(I,G){var J=C(G).val();var H="";C.each(E,function(K,L){if(F.find("select.js-im option:selected[value= "+K+"]").length==0){H+="<option name='im_provider' value='"+K+"'>"+L+"</option>"}else{if(K==J){H+="<option name='im_provider' value='"+K+"' selected='selected'>"+L+"</option>"}}});updateImSelectBox(C(G),H)})};resetFormFields=function(){var E=C(this.form);setTimeout(function(){C("input",E).trigger("change");C("select.b-form-select__select",E).each(function(){updateSelectBox(C(this))})},100)}})(jQuery);