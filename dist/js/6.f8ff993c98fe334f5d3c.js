webpackJsonp([6],{"4ET6":function(e,t){throw new Error("Module build failed: F:/wap/zeus-console.gaodun.com/src/components/CourseManage/CourseModuleList.vue: Duplicate declaration \"getDocumentUrl\"\n\n[0m [90m 151 | [39m[36mimport[39m {getEnv[33m,[39m getBaseUrl[33m,[39mgetDocumentUrl} from [32m'../../util/config'[39m\n [90m 152 | [39m[36mimport[39m { mapState } from [32m\"vuex\"[39m[33m;[39m\n[31m[1m>[22m[39m[90m 153 | [39m[36mimport[39m {getDocumentUrl} from [32m'../../util/config.js'[39m\n [90m     | [39m        [31m[1m^[22m[39m\n [90m 154 | [39mlet prefix [33m=[39m getEnv()\n [90m 155 | [39m[36mexport[39m [36mdefault[39m {\n [90m 156 | [39m    data() {[0m\n")},W4HX:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l("4ET6");l.n(r);for(var a in r)"default"!==a&&function(e){l.d(t,e,function(){return r[e]})}(a);var s=l("zR7i");var n=function(e){l("m85p")},o=l("Z0/y")(r.default,s.a,!1,n,null,null);t.default=o.exports},m85p:function(e,t){},zR7i:function(e,t,l){"use strict";var r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"module-edu-content course-manage"},[l("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[l("el-row",[l("el-col",{attrs:{sm:24}},[l("div",{staticClass:"button_group_t"},[l("span",[e._v("项 目:")]),e._v(" "),l("span",{staticClass:"clitem",class:[null===e.clver?"current":""],on:{click:function(t){e.outlinechange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.projectlist,function(t,r){return[l("span",{key:r,staticClass:"clitem",class:[t.project_id===e.clver?"current":""],on:{click:function(l){e.outlinechange(t.project_id,r)}}},[e._v(e._s(t.project_name)+"\n                        ")])]})],2),e._v(" "),l("div",{staticClass:"button_group_b"},[l("span",[e._v(" 科 目:")]),e._v(" "),l("span",{staticClass:"clitem",class:[null===e.clversm?"current":""],on:{click:function(t){e.mulchange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.subtablist,function(t,r){return[l("span",{key:r,staticClass:"clitem",class:[t.subject_id===e.clversm?"current":""],on:{click:function(l){e.mulchange(t.subject_id)}}},[e._v(e._s(t.subject_name))])]})],2)])],1),e._v(" "),l("el-row",{attrs:{type:"flex",align:"bottom"}},[l("el-col",{attrs:{sm:6}},[l("el-row",[l("div",{staticClass:"select-search"},[l("el-select",{attrs:{placeholder:"请选择",size:"small"},on:{change:e.changesearch,"visible-change":e.visibleChange},model:{value:e.selectvalue,callback:function(t){e.selectvalue=t},expression:"selectvalue"}},e._l(e.options,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)])],1),e._v(" "),l("el-col",{attrs:{sm:18}},[l("el-row",{attrs:{type:"flex",justify:"end"}},[l("div",{staticClass:"input-search"},[l("el-input",{attrs:{placeholder:"课程ID／课程名称",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}},[l("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("COURSE_CREATE")?l("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.dialogCourseVisible=!0}}},[e._v("+ 新增一个课程\n                        ")]):e._e(),e._v(" "),l("a",{staticClass:"docBtn",attrs:{href:e.docUrl+"#/createCourse",target:"_blank"}},[l("i",{staticClass:"el-icon-question"}),e._v("\n                            使用帮助\n                        ")])],1)])],1)],1)],1),e._v(" "),l("div",{staticClass:"edu_table"},[l("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.videoList}},[l("el-table-column",{attrs:{prop:"course_id",label:"课程id",width:"80",fixed:""}}),e._v(" "),l("el-table-column",{attrs:{prop:"course_name",label:"课程名称","min-width":"260"}}),e._v(" "),l("el-table-column",{attrs:{prop:"",label:"项目","min-width":"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.project&&t.row.project.project_name))])]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"",label:"科目","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("span",[e._v(e._s(t.row.subject&&t.row.subject.subject_name?t.row.subject.subject_name:"不限科目"))])]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"course_type",label:"网课类型","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[10==t.row.course_type?l("span",[e._v("网课2.0")]):3==t.row.course_type?l("span",[e._v("自适应学习网课-EP")]):4==t.row.course_type?l("span",[e._v("私播课-Glive+")]):l("span",[e._v(e._s(t.row.course_type))])]}}])}),e._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:"250",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("COURSE_BASIC_SET")?l("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/basic/set/"+t.row.course_id}},[e._v("基本设置\n                    ")]):e._e(),e._v(" "),e.unlocking("COURSE_CONTENT")?l("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/content/set/"+t.row.course_id}},[e._v("课程内容\n                    ")]):e._e(),e._v(" "),l("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-end",disabled:e.isTooldisabled}},[l("div",{attrs:{slot:"content"},slot:"content"},[e._v("如果没有打开预览页面"),l("br"),e._v("请注意浏览器右上角，允许弹框！")]),e._v(" "),l("el-button",{attrs:{type:"text"},on:{click:function(l){e.previewCourse(t.row)}}},[e._v("课程预览")])],1)]}}])})],1),e._v(" "),l("div",{staticClass:"edu-pagination"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[15,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.eduTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),l("el-dialog",{staticClass:"addCourse",attrs:{title:"新建课程",visible:e.dialogCourseVisible},on:{"update:visible":function(t){e.dialogCourseVisible=t},close:function(t){e.closeDialog("ruleForm")}}},[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"100px"}},[l("el-form-item",{attrs:{label:"课程名称",prop:"course_name",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[l("el-input",{model:{value:e.ruleForm.course_name,callback:function(t){e.$set(e.ruleForm,"course_name",t)},expression:"ruleForm.course_name"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"所属项目",prop:"project_id",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[l("el-select",{attrs:{placeholder:"请选择所属项目"},on:{change:e.changeProject},model:{value:e.ruleForm.project_id,callback:function(t){e.$set(e.ruleForm,"project_id",t)},expression:"ruleForm.project_id"}},e._l(e.projectlist,function(e){return l("el-option",{key:e.project_id,attrs:{label:e.project_name,value:e.project_id}})}))],1),e._v(" "),l("el-form-item",{attrs:{label:"所属科目",prop:"subject_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[l("el-select",{attrs:{disabled:!e.bSubject,placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject_id,callback:function(t){e.$set(e.ruleForm,"subject_id",t)},expression:"ruleForm.subject_id"}},[l("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.selectedlist,function(e){return l("el-option",{key:e.subject_id,attrs:{label:e.subject_name,value:e.subject_id}})})],2)],1),e._v(" "),l("el-form-item",{attrs:{label:"网课类型",prop:"course_type_id",rules:[{required:!0,message:"请选择网课类型",trigger:"change"}]}},[l("el-select",{attrs:{placeholder:"请选择网课类型"},model:{value:e.ruleForm.course_type_id,callback:function(t){e.$set(e.ruleForm,"course_type_id",t)},expression:"ruleForm.course_type_id"}},e._l(e.course_type,function(e){return l("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})}))],1),e._v(" "),l("el-form-item",{staticClass:"last-form-item"},[l("el-button",{on:{click:function(t){e.closeDialog("ruleForm")}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("\n                    "+e._s(e.btnLoading?"新建中":"确定")+"\n                ")])],1)],1)],1)],1)},staticRenderFns:[]};t.a=r}});
//# sourceMappingURL=6.f8ff993c98fe334f5d3c.js.map