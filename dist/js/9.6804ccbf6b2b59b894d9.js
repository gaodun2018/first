webpackJsonp([9],{"9E4I":function(e,t){},ADvq:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=r("IHPB"),o=r.n(s),i=r("lC5x"),a=r.n(i),l=r("J0Oq"),n=r.n(l),c=r("4YfN"),u=r.n(c),d=r("BK/k"),m=r("NFfb"),p=r("zSLJ"),_={components:{},data:function(){return{fileList:[],imageUrl:"",apiHeader:""}},computed:{coverImageUrl:function(){return this.$store.state.course.course_cover?this.$store.state.course.course_cover:this.$store.state.course.course_default_cover},materialUpload:function(){return Object(d.c)()+"apigateway.gaodun.com/course-api/upload/picture"}},methods:{beforeAvatarUpload:function(e){var t="image/png"===e.type||"image/jpeg"===e.type;return t||this.$message.error("上传课程封面只能是 JPG/PNG 格式!"),t},handleChange:function(e,t){this.fileList=t.slice(-1)},handleRemove:function(e,t){this.fileList=t,this.$store.dispatch("changeCover",{cover:""})},handleAvatarSuccess:function(e,t){console.log(e),0==e.status&&(this.$store.dispatch("changeCover",{cover:e.filePath}),this.$message({type:"success",message:"上传成功！"}))},handleAvatarError:function(e,t,r){this.$store.dispatch("changeCover",{cover:""}),this.$message.error("上传失败！")}},mounted:function(){},destroyed:function(){},created:function(){var e="Basic "+Object(p.a)(m.j);this.apiHeader={Authentication:e}}},v={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"Imgupload"},[r("el-row",[r("el-col",{attrs:{span:12}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:e.materialUpload,"on-change":e.handleChange,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"on-error":e.handleAvatarError,headers:e.apiHeader,"before-upload":e.beforeAvatarUpload,"file-list":e.fileList}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件")])],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{staticStyle:{"margin-top":"10px"},attrs:{span:8}},[e.coverImageUrl?r("img",{staticClass:"avatar",staticStyle:{"max-width":"100%"},attrs:{src:e.coverImageUrl}}):e._e()])],1)],1)},staticRenderFns:[]},h=r("Z0/y")(_,v,!1,null,null,null).exports,f={components:{},data:function(){return{btnLoading:!1,dialogAddResVisible:!1,AddResForm:{title:"",content:""},Doing:"0",reviseIndex:"",reviseID:""}},computed:{course_id:function(){return this.$route.params.cid},courseIntroList:function(){return this.$store.state.course.resource_intro}},methods:{openAddResDialog:function(e,t){e>=0?(this.Doing="1",this.reviseIndex=e,this.reviseID=t,this.AddResForm={title:this.courseIntroList[e].title,content:this.courseIntroList[e].content}):(this.Doing="0",this.AddResForm={title:"",content:""}),this.dialogAddResVisible=!0},deleteResIntro:function(e){var t=this;this.$confirm("此操作将删除该资源介绍, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$store.dispatch("deleteResourceIntro",e),t.$message({type:"success",message:"删除成功!"})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},addResForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;var r=t.course_id,s=u()({},t.AddResForm);t.btnLoading=!0,t.$http.AddSourceIntro(r,s).then(function(e){t.btnLoading=!1,0==e.status?(t.$message({type:"success",message:e.message}),t.dialogAddResVisible=!1,t.$store.dispatch("addResourceIntro",e.result)):t.$message.error(e.message?e.message:"课程资源添加失败！")})})},saveResForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;console.log(t.reviseIndex);var r=u()({},t.AddResForm,{index:t.reviseIndex,id:t.reviseID});t.dialogAddResVisible=!1,t.$store.dispatch("changeResourceIntro",r)})},resetForm:function(e){this.dialogAddResVisible=!1,this.$refs[e].resetFields()},getCourseResourceIntro:function(){var e=this;return n()(a.a.mark(function t(){var r,s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.course_id,t.next=3,e.$http.getCourseResourceIntro(r);case 3:0==(s=t.sent).status&&e.$store.dispatch("saveResourceIntro",s.result);case 5:case"end":return t.stop()}},t,e)}))()}},mounted:function(){},destroyed:function(){},created:function(){this.getCourseResourceIntro()}},g={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"resourceIntro"},[r("el-row",[e._l(e.courseIntroList,function(t,s){return r("el-col",{key:s,attrs:{span:6}},[r("el-card",{staticClass:"box-card"},[r("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[r("el-tooltip",{attrs:{effect:"dark",content:t.title,placement:"top"}},[r("span",[e._v(e._s(t.title))])])],1),e._v(" "),r("div",{staticClass:"introItem"},[r("div",{staticClass:"introItemscroll"},[e._v("\n                        "+e._s(t.content)+"\n                    ")])]),e._v(" "),r("div",{staticClass:"box-card-bottom"},[r("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(r){e.openAddResDialog(s,t.id)}}},[e._v("修改")]),e._v(" "),r("el-button",{staticClass:"button",attrs:{type:"text"},on:{click:function(t){e.deleteResIntro(s)}}},[e._v("删除")])],1)])],1)}),e._v(" "),r("el-col",{attrs:{span:6}},[r("el-card",{staticClass:"box-card add-card",nativeOn:{click:function(t){return e.openAddResDialog(t)}}},[r("i",{staticClass:"el-icon-plus"}),e._v(" "),r("p",[e._v("建议：添加3个")])])],1)],2),e._v(" "),r("el-dialog",{staticClass:"tabplane",attrs:{title:0==e.Doing?"新增资源介绍":"修改资源介绍",visible:e.dialogAddResVisible},on:{"update:visible":function(t){e.dialogAddResVisible=t},close:function(t){e.resetForm("AddResForm")}}},[r("el-form",{ref:"AddResForm",attrs:{model:e.AddResForm}},[r("el-form-item",{attrs:{label:"标题",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",max:15})}},[r("el-input",{staticClass:"coursetxt",attrs:{"auto-complete":"off",placeholder:"示例：15章课程学习"},model:{value:e.AddResForm.title,callback:function(t){e.$set(e.AddResForm,"title",t)},expression:"AddResForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"详情",prop:"content",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[r("el-input",{staticClass:"coursetxt",attrs:{autosize:"",type:"textarea","auto-complete":"off",placeholder:"示例：每天按照计划完成学习，把握好学习节奏"},model:{value:e.AddResForm.content,callback:function(t){e.$set(e.AddResForm,"content",t)},expression:"AddResForm.content"}})],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.resetForm("AddResForm")}}},[e._v("取 消")]),e._v(" "),1==e.Doing?r("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.saveResForm("AddResForm")}}},[e._v(e._s(e.btnLoading?"保存中":"保存修改"))]):e._e(),e._v(" "),0==e.Doing?r("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.addResForm("AddResForm")}}},[e._v(e._s(e.btnLoading?"新增中":"确定"))]):e._e()],1)],1)],1)},staticRenderFns:[]},b=r("Z0/y")(f,g,!1,null,null,null).exports,w=r("DIUF"),F=r("SJI6"),x={name:"CourseModuleBasicSet",components:{ImgUpload:h,ResourceIntro:b},data:function(){return{chName:"",isIcon:!0,resourceType:"video",resourceRadio:"",multipleSelection:[],resLoading:!1,isBox:!1,isTrue:!1,searchResourceTimer:"",pagination:{current_page:1,total:1},resourceinput:"",place:"请选择视频",vid_id:"",index:"1",value:"",resourceTable:[],zLoading:!1,btnLoading:!1,editor:null,selectfalg:!1,selectedlist:[],ware_status_list:[],course_type:w.a,active:0,progressText:w.d,ruleForm:{name:"",project_id:"",subject_id:"",course_type:"",welcome_letter_type:"1",welcome_letter:"",teacher_name:""},templateContent:"",userDefinedContent:"",kForm:{ware_status:"",allow_question:"0",allow_plan:"0",allow_investigate:"0",investigate_url:""}}},computed:u()({},Object(F.mapState)({projectlist:function(e){return e.common.project_subject_list}}),{course_id:function(){return this.$route.params.cid},moren:function(){return"默认视频-ID:"+this.vid_id},isChangeVideo:function(){return""==this.chName?this.place:this.chName+"-ID:"+this.place}}),watch:{projectlist:function(){this.getCourseInfo()}},methods:u()({},Object(F.mapActions)(["getProjectSubjectList"]),{changeLetterType:function(e){1==e?this.ruleForm.welcome_letter=this.templateContent:2==e&&(this.ruleForm.welcome_letter=this.userDefinedContent)},changeNewMember:function(e){1==e&&(this.isTrue=!1,this.isBox=!1),2==e&&(this.isTrue=!0,this.isIcon=!0)},handleRow:function(e){this.place=e.id,this.chName=e.title,this.isBox=!1,this.isIcon=!0},handleIconClick:function(){var e=this;return n()(a.a.mark(function t(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:1!=e.pagination.current_page?e.pagination.current_page=1:e.searchResource();case 1:case"end":return t.stop()}},t,e)}))()},handleCurrentChange:function(e){var t=this;return n()(a.a.mark(function r(){return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:e=Number(e),t.searchResource(e);case 2:case"end":return r.stop()}},r,t)}))()},isShowBox:function(){this.isBox=!this.isBox,this.isIcon=!this.isIcon,1==this.isBox&&this.searchResource(1)},searchResource:function(e){var t=this;clearTimeout(this.searchResourceTimer),this.resLoading=!0,this.searchResourceTimer=setTimeout(n()(a.a.mark(function r(){var s,o,i;return a.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:clearTimeout(t.searchResourceTimer),s={discriminator:t.resourceType,page_size:50,page:e||1,"order_by[]":"desc","order_by_field[]":"id",project_id:t.project_id},o=t.resourceinput.trim(),r.t0=t.resourceType,r.next="legacy_live"===r.t0?6:"paper"===r.t0?8:10;break;case 6:return isNumber(o)?s.legacy_live_id=o:s.keywords=o,r.abrupt("break",12);case 8:return isNumber(o)?s.paper_id=o:s.keywords=o,r.abrupt("break",12);case 10:return s.keywords=o,r.abrupt("break",12);case 12:return r.next=14,t.$http.getResource(s);case 14:0==(i=r.sent).status&&(t.resLoading=!1,t.resourceTable=i.result.resources,t.pagination.total=i.result.pagination.total);case 16:case"end":return r.stop()}},r,t)})),500)},changeWelcomeLetter:function(e){this.userDefinedContent=e},visibleChange:function(e){this.selectfalg=e},changeProject:function(e){for(var t in this.projectlist)if(this.projectlist[t].project_id==e){var r=[].concat(o()(this.projectlist[t].subject_list));this.selectedlist=r,this.selectfalg&&(this.ruleForm.subject_id="0")}},next:function(e){var t=this;if(this.isTrue&&11==this.ruleForm.course_type&&"请选择视频"==this.place)return this.$message({message:"请选择自定义视频",type:"warning"}),!1;this.active>=this.progressText.length-1||this.$refs[e].validate(function(e){if(!e)return!1;t.active++,t.progressText[t.active].isCustomerConfirm=!0})},prev:function(){this.active<=0||(this.progressText[this.active].isCustomerConfirm=!1,this.active--)},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.SetCourse()})},getCourseInfo:function(){var e=this;return n()(a.a.mark(function t(){var r,s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.course_id,t.next=3,e.$http.getCourseInfo(r);case 3:0==(s=t.sent).status&&(e.ruleForm.name=s.result.course_name,e.ruleForm.project_id=s.result.project_id,e.ruleForm.subject_id=s.result.subject_id,e.changeProject(e.ruleForm.project_id),e.ruleForm.course_type=s.result.course_type,e.ruleForm.welcome_letter=s.result.welcome_letter,e.ruleForm.teacher_name=s.result.teacher_name,e.ruleForm.welcome_letter_type=String(s.result.welcome_letter_type),e.templateContent=s.result.welcome_letter_template,e.userDefinedContent=s.result.welcome_letter,1==s.result.welcome_letter_type&&(e.userDefinedContent="",e.ruleForm.welcome_letter=s.result.welcome_letter_template),e.$store.dispatch("changeCover",s.result),e.ware_status_list=s.result.ware_status_list,e.kForm.ware_status=s.result.ware_status,e.kForm.allow_question=s.result.allow_question,e.kForm.allow_plan=s.result.allow_plan,e.kForm.allow_investigate=s.result.allow_investigate,e.kForm.investigate_url=s.result.investigate_url,setTimeout(function(){console.log("setTimeout",e.editor),void 0===e.editor||null===e.editor?(e.setEditor(),s.result.brief_introduction&&e.editor&&e.editor.setContent(s.result.brief_introduction)):s.result.brief_introduction&&e.editor&&e.editor.setContent(s.result.brief_introduction)},500),"11"==s.result.course_type&&s.result.video_id==e.vid_id?e.isTrue=!1:"11"==s.result.course_type&&s.result.video_id!=e.vid_id&&0!=s.result.video_id&&(e.isTrue=!0,e.place=s.result.video_id,e.index="2",e.$http.searchResource(s.result.video_id).then(function(t){0==t.status&&(e.chName=t.result.resource.title)}).catch(function(e){})));case 5:case"end":return t.stop()}},t,e)}))()},SetCourse:function(){var e=this;0==this.kForm.allow_investigate&&(this.kForm.investigate_url=""),0==this.ruleForm.welcome_letter_type&&(this.ruleForm.welcome_letter="",this.ruleForm.teacher_name="");var t=this.course_id,r=u()({},this.ruleForm,this.kForm,{brief_introduction:this.editor.getContent()!="<p>"+w.b+"</p>"?this.editor.getContent():"","course_source_ids[]":this.$store.state.course.resource_intro_id,"course_update_ids[]":this.$store.state.course.course_update_ids,"course_update_titles[]":this.$store.state.course.course_update_titles,"course_update_contents[]":this.$store.state.course.course_update_contents,cover:this.$store.state.course.course_cover});"11"===this.ruleForm.course_type&&this.isTrue?r.video_id=this.place:"11"!==this.ruleForm.course_type||this.isTrue?r.video_id="":r.video_id=this.vid_id,this.btnLoading=!0,this.$http.SetCourse(t,r).then(function(t){e.btnLoading=!1,0==t.status?(e.$message({type:"success",message:t.message?t.message:"设置成功！"}),setTimeout(function(){location.reload()},1e3)):2==t.status&&e.$message.error("设置失败！")})},setEditor:function(){this.editor=UE.getEditor("ed",{toolbars:[["fullscreen","undo","redo","|","bold","cleardoc"]],autoClearinitialContent:!0,initialContent:w.b,wordCount:!0,maximumWords:500,elementPathEnabled:!1,initialFrameHeight:160})}}),mounted:function(){this.setEditor(),console.log("mounted",this.editor)},destroyed:function(){this.editor&&this.editor.destroy()},created:function(){void 0!=this.projectlist&&null!=this.projectlist&&0!==this.projectlist.length?this.getCourseInfo():this.getProjectSubjectList();var e=Object(d.e)();this.vid_id=""==e?"242241":"600616"},filters:{changeVal:function(e){if("video"==e)return"视频"}}},y={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.zLoading,expression:"zLoading"}],staticClass:"module-edu-content courseset"},[r("el-row",{staticClass:"progressBox"},e._l(e.progressText,function(t){return r("el-col",{key:t.text,attrs:{sm:12}},[r("div",{staticClass:"order-progress-bar"},[r("i",{staticClass:"progress-bar-line",class:t.isCustomerConfirm?t.currentLine:""}),e._v(" "),r("i",{staticClass:"progress-bar-dot",class:t.isCustomerConfirm?t.currentDot:""}),e._v(" "),r("span",{class:t.isCustomerConfirm?t.currentText:""},[e._v(e._s(t.text))])])])})),e._v(" "),r("div",{staticClass:"formBox"},[r("div",{directives:[{name:"show",rawName:"v-show",value:0==e.active,expression:"active == 0"}]},[r("el-form",{ref:"ruleForm",staticClass:"ruleForm",attrs:{model:e.ruleForm,"label-position":"left","label-width":"100px"}},[r("el-form-item",{attrs:{label:"课程名称",prop:"name",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[r("el-input",{model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"所属项目",prop:"project_id",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{placeholder:"请选择所属项目"},on:{change:e.changeProject,"visible-change":e.visibleChange},model:{value:e.ruleForm.project_id,callback:function(t){e.$set(e.ruleForm,"project_id",t)},expression:"ruleForm.project_id"}},e._l(e.projectlist,function(e){return r("el-option",{key:e.project_id,attrs:{label:e.project_name,value:e.project_id}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"所属科目",prop:"subject_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject_id,callback:function(t){e.$set(e.ruleForm,"subject_id",t)},expression:"ruleForm.subject_id"}},[r("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.selectedlist,function(e){return r("el-option",{key:e.subject_id,attrs:{label:e.subject_name,value:e.subject_id}})})],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"网课类型",prop:"course_type",rules:[{required:!0,message:"请选择网课类型",trigger:"change"}]}},[r("el-select",{attrs:{placeholder:"请选择网课类型"},model:{value:e.ruleForm.course_type,callback:function(t){e.$set(e.ruleForm,"course_type",t)},expression:"ruleForm.course_type"}},e._l(e.course_type,function(e){return r("el-option",{key:e.course_type_id,attrs:{label:e.name,value:e.course_type_id}})}))],1),e._v(" "),r("el-form-item",{staticClass:"pad_10",attrs:{label:"课程封面"}},[r("ImgUpload")],1),e._v(" "),r("el-form-item",{staticClass:"pad_10",attrs:{label:"课程简介"}},[r("div",{attrs:{id:"ed",type:"text/plain"}})]),e._v(" "),11!=e.ruleForm.course_type?[r("el-form-item",{staticClass:"res_intro pad_10",attrs:{label:"资源介绍"}},[r("ResourceIntro")],1)]:e._e(),e._v(" "),11!=e.ruleForm.course_type?[r("el-form-item",{staticClass:"pad_10",attrs:{label:"给新学员的欢迎信"}},[r("el-radio-group",{on:{change:e.changeLetterType},model:{value:e.ruleForm.welcome_letter_type,callback:function(t){e.$set(e.ruleForm,"welcome_letter_type",t)},expression:"ruleForm.welcome_letter_type"}},[r("el-radio",{attrs:{label:"1"}},[e._v("通用模板内容")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("自定义内容")]),e._v(" "),r("el-radio",{attrs:{label:"0"}},[e._v("不启用欢迎信")])],1)],1),e._v(" "),0!=e.ruleForm.welcome_letter_type?r("el-form-item",{attrs:{prop:"welcome_letter",rules:e.filter_rules({required:!0,type:"isAllSpace",max:200})}},[r("el-row",[r("el-col",{attrs:{span:24}},[r("el-input",{staticClass:"coursetxt",attrs:{type:"textarea",autosize:{minRows:4},disabled:1==e.ruleForm.welcome_letter_type,"auto-complete":"off",placeholder:"请输入欢迎信的正文内容（字数请控制在100-200字内）"},on:{change:e.changeWelcomeLetter},model:{value:e.ruleForm.welcome_letter,callback:function(t){e.$set(e.ruleForm,"welcome_letter",t)},expression:"ruleForm.welcome_letter"}})],1)],1)],1):e._e(),e._v(" "),0!=e.ruleForm.welcome_letter_type?r("el-form-item",{attrs:{prop:"teacher_name",rules:e.filter_rules({type:"isAllSpace",max:10})}},[r("el-row",[r("el-col",{attrs:{span:6}},[r("el-input",{staticClass:"coursetxt",attrs:{"auto-complete":"off",placeholder:"请输入老师名字"},model:{value:e.ruleForm.teacher_name,callback:function(t){e.$set(e.ruleForm,"teacher_name",t)},expression:"ruleForm.teacher_name"}})],1)],1)],1):e._e()]:e._e(),e._v(" "),11==e.ruleForm.course_type?[r("el-form-item",{staticClass:"pad_10",attrs:{label:"新学员介绍视频"}},[r("el-radio-group",{on:{change:e.changeNewMember},model:{value:e.index,callback:function(t){e.index=t},expression:"index"}},[r("el-radio",{attrs:{label:"1"}},[e._v("默认EP视频")]),e._v(" "),r("el-radio",{attrs:{label:"2"}},[e._v("自定义视频")])],1)],1),e._v(" "),r("el-form-item",[0==e.isTrue?r("el-row",[r("el-input",{attrs:{type:"textarea",rows:1,disabled:"disabled"},model:{value:e.moren,callback:function(t){e.moren=t},expression:"moren"}})],1):e._e(),e._v(" "),e.isTrue?r("div",{staticClass:"place",on:{click:e.isShowBox}},[e._v(e._s(e.isChangeVideo)+" "),r("i",{directives:[{name:"show",rawName:"v-show",value:e.isIcon,expression:"isIcon"}],staticClass:"el-icon-arrow-right ps"}),e._v(" "),r("i",{directives:[{name:"show",rawName:"v-show",value:!e.isIcon,expression:"!isIcon"}],staticClass:"el-icon-arrow-down ps"})]):e._e(),e._v(" "),e.isBox?r("div",{staticClass:"messagebox"},[r("div",{staticStyle:{"margin-top":"15px"}},[r("el-input",{staticClass:"input-with-select",attrs:{placeholder:"请输入视频资源ID/名称"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.resourceinput,callback:function(t){e.resourceinput=t},expression:"resourceinput"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleIconClick},slot:"append"})],1)],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.resLoading,expression:"resLoading"}],staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.resourceTable,"cell-click":"handleRow",height:"250",border:""},on:{"row-click":e.handleRow}},[r("el-table-column",{attrs:{prop:"id",label:"资源ID",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"discriminator",label:"资源类型",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("changeVal")(t.row.discriminator)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"title",label:"资源名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(t.row.title))])]}}])})],1),e._v(" "),r("div",{staticStyle:{width:"100%","text-align":"right","margin-top":"20px"}},[r("el-pagination",{attrs:{"current-page":e.pagination.current_page,"page-size":50,layout:"total, prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pagination,"current_page",t)}}})],1)],1):e._e()],1)]:e._e(),e._v(" "),r("el-form-item",{staticClass:"last-form-item"},[r("el-button",{staticStyle:{"margin-top":"12px"},on:{click:function(t){e.next("ruleForm")}}},[e._v("下一步")])],1)],2)],1),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:1==e.active,expression:"active == 1"}]},[r("el-form",{ref:"kForm",staticClass:"kForm",attrs:{model:e.kForm,"label-position":"left","label-width":"100px"}},[r("el-form-item",{attrs:{label:"内容制作状态",prop:"ware_status"}},[r("el-select",{model:{value:e.kForm.ware_status,callback:function(t){e.$set(e.kForm,"ware_status",t)},expression:"kForm.ware_status"}},e._l(e.ware_status_list,function(e,t){return r("el-option",{key:t,attrs:{label:e[1],value:e[0]+""}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"可提问",prop:"allow_question"}},[r("el-radio-group",{model:{value:e.kForm.allow_question,callback:function(t){e.$set(e.kForm,"allow_question",t)},expression:"kForm.allow_question"}},[r("el-radio",{attrs:{label:"0"}},[e._v("否")]),e._v(" "),r("el-radio",{attrs:{label:"1"}},[e._v("是")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"可制定学习计划",prop:"allow_plan"}},[r("el-radio-group",{model:{value:e.kForm.allow_plan,callback:function(t){e.$set(e.kForm,"allow_plan",t)},expression:"kForm.allow_plan"}},[r("el-radio",{attrs:{label:"0"}},[e._v("否")]),e._v(" "),r("el-radio",{attrs:{label:"1"}},[e._v("是")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"可使用问卷调查",prop:"allow_investigate"}},[r("el-radio-group",{model:{value:e.kForm.allow_investigate,callback:function(t){e.$set(e.kForm,"allow_investigate",t)},expression:"kForm.allow_investigate"}},[r("el-radio",{attrs:{label:"0"}},[e._v("否")]),e._v(" "),r("el-radio",{attrs:{label:"1"}},[e._v("是")])],1)],1),e._v(" "),"1"==e.kForm.allow_investigate?r("el-form-item",{attrs:{label:"问卷地址",prop:"investigate_url",rules:e.filter_rules({required:!0,type:"isAllSpace"})}},[r("el-input",{model:{value:e.kForm.investigate_url,callback:function(t){e.$set(e.kForm,"investigate_url",t)},expression:"kForm.investigate_url"}})],1):e._e(),e._v(" "),r("el-form-item",{staticClass:"last-form-item"},[r("el-button",{staticStyle:{"margin-top":"12px"},on:{click:e.prev}},[e._v("上一步")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.submitForm("kForm")}}},[e._v("\n                        "+e._s(e.btnLoading?"保存中":"确定")+"\n                    ")])],1)],1)],1)])],1)},staticRenderFns:[]};var C=r("Z0/y")(x,y,!1,function(e){r("Z0M8"),r("9E4I")},null,null);t.default=C.exports},DIUF:function(e,t,r){"use strict";r.d(t,"b",function(){return s}),r.d(t,"a",function(){return o}),r.d(t,"c",function(){return i}),r.d(t,"d",function(){return a});var s='<span style="color:#97a8be;">请输入课程简介（字数建议控制在200-300字内）</span>',o=[{course_type_id:"10",name:"网课2.0"},{course_type_id:"11",name:"EP2.0"},{course_type_id:"4",name:"私播课-Glive+"}],i=[{value:"",label:"全部课程类型"},{value:"10",label:"网课2.0"},{value:"11",label:"EP2.0"},{value:"4",label:"私播课-Glive+"}],a=[{text:"基本设置",currentLine:"bar-line-current",currentDot:"bar-dot-current",currentText:"current-text",isCustomerConfirm:!0},{text:"功能模块",currentLine:"bar-line-current",currentDot:"bar-dot-current",currentText:"current-text",isCustomerConfirm:!1}]},Z0M8:function(e,t){}});
//# sourceMappingURL=9.6804ccbf6b2b59b894d9.js.map