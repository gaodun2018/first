webpackJsonp([1],{"0AAc":function(e,t,r){var i=r("aveB"),n=r("gxSj"),s=r("mz3U")("species");e.exports=function(e){var t;return n(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!n(t.prototype)||(t=void 0),i(t)&&null===(t=t[s])&&(t=void 0)),void 0===t?Array:t}},"6buR":function(e,t,r){r("sBY/")("Set")},"9hf2":function(e,t,r){var i=r("8OEb"),n=r("higW"),s=r("Eg/L"),o=r("Pa60"),a=r("nyTL");e.exports=function(e,t){var r=1==e,u=2==e,c=3==e,l=4==e,d=6==e,p=5==e||d,m=t||a;return function(t,a,f){for(var h,v,_=s(t),g=n(_),y=i(a,f,3),b=o(g.length),F=0,T=r?m(t,b):u?m(t,0):void 0;b>F;F++)if((p||F in g)&&(v=y(h=g[F],F,_),e))if(r)T[F]=v;else if(v)switch(e){case 3:return!0;case 5:return h;case 6:return F;case 2:T.push(h)}else if(l)return!1;return d?-1:c||l?l:T}}},GhDA:function(e,t,r){var i=r("34sJ");i(i.P+i.R,"Set",{toJSON:r("T8B/")("Set")})},JRac:function(e,t,r){"use strict";var i=r("34sJ");e.exports=function(e){i(i.S,e,{of:function(){for(var e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e];return new this(t)}})}},QUVW:function(e,t,r){var i=r("aveB");e.exports=function(e,t){if(!i(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},SyFV:function(e,t){},"T8B/":function(e,t,r){var i=r("NwSb"),n=r("mZFL");e.exports=function(e){return function(){if(i(this)!=e)throw TypeError(e+"#toJSON isn't generic");return n(this)}}},aKEa:function(e,t,r){"use strict";var i=r("cxkW"),n=r("34sJ"),s=r("Xp0p"),o=r("LyA7"),a=r("XYZ1"),u=r("K1SQ"),c=r("YyJW"),l=r("e9BG"),d=r("aveB"),p=r("i4Qm"),m=r("QYYr").f,f=r("9hf2")(0),h=r("GdxE");e.exports=function(e,t,r,v,_,g){var y=i[e],b=y,F=_?"set":"add",T=b&&b.prototype,w={};return h&&"function"==typeof b&&(g||T.forEach&&!o(function(){(new b).entries().next()}))?(b=t(function(t,r){l(t,b,e,"_c"),t._c=new y,void 0!=r&&c(r,_,t[F],t)}),f("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(e){var t="add"==e||"set"==e;e in T&&(!g||"clear"!=e)&&a(b.prototype,e,function(r,i){if(l(this,b,e),!t&&g&&!d(r))return"get"==e&&void 0;var n=this._c[e](0===r?0:r,i);return t?this:n})}),g||m(b.prototype,"size",{get:function(){return this._c.size}})):(b=v.getConstructor(t,e,_,F),u(b.prototype,r),s.NEED=!0),p(b,e),w[e]=b,n(n.G+n.W+n.F,w),g||v.setStrong(b,e,_),b}},iIKR:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("lC5x"),n=r.n(i),s=r("zsLt"),o=r.n(s),a=r("J0Oq"),u=r.n(a),c=r("a3Yh"),l=r.n(c);function d(e){return window.document[e]?window.document[e]:-1!=navigator.appName.indexOf("Microsoft")?document.getElementById(e):document.embeds&&document.embeds[e]?document.embeds[e]:void 0}var p={TYPE_BOKECC:1,TYPE_FLASH:2,TYPE_HTML5:3,newInstance:function(e){if(void 0===e||null===e)return null;var t={};t.player=e;var r=t.player.id;return void 0===r||""==r?t.type=p.TYPE_HTML5:-1!==r.indexOf("videoPlayer_")?t.type=p.TYPE_FLASH:t.type=p.TYPE_BOKECC,t.start=function(){switch(t.type){case p.TYPE_BOKECC:t.player.start();break;case p.TYPE_FLASH:t.player.play2();break;case p.TYPE_HTML5:t.player.play()}},t.pause=function(){t.player.pause()},t.resume=function(){switch(t.type){case p.TYPE_BOKECC:t.player.resume();break;case p.TYPE_FLASH:t.player.play2();break;case p.TYPE_HTML5:t.player.play()}},t.seek=function(e){switch(t.type){case p.TYPE_BOKECC:case p.TYPE_FLASH:t.player.seek(e);break;case p.TYPE_HTML5:t.player.currentTime=e}},t.getDuration=function(){switch(t.type){case p.TYPE_BOKECC:case p.TYPE_FLASH:return t.player.getDuration();case p.TYPE_HTML5:return t.player.duration}},t.getPosition=function(){switch(t.type){case p.TYPE_BOKECC:return d(r).getPosition();case p.TYPE_FLASH:return t.player.getCurrentTime();case p.TYPE_HTML5:return t.player.currentTime}},t.autoPlay=function(e,r){switch(t.type){case p.TYPE_BOKECC:t.player.start();break;case p.TYPE_FLASH:t.player.play2();break;case p.TYPE_HTML5:t.player.click()}},t.end=function(e,r){switch(t.type){case p.TYPE_HTML5:return void(t.player.onended=e(r))}},t},getVideoPlayer:function(){var e=document.getElementById("videoPlay"),t=e.getElementsByTagName("object");return void 0===t[0]&&(t=e.getElementsByTagName("video")),void 0!==t&&p.newInstance(t[0])}},m=p,f=r("yt7g"),h={components:{},props:[],data:function(){var e;return{id:"",video_id:"",currentId:"",title:"",tableData:[],videoPlayer:null,dialogFormVisible:!1,ruleForm:{hour:"",minute:"",second:"",title:"",item_ids:""},openTime:(e={h:""},l()(e,"h",""),l()(e,"h",""),e),isCreate:!1,duration:0,btnLoading:!1,suggestHour:[],suggestMinuteAndSecond:[],checkTimer:null}},mounted:function(){for(var e=0;e<=10;e++){var t={value:e<10?"0"+e:""+e};this.suggestHour.push(t)}for(var r=0;r<=60;r++){var i={value:r<10?"0"+r:""+r};this.suggestMinuteAndSecond.push(i)}},filters:{changeQuestionId:function(e){return""!=e&&null!=e&&void 0!=e?e:"无"}},methods:{querySearchH:function(e,t){t(this.suggestHour)},querySearchMS:function(e,t){t(this.suggestMinuteAndSecond)},resetForm:function(e){this.ruleForm={hour:"",minute:"",second:"",title:"",item_ids:""}},checkVideoTime:function(){return!(60*parseInt(this.ruleForm.hour)*60+60*parseInt(this.ruleForm.minute)+parseInt(this.ruleForm.second)>this.duration)||(this.$message({message:"设置时间节点已超过视频总时长，请重新设置！",type:"warning"}),this.ruleForm.hour=this.openTime.h,this.ruleForm.minute=this.openTime.m,this.ruleForm.second=this.openTime.s,!1)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.checkVideoTime()&&(t.isCreate?t.httpCreateInsteractive():t.httpUpdateInsteractive())})},onRemove:function(e){var t=this;this.$confirm("此操作将删除该节点, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var r={id:e.id};t.$http.removeInsteractive(r).then(function(e){0===e.status?(t.$message({type:"success",message:"删除成功"}),t.getInsteractiveList()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},didClickEdit:function(e){if(this.videoPlayer=m.getVideoPlayer(),!this.videoPlayer)return this.$message({message:"请确认视频是否正常播放！"});this.videoPlayer.pause(),this.duration=this.videoPlayer.getDuration();var t=e.id,r=e.item_ids,i=e.name,n=(e.resource_id,e.times),s=(e.type,Object(f.h)(n)),o=s.h,a=s.m,u=s.s;this.currentId=t,this.openTime.h=o.toString(10),this.openTime.m=a.toString(10),this.openTime.s=u.toString(10),this.ruleForm.hour=o.toString(10),this.ruleForm.minute=a.toString(10),this.ruleForm.second=u.toString(10),this.ruleForm.title=i,this.ruleForm.item_ids=r,this.isCreate=!1,this.dialogFormVisible=!0},httpCreateInsteractive:function(){var e=this;return u()(n.a.mark(function t(){var r,i,s,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=60*parseInt(e.ruleForm.hour)*60+60*parseInt(e.ruleForm.minute)+parseInt(e.ruleForm.second),i={times:r,type:"1",item_ids:e.ruleForm.item_ids,name:e.ruleForm.title,resource_id:e.id},!e.ruleForm.item_ids){t.next=7;break}if(s=e.ruleForm.item_ids.split(","),new o.a(s).size==s.length){t.next=7;break}return e.$message({message:"课中练习题目id重复",type:"warning"}),t.abrupt("return",!1);case 7:return e.btnLoading=!0,t.next=10,e.$http.createInsteractive(i);case 10:a=t.sent,e.btnLoading=!1,0===a.status?(e.$message({message:"添加节点成功！",type:"success"}),e.getInsteractiveList(),e.dialogFormVisible=!1):e.$message({message:a.message?a.message:"添加节点失败！",type:"error"});case 13:case"end":return t.stop()}},t,e)}))()},httpUpdateInsteractive:function(){var e=this;return u()(n.a.mark(function t(){var r,i,s;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=60*parseInt(e.ruleForm.hour)*60+60*parseInt(e.ruleForm.minute)+parseInt(e.ruleForm.second),i={id:e.currentId,times:r,type:"1",item_ids:e.ruleForm.item_ids,name:e.ruleForm.title,resource_id:e.id},e.btnLoading=!0,t.next=5,e.$http.updateInsteractive(i);case 5:s=t.sent,e.btnLoading=!1,0===s.status?(e.$message({message:"更新节点成功！",type:"success"}),e.getInsteractiveList(),e.dialogFormVisible=!1):e.$message({message:"更新节点失败或无修改！",type:"error"});case 8:case"end":return t.stop()}},t,e)}))()},handleFlag:function(){if(this.videoPlayer=m.getVideoPlayer(),!this.videoPlayer)return this.$message({message:"请确认视频是否正常播放！"});this.isCreate=!0,this.videoPlayer.pause();var e=this.videoPlayer.getPosition();this.duration=this.videoPlayer.getDuration();var t=Object(f.h)(parseInt(e)),r=t.h,i=t.m,n=t.s;this.ruleForm.hour=r.toString(10),this.ruleForm.minute=i.toString(10),this.ruleForm.second=n.toString(10),this.ruleForm.title="",this.ruleForm.item_ids="",this.openTime.h=r.toString(10),this.openTime.m=i.toString(10),this.openTime.s=n.toString(10),this.dialogFormVisible=!0},getInsteractiveList:function(){var e=this;return u()(n.a.mark(function t(){var r,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={resource_id:e.id,types:1},t.next=3,e.$http.getInsteractiveList(r);case 3:0===(i=t.sent).status&&(e.tableData=i.result);case 5:case"end":return t.stop()}},t,e)}))()},initData:function(){var e=this;return u()(n.a.mark(function t(){var r,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:r=t.sent;try{0==r.status&&(i=r.result.resource,e.title=i.title,e.video_id=i.video_id,e.video_id?e.palyVideo(e.video_id):e.$message({message:"无视频播放地址"}))}catch(e){console.log(e)}case 4:case"end":return t.stop()}},t,e)}))()},palyVideo:function(e){void 0!=window.GDVideoPlayerLoaded&&(window.GDVideoPlayerLoaded=void 0),1===e.split("-").length&&(e+="-3"),this.video_id=e;var t=document.createElement("script");t.type="text/javascript",t.src="//s.gaodun.com/web/static-player/loader.js?"+this.video_id,document.getElementById("videoPlay").appendChild(t)}},created:function(){var e=this;return u()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.id=e.$route.params.id,e.initData(),e.getInsteractiveList();case 3:case"end":return t.stop()}},t,e)}))()}},v={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-edu-content video-interactice-wrapper"},[r("div",{staticClass:"outlineeat"},[e._v("\n    课中交互：【视频资源ID："+e._s(e.id)+"】"+e._s(e.title)+"\n  ")]),e._v(" "),r("div",{staticClass:"video-content clear"},[r("div",{ref:"videoPlay",staticClass:"videoPlay",attrs:{id:"videoPlay"}})]),e._v(" "),r("el-row",{staticClass:"flag-btn-box"},[r("el-button",{attrs:{type:"primary",round:""},on:{click:e.handleFlag}},[e._v("标记为重要节点")])],1),e._v(" "),r("el-row",[r("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData,height:"300"}},[r("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"重要节点时间点",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("secondToDate")(t.row.times))+"\n        ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"name",align:"center",label:"重要节点名称"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"课中练习（题目ID）",width:"320"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("changeQuestionId")(t.row.item_ids))+"\n        ")]}}])}),e._v(" "),r("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text"},on:{click:function(r){e.didClickEdit(t.row)}}},[e._v("修改\n          ")]),e._v(" "),r("el-button",{attrs:{type:"text"},on:{click:function(r){e.onRemove(t.row)}}},[e._v("删除\n          ")])]}}])})],1)],1),e._v(" "),r("el-dialog",{staticClass:"tabplane",attrs:{title:e.isCreate?"新增一个重要节点":"修改一个重要节点",center:"",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"时间点",required:""}},[r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{prop:"hour"}},[r("el-autocomplete",{staticClass:"coursetxt",attrs:{"fetch-suggestions":e.querySearchH},model:{value:e.ruleForm.hour,callback:function(t){e.$set(e.ruleForm,"hour",t)},expression:"ruleForm.hour"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e._v("时")]),e._v(" "),r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{prop:"minute"}},[r("el-autocomplete",{staticClass:"coursetxt",attrs:{"fetch-suggestions":e.querySearchMS},model:{value:e.ruleForm.minute,callback:function(t){e.$set(e.ruleForm,"minute",t)},expression:"ruleForm.minute"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e._v("分")]),e._v(" "),r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{prop:"second"}},[r("el-autocomplete",{staticClass:"coursetxt",attrs:{"fetch-suggestions":e.querySearchMS},model:{value:e.ruleForm.second,callback:function(t){e.$set(e.ruleForm,"second",t)},expression:"ruleForm.second"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e._v("秒")])],1),e._v(" "),r("el-form-item",{attrs:{label:"节点名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"coursetxt",attrs:{placeholder:"请输入节点名称"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"课中练习（选填 ）",prop:"item_ids",rules:e.filter_rules({type:"isQuestionArray"})}},[r("el-input",{staticClass:"coursetxt",attrs:{placeholder:"请输入题目，多道题目请用英文逗号隔开"},model:{value:e.ruleForm.item_ids,callback:function(t){e.$set(e.ruleForm,"item_ids",t)},expression:"ruleForm.item_ids"}})],1)],1),e._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重 置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v(e._s(e.btnLoading?"保存中":"确 定")+"\n      ")])],1)],1)],1)},staticRenderFns:[]};var _=r("Z0/y")(h,v,!1,function(e){r("nom2"),r("SyFV")},"data-v-6aa0e046",null);t.default=_.exports},iNan:function(e,t,r){r("4dOa"),r("ADnw"),r("HQep"),r("rSMh"),r("GhDA"),r("shXn"),r("6buR"),e.exports=r("yDNk").Set},mZFL:function(e,t,r){var i=r("YyJW");e.exports=function(e,t){var r=[];return i(e,!1,r.push,r,t),r}},nom2:function(e,t){},nyTL:function(e,t,r){var i=r("0AAc");e.exports=function(e,t){return new(i(e))(t)}},pByt:function(e,t,r){"use strict";var i=r("QYYr").f,n=r("Jkib"),s=r("K1SQ"),o=r("8OEb"),a=r("e9BG"),u=r("YyJW"),c=r("rH9p"),l=r("hpZB"),d=r("tTcy"),p=r("GdxE"),m=r("Xp0p").fastKey,f=r("QUVW"),h=p?"_s":"size",v=function(e,t){var r,i=m(t);if("F"!==i)return e._i[i];for(r=e._f;r;r=r.n)if(r.k==t)return r};e.exports={getConstructor:function(e,t,r,c){var l=e(function(e,i){a(e,l,t,"_i"),e._t=t,e._i=n(null),e._f=void 0,e._l=void 0,e[h]=0,void 0!=i&&u(i,r,e[c],e)});return s(l.prototype,{clear:function(){for(var e=f(this,t),r=e._i,i=e._f;i;i=i.n)i.r=!0,i.p&&(i.p=i.p.n=void 0),delete r[i.i];e._f=e._l=void 0,e[h]=0},delete:function(e){var r=f(this,t),i=v(r,e);if(i){var n=i.n,s=i.p;delete r._i[i.i],i.r=!0,s&&(s.n=n),n&&(n.p=s),r._f==i&&(r._f=n),r._l==i&&(r._l=s),r[h]--}return!!i},forEach:function(e){f(this,t);for(var r,i=o(e,arguments.length>1?arguments[1]:void 0,3);r=r?r.n:this._f;)for(i(r.v,r.k,this);r&&r.r;)r=r.p},has:function(e){return!!v(f(this,t),e)}}),p&&i(l.prototype,"size",{get:function(){return f(this,t)[h]}}),l},def:function(e,t,r){var i,n,s=v(e,t);return s?s.v=r:(e._l=s={i:n=m(t,!0),k:t,v:r,p:i=e._l,n:void 0,r:!1},e._f||(e._f=s),i&&(i.n=s),e[h]++,"F"!==n&&(e._i[n]=s)),e},getEntry:v,setStrong:function(e,t,r){c(e,t,function(e,r){this._t=f(e,t),this._k=r,this._l=void 0},function(){for(var e=this._k,t=this._l;t&&t.r;)t=t.p;return this._t&&(this._l=t=t?t.n:this._t._f)?l(0,"keys"==e?t.k:"values"==e?t.v:[t.k,t.v]):(this._t=void 0,l(1))},r?"entries":"values",!r,!0),d(t)}}},rSMh:function(e,t,r){"use strict";var i=r("pByt"),n=r("QUVW");e.exports=r("aKEa")("Set",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return i.def(n(this,"Set"),e=0===e?0:e,e)}},i)},"sBY/":function(e,t,r){"use strict";var i=r("34sJ"),n=r("kvYI"),s=r("8OEb"),o=r("YyJW");e.exports=function(e){i(i.S,e,{from:function(e){var t,r,i,a,u=arguments[1];return n(this),(t=void 0!==u)&&n(u),void 0==e?new this:(r=[],t?(i=0,a=s(u,arguments[2],2),o(e,!1,function(e){r.push(a(e,i++))})):o(e,!1,r.push,r),new this(r))}})}},shXn:function(e,t,r){r("JRac")("Set")},zsLt:function(e,t,r){e.exports={default:r("iNan"),__esModule:!0}}});
//# sourceMappingURL=1.68ef7e45109ea2ca636d.js.map