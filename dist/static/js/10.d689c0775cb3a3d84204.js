webpackJsonp([10],{"6C+W":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"resourceModuleVideoCreate",components:{VideoForm:r("guTH").a}},i={render:function(){var e=this.$createElement;return(this._self._c||e)("VideoForm")},staticRenderFns:[]};var o=r("Z0/y")(n,i,!1,function(e){r("siHa")},null,null);t.default=o.exports},guTH:function(e,t,r){"use strict";var n=r("IHPB"),i=r.n(n),o=r("lC5x"),s=r.n(o),a=r("J0Oq"),u=r.n(a),l=r("gR9K"),c=r("yt7g"),d={components:{SelectKnowledge:l.a},props:["id"],data:function(){return{tags:[],subjectData:[],loading:!1,selectFalg:!1,ruleForm:{title:"",project:"",subject:"",video_id:"",duration_minutes:"",duration_second:0,description:""},multipleSelection:[]}},methods:{initData:function(){var e=this;return u()(s.a.mark(function t(){var r,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:0==(r=t.sent).status&&(n=r.result.resource,e.ruleForm.title=n.title,e.ruleForm.description=n.description,e.ruleForm.video_id=n.video_id,e.ruleForm.duration_minutes=Number(n.duration_minutes),e.ruleForm.duration_second=Number(n.duration_seconds),n.tag&&n.tag.id&&0!=n.tag.id?(e.ruleForm.project=String(n.tag.id),e.ruleForm.subject=n.tag.children&&0!=n.tag.children.length?String(n.tag.children[0].id):"0",e.didChangeProjectSelection(n.tag.id)):(e.ruleForm.project="",e.ruleForm.subject=""));case 4:case"end":return t.stop()}},t,e)}))()},handleInputChange:function(e){""==e&&(this.ruleForm.duration_second=0)},getVideoPath:function(){var e=this;return u()(s.a.mark(function t(){var r,n,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(c.b)(e.ruleForm.video_id),n={url:r},t.next=4,e.$http.getVideoPath(n);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.tags.forEach(function(r){if(r.id==e){var n=[].concat(i()(r.children));t.subjectData=n,t.selectFalg&&(t.ruleForm.subject="0")}})},selectknowledge:function(){this.$store.dispatch("changeDialog",!0)},createResourceForm:function(){var e=this;return u()(s.a.mark(function t(){var r,n,i,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,n="",0!=r.status){t.next=10;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:n=r.result.video_id,t.next=15;break;case 10:if(1!=r.status){t.next=14;break}n=e.ruleForm.video_id,t.next=15;break;case 14:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 15:return i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:n},e.loading=!0,t.next=19,e.$http.storeResource(i);case 19:o=t.sent,e.loading=!1,0==o.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 22:case"end":return t.stop()}},t,e)}))()},editVideoResource:function(){var e=this;return u()(s.a.mark(function t(){var r,n,i,o;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,n="",0!=r.status){t.next=10;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:n=r.result.video_id,t.next=15;break;case 10:if(1!=r.status){t.next=14;break}n=e.ruleForm.video_id,t.next=15;break;case 14:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 15:return i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:n},e.loading=!0,t.next=19,e.$http.editVideoResource(e.$route.params.id,i);case 19:o=t.sent,e.loading=!1,0==o.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 22:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e?t.$route.params.id?t.editVideoResource():t.createResourceForm():console.log("error submit!!")})},resetForm:function(e){this.$refs[e].resetFields()},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e}},created:function(){var e=this;return u()(s.a.mark(function t(){var r,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.id=e.$route.params.id,t.next=4,e.$http.getTags("project");case 4:if(r=t.sent,(n=r.result).forEach(function(e){e.children&&e.children.unshift({id:"0",name:"不限科目"})}),e.tags=n,!e.$route.params.id){t.next=11;break}return t.next=11,e.initData();case 11:e.loading=!1;case 12:case"end":return t.stop()}},t,e)}))()}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource"},[r("div",{staticClass:"outlineeat"},[e._v("\n        "+e._s(e.id?"编辑视频":"新增视频")+"\n    ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px"}},[r("el-form-item",{attrs:{label:"视频名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写视频名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"project",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.project,callback:function(t){e.$set(e.ruleForm,"project",t)},expression:"ruleForm.project"}},e._l(e.tags,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"subject",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject,callback:function(t){e.$set(e.ruleForm,"subject",t)},expression:"ruleForm.subject"}},e._l(e.subjectData,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"备注说明",prop:"description"}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"备注说明","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频地址",prop:"video_id",rules:e.filter_rules({required:!0,type:"isVideoId"})}},[r("el-input",{staticClass:"w_60",attrs:{placeholder:"请输入视频ID","auto-complete":"off"},model:{value:e.ruleForm.video_id,callback:function(t){e.$set(e.ruleForm,"video_id",t)},expression:"ruleForm.video_id"}})],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（分）",prop:"duration_minutes",rules:[{required:!0,type:"number",message:"请填写视频时长的分钟",trigger:"change,blur"}]}},[r("el-input",{attrs:{placeholder:"请填写视频时长的分钟","auto-complete":"off"},model:{value:e.ruleForm.duration_minutes,callback:function(t){e.$set(e.ruleForm,"duration_minutes",e._n(t))},expression:"ruleForm.duration_minutes"}}),e._v("\n                分\n            ")],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（秒）",prop:"duration_second",rules:[{message:"请填写视频时长的秒",type:"number",trigger:"change,blur"}]}},[r("el-input",{attrs:{placeholder:"请填写视频时长的秒","auto-complete":"off"},on:{change:e.handleInputChange},model:{value:e.ruleForm.duration_second,callback:function(t){e.$set(e.ruleForm,"duration_second",e._n(t))},expression:"ruleForm.duration_second"}}),e._v("\n                秒\n            ")],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]},p=r("Z0/y")(d,m,!1,null,null,null);t.a=p.exports},siHa:function(e,t){}});
//# sourceMappingURL=10.d689c0775cb3a3d84204.js.map