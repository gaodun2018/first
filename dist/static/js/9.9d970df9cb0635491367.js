webpackJsonp([9],{HXef:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("3cXf"),r=a.n(n),s=a("lC5x"),o=a.n(s),i=a("J0Oq"),c=a.n(i),u=a("zSLJ"),l=(a("jCZR"),a("NFfb")),d=a("BK/k"),p=a("wYMm"),h=(a("dK8a"),a("dQe3")),f=Object(d.d)(),m={data:function(){return{dialogFormVisible:!1,isRest:!1,ruleForm:{Account:"",Password:"",checked:""},loading:!1,loginFlag:!0,checkTokenTimer:""}},created:function(){var t=this;return c()(o.a.mark(function e(){var a,n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.userInfo=JSON.parse(localStorage.getItem(l.l)),t.getCurrentUserMenuTree(),a=6e4,n=30,t.checkTokenTimer=setInterval(function(){t.checkToken(n)&&t.Refeshtoken2Accesstoken()},a);case 5:case"end":return e.stop()}},e,t)}))()},computed:{menu:function(){return JSON.parse(localStorage.getItem("SAAS_MENU"))},TrueName:function(){return this.userInfo&&this.userInfo.TrueName},CardImgUrl:function(){return this.userInfo&&this.userInfo.CardImgUrl}},methods:{Refeshtoken2Accesstoken:function(){var t=this;return c()(o.a.mark(function e(){var a,n,r;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=Object(u.a)(l.i)){e.next=3;break}return e.abrupt("return");case 3:return n={refreshtoken:a,appid:p.a},e.next=6,t.$http.getAccessToken(n);case 6:0===(r=e.sent).status&&Object(u.b)(l.j,r.result);case 8:case"end":return e.stop()}},e,t)}))()},checkToken:function(t){var e=Object(u.a)(l.j).split(".")[1],a=JSON.parse(h.Base64.decode(e)).exp,n=(new Date).getTime();return parseInt(a)-parseInt(n/1e3)<=60*t},clickRouter:function(t){for(var e in this.menu)if(t.NavigationId==this.menu[e].NavigationId){if(this.menu[e].Url.indexOf("http")>-1){var a=this.menu[e].Path,n=this.menu[e].Url;console.log(a),this.openPages(a,n)}else this.updateCurrentMenu(this.menu[e]);return}},openPages:function(t,e){console.log(e);var a=Object(u.a)(f+"GDSID"),n=Object(u.a)(l.j),r={appId:t,GDSID:a};$.ajax({url:Object(d.c)()+"apigateway.gaodun.com/saas-service/menu/child",type:"GET",async:!1,data:r,headers:{Authentication:"Basic "+n,"Content-Type":"application/json"},dataType:"json",success:function(t,a,n){if(t&&t.status>553649e3&&t.status<563649999)return localStorage.clear(),location.href="/#/login",void location.reload();0===t.status?window.open(e):101===t.status&&this.stopHalt()},error:function(t,e){},complete:function(){}})},openTiku:function(){var t=Object(u.a)(l.j),e=Object(u.a)(f+"GDSID"),a=localStorage.getItem(l.m),n={session_id:e,username:a=JSON.parse(a)};$.ajax({url:Object(d.c)()+"apigateway.gaodun.com/saas-service/tiku",type:"POST",async:!1,data:n,headers:{Authentication:"Basic "+t,"Content-Type":"application/x-www-form-urlencoded"},dataType:"json",beforeSend:function(t){},success:function(t,e,a){if(t&&t.status>553649e3&&t.status<563649999)return localStorage.clear(),location.href="/#/login",void location.reload();0==t.status&&window.open(t.result)},error:function(t,e){},complete:function(){}})},checkRouterPath:function(t){for(var e in t)if(t[e].isAuth){if(!t[e].ChildNavigations)return t[e].Url;if(t[e].ChildNavigations)return this.checkRouterPath(t[e].ChildNavigations)}},updateCurrentMenu:function(t){var e=this;if(t.ChildNavigations){var a=t.ChildNavigations,n=this.checkRouterPath(a);if(0==parseInt(n))return this.afterFunction();var r=n;this.$router.push({path:n}),setTimeout(function(){e.$store.dispatch("updateCurrentTabId",r)},0)}else this.afterFunction()},afterFunction:function(){this.$message({message:"后续功能正在开发中~~"})},stopHalt:function(){this.$message({message:"您暂未开通权限！"})},handleCommands:function(t){var e=this;return c()(o.a.mark(function a(){var n,r,s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(n=Object(d.d)(),"logout"!=t){a.next=9;break}return r={appid:p.a,token:Object(u.a)(l.j)},a.next=5,e.$http.userLogout(r);case 5:0==a.sent.status&&((s=new Date).setTime(s.getTime()-1),Object(u.b)(l.j,void 0,{expires:s}),Object(u.b)(l.i,void 0,{expires:s}),Object(u.b)(n+"GDSID",void 0,{expires:s}),localStorage.clear(),e.$store.state.navigation.currentLevelOneId=9,e.$router.push({path:"/login"})),a.next=10;break;case 9:case 10:case"end":return a.stop()}},a,e)}))()},getCurrentUserMenuTree:function(){var t=this;return c()(o.a.mark(function e(){var a,n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(u.a)(f+"GDSID"),e.next=3,t.$http.getCurrentUserMenuTree({appId:p.a,GDSID:a});case 3:0===(n=e.sent).status&&(t.reWriteEmptyUrl(n.result.Tpo_Sys_Navigations),localStorage.setItem(l.g,r()(n.result.Tpo_Sys_Navigations)),localStorage.setItem(l.k,r()(n.result.Tpo_sys_Functions)));case 5:case"end":return e.stop()}},e,t)}))()},reWriteEmptyUrl:function(t){for(var e in t)""===t[e].Url&&(t[e].Url=Math.random().toString()),t[e].Url.indexOf("Report")>-1&&(t[e].Url=t[e].Url.replace(/http.*key=/,"/Report/")),t[e].ChildNavigations&&this.reWriteEmptyUrl(t[e].ChildNavigations)}},mounted:function(){localStorage.removeItem(l.a),localStorage.removeItem(l.d),localStorage.removeItem(l.e),localStorage.removeItem(l.b),localStorage.removeItem(l.c)},beforeDestroy:function(){clearInterval(this.checkTokenTimer)}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{staticClass:"header"},[a("div",{staticClass:"w_1200 clear",staticStyle:{"max-width":"1200px",width:"100%"}},[a("a",{staticClass:"logo left",attrs:{href:"javascript:;"}}),t._v(" "),a("div",{staticClass:"user right"},[a("el-dropdown",{attrs:{trigger:"hover"},on:{command:t.handleCommands}},[a("span",{staticClass:"el-dropdown-link-2"},[t.CardImgUrl?a("img",{staticClass:"user_icon",attrs:{src:t.CardImgUrl,alt:"头像"}}):t._e(),t._v(" "),a("span",{staticClass:"user_name"},[t._v(t._s(t.TrueName))]),t._v(" "),a("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"logout"}},[t._v("退出")])],1)],1)],1)])]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"contentHome"},[a("transition",{attrs:{name:"fade",mode:"out-in",appear:""}},[a("ul",{staticClass:"console-menu clear"},t._l(t.menu,function(e){return a("li",{key:e.NavigationId,staticClass:"console-menu-items",on:{click:function(a){t.clickRouter(e)}}},[a("span",{staticClass:"item-icon",attrs:{id:e.Iconurl}}),t._v(" "),a("span",{staticClass:"item-title"},[t._v(t._s(e.Title))])])}))])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("div",{staticClass:"w_1200"},[e("h3",{staticClass:"banner_titt"},[this._v("高顿教育-财经云")]),this._v(" "),e("h4",{staticClass:"banner_titb"},[this._v("提供教学活动和教育资源管理、分析的一体化解决方案")])])])}]};var g=a("Z0/y")(m,v,!1,function(t){a("J7Sb"),a("bMKV")},null,null);e.default=g.exports},J7Sb:function(t,e){},bMKV:function(t,e){}});
//# sourceMappingURL=9.9d970df9cb0635491367.js.map