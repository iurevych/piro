((function(){var a;a=typeof global!="undefined"&&global!==null?global:window,a.PivotalRocketPopup={background_page:chrome.extension.getBackgroundPage(),init:function(){return PivotalRocketPopup.background_page.PivotalRocketBackground.popup=a,PivotalRocketPopup.background_page.PivotalRocketBackground.init_popup(),PivotalRocketPopup.init_listener()},init_listener:function(){return chrome.extension.onRequest.addListener(function(a,b,c){if(a.clippy_for_story!=null)return PivotalRocketPopup.init_clippy_for_story(a.clippy_for_story),c({})})},init_clippy_for_story:function(a){var b,c,d;d=15,b=15,c={allowScriptAccess:"always",wmode:"opaque",scale:"noscale",quality:"high",width:d,height:b,bgcolor:"#fff"},$("#clippyStory"+a.id).length>0&&swfobject.embedSWF("images/clippy/clippy_attachment.swf","clippyStory"+a.id,d,b,"9.0.0","javascripts/vendors/swfobject/expressInstall.swf",{text:a.id},c,{}),$("#clippyUrl"+a.id).length>0&&swfobject.embedSWF("images/clippy/clippy_attachment.swf","clippyUrl"+a.id,d,b,"9.0.0","javascripts/vendors/swfobject/expressInstall.swf",{text:a.url},c,{});if($("div.attachment_clippy").length>0)return $("div.attachment_clippy").each(function(a){var e,f;return f=$(this).data("attachmentUrl"),e=$(this).attr("id"),swfobject.embedSWF("images/clippy/clippy_attachment.swf",e,d,b,"9.0.0","javascripts/vendors/swfobject/expressInstall.swf",{text:f},c,{})})}},$(function(){return PivotalRocketPopup.init()})})).call(this)
