webpackJsonp([25],{"3zfo":function(e,t){},W4HX:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=s("Gu7T"),i=s.n(l),o=s("Xxa5"),r=s.n(o),a=s("exGp"),n=s.n(a),c=s("Dd8w"),u=s.n(c),d=(s("NFfb"),s("sD4o"),s("zSLJ")),_=s("BK/k"),p=s("DIUF"),h=s("SJI6"),g=s("1E94"),m=Object(_.e)(),v={components:{logsDialog:g.a},data:function(){return{index:-1,logVisiable:!1,logList:[],page:1,logTotal:0,sourceId:0,btnLoading:!1,loading:!1,selectfalg:!1,subtablist:[],selectedlist:[],bSubject:!1,course_type:p.a,selectvalue:"",ruleForm:{course_name:"",project_id:"",subject_id:"",course_type_id:""},dialogCourseVisible:!1,searchinput:"",clver:null,clversm:null,videoList:[],eduTotal:0,currentPage:1,pageSize:15,docUrl:_.d,authCodeKey:"iTSe2NQd9PG6lzojysC48BHuXgvIcAqw",isBtnDisabled:!0}},computed:u()({},Object(h.mapState)({projectlist:function(e){return e.common.project_subject_list}}),{isTooldisabled:function(){return!!Object(d.a)("Identification")}}),methods:{showLogs:function(e){this.sourceId=e,this.logVisiable=!0,this.getlogs()},toClose:function(){this.logVisiable=!1},getlogs:function(){var e=this;return n()(r.a.mark(function t(){var s,l;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return s={log_type:1,page_num:e.page,page_size:50,source_id:e.sourceId?e.sourceId:""},t.next=3,e.$http.getLogsList(s);case 3:l=t.sent,console.log(l),e.logList=l.result.data,e.logTotal=l.result.total,console.log(e.logList,e.logTotal);case 8:case"end":return t.stop()}},t,e)}))()},handleChangePage:function(e){this.page=e,this.getlogs()},clearCache:function(e){var t=this;this.index=e.course_id;var s={course_id:e.course_id};this.$http.clearCache(s).then(function(e){0===e.status&&setTimeout(function(){t.index=-1,t.$message({message:"此课程缓存清除成功",type:"success"})},600)})},searchCourse:function(){var e=this;return n()(r.a.mark(function t(){var s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$http.searchCourse({project_id:e.clver,subject_id:e.clversm,page:e.currentPage,page_size:e.pageSize,course_type:e.selectvalue,course_id_name:e.searchinput});case 3:s=t.sent,e.loading=!1,0==s.status?(e.isBtnDisabled=!1,e.videoList=s.result.item_list,e.eduTotal=s.result.all_item_count):e.isBtnDisabled=!0;case 6:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectfalg=e},changesearch:function(e){this.selectfalg&&(this.searchinput="",this.searchCourse())},handleIconClick:function(){this.clver=null,this.clversm=null,this.selectvalue="",this.subtablist=[],this.searchCourse()},changeProject:function(e){for(var t in this.projectlist)if(this.projectlist[t].project_id==e){this.bSubject=!0;var s=[].concat(i()(this.projectlist[t].subject_list));this.selectedlist=s,this.ruleForm.subject_id="0"}},outlinechange:function(e,t){this.clver=e,this.subtablist=null===e?[]:this.projectlist[t].subject_list,this.clversm=null,this.pageSize=15,this.currentPage=1,this.searchinput="",this.searchCourse()},mulchange:function(e){this.clversm=e,this.pageSize=15,this.currentPage=1,this.searchinput="",this.searchCourse()},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},addCourse:function(e){var t=this;this.btnLoading=!0,this.$http.addCourse(u()({},e)).then(function(e){t.btnLoading=!1,0==e.status&&(t.dialogCourseVisible=!1,t.bSubject=!1,t.clver=null,t.clversm=null,t.searchCourse(),t.$message({message:e.message,type:"success"}))}).catch(function(e){})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.addCourse(t.ruleForm)})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.searchCourse()},handleCurrentChange:function(e){this.currentPage=e,this.searchCourse()},previewCourse:function(e){console.log(e);var t=e.course_type,s=(e.course_id,"");switch(t){case"10":s="//"+m+"cloud.gaodun.com/preview/course/"+e.course_id;break;default:s="#"}s&&"#"!==s?window.open(s):this.$message({type:"warning",message:"该课程类型暂不支持课程预览"})}},mounted:function(){this.$store.dispatch("getProjectSubjectList"),this.searchCourse()}},b={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"module-edu-content course-manage"},[s("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[s("el-row",[s("el-col",{attrs:{sm:24}},[s("div",{staticClass:"button_group_t"},[s("span",[e._v("项 目:")]),e._v(" "),s("span",{staticClass:"clitem",class:[null===e.clver?"current":""],on:{click:function(t){e.outlinechange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.projectlist,function(t,l){return[s("span",{key:l,staticClass:"clitem",class:[t.project_id===e.clver?"current":""],on:{click:function(s){e.outlinechange(t.project_id,l)}}},[e._v(e._s(t.project_name)+"\n            ")])]})],2),e._v(" "),s("div",{staticClass:"button_group_b"},[s("span",[e._v(" 科 目:")]),e._v(" "),s("span",{staticClass:"clitem",class:[null===e.clversm?"current":""],on:{click:function(t){e.mulchange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.subtablist,function(t,l){return[s("span",{key:l,staticClass:"clitem",class:[t.subject_id===e.clversm?"current":""],on:{click:function(s){e.mulchange(t.subject_id)}}},[e._v(e._s(t.subject_name))])]})],2)])],1),e._v(" "),s("el-row",{attrs:{type:"flex",align:"bottom"}},[s("el-col",{attrs:{sm:6}},[s("el-row",[s("div",{staticClass:"select-search"},[s("el-select",{attrs:{placeholder:"请选择",size:"small"},on:{change:e.changesearch,"visible-change":e.visibleChange},model:{value:e.selectvalue,callback:function(t){e.selectvalue=t},expression:"selectvalue"}},[s("el-option",{attrs:{label:"全部课程类型",value:""}}),e._v(" "),e._l(e.course_type,function(e){return s("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})})],2)],1)])],1),e._v(" "),s("el-col",{attrs:{sm:18}},[s("el-row",{attrs:{type:"flex",justify:"end"}},[s("div",{staticClass:"input-search"},[s("el-input",{attrs:{placeholder:"课程ID／课程名称",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}},[s("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("COURSE_CREATE")?s("el-button",{attrs:{type:"primary",size:"small",disabled:e.isBtnDisabled},on:{click:function(t){e.dialogCourseVisible=!0}}},[e._v("\n              + 新增一个课程\n            ")]):e._e(),e._v(" "),s("a",{staticClass:"docBtn",attrs:{href:e.docUrl+"#/createCourse",target:"_blank"}},[s("i",{staticClass:"el-icon-question"}),e._v("\n              使用帮助\n            ")])],1)])],1)],1)],1),e._v(" "),s("div",{staticClass:"edu_table"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.videoList}},[s("el-table-column",{attrs:{prop:"course_id",label:"课程id",width:"80",fixed:""}}),e._v(" "),s("el-table-column",{attrs:{prop:"course_name",label:"课程名称","min-width":"260"}}),e._v(" "),s("el-table-column",{attrs:{prop:"",label:"项目","min-width":"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.project&&t.row.project.project_name))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"",label:"科目","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.subject&&t.row.subject.subject_name?t.row.subject.subject_name:"不限科目"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"course_type",label:"网课类型","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[10==t.row.course_type?s("span",[e._v("网课2.0")]):11==t.row.course_type?s("span",[e._v("EP2.0")]):4==t.row.course_type?s("span",[e._v("私播课-Glive+")]):3==t.row.course_type?s("span",[e._v("自适应学习网课-EP")]):s("span",[e._v(e._s(t.row.course_type))])]}}])}),e._v(" "),s("el-table-column",{attrs:{fixed:"right",label:"操作",width:"400",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("COURSE_BASIC_SET")?s("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/basic/set/"+t.row.course_id}},[e._v("基本设置\n          ")]):e._e(),e._v(" "),e.unlocking("COURSE_CONTENT")?s("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/content/set/"+t.row.course_id}},[e._v("课程内容\n          ")]):e._e(),e._v(" "),s("el-button",{attrs:{type:"text",disabled:e.index==t.row.course_id},on:{click:function(s){e.clearCache(t.row)}}},[e._v(e._s(e.index==t.row.course_id?"正在清除":"清除缓存"))]),e._v(" "),s("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-end",disabled:e.isTooldisabled}},[s("div",{attrs:{slot:"content"},slot:"content"},[e._v("如果没有打开预览页面"),s("br"),e._v("请注意浏览器右上角，允许弹框！")]),e._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){e.previewCourse(t.row)}}},[e._v("课程预览")])],1),e._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){e.showLogs(t.row.course_id)}}},[e._v("操作日志")])]}}])})],1),e._v(" "),s("div",{staticClass:"edu-pagination"},[s("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[15,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.eduTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),s("el-dialog",{staticClass:"addCourse",attrs:{title:"新建课程",visible:e.dialogCourseVisible},on:{"update:visible":function(t){e.dialogCourseVisible=t},close:function(t){e.closeDialog("ruleForm")}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"课程名称",prop:"course_name",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[s("el-input",{model:{value:e.ruleForm.course_name,callback:function(t){e.$set(e.ruleForm,"course_name",t)},expression:"ruleForm.course_name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"所属项目",prop:"project_id",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[s("el-select",{attrs:{placeholder:"请选择所属项目"},on:{change:e.changeProject},model:{value:e.ruleForm.project_id,callback:function(t){e.$set(e.ruleForm,"project_id",t)},expression:"ruleForm.project_id"}},e._l(e.projectlist,function(e){return s("el-option",{key:e.project_id,attrs:{label:e.project_name,value:e.project_id}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"所属科目",prop:"subject_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[s("el-select",{attrs:{disabled:!e.bSubject,placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject_id,callback:function(t){e.$set(e.ruleForm,"subject_id",t)},expression:"ruleForm.subject_id"}},[s("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.selectedlist,function(e){return s("el-option",{key:e.subject_id,attrs:{label:e.subject_name,value:e.subject_id}})})],2)],1),e._v(" "),s("el-form-item",{attrs:{label:"网课类型",prop:"course_type_id",rules:[{required:!0,message:"请选择网课类型",trigger:"change"}]}},[s("el-select",{attrs:{placeholder:"请选择网课类型"},model:{value:e.ruleForm.course_type_id,callback:function(t){e.$set(e.ruleForm,"course_type_id",t)},expression:"ruleForm.course_type_id"}},e._l(e.course_type,function(e){return s("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})}))],1),e._v(" "),s("el-form-item",{staticClass:"last-form-item"},[s("el-button",{on:{click:function(t){e.closeDialog("ruleForm")}}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("\n          "+e._s(e.btnLoading?"新建中":"确定")+"\n        ")])],1)],1)],1),e._v(" "),s("logs-dialog",{attrs:{dialog:e.logVisiable,list:e.logList,total:e.logTotal},on:{handleChangePage:e.handleChangePage,toClose:e.toClose}})],1)},staticRenderFns:[]};var f=s("VU/8")(v,b,!1,function(e){s("3zfo")},null,null);t.default=f.exports}});
//# sourceMappingURL=25.a322e4946d9ae616ae76.js.map