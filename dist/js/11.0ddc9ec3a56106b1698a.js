webpackJsonp([11],{hxyI:function(e,t){},iIKR:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=r("Xxa5"),s=r.n(i),n=r("lHA8"),a=r.n(n),o=r("exGp"),l=r.n(o),u=r("bOdI"),c=r.n(u);function d(e){return window.document[e]?window.document[e]:-1!=navigator.appName.indexOf("Microsoft")?document.getElementById(e):document.embeds&&document.embeds[e]?document.embeds[e]:void 0}var m={TYPE_BOKECC:1,TYPE_FLASH:2,TYPE_HTML5:3,newInstance:function(e){if(void 0===e||null===e)return null;var t={};t.player=e;var r=t.player.id;return void 0===r||""==r?t.type=m.TYPE_HTML5:-1!==r.indexOf("videoPlayer_")?t.type=m.TYPE_FLASH:t.type=m.TYPE_BOKECC,t.start=function(){switch(t.type){case m.TYPE_BOKECC:t.player.start();break;case m.TYPE_FLASH:t.player.play2();break;case m.TYPE_HTML5:t.player.play()}},t.pause=function(){t.player.pause()},t.resume=function(){switch(t.type){case m.TYPE_BOKECC:t.player.resume();break;case m.TYPE_FLASH:t.player.play2();break;case m.TYPE_HTML5:t.player.play()}},t.seek=function(e){switch(t.type){case m.TYPE_BOKECC:case m.TYPE_FLASH:t.player.seek(e);break;case m.TYPE_HTML5:t.player.currentTime=e}},t.getDuration=function(){switch(t.type){case m.TYPE_BOKECC:case m.TYPE_FLASH:return t.player.getDuration();case m.TYPE_HTML5:return t.player.duration}},t.getPosition=function(){switch(t.type){case m.TYPE_BOKECC:return d(r).getPosition();case m.TYPE_FLASH:return t.player.getCurrentTime();case m.TYPE_HTML5:return t.player.currentTime}},t.autoPlay=function(e,r){switch(t.type){case m.TYPE_BOKECC:t.player.start();break;case m.TYPE_FLASH:t.player.play2();break;case m.TYPE_HTML5:t.player.click()}},t.end=function(e,r){switch(t.type){case m.TYPE_HTML5:return void(t.player.onended=e(r))}},t},getVideoPlayer:function(){var e=document.getElementById("videoPlay"),t=e.getElementsByTagName("object");return void 0===t[0]&&(t=e.getElementsByTagName("video")),void 0!==t&&m.newInstance(t[0])}},p=m,h=r("yt7g"),v={components:{},props:[],data:function(){var e;return{id:"",video_id:"",currentId:"",title:"",tableData:[],videoPlayer:null,dialogFormVisible:!1,ruleForm:{hour:"",minute:"",second:"",title:"",item_ids:""},openTime:(e={h:""},c()(e,"h",""),c()(e,"h",""),e),isCreate:!1,duration:0,btnLoading:!1,suggestHour:[],suggestMinuteAndSecond:[],checkTimer:null}},mounted:function(){for(var e=0;e<=10;e++){var t={value:e<10?"0"+e:""+e};this.suggestHour.push(t)}for(var r=0;r<=60;r++){var i={value:r<10?"0"+r:""+r};this.suggestMinuteAndSecond.push(i)}},filters:{changeQuestionId:function(e){return""!=e&&null!=e&&void 0!=e?e:"无"}},methods:{querySearchH:function(e,t){t(this.suggestHour)},querySearchMS:function(e,t){t(this.suggestMinuteAndSecond)},resetForm:function(e){this.ruleForm={hour:"",minute:"",second:"",title:"",item_ids:""}},checkVideoTime:function(){return!(60*parseInt(this.ruleForm.hour)*60+60*parseInt(this.ruleForm.minute)+parseInt(this.ruleForm.second)>this.duration)||(this.$message({message:"设置时间节点已超过视频总时长，请重新设置！",type:"warning"}),this.ruleForm.hour=this.openTime.h,this.ruleForm.minute=this.openTime.m,this.ruleForm.second=this.openTime.s,!1)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.checkVideoTime()&&(t.isCreate?t.httpCreateInsteractive():t.httpUpdateInsteractive())})},onRemove:function(e){var t=this;this.$confirm("此操作将删除该节点, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var r={id:e.id};t.$http.removeInsteractive(r).then(function(e){0===e.status?(t.$message({type:"success",message:"删除成功"}),t.getInsteractiveList()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},didClickEdit:function(e){if(this.videoPlayer=p.getVideoPlayer(),!this.videoPlayer)return this.$message({message:"请确认视频是否正常播放！"});this.videoPlayer.pause(),this.duration=this.videoPlayer.getDuration();var t=e.id,r=e.item_ids,i=e.name,s=(e.resource_id,e.times),n=(e.type,Object(h.h)(s)),a=n.h,o=n.m,l=n.s;this.currentId=t,this.openTime.h=a.toString(10),this.openTime.m=o.toString(10),this.openTime.s=l.toString(10),this.ruleForm.hour=a.toString(10),this.ruleForm.minute=o.toString(10),this.ruleForm.second=l.toString(10),this.ruleForm.title=i,this.ruleForm.item_ids=r,this.isCreate=!1,this.dialogFormVisible=!0},httpCreateInsteractive:function(){var e=this;return l()(s.a.mark(function t(){var r,i,n,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=60*parseInt(e.ruleForm.hour)*60+60*parseInt(e.ruleForm.minute)+parseInt(e.ruleForm.second),i={times:r,type:"1",item_ids:e.ruleForm.item_ids,name:e.ruleForm.title,resource_id:e.id},!e.ruleForm.item_ids){t.next=7;break}if(n=e.ruleForm.item_ids.split(","),new a.a(n).size==n.length){t.next=7;break}return e.$message({message:"课中练习题目id重复",type:"warning"}),t.abrupt("return",!1);case 7:return e.btnLoading=!0,t.next=10,e.$http.createInsteractive(i);case 10:o=t.sent,e.btnLoading=!1,0===o.status?(e.$message({message:"添加节点成功！",type:"success"}),e.getInsteractiveList(),e.dialogFormVisible=!1):e.$message({message:o.message?o.message:"添加节点失败！",type:"error"});case 13:case"end":return t.stop()}},t,e)}))()},httpUpdateInsteractive:function(){var e=this;return l()(s.a.mark(function t(){var r,i,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=60*parseInt(e.ruleForm.hour)*60+60*parseInt(e.ruleForm.minute)+parseInt(e.ruleForm.second),i={id:e.currentId,times:r,type:"1",item_ids:e.ruleForm.item_ids,name:e.ruleForm.title,resource_id:e.id},e.btnLoading=!0,t.next=5,e.$http.updateInsteractive(i);case 5:n=t.sent,e.btnLoading=!1,0===n.status?(e.$message({message:"更新节点成功！",type:"success"}),e.getInsteractiveList(),e.dialogFormVisible=!1):e.$message({message:"更新节点失败或无修改！",type:"error"});case 8:case"end":return t.stop()}},t,e)}))()},handleFlag:function(){if(this.videoPlayer=p.getVideoPlayer(),!this.videoPlayer)return this.$message({message:"请确认视频是否正常播放！"});this.isCreate=!0,this.videoPlayer.pause();var e=this.videoPlayer.getPosition();this.duration=this.videoPlayer.getDuration();var t=Object(h.h)(parseInt(e)),r=t.h,i=t.m,s=t.s;this.ruleForm.hour=r.toString(10),this.ruleForm.minute=i.toString(10),this.ruleForm.second=s.toString(10),this.ruleForm.title="",this.ruleForm.item_ids="",this.openTime.h=r.toString(10),this.openTime.m=i.toString(10),this.openTime.s=s.toString(10),this.dialogFormVisible=!0},getInsteractiveList:function(){var e=this;return l()(s.a.mark(function t(){var r,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={resource_id:e.id,types:1},t.next=3,e.$http.getInsteractiveList(r);case 3:0===(i=t.sent).status&&(e.tableData=i.result);case 5:case"end":return t.stop()}},t,e)}))()},initData:function(){var e=this;return l()(s.a.mark(function t(){var r,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:r=t.sent;try{0==r.status&&(i=r.result.resource,e.title=i.title,e.video_id=i.video_id,e.video_id?e.palyVideo(e.video_id):e.$message({message:"无视频播放地址"}))}catch(e){}case 4:case"end":return t.stop()}},t,e)}))()},palyVideo:function(e){void 0!=window.GDVideoPlayerLoaded&&(window.GDVideoPlayerLoaded=void 0),1===e.split("-").length&&(e+="-3"),this.video_id=e;var t=document.createElement("script");t.type="text/javascript",t.src="//s.gaodun.com/web/static-player/loader.js?"+this.video_id,document.getElementById("videoPlay").appendChild(t)}},created:function(){var e=this;return l()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.id=e.$route.params.id,e.initData(),e.getInsteractiveList();case 3:case"end":return t.stop()}},t,e)}))()}},g={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-edu-content video-interactice-wrapper"},[r("div",{staticClass:"outlineeat"},[e._v("\n    课中交互：【视频资源ID："+e._s(e.id)+"】"+e._s(e.title)+"\n  ")]),e._v(" "),r("div",{staticClass:"video-content clear"},[r("div",{ref:"videoPlay",staticClass:"videoPlay",attrs:{id:"videoPlay"}})]),e._v(" "),r("el-row",{staticClass:"flag-btn-box"},[r("el-button",{attrs:{type:"primary",round:""},on:{click:e.handleFlag}},[e._v("标记为重要节点")])],1),e._v(" "),r("el-row",[r("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{border:"",data:e.tableData,height:"300"}},[r("el-table-column",{attrs:{label:"序号",type:"index",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"重要节点时间点",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("secondToDate")(t.row.times))+"\n        ")]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"name",align:"center",label:"重要节点名称"}}),e._v(" "),r("el-table-column",{attrs:{align:"center",label:"课中练习（题目ID）",width:"320"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("changeQuestionId")(t.row.item_ids))+"\n        ")]}}])}),e._v(" "),r("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center",width:"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text"},on:{click:function(r){e.didClickEdit(t.row)}}},[e._v("修改\n          ")]),e._v(" "),r("el-button",{attrs:{type:"text"},on:{click:function(r){e.onRemove(t.row)}}},[e._v("删除\n          ")])]}}])})],1)],1),e._v(" "),r("el-dialog",{staticClass:"tabplane",attrs:{title:e.isCreate?"新增一个重要节点":"修改一个重要节点",center:"",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"140px"}},[r("el-form-item",{attrs:{label:"时间点",required:""}},[r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{prop:"hour"}},[r("el-autocomplete",{staticClass:"coursetxt",attrs:{"fetch-suggestions":e.querySearchH},model:{value:e.ruleForm.hour,callback:function(t){e.$set(e.ruleForm,"hour",t)},expression:"ruleForm.hour"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e._v("时")]),e._v(" "),r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{prop:"minute"}},[r("el-autocomplete",{staticClass:"coursetxt",attrs:{"fetch-suggestions":e.querySearchMS},model:{value:e.ruleForm.minute,callback:function(t){e.$set(e.ruleForm,"minute",t)},expression:"ruleForm.minute"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e._v("分")]),e._v(" "),r("el-col",{attrs:{span:7}},[r("el-form-item",{attrs:{prop:"second"}},[r("el-autocomplete",{staticClass:"coursetxt",attrs:{"fetch-suggestions":e.querySearchMS},model:{value:e.ruleForm.second,callback:function(t){e.$set(e.ruleForm,"second",t)},expression:"ruleForm.second"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:1}},[e._v("秒")])],1),e._v(" "),r("el-form-item",{attrs:{label:"节点名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"coursetxt",attrs:{placeholder:"请输入节点名称"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"课中练习（选填 ）",prop:"item_ids",rules:e.filter_rules({type:"isQuestionArray"})}},[r("el-input",{staticClass:"coursetxt",attrs:{placeholder:"请输入题目，多道题目请用英文逗号隔开"},model:{value:e.ruleForm.item_ids,callback:function(t){e.$set(e.ruleForm,"item_ids",t)},expression:"ruleForm.item_ids"}})],1)],1),e._v(" "),r("div",{attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重 置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v(e._s(e.btnLoading?"保存中":"确 定")+"\n      ")])],1)],1)],1)},staticRenderFns:[]};var f=r("VU/8")(v,g,!1,function(e){r("sktK"),r("hxyI")},"data-v-92f17712",null);t.default=f.exports},sktK:function(e,t){}});
//# sourceMappingURL=11.0ddc9ec3a56106b1698a.js.map