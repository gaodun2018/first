webpackJsonp([13],{"6C+W":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"resourceModuleVideoCreate",components:{VideoForm:r("guTH").a}},i={render:function(){var e=this.$createElement;return(this._self._c||e)("VideoForm")},staticRenderFns:[]};var o=r("vSla")(n,i,!1,function(e){r("7bVP")},null,null);t.default=o.exports},"7bVP":function(e,t){},guTH:function(e,t,r){"use strict";var n=r("4YfN"),i=r.n(n),o=r("IHPB"),a=r.n(o),s=r("lC5x"),l=r.n(s),u=r("J0Oq"),c=r.n(u),d=r("uqXn"),m=r("yt7g"),g=r("SJI6"),p={components:{SelectKnowledge:d.a},props:["id"],data:function(){return{valiMinites:[{validator:function(e,t,r){(t=Number(t))>999?r(new Error("时长不允许超过三位数")):r()},trigger:"blur"}],valiSeconds:[{validator:function(e,t,r){Number(t)>60?r(new Error("秒数最大不允许超过60")):r()},trigger:"blur"}],getId:"",subjectData:[],loading:!1,selectLoading:!1,selectFalg:!1,ruleForm:{id:"",title:"",project:"",subject:"",video_id:"",duration_minutes:"",duration_second:0,description:"",teacher_id:"",knowledge_id:""},multipleSelection:[],urltip:'[<script src="https://s.gaodun.com/web/static-player/loader.js?',urltip2:'-3" type="text/javascript"><\/script>]',selectValue:"",teacherOptions:[],seachTimeOut:null,dialogKnowledgeVisible:!1,knowledgeList:[],currentSyllabusItemKnowledge:""}},methods:{handleClose:function(e){console.log(this.multipleSelection),console.log(this.getId),this.getId="",this.ruleForm.knowledge_id=[]},handleInputMinutesChange:function(e){var t=this;this.$nextTick(function(){t.ruleForm.duration_minutes=t.ruleForm.duration_minutes.replace(/[^\d]/g,"")})},handleInputSecondChange:function(e){var t=this;this.$nextTick(function(){t.ruleForm.duration_second=t.ruleForm.duration_second.replace(/[^\d]/g,"")})},init:function(){var e=this;return c()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getAllKnowledge(e.$route.params.id).then(function(t){if(0==t.status){var r=t.result.video;e.ruleForm.id=r.id,e.ruleForm.title=r.title,e.ruleForm.description=r.description,e.ruleForm.video_id=r.video_id,e.ruleForm.duration_minutes=Number(parseInt(r.duration/60)),e.ruleForm.duration_second=Number(r.duration)%60,r.tag&&r.tag.id&&0!=r.tag.id?(e.ruleForm.project=String(r.tag.id),e.ruleForm.subject=r.tag.children&&0!=r.tag.children.length?String(r.tag.children[0].id):"0",e.didChangeProjectSelection(r.tag.id)):(e.ruleForm.project="",e.ruleForm.subject="");var n=t.result.teacher;n&&(e.teacherOptions=[{name:n.name,user_id:n.user_id}],e.ruleForm.teacher_id=n.user_id);var i=t.result.knowledge;i&&(e.ruleForm.knowledge_id=[{title:i.title,id:i.id}],e.getId=i.id)}});case 2:case"end":return t.stop()}},t,e)}))()},handleSaveKnowledgeDialog:function(e){this.dialogKnowledgeVisible=!1,this.currentSyllabusItemKnowledge=e,this.ruleForm.knowledge_id=this.currentSyllabusItemKnowledge,this.getId=this.ruleForm.knowledge_id[0].id},handleCloseKnowledgeDialog:function(){this.dialogKnowledgeVisible=!1},changeCurrentSyllabusItemKnowledge:function(e){this.currentSyllabusItemKnowledge=e},handleOpenKnowledgeDialog:function(e){var t=this;return c()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.ruleForm.subject){e.next=3;break}return t.$message({message:"请选择科目",type:"warning"}),e.abrupt("return",!1);case 3:return e.next=5,t.getResourceKnowledgeList();case 5:if(null==t.knowledgeList){e.next=9;break}t.dialogKnowledgeVisible=!0,e.next=11;break;case 9:return t.$message({message:"没有知识点数据",type:"warning"}),e.abrupt("return",!1);case 11:setTimeout(function(){t.$refs.selectKnowledge.showSelectSyllabusKnowledge(t.getId)},0);case 12:case"end":return e.stop()}},e,t)}))()},getResourceKnowledgeList:function(){var e=this;return c()(l.a.mark(function t(){var r,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={tag_id:e.ruleForm.subject},t.next=3,e.$http.getResourceKnowledgeList(r);case 3:0===(n=t.sent).status?e.knowledgeList=n.result.result.contents:e.knowledgeList=null;case 5:case"end":return t.stop()}},t,e)}))()},remoteMethod:function(e){var t=this;""!==e?(clearTimeout(this.seachTimeOut),this.seachTimeOut=setTimeout(function(){t.selectLoading=!0;var r={name:e};t.$http.searchTeacher(r).then(function(e){t.selectLoading=!1,0===e.status&&(t.teacherOptions=e.result)}).catch(function(e){t.selectLoading=!1})},500)):this.teacherOptions=[]},initData:function(){var e=this;return c()(l.a.mark(function t(){var r,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:0==(r=t.sent).status&&(n=r.result.resource,e.ruleForm.title=n.title,e.ruleForm.description=n.description,e.ruleForm.video_id=n.video_id,e.ruleForm.duration_minutes=Number(n.duration_minutes),e.ruleForm.duration_second=Number(n.duration_seconds),n.tag&&n.tag.id&&0!=n.tag.id?(e.ruleForm.project=String(n.tag.id),e.ruleForm.subject=n.tag.children&&0!=n.tag.children.length?String(n.tag.children[0].id):"0",e.didChangeProjectSelection(n.tag.id)):(e.ruleForm.project="",e.ruleForm.subject=""));case 4:case"end":return t.stop()}},t,e)}))()},handleInputChange:function(e){""==e&&(this.ruleForm.duration_second=0)},getVideoPath:function(){var e=this;return c()(l.a.mark(function t(){var r,n,i;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(m.b)(e.ruleForm.video_id),n={url:r},t.next=4,e.$http.getVideoPath(n);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.tagsList.forEach(function(r){if(r.id==e){var n=[].concat(a()(r.children));t.subjectData=n,t.selectFalg&&(t.ruleForm.subject="0")}})},createResourceForm:function(){var e=this;return c()(l.a.mark(function t(){var r,n,i,o;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,n="",0!=r.status){t.next=11;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:n=r.result.video_id,e.ruleForm.video_id=n,t.next=16;break;case 11:if(1!=r.status){t.next=15;break}n=e.ruleForm.video_id,t.next=16;break;case 15:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 16:return i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:e.ruleForm.video_id,teacher_id:e.ruleForm.teacher_id,knowledge_id:e.getId},e.$route.params.id&&(i.id=e.$route.params.id),e.loading=!0,t.next=21,e.$http.storeResource(i);case 21:if(o=t.sent,e.loading=!1,0!=o.status){t.next=31;break}return e.$message({message:"保存成功",type:"success"}),t.next=27,e.$http.clearResource(e.ruleForm.id);case 27:t.sent,setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3),t.next=32;break;case 31:e.$message({message:"保存失败",type:"error"});case 32:case"end":return t.stop()}},t,e)}))()},editVideoResource:function(){var e=this;return c()(l.a.mark(function t(){var r,n,i,o;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,n="",0!=r.status){t.next=10;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:n=r.result.video_id,t.next=15;break;case 10:if(1!=r.status){t.next=14;break}n=e.ruleForm.video_id,t.next=15;break;case 14:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 15:return i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:n},e.loading=!0,t.next=19,e.$http.editVideoResource(e.$route.params.id,i);case 19:o=t.sent,e.loading=!1,0==o.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 22:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.createResourceForm()})},resetForm:function(e){this.$refs[e].resetFields(),this.ruleForm.knowledge_id=[],this.ruleForm.teacher_id=""},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e}},computed:i()({},Object(g.mapState)({tagsList:function(e){return e.resources.tagsList}})),created:function(){var e=this;return c()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.id=e.$route.params.id,t.next=4,e.$store.dispatch("getTagsList","project");case 4:if(!e.$route.params.id){t.next=9;break}return t.next=7,e.init();case 7:return t.next=9,e.getResourceKnowledgeList();case 9:e.loading=!1;case 10:case"end":return t.stop()}},t,e)}))()}},h={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource"},[r("div",{staticClass:"outlineeat"},[e._v("\n    "+e._s(e.id?"编辑视频":"新增视频")+"\n  ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[r("el-form-item",{attrs:{label:"视频名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写视频名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"project",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.project,callback:function(t){e.$set(e.ruleForm,"project",t)},expression:"ruleForm.project"}},e._l(e.tagsList,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"subject",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject,callback:function(t){e.$set(e.ruleForm,"subject",t)},expression:"ruleForm.subject"}},[r("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.subjectData,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})})],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注说明",prop:"description"}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"备注说明","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频地址",prop:"video_id",rules:e.filter_rules({required:!0,type:"isVideoId"})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请输入视频ID","auto-complete":"off"},model:{value:e.ruleForm.video_id,callback:function(t){e.$set(e.ruleForm,"video_id",t)},expression:"ruleForm.video_id"}}),e._v(" "),r("el-tooltip",{attrs:{placement:"top"}},[r("div",{attrs:{slot:"content"},slot:"content"},[e._v("\n            只需要输入地址中不同部分即可,如示例:红色部分："),r("br"),e._v(e._s(e.urltip)+"\n            "),r("span",{staticStyle:{color:"red"}},[e._v("16oe3We00h1ye2hZ")]),e._v(e._s(e.urltip2)+"\n          ")]),e._v(" "),r("i",{staticClass:"el-icon-info"})])],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（分）",prop:"duration_minutes",rules:[{required:!0,message:"该输入项为必填项!",trigger:"change,blur"}].concat(e.valiMinites)}},[r("el-input",{attrs:{placeholder:"请填写视频时长","auto-complete":"off"},on:{input:e.handleInputMinutesChange},model:{value:e.ruleForm.duration_minutes,callback:function(t){e.$set(e.ruleForm,"duration_minutes",t)},expression:"ruleForm.duration_minutes"}}),e._v("\n        分\n      ")],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（秒）",prop:"duration_second",rules:e.valiSeconds}},[r("el-input",{attrs:{placeholder:"请填写视频时长","auto-complete":"off"},on:{input:e.handleInputSecondChange,change:e.handleInputChange},model:{value:e.ruleForm.duration_second,callback:function(t){e.$set(e.ruleForm,"duration_second",t)},expression:"ruleForm.duration_second"}}),e._v("\n        秒\n      ")],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"讲课老师"}},[r("el-select",{attrs:{clearable:"",filterable:"",remote:"","reserve-keyword":"",placeholder:"请选择一个老师（可输入老师姓名搜索）","remote-method":e.remoteMethod,loading:e.selectLoading},model:{value:e.ruleForm.teacher_id,callback:function(t){e.$set(e.ruleForm,"teacher_id",t)},expression:"ruleForm.teacher_id"}},e._l(e.teacherOptions,function(e){return r("el-option",{key:e.user_id,attrs:{label:e.name+"-ID:"+e.user_id,value:e.user_id}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"知识点关联",prop:"name"}},[r("el-row",e._l(e.ruleForm.knowledge_id,function(t){return r("el-tag",{key:t.id,staticClass:"teacher-tag",attrs:{closable:"","disable-transitions":!1},on:{close:function(r){e.handleClose(t)}}},[e._v("\n            "+e._s(t.title)+" -"+e._s(t.id)+"\n          ")])})),e._v(" "),r("el-button",{attrs:{type:"text"},on:{click:e.handleOpenKnowledgeDialog}},[e._v("选择/修改知识点")])],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1),e._v(" "),r("SelectKnowledge",{ref:"selectKnowledge",attrs:{"dialog-knowledge-visible":e.dialogKnowledgeVisible,"knowledge-list":e.knowledgeList,"current-syllabus-item-knowledge":e.currentSyllabusItemKnowledge},on:{changeCurrentSyllabusItemKnowledge:e.changeCurrentSyllabusItemKnowledge,handleCloseKnowledgeDialog:e.handleCloseKnowledgeDialog,handleSaveKnowledgeDialog:e.handleSaveKnowledgeDialog}})],1)},staticRenderFns:[]},f=r("vSla")(p,h,!1,null,null,null);t.a=f.exports}});
//# sourceMappingURL=13.b03048210e1860d916c2.js.map