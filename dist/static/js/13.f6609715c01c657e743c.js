webpackJsonp([13],{DIUF:function(e,t,s){"use strict";s.d(t,"b",function(){return r}),s.d(t,"a",function(){return l}),s.d(t,"c",function(){return n}),s.d(t,"d",function(){return i});var r='<span style="color:#97a8be;">请输入课程简介（字数建议控制在200-300字内）</span>',l=[{course_type_id:"10",name:"网课2.0"},{course_type_id:"3",name:"自适应学习网课-EP"},{course_type_id:"4",name:"私播课-Glive+"}],n=[{value:"",label:"全部课程类型"},{value:"10",label:"网课2.0"},{value:"3",label:"自适应学习网课-EP"},{value:"4",label:"私播课-Glive+"}],i=[{text:"基本设置",currentLine:"bar-line-current",currentDot:"bar-dot-current",currentText:"current-text",isCustomerConfirm:!0},{text:"功能模块",currentLine:"bar-line-current",currentDot:"bar-dot-current",currentText:"current-text",isCustomerConfirm:!1}]},W4HX:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s("IHPB"),l=s.n(r),n=s("lC5x"),i=s.n(n),a=s("J0Oq"),o=s.n(a),c=s("4YfN"),u=s.n(c),d=s("zSLJ"),p=s("DIUF"),_=s("BK/k"),m=s("SJI6"),h=(Object(_.d)(),{data:function(){return{btnLoading:!1,loading:!1,selectfalg:!1,subtablist:[],selectedlist:[],bSubject:!1,course_type:[{course_type_id:"10",name:"网课2.0"},{course_type_id:"3",name:"自适应学习网课-EP"},{course_type_id:"4",name:"私播课-Glive+"}],selectvalue:"",options:p.c,ruleForm:{course_name:"",project_id:"",subject_id:"",course_type_id:""},dialogCourseVisible:!1,searchinput:"",clver:null,clversm:null,videoList:[],eduTotal:0,currentPage:1,pageSize:15}},computed:u()({},Object(m.mapState)({projectlist:function(e){return e.common.project_subject_list}})),methods:{searchCourse:function(){var e=this;return o()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$http.searchCourse({project_id:e.clver,subject_id:e.clversm,page:e.currentPage,page_size:e.pageSize,course_type:e.selectvalue,course_id_name:e.searchinput});case 3:0==(s=t.sent).status&&(e.loading=!1,e.videoList=s.result.item_list,e.eduTotal=s.result.all_item_count);case 5:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectfalg=e},changesearch:function(e){this.selectfalg&&(this.searchinput="",this.searchCourse())},handleIconClick:function(){this.clver=null,this.clversm=null,this.selectvalue="",this.subtablist=[],this.searchCourse()},changeProject:function(e){for(var t in this.projectlist)if(this.projectlist[t].project_id==e){this.bSubject=!0;var s=[].concat(l()(this.projectlist[t].subject_list));this.selectedlist=s,this.ruleForm.subject_id="0"}},outlinechange:function(e,t){this.clver=e,this.subtablist=null===e?[]:this.projectlist[t].subject_list,this.clversm=null,this.pageSize=15,this.currentPage=1,this.searchinput="",this.searchCourse()},mulchange:function(e){this.clversm=e,this.pageSize=15,this.currentPage=1,this.searchinput="",this.searchCourse()},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},addCourse:function(e){var t=this;this.btnLoading=!0,this.$http.addCourse(u()({},e)).then(function(e){t.btnLoading=!1,0==e.status&&(t.dialogCourseVisible=!1,t.bSubject=!1,t.clver=null,t.clversm=null,t.searchCourse(),t.$message({message:e.message,type:"success"}))}).catch(function(e){console.log(e)})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;t.addCourse(t.ruleForm)})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.searchCourse()},handleCurrentChange:function(e){console.log(e),this.currentPage=e,this.searchCourse()},previewCourse:function(e){console.log(e);var t=Object(d.a)(Object(_.d)()+"GDSID");this.$http.previewCourse({session_id:t}).then(function(e){console.log(e)})}},mounted:function(){this.$store.dispatch("getProjectSubjectList"),this.searchCourse(),console.log(this.decrypt("WGdlVwN5ZVwMZnEaXUhcXkxF"),"122222")},created:function(){}}),v={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"module-edu-content course-manage"},[s("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[s("el-row",[s("el-col",{attrs:{sm:24}},[s("div",{staticClass:"button_group_t"},[s("span",[e._v("项 目:")]),e._v(" "),s("span",{staticClass:"clitem",class:[null===e.clver?"current":""],on:{click:function(t){e.outlinechange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.projectlist,function(t,r){return[s("span",{key:r,staticClass:"clitem",class:[t.project_id===e.clver?"current":""],on:{click:function(s){e.outlinechange(t.project_id,r)}}},[e._v(e._s(t.project_name)+"\n                        ")])]})],2),e._v(" "),s("div",{staticClass:"button_group_b"},[s("span",[e._v(" 科 目:")]),e._v(" "),s("span",{staticClass:"clitem",class:[null===e.clversm?"current":""],on:{click:function(t){e.mulchange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.subtablist,function(t,r){return[s("span",{key:r,staticClass:"clitem",class:[t.subject_id===e.clversm?"current":""],on:{click:function(s){e.mulchange(t.subject_id)}}},[e._v(e._s(t.subject_name))])]})],2)])],1),e._v(" "),s("el-row",{attrs:{type:"flex",align:"bottom"}},[s("el-col",{attrs:{sm:6}},[s("el-row",[s("div",{staticClass:"select-search"},[s("el-select",{attrs:{placeholder:"请选择",size:"small"},on:{change:e.changesearch,"visible-change":e.visibleChange},model:{value:e.selectvalue,callback:function(t){e.selectvalue=t},expression:"selectvalue"}},e._l(e.options,function(e){return s("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)])],1),e._v(" "),s("el-col",{attrs:{sm:18}},[s("el-row",{attrs:{type:"flex",justify:"end"}},[s("div",{staticClass:"input-search"},[s("el-input",{attrs:{placeholder:"课程ID／课程名称",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}},[s("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("COURSE_CREATE")?s("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.dialogCourseVisible=!0}}},[e._v("+ 新增一个课程\n                        ")]):e._e()],1)])],1)],1)],1),e._v(" "),s("div",{staticClass:"edu_table"},[s("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.videoList}},[s("el-table-column",{attrs:{prop:"course_id",label:"课程id",width:"80",fixed:""}}),e._v(" "),s("el-table-column",{attrs:{prop:"course_name",label:"课程名称","min-width":"260"}}),e._v(" "),s("el-table-column",{attrs:{prop:"",label:"项目","min-width":"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.project&&t.row.project.project_name))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"",label:"科目","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.subject&&t.row.subject.subject_name?t.row.subject.subject_name:"不限科目"))])]}}])}),e._v(" "),s("el-table-column",{attrs:{prop:"course_type",label:"网课类型","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[10==t.row.course_type?s("span",[e._v("网课2.0")]):3==t.row.course_type?s("span",[e._v("自适应学习网课-EP")]):4==t.row.course_type?s("span",[e._v("私播课-Glive+")]):s("span",[e._v(e._s(t.row.course_type))])]}}])}),e._v(" "),s("el-table-column",{attrs:{fixed:"right",label:"操作",width:"250",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("COURSE_BASIC_SET")?s("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/basic/set/"+t.row.course_id}},[e._v("基本设置\n                    ")]):e._e(),e._v(" "),e.unlocking("COURSE_CONTENT")?s("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/content/set/"+t.row.course_id}},[e._v("课程内容\n                    ")]):e._e(),e._v(" "),s("el-button",{attrs:{type:"text"},on:{click:function(s){e.previewCourse(t.row)}}},[e._v("课程预览")])]}}])})],1),e._v(" "),s("div",{staticClass:"edu-pagination"},[s("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[15,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.eduTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),s("el-dialog",{staticClass:"addCourse",attrs:{title:"新建课程",visible:e.dialogCourseVisible},on:{"update:visible":function(t){e.dialogCourseVisible=t},close:function(t){e.closeDialog("ruleForm")}}},[s("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"课程名称",prop:"course_name",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[s("el-input",{model:{value:e.ruleForm.course_name,callback:function(t){e.$set(e.ruleForm,"course_name",t)},expression:"ruleForm.course_name"}})],1),e._v(" "),s("el-form-item",{attrs:{label:"所属项目",prop:"project_id",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[s("el-select",{attrs:{placeholder:"请选择所属项目"},on:{change:e.changeProject},model:{value:e.ruleForm.project_id,callback:function(t){e.$set(e.ruleForm,"project_id",t)},expression:"ruleForm.project_id"}},e._l(e.projectlist,function(e){return s("el-option",{key:e.project_id,attrs:{label:e.project_name,value:e.project_id}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"所属科目",prop:"subject_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[s("el-select",{attrs:{disabled:!e.bSubject,placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject_id,callback:function(t){e.$set(e.ruleForm,"subject_id",t)},expression:"ruleForm.subject_id"}},[s("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.selectedlist,function(e){return s("el-option",{key:e.subject_id,attrs:{label:e.subject_name,value:e.subject_id}})})],2)],1),e._v(" "),s("el-form-item",{attrs:{label:"网课类型",prop:"course_type_id",rules:[{required:!0,message:"请选择网课类型",trigger:"change"}]}},[s("el-select",{attrs:{placeholder:"请选择网课类型"},model:{value:e.ruleForm.course_type_id,callback:function(t){e.$set(e.ruleForm,"course_type_id",t)},expression:"ruleForm.course_type_id"}},e._l(e.course_type,function(e){return s("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})}))],1),e._v(" "),s("el-form-item",{staticClass:"last-form-item"},[s("el-button",{on:{click:function(t){e.closeDialog("ruleForm")}}},[e._v("取消")]),e._v(" "),s("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("\n                    "+e._s(e.btnLoading?"新建中":"确定")+"\n                ")])],1)],1)],1)],1)},staticRenderFns:[]};var b=s("Z0/y")(h,v,!1,function(e){s("ulaQ")},null,null);t.default=b.exports},ulaQ:function(e,t){}});
//# sourceMappingURL=13.f6609715c01c657e743c.js.map