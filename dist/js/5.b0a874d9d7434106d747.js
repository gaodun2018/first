webpackJsonp([5],{"+pkU":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={name:"resourceModuleHandoutCreate",components:{HandoutForm:r("NAgi").a}},i={render:function(){var e=this.$createElement;return(this._self._c||e)("HandoutForm")},staticRenderFns:[]};var s=r("Z0/y")(a,i,!1,function(e){r("lGhX")},null,null);t.default=s.exports},NAgi:function(e,t,r){"use strict";var a=r("IHPB"),i=r.n(a),s=r("lC5x"),n=r.n(s),o=r("J0Oq"),l=r.n(o),u=r("gR9K"),c=r("BK/k"),d=r("zSLJ"),p=r("NFfb"),m={components:{SelectKnowledge:u.a},props:["id"],computed:{materialUpload:function(){return Object(c.c)()+"apigateway.gaodun.com/resource-api/resource/file"}},data:function(){return{tags:[],subjectData:[],fileList:[],apiHeader:{},isUpload:!1,loading:!1,selectFalg:!1,ruleForm:{region:"",tag_id:"",title:"",fileName:"",path:"",description:""}}},methods:{initTags:function(){var e=this;return l()(n.a.mark(function t(){var r,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getTags("project");case 2:r=t.sent,(a=r.result).forEach(function(e){e.children&&e.children.unshift({id:"0",name:"不限科目"})}),e.tags=a;case 6:case"end":return t.stop()}},t,e)}))()},getModifyData:function(){var e=this;return l()(n.a.mark(function t(){var r,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:r=t.sent,a=r.result.resource,e.ruleForm.title=a.title,e.ruleForm.description=a.description,a.tag&&a.tag.id&&0!=a.tag.id?(e.ruleForm.region=String(a.tag.id),e.ruleForm.tag_id=a.tag.children&&0!=a.tag.children.length?String(a.tag.children[0].id):"0",e.didChangeProjectSelection(a.tag.id)):(e.ruleForm.region="",e.ruleForm.tag_id=""),a.path?(e.isUpload=!0,e.ruleForm.path=a.path,e.fileList=[{name:a.title,response:{filePath:a.path}}]):e.isUpload=!1;case 8:case"end":return t.stop()}},t,e)}))()},selectknowledge:function(){this.$store.dispatch("changeDialog",!0)},resetForm:function(e){var t=this;this.$refs[e].resetFields(),setTimeout(function(){t.fileList=[]},0)},beforeAvatarUpload:function(e){var t="pdf"===e.name.substring(e.name.lastIndexOf(".")+1);return t||this.$message({message:"上传文件只能是 pdf格式!",type:"warning"}),t},handleChange:function(e,t){this.fileList=t.slice(-1)},handleRemove:function(e,t){0==t.length&&(this.isUpload=!1),this.fileList=t},handleAvatarError:function(e,t,r){var a=this;this.$message.error("上传失败！"),setTimeout(function(){a.fileList=[]},0)},uploadSuccess:function(e,t){var r=this;0===e.status?(this.isUpload=!0,this.$message({message:"文件上传成功",type:"success"}),this.ruleForm.path=e.result.path):(this.isUpload=!1,setTimeout(function(){r.fileList=[]},0),this.ruleForm.path="",this.$message({message:"文件上传失败",type:"warning"}))},visibleChange:function(e){this.selectFalg=e},didChangeProjectSelection:function(e){var t=this;this.tags.forEach(function(r){if(r.id==e){var a=[].concat(i()(r.children));t.subjectData=a,t.selectFalg&&(t.ruleForm.tag_id="0")}})},saveLecturenote:function(){var e=this;return l()(n.a.mark(function t(){var r,a,i,s,o,l,u,c,d;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.ruleForm,a=r.tag_id,i=r.title,s=r.file,o=r.path,l=r.description,u=r.region,c={tag_id:"0"==a?u:a,title:i,description:l,file:s,path:o},e.loading=!0,t.next=5,e.$http.saveLecturenote(c);case 5:d=t.sent,e.loading=!1,e.isUpload=!1,0==d.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/handout/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 9:case"end":return t.stop()}},t,e)}))()},saveMidfyLecturenote:function(){var e=this;return l()(n.a.mark(function t(){var r,a,i,s,o,l,u,c;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=e.ruleForm,a=r.tag_id,i=r.title,r.file,s=r.path,o=r.description,l=r.region,u={tag_id:"0"==a?l:a,_method:"PUT",title:i,description:o,path:s},e.loading=!0,t.next=5,e.$http.saveMidfyLecturenote(e.$route.params.id,u);case 5:c=t.sent,e.loading=!1,0==c.status?(e.$message({message:"保存成功",type:"success"}),setTimeout(function(){e.$router.push({path:"/resource/handout/list"})},1e3)):e.$message({message:"保存失败",type:"error"});case 8:case"end":return t.stop()}},t,e)}))()},submitForm:function(e){var t=this;this.$refs[e].validate(function(e){if(e){if(!t.isUpload)return void t.$message({message:"需上传文件才能保存",type:"warning"});var r=t.$route.params.id;t.loading=!0,r?t.saveMidfyLecturenote():t.saveLecturenote()}})}},mounted:function(){},created:function(){var e=this;return l()(n.a.mark(function t(){var r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,r="Basic "+Object(d.a)(p.j),e.apiHeader={Authentication:r},e.id=e.$route.params.id,t.next=6,e.initTags();case 6:if(!e.$route.params.id){t.next=9;break}return t.next=9,e.getModifyData();case 9:e.loading=!1;case 10:case"end":return t.stop()}},t,e)}))()}},f={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource"},[r("div",{staticClass:"outlineeat"},[e._v("\n        "+e._s(e.id?"编辑讲义":"新增讲义")+"\n    ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"label-width":"100px"}},[r("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"region",rules:[{required:!0,message:"请选择所属项目",trigger:"change"}]}},[r("el-select",{attrs:{filterable:"",placeholder:"请选择所属项目"},on:{change:e.didChangeProjectSelection,"visible-change":e.visibleChange},model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}},e._l(e.tags,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"tag_id",rules:[{required:!0,message:"请选择所属科目",trigger:"change"}]}},[r("el-select",{attrs:{placeholder:"请选择所属科目",filterable:""},model:{value:e.ruleForm.tag_id,callback:function(t){e.$set(e.ruleForm,"tag_id",t)},expression:"ruleForm.tag_id"}},e._l(e.subjectData,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:String(e.id)}})}))],1),e._v(" "),r("el-form-item",{attrs:{label:"讲义名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:60})}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写讲义名称","auto-complete":"off"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"讲义描述"}},[r("el-input",{staticClass:"w_50",attrs:{placeholder:"请填写讲义描述","auto-complete":"off"},model:{value:e.ruleForm.description,callback:function(t){e.$set(e.ruleForm,"description",t)},expression:"ruleForm.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"文件名"}},[r("el-upload",{ref:"onUpload",attrs:{headers:e.apiHeader,"file-list":e.fileList,drag:"","on-success":e.uploadSuccess,"on-change":e.handleChange,"on-remove":e.handleRemove,"on-error":e.handleAvatarError,"before-upload":e.beforeAvatarUpload,action:e.materialUpload}},[r("i",{staticClass:"el-icon-upload"}),e._v(" "),r("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或\n                        "),r("em",[e._v("点击上传")])]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("目前仅支持.pdf文件哦！")])])],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]};var g=r("Z0/y")(m,f,!1,function(e){r("Nfs+")},null,null);t.a=g.exports},"Nfs+":function(e,t){},lGhX:function(e,t){}});
//# sourceMappingURL=5.b0a874d9d7434106d747.js.map