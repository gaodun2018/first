webpackJsonp([14],{H0RF:function(t,e){},HXef:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),n=a("mvHQ"),i=a.n(n),o=a("exGp"),c=a.n(o),u=a("zSLJ"),l=(a("sG0F"),a("NFfb")),m=a("BK/k"),d=a("sD4o"),h=a("wYMm"),p=(a("SMH9"),a("xrTZ")),f=Object(m.e)(),v={data:function(){return{dialogFormVisible:!1,isRest:!1,ruleForm:{Account:"",Password:"",checked:""},loading:!1,loginFlag:!0,checkTokenTimer:"",userInfo:"",menu:[]}},created:function(){var t=this;return c()(r.a.mark(function e(){var a,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.userInfo=JSON.parse(localStorage.getItem(l.l)),t.menu=JSON.parse(localStorage.getItem(l.g)),localStorage.setItem(l.m,i()(Object(u.a)(l.m))),t.getCurrentUserMenuTree(),a=6e4,s=30,t.checkTokenTimer=setInterval(function(){t.checkToken(s)&&t.Refeshtoken2Accesstoken()},a);case 7:case"end":return e.stop()}},e,t)}))()},computed:{TrueName:function(){return this.userInfo&&this.userInfo.TrueName},CardImgUrl:function(){return this.userInfo&&this.userInfo.CardImgUrl}},methods:{Refeshtoken2Accesstoken:function(){var t=this;return c()(r.a.mark(function e(){var a,s,n;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=Object(u.a)(l.i)){e.next=3;break}return e.abrupt("return");case 3:return s={refreshtoken:a,appid:h.a},e.next=6,t.$http.getAccessToken(s);case 6:0===(n=e.sent).status&&Object(d.a)(l.j,n.result,2);case 8:case"end":return e.stop()}},e,t)}))()},checkToken:function(t){var e=Object(u.a)(l.j);if(!e)return!0;var a=e.split(".")[1],s=JSON.parse(p.Base64.decode(a)).exp,r=(new Date).getTime();return parseInt(s)-parseInt(r/1e3)<=60*t},clickRouter:function(t){for(var e in this.menu)if(t.NavigationId==this.menu[e].NavigationId){if(this.menu[e].Url.indexOf("http")>-1){var a=this.menu[e].Path,s=this.menu[e].Url;console.log(a),this.openPages(a,s)}else{if(!t.isAuth)return this.stopHalt();this.updateCurrentMenu(this.menu[e])}return}},openPages:function(t,e){console.log(e);var a=Object(u.a)(f+"GDSID"),s=Object(u.a)(l.j),r={appId:t,GDSID:a},n=this;$.ajax({url:Object(m.c)()+"apigateway.gaodun.com/saas-service/menu/child",type:"GET",async:!1,data:r,headers:{Authentication:"Basic "+s,"Content-Type":"application/json"},dataType:"json",success:function(t,a,s){if(t&&t.status>553649e3&&t.status<563649999)return localStorage.clear(),void(location.href=h.b);0==t.status?window.open(e):101==t.status&&n.$message({message:"您暂未开通权限！"})},error:function(t,e){},complete:function(){}})},checkRouterPath:function(t){for(var e in t)if(t[e].isAuth){if(!t[e].ChildNavigations)return t[e].Url;if(t[e].ChildNavigations)return this.checkRouterPath(t[e].ChildNavigations)}},updateCurrentMenu:function(t){var e=this;if(t.ChildNavigations){var a=t.ChildNavigations,s=this.checkRouterPath(a);if(0==parseInt(s))return this.stopHalt();var r=s;this.$router.push({path:s}),setTimeout(function(){e.$store.dispatch("updateCurrentTabId",r)},0)}else this.afterFunction()},afterFunction:function(){this.$message({message:"后续功能正在开发中~~"})},stopHalt:function(){this.$message({message:"您暂未开通权限！"})},handleCommands:function(t){var e=this;return c()(r.a.mark(function a(){var s,n,i;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(s=Object(m.e)(),"logout"!=t){a.next=9;break}return n={appid:h.a,token:Object(u.a)(l.j)},a.next=5,e.$http.userLogout(n);case 5:0==a.sent.status&&((i=new Date).setTime(i.getTime()-1),Object(d.a)(l.j,void 0,-1),Object(d.a)(l.i,void 0,-1),Object(d.a)(l.m,void 0,-1),Object(d.a)(s+"GDSID",void 0,-1),localStorage.clear(),e.$store.state.navigation.currentLevelOneId=9,location.href=h.b),a.next=10;break;case 9:case 10:case"end":return a.stop()}},a,e)}))()},getCurrentUserMenuTree:function(){var t=this;return c()(r.a.mark(function e(){var a,s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(u.a)(f+"GDSID"),e.next=3,t.$http.getCurrentUserMenuTree({appId:h.a,GDSID:a});case 3:0===(s=e.sent).status&&(t.reWriteEmptyUrl(s.result.Tpo_Sys_Navigations),localStorage.setItem(l.g,i()(s.result.Tpo_Sys_Navigations)),localStorage.setItem(l.k,i()(s.result.Tpo_sys_Functions)),localStorage.setItem(l.l,i()(s.result.Tpo_Sys_Users)),t.menu=s.result.Tpo_Sys_Navigations,t.userInfo=JSON.parse(localStorage.getItem(l.l)));case 5:case"end":return e.stop()}},e,t)}))()},reWriteEmptyUrl:function(t){for(var e in t)""===t[e].Url&&(t[e].Url=Math.random().toString()),t[e].Url.indexOf("Report")>-1&&(t[e].Url=t[e].Url.replace(/http.*key=/,"/Report/")),t[e].ChildNavigations&&this.reWriteEmptyUrl(t[e].ChildNavigations)}},mounted:function(){localStorage.removeItem(l.a),localStorage.removeItem(l.d),localStorage.removeItem(l.e),localStorage.removeItem(l.b),localStorage.removeItem(l.c)},beforeDestroy:function(){clearInterval(this.checkTokenTimer)}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("div",{staticClass:"header"},[a("div",{staticClass:"w_1200 clear",staticStyle:{"max-width":"1200px",width:"100%"}},[a("a",{staticClass:"logo left",attrs:{href:"javascript:;"}}),t._v(" "),a("div",{staticClass:"user right"},[a("el-dropdown",{attrs:{trigger:"hover"},on:{command:t.handleCommands}},[a("span",{staticClass:"el-dropdown-link-2"},[t.CardImgUrl?a("img",{staticClass:"user_icon",attrs:{src:t.CardImgUrl,alt:"头像"}}):t._e(),t._v(" "),a("span",{staticClass:"user_name"},[t._v(t._s(t.TrueName))]),t._v(" "),a("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),t._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"logout"}},[t._v("退出")])],1)],1)],1)])]),t._v(" "),t._m(0),t._v(" "),a("div",{staticClass:"contentHome"},[a("transition",{attrs:{name:"fade",mode:"out-in",appear:""}},[a("ul",{staticClass:"console-menu clear"},t._l(t.menu,function(e){return a("li",{key:e.NavigationId,staticClass:"console-menu-items"},["180302"===e.Path?[a("a",{staticStyle:{display:"block"},attrs:{href:e.Url,target:"_blank"}},[a("span",{staticClass:"item-icon",attrs:{id:e.Iconurl}}),t._v(" "),a("span",{staticClass:"item-title"},[t._v(t._s(e.Title))])])]:[a("div",{staticClass:"console-menu-items-wrapper",on:{click:function(a){t.clickRouter(e)}}},[a("span",{staticClass:"item-icon",attrs:{id:e.Iconurl}}),t._v(" "),a("span",{staticClass:"item-title"},[t._v(t._s(e.Title))])])]],2)}))])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("div",{staticClass:"w_1200"},[e("h3",{staticClass:"banner_titt"},[this._v("高顿教育-财经云")]),this._v(" "),e("h4",{staticClass:"banner_titb"},[this._v("提供教学活动和教育资源管理、分析的一体化解决方案")])])])}]};var _=a("VU/8")(v,g,!1,function(t){a("H0RF"),a("bQJ+")},null,null);e.default=_.exports},"bQJ+":function(t,e){}});
//# sourceMappingURL=14.dead8555e222aed08d21.js.map