webpackJsonp([1],{DIUF:function(e,t,a){"use strict";a.d(t,"b",function(){return r}),a.d(t,"a",function(){return s}),a.d(t,"c",function(){return i});var r='<span style="color:#97a8be;">请输入课程简介（字数建议控制在200-300字内）</span>',s=[{course_type_id:"10",name:"网课2.0"},{course_type_id:"11",name:"EP2.0"},{course_type_id:"4",name:"私播课-Glive+"}],i=[{text:"基本设置",currentLine:"bar-line-current",currentDot:"bar-dot-current",currentText:"current-text",isCustomerConfirm:!0},{text:"功能模块",currentLine:"bar-line-current",currentDot:"bar-dot-current",currentText:"current-text",isCustomerConfirm:!1}]},W4HX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Gu7T"),s=a.n(r),i=a("Xxa5"),n=a.n(i),o=a("exGp"),l=a.n(o),u=a("Dd8w"),c=a.n(u),d=(a("NFfb"),a("sD4o"),a("zSLJ")),m=a("BK/k"),p=a("DIUF"),g=a("SJI6"),h=Object(m.e)(),_={data:function(){return{index:-1,btnLoading:!1,loading:!1,selectfalg:!1,subtablist:[],selectedlist:[],bSubject:!1,course_type:p.a,selectvalue:"",ruleForm:{course_name:"",project_id:"",subject_id:"",course_type_id:""},dialogCourseVisible:!1,searchinput:"",clver:null,clversm:null,videoList:[],eduTotal:0,currentPage:1,pageSize:15,docUrl:m.d,authCodeKey:"iTSe2NQd9PG6lzojysC48BHuXgvIcAqw",isBtnDisabled:!0}},computed:c()({},Object(g.mapState)({projectlist:function(e){return e.common.project_subject_list}}),{isTooldisabled:function(){return!!Object(d.a)("Identification")}}),methods:{clearCache:function(e){var t=this;this.index=e.course_id,this.$http.clearCache(Number(e.course_id)).then(function(e){0===e.status&&setTimeout(function(){t.index=-1,t.$message({message:"此课程缓存清除成功",type:"success"})},600)})},searchCourse:function(){var e=this;return l()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$http.searchCourse({project_id:e.clver,subject_id:e.clversm,page:e.currentPage,page_size:e.pageSize,course_type:e.selectvalue,course_id_name:e.searchinput});case 3:a=t.sent,e.loading=!1,0==a.status?(e.isBtnDisabled=!1,e.videoList=a.result.item_list,e.eduTotal=a.result.all_item_count):e.isBtnDisabled=!0;case 6:case"end":return t.stop()}},t,e)}))()},visibleChange:function(e){this.selectfalg=e},changesearch:function(e){this.selectfalg&&(this.searchinput="",this.searchCourse())},handleIconClick:function(){this.clver=null,this.clversm=null,this.selectvalue="",this.subtablist=[],this.searchCourse()},changeProject:function(e){for(var t in this.projectlist)if(this.projectlist[t].project_id==e){this.bSubject=!0;var a=[].concat(s()(this.projectlist[t].subject_list));this.selectedlist=a,this.ruleForm.subject_id="0"}},outlinechange:function(e,t){this.clver=e,this.subtablist=null===e?[]:this.projectlist[t].subject_list,this.clversm=null,this.pageSize=15,this.currentPage=1,this.searchinput="",this.searchCourse()},mulchange:function(e){this.clversm=e,this.pageSize=15,this.currentPage=1,this.searchinput="",this.searchCourse()},closeDialog:function(e){this.bSubject=!1,this.dialogCourseVisible=!1,this.$refs[e].resetFields()},addCourse:function(e){var t=this;this.btnLoading=!0,this.$http.addCourse(c()({},e)).then(function(e){t.btnLoading=!1,0==e.status&&(t.dialogCourseVisible=!1,t.bSubject=!1,t.clver=null,t.clversm=null,t.searchCourse(),t.$message({message:e.message,type:"success"}))}).catch(function(e){})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.addCourse(t.ruleForm)})},handleSizeChange:function(e){this.pageSize=e,this.currentPage=1,this.searchCourse()},handleCurrentChange:function(e){this.currentPage=e,this.searchCourse()},previewCourse:function(e){console.log(e);var t=e.course_type,a=(e.course_id,"");switch(t){case"10":a="//"+h+"cloud.gaodun.com/preview/course/"+e.course_id;break;default:a="#"}a&&"#"!==a?window.open(a):this.$message({type:"warning",message:"该课程类型暂不支持课程预览"})}},mounted:function(){this.$store.dispatch("getProjectSubjectList"),this.searchCourse()}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-edu-content course-manage"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",[a("el-col",{attrs:{sm:24}},[a("div",{staticClass:"button_group_t"},[a("span",[e._v("项 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:[null===e.clver?"current":""],on:{click:function(t){e.outlinechange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.projectlist,function(t,r){return[a("span",{key:r,staticClass:"clitem",class:[t.project_id===e.clver?"current":""],on:{click:function(a){e.outlinechange(t.project_id,r)}}},[e._v(e._s(t.project_name)+"\n            ")])]})],2),e._v(" "),a("div",{staticClass:"button_group_b"},[a("span",[e._v(" 科 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:[null===e.clversm?"current":""],on:{click:function(t){e.mulchange(null)}}},[e._v("全部")]),e._v(" "),e._l(e.subtablist,function(t,r){return[a("span",{key:r,staticClass:"clitem",class:[t.subject_id===e.clversm?"current":""],on:{click:function(a){e.mulchange(t.subject_id)}}},[e._v(e._s(t.subject_name))])]})],2)])],1),e._v(" "),a("el-row",{attrs:{type:"flex",align:"bottom"}},[a("el-col",{attrs:{sm:6}},[a("el-row",[a("div",{staticClass:"select-search"},[a("el-select",{attrs:{placeholder:"请选择",size:"small"},on:{change:e.changesearch,"visible-change":e.visibleChange},model:{value:e.selectvalue,callback:function(t){e.selectvalue=t},expression:"selectvalue"}},[a("el-option",{attrs:{label:"全部课程类型",value:""}}),e._v(" "),e._l(e.course_type,function(e){return a("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})})],2)],1)])],1),e._v(" "),a("el-col",{attrs:{sm:18}},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("div",{staticClass:"input-search"},[a("el-input",{attrs:{placeholder:"课程ID／课程名称",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.searchinput,callback:function(t){e.searchinput=t},expression:"searchinput"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("COURSE_CREATE")?a("el-button",{attrs:{type:"primary",size:"small",disabled:e.isBtnDisabled},on:{click:function(t){e.dialogCourseVisible=!0}}},[e._v("\n              + 新增一个课程\n            ")]):e._e(),e._v(" "),a("a",{staticClass:"docBtn",attrs:{href:e.docUrl+"#/createCourse",target:"_blank"}},[a("i",{staticClass:"el-icon-question"}),e._v("\n              使用帮助\n            ")])],1)])],1)],1)],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.videoList}},[a("el-table-column",{attrs:{prop:"course_id",label:"课程id",width:"80",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"course_name",label:"课程名称","min-width":"260"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"项目","min-width":"170"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.project&&t.row.project.project_name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"科目","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.subject&&t.row.subject.subject_name?t.row.subject.subject_name:"不限科目"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"course_type",label:"网课类型","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[10==t.row.course_type?a("span",[e._v("网课2.0")]):11==t.row.course_type?a("span",[e._v("EP2.0")]):4==t.row.course_type?a("span",[e._v("私播课-Glive+")]):3==t.row.course_type?a("span",[e._v("自适应学习网课-EP")]):a("span",[e._v(e._s(t.row.course_type))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"320",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("COURSE_BASIC_SET")?a("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/basic/set/"+t.row.course_id}},[e._v("基本设置\n          ")]):e._e(),e._v(" "),e.unlocking("COURSE_CONTENT")?a("router-link",{staticClass:"routerBtn",staticStyle:{margin:"0 10px"},attrs:{to:"/course/manage/content/set/"+t.row.course_id}},[e._v("课程内容\n          ")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text",disabled:e.index==t.row.course_id},on:{click:function(a){e.clearCache(t.row)}}},[e._v(e._s(e.index==t.row.course_id?"正在清除":"清除缓存"))]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-end",disabled:e.isTooldisabled}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("如果没有打开预览页面"),a("br"),e._v("请注意浏览器右上角，允许弹框！")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){e.previewCourse(t.row)}}},[e._v("课程预览")])],1)]}}])})],1),e._v(" "),a("div",{staticClass:"edu-pagination"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[15,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.eduTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("el-dialog",{staticClass:"addCourse",attrs:{title:"新建课程",visible:e.dialogCourseVisible},on:{"update:visible":function(t){e.dialogCourseVisible=t},close:function(t){e.closeDialog("ruleForm")}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"课程名称",prop:"course_name",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[a("el-input",{model:{value:e.ruleForm.course_name,callback:function(t){e.$set(e.ruleForm,"course_name",t)},expression:"ruleForm.course_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属项目",prop:"project_id",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择所属项目"},on:{change:e.changeProject},model:{value:e.ruleForm.project_id,callback:function(t){e.$set(e.ruleForm,"project_id",t)},expression:"ruleForm.project_id"}},e._l(e.projectlist,function(e){return a("el-option",{key:e.project_id,attrs:{label:e.project_name,value:e.project_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"所属科目",prop:"subject_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[a("el-select",{attrs:{disabled:!e.bSubject,placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject_id,callback:function(t){e.$set(e.ruleForm,"subject_id",t)},expression:"ruleForm.subject_id"}},[a("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.selectedlist,function(e){return a("el-option",{key:e.subject_id,attrs:{label:e.subject_name,value:e.subject_id}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"网课类型",prop:"course_type_id",rules:[{required:!0,message:"请选择网课类型",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择网课类型"},model:{value:e.ruleForm.course_type_id,callback:function(t){e.$set(e.ruleForm,"course_type_id",t)},expression:"ruleForm.course_type_id"}},e._l(e.course_type,function(e){return a("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})}))],1),e._v(" "),a("el-form-item",{staticClass:"last-form-item"},[a("el-button",{on:{click:function(t){e.closeDialog("ruleForm")}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("\n          "+e._s(e.btnLoading?"新建中":"确定")+"\n        ")])],1)],1)],1)],1)},staticRenderFns:[]};var v=a("VU/8")(_,f,!1,function(e){a("vx7Y")},null,null);t.default=v.exports},c30m:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),s=a.n(r),i=a("exGp"),n=a.n(i),o={props:{dialog:{default:!1,type:Boolean},type:{type:String},addloading:{type:Boolean},data:{name:{type:String},exam:{type:String},tag:{type:Array},repeat:{type:Number},upgrade:{type:String},auditions:{type:String},first_time:{type:String},again_time:{type:String},courses:{type:Array},expire:{type:String},end_time:{type:String}},remoteList:{type:Array},selectedList:{type:Array},updateCourse:{type:Array},remoteTag:{type:Array},firstUpdate:{type:String}},data:function(){var e=this;return{isTag:!1,list:[],loading:!1,rules:{name:[{required:!0,message:"请输入任务名称",trigger:"change"},{max:30,message:"最多输入30个字符",trigger:"change"}],exam:[{required:!0,message:"请选择考试名称",trigger:"change"}],expire:[{required:!0,message:"请选择已学课程过期时间",trigger:"change"}],end_time:[{required:!0,message:"请选择结束时间",trigger:"change"}],tag:[{required:!0,message:"请选择全科学员标签",trigger:"change"}],repeat:[{required:!0,message:"请选择复读课程",trigger:"change"}],upgrade:[{validator:function(t,a,r){if(!a&&3!=e.data.exam)return r("请选择升级课程");r()},trigger:"change"}],auditions:[{validator:function(t,a,r){if(!a&&3!=e.data.exam)return r("请选择试听课程");r()},trigger:"change"}],courses:[{required:!0,message:"请选择已学课程",trigger:"change"},{validator:function(t,a,r){for(var s=0;s<e.selectedList.length;s++)a.includes(Number(e.selectedList[s]))&&!e.updateCourse.includes(Number(e.selectedList[s]))&&r("该课程在其他任务中已存在，不可重复选择~");r()},trigger:"change"}],first_time:[{required:!0,message:"请选择首次开启时间",trigger:"change"}],again_time:[{required:!0,message:"请选择二次开启时间",trigger:"change"}]},projectlist:[],defaultProps:{children:"tagSubList",label:"name"}}},computed:{updatedTag:function(){return this.data.tag}},methods:{chooseTag:function(e){var t=this;this.data.tag=[],this.list=this.$refs.tree.getCheckedNodes().filter(function(e){if(!e.appid)return t.data.tag.push(e.id),e})},changeExam:function(e){3==e&&(this.data.auditions="",this.data.upgrade="")},closeDialog:function(e){this.$refs.ruleForm.resetFields(),this.isTag=!1,this.$refs.tree.setCheckedKeys([]),this.$emit("closeDialog")},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var a=t.judgeTime();if(a.ok)return void t.$message({message:a.msg,type:"warning"});var r=t.judgeCourse();if(r.ok)return void t.$message({message:r.msg,type:"warning"});"add"===t.type?t.$emit("save",t.data):t.$emit("dialogChangeForm",t.data)}})},remoteMethod:function(e){var t=this;return n()(s.a.mark(function a(){return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.$emit("remoteMethod",e);case 1:case"end":return a.stop()}},a,t)}))()},judgeTime:function(){var e=Date.parse(this.data.expire),t=Date.parse(this.data.first_time),a=Date.parse(this.data.again_time),r=Date.parse(this.data.end_time);return e>=t?{ok:!0,msg:"已学课程过期时间必须小于首次开启时间，请修改"}:t>=a?{ok:!0,msg:"首次开启时间必须小于二次开启时间，请修改"}:a>=r?{ok:!0,msg:"二次开启时间必须小于结束时间，请修改"}:{ok:!1,msg:""}},judgeCourse:function(){var e=this.data.repeat,t=this.data.upgrade?this.data.upgrade:-1,a=this.data.auditions?this.data.auditions:0;console.log(this.data.courses,e,t,a);for(var r=0;r<this.data.courses.length;r++){if(this.data.courses[r]==e)return{ok:!0,msg:"复读课程和已学课程ID有重复，请检查"};if(this.data.courses[r]==t)return console.log("eeeee"),{ok:!0,msg:"升级课程和已学课程ID有重复，请检查"};if(this.data.courses[r]==a)return{ok:!0,msg:"试听课程和已学课程ID有重复，请检查"}}return e==t?{ok:!0,msg:"复读课程和升级课程ID有重复，请检查"}:t==a?{ok:!0,msg:"升级课程和试听课程ID有重复，请检查"}:e==a?{ok:!0,msg:"复读课程和试听课程ID有重复，请检查"}:{ok:!1,msg:""}},checkedKeys:function(e){this.$refs.tree.setCheckedKeys(e)}},mounted:function(){},created:function(){var e=this;return n()(s.a.mark(function t(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},t,e)}))()},updated:function(){"update"===this.firstUpdate&&(this.$nextTick(this.checkedKeys(this.data.tag)),this.$emit("changeType")),"add"===this.firstUpdate&&(this.list=[],this.$emit("changeType"))}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"addCourse cfa-course-dialog",attrs:{title:"add"==e.type?"新增续派课任务":"修改续派课任务",visible:e.dialog,"before-close":e.closeDialog},on:{"update:visible":function(t){e.dialog=t},close:function(t){e.closeDialog("ruleForm")}}},[a("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.data,rules:e.rules,"label-width":"140px"}},[a("div",{staticClass:"cfa-box"},[a("el-form-item",{attrs:{label:"任务名称",prop:"name"}},[a("el-input",{staticStyle:{width:"90%"},attrs:{placeholder:"请输入任务名称"},model:{value:e.data.name,callback:function(t){e.$set(e.data,"name",t)},expression:"data.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"考试",prop:"exam"}},[a("el-select",{attrs:{placeholder:"请选择考试"},on:{change:e.changeExam},model:{value:e.data.exam,callback:function(t){e.$set(e.data,"exam",t)},expression:"data.exam"}},[a("el-option",{attrs:{label:"CFA-Level1 考试反馈",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"CFA-Level2 考试反馈",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"CFA-Level3 考试反馈",value:"3"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"已学课程",prop:"courses"}},[a("el-select",{staticStyle:{width:"60%","min-width":"450px"},attrs:{filterable:"",multiple:"",remote:"","reserve-keyword":"",placeholder:"请选择已学课程","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.data.courses,callback:function(t){e.$set(e.data,"courses",t)},expression:"data.courses"}},e._l(e.remoteList,function(e){return a("el-option",{key:e.course_id,attrs:{label:e.course_name+"-(课程id："+e.course_id+")",value:e.course_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"已学课程过期时间",prop:"expire"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择已学课程过期时间"},model:{value:e.data.expire,callback:function(t){e.$set(e.data,"expire",t)},expression:"data.expire"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"全科学员标签",prop:"tag"}},[a("div",{staticClass:"tree-box"},[a("div",{staticClass:"input",on:{click:function(t){e.isTag=!e.isTag}}},[0===e.list.length?a("div",{staticClass:"plac"},[e._v("请选择全科学员标签")]):e._e(),e._v(" "),e._l(e.list,function(t){return a("div",{key:t.id,staticClass:"item"},[e._v(e._s(t.name))])})],2),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isTag,expression:"isTag"}],staticClass:"child"},[a("el-tree",{ref:"tree",attrs:{data:e.remoteTag,"show-checkbox":"","node-key":"id","highlight-current":"",props:e.defaultProps},on:{"check-change":e.chooseTag}})],1)])]),e._v(" "),a("el-form-item",{attrs:{label:"下一考季复读课程",prop:"repeat"}},[a("el-select",{staticStyle:{width:"60%","min-width":"450px"},attrs:{filterable:"",remote:"",clearable:"","reserve-keyword":"",placeholder:"请选择复读课程","value-key":"course_id","remote-method":e.remoteMethod,loading:e.loading},model:{value:e.data.repeat,callback:function(t){e.$set(e.data,"repeat",t)},expression:"data.repeat"}},e._l(e.remoteList,function(e){return a("el-option",{key:e.course_id,attrs:{label:e.course_name+"-(课程id："+e.course_id+")",value:e.course_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"下一考季升级课程",prop:"upgrade"}},[a("el-select",{staticStyle:{width:"60%","min-width":"450px"},attrs:{filterable:"",remote:"",clearable:"",placeholder:"请选择升级课程","remote-method":e.remoteMethod,disabled:3==this.data.exam,loading:e.loading},model:{value:e.data.upgrade,callback:function(t){e.$set(e.data,"upgrade",t)},expression:"data.upgrade"}},e._l(e.remoteList,function(e){return a("el-option",{key:e.course_id,attrs:{label:e.course_name+"-(课程id："+e.course_id+")",value:e.course_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"下一考季试听课程",prop:"auditions"}},[a("el-select",{staticStyle:{width:"60%","min-width":"450px"},attrs:{filterable:"",remote:"",clearable:"",placeholder:"请选择试听课程","remote-method":e.remoteMethod,disabled:3==this.data.exam,loading:e.loading},model:{value:e.data.auditions,callback:function(t){e.$set(e.data,"auditions",t)},expression:"data.auditions"}},e._l(e.remoteList,function(e){return a("el-option",{key:e.course_id,attrs:{label:e.course_name+"-(课程id："+e.course_id+")",value:e.course_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"首次开启时间",prop:"first_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择首次开启时间"},model:{value:e.data.first_time,callback:function(t){e.$set(e.data,"first_time",t)},expression:"data.first_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"二次开启时间",prop:"again_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择二次时间"},model:{value:e.data.again_time,callback:function(t){e.$set(e.data,"again_time",t)},expression:"data.again_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"结束时间",prop:"end_time"}},[a("el-date-picker",{attrs:{type:"date",placeholder:"请选择结束时间"},model:{value:e.data.end_time,callback:function(t){e.$set(e.data,"end_time",t)},expression:"data.end_time"}})],1)],1),e._v(" "),a("el-form-item",{staticClass:"last-form-item"},[a("el-button",{on:{click:function(t){e.closeDialog("ruleForm")}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var u={data:function(){return{changeId:"",selectedList:[],updateCourse:[],firstUpdate:"",remoteList:[],remoteTag:[],dialogVisable:!1,type:"add",page:1,ruleForm:{name:"",exam:"",tag:"",repeat:"",upgrade:"",auditions:"",first_time:"",again_time:"",courses:[],expire:"",end_time:""},cfaList:[],loading:!1,pageSize:15,eduTotal:0}},components:{creatCFA:a("VU/8")(o,l,!1,function(e){a("p0d9")},null,null).exports},methods:{changeType:function(){this.firstUpdate=""},handleSizeChange:function(e){this.page=1,this.pageSize=e,this.getLesson()},handleCurrentChange:function(e){this.page=e,this.getLesson()},showCfaDialog:function(e,t){var a=this;this.updateCourse=[],this.type=e,this.firstUpdate=e,"update"===e&&(this.ruleForm.courses=[],this.changeId=t.id,this.ruleForm.name=t.name,this.ruleForm.exam=t.exam,this.ruleForm.expire=new Date(t.expire),this.ruleForm.end_time=new Date(t.end_time),this.ruleForm.auditions=Number(t.auditions),this.ruleForm.first_time=new Date(t.first_time),this.ruleForm.upgrade=Number(t.upgrade),this.ruleForm.repeat=Number(t.repeat),this.ruleForm.again_time=new Date(t.again_time),t.courses.forEach(function(e){a.updateCourse.push(Number(e)),a.ruleForm.courses.push(Number(e)),a.search(e)}),this.ruleForm.tag=[],t.tag.forEach(function(e){a.ruleForm.tag.push(e.id)}),this.search(this.ruleForm.repeat),0!=this.ruleForm.upgrade?this.search(this.ruleForm.upgrade):this.ruleForm.upgrade="",0!=this.ruleForm.auditions?this.search(this.ruleForm.auditions):this.ruleForm.auditions=""),this.dialogVisable=!0},closeDialog:function(){this.dialogVisable=!1,this.resetForm(),this.remoteList=[]},dialogSave:function(e){this.ruleForm=e,this.addLesson()},dialogChangeForm:function(e){this.ruleForm=e,this.addLesson()},getLesson:function(){var e=this;return n()(s.a.mark(function t(){var a,r;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page:e.page,page_size:e.pageSize},t.next=3,e.$http.sendLessonList(a);case 3:0==(r=t.sent).status?(e.cfaList=r.result.list,e.eduTotal=Number(r.result.count),e.selectedList=r.result.courses):e.$message({message:"获取任务列表失败",type:"warning"});case 5:case"end":return t.stop()}},t,e)}))()},addLesson:function(e){var t=this;return n()(s.a.mark(function e(){var a;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.ruleForm.expire=Date.parse(t.ruleForm.expire)/1e3,t.ruleForm.end_time=Date.parse(t.ruleForm.end_time)/1e3,t.ruleForm.first_time=Date.parse(t.ruleForm.first_time)/1e3,t.ruleForm.again_time=Date.parse(t.ruleForm.again_time)/1e3,t.ruleForm.courses=t.ruleForm.courses.join(","),t.ruleForm.upgrade=t.ruleForm.upgrade?t.ruleForm.upgrade:0,t.ruleForm.auditions=t.ruleForm.auditions?t.ruleForm.auditions:0,t.ruleForm.tag=t.ruleForm.tag.join(","),a=void 0,"add"!=t.type){e.next=15;break}return e.next=12,t.$http.addSendLesson(t.ruleForm);case 12:a=e.sent,e.next=18;break;case 15:return e.next=17,t.$http.changeCfaLesson(t.changeId,t.ruleForm);case 17:a=e.sent;case 18:0===a.status?(t.$message({message:"add"==t.type?"新建续课成功":"修改续课成功",type:"success"}),t.dialogVisable=!1,t.resetForm(),t.getLesson()):t.$message({message:"add"==t.type?"新建续课失败":"修改续课失败",type:"warning"});case 19:case"end":return e.stop()}},e,t)}))()},deleteLesson:function(e){var t=this;this.$confirm("确定要删除续派课任务吗","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.deleteCfaLesson(e).then(function(e){0==e.status?(t.$message({message:"删除成功",type:"warning"}),t.getLesson()):t.$message({message:"删除课程失败",type:"warining"})})})},search:function(e){var t=this;return n()(s.a.mark(function a(){var r,i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r={search_info:e,include_big:!1},a.next=3,t.$http.getRemoteCourse(4,0,r);case 3:0==(i=a.sent).status&&t.remoteList.push(i.result[0]);case 5:case"end":return a.stop()}},a,t)}))()},remoteMethod:function(e){var t=this;return n()(s.a.mark(function a(){var r,i;return s.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(""==e){a.next=8;break}return r={search_info:e,include_big:!1},t.loading=!0,a.next=5,t.$http.getRemoteCourse(4,0,r);case 5:i=a.sent,t.loading=!1,0==i.status?t.remoteList=i.result:t.remoteList=[];case 8:case"end":return a.stop()}},a,t)}))()},getRemoteTag:function(){var e=this;return n()(s.a.mark(function t(){var a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getRemoteTag();case 2:0===(a=t.sent).status&&(e.remoteTag=a.result,e.remoteTag.forEach(function(e){e.name=e.tag_name,e.tagSubList=e.tagSubList?e.tagSubList:[],(0==e.tagSubList.length||1==e.tagSubList.length&&Array.isArray(e.tagSubList[0]))&&(e.disabled=!0,e.tagSubList[0].disabled=!0)}));case 4:case"end":return t.stop()}},t,e)}))()},resetForm:function(){this.ruleForm.name="",this.ruleForm.exam="",this.ruleForm.tag="",this.ruleForm.repeat="",this.ruleForm.upgrade="",this.ruleForm.auditions="",this.ruleForm.first_time="",this.ruleForm.again_time="",this.ruleForm.courses=[],this.ruleForm.expire="",this.ruleForm.end_time=""}},created:function(){this.getLesson(),this.getRemoteTag()}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"input-search"},[e.unlocking("COURSE_CREATE")?a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.showCfaDialog("add")}}},[e._v("\n      + 新增一次续派课\n    ")]):e._e()],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.cfaList}},[a("el-table-column",{attrs:{prop:"id",label:"任务ID",width:"80",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"任务名称","min-width":"160"}}),e._v(" "),a("el-table-column",{attrs:{prop:"courses",label:"课程ID","min-width":"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"courses-wrap"},e._l(t.row.courses,function(r,s){return a("span",{key:r},[e._v(e._s(r)+e._s(s+1==t.row.courses.length?"":","))])}))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"first_time",label:"首次开启时间","min-width":"130"}}),e._v(" "),a("el-table-column",{attrs:{prop:"again_time",label:"二次开启时间","min-width":"130"}}),e._v(" "),a("el-table-column",{attrs:{prop:"end_time",label:"结束时间","min-width":"130"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180",align:"center",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.showCfaDialog("update",t.row)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){e.deleteLesson(t.row.id)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("div",{staticClass:"edu-pagination"},[a("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[15,30,50],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.eduTotal},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),a("creatCFA",{attrs:{dialog:e.dialogVisable,type:e.type,data:e.ruleForm,updateCourse:e.updateCourse,remoteList:e.remoteList,remoteTag:e.remoteTag,selectedList:e.selectedList,firstUpdate:e.firstUpdate},on:{showCfaDialog:e.showCfaDialog,closeDialog:e.closeDialog,save:e.dialogSave,dialogChangeForm:e.dialogChangeForm,remoteMethod:e.remoteMethod,changeType:e.changeType}})],1)},staticRenderFns:[]};var d=a("VU/8")(u,c,!1,function(e){a("iNSp")},"data-v-509dcc56",null);t.default=d.exports},iNSp:function(e,t){},p0d9:function(e,t){},vx7Y:function(e,t){}});
//# sourceMappingURL=1.7b4b532d1868702057ac.js.map