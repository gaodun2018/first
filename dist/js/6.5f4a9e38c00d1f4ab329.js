webpackJsonp([6],{"4o2E":function(e,t){},NA95:function(e,t){},NXhn:function(e,t){},xY0B:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("lC5x"),n=a.n(i),s=a("J0Oq"),l=a.n(s),r=a("BK/k"),o=a("NFfb"),u=a("zSLJ"),d={components:{},props:{uploadUrl:{required:!0,default:""},fileTypes:{type:Array,default:function(){return[]}},uploadData:{default:void 0},name:{default:"name"},maxFileSize:{type:Number,default:0},drag:{type:Boolean,default:!1},showFileLit:{type:Boolean,default:!1},showUploadImage:{type:Boolean,default:!1},uploadedImageUrl:{type:String}},data:function(){return{apiHeader:{},centerDialogVisible:!0,fileList:[],loading:!1,imageUrl:""}},computed:{materialUpload:function(){return Object(r.c)()+"apigateway.gaodun.com/"+this.uploadUrl}},methods:{beforeAvatarUpload:function(e){var t=this.maxFileSize;if(0===this.fileTypes.length&&0===this.maxFileSize)return!0;var a=e.name.substring(e.name.lastIndexOf(".")+1),i=0===this.fileTypes.length||this.fileTypes.indexOf(a)>-1,n=!t||e.size/1024/1024<t;return i||this.$message({message:"上传文件只能是"+this.fileTypes.join("、")+"格式!",type:"warning"}),n||this.$message({message:"上传文件大小不能超过 "+t+"MB!",type:"warning"}),i&&n},handleChange:function(e,t){this.fileList=t.slice(-1)},handleRemove:function(e,t){this.fileList=t},handleProgress:function(){this.loading=!0},handleAvatarSuccess:function(e,t){var a=this;this.loading=!1,0==e.status?(this.$message({type:"success",message:"上传成功！"}),this.imageUrl=URL.createObjectURL(t.raw),this.$emit("uploadSuccessCallback",t)):(this.$message({type:"error",message:"上传失败："+e.message,showClose:!0,duration:5e3}),setTimeout(function(){a.fileList=[]},0))},handleAvatarError:function(e,t,a){var i=this;this.$message({type:"error",message:"上传失败："+e,showClose:!0,duration:5e3}),this.loading=!1,setTimeout(function(){i.fileList=[]},0)}},mounted:function(){},destroyed:function(){},created:function(){var e="Basic "+Object(u.a)(o.j);this.apiHeader={Authentication:e}},watch:{uploadedImageUrl:{handler:function(e,t){this.imageUrl=e},immediate:!0}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"avatar-uploader",attrs:{drag:e.drag,"show-file-list":e.showFileLit,action:e.materialUpload,"on-change":e.handleChange,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"on-error":e.handleAvatarError,"on-progress":e.handleProgress,headers:e.apiHeader,"before-upload":e.beforeAvatarUpload,"file-list":e.fileList,data:e.uploadData,name:e.name,"element-loading-text":"正在上传中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[e.showUploadImage&&!e.drag?[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})]:e._e(),e._v(" "),e.drag&&!e.showUploadImage?[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或\n      "),a("em",[e._v("点击上传")])])]:e._e(),e._v(" "),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[0!=e.fileTypes.length?a("span",[e._v("只能上传"+e._s(e.fileTypes.join(" / "))+"文件")]):e._e(),e._v(" "),e.maxFileSize?a("span",[e._v("，且不超过"+e._s(e.maxFileSize)+"MB")]):e._e()])],2)},staticRenderFns:[]};var p={components:{vUpload:a("Z0/y")(d,c,!1,function(e){a("4o2E")},null,null).exports},data:function(){return{data:[],dialogVisible:!1,ruleForm:{id:"",path:"",title:""},btnLoading:!1,uploadUrl:"caen/v1/backend/image/upload",currentPage:1,eduTotal:1}},computed:{},methods:{setMaxHeight:function(){return(document.body.offsetHeight||document.documentElement.offsetHeight)-200+"px"},uploadSuccessCallback:function(e){console.log("12312312313123213132",e),this.ruleForm.path=e.response.result},validateForm:function(e){var t=this;this.ruleForm.path?this.$refs[e].validate(function(e){if(!e)return!1;t.saveWXImage()}):this.$message({message:"请上传图片～～"})},saveWXImage:function(){var e=this;return l()(n.a.mark(function t(){var a,i,s,l,r,o;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e,a=e.ruleForm,i=a.id,s=a.path,l=a.title,r={path:s,title:l},i&&(r.id=i),e.btnLoading=!0,t.next=7,e.$http.saveWXImage(r);case 7:o=t.sent,console.log(o),e.btnLoading=!1,0===o.status?(e.dialogVisible=!1,e.$message({type:"success",message:"保存成功"}),e.loadPictureList()):e.$message({message:"保存失败"});case 11:case"end":return t.stop()}},t,e)}))()},loadPictureList:function(){var e=this;return l()(n.a.mark(function t(){var a,i;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page:e.currentPage,page_size:20},t.next=3,e.$http.getWXImageList(a);case 3:0===(i=t.sent).status&&(e.data=i.result.item_list,e.eduTotal=i.result.all_item_count);case 5:case"end":return t.stop()}},t,e)}))()},handleClickPreview:function(e){var t=e.path;/^\/\/simg/.test(t)?window.open(e.path):this.$message({type:"warning",message:"图片网络路径异常："+t})},handleClickDelete:function(e){var t=this;return l()(n.a.mark(function a(){var i,s;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(t,i=e.id){a.next=5;break}return alert("ID不存在"),a.abrupt("return");case 5:return s={id:i},a.next=8,t.$http.deleteWXImageList(s);case 8:0===a.sent.status?(t.$message({type:"warning",message:"删除成功"}),t.loadPictureList()):t.$message({type:"warning",message:"删除失败"});case 10:case"end":return a.stop()}},a,t)}))()},handleCurrentChange:function(e){this.loadPictureList()},handleEditCurrentItem:function(e){e.id,e.path,e.title;for(var t in e)this.ruleForm[t]=e[t];this.dialogVisible=!0}},watch:{$route:["setMaxHeight"]},mounted:function(){},created:function(){this.tableHeight(this),this.loadPictureList()}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-edu-content picture-manage"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",{attrs:{type:"flex",align:"bottom"}},[a("el-col",{attrs:{sm:24}},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("div",{staticClass:"input-search"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("新增一张日签图\n            ")])],1)])],1)],1)],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{border:"",data:e.data,"max-height":e.setMaxHeight()}},[a("el-table-column",{attrs:{prop:"id",label:"id",width:"80",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"名称","min-width":"260"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"240",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text","data-url":t.row.path},on:{click:function(a){e.handleClickPreview(t.row)}}},[e._v("\n            预览\n          ")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){e.handleEditCurrentItem(t.row)}}},[e._v("\n            修改\n          ")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){e.handleClickDelete(t.row)}}},[e._v("\n            删除\n          ")])]}}])})],1),e._v(" "),a("div",{staticClass:"edu-pagination"},[a("el-pagination",{attrs:{background:"","current-page":e.currentPage,"page-size":20,layout:"total, prev, pager, next, jumper",total:e.eduTotal},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑日签图",center:"",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{ref:"ruleForm",attrs:{model:e.ruleForm,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"名称",prop:"title",rules:e.filter_rules({required:!0,type:"isAllSpace",max:50})}},[a("el-input",{attrs:{placeholder:"请输入名称"},model:{value:e.ruleForm.title,callback:function(t){e.$set(e.ruleForm,"title",t)},expression:"ruleForm.title"}})],1)],1),e._v(" "),a("div",{staticClass:"upload-item"},[a("div",[a("span",[e._v("上传文件")])]),e._v(" "),a("div",[a("v-upload",{attrs:{"upload-url":e.uploadUrl,"file-types":["png","jpg"],name:"file","max-file-size":2,"show-upload-image":!0,"uploaded-image-url":e.ruleForm.path},on:{uploadSuccessCallback:e.uploadSuccessCallback}})],1)]),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.validateForm("ruleForm")}}},[e._v("\n        "+e._s(e.btnLoading?"保存中":"确定")+"\n      ")])],1)],1)],1)},staticRenderFns:[]};var g=a("Z0/y")(p,m,!1,function(e){a("NXhn"),a("NA95")},"data-v-ce252d58",null);t.default=g.exports}});
//# sourceMappingURL=6.5f4a9e38c00d1f4ab329.js.map