webpackJsonp([6],{ROGO:function(e,t,r){"use strict";var i=r("4YfN"),l=r.n(i),n=r("IHPB"),o=r.n(n),a=r("rVsN"),s=r.n(a),c=r("lC5x"),u=r.n(c),p=r("J0Oq"),d=r.n(p),m=r("PMEp"),h=r("SJI6"),g={components:{},props:["id"],data:function(){return{subjectData:[],loading:!1,selectFalg:!1,ruleForm:{title:"",project:"",subject:"",description:""},resourceinput:"",multipleSelectionAll:"",multipleSelection:[],pagination:{current_page:1,total:1},searchResourceTimer:null,dialogFormVisible:!1,resLoading:!1,resourceTable:[],resourceTableConfig:m.c[0].table,getRowKeys:function(e){return e.id},lastSelect:{project:"",subject:""}}},filters:{judgeTeacher:function(e){return null==e?"无":e.name}},methods:{showSelect:function(){var e=this;if(this.multipleSelectionAll&&!(this.multipleSelectionAll.length<0)){var t=[];this.multipleSelectionAll.forEach(function(e){t.push(e.id)}),this.$refs.multipleTable.clearSelection(),this.resourceTable&&this.resourceTable.length>0&&this.resourceTable.forEach(function(r){t.indexOf(r.id)>=0&&e.$refs.multipleTable.toggleRowSelection(r)})}},changePageData:function(){var e=this;if(this.multipleSelectionAll.length<=0)this.multipleSelectionAll=this.multipleSelection;else{var t=[];this.multipleSelectionAll.forEach(function(e){t.push(e.id)});var r=[];this.multipleSelection.forEach(function(i){r.push(i.id),t.indexOf(i.id)<0&&e.multipleSelectionAll.push(i)});var i=[];this.resourceTable.forEach(function(e){r.indexOf(e.id)<0&&i.push(e.id)}),i.forEach(function(r){t.indexOf(r)>=0&&e.multipleSelectionAll.forEach(function(t,i){t.id==r&&e.multipleSelectionAll.splice(i,1)})})}},filterData:function(e){e&&e.length>0&&e.forEach(function(e){e.id=e.video.id,e.title=e.video.title,e.teacher_id=e.video.teacher_id})},handleCloseTag:function(e){this.multipleSelectionAll.splice(this.multipleSelectionAll.indexOf(e),1),this.dialogFormVisible&&this.showSelect()},handleOpenDialog:function(){1!=this.pagination.current_page&&(this.pagination.current_page=1),this.searchResource(),this.dialogFormVisible=!0},handleCurrentChange:function(e){var t=this;return d()(u.a.mark(function r(){return u.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:e=Number(e),t.searchResource(e);case 2:case"end":return r.stop()}},r,t)}))()},handleIconClick:function(){var e=this;return d()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:1!=e.pagination.current_page?e.pagination.current_page=1:e.searchResource(1,e.resourceinput);case 1:case"end":return t.stop()}},t,e)}))()},handleSelectFocus:function(){},selectResource:function(){this.dialogFormVisible=!1},searchResource:function(e,t){var r=this;clearTimeout(this.searchResourceTimer),this.resLoading=!0,this.searchResourceTimer=setTimeout(d()(u.a.mark(function i(){var l,n;return u.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return clearTimeout(r.searchResourceTimer),l={discriminator:"video",page_size:50,page:e||1,keywords:t||"","order_by[]":"desc","order_by_field[]":"id",tag_id:r.ruleForm.project,action_type:1},i.next=4,r.$http.newGetTeacher(l);case 4:0==(n=i.sent).status&&(r.resLoading=!1,r.resourceTable=n.result.resources,r.pagination.total=n.result.pagination.total,r.filterData(r.resourceTable),r.showSelect());case 6:case"end":return i.stop()}},i,r)})),500)},initData:function(){var e=this;return d()(u.a.mark(function t(){var r,i,l,n;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.a.all([e.$http.getOneResource(e.$route.params.id),e.$http.getResourceGroup({group_id:e.$route.params.id})]);case 2:r=t.sent,i=r[0],l=r[1],0===i.status&&(n=i.result.resource,e.ruleForm.title=n.title,e.ruleForm.description=n.description,n.tag&&n.tag.id&&0!=n.tag.id?(e.ruleForm.project=String(n.tag.id),e.ruleForm.subject=n.tag.children&&0!=n.tag.children.length?String(n.tag.children[0].id):"0",e.didChangeProjectSelection(n.tag.id)):(e.ruleForm.project="",e.ruleForm.subject="")),0===l.status&&(e.multipleSelectionAll=l.result,null!==e.multipleSelectionAll&&void 0!==e.multipleSelectionAll||(e.multipleSelectionAll=[]));case 7:case"end":return t.stop()}},t,e)}))()},handleInputChange:function(e){""==e&&(this.ruleForm.duration_second=0)},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.selectFalg,this.tagsList.forEach(function(r){if(r.id==e){var i=[].concat(o()(r.children));t.subjectData=i,t.selectFalg&&(t.ruleForm.subject="0")}})},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){if(void 0==t.multipleSelectionAll||null==t.multipleSelectionAll||0===t.multipleSelectionAll.length)return t.$message({message:"请选择资源！",type:"error"});t.createResourceForm()}})},createResourceForm:function(){var e=this;return d()(u.a.mark(function t(){var r,i,l;return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=[],e.multipleSelectionAll.forEach(function(e){r.push(e.id)}),i={title:e.ruleForm.title,description:e.ruleForm.description,tag_id:"0"==e.ruleForm.subject?e.ruleForm.project:e.ruleForm.subject,"resource_id[]":r},e.$route.params.id&&(i.id=e.$route.params.id),e.loading=!0,t.next=7,e.$http.createResourceGroup(i);case 7:if(l=t.sent,e.loading=!1,0!=l.status){t.next=17;break}return e.$message({message:"保存成功",type:"success"}),t.next=13,e.$http.clearResource(e.$route.params.id);case 13:t.sent,setTimeout(function(){e.$router.push({path:"/resource/resource-group/list"})},1e3),t.next=18;break;case 17:e.$message({message:"保存失败:"+l.message,type:"error"});case 18:case"end":return t.stop()}},t,e)}))()},resetForm:function(e){this.$refs[e].resetFields(),this.multipleSelectionAll=[]},handleSelectionChange:function(e){if(e.length>10)return this.$message({message:"最多选择10个资源！",type:"warning"}),void this.toggleSelection([e[e.length-1]]);this.multipleSelection=e,this.changePageData()},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()}},watch:{multipleSelectionAll:function(e){var t=0;return e.forEach(function(r){0!=e[e.length-1].teacher_id&&e[e.length-1].teacher_id==r.teacher_id&&t++}),t>=2?(this.$message({message:"同一个老师只允许有一个资源",type:"warning"}),this.multipleSelectionAll.splice(this.multipleSelectionAll.length-1,1),void this.showSelect()):this.multipleSelectionAll.length>10?(this.$message({message:"最多只允许选择10个资源",type:"warning"}),this.multipleSelectionAll.splice(this.multipleSelectionAll.length-1,1),void this.showSelect()):void 0}},computed:l()({},Object(h.mapState)({tagsList:function(e){return e.resources.tagsList}})),created:function(){var e=this;return d()(u.a.mark(function t(){return u.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.id=e.$route.params.id,t.next=4,e.$store.dispatch("getTagsList","project");case 4:if(!e.$route.params.id){t.next=7;break}return t.next=7,e.initData();case 7:e.loading=!1;case 8:case"end":return t.stop()}},t,e)}))()}},f={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource resource-group-form-wrapper"},[r("div",{staticClass:"outlineeat"},[e._v("\n    "+e._s(e.id?"编辑资源组":"新增资源组")+"\n  ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"120px","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[r("el-form-item",{attrs:{label:"资源组名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{attrs:{placeholder:"请填写资源组名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"项目",prop:"project",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{focus:e.handleSelectFocus,change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.project,callback:function(t){e.$set(e.ruleForm,"project",t)},expression:"ruleForm.project"}},e._l(e.tagsList,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"科目",prop:"subject",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{disabled:""==e.ruleForm.project||void 0==e.ruleForm.project||null==e.ruleForm.project,filterable:"",placeholder:"请选择所属科目"},model:{value:e.ruleForm.subject,callback:function(t){e.$set(e.ruleForm,"subject",t)},expression:"ruleForm.subject"}},[r("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.subjectData,function(e,t){return r("el-option",{key:t,attrs:{label:e.name,value:String(e.id)}})})],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注说明",prop:"description"}},[r("el-input",{attrs:{placeholder:"备注说明","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"选择资源"}},[r("el-button",{attrs:{disabled:""==e.ruleForm.project||void 0==e.ruleForm.project||null==e.ruleForm.project,type:"primary"},on:{click:e.handleOpenDialog}},[e._v("选择资源")]),e._v(" "),r("el-row",e._l(e.multipleSelectionAll,function(t){return r("el-tag",{key:t.id,attrs:{size:"small",closable:"","disable-transitions":!1},on:{close:function(r){e.handleCloseTag(t)}}},[r("span",{staticClass:"tag-title",attrs:{title:t.title}},[e._v(e._s(t.title))]),e._v(" "),r("span",{staticClass:"tag-id"},[e._v("（ID："+e._s(t.id)+"）")])])}))],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right","margin-top":"60px"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1),e._v(" "),r("el-dialog",{staticClass:"tabplane addResourceDialog",attrs:{title:"选择资源",center:"",width:"60%",top:"2%",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[r("el-row",{staticClass:"scroll-content",staticStyle:{"margin-bottom":"10px"}},e._l(e.multipleSelectionAll,function(t){return r("el-tag",{key:t.id,attrs:{size:"small",closable:"","disable-transitions":!1},on:{close:function(r){e.handleCloseTag(t)}}},[r("span",{staticClass:"tag-title",attrs:{title:t.title}},[e._v(e._s(t.title))]),e._v(" "),r("span",{staticClass:"tag-id"},[e._v("（ID："+e._s(t.id)+"）")]),e._v(" "),r("router-link",{attrs:{to:{name:"previewVideo",params:{id:t.id}},tag:"a",target:"_blank"}},[r("span",{staticClass:"tag-watch"},[e._v("预览")])])],1)})),e._v(" "),r("el-row",[r("el-input",{attrs:{placeholder:"输入资源ID/名称搜索",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.resourceinput,callback:function(t){e.resourceinput=t},expression:"resourceinput"}},[r("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleIconClick},slot:"append"})],1),e._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.resLoading,expression:"resLoading"}],ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.resourceTable,border:"","tooltip-effect":"dark","max-height":"400","highlight-current-row":"","row-key":e.getRowKeys},on:{"selection-change":e.handleSelectionChange}},[r("el-table-column",{attrs:{"reserve-selection":!0,type:"selection",width:"55"}}),e._v(" "),e._l(e.resourceTableConfig,function(t,i){return r("el-table-column",{key:i,attrs:{label:t.label,width:t.wh,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(i){return["id"==t.key||"paper_id"==t.key||"live_id"==t.key?[r("span",[e._v(e._s(i.row.video.id))])]:"name"==t.key?r("span",[e._v(e._s(e._f("judgeTeacher")(i.row.teacher_info)))]):"discriminator"==t.key?r("span",[e._v(e._s(e._f("Resource2chn")(i.row[t.type][t.key])))]):r("span",[e._v(e._s(i.row[t.type][t.key]))])]}}])})})],2),e._v(" "),r("el-pagination",{attrs:{"current-page":e.pagination.current_page,"page-size":50,layout:"total, prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pagination,"current_page",t)}}})],1),e._v(" "),r("div",{staticClass:"coursebtn",staticStyle:{"padding-top":"0","margin-top":"20px"},attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:e.selectResource}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var v=r("vSla")(g,f,!1,function(e){r("n9VU")},null,null);t.a=v.exports},ZiKb:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"resourceModuleVideoCreate",components:{ResourceGroupForm:r("ROGO").a}},l={render:function(){var e=this.$createElement;return(this._self._c||e)("ResourceGroupForm")},staticRenderFns:[]};var n=r("vSla")(i,l,!1,function(e){r("shgi")},null,null);t.default=n.exports},n9VU:function(e,t){},shgi:function(e,t){}});
//# sourceMappingURL=6.817e9443b4a5cf456513.js.map