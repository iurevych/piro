((function(){window.PivotalRocketStorage={accounts:[],set:function(a,b){return window.localStorage.setItem(a,JSON.stringify(b)),b},get:function(a){var b,c;return c=window.localStorage.getItem(a),b=c!=null?JSON.parse(c):null,b},get_accounts:function(){return PivotalRocketStorage.accounts==null&&(PivotalRocketStorage.accounts=PivotalRocketStorage.get("accounts"),PivotalRocketStorage.accounts||(PivotalRocketStorage.accounts=[])),PivotalRocketStorage.accounts},set_accounts:function(a){return PivotalRocketStorage.set("accounts",a),PivotalRocketStorage.accounts=a}}})).call(this)
