webpackJsonp([12],{"3oCu":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"resourceModuleVideoEdit",components:{VideoForm:r("guTH").a},created:function(){console.log("edit video created"),console.log(this.$route.params)}},s={render:function(){var e=this.$createElement;return(this._self._c||e)("VideoForm",{attrs:{id:this.$route.params.id}})},staticRenderFns:[]};var i=r("vSla")(o,s,!1,function(e){r("X/Ip")},null,null);t.default=i.exports},"X/Ip":function(e,t){},guTH:function(e,t,r){"use strict";var o=r("4YfN"),s=r.n(o),i=r("IHPB"),n=r.n(i),a=r("lC5x"),l=r.n(a),u=r("J0Oq"),c=r.n(u),d=r("gR9K"),m=r("yt7g"),p=r("SJI6"),g={components:{SelectKnowledge:d.a},props:["id"],data:function(){return{subjectData:[],loading:!1,selectLoading:!1,selectFalg:!1,ruleForm:{title:"",project:"",subject:"",video_id:"",duration_minutes:"",duration_second:0,description:""},multipleSelection:[],urltip:'[<script src="https://s.gaodun.com/web/static-player/loader.js?',urltip2:'-3" type="text/javascript"><\/script>]',selectValue:"",teacherOptions:[],seachTimeOut:null}},methods:{remoteMethod:function(e){var t=this;""!==e?(clearTimeout(this.seachTimeOut),this.seachTimeOut=setTimeout(function(){console.log(e),t.selectLoading=!0;var r={name:e};t.$http.searchTeacher(r).then(function(e){console.log(e),t.selectLoading=!1,0===e.status&&(t.teacherOptions=e.result)}).catch(function(e){t.selectLoading=!1,console.log(e)})},500)):this.teacherOptions=[]},initData:function(){var e=this;return c()(l.a.mark(function t(){var r,o;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:0==(r=t.sent).status&&(o=r.result.resource,e.ruleForm.title=o.title,e.ruleForm.description=o.description,e.ruleForm.video_id=o.video_id,e.ruleForm.duration_minutes=Number(o.duration_minutes),e.ruleForm.duration_second=Number(o.duration_seconds),o.tag&&o.tag.id&&0!=o.tag.id?(e.ruleForm.project=String(o.tag.id),e.ruleForm.subject=o.tag.children&&0!=o.tag.children.length?String(o.tag.children[0].id):"0",e.didChangeProjectSelection(o.tag.id)):(e.ruleForm.project="",e.ruleForm.subject=""));case 4:case"end":return t.stop()}},t,e)}))()},handleInputChange:function(e){""==e&&(this.ruleForm.duration_second=0)},getVideoPath:function(){var e=this;return c()(l.a.mark(function t(){var r,o,s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(m.b)(e.ruleForm.video_id),o={url:r},t.next=4,e.$http.getVideoPath(o);case 4:return s=t.sent,t.abrupt("return",s);case 6:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.tagsList.forEach(function(r){if(r.id==e){var o=[].concat(n()(r.children));t.subjectData=o,t.selectFalg&&(t.ruleForm.subject="0")}})},selectknowledge:function(){this.$store.dispatch("changeDialog",!0)},createResourceForm:function(){var e=this;return c()(l.a.mark(function t(){var r,o,s,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,o="",0!=r.status){t.next=10;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:o=r.result.video_id,t.next=15;break;case 10:if(1!=r.status){t.next=14;break}o=e.ruleForm.video_id,t.next=15;break;case 14:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 15:return s={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:o},e.loading=!0,t.next=19,e.$http.storeResource(s);case 19:i=t.sent,e.loading=!1,0==i.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 22:case"end":return t.stop()}},t,e)}))()},editVideoResource:function(){var e=this;return c()(l.a.mark(function t(){var r,o,s,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,o="",0!=r.status){t.next=10;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:o=r.result.video_id,t.next=15;break;case 10:if(1!=r.status){t.next=14;break}o=e.ruleForm.video_id,t.next=15;break;case 14:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 15:return s={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:o},e.loading=!0,t.next=19,e.$http.editVideoResource(e.$route.params.id,s);case 19:i=t.sent,e.loading=!1,0==i.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 22:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e?t.$route.params.id?t.editVideoResource():t.createResourceForm():console.log("error submit!!")})},resetForm:function(e){this.$refs[e].resetFields()},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e}},computed:s()({},Object(p.mapState)({tagsList:function(e){return e.resources.tagsList}})),created:function(){var e=this;return c()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.id=e.$route.params.id,t.next=4,e.$store.dispatch("getTagsList","project");case 4:if(!e.$route.params.id){t.next=7;break}return t.next=7,e.initData();case 7:e.loading=!1;case 8:case"end":return t.stop()}},t,e)}))()}},f={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource"},[r("div",{staticClass:"outlineeat"},[e._v("\n    "+e._s(e.id?"编辑视频":"新增视频")+"\n  ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[r("el-form-item",{attrs:{label:"视频名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写视频名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"project",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.project,callback:function(t){e.$set(e.ruleForm,"project",t)},expression:"ruleForm.project"}},e._l(e.tagsList,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"subject",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject,callback:function(t){e.$set(e.ruleForm,"subject",t)},expression:"ruleForm.subject"}},[r("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.subjectData,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})})],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注说明",prop:"description"}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"备注说明","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频地址",prop:"video_id",rules:e.filter_rules({required:!0,type:"isVideoId"})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请输入视频ID","auto-complete":"off"},model:{value:e.ruleForm.video_id,callback:function(t){e.$set(e.ruleForm,"video_id",t)},expression:"ruleForm.video_id"}}),e._v(" "),r("el-tooltip",{attrs:{placement:"top"}},[r("div",{attrs:{slot:"content"},slot:"content"},[e._v("\n            只需要输入地址中不同部分即可,如示例:红色部分："),r("br"),e._v(e._s(e.urltip)+"\n            "),r("span",{staticStyle:{color:"red"}},[e._v("16oe3We00h1ye2hZ")]),e._v(e._s(e.urltip2)+"\n          ")]),e._v(" "),r("i",{staticClass:"el-icon-info"})])],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（分）",prop:"duration_minutes",rules:[{required:!0,type:"number",message:"请填写视频时长的分钟",trigger:"change,blur"}]}},[r("el-input",{attrs:{placeholder:"请填写视频时长的分钟","auto-complete":"off"},model:{value:e.ruleForm.duration_minutes,callback:function(t){e.$set(e.ruleForm,"duration_minutes",e._n(t))},expression:"ruleForm.duration_minutes"}}),e._v("\n        分\n      ")],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（秒）",prop:"duration_second",rules:[{message:"请填写视频时长的秒",type:"number",trigger:"change,blur"}]}},[r("el-input",{attrs:{placeholder:"请填写视频时长的秒","auto-complete":"off"},on:{change:e.handleInputChange},model:{value:e.ruleForm.duration_second,callback:function(t){e.$set(e.ruleForm,"duration_second",e._n(t))},expression:"ruleForm.duration_second"}}),e._v("\n        秒\n      ")],1),e._v(" "),r("el-form-item",{attrs:{label:"讲课老师"}},[r("el-select",{staticStyle:{width:"70%"},attrs:{filterable:"",remote:"","reserve-keyword":"",placeholder:"请选择一个老师（可输入老师姓名搜索）","remote-method":e.remoteMethod,loading:e.selectLoading},model:{value:e.selectValue,callback:function(t){e.selectValue=t},expression:"selectValue"}},e._l(e.teacherOptions,function(e){return r("el-option",{key:e.user_id,attrs:{label:e.name+"-ID:"+e.user_id,value:e.user_id}})}))],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]},h=r("vSla")(g,f,!1,null,null,null);t.a=h.exports}});
//# sourceMappingURL=12.c61a286c55e204cd3eb2.js.map