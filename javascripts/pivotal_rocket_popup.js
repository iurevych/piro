((function(){var a;a=typeof global!="undefined"&&global!==null?global:window,a.PivotalRocketPopup={background_page:chrome.extension.getBackgroundPage(),init:function(){if(PivotalRocketPopup.check_working_mode())return PivotalRocketPopup.background_page.PivotalRocketBackground.popup=a,PivotalRocketPopup.background_page.PivotalRocketBackground.init_popup(),PivotalRocketPopup.init_listener()},check_working_mode:function(){var a;a=chrome.extension.getURL("popup.html");if(PivotalRocketStorage.get_fullscreen_mode()){if(document.location.search==="?popup")return $("body").css({width:0,height:0,display:"none"}),chrome.tabs.query({},function(b){var c,d,e;for(d=0,e=b.length;d<e;d++){c=b[d];if(c.url.substring(0,a.length)===a)return chrome.tabs.update(c.id,{active:!0}),window.close(),!1}return chrome.tabs.create({url:a,active:!0},function(a){return window.close(),!1})}),!1}else{$("body").addClass("popup-mode");if(document.location.search!=="?popup")return chrome.tabs.query({active:!0},function(b){var c,d,e,f;f=[];for(d=0,e=b.length;d<e;d++)c=b[d],document.location.href.substring(0,a.length)===a?f.push(chrome.tabs.remove(c.id)):f.push(void 0);return f}),window.close(),!1}return!0},init_listener:function(){return chrome.extension.onRequest.addListener(function(a,b,c){if(a.clippy_for_story!=null)return PivotalRocketPopup.init_clippy_for_story(a.clippy_for_story),c({})})},init_clippy_for_story:function(a){var b,c,d,e;e=51,b=15,c={allowScriptAccess:"always",wmode:"opaque",scale:"noscale",quality:"high",width:e,height:b,bgcolor:"#FFFFFF"},d={allowScriptAccess:"always",wmode:"opaque",scale:"noscale",quality:"high",width:e,height:b,bgcolor:"#EEEEEE"},$("#clippyStory"+a.id).length>0&&swfobject.embedSWF("images/clippy/clippy_attachment.swf","clippyStory"+a.id,e,b,"9.0.0","javascripts/vendors/swfobject/expressInstall.swf",{text:a.id},c,{}),$("#clippyUrl"+a.id).length>0&&swfobject.embedSWF("images/clippy/clippy_attachment.swf","clippyUrl"+a.id,e,b,"9.0.0","javascripts/vendors/swfobject/expressInstall.swf",{text:a.url},c,{});if($("div.attachment_clippy").length>0)return $("div.attachment_clippy").each(function(a){var c,f;return f=$(this).data("attachmentUrl"),c=$(this).attr("id"),swfobject.embedSWF("images/clippy/clippy_attachment.swf",c,e,b,"9.0.0","javascripts/vendors/swfobject/expressInstall.swf",{text:f},d,{})})}},$(function(){return PivotalRocketPopup.init()})})).call(this)
