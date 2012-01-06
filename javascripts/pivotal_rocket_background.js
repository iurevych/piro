((function(){var a;a=typeof global!="undefined"&&global!==null?global:window,a.PivotalRocketBackground={account:null,pivotal_api_lib:null,popup:null,is_loading:!1,tmp_counter:0,init:function(){if(PivotalRocketStorage.get_accounts().length>0)return PivotalRocketBackground.account==null&&(PivotalRocketBackground.account=PivotalRocketStorage.get_accounts()[0]),PivotalRocketBackground.initial_sync(PivotalRocketBackground.account)},load_popup_view:function(){return chrome.extension.getViews({type:"popup"})[0]},init_popup:function(){PivotalRocketBackground.popup==null&&(PivotalRocketBackground.popup=PivotalRocketBackground.load_popup_view());if(PivotalRocketBackground.popup!=null)return PivotalRocketBackground.init_spinner(),PivotalRocketBackground.init_bindings(),PivotalRocketStorage.get_accounts().length>0?(PivotalRocketBackground.init_list_stories(),PivotalRocketBackground.popup.$("#loginPage, #storyInfo").hide(),PivotalRocketBackground.popup.$("#mainPage").show()):(PivotalRocketBackground.popup.$("#mainPage").hide(),PivotalRocketBackground.popup.$("#loginPage").show())},init_bindings:function(){var a=this;return PivotalRocketBackground.popup.$("#ownerStories").tabs(),PivotalRocketBackground.popup.$("#requesterStories").tabs(),PivotalRocketBackground.popup.$("#login_button").click(function(a){var b,c;return c=PivotalRocketBackground.popup.$("#login_username").val(),b=PivotalRocketBackground.popup.$("#login_password").val(),PivotalRocketBackground.login_by_user(c,b)}),PivotalRocketBackground.popup.$("#updateStories").click(function(a){return PivotalRocketBackground.initial_sync(PivotalRocketBackground.account)}),PivotalRocketBackground.popup.$("#changeAccount").change(function(a){return PivotalRocketBackground.change_account()}),PivotalRocketBackground.popup.$("#selecterStoriesType").change(function(a){return PivotalRocketBackground.change_view_type()}),PivotalRocketBackground.popup.$("#storiesTabs").on("click","li.story_info",function(a){var b,c,d,e,f;return b=$(a.target),f=b.data("story-id"),c=b.parent("ul").data("project-id"),d=b.parent("ul").data("requested"),d=d!=null?!0:!1,e=PivotalRocketStorage.find_story(c,f,d),PivotalRocketBackground.show_story_info(e)})},change_account:function(){var a,b,c,d,e;b=PivotalRocketBackground.popup.$("#changeAccount").val(),e=PivotalRocketStorage.get_accounts();for(c=0,d=e.length;c<d;c++){a=e[c];if(parseInt(a.id)===parseInt(b))return PivotalRocketBackground.account=a,PivotalRocketBackground.init_list_stories(),!0}return!1},change_view_type:function(){var a,b;if(PivotalRocketBackground.popup!=null&&PivotalRocketBackground.account!=null)return a=PivotalRocketBackground.popup.$("#selecterStoriesType").val(),PivotalRocketBackground.popup.$("#storiesTabs div.block").hide(),b=PivotalRocketBackground.popup.$("#storiesTabs #"+a+"Stories"),b.show()},show_story_info:function(a){var b,c,d;if(a!=null){d=PivotalRocketBackground.popup.$("#story_info_template").html();if(d.length>0)return c=Hogan.compile(d),b=PivotalRocketBackground.popup.$("#storyInfo"),b.empty().html(c.render(a)),PivotalRocketBackground.popup.$("#infoPanel").hide(),b.show("blind",{direction:"vertical"},"normal")}},init_spinner:function(){var a,b,c;if(PivotalRocketBackground.popup!=null&&PivotalRocketBackground.account!=null)return c=PivotalRocketBackground.popup.$("#spinner_template").html(),c.length>0&&(a=Hogan.compile(c),b={update_msg:chrome.i18n.getMessage("update_stories_link")},PivotalRocketBackground.is_loading&&(b.is_loading={loading_msg:chrome.i18n.getMessage("loading_msg")}),PivotalRocketBackground.popup.$("#loaderSpinner").empty().html(a.render(b))),PivotalRocketBackground.init_account_swither(),PivotalRocketBackground.change_view_type()},init_account_swither:function(){var a,b,c,d;if(PivotalRocketBackground.popup!=null&&PivotalRocketBackground.account!=null){PivotalRocketBackground.popup.$("#changeAccount").prop("disabled",PivotalRocketBackground.is_loading).empty(),d=PivotalRocketStorage.get_accounts();for(b=0,c=d.length;b<c;b++)a=d[b],PivotalRocketBackground.popup.$("#changeAccount").append("<option value='"+a.id+"'>"+a.email+"</option>");return PivotalRocketBackground.popup.$("#changeAccount").val(PivotalRocketBackground.account.id)}},init_list_stories:function(){var a,b,c,d,e,f,g,h,i,j,k;if(PivotalRocketBackground.popup!=null){i=PivotalRocketBackground.popup.$("#project_cell").html();if(i.length>0){a=Hogan.compile(i),h={current:[],done:[],icebox:[],rcurrent:[],rdone:[],ricebox:[]},g={current:0,done:0,icebox:0,rcurrent:0,rdone:0,ricebox:0},e=PivotalRocketStorage.get_projects(PivotalRocketBackground.account);if(e!=null)for(j=0,k=e.length;j<k;j++)c=e[j],f=PivotalRocketStorage.get_status_stories(c),f!=null&&(f.current!=null&&f.current.length>0&&(c.stories=f.current,g.current+=f.current.length,h.current.push(a.render(c))),f.done!=null&&f.done.length>0&&(c.stories=f.done,g.done+=f.done.length,h.done.push(a.render(c))),f.icebox!=null&&f.icebox.length>0&&(c.stories=f.icebox,g.icebox+=f.icebox.length,h.icebox.push(a.render(c)))),d=PivotalRocketStorage.get_status_stories(c,!0),d!=null&&(c.is_requested_by_me=!0,d.current!=null&&d.current.length>0&&(c.stories=d.current,g.rcurrent+=d.current.length,h.rcurrent.push(a.render(c))),d.done!=null&&d.done.length>0&&(c.stories=d.done,g.rdone+=d.done.length,h.rdone.push(a.render(c))),d.icebox!=null&&d.icebox.length>0&&(c.stories=d.icebox,g.ricebox+=d.icebox.length,h.ricebox.push(a.render(c))));return b="<li class='empty'>"+chrome.i18n.getMessage("no_stories_msg")+"</li>",PivotalRocketBackground.popup.$("#currentTabLabel").empty().text(""+chrome.i18n.getMessage("current_stories_tab")+" ("+g.current.toString()+")"),g.current>0?PivotalRocketBackground.popup.$("#currentStoriesList").empty().html(h.current.join("")):PivotalRocketBackground.popup.$("#currentStoriesList").empty().html(b),PivotalRocketBackground.popup.$("#doneTabLabel").empty().text(""+chrome.i18n.getMessage("done_stories_tab")+" ("+g.done.toString()+")"),g.done>0?PivotalRocketBackground.popup.$("#doneStoriesList").empty().html(h.done.join("")):PivotalRocketBackground.popup.$("#doneStoriesList").empty().html(b),PivotalRocketBackground.popup.$("#iceboxTabLabel").empty().text(""+chrome.i18n.getMessage("icebox_stories_tab")+" ("+g.icebox.toString()+")"),g.icebox>0?PivotalRocketBackground.popup.$("#iceboxStoriesList").empty().html(h.icebox.join("")):PivotalRocketBackground.popup.$("#iceboxStoriesList").empty().html(b),PivotalRocketBackground.popup.$("#currentRequesterTabLabel").empty().text(""+chrome.i18n.getMessage("current_stories_tab")+" ("+g.rcurrent.toString()+")"),g.rcurrent>0?PivotalRocketBackground.popup.$("#currentRequesterStoriesList").empty().html(h.rcurrent.join("")):PivotalRocketBackground.popup.$("#currentRequesterStoriesList").empty().html(b),PivotalRocketBackground.popup.$("#doneRequesterTabLabel").empty().text(""+chrome.i18n.getMessage("done_stories_tab")+" ("+g.rdone.toString()+")"),g.rdone>0?PivotalRocketBackground.popup.$("#doneRequesterStoriesList").empty().html(h.rdone.join("")):PivotalRocketBackground.popup.$("#doneRequesterStoriesList").empty().html(b),PivotalRocketBackground.popup.$("#iceboxRequesterTabLabel").empty().text(""+chrome.i18n.getMessage("icebox_stories_tab")+" ("+g.ricebox.toString()+")"),g.ricebox>0?PivotalRocketBackground.popup.$("#iceboxRequesterStoriesList").empty().html(h.ricebox.join("")):PivotalRocketBackground.popup.$("#iceboxRequesterStoriesList").empty().html(b)}}},initial_sync:function(a){var b=this;return PivotalRocketBackground.is_loading=!0,PivotalRocketBackground.init_spinner(),PivotalRocketBackground.pivotal_api_lib=new PivotalApiLib(a),PivotalRocketBackground.pivotal_api_lib.get_projects({success:function(b,c,d){var e,f,g,h,i,j;e=XML2JSON.parse(b,!0),g=[],e.projects!=null&&e.projects.project!=null&&(g=e.projects.project),g.constructor!==Array&&(g=[g]),PivotalRocketStorage.set_projects(a,g),PivotalRocketBackground.tmp_counter=g.length*2,j=[];for(h=0,i=g.length;h<i;h++)f=g[h],PivotalRocketBackground.pivotal_api_lib.get_stories_for_project({project:f,complete:function(a,b){PivotalRocketBackground.tmp_counter-=1;if(PivotalRocketBackground.tmp_counter<=0)return PivotalRocketBackground.init_list_stories(),PivotalRocketBackground.is_loading=!1,PivotalRocketBackground.init_spinner()},success:function(a,b,c,d){var e,f;return f=[],e=XML2JSON.parse(a,!0),e.stories!=null&&e.stories.story!=null&&(f=e.stories.story),f.constructor!==Array&&(f=[f]),f!=null&&f.length>0?PivotalRocketStorage.set_stories(d,f):PivotalRocketStorage.delete_stories(d)},error:function(a,b,c){}}),j.push(PivotalRocketBackground.pivotal_api_lib.get_stories_for_project_requester({project:f,complete:function(a,b){PivotalRocketBackground.tmp_counter-=1;if(PivotalRocketBackground.tmp_counter<=0)return PivotalRocketBackground.init_list_stories(),PivotalRocketBackground.is_loading=!1,PivotalRocketBackground.init_spinner()},success:function(a,b,c,d){var e,f;return f=[],e=XML2JSON.parse(a,!0),e.stories!=null&&e.stories.story!=null&&(f=e.stories.story),f.constructor!==Array&&(f=[f]),f!=null&&f.length>0?PivotalRocketStorage.set_stories(d,f,!0):PivotalRocketStorage.delete_stories(d,!0)},error:function(a,b,c){}}));return j},error:function(a,b,c){}})},save_account:function(a){var b,c,d,e;if(a.email!=null)return b=PivotalRocketStorage.get_accounts(),c=!1,d=function(){var d,f,g;g=[];for(d=0,f=b.length;d<f;d++)e=b[d],e.email!=null?e.email===a.email?(c=!0,g.push(a)):g.push(e):g.push(void 0);return g}(),c===!1&&d.push(a),PivotalRocketStorage.set_accounts(d),a},login_by_user:function(a,b){var c;if(a!=null&&b!=null)return c=new PivotalAuthLib({username:a,password:b,success:function(a,b,c){var d;return d=XML2JSON.parse(a,!0),d.person!=null&&(d=d.person),PivotalRocketBackground.account=PivotalRocketBackground.save_account(d),PivotalRocketBackground.initial_sync(PivotalRocketBackground.account)},error:function(a,b,c){}})}},$(function(){return PivotalRocketBackground.init()})})).call(this)
