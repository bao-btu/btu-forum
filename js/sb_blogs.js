window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["create_a_blog","error_creating_user_blog_channel","error_fetching_user_blog_channels","select_a_blog"]);(function(A){var B=[".bloghome-widget"];if(!vBulletin.pageHasSelectors(B)){return false}A(document).ready(function(){vBulletin.conversation=vBulletin.conversation||{};A(document).off("click",".bloghome-widget .conversation-toolbar .new-conversation-btn").on("click",".bloghome-widget .conversation-toolbar .new-conversation-btn",function(C){parentNodeId=A(this).closest(".canvas-widget").data("blog-channel-id");vBulletin.AJAX({url:vBulletin.getAjaxBaseurl()+"/ajax/api/user/getGitCanStart",data:({parentNodeId:parentNodeId}),success:function(D){console.log("/ajax/api/blog/getUserBlogChannels success. Response: "+JSON.stringify(D));if(!A.isArray(D)){openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("error_fetching_user_blog_channels"),iconType:"error"});return }var F=D.length;if(F>1){var H=A("#user-blogs-dialog"),G=A("select.custom-dropdown",H),E=[];A.each(D,function(I,J){A("<option />").val(J.nodeid).html(J.title).appendTo(G)});H.dialog({title:vBulletin.phrase.get("select_a_blog"),autoOpen:false,modal:true,resizable:false,closeOnEscape:false,showCloseButton:false,width:500,dialogClass:"dialog-container create-blog-dialog-container dialog-box",open:function(){G.removeClass("h-hide").selectBox()},close:function(){G.selectBox("destroy").find("option").remove()},create:function(){A(".btnContinue",this).on("click",function(){location.href="{0}/new-content/{1}".format(pageData.baseurl,A("select.custom-dropdown",H).val())});A(".btnCancel",this).on("click",function(){H.dialog("close")})}}).dialog("open")}else{if(F==1){location.href="{0}/new-content/{1}".format(pageData.baseurl,D[0].nodeid)}else{A.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/blog/canCreateBlog",data:{parentid:parentNodeId},type:"POST",dataType:"json",async:false,success:function(J){if(!J.errors){var I=A("#create-blog-dialog").dialog({title:vBulletin.phrase.get("create_a_blog"),autoOpen:false,modal:true,resizable:false,closeOnEscape:false,showCloseButton:false,width:500,dialogClass:"dialog-container create-blog-dialog-container dialog-box",create:function(){vBulletin.ajaxForm.apply(A("form",this),[{success:function(L,M,N,K){if(A.isPlainObject(L)&&Number(L.nodeid)>0){location.href="{0}/new-content/{1}".format(pageData.baseurl,L.nodeid)}else{openAlertDialog({title:vBulletin.phrase.get("error"),message:vBulletin.phrase.get("error_creating_user_blog_channel"),iconType:"error"})}},error_phrase:"error_creating_user_blog_channel"}]);A(".btnCancel",this).on("click",function(){I.dialog("close")});A(".blog-adv-settings",this).on("click",function(){var L=A.trim(A(".blog-title",I).val()),K=A.trim(A(".blog-desc",I).val());if(L||K){location.href="{0}?blogtitle={1}&blogdesc={2}".format(this.href,encodeURIComponent(L),encodeURIComponent(K));return false}return true})},open:function(){A("form",this).trigger("reset")}}).dialog("open")}else{openAlertDialog({title:vBulletin.phrase.get("create_a_blog"),message:vBulletin.phrase.get(J.errors[0][0]),iconType:"warning"});return false}}})}}},error_phrase:"error_fetching_user_blog_channels",})})})})(jQuery);