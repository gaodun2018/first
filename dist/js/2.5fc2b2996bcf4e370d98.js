webpackJsonp([2],{Buak:function(e,t){},G5mb:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"resourceModuleVideoEdit",components:{ResourceGroupForm:i("ROGO").a},created:function(){console.log(this.$route.params)}},l={render:function(){var e=this.$createElement;return(this._self._c||e)("ResourceGroupForm",{attrs:{id:this.$route.params.id}})},staticRenderFns:[]};var n=i("Z0/y")(r,l,!1,function(e){i("i5Ij")},null,null);t.default=n.exports},"Q/QV":function(e,t){},ROGO:function(e,t,i){"use strict";var r=i("4YfN"),l=i.n(r),n=i("IHPB"),a=i.n(n),o=i("rVsN"),s=i.n(o),c=i("lC5x"),u=i.n(c),p=i("J0Oq"),d=i.n(p),h=i("zsLt"),m=i.n(h),g=i("PMEp"),f=i("SJI6"),v={components:{},props:["id"],data:function(){return{isConfict:!1,isInit:!1,subjectData:[],loading:!1,selectFalg:!1,ruleForm:{title:"",project:"",subject:"",description:""},resourceinput:"",multipleSelectionAll:[],multipleSelection:[],pagination:{current_page:1,total:1},searchResourceTimer:null,dialogFormVisible:!1,resLoading:!1,resourceTable:[],resourceTableConfig:g.c[0].table,getRowKeys:function(e){return e.id},lastSelect:{project:"",subject:""}}},filters:{judgeTeacher:function(e){return null==e?"无":e.name}},methods:{showSelect:function(){var e=this;if(this.multipleSelectionAll&&!(this.multipleSelectionAll.length<0)){var t=[];this.multipleSelectionAll.forEach(function(e){t.push(e.id)}),this.$refs.multipleTable.clearSelection(),this.resourceTable&&this.resourceTable.length>0&&this.resourceTable.forEach(function(i){t.indexOf(i.id)>=0&&e.$refs.multipleTable.toggleRowSelection(i)})}},changePageData:function(){var e=this;if(this.multipleSelectionAll.length<=0)this.multipleSelectionAll=this.multipleSelection;else{var t=[];this.multipleSelectionAll.forEach(function(e){t.push(e.id)});var i=[];this.multipleSelection.forEach(function(r){i.push(r.id),t.indexOf(r.id)<0&&e.multipleSelectionAll.push(r)});var r=[];this.resourceTable.forEach(function(e){i.indexOf(e.id)<0&&r.push(e.id)}),r.forEach(function(i){t.indexOf(i)>=0&&e.multipleSelectionAll.forEach(function(t,r){t.id==i&&e.multipleSelectionAll.splice(r,1)})})}},filterData:function(e){e&&e.length>0&&e.forEach(function(e){e.id=e.video.id,e.title=e.video.title,e.teacher_id=e.video.teacher_id})},handleCloseTag:function(e){this.isConfict=!0,this.multipleSelectionAll.splice(this.multipleSelectionAll.indexOf(e),1),this.dialogFormVisible&&this.showSelect()},handleOpenDialog:function(){var e=[];this.multipleSelectionAll.forEach(function(t){0!=t.teacher_id&&e.push(t.teacher_id)}),new m.a(e).size==e.length?(this.isInit=!0,1!=this.pagination.current_page&&(this.pagination.current_page=1),this.searchResource(),this.dialogFormVisible=!0):this.$message({message:"请将红色部分相同老师ID的资源选择性删除",type:"warning"})},handleCurrentChange:function(e){var t=this;return d()(u.a.mark(function i(){return u.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:e=Number(e),t.searchResource(e);case 2:case"end":return i.stop()}},i,t)}))()},handleIconClick:function(){var e=this;return d()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:1!=e.pagination.current_page?e.pagination.current_page=1:e.searchResource(1,e.resourceinput);case 1:case"end":return t.stop()}},t,e)}))()},handleSelectFocus:function(){},selectResource:function(){this.dialogFormVisible=!1},searchResource:function(e,t){var i=this;clearTimeout(this.searchResourceTimer),this.resLoading=!0,this.searchResourceTimer=setTimeout(d()(u.a.mark(function r(){var l,n;return u.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return clearTimeout(i.searchResourceTimer),l={discriminator:"video",page_size:50,page:e||1,keywords:t||"","order_by[]":"desc","order_by_field[]":"id",tag_id:i.ruleForm.project,action_type:1},r.next=4,i.$http.newGetTeacher(l);case 4:0==(n=r.sent).status&&(i.resLoading=!1,i.resourceTable=n.result.resources?n.result.resources:[],i.pagination.total=n.result.pagination.total,i.filterData(i.resourceTable),i.showSelect());case 6:case"end":return r.stop()}},r,i)})),500)},initData:function(){var e=this;return d()(u.a.mark(function t(){var i,r,l,n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.all([e.$http.getOneResource(e.$route.params.id),e.$http.getResourceGroup({group_id:e.$route.params.id})]);case 2:i=t.sent,r=i[0],l=i[1],0===r.status&&(n=r.result.resource,e.ruleForm.title=n.title,e.ruleForm.description=n.description,n.tag&&n.tag.id&&0!=n.tag.id?(e.ruleForm.project=String(n.tag.id),e.ruleForm.subject=n.tag.children&&0!=n.tag.children.length?String(n.tag.children[0].id):"0",e.didChangeProjectSelection(n.tag.id)):(e.ruleForm.project="",e.ruleForm.subject="")),0===l.status&&(e.multipleSelectionAll=l.result,null!==e.multipleSelectionAll&&void 0!==e.multipleSelectionAll||(e.multipleSelectionAll=[]));case 7:case"end":return t.stop()}},t,e)}))()},handleInputChange:function(e){""==e&&(this.ruleForm.duration_second=0)},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.selectFalg,this.tagsList.forEach(function(i){if(i.id==e){var r=[].concat(a()(i.children));t.subjectData=r,t.selectFalg&&(t.ruleForm.subject="0")}})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){if(void 0==t.multipleSelectionAll||null==t.multipleSelectionAll||0===t.multipleSelectionAll.length)return t.$message({message:"请选择资源！",type:"error"});t.createResourceForm()}})},createResourceForm:function(){var e=this;return d()(u.a.mark(function t(){var i,r,l,n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(i=[],r=[],e.multipleSelectionAll.forEach(function(e){i.push(e.id),0!==e.teacher_id&&r.push(e.teacher_id)}),new m.a(r).size==r.length){t.next=6;break}return e.$message({message:"请将相同老师ID的资源进行修改",type:"warning"}),t.abrupt("return");case 6:return l={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,"resource_id[]":i},e.$route.params.id&&(l.id=e.$route.params.id),e.loading=!0,t.next=11,e.$http.createResourceGroup(l);case 11:n=t.sent,e.loading=!1,0==n.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/resource-group/list"})},1e3)):e.$message({message:"保存失败:"+n.message,type:"error"});case 14:case"end":return t.stop()}},t,e)}))()},resetForm:function(e){this.$refs[e].resetFields(),this.multipleSelectionAll=[]},handleSelectionChange:function(e){if(e.length>10)return this.$message({message:"最多选择10个资源！",type:"warning"}),void this.toggleSelection([e[e.length-1]]);this.multipleSelection=e,this.changePageData()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},judgIdNum:function(e){var t=0;return this.multipleSelectionAll.forEach(function(i){i.teacher_id===e&&t++}),t}},watch:{multipleSelectionAll:function(e){var t=0,i=[];if(e.forEach(function(r){0!=r.teacher_id&&i.push(r.teacher_id),0!=e[e.length-1].teacher_id&&e[e.length-1].teacher_id==r.teacher_id&&t++}),this.isInit||new m.a(i).size==i.length)return t>=2?(this.$message({message:"同一个老师只允许有一个资源",type:"warning"}),this.multipleSelectionAll.splice(this.multipleSelectionAll.length-1,1),void this.showSelect()):this.multipleSelectionAll.length>10?(this.$message({message:"最多只允许选择10个资源",type:"warning"}),this.multipleSelectionAll.splice(this.multipleSelectionAll.length-1,1),void this.showSelect()):void 0;this.isConfict||this.$alert("此资源组，存在多个资源属于同一个老师，这样是不允许的，请修改已选定的资源","温馨提示",{confirmButtonText:"确定"})}},computed:l()({},Object(f.mapState)({tagsList:function(e){return e.resources.tagsList}})),created:function(){var e=this;return d()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.id=e.$route.params.id,t.next=4,e.$store.dispatch("getTagsList","project");case 4:if(!e.$route.params.id){t.next=7;break}return t.next=7,e.initData();case 7:e.loading=!1;case 8:case"end":return t.stop()}},t,e)}))()}},_={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"module-clues-content add-resource resource-group-form-wrapper"},[i("div",{staticClass:"outlineeat"},[e._v("\n    "+e._s(e.id?"编辑资源组":"新增资源组")+"\n  ")]),e._v(" "),i("div",{staticClass:"frombox"},[i("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[i("el-form-item",{attrs:{label:"资源组名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[i("el-input",{attrs:{placeholder:"请填写资源组名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"项目",prop:"project",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{focus:e.handleSelectFocus,change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.project,callback:function(t){e.$set(e.ruleForm,"project",t)},expression:"ruleForm.project"}},e._l(e.tagsList,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"科目",prop:"subject",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[i("el-select",{attrs:{disabled:""==e.ruleForm.project||void 0==e.ruleForm.project||null==e.ruleForm.project,filterable:"",placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject,callback:function(t){e.$set(e.ruleForm,"subject",t)},expression:"ruleForm.subject"}},[i("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.subjectData,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})})],2)],1),e._v(" "),i("el-form-item",{attrs:{label:"备注说明",prop:"description"}},[i("el-input",{attrs:{placeholder:"备注说明","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"选择资源"}},[i("el-button",{attrs:{disabled:""==e.ruleForm.project||void 0==e.ruleForm.project||null==e.ruleForm.project,type:"primary"},on:{click:e.handleOpenDialog}},[e._v("选择资源")]),e._v(" "),i("el-row",e._l(e.multipleSelectionAll,function(t){return i("el-tag",{key:t.id,class:{red:e.judgIdNum(t.teacher_id)>=2&&0!=t.teacher_id},attrs:{size:"small",closable:"","disable-transitions":!1},on:{close:function(i){e.handleCloseTag(t)}}},[i("span",{staticClass:"tag-title",attrs:{title:t.title}},[e._v(e._s(t.title))]),e._v(" "),i("span",{staticClass:"tag-id"},[e._v("（ID："+e._s(t.id)+"）")]),e._v(" "),e.judgIdNum(t.teacher_id)>=2&&0!=t.teacher_id?i("span",{staticClass:"tag-id"},[e._v("（老师ID："+e._s(t.teacher_id)+"）")]):e._e()])}))],1),e._v(" "),i("el-form-item",{staticStyle:{"text-align":"right","margin-top":"60px"}},[i("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),i("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1),e._v(" "),i("el-dialog",{staticClass:"tabplane addResourceDialog",attrs:{title:"选择资源",center:"",width:"60%",top:"2%",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-row",{staticClass:"scroll-content",staticStyle:{"margin-bottom":"10px"}},e._l(e.multipleSelectionAll,function(t){return i("el-tag",{key:t.id,attrs:{size:"small",closable:"","disable-transitions":!1},on:{close:function(i){e.handleCloseTag(t)}}},[i("span",{staticClass:"tag-title",attrs:{title:t.title}},[e._v(e._s(t.title))]),e._v(" "),i("span",{staticClass:"tag-id"},[e._v("（ID："+e._s(t.id)+"）")]),e._v(" "),i("router-link",{attrs:{to:{name:"previewVideo",params:{id:t.id}},tag:"a",target:"_blank"}},[i("span",{staticClass:"tag-watch"},[e._v("预览")])])],1)})),e._v(" "),i("el-row",[i("el-input",{attrs:{placeholder:"输入资源ID/名称搜索",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.resourceinput,callback:function(t){e.resourceinput=t},expression:"resourceinput"}},[i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleIconClick},slot:"append"})],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.resLoading,expression:"resLoading"}],ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.resourceTable,border:"","tooltip-effect":"dark","max-height":"400","highlight-current-row":"","row-key":e.getRowKeys},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{"reserve-selection":!0,type:"selection",width:"55"}}),e._v(" "),e._l(e.resourceTableConfig,function(t,r){return i("el-table-column",{key:r,attrs:{label:t.label,width:t.wh,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(r){return["id"==t.key||"paper_id"==t.key||"live_id"==t.key?[i("span",[e._v(e._s(r.row.video.id))])]:"name"==t.key?i("span",[e._v(e._s(e._f("judgeTeacher")(r.row.teacher_info)))]):"discriminator"==t.key?i("span",[e._v(e._s(e._f("Resource2chn")(r.row[t.type][t.key])))]):i("span",[e._v(e._s(r.row[t.type][t.key]))])]}}])})})],2),e._v(" "),i("el-pagination",{attrs:{"current-page":e.pagination.current_page,"page-size":50,layout:"total, prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pagination,"current_page",t)}}})],1),e._v(" "),i("div",{staticClass:"coursebtn",staticStyle:{"padding-top":"0","margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:e.selectResource}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var b=i("Z0/y")(v,_,!1,function(e){i("Q/QV"),i("Buak")},null,null);t.a=b.exports},i5Ij:function(e,t){}});
//# sourceMappingURL=2.5fc2b2996bcf4e370d98.js.map