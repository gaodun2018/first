webpackJsonp([5],{"6C+W":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"resourceModuleVideoCreate",components:{VideoForm:r("guTH").a}},i={render:function(){var e=this.$createElement;return(this._self._c||e)("VideoForm")},staticRenderFns:[]};var l=r("vSla")(n,i,!1,function(e){r("7bVP")},null,null);t.default=l.exports},"7bVP":function(e,t){},RsT6:function(e,t){},UG1D:function(e,t){},guTH:function(e,t,r){"use strict";var n=r("4YfN"),i=r.n(n),l=r("IHPB"),o=r.n(l),a=r("lC5x"),s=r.n(a),u=r("J0Oq"),c=r.n(u),d={components:{},props:{dialogKnowledgeVisible:{default:!1,type:Boolean},knowledgeList:{type:Array},currentSyllabusItemKnowledge:{}},computed:{isDisabled:function(){return""===this.firstVal||void 0===this.firstVal||null===this.firstVal},isBtnDisabled:function(){return void 0==this.multipleSelection||0==this.multipleSelection.length}},data:function(){return{isForbid:!0,multipleSelection:[],getData:{},infoData:{},firstVal:"",secondVal:"",secondList:[],tableData:[],selectId:"",curIndex:""}},methods:{saveinformation:function(e){this.multipleSelection=e},showSelectSyllabusKnowledge:function(e){var t=this;this.selectId=e,this.loopKnowledgeList(this.knowledgeList);var r=this.getData.parentTitle;e&&-1!=e&&void 0!=r?(this.firstVal=r[0].pid,this.handleFirstChange(this.firstVal),this.secondVal=r[1].pid,this.handleSecondChange(this.secondVal)):(this.firstVal=null,this.secondVal=null,this.tableData=[]),setTimeout(function(){t.toggleSelection([t.tableData[t.curIndex]])},0)},loopKnowledgeList:function(e,t){var r=this,n=this.selectId;e.forEach(function(e,i){if(e.parentTitle=[{name:e.title,pid:e.id}],t&&(e.parentTitle=[].concat(o()(t),o()(e.parentTitle))),e.id==n&&(r.curIndex=i,r.getData=e),null!=e.children)return r.loopKnowledgeList(e.children,e.parentTitle)})},handleFirstChange:function(e){this.secondList=[],this.secondVal="",this.tableData=[];for(var t=0;t<this.knowledgeList.length;t++)this.knowledgeList[t].id===e&&(this.secondList=this.knowledgeList[t].children)},handleSecondChange:function(e){this.tableData=[];for(var t=0;t<this.secondList.length;t++)this.secondList[t].id===e&&(this.tableData=this.secondList[t].children)},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.infoData=e,t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){0==e.length?this.isForbid=!0:void 0==e[0]?this.isForbid=!0:this.isForbid=!1,e.length>1?this.toggleSelection([e[0]]):this.multipleSelection=e},closeDialog:function(){this.$emit("handleCloseKnowledgeDialog")},submitForm:function(){this.$emit("handleSaveKnowledgeDialog",this.multipleSelection)}}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{staticClass:"selectknowledge",attrs:{center:"",title:"请选择知识点关联",visible:e.dialogKnowledgeVisible},on:{close:function(t){e.closeDialog("ruleForm")},"update:visible":function(t){e.dialogKnowledgeVisible=t}}},[r("el-row",{staticClass:"searchtools"},[r("el-col",{attrs:{span:10}},[r("el-select",{staticClass:"group-search",staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},on:{change:e.handleFirstChange},model:{value:e.firstVal,callback:function(t){e.firstVal=t},expression:"firstVal"}},e._l(e.knowledgeList,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}))],1),e._v(" "),r("el-col",{attrs:{span:14}},[r("el-select",{staticClass:"complete-search",staticStyle:{width:"100%"},attrs:{disabled:e.isDisabled,placeholder:"请选择"},on:{change:e.handleSecondChange},model:{value:e.secondVal,callback:function(t){e.secondVal=t},expression:"secondVal"}},e._l(e.secondList,function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}))],1)],1),e._v(" "),r("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.tableData,border:"","tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"55"},on:{"selection-change":e.saveinformation}}),e._v(" "),r("el-table-column",{attrs:{label:"知识点ID",width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.id))]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"title",label:"知识点名",align:"center","show-overflow-tooltip":""}}),e._v(" "),r("el-table-column",{attrs:{prop:"definition",label:"定义",align:"center","show-overflow-tooltip":""}})],1),e._v(" "),r("div",{staticClass:"dialog-footer last-form-item",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.closeDialog("ruleForm")}}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{type:"primary",disabled:e.isForbid},on:{click:function(t){e.submitForm()}}},[e._v("保存")])],1)],1)},staticRenderFns:[]};var g=r("vSla")(d,m,!1,function(e){r("RsT6"),r("UG1D")},null,null).exports,h=r("yt7g"),p=r("SJI6"),f={components:{SelectKnowledge:g},props:["id"],data:function(){return{valiMinites:[{validator:function(e,t,r){(t=Number(t))>999?r(new Error("时长不允许超过三位数")):r()},trigger:"blur"}],valiSeconds:[{validator:function(e,t,r){Number(t)>60?r(new Error("秒数最大不允许超过60")):r()},trigger:"blur"}],getId:"",subjectData:[],loading:!1,selectLoading:!1,selectFalg:!1,ruleForm:{id:"",title:"",project:"",subject:"",video_id:"",duration_minutes:"",duration_second:0,description:"",teacher_id:"",knowledge_id:""},multipleSelection:[],urltip:'[<script src="https://s.gaodun.com/web/static-player/loader.js?',urltip2:'-3" type="text/javascript"><\/script>]',selectValue:"",teacherOptions:[],seachTimeOut:null,dialogKnowledgeVisible:!1,knowledgeList:[],currentSyllabusItemKnowledge:""}},methods:{handleInputMinutesChange:function(e){var t=this;this.$nextTick(function(){t.ruleForm.duration_minutes=t.ruleForm.duration_minutes.replace(/[^\d]/g,"")})},handleInputSecondChange:function(e){var t=this;this.$nextTick(function(){t.ruleForm.duration_second=t.ruleForm.duration_second.replace(/[^\d]/g,"")})},init:function(){var e=this;return c()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getAllKnowledge(e.$route.params.id).then(function(t){if(0==t.status){var r=t.result.video;e.ruleForm.id=r.id,e.ruleForm.title=r.title,e.ruleForm.description=r.description,e.ruleForm.video_id=r.video_id,e.ruleForm.duration_minutes=Number(parseInt(r.duration/60)),e.ruleForm.duration_second=Number(r.duration)%60,r.tag&&r.tag.id&&0!=r.tag.id?(e.ruleForm.project=String(r.tag.id),e.ruleForm.subject=r.tag.children&&0!=r.tag.children.length?String(r.tag.children[0].id):"0",e.didChangeProjectSelection(r.tag.id)):(e.ruleForm.project="",e.ruleForm.subject="");var n=t.result.teacher;n&&(e.teacherOptions=[{name:n.name,user_id:n.user_id}],e.ruleForm.teacher_id=n.user_id);var i=t.result.knowledge;i&&(e.ruleForm.knowledge_id=[{title:i.title,id:i.id}],e.getId=i.id)}});case 2:case"end":return t.stop()}},t,e)}))()},handleSaveKnowledgeDialog:function(e){this.dialogKnowledgeVisible=!1,this.currentSyllabusItemKnowledge=e,this.ruleForm.knowledge_id=this.currentSyllabusItemKnowledge,this.getId=this.ruleForm.knowledge_id[0].id},handleCloseKnowledgeDialog:function(){this.dialogKnowledgeVisible=!1},changeCurrentSyllabusItemKnowledge:function(e){this.currentSyllabusItemKnowledge=e},handleOpenKnowledgeDialog:function(e){var t=this;return c()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(0!=t.ruleForm.subject){e.next=3;break}return t.$message({message:"请选择科目",type:"warning"}),e.abrupt("return",!1);case 3:return e.next=5,t.getResourceKnowledgeList();case 5:if(null==t.knowledgeList){e.next=9;break}t.dialogKnowledgeVisible=!0,e.next=11;break;case 9:return t.$message({message:"没有知识点数据",type:"warning"}),e.abrupt("return",!1);case 11:setTimeout(function(){t.$refs.selectKnowledge.showSelectSyllabusKnowledge(t.getId)},0);case 12:case"end":return e.stop()}},e,t)}))()},getResourceKnowledgeList:function(){var e=this;return c()(s.a.mark(function t(){var r,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={tag_id:e.ruleForm.subject},t.next=3,e.$http.getResourceKnowledgeList(r);case 3:0===(n=t.sent).status?e.knowledgeList=n.result.result.contents:e.knowledgeList=null;case 5:case"end":return t.stop()}},t,e)}))()},remoteMethod:function(e){var t=this;""!==e?(clearTimeout(this.seachTimeOut),this.seachTimeOut=setTimeout(function(){t.selectLoading=!0;var r={name:e};t.$http.searchTeacher(r).then(function(e){t.selectLoading=!1,0===e.status&&(t.teacherOptions=e.result)}).catch(function(e){t.selectLoading=!1})},500)):this.teacherOptions=[]},initData:function(){var e=this;return c()(s.a.mark(function t(){var r,n;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:0==(r=t.sent).status&&(n=r.result.resource,e.ruleForm.title=n.title,e.ruleForm.description=n.description,e.ruleForm.video_id=n.video_id,e.ruleForm.duration_minutes=Number(n.duration_minutes),e.ruleForm.duration_second=Number(n.duration_seconds),n.tag&&n.tag.id&&0!=n.tag.id?(e.ruleForm.project=String(n.tag.id),e.ruleForm.subject=n.tag.children&&0!=n.tag.children.length?String(n.tag.children[0].id):"0",e.didChangeProjectSelection(n.tag.id)):(e.ruleForm.project="",e.ruleForm.subject=""));case 4:case"end":return t.stop()}},t,e)}))()},handleInputChange:function(e){""==e&&(this.ruleForm.duration_second=0)},getVideoPath:function(){var e=this;return c()(s.a.mark(function t(){var r,n,i;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=Object(h.b)(e.ruleForm.video_id),n={url:r},t.next=4,e.$http.getVideoPath(n);case 4:return i=t.sent,t.abrupt("return",i);case 6:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.tagsList.forEach(function(r){if(r.id==e){var n=[].concat(o()(r.children));t.subjectData=n,t.selectFalg&&(t.ruleForm.subject="0")}})},createResourceForm:function(){var e=this;return c()(s.a.mark(function t(){var r,n,i,l;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,n="",0!=r.status){t.next=11;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:n=r.result.video_id,e.ruleForm.video_id=n,t.next=16;break;case 11:if(1!=r.status){t.next=15;break}n=e.ruleForm.video_id,t.next=16;break;case 15:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 16:return i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:e.ruleForm.video_id,teacher_id:e.ruleForm.teacher_id,knowledge_id:e.getId},e.$route.params.id&&(i.id=e.$route.params.id),e.loading=!0,t.next=21,e.$http.storeResource(i);case 21:if(l=t.sent,e.loading=!1,0!=l.status){t.next=31;break}return e.$message({message:"保存成功",type:"success"}),t.next=27,e.$http.clearResource(e.ruleForm.id);case 27:t.sent,setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3),t.next=32;break;case 31:e.$message({message:"保存失败",type:"error"});case 32:case"end":return t.stop()}},t,e)}))()},editVideoResource:function(){var e=this;return c()(s.a.mark(function t(){var r,n,i,l;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getVideoPath();case 2:if(r=t.sent,n="",0!=r.status){t.next=10;break}if(r.result.video_id){t.next=7;break}return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 7:n=r.result.video_id,t.next=15;break;case 10:if(1!=r.status){t.next=14;break}n=e.ruleForm.video_id,t.next=15;break;case 14:return t.abrupt("return",e.$message({type:"warning",message:"视频地址解析失败！"}));case 15:return i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,duration_minutes:e.ruleForm.duration_minutes,duration_seconds:e.ruleForm.duration_second?e.ruleForm.duration_second:0,video_id:n},e.loading=!0,t.next=19,e.$http.editVideoResource(e.$route.params.id,i);case 19:l=t.sent,e.loading=!1,0==l.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/video/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 22:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.createResourceForm()})},resetForm:function(e){this.$refs[e].resetFields()},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},handleSelectionChange:function(e){this.multipleSelection=e}},computed:i()({},Object(p.mapState)({tagsList:function(e){return e.resources.tagsList}})),created:function(){var e=this;return c()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.id=e.$route.params.id,t.next=4,e.$store.dispatch("getTagsList","project");case 4:if(!e.$route.params.id){t.next=9;break}return t.next=7,e.init();case 7:return t.next=9,e.getResourceKnowledgeList();case 9:e.loading=!1;case 10:case"end":return t.stop()}},t,e)}))()}},b={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource"},[r("div",{staticClass:"outlineeat"},[e._v("\n    "+e._s(e.id?"编辑视频":"新增视频")+"\n  ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[r("el-form-item",{attrs:{label:"视频名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写视频名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"project",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.project,callback:function(t){e.$set(e.ruleForm,"project",t)},expression:"ruleForm.project"}},e._l(e.tagsList,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"subject",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject,callback:function(t){e.$set(e.ruleForm,"subject",t)},expression:"ruleForm.subject"}},[r("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.subjectData,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})})],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注说明",prop:"description"}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"备注说明","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"视频地址",prop:"video_id",rules:e.filter_rules({required:!0,type:"isVideoId"})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请输入视频ID","auto-complete":"off"},model:{value:e.ruleForm.video_id,callback:function(t){e.$set(e.ruleForm,"video_id",t)},expression:"ruleForm.video_id"}}),e._v(" "),r("el-tooltip",{attrs:{placement:"top"}},[r("div",{attrs:{slot:"content"},slot:"content"},[e._v("\n            只需要输入地址中不同部分即可,如示例:红色部分："),r("br"),e._v(e._s(e.urltip)+"\n            "),r("span",{staticStyle:{color:"red"}},[e._v("16oe3We00h1ye2hZ")]),e._v(e._s(e.urltip2)+"\n          ")]),e._v(" "),r("i",{staticClass:"el-icon-info"})])],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（分）",prop:"duration_minutes",rules:[{required:!0,message:"该输入项为必填项!",trigger:"change,blur"}].concat(e.valiMinites)}},[r("el-input",{attrs:{placeholder:"请填写视频时长","auto-complete":"off"},on:{input:e.handleInputMinutesChange},model:{value:e.ruleForm.duration_minutes,callback:function(t){e.$set(e.ruleForm,"duration_minutes",t)},expression:"ruleForm.duration_minutes"}}),e._v("\n        分\n      ")],1),e._v(" "),r("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（秒）",prop:"duration_second",rules:e.valiSeconds}},[r("el-input",{attrs:{placeholder:"请填写视频时长","auto-complete":"off"},on:{input:e.handleInputSecondChange,change:e.handleInputChange},model:{value:e.ruleForm.duration_second,callback:function(t){e.$set(e.ruleForm,"duration_second",t)},expression:"ruleForm.duration_second"}}),e._v("\n        秒\n      ")],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"讲课老师"}},[r("el-select",{attrs:{clearable:"",filterable:"",remote:"","reserve-keyword":"",placeholder:"请选择一个老师（可输入老师姓名搜索）","remote-method":e.remoteMethod,loading:e.selectLoading},model:{value:e.ruleForm.teacher_id,callback:function(t){e.$set(e.ruleForm,"teacher_id",t)},expression:"ruleForm.teacher_id"}},e._l(e.teacherOptions,function(e){return r("el-option",{key:e.user_id,attrs:{label:e.name+"-ID:"+e.user_id,value:e.user_id}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"知识点关联",prop:"name"}},[r("el-row",e._l(e.ruleForm.knowledge_id,function(t){return r("el-tag",{key:t.id,staticClass:"teacher-tag"},[e._v("\n            "+e._s(t.title)+" -"+e._s(t.id)+"\n          ")])})),e._v(" "),r("el-button",{attrs:{type:"text"},on:{click:e.handleOpenKnowledgeDialog}},[e._v("选择/修改知识点")])],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1),e._v(" "),r("SelectKnowledge",{ref:"selectKnowledge",attrs:{"dialog-knowledge-visible":e.dialogKnowledgeVisible,"knowledge-list":e.knowledgeList,"current-syllabus-item-knowledge":e.currentSyllabusItemKnowledge},on:{changeCurrentSyllabusItemKnowledge:e.changeCurrentSyllabusItemKnowledge,handleCloseKnowledgeDialog:e.handleCloseKnowledgeDialog,handleSaveKnowledgeDialog:e.handleSaveKnowledgeDialog}})],1)},staticRenderFns:[]},v=r("vSla")(f,b,!1,null,null,null);t.a=v.exports}});
//# sourceMappingURL=5.6911ae0c525e7957d712.js.map