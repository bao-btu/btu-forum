window.vBulletin=window.vBulletin||{};window.vBulletin.phrase=window.vBulletin.phrase||{};window.vBulletin.phrase.precache=window.vBulletin.phrase.precache||[];window.vBulletin.phrase.precache=$.merge(window.vBulletin.phrase.precache,["blog_memberblogLabel","edit_conversation","forum","you_have_a_pending_edit_unsaved"]);(function(A){var B=[".forum-activity-stream-widget",".bloghome-widget",".search-widget"];if(!vBulletin.pageHasSelectors(B)){return false}A(document).ready(function(){vBulletin.conversation=vBulletin.conversation||{};var N=vBulletin.conversation.$activityStreamWidget=A(".activity-stream-widget"),D=vBulletin.conversation.$activityStreamTab=A("#activity-stream-tab"),J=vBulletin.conversation.$subscribedTab=A("#subscribed-tab"),K=vBulletin.conversation.$activityStreamList=A(".conversation-list",D),U=vBulletin.conversation.$subscribedList=A(".conversation-list",J),X,Y,R,F,I,d,H,b,T,S=A(".conversation-list",N),Q,Z;var G=N.find(".widget-tabs-nav .ui-tabs-nav > li"),P=G.filter(".ui-tabs-selected"),O=P.index(),c,W={},L=G.parent().data("allow-history")=="1",C=new vBulletin.history.instance(L);if(O==-1){O=0;P=G.first()}c=P.find("> a").attr("href");var M=function(e){var f=(N.offset().top+(N.outerHeight()-parseFloat(N.css("border-bottom-width")))-e.height());return f};var a=function(e){e=e||c;return G.filter('li:has(a[href*="'+e+'"])').first().index()};G.removeClass("ui-state-disabled");vBulletin.tabify.call(N,{tabHistory:C,getTabIndexByHash:a,allowHistory:L,tabParamAsQueryString:true,hash:N.find(".js-module-top-anchor").attr("id"),tabOptions:{selected:O,select:function(g,h){if(T){T.hideFilterOverlay()}if(R){R.hideFilterOverlay()}var f=N.find(".widget-tabs-panel .ui-tabs-panel:visible");var e=f.find(".list-item-body-wrapper.edit-post .edit-conversation-container");if(e.length>0){openAlertDialog({title:vBulletin.phrase.get("edit_conversation"),message:vBulletin.phrase.get("you_have_a_pending_edit_unsaved"),iconType:"warning",onAfterClose:function(){vBulletin.animateScrollTop(e.closest(".list-item").offset().top,{duration:"slow"})}});return false}},show:function(i,k){var h=k.panel.id,e=A(this);if(typeof W[h]=="undefined"){W[h]=A(".conversation-toolbar-wrapper",k.panel).data("allow-history")=="1"}if(k.tab.hash=="#memberblog-tab"){if(!I){I=function(){var m=A(".toolbar-pagenav",k.panel);if(m.length>0){new vBulletin.pagination({context:k.panel,allowHistory:W[h],onPageChanged:function(o,n){if(!n){var p=A(".js-button-filter.js-checked",k.panel).data("filter-value");F(o,p,false,true)}}})}}}if(!F){F=function(r,t,n,q){r=r||1;t=t||"show_all";A(".js-button-filters .js-button-filter",k.panel).removeClass("js-checked").filter('[data-filter-value="{0}"]'.format(t)).addClass("js-checked");var m=vBulletin.makePaginatedUrl(location.href,r);if(!n){if(d.isEnabled()){m=vBulletin.makeFilterUrl(m,"filter_blogs",t,k.panel);var p=d.getState(),s={from:"filter_blogs",page:r,tab:k.tab.hash,filters:{filter_blogs:t}};d[(p&&p.data&&p.data.from&&p.data.from!="filter_blogs")?"setDefaultState":"pushState"](s,document.title,m)}else{if(W){m=vBulletin.makeFilterUrl(m,"filter_blogs",t,k.panel);location.href=m;return false}}}var o={tab:k.tab.hash.replace("#",""),filter_blogs:t=="show_all"?undefined:t};vBulletin.AJAX({url:vBulletin.getAjaxBaseurl()+"/ajax/render/blogmember_tab",data:{from:r,my:t,noToolbar:q,page:o,blogChannelId:e.data("blog-channel-id")},error_phrase:"unable_to_contact_server_please_try_again",success:function(x){var v=A(x);if(v.filter(".conversation-toolbar-wrapper").length){A(k.panel).html(x);I()}else{A(".blogmember-list",k.panel).hide().replaceWith(v).show();var u=v.data("pagination");if(u&&typeof u=="object"&&!A.isEmptyObject(u)){A(".pagenav-form .js-pagenum",k.panel).val(u.currentpage);A(".pagenav-form .pagetotal",k.panel).text(u.totalpages);var w=A(".pagenav-form .arrow",k.panel);if(u.prevurl){w.filter("[rel=prev]").removeClass("h-disabled").attr("href",u.prevurl.replace(/&amp;/g,"&"))}else{w.filter("[rel=prev]").addClass("h-disabled").removeAttr("href")}if(u.nexturl){w.filter("[rel=next]").removeClass("h-disabled").attr("href",u.nexturl.replace(/&amp;/g,"&"))}else{w.filter("[rel=next]").addClass("h-disabled").removeAttr("href")}}A(".conversation-toolbar-wrapper",k.panel).removeClass("h-hide")}}})};A(k.panel).on("click",".js-button-filter",function(o,m){var n=A(this).data("filter-value");F(1,n,m,true)})}if(!d){d=vBulletin.history.instance(W);if(d.isEnabled()){var j=d.getState();if(!j||A.isEmptyObject(j.data)){var f={from:"filter_blogs",page:Number(A(".pagenav-form .defaultpage",k.panel).val())||1,tab:k.tab.hash,filters:{filter_blogs:A(".js-button-filter.js-checked",k.panel).data("filter-value")}};d.setDefaultState(f,document.title,location.href)}d.setStateChange(function(r,s,n){var q=d.getState();if(q.data.from=="filter_blogs"){d.log(q.data,q.title,q.url);var m=e.tabs("option","selected"),o=e.find(".ui-tabs-nav > li").eq(m).find("a").attr("href");if(o!=q.data.tab){var p=A(k.tab).closest(".ui-tabs-nav").find("> li").filter('li:has(a[href*="{0}"])'.format(q.data.tab)).index();vBulletin.selectTabByIndex.call(e,p)}else{F(q.data.page,q.data.filters.filter_blogs,true,true)}}},"filter")}}if(c==k.tab.hash){I()}if(T){T.toggleNewConversations(false)}if(R){R.toggleNewConversations(false)}var g=A(".conversation-list",k.panel);if(!g.hasClass("dataLoaded")){if(c==k.tab.hash&&!Z){Z=true;return false}A(".conversation-empty",k.panel).addClass("h-hide");F()}return }else{if(k.tab.hash=="#activity-stream-tab"){if(R){R.toggleNewConversations(false)}if(!T){H=A(".conversation-toolbar-wrapper.scrolltofixed-floating",D);b=false;T=vBulletin.conversation.activityStreamFilter=new vBulletin.conversation.filter({context:D,autoCheck:A(".toolbar-filter-overlay input[type=radio][value=conversations_on]",N).is(":checked"),scrollToTop:N,allowHistory:W[h],onContentLoad:function(){if(!b){b=new vBulletin.scrollToFixed({element:H,limit:M(H)})}b.updateLimit(M(H));vBulletin.truncatePostContent(K);vBulletin.conversation.processPostContent(K)}});if(c==k.tab.hash){vBulletin.truncatePostContent(K);vBulletin.conversation.processPostContent(K);T.lastFilters={filters:T.getSelectedFilters(A(".toolbar-filter-overlay",D))}}}else{T.setOption("context",D);if(typeof T.lastFilters!="undefined"&&A(".conversation-empty:not(.h-hide)",k.panel).length>0){delete T.lastFilters}}T.applyFilters(false,true)}else{if(k.tab.hash=="#subscribed-tab"){if(T){T.toggleNewConversations(false)}if(!R){X=A(".conversation-toolbar-wrapper.scrolltofixed-floating",J);Y=new vBulletin.scrollToFixed({element:X,limit:M(X)});R=vBulletin.conversation.subscribedFilter=new vBulletin.conversation.filter({context:J,scrollToTop:N,allowHistory:W[h],onContentLoad:function(){Y.updateLimit(M(X));vBulletin.truncatePostContent(U);vBulletin.conversation.processPostContent(U)}});if(c==k.tab.hash){vBulletin.truncatePostContent(U);vBulletin.conversation.processPostContent(U);R.lastFilters={filters:R.getSelectedFilters(A(".toolbar-filter-overlay",J))}}}else{R.setOption("context",J);if(typeof R.lastFilters!="undefined"&&A(".conversation-empty:not(.h-hide)",k.panel).length>0){delete R.lastFilters}}R.applyFilters(false,true)}else{if(k.tab.hash=="#forum-tab"){if(T){T.toggleNewConversations(false)}if(R){R.toggleNewConversations(false)}var l=A(k.panel);if(l.hasClass("dataLoaded")){if(c==k.tab.hash){vBulletin.markreadcheck()}return false}else{if(c==k.tab.hash&&!Q){Q=true;return false}}A(".conversation-empty",k.panel).addClass("h-hide");A.post(vBulletin.getAjaxBaseurl()+"/ajax/render/display_Forums_tab",function(m){l.html(m).addClass(function(){var n=A(".conversation-empty",this);if(n.length==0){return"dataLoaded"}else{n.removeClass("h-hide");return""}})},"json").error(function(o,n,m){console.log("/ajax/render/display_Forums_tab failed. Error: "+m);openAlertDialog({title:vBulletin.phrase.get("forum"),message:vBulletin.phrase.get("unable_to_contact_server_please_try_again"),iconType:"error"})}).complete(function(){vBulletin.markreadcheck()})}}}}}}});vBulletin.truncatePostContent(".search-widget");var E=0;N.find(".ui-tabs-nav li").each(function(){E+=A(this).width()});var V=N.find(".ui-tabs-nav").width();if(E>N.find(".ui-tabs-nav").width()){N.find(".widget-tabs-nav, .module-title").height(N.find(".ui-tabs-nav").height())}N.off("click",".list-item-poll .view-more-ctrl").on("click",".list-item-poll .view-more-ctrl",function(g){var f=A(this).closest("form.poll");var h=f.find("ul.poll");A(this).addClass("h-hide");h.css("max-height","none").find("li.h-hide").slideDown(100,function(){f.find(".action-buttons").removeClass("h-hide").next(".view-less-ctrl").removeClass("h-hide");vBulletin.animateScrollTop(f.offset().top,{duration:"fast"})});return false});N.off("click",".list-item-poll .view-less-ctrl").on("click",".list-item-poll .view-less-ctrl",function(g){var f=A(this).closest("form.poll");vBulletin.conversation.limitVisiblePollOptionsInAPost(f,3);f.find("ul.poll").css("max-height","").find("li.h-hide").slideUp(100);return false});S.off("click",".editCtrl").on("click",".editCtrl",function(f){vBulletin.conversation.editPost.apply(this,[f,T])});S.off("click",".post-history").on("click",".post-history",vBulletin.conversation.showPostHistory);S.off("click",".ipAddress").on("click",".ipAddress",vBulletin.conversation.showIp);S.off("click",".voteCtrl").on("click",".voteCtrl",function(f){if(A(f.target).closest(".bubble-flyout").length==1){vBulletin.conversation.showWhoVoted.apply(f.target,[f])}else{vBulletin.conversation.votePost.apply(this,[f])}return false});S.off("click",".flagCtrl").on("click",".flagCtrl",vBulletin.conversation.flagPost);S.off("click",".commentCtrl").on("click",".commentCtrl",vBulletin.conversation.toggleCommentBox);S.off("click",".comment-entry-box .post-comment-btn").on("click",".comment-entry-box .post-comment-btn",function(f){vBulletin.conversation.postComment.apply(this,[f,function(){T.updatePageNumber(1).applyFilters(false,true)}])});vBulletin.conversation.bindEditFormEventHandlers("all")})})(jQuery);