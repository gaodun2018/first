webpackJsonp([7],{"+pkU":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"resourceModuleHandoutCreate",components:{HandoutForm:a("NAgi").a}},i={render:function(){var e=this.$createElement;return(this._self._c||e)("HandoutForm")},staticRenderFns:[]};var s=a("vSla")(r,i,!1,function(e){a("CHI7")},null,null);t.default=s.exports},CHI7:function(e,t){},"N/HS":function(e,t){},NAgi:function(e,t,a){"use strict";var r=a("IHPB"),i=a.n(r),s=a("lC5x"),n=a.n(s),o=a("J0Oq"),l=a.n(o),u=a("4YfN"),c=a.n(u),d=a("gR9K"),p=a("BK/k"),m=a("zSLJ"),g=a("NFfb"),f=a("SJI6"),h={components:{SelectKnowledge:d.a},props:["id"],computed:c()({},Object(f.mapState)({tagsList:function(e){return e.resources.tagsList}}),{materialUpload:function(){return Object(p.c)()+"apigateway.gaodun.com/resource-api/resource/file"}}),data:function(){return{subjectData:[],fileList:[],apiHeader:{},isUpload:!1,loading:!1,selectFalg:!1,ruleForm:{region:"",tag_id:"",title:"",fileName:"",path:"",description:""}}},methods:{getModifyData:function(){var e=this;return l()(n.a.mark(function t(){var a,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:a=t.sent,r=a.result.resource,e.ruleForm.title=r.title,e.ruleForm.description=r.description,r.tag&&r.tag.id&&0!=r.tag.id?(e.ruleForm.region=String(r.tag.id),e.ruleForm.tag_id=r.tag.children&&0!=r.tag.children.length?String(r.tag.children[0].id):"0",e.didChangeProjectSelection(r.tag.id)):(e.ruleForm.region="",e.ruleForm.tag_id=""),r.path?(e.isUpload=!0,e.ruleForm.path=r.path,e.fileList=[{name:r.title,response:{filePath:r.path}}]):e.isUpload=!1;case 8:case"end":return t.stop()}},t,e)}))()},selectknowledge:function(){this.$store.dispatch("changeDialog",!0)},resetForm:function(e){var t=this;this.$refs[e].resetFields(),setTimeout(function(){t.fileList=[]},0)},beforeAvatarUpload:function(e){var t="pdf"===e.name.substring(e.name.lastIndexOf(".")+1);return t||this.$message({message:"上传文件只能是 pdf格式!",type:"warning"}),t},handleChange:function(e,t){this.fileList=t.slice(-1)},handleRemove:function(e,t){0==t.length&&(this.isUpload=!1),this.fileList=t},handleAvatarError:function(e,t,a){var r=this;this.$message.error("上传失败！"),setTimeout(function(){r.fileList=[]},0)},uploadSuccess:function(e,t){var a=this;0===e.status?(this.isUpload=!0,this.$message({message:"文件上传成功",type:"success"}),this.ruleForm.path=e.result.path):(this.isUpload=!1,setTimeout(function(){a.fileList=[]},0),this.ruleForm.path="",this.$message({message:"文件上传失败",type:"warning"}))},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.tagsList.forEach(function(a){if(a.id==e){var r=[].concat(i()(a.children));t.subjectData=r,t.selectFalg&&(t.ruleForm.tag_id="0")}})},saveLecturenote:function(){var e=this;return l()(n.a.mark(function t(){var a,r,i,s,o,l,u,c,d;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.ruleForm,r=a.tag_id,i=a.title,s=a.file,o=a.path,l=a.description,u=a.region,c={tag_id:"0"==r?u:r,title:i,description:l,file:s,path:o},e.loading=!0,t.next=5,e.$http.saveLecturenote(c);case 5:d=t.sent,e.loading=!1,e.isUpload=!1,0==d.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/handout/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 9:case"end":return t.stop()}},t,e)}))()},saveMidfyLecturenote:function(){var e=this;return l()(n.a.mark(function t(){var a,r,i,s,o,l,u,c;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a=e.ruleForm,r=a.tag_id,i=a.title,a.file,s=a.path,o=a.description,l=a.region,u={tag_id:"0"==r?l:r,_method:"PUT",title:i,description:o,path:s},e.loading=!0,t.next=5,e.$http.saveMidfyLecturenote(e.$route.params.id,u);case 5:c=t.sent,e.loading=!1,0==c.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/handout/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 8:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){if(!t.isUpload)return void t.$message({message:"需上传文件才能保存",type:"warning"});var a=t.$route.params.id;t.loading=!0,a?t.saveMidfyLecturenote():t.saveLecturenote()}})}},mounted:function(){},created:function(){var e=this;return l()(n.a.mark(function t(){var a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,a="Basic "+Object(m.a)(g.j),e.apiHeader={Authentication:a},e.id=e.$route.params.id,t.next=6,e.$store.dispatch("getTagsList","project");case 6:if(!e.$route.params.id){t.next=9;break}return t.next=9,e.getModifyData();case 9:e.loading=!1;case 10:case"end":return t.stop()}},t,e)}))()}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-clues-content add-resource"},[a("div",{staticClass:"outlineeat"},[e._v("\n    "+e._s(e.id?"编辑讲义":"新增讲义")+"\n  ")]),e._v(" "),a("div",{staticClass:"frombox"},[a("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"100px","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[a("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"region",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}},e._l(e.tagsList,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),a("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"tag_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[a("el-select",{attrs:{placeholder:"请选择所属科目",filterable:""},model:{value:e.ruleForm.tag_id,callback:function(t){e.$set(e.ruleForm,"tag_id",t)},expression:"ruleForm.tag_id"}},[a("el-option",{attrs:{label:"不限科目",value:"0"}}),e._v(" "),e._l(e.subjectData,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:String(e.id)}})})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"讲义名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[a("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写讲义名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"讲义描述"}},[a("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写讲义描述","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"文件名"}},[a("el-upload",{ref:"onUpload",attrs:{headers:e.apiHeader,"file-list":e.fileList,drag:"","on-success":e.uploadSuccess,"on-change":e.handleChange,"on-remove":e.handleRemove,"on-error":e.handleAvatarError,"before-upload":e.beforeAvatarUpload,action:e.materialUpload}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或\n            "),a("em",[e._v("点击上传")])]),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("目前仅支持.pdf文件哦！")])])],1),e._v(" "),a("el-form-item",{staticStyle:{"text-align":"right"}},[a("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]};var _=a("vSla")(h,v,!1,function(e){a("N/HS")},null,null);t.a=_.exports}});
//# sourceMappingURL=7.0b519fc743ad9426f045.js.map