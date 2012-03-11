((function(){var a;a=typeof global!="undefined"&&global!==null?global:window,a.PivotalRocketOptions={background_page:chrome.extension.getBackgroundPage(),templates:{},init:function(){return PivotalRocketOptions.init_templates(),PivotalRocketOptions.init_bindings(),PivotalRocketOptions.init_view()},init_templates:function(){return PivotalRocketOptions.templates.account=Hogan.compile($("#account_template").html())},init_bindings:function(){var a=this;return $("legend.switcher a.inactive").click(function(a){return $("fieldset").toggle()}),$("#addAccount").click(function(a){return $("#pivotalAddError").hide(),$("#accountBox").addClass("adding"),$("#pivotalBaseAuth").is(":visible")?$("#pivotalEmail").focus():$("#pivotalToken").focus(),!1}),$("#cancelAddAccount").click(function(a){return $("#accountBox").removeClass("adding"),!1}),$("#pivotalTokenAuthLink").click(function(a){return $("a.login_switcher_link").removeClass("active"),$(a.target).addClass("active"),$("#pivotalBaseAuth").hide(),$("#pivotalTokenAuth").show(),$("#pivotalToken").focus(),!1}),$("#pivotalBaseAuthLink").click(function(a){return $("a.login_switcher_link").removeClass("active"),$(a.target).addClass("active"),$("#pivotalTokenAuth").hide(),$("#pivotalBaseAuth").show(),$("#pivotalEmail").focus(),!1}),$("#pivotalEmail, #pivotalPassword, #pivotalCompanyName, #pivotalToken").keydown(function(a){if(13===a.keyCode)return PivotalRocketOptions.add_account()}),$("#confirmAddAccount").click(function(a){return PivotalRocketOptions.add_account(),!1}),$("#accountList").on("click","a.edit_account",function(a){return $(a.target).parents("li.account").removeClass("deleting").addClass("editing"),$(a.target).parents("li.account").find("input.company_name").focus(),!1}),$("#accountList").on("click","a.cancel_edit_account",function(a){return $(a.target).parents("li.account").removeClass("editing"),!1}),$("#accountList").on("keydown","input.company_name",function(a){if(13===a.keyCode)return PivotalRocketOptions.update_account(a)}),$("#accountList").on("click","a.confirm_edit_account",function(a){return PivotalRocketOptions.update_account(a),!1}),$("#accountList").on("click","a.delete_account",function(a){return $(a.target).parents("li.account").removeClass("editing").addClass("deleting"),!1}),$("#accountList").on("click","a.cancel_delete_account",function(a){return $(a.target).parents("li.account").removeClass("deleting"),!1}),$("#accountList").on("click","a.confirm_delete_account",function(a){return PivotalRocketOptions.delete_account(a),!1}),$("#updateOptions").click(function(a){return PivotalRocketOptions.update_options(),!1}),$("#mainPage").on("click","a.close_alert_box",function(a){return $(a.target).parents("div.alert_box").slideUp("show"),!1})},init_sort_accounts:function(){return $("#accountList").sortable({placeholder:"ui-state-highlight",dropOnEmpty:!0,handle:"div.sortable_link",update:function(a,b){var c,d,e;return c=$("#accountList").sortable("toArray"),d=function(){var a,b,d;d=[];for(a=0,b=c.length;a<b;a++)e=c[a],d.push($("#"+e).data("accountId"));return d}(),PivotalRocketStorage.sort_accounts(d)}}),$("#accountList").disableSelection()},init_view:function(){return PivotalRocketOptions.account_list(),PivotalRocketOptions.init_options_view()},account_list:function(){var a,b,c,d;$("#accountList").empty();if(PivotalRocketStorage.get_accounts().length>0){d=PivotalRocketStorage.get_accounts();for(b=0,c=d.length;b<c;b++)a=d[b],$("#accountList").append(PivotalRocketOptions.templates.account.render(a))}return PivotalRocketOptions.init_sort_accounts()},init_options_view:function(){return $("#updateInterval").val(PivotalRocketStorage.get_update_interval()),PivotalRocketStorage.get_fullscreen_mode()?$("#fullscreenMode").attr("checked","checked"):$("#fullscreenMode").removeAttr("checked")},update_options:function(){return $("#updateInterval").val(PivotalRocketStorage.set_update_interval($("#updateInterval").val())),PivotalRocketStorage.set_fullscreen_mode($("#fullscreenMode").is(":checked")),PivotalRocketOptions.cleanup_popup(),PivotalRocketOptions.background_page.PivotalRocketBackground.updated_options(),$("#showAlertBox").slideDown("show",function(){var b;return b=function(){if($("#showAlertBox").is(":visible"))return $("#showAlertBox").slideUp("show")},a.setTimeout(b,3e3)})},add_account:function(){var a,b;a={success:function(a,b,c){var d,e;d=XML2JSON.parse(a,!0),d.person!=null&&(d=d.person),e=$("#pivotalCompanyName").val(),e.length>0&&(d.company_name=e),PivotalRocketStorage.save_account(d),$("#pivotalEmail, #pivotalPassword, #pivotalCompanyName").val(""),$("#pivotalAddError").empty(),$("#accountBox").removeClass("adding"),PivotalRocketOptions.account_list(),$("#loginSpinner").hide(),PivotalRocketOptions.background_page.PivotalRocketBackground.updated_accounts();if(!PivotalRocketOptions.background_page.PivotalRocketBackground.is_loading)return PivotalRocketOptions.background_page.PivotalRocketBackground.initial_sync(d)},error:function(a,b,c){return $("#pivotalAddError").show().text(c),$("#loginSpinner").hide()},beforeSend:function(a,b){return $("#loginSpinner").show(),$("#pivotalAddError").hide()}};if($("#pivotalBaseAuth").is(":visible")){a.username=$("#pivotalEmail").val(),a.password=$("#pivotalPassword").val();if(a.username.length>0&&a.password.length>0)return b=new PivotalAuthLib(a)}else{a.token=$("#pivotalToken").val();if(a.token.length>0)return b=new PivotalAuthLib(a)}},update_account:function(a){var b,c,d,e;return e=$(a.target).parents("li.account"),c=e.data("accountId"),b=PivotalRocketStorage.find_account(c),b!=null&&(d=e.find("input.company_name").val(),d.length>0?b.company_name=d:b.company_name=null,PivotalRocketStorage.save_account(b)),e.find(".company_name_text").text(b.company_name||"Not set"),e.removeClass("editing"),PivotalRocketOptions.cleanup_popup(),PivotalRocketOptions.background_page.PivotalRocketBackground.updated_accounts()},delete_account:function(a){var b;return b=$(event.target).parents("li.account"),a=b.data("accountId"),PivotalRocketStorage.delete_account(a),PivotalRocketOptions.account_list(),PivotalRocketOptions.cleanup_popup(),PivotalRocketOptions.background_page.PivotalRocketBackground.updated_accounts()},cleanup_popup:function(){var a;return a=chrome.extension.getURL("popup.html"),chrome.tabs.query({},function(b){var c,d,e,f;f=[];for(d=0,e=b.length;d<e;d++)c=b[d],c.url.substring(0,a.length)===a?f.push(chrome.tabs.remove(c.id)):f.push(void 0);return f})}},$(function(){return PivotalRocketOptions.init()})})).call(this);
