((function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=typeof global!="undefined"&&global!==null?global:window,a.PivotalApiLib=function(){function a(a){this.account=a,this.update_account=b(this.update_account,this),this.get_stories_for_project=b(this.get_stories_for_project,this),this.get_projects=b(this.get_projects,this),this.first_sync=b(this.first_sync,this),$.ajaxSetup({timeout:6e4,crossDomain:!0,dataType:"xml",headers:{"X-TrackerToken":this.account.token.guid}})}return a.prototype.first_sync=function(){return this.get_projects()},a.prototype.get_projects=function(){var a=this;return $.ajax({url:"https://www.pivotaltracker.com/services/v4/projects",success:function(b,c,d){var e,f,g;e=XML2JSON.parse(b,!0);if(e.projects!=null&&e.projects.project!=null)return e.projects.project.constructor!==Array&&(e.projects.project=[e.projects.project]),PivotalRocketStorage.set_projects(a.account,e.projects.project),g=function(){var a,b,c,d;c=e.projects.project,d=[];for(a=0,b=c.length;a<b;a++)f=c[a],d.push(this.get_stories_for_project(f));return d}.call(a)},error:function(a,b,c){return console.debug(a),console.debug(b),console.debug(c)}})},a.prototype.get_stories_for_project=function(a){var b=this;return $.ajax({url:"http://www.pivotaltracker.com/services/v4/projects/"+a.id+"/stories?filter="+encodeURIComponent("owner:"+this.account.initials),success:function(a,b,c){var d;d=XML2JSON.parse(a,!0);if(d.stories!=null&&d.stories.story!=null)return d.stories.story.constructor!==Array&&(d.stories.story=[d.stories.story]),console.debug(d.stories.story)}})},a.prototype.update_account=function(){var a=this;return $.ajax({url:"https://www.pivotaltracker.com/services/v4/me",success:function(a,b,c){var d,e,f,g;d=XML2JSON.parse(a,!0),d.person!=null&&(d=d.person);if(d.email!=null)return e=PivotalRocketStorage.get_accounts(),f=function(){var a,b,c;c=[];for(a=0,b=e.length;a<b;a++)g=e[a],g.email!=null?g.email===d.email?c.push(d):c.push(g):c.push(void 0);return c}(),PivotalRocketStorage.set_accounts(f)}})},a}(),a.PivotalAuthLib=function(){function a(a,b){$.ajaxSetup({timeout:6e4,crossDomain:!0,dataType:"xml",headers:{}}),$.ajax({url:"https://www.pivotaltracker.com/services/v4/me",username:a,password:b,success:function(a,b,c){var d,e,f,g,h,i;d=XML2JSON.parse(a,!0),d.person!=null&&(d=d.person);if(d.email!=null)return e=PivotalRocketStorage.get_accounts(),f=!1,g=function(){var a,b,c;c=[];for(a=0,b=e.length;a<b;a++)h=e[a],h.email!=null?h.email===d.email?(f=!0,c.push(d)):c.push(h):c.push(void 0);return c}(),f===!1&&g.push(d),PivotalRocketStorage.set_accounts(g),i=new PivotalApiLib(d),i.first_sync()},error:function(a,b,c){return console.debug(a),console.debug(b),console.debug(c)}})}return a}(),$(function(){})})).call(this)
