webpackJsonp([5],{"+pFi":function(e,t){},"/BTQ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("HzJ8"),s=a.n(n),i=a("lC5x"),r=a.n(i),o=a("J0Oq"),l=a.n(o),c=a("yt7g"),u={components:{vUpload:a("G00f").a},data:function(){return{radio:"全部",radio2:"全部",input2:"",keywords:"",resource:{resources:[],pagination:{total:0,current_page:1}},clver:"0",clversm:"0",tags:[],currentPage:1,paginationTotal:0,pageSize:50,loading:!1,bVisible:!1}},methods:{outlinechange:function(e){this.clver=e,this.clversm="0",this.loadResources()},mulchange:function(e){this.clversm=e,this.loadResources()},onRemove:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.removeLecturenote(e.id).then(function(e){0==e.status?(t.$message({type:"success",message:"删除成功"}),t.loadResources()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},didClickEdit:function(e){console.log("navigate to edit video "+e.row.id),this.$router.push({name:"editVideo",params:{id:e.row.id}})},fetchResources:function(){var e=this;return l()(r.a.mark(function t(){var a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page_size:e.pageSize,page:e.currentPage,discriminator:"video",keywords:e.keywords},"0"!=e.clver&&(a.tag_id=e.clver),"0"!=e.clversm&&(a.tag_id=e.clversm),t.next=5,e.$http.getResource(a);case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,e)}))()},loadResources:function(){var e=this;return l()(r.a.mark(function t(){var a,n,i,o,l,u,d,p,v;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.fetchResources();case 3:for(a=t.sent,n=a.result,i=!0,o=!1,l=void 0,t.prev=8,u=s()(n.resources);!(i=(d=u.next()).done);i=!0)(p=d.value).created_at=new Date(1e3*p.created_at),p.updated_at=Object(c.g)(new Date(1e3*p.updated_at)),p.project_name=null==p.tag?"":p.tag.name;t.next=16;break;case 12:t.prev=12,t.t0=t.catch(8),o=!0,l=t.t0;case 16:t.prev=16,t.prev=17,!i&&u.return&&u.return();case 19:if(t.prev=19,!o){t.next=22;break}throw l;case 22:return t.finish(19);case 23:return t.finish(16);case 24:e.resource=n,v=e.resource.pagination.total,e.paginationTotal=v,e.loading=!1;case 28:case"end":return t.stop()}},t,e,[[8,12,16,24],[17,,19,23]])}))()},didChangePage:function(e){var t=this;return l()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.currentPage=e,t.loadResources();case 2:case"end":return a.stop()}},a,t)}))()},didChangePageSize:function(e){this.pageSize=e,this.loadResources()},handleIconClick:function(){this.clver="0",this.clversm="0",this.loadResources()}},created:function(){var e=this;return l()(r.a.mark(function t(){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getTags("project");case 2:return e.tags=t.sent.result,t.next=5,e.loadResources();case 5:case"end":return t.stop()}},t,e)}))()}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-clues-content order-manage"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",[a("el-col",{attrs:{sm:24}},[a("div",{staticClass:"button_group_t"},[a("span",[e._v(" 项 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clver||0===e.clver?"current":""],on:{click:function(t){e.outlinechange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tags,function(t,n){return a("span",{key:n,staticClass:"clitem",class:[t.id===e.clver?"current":""],on:{click:function(a){e.outlinechange(t.id)}}},[e._v(e._s(t.name)+"\n                    ")])})],2),e._v(" "),a("div",{staticClass:"button_group_b"},[a("span",[e._v(" 科 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clversm||0===e.clversm?"current":""],on:{click:function(t){e.mulchange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tags,function(t){return"0"!=e.clver?[e._l(t.children,function(n){return parseInt(e.clver)==t.id?[a("span",{key:n.id,staticClass:"clitem",class:[n.id===e.clversm?"current":""],on:{click:function(t){e.mulchange(n.id)}}},[e._v(e._s(n.name))])]:e._e()})]:e._e()})],2)])],1),e._v(" "),a("el-row",{attrs:{type:"flex",align:"bottom"}},[a("el-col",{attrs:{sm:6}},[a("el-row",[a("div",{staticClass:"select-search"})])],1),e._v(" "),a("el-col",{attrs:{sm:18}},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("div",{staticClass:"input-search"},[a("el-input",{attrs:{placeholder:"视频ID／视频名称",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("VIDEO_CREATE")?a("router-link",{staticClass:"routerBtn",attrs:{to:"/resource/video/create"}},[e._v("+ 新增视频\n                        ")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.bVisible=!0}}},[e._v("+ 批量导入视频资源\n                        ")])],1)])],1)],1)],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",staticStyle:{width:"100%"},attrs:{border:"",data:e.resource.resources}},[a("el-table-column",{attrs:{prop:"id",label:"视频id","min-width":"100",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"视频名称","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{label:"时长","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(t.row.duration_minutes>10?t.row.duration_minutes:"0"+t.row.duration_minutes)+"分 "+e._s(t.row.duration_seconds>10?t.row.duration_seconds:"0"+t.row.duration_seconds)+"秒\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"project_name",label:"项目","min-width":"115"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"creator.username",label:"操作员","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("VIDEO_PREVIEW")?a("router-link",{staticClass:"el-button el-button--text",attrs:{to:{name:"previewVideo",params:{id:t.row.id}},tag:"a",target:"_blank"}},[e._v("预览")]):e._e(),e._v(" "),e.unlocking("VIDEO_EDIT")?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.didClickEdit(t)}}},[e._v("修改\n                    ")]):e._e(),e._v(" "),e.unlocking("VIDEO_DELETE")?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.onRemove(t.row)}}},[e._v("删除\n                    ")]):e._e()]}}])})],1)],1),e._v(" "),a("el-row",{attrs:{type:"flex",align:"center"}},[a("el-col",{attrs:{sm:24}},[a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"page-sizes":[50,200,300,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginationTotal},on:{"size-change":e.didChangePageSize,"current-change":e.didChangePage}})],1)],1),e._v(" "),a("el-row",[a("v-upload",{attrs:{"file-types":["zip","rar","js"],title:"批量导入视频资源","b-visible":e.bVisible,"url-title":"视频导入Excel模板",url:"www","upload-url":"asas"},on:{handleCloesDialog:function(t){e.bVisible=!1}}})],1)],1)},staticRenderFns:[]};var p=a("Z0/y")(u,d,!1,function(e){a("+pFi")},null,null);t.default=p.exports},G00f:function(e,t,a){"use strict";var n=a("BK/k"),s=a("NFfb"),i=a("zSLJ"),r={components:{},props:{title:{default:"批量导入"},urlTitle:{default:""},downloadUrl:{default:""},bVisible:{default:!1},uploadUrl:{required:!0,default:""},fileTypes:{default:function(){return[]}},uploadData:{default:function(){}},name:{default:"name"}},data:function(){return{apiHeader:{},centerDialogVisible:!0,fileList:[],loading:!1}},computed:{materialUpload:function(){return Object(n.c)()+"apigateway.gaodun.com/"+this.uploadUrl},dialogUploadVisible:{get:function(){return this.bVisible},set:function(){this.$emit("handleCloesDialog")}}},methods:{beforeAvatarUpload:function(e){if(0===this.fileTypes.length)return!0;var t=e.name.substring(e.name.lastIndexOf(".")+1),a=this.fileTypes.indexOf(t)>-1;return a||this.$message({message:"上传文件只能是"+this.fileTypes.join("、")+"格式!",type:"warning"}),a},handleChange:function(e,t){this.fileList=t.slice(-1)},handleRemove:function(e,t){this.fileList=t},handleProgress:function(){this.loading=!0},handleAvatarSuccess:function(e,t){var a=this;this.loading=!1,0==e.status?(this.$message({type:"success",message:"上传成功！"}),this.$emit("uploadSuccessCallback")):(this.$message({type:"error",message:"上传失败："+e.message,showClose:!0,duration:5e3}),setTimeout(function(){a.fileList=[]},0))},handleAvatarError:function(e,t,a){var n=this;this.$message({type:"error",message:"上传失败："+e,showClose:!0,duration:5e3}),this.loading=!1,setTimeout(function(){n.fileList=[]},0)}},mounted:function(){},destroyed:function(){},created:function(){var e="Basic "+Object(i.a)(s.j);this.apiHeader={Authentication:e}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"BatchFilesUpload",attrs:{title:e.title,width:"640px",center:"",visible:e.dialogUploadVisible},on:{"update:visible":function(t){e.dialogUploadVisible=t}}},[a("el-row",[a("el-upload",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"upload-demo",attrs:{drag:"",action:e.materialUpload,"on-change":e.handleChange,"on-remove":e.handleRemove,"on-success":e.handleAvatarSuccess,"on-error":e.handleAvatarError,"on-progress":e.handleProgress,headers:e.apiHeader,"before-upload":e.beforeAvatarUpload,"file-list":e.fileList,data:e.uploadData,name:e.name,"element-loading-text":"正在上传中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(255, 255, 255, 0.8)"}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),a("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或\n                "),a("em",[e._v("点击上传")])]),e._v(" "),0!=e.fileTypes.length?a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传"+e._s(e.fileTypes.join(" / "))+"文件")]):e._e()])],1),e._v(" "),a("el-row",[e.urlTitle&&e.downloadUrl?a("a",{staticClass:"mould-download-btn",attrs:{href:e.downloadUrl,download:"download"}},[e._v(e._s(e.urlTitle))]):e._e()]),e._v(" "),a("el-row",{staticClass:"upload-tips"},[a("span",[e._v("提示：若模板Excel导入失败，请新建文件，将模板中内容复制到新文件中，再次尝试。"),a("br"),e._v("请将.excel文件转程.csv文件上传")])])],1)},staticRenderFns:[]};var l=a("Z0/y")(r,o,!1,function(e){a("qucd")},null,null);t.a=l.exports},qucd:function(e,t){}});
//# sourceMappingURL=5.1df440af7c4d9c73d628.js.map