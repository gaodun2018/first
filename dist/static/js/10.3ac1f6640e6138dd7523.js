webpackJsonp([10],{HXef:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("3cXf"),r=a.n(n),s=a("lC5x"),o=a.n(s),i=a("J0Oq"),c=a.n(i),u=a("zSLJ"),l=(a("jCZR"),a("NFfb")),d=a("BK/k"),p=a("wYMm"),h=(a("dK8a"),a("dQe3")),f=Object(d.d)(),m={data:function(){return{dialogFormVisible:!1,isRest:!1,ruleForm:{Account:"",Password:"",checked:""},loading:!1,loginFlag:!0,checkTokenTimer:""}},created:function(){var e=this;return c()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.userInfo=JSON.parse(localStorage.getItem(l.l)),e.getCurrentUserMenuTree(),a=6e4,n=30,e.checkTokenTimer=setInterval(function(){e.checkToken(n)&&e.Refeshtoken2Accesstoken()},a);case 5:case"end":return t.stop()}},t,e)}))()},computed:{menu:function(){return JSON.parse(localStorage.getItem("SAAS_MENU"))},TrueName:function(){return this.userInfo&&this.userInfo.TrueName},CardImgUrl:function(){return this.userInfo&&this.userInfo.CardImgUrl}},methods:{Refeshtoken2Accesstoken:function(){var e=this;return c()(o.a.mark(function t(){var a,n,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(a=Object(u.a)(l.i)){t.next=3;break}return t.abrupt("return");case 3:return n={refreshtoken:a,appid:p.a},t.next=6,e.$http.getAccessToken(n);case 6:0===(r=t.sent).status&&Object(u.b)(l.j,r.result);case 8:case"end":return t.stop()}},t,e)}))()},checkToken:function(e){var t=Object(u.a)(l.j).split(".")[1],a=JSON.parse(h.Base64.decode(t)).exp,n=(new Date).getTime();return parseInt(a)-parseInt(n/1e3)<=60*e},clickRouter:function(e){for(var t in this.menu)if(e.NavigationId==this.menu[t].NavigationId){if(this.menu[t].Url.indexOf("http")>-1){var a=this.menu[t].Path,n=this.menu[t].Url;console.log(a),this.openPages(a,n)}else this.updateCurrentMenu(this.menu[t]);return}},openPages:function(e,t){console.log(t);var a=Object(u.a)(f+"GDSID"),n=Object(u.a)(l.j),r={appId:e,GDSID:a};$.ajax({url:Object(d.c)()+"apigateway.gaodun.com/saas-service/menu/child",type:"GET",async:!1,data:r,headers:{Authentication:"Basic "+n,"Content-Type":"application/json"},dataType:"json",success:function(e,a,n){if(e&&e.status>553649e3&&e.status<563649999)return localStorage.clear(),location.href="/#/login",void location.reload();0===e.status?window.open(t):101===e.status&&this.stopHalt()},error:function(e,t){},complete:function(){}})},openTiku:function(){var e=Object(u.a)(l.j),t=Object(u.a)(f+"GDSID"),a=localStorage.getItem(l.m),n={session_id:t,username:a=JSON.parse(a)};$.ajax({url:Object(d.c)()+"apigateway.gaodun.com/saas-service/tiku",type:"POST",async:!1,data:n,headers:{Authentication:"Basic "+e,"Content-Type":"application/x-www-form-urlencoded"},dataType:"json",beforeSend:function(e){},success:function(e,t,a){if(e&&e.status>553649e3&&e.status<563649999)return localStorage.clear(),location.href="/#/login",void location.reload();0==e.status&&window.open(e.result)},error:function(e,t){},complete:function(){}})},checkRouterPath:function(e){for(var t in e)if(e[t].isAuth){if(!e[t].ChildNavigations)return e[t].Url;if(e[t].ChildNavigations)return this.checkRouterPath(e[t].ChildNavigations)}},updateCurrentMenu:function(e){var t=this;if(e.ChildNavigations){var a=e.ChildNavigations,n=this.checkRouterPath(a);if(0==parseInt(n))return this.afterFunction();var r=n;this.$router.push({path:n}),setTimeout(function(){t.$store.dispatch("updateCurrentTabId",r)},0)}else this.afterFunction()},afterFunction:function(){this.$message({message:"后续功能正在开发中~~"})},stopHalt:function(){this.$message({message:"您暂未开通权限！"})},handleCommands:function(e){var t=this;return c()(o.a.mark(function a(){var n,r,s;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(n=Object(d.d)(),"logout"!=e){a.next=9;break}return r={appid:p.a,token:Object(u.a)(l.j)},a.next=5,t.$http.userLogout(r);case 5:0==a.sent.status&&((s=new Date).setTime(s.getTime()-1),Object(u.b)(l.j,void 0,{expires:s}),Object(u.b)(l.i,void 0,{expires:s}),Object(u.b)(n+"GDSID",void 0,{expires:s}),localStorage.clear(),t.$store.state.navigation.currentLevelOneId=9,t.$router.push({path:"/login"})),a.next=10;break;case 9:case 10:case"end":return a.stop()}},a,t)}))()},getCurrentUserMenuTree:function(){var e=this;return c()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=Object(u.a)(f+"GDSID"),t.next=3,e.$http.getCurrentUserMenuTree({appId:p.a,GDSID:a});case 3:0===(n=t.sent).status&&(e.reWriteEmptyUrl(n.result.Tpo_Sys_Navigations),localStorage.setItem(l.g,r()(n.result.Tpo_Sys_Navigations)),localStorage.setItem(l.k,r()(n.result.Tpo_sys_Functions)));case 5:case"end":return t.stop()}},t,e)}))()},reWriteEmptyUrl:function(e){for(var t in e)""===e[t].Url&&(e[t].Url=Math.random().toString()),e[t].Url.indexOf("Report")>-1&&(e[t].Url=e[t].Url.replace(/http.*key=/,"/Report/")),e[t].ChildNavigations&&this.reWriteEmptyUrl(e[t].ChildNavigations)}},mounted:function(){localStorage.removeItem(l.a),localStorage.removeItem(l.d),localStorage.removeItem(l.e),localStorage.removeItem(l.b),localStorage.removeItem(l.c)},beforeDestroy:function(){clearInterval(this.checkTokenTimer)}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"home"},[a("div",{staticClass:"header"},[a("div",{staticClass:"w_1200 clear",staticStyle:{"max-width":"1200px",width:"100%"}},[a("a",{staticClass:"logo left",attrs:{href:"javascript:;"}}),e._v(" "),a("div",{staticClass:"user right"},[a("el-dropdown",{attrs:{trigger:"hover"},on:{command:e.handleCommands}},[a("span",{staticClass:"el-dropdown-link-2"},[e.CardImgUrl?a("img",{staticClass:"user_icon",attrs:{src:e.CardImgUrl,alt:"头像"}}):e._e(),e._v(" "),a("span",{staticClass:"user_name"},[e._v(e._s(e.TrueName))]),e._v(" "),a("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"logout"}},[e._v("退出")])],1)],1)],1)])]),e._v(" "),e._m(0),e._v(" "),a("div",{staticClass:"contentHome"},[a("transition",{attrs:{name:"fade",mode:"out-in",appear:""}},[a("ul",{staticClass:"console-menu clear"},e._l(e.menu,function(t){return a("li",{key:t.NavigationId,staticClass:"console-menu-items",on:{click:function(a){e.clickRouter(t)}}},[a("span",{staticClass:"item-icon",attrs:{id:t.Iconurl}}),e._v(" "),a("span",{staticClass:"item-title"},[e._v(e._s(t.Title))])])}))])],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"banner"},[t("div",{staticClass:"w_1200"},[t("h3",{staticClass:"banner_titt"},[this._v("高顿教育-财经云")]),this._v(" "),t("h4",{staticClass:"banner_titb"},[this._v("提供教学活动和教育资源管理、分析的一体化解决方案")])])])}]};var g=a("Z0/y")(m,v,!1,function(e){a("e+vj"),a("IxJL")},null,null);t.default=g.exports},IxJL:function(e,t){},"e+vj":function(e,t){}});
//# sourceMappingURL=10.3ac1f6640e6138dd7523.js.map