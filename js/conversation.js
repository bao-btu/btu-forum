window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["cancel_new_with_quote","create_new_conversation_with_quote","error_fetching_comments","error_fetching_quotes","error_x","existing_message_will_be_deleted","invalid_server_response_please_try_again","new_with_quote","please_click_on_the_quote_icon_of_the_post_you_want_to_quote","post_reply","visitor_message","x_comment","x_comments_lower","your_post_is_now_being_reviewed_and_waiting_for_moderators_approval"]);(function(A){var B=[".forum-conversation-content-widget",".group-conversation-content-widget",".blog-conversation-content-widget",".profile-widget"];if(!vBulletin.pageHasSelectors(B)){return false}vBulletin.conversation=vBulletin.conversation||{};vBulletin.conversation.contentEntryBox=vBulletin.conversation.contentEntryBox||{};vBulletin.conversation.fetchQuotes=function(C){if(C.nodeIds.length>0){A("body").css("cursor","wait");A.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/fetch-quotes",data:({nodeid:C.nodeIds}),type:"POST",dataType:"json",complete:function(E,D){console.log("fetch-quotes complete.");A("body").css("cursor","auto");if(typeof C.onComplete=="function"){C.onComplete(E,D)}},success:function(D,F,G){console.log("fetch-quotes successful! result:"+JSON.stringify(D));if(D){var E="";A.each(D,function(I,H){E+=JShtmlEncode(H)+"<br/><br/>"});if(typeof C.onSuccess=="function"){C.onSuccess(A.trim(E),F,G)}}else{if(typeof C.onError=="function"){C.onError(G,F,D)}}},error:function(F,E,D){console.log("fetch-quotes failed! error:"+D);if(typeof C.onError=="function"){C.onError(F,E,D)}}})}};vBulletin.conversation.replyWithQuotes={getPostReplyButtonSelector:function(){return"#btnPostReply-top"},getPostReplyQuoteCountSelector:function(){return".post-reply-btn .button-text-secondary"},getSlideoutSelector:function(){return".conversation-reply-slideout"},getTabsSelector:function(){return this.getSlideoutSelector()+" .content-entry-box-reply .ui-tabs-panel.pane"},getButtonSelector:function(){return this.getTabsSelector()+" form .action-buttons .h-right .button.primary"},getPrimaryButtonSelector:function(){return this.getButtonSelector()+".primary"},getQuotesButtonSelector:function(){return this.getPrimaryButtonSelector()+".add-more-quotes"},getVisibleQuotesButtonSelector:function(){return this.getTabsSelector()+":visible form .action-buttons .h-right .button.primary.add-more-quotes"},getSubmitButtonSelector:function(){return this.getPrimaryButtonSelector()+".submit"},getSelectedQuotesSelector:function(){return"ul.post-controls li.quoteCtrl.selected"},getTabsCountSelector:function(){return"div.content-entry-box-reply ul.content-entry-box-tabs li"},getContentEntryBoxTabCount:function(){return A(this.getTabsCountSelector()).length},sliderIsVisible:function(){return this.isVisible(this.getSlideoutSelector())&&A(this.getSlideoutSelector()).closest(".conversation-toolbar-wrapper").length==1},isVisible:function(C){if(A(C).length==0||A(C).hasClass("h-hide")||A(C).css("display").toLowerCase()==="none"){return false}else{return true}},hideElement:function(C){if(A(C).length==1&&A(C).css("display").toLowerCase()==="none"&&!A(C).hasClass("h-hide")){A(C).addClass("h-hide")}},addSubmitEventToForm:function(){var C=this.getTabsSelector()+" form.editor-form";A(C).each(function(){if(!A(this).hasClass("quote")){A(this).addClass("quote").on("submit",function(){return vBulletin.conversation.replyWithQuotes.clickSubmitButton(A(this))})}})},clickPostReplyButton:function(C){if(C===1){A(this.getPostReplyButtonSelector()).click()}},clickQuoteIcon:function(C){this.setPostReplyButtonStyle(C);this.clickPostReplyButton(C);this.addSubmitEventToForm();this.refreshEditorContent(C)},clickAddMoreQuotesButton:function(C){if(vBulletin.ckeditor.editorExists(C)){vBulletin.ckeditor.getEditor(C).setData("")}A(this.getSlideoutSelector()).slideUp("slow",function(){A(this).addClass("h-hide")})},refreshEditorContent:function(E){if(E==0){var C=A(".js-content-entry").last();if(C.length==1){var F=A(".js-editor",C);var D=F.attr("id");editorIsInitialized=vBulletin.ckeditor.editorExists(D);if(editorIsInitialized){vBulletin.ckeditor.getEditor(D).setData("")}}}},clickCancelButton:function(){this.clearSelectedQuotes();return true},clickSubmitButton:function(C){this.clearSelectedQuotes();return true},isQuoteSelected:function(){if(A(this.getSelectedQuotesSelector()).length>0){return true}else{return false}},clearSelectedQuotes:function(){if(this.isQuoteSelected()){A(this.getSelectedQuotesSelector()).each(function(C){A(this).removeClass("selected")})}this.setPostReplyButtonStyle(0)},setPostReplyButtonStyle:function(D){var C=A(this.getPostReplyQuoteCountSelector());if(D>0){C.text("("+D+")").closest(".button").addClass("special").removeClass("light")}else{C.text("").closest(".button").removeClass("special").addClass("light")}},showAddWithQuotesButton:function(){var C=this.getQuotesButtonSelector();if(this.isQuoteSelected()){A(C).removeClass("h-hide")}else{A(C).addClass("h-hide")}},editorExists:function(){if(this.getContentEntryBoxTabCount()){return true}else{return false}}};vBulletin.conversation.contentEntryBox.moveReplyToThreadBottom=function(){var C=A(".conversation-toolbar-wrapper .conversation-reply-slideout");if(C.length==0){return }C.find("textarea").each(function(){var D=A(this).attr("id");if(vBulletin.ckeditor.editorExists(D)){vBulletin.ckeditor.destroyEditor(D)}});C.appendTo("#quick-reply-container").removeClass("h-hide").show();A("input[placeholder], textarea[placeholder]",C).placeholder();A("#quick-reply-container").removeClass("h-hide")};vBulletin.conversation.contentEntryBox.moveReplyToConversationToolbar=function(D){D=D||A("body");var C=A("#quick-reply-container .conversation-reply-slideout");if(C.length==0){return }C.find("textarea").each(function(){var E=A(this).attr("id");if(vBulletin.ckeditor.editorExists(E)){vBulletin.ckeditor.destroyEditor(E)}});A("#quick-reply-container").addClass("h-hide");C.appendTo(A(".conversation-toolbar-wrapper",D))};vBulletin.conversation.initialCommentCountToDisplay=1;vBulletin.conversation.init=function(){var G=A(".conversation-content-widget"),J=A(".conversation-toolbar-wrapper",G).data("allow-history")=="1";var I=G.filter(".widget-tabs").tabs({selected:(A(".conversation-stream-view",G).length==1?1:0)});I.find(".widget-header .widget-tabs-nav li.ui-state-default:not(.ui-tabs-selected) a").off("click").on("click",function(){location.href=A(this).attr("data-href");return false});var L=new vBulletin.pagination({context:G,allowHistory:J,onPageChanged:function(P,R,O){M.updatePageNumber(P);if(!R){var Q=M.getOption("customFilter");if(Q){Q.pagenum=P;delete M.lastFilters;if(O){delete Q[A(".toolbar-search-form .js-filter-search",G).attr("name")]}}M.applyFilters(false,false,false,true)}Responsive.ConversationContent.checkForSignature()}});var E=A(".conversation-toolbar-wrapper.scrolltofixed-floating",G);var K=function(){if(G.length>0){var O=(G.offset().top+(G.outerHeight()-parseFloat(G.css("border-bottom-width")))-E.height());return O}return 0};try{var N=new vBulletin.scrollToFixed({element:E,limit:K()})}catch(C){}var M=new vBulletin.conversation.filter({context:G,scrollToTop:G,pagination:L,allowHistory:J,hash:G.find(".js-module-top-anchor").attr("id"),onContentLoad:function(){N.updateLimit(K())}});var F=function(){var Q=A(".post-controls .quoteCtrl.selected",G);if(Q.length>0){var P=[];Q.each(function(T){P.push(A(this).parent().attr("data-node-id"))});var O=function(V,T){var U;console.log("setQuotes: start");if(vBulletin.ckeditor.editorExists(V)){U=vBulletin.ckeditor.getEditor(V);if(U){console.log("setQuotes: remove data");U.setData("",function(){console.log("setQuotes: insert quotes data");U.insertHtml(T.replace(/(\n)/gi,"<br />"));U.focus()})}}else{V.val(T.replace(/\<br(\s*\/|)\>/gi,"\n")).focus()}};var R={nodeIds:P,onSuccess:function(T){var U=A(".js-content-entry .js-editor",G).last();O(U,T)},onError:function(){openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("error_fetching_quotes"),iconType:"error"})}};vBulletin.conversation.fetchQuotes.apply(self,[R])}else{var S=A(".js-content-entry .js-editor",G).last();if(vBulletin.ckeditor.editorExists(S)){vBulletin.ckeditor.getEditor(S).focus()}else{S.focus()}}};A(document).off("click",".post-count a").on("click",".post-count a",function(O){O.preventDefault();vBulletin.conversation.showPostLink.apply(O.target,[O])});A(".conversation-toolbar .post-reply-btn").click(function(T,V){var U=A(".js-content-entry").last(),X=this;if(U.length==1){var S=A(".js-editor",U),P=U.offset().top,R=A(".conversation-toolbar-wrapper"),W=R.hasClass("scrolltofixed"),O=R.outerHeight(true),Q=vBulletin.ckeditor.editorExists(S);if(!W){P+=O}if(Q){F.apply(X)}else{vBulletin.ckeditor.initEditor(S,{complete:function(){F.apply(X)}})}vBulletin.animateScrollTop(P,{duration:500,complete:function(){if(Q){vBulletin.ckeditor.focusEditor(S)}}})}});A(".conversation-toolbar .new-quote-btn").click(function(T,R){if(A(".post-controls .quoteCtrl.selected").length==0){openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("please_click_on_the_quote_icon_of_the_post_you_want_to_quote")});return false}var Q=this;var P=A(".content-entry-box",G);var S=P.offset().top;var O=A(".content-entry-box .pane:visible .ckeditor-bare-box",G).first().attr("id");if(!R&&((vBulletin.ckeditor.editorExists(O)&&vBulletin.ckeditor.getEditor(O).getData()!="")||(!vBulletin.ckeditor.requiredScriptsLoaded&&A.trim(A("#"+O).val())!=""))){openConfirmDialog({title:vBulletin.phrase.get("new_with_quote"),message:vBulletin.phrase.get("existing_message_will_be_deleted"),iconType:"warning",onClickYes:function(){if(vBulletin.ckeditor.editorExists(O)){vBulletin.ckeditor.getEditor(O).setData("")}else{A("#"+O).val("")}A(Q).triggerHandler("click",true)},onClickNo:function(){vBulletin.animateScrollTop(S,{duration:500,complete:function(){if(vBulletin.ckeditor.editorExists(O)){vBulletin.ckeditor.getEditor(O).focus()}else{A("#"+O).focus()}}})}});return false}G.addClass("new-with-quote");A("#breadcrumbs .crumb:last").clone().html(vBulletin.phrase.get("new_with_quote")).after(A("#breadcrumbs .crumbSeparator:first").clone()).appendTo(A("#breadcrumbs"));A(".content-entry-box-header",P).html(vBulletin.phrase.get("create_new_conversation_with_quote"));A("form button[name=btnSubmit]",P).html(vBulletin.phrase.get("submit"));A("form input[name=parentid]",P).val(pageData.channelid);A("form .title-field",P).val("");A("button.cancel",P).off("click").on("click",function(U){openConfirmDialog({title:vBulletin.phrase.get("cancel_new_with_quote"),message:vBulletin.phrase.get("existing_message_will_be_deleted"),iconType:"warning",onClickYes:function(){location.reload()}})});if(!vBulletin.ckeditor.editorExists(O)){vBulletin.ckeditor.initEditor(O,{complete:function(){F.apply(Q)}})}else{F.apply(Q)}S=P.offset().top;vBulletin.animateScrollTop(S,{duration:500,complete:function(){}})});A(".conversation-reply-slideout .action-buttons .cancel").click(function(){var O=function(){vBulletin.conversation.contentEntryBox.moveReplyToThreadBottom();vBulletin.conversation.replyWithQuotes.showAddWithQuotesButton()};var P=A(this).closest("form").find("textarea").eq(0).attr("id");if((vBulletin.ckeditor.editorExists(P)&&vBulletin.ckeditor.getEditor(P).getData()!="")||(!vBulletin.ckeditor.editorExists(P)&&A.trim(A("#"+P).val())!="")){var Q=(A(this).closest(".canvas-widget").hasClass("conversation-content-widget"))?"post_reply":"visitor_message";openConfirmDialog({title:vBulletin.phrase.get(Q),message:vBulletin.phrase.get("existing_message_will_be_deleted"),iconType:"warning",onClickYes:function(){vBulletin.conversation.replyWithQuotes.clickCancelButton();if(vBulletin.ckeditor.editorExists(P)){vBulletin.ckeditor.getEditor(P).setData("")}else{A("#"+P).val("")}A(".conversation-toolbar-wrapper .conversation-reply-slideout").slideUp(400,O)},onClickNo:function(){}});return false}if(vBulletin.ckeditor.editorExists(P)){}A(".conversation-toolbar-wrapper .conversation-reply-slideout").slideUp(400,O)});A(document).off("mouseover",".userinfo .userSignatureIcon").on("mouseover",".userinfo .userSignatureIcon",function(){if(A(this).data("qtip-initialized")=="1"){return }A(this).data("qtip-initialized","1");var O=A(this).find(".user-signature");if(A.trim(O.html()).length==0){O=A(this).closest(".list-item").find(".post-signature")}A(this).qtip({content:O,position:{my:"top left",at:"bottom center"},style:{classes:"ui-tooltip-shadow ui-tooltip-light ui-tooltip-rounded ui-tooltip-signature"},hide:{event:"unfocus"},show:{solo:true}});A(this).trigger("mouseover")});var H=A(".conversation-list",G);A(".post-controls",H).disableSelection();H.off("click",".quoteCtrl").on("click",".quoteCtrl",function(){A(this).toggleClass("selected");var O=A(".post-reply-btn .button-text-secondary");var P=O.text().match(/[0-9]+/);P=P?Number(P[0]):0;if(A(this).hasClass("selected")){P++}else{P--}vBulletin.conversation.replyWithQuotes.clickQuoteIcon(P)});H.off("click",".post-history").on("click",".post-history",vBulletin.conversation.showPostHistory);H.off("click",".ipAddress").on("click",".ipAddress",vBulletin.conversation.showIp);H.off("click",".voteCtrl").on("click",".voteCtrl",function(O){if(A(O.target).closest(".bubble-flyout").length==1){vBulletin.conversation.showWhoVoted.apply(O.target,[O])}else{vBulletin.conversation.votePost.apply(this,[O])}return false});H.off("click",".editCtrl").on("click",".editCtrl",vBulletin.conversation.editPost);H.off("click",".flagCtrl").on("click",".flagCtrl",vBulletin.conversation.flagPost);H.off("click",".commentCtrl").on("click",".commentCtrl",function(O){vBulletin.conversation.toggleCommentBox.apply(this,[O])});if((typeof (vBulletin.inlinemod)!="undefined")&&(typeof (vBulletin.inlinemod.init)=="function")){vBulletin.inlinemod.init(G)}H.off("click",".post-comment-btn").on("click",".post-comment-btn",function(O){vBulletin.conversation.postComment.apply(this,[O,function(R){if(R){if(R.redirecturl){location.replace(R.redirecturl);return }if(R.needmod){A(this).closest(".comment-entry-box").find(".comment-textbox").val("").trigger("update.elastic");showStatusMessage(vBulletin.phrase.get("your_post_is_now_being_reviewed_and_waiting_for_moderators_approval"),"moderate");return }var Q=A(this).closest(".list-item"),P=R.totalcomments,W=Math.ceil(P/vBulletin.conversation.COMMENTS_PER_PAGE),V=Q.find(".conversation-comments-wrapper").removeClass("h-hide").find(".conversation-comments");A(this).closest(".comment-entry-box").addClass("has-comments").find(".comment-textbox").val("").trigger("update.elastic");var U=A(R.template).appendTo(V);V.next(".comment-info.bottom").addClass("h-hide");Q.find(".view-prev-btn").show().data("page-num",1).prev("label").hide();V.prev(".comment-info.top").removeClass("h-hide").find(".comment-pagination-control").removeClass(function(){return(P>1)?"hide":""}).end().find(".comment-total label").text(function(){var X=P>1?"x_comments_lower":"x_comment";return vBulletin.phrase.get(X,P)});var T=Q.closest(".ui-tabs-panel").find(".conversation-toolbar-wrapper");if(T.hasClass("scrolltofixed-floating")){var S=T.data("object-instance");if(S){S.addLimit(U.outerHeight(true))}}vBulletin.scrollToAnchor("#post"+R.nodeId)}}])});H.off("click",".conversation-comments-wrapper .view-prev-btn, .conversation-comments-wrapper .view-next-btn").on("click",".conversation-comments-wrapper .view-prev-btn, .conversation-comments-wrapper .view-next-btn",function(){A("body").css("cursor","wait");var S=A(this);var O=S.closest(".list-item");var T=O.find(".conversation-comments-wrapper");var P=T.find(".conversation-comments");var R=Number(S.data("page-num"))||0;var Q=S.closest(".canvas-widget").attr("data-widget-instance-id");A.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/fetch-comments",data:({page:R,parentid:O.attr("data-node-id"),postindex:O.find(".conversation-body .post-count").text().replace("#",""),widgetInstanceId:Q,isblogcomment:S.closest(".blog-list").length==1?1:0}),type:"POST",dataType:"json",complete:function(V,U){console.log("fetch-comments complete.");A("body").css("cursor","auto")},success:function(d,W,c){console.log("fetch-comments successful! result:"+JSON.stringify(d));if(d){if(!d.error){if(d.templates){var X=A("<ul />").attr("class",P.attr("class")),V=d.totalcomments;A.each(d.templates,function(e,f){X.append(f)});P.replaceWith(X);var a=Number(X.find(".list-item:first-child .post-count span").text().replace(/\D/g,"")),b=Number(X.find(".list-item:last-child .post-count span").text().replace(/\D/g,"")),Y=Math.ceil(V/vBulletin.conversation.COMMENTS_PER_PAGE),U,Z;if(S.hasClass("view-prev-btn")){U=S;Z=T.find(".view-next-btn")}else{U=T.find(".view-prev-btn");Z=S}R=d.page;T.find(".comment-info.top").find(".comment-pagination-control > label").show().text(function(){return(a==b)?a:"{0} - {1}".format(a,b)});if(R==1){T.find(".comment-info.bottom").addClass("h-hide")}else{a=b+1;b=a+vBulletin.conversation.COMMENTS_PER_PAGE-1;b=(b>V)?V:b;T.find(".comment-info.bottom").removeClass("h-hide").find(".comment-pagination-control > label").text(function(){return(a==b)?a:"{0} - {1}".format(a,b)})}U.data("page-num",R+1);Z.data("page-num",((R-1)||1));U.removeClass("h-hide-imp")[Y>R?"show":"hide"]().prev("label").show();Z[R>1?"show":"hide"]()}}else{openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("error_x",d.error),iconType:"warning"})}}else{openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("invalid_server_response_please_try_again"),iconType:"error"})}},error:function(W,V,U){console.log("fetch-comments failed! error:"+U);openAlertDialog({title:vBulletin.phrase.get("conversation"),message:vBulletin.phrase.get("error_fetching_comments"),iconType:"error"})}})});A(".content-entry-box form").trigger("reset");vBulletin.conversation.bindEditFormEventHandlers("text");vBulletin.conversation.bindEditFormEventHandlers("comment");var D=A("li.conversation-starter").attr("data-node-id");if(pageData.threadmarking=="0"||pageData.userid=="0"){vBulletin.cookie.setBbarrayCookie("discussion_view",D,Math.round(new Date().getTime()/1000))}else{A.ajax({url:vBulletin.getAjaxBaseurl()+"/ajax/api/node/markRead",data:{nodeid:D},type:"POST",dataType:"json",complete:function(){},success:function(O){if(O&&!O.error){console.log("Topic "+D+" is marked read successfully!")}else{console.log("Topic "+D+" is marked read failed: "+O.error)}},error:function(Q,P,O){console.log("Topic "+D+" is marked read failed:"+O)}})}};A(document).ready(function(){vBulletin.conversation.init()})})(jQuery);