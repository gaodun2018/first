webpackJsonp([17],{INyC:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("lC5x"),l=s.n(i),r=s("4YfN"),a=s.n(r),n=s("J0Oq"),u=s.n(n),o=s("IHPB"),c=s.n(o),d=s("HzJ8"),p=s.n(d),b=s("SJI6"),h=s("BK/k"),m={data:function(){return{docUrl:h.d,tableLoading:!1,btnLoading:!1,searchinput:"",CourseLineList:[],courselinenum:0,ruleForm:{title:"",project_id:"",subject_id:"",status:""},dialogFormVisible:!1,options:[{value:"",label:"全部状态"},{value:"0",label:"启用"},{value:"1",label:"禁用"}],selectvalue:"",clver:null,clversm:null,subjectlist:[],issubject:!1,boxsubject:[],currentPage:1,page_size:15,currentIndex:"",substatus:"addoutline",outlineid:"",dialogCourse:!0,selectcur:!1,isCopy:!1,dialogTitle:"新建课程大纲"}},methods:{visibleChange:function(e){this.selectcur=e},checkproject:function(e){if(this.selectcur){var t=!0,s=!1,i=void 0;try{for(var l,r=p()(this.projectlist);!(t=(l=r.next()).done);t=!0){var a=l.value;if(a.project_id==e){this.issubject=!0;var n=[].concat(c()(a.subject_list));this.boxsubject=n,this.ruleForm.subject_id="0"}}}catch(e){s=!0,i=e}finally{try{!t&&r.return&&r.return()}finally{if(s)throw i}}}},coursesubmit:function(e){var t=this;return u()(l.a.mark(function s(){var i;return l.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.btnLoading=!0,s.next=3,t.$http.CourseSyllabus(a()({},e));case 3:i=s.sent,t.btnLoading=!1,0==i.status&&(t.dialogFormVisible=!1,t.clver=null,t.clversm=null,t.currentPage=1,t.page_size=15,t.getCourseSyllabuses(),t.$message({message:"已添加成功",type:"success"}));case 6:case"end":return s.stop()}},s,t)}))()},coursesubmitcopy:function(e){var t=this;return u()(l.a.mark(function s(){var i;return l.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.btnLoading=!0,s.next=3,t.$http.CourseSyllabusCopy(a()({},e));case 3:i=s.sent,t.btnLoading=!1,0==i.status?(t.dialogFormVisible=!1,t.clver=null,t.clversm=null,t.currentPage=1,t.page_size=15,t.getCourseSyllabuses(),t.$message({message:"已复制成功",type:"success"})):t.$message({message:"复制失败",type:"error"});case 6:case"end":return s.stop()}},s,t)}))()},submitForm:function(e){var t=this;"addoutline"==this.substatus?this.$refs[e].validate(function(e){if(!e)return!1;t.coursesubmit(t.ruleForm)}):"copyoutline"==this.substatus&&this.$refs[e].validate(function(e){if(!e)return!1;t.coursesubmitcopy(t.ruleForm)})},courseupdate:function(){var e=this;return u()(l.a.mark(function t(){var s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.btnLoading=!0,t.next=3,e.$http.UpdateCourseSyllabus(e.outlineid,a()({},e.ruleForm));case 3:s=t.sent,e.btnLoading=!1,0==s.status&&(e.dialogFormVisible=!1,e.clver=null,e.clversm=null,e.currentPage=1,e.page_size=15,e.getCourseSyllabuses(),e.outlineid="",e.$message({message:"修改大纲成功",type:"success"}));case 6:case"end":return t.stop()}},t,e)}))()},updateForm:function(e){var t=this;"updateoutline"==this.substatus&&this.$refs[e].validate(function(e){if(!e)return!1;t.courseupdate()})},addCourseOutline:function(){this.btnLoading=!1,this.substatus="addoutline",this.dialogCourse=!0,this.isCopy=!1,this.dialogTitle="新建课程大纲",this.ruleForm={title:"",project_id:"",subject_id:"",status:""},this.dialogFormVisible=!0,this.issubject=!1},resetForm:function(e){this.ruleForm={title:"",project_id:"",subject_id:"",status:""},this.dialogFormVisible=!1,this.$refs[e].resetFields()},outlinechange:function(e,t){this.clver=e,this.subjectlist=null===e?[]:this.projectlist[t].subject_list,this.clversm=null,this.pageSize=15,this.currentPage=1,this.searchinput="",this.selectvalue="",this.getCourseSyllabuses(1,this.page_size)},mulchange:function(e){this.clversm=e,this.pageSize=15,this.currentPage=1,this.searchinput="",this.getCourseSyllabuses()},selectval:function(e){this.selectvalue=e,this.getCourseSyllabuses(1,this.page_size),this.searchinput=""},handleIconClick:function(){this.clversm=null,this.clver=null,this.selectvalue="",this.subjectlist=[],this.getCourseSyllabuses()},getCourseSyllabuses:function(){var e=this;return u()(l.a.mark(function t(){var s;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.tableLoading=!0,t.next=3,e.$http.CourseSyllabuses({page:e.currentPage,page_size:e.page_size,project_id:e.clver,subject_id:e.clversm,status:e.selectvalue,keyword:e.searchinput});case 3:0==(s=t.sent).status&&(e.tableLoading=!1,e.CourseLineList=s.result.list,e.courselinenum=parseInt(s.result.total));case 5:case"end":return t.stop()}},t,e)}))()},handleSizeChange:function(e){this.page_size=e,this.currentPage=1,this.getCourseSyllabuses()},handleCurrentChange:function(e){this.currentPage=e,this.getCourseSyllabuses()},UpdateOutlineTitle:function(e,t,s){this.ruleForm={title:t.title,project_id:String(t.project.id),subject_id:String(t.subject.id),status:String(t.status),is_knowledge_open:t.is_knowledge_open},s?(this.btnLoading=!1,this.dialogTitle="复制课程大纲",this.ruleForm.title="",this.substatus="copyoutline",this.issubject=!1,this.ruleForm.id=t.id,this.isCopy=!0,t.template?this.ruleForm.template_id=t.template.id:this.ruleForm.template_id=0):(this.btnLoading=!1,this.isCopy=!1,this.dialogTitle="编辑课程大纲",this.ruleForm.hasOwnProperty("id")&&delete this.ruleForm.id,this.ruleForm.hasOwnProperty("template_id")&&delete this.ruleForm.template_id,this.substatus="updateoutline",this.dialogCourse=!1,this.issubject=!0,this.outlineid=t.id);for(var i=0;i<this.projectlist.length;i++)if(this.projectlist[i].project_id==t.project.id){var l=[].concat(c()(this.projectlist[i].subject_list));this.boxsubject=l}this.currentIndex=e,this.dialogFormVisible=!0},checkSyllabus:function(e,t){null==t.template?this.$router.push({path:"/syllabus/manage/template/"+t.id}):this.$router.push({path:"/syllabus/manage/edit/"+t.id})}},computed:a()({},Object(b.mapState)({projectlist:function(e){return e.common.project_subject_list}})),mounted:function(){this.$store.dispatch("getProjectSubjectList"),this.getCourseSyllabuses()},created:function(){}},g={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"module-edu-content permission-courseoutline"},[s("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[s("el-row",[s("el-col",{attrs:{sm:24}},[s("div",{staticClass:"button_group_t"},[s("span",[e._v("项 目:")]),e._v(" "),s("span",{staticClass:"clitem",class:[null===e.clver?"current":""],on:{click:function(t){e.outlinechange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.projectlist,function(t,i){return s("span",{key:i,staticClass:"clitem",class:[t.project_id===e.clver?"current":""],on:{click:function(s){e.outlinechange(t.project_id,i)}}},[e._v(e._s(t.project_name)+"\n          ")])})],2),e._v(" "),s("div",{staticClass:"button_group_b"},[s("span",[e._v(" 科 目:")]),e._v(" "),s("span",{staticClass:"clitem",class:[null===e.clversm?"current":""],on:{click:function(t){e.mulchange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.subjectlist,function(t,i){return s("span",{key:i,staticClass:"clitem",class:[t.subject_id===e.clversm?"current":""],on:{click:function(s){e.mulchange(t.subject_id,i)}}},[e._v(e._s(t.subject_name)+"\n          ")])})],2)])],1),e._v(" "),s("el-row",{attrs:{type:"flex",align:"bottom"}},[s("el-col",{attrs:{sm:6}},[s("el-row",[s("div",{staticClass:"select-search"},[s("el-select",{attrs:{placeholder:"请选择",size:"small"},on:{change:e.selectval},model:{value:e.selectvalue,callback:function(t){e.selectvalue=t},expression:"selectvalue"}},e._l(e.options,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)])],1),e._v(" "),s("el-col",{attrs:{sm:18}},[s("el-row",{attrs:{type:"flex",justify:"end"}},[s("div",{staticClass:"input-search"},[s("el-input",{attrs:{placeholder:"请输入课程大纲ID、名称",size:"small"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}},[s("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("SY_CREATE")?s("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addCourseOutline}},[e._v("+ 新建一个课程大纲")]):e._e(),e._v(" "),s("a",{staticClass:"docBtn",attrs:{href:e.docUrl+"#/outlineCourse",target:"_blank"}},[s("i",{staticClass:"el-icon-question"}),e._v("\n              使用帮助\n            ")])],1)])],1)],1)],1),e._v(" "),s("div",{staticClass:"edu_table"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.tableLoading,expression:"tableLoading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.CourseLineList}},[s("el-table-column",{attrs:{prop:"id",label:"大纲ID","min-width":"100",fixed:""}}),e._v(" "),s("el-table-column",{attrs:{prop:"title",label:"课程大纲名称","min-width":"200"}}),e._v(" "),s("el-table-column",{attrs:{prop:"project.name",label:"所属项目","min-width":"100"}}),e._v(" "),s("el-table-column",{attrs:{prop:"subject.name",label:"所属科目","min-width":"125"}}),e._v(" "),s("el-table-column",{attrs:{label:"所属状态","min-width":"115"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?s("span",[e._v("启用")]):s("span",{staticClass:"rowtype"},[e._v("禁用")])]}}])}),e._v(" "),s("el-table-column",{attrs:{label:"操作",width:"260",fixed:"right",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("SY_BASIC_SET")?s("el-button",{attrs:{type:"text"},on:{click:function(s){e.UpdateOutlineTitle(t.$index,t.row)}}},[e._v("基本设置")]):e._e(),e._v(" "),e.unlocking("SY_CONTENT")?s("el-button",{attrs:{type:"text"},on:{click:function(s){e.checkSyllabus(t.$index,t.row)}}},[e._v("编辑大纲内容")]):e._e(),e._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){e.UpdateOutlineTitle(t.$index,t.row,"true")}}},[e._v("复制大纲")])]}}])})],1),e._v(" "),s("div",{staticClass:"edu-pagination"},[s("el-pagination",{attrs:{"page-sizes":[15,30,50],"page-size":e.page_size,"current-page":e.currentPage,layout:"total, sizes, prev, pager, next, jumper",total:e.courselinenum},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),s("el-dialog",{staticClass:"tabplane",attrs:{title:e.dialogTitle,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t},close:function(t){e.resetForm("ruleForm")}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px"}},[s("el-form-item",{attrs:{label:"课程大纲名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[s("el-input",{staticClass:"coursetxt",model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"所属项目",prop:"project_id",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[s("el-select",{attrs:{placeholder:"请选择所属项目",disabled:e.isCopy},on:{change:e.checkproject,"visible-change":e.visibleChange},model:{value:e.ruleForm.project_id,callback:function(t){e.$set(e.ruleForm,"project_id",t)},expression:"ruleForm.project_id"}},e._l(e.projectlist,function(e){return s("el-option",{key:e.project_id,attrs:{label:e.project_name,value:String(e.project_id)}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"所属科目",prop:"subject_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[s("el-select",{attrs:{disabled:!e.issubject,placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject_id,callback:function(t){e.$set(e.ruleForm,"subject_id",t)},expression:"ruleForm.subject_id"}},[s("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.boxsubject,function(e){return s("el-option",{key:e.subject_id,attrs:{label:e.subject_name,value:String(e.subject_id)}})})],2)],1),e._v(" "),s("el-form-item",{attrs:{label:"是否启用",prop:"status",rules:[{required:!0,message:"请选择是否启用",trigger:"change"}]}},[s("el-select",{attrs:{placeholder:"是否启用",disabled:e.isCopy},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[s("el-option",{attrs:{label:"是",value:"0"}}),e._v(" "),s("el-option",{attrs:{label:"否",value:"1"}})],1)],1),e._v(" "),s("el-form-item",{staticClass:"coursebtn"},["addoutline"==e.substatus?s("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v(e._s(e.btnLoading?"保存中":"确 定")+"\n        ")]):e._e(),e._v(" "),"updateoutline"==e.substatus?s("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.updateForm("ruleForm")}}},[e._v(e._s(e.btnLoading?"保存中":"保 存")+"\n        ")]):e._e(),e._v(" "),"copyoutline"==e.substatus?s("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v(e._s(e.btnLoading?"保存中":"复 制")+"\n        ")]):e._e(),e._v(" "),s("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("取 消")])],1)],1)],1)],1)},staticRenderFns:[]};var v=s("Z0/y")(m,g,!1,function(e){s("WwJc")},null,null);t.default=v.exports},WwJc:function(e,t){}});
//# sourceMappingURL=17.32976358e04d41b8793d.js.map