webpackJsonp([14],{lYeS:function(e,t){},oDjQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("HzJ8"),r=a.n(n),s=a("lC5x"),l=a.n(s),i=a("J0Oq"),c=a.n(i),o=(a("lRwf"),a("xJrl")),u=a("yt7g"),d={components:{vUpload:a("G00f").a},data:function(){return{radio:"全部",radio2:"全部",keywords:"",clver:"0",clversm:"0",resource:{resources:[],pagination:{total:0,current_page:1}},tags:[],currentPage:1,paginationTotal:0,pageSize:50,loading:!1,videoList:[],uploaddialogVisible:!1}},computed:{uploadUrl:function(){return"calais/resource/v1/lecture-note/batch"}},methods:{uploadSuccessCallback:function(){this.loadResources(),this.uploaddialogVisible=!1},handleIconClick:function(){this.loadResources()},onRemove:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.removeLecturenote(e.id).then(function(e){0==e.status?(t.$message({type:"success",message:"删除成功"}),t.loadResources()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},outlinechange:function(e){this.clver=e,this.clversm="0",this.loadResources()},mulchange:function(e){this.clversm=e,this.loadResources()},fetchResources:function(){var e=this;return c()(l.a.mark(function t(){var a,n;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page_size:e.pageSize,page:e.currentPage,keywords:e.keywords,discriminator:"lecture_note"},"0"!=e.clver&&(a.tag_id=e.clver),"0"!=e.clversm&&(a.tag_id=e.clversm),t.next=5,Object(o.getResource)(a);case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,e)}))()},loadResources:function(){var e=this;return c()(l.a.mark(function t(){var a,n,s,i,c,o,d,p;return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.fetchResources();case 3:for(a=t.sent,n=a.result,s=!0,i=!1,c=void 0,t.prev=8,o=r()(n.resources);!(s=(d=o.next()).done);s=!0)(p=d.value).created_at=new Date(1e3*p.created_at),p.updated_at=Object(u.g)(new Date(1e3*p.updated_at)),p.project_name=null==p.tag?"":p.tag.name;t.next=16;break;case 12:t.prev=12,t.t0=t.catch(8),i=!0,c=t.t0;case 16:t.prev=16,t.prev=17,!s&&o.return&&o.return();case 19:if(t.prev=19,!i){t.next=22;break}throw c;case 22:return t.finish(19);case 23:return t.finish(16);case 24:e.resource=n,e.paginationTotal=e.resource.pagination.total,e.loading=!1;case 27:case"end":return t.stop()}},t,e,[[8,12,16,24],[17,,19,23]])}))()},didChangePage:function(e){var t=this;return c()(l.a.mark(function a(){return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.currentPage=e,t.loadResources();case 2:case"end":return a.stop()}},a,t)}))()},didChangePageSize:function(e){this.pageSize=e,this.loadResources()}},created:function(){var e=this;return c()(l.a.mark(function t(){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(o.getTags)("project");case 2:return e.tags=t.sent.result,t.next=5,e.loadResources();case 5:case"end":return t.stop()}},t,e)}))()}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-clues-content order-manage"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",[a("el-col",{attrs:{sm:24}},[a("div",{staticClass:"button_group_t"},[a("span",[e._v(" 项 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clver||0===e.clver?"current":""],on:{click:function(t){e.outlinechange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tags,function(t,n){return[a("span",{key:n,staticClass:"clitem",class:[t.id===e.clver?"current":""],on:{click:function(a){e.outlinechange(t.id)}}},[e._v(e._s(t.name))])]})],2),e._v(" "),a("div",{staticClass:"button_group_b"},[a("span",[e._v(" 科 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clversm||0===e.clversm?"current":""],on:{click:function(t){e.mulchange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tags,function(t){return"0"!=e.clver?[e._l(t.children,function(n,r){return parseInt(e.clver)==t.id?[a("span",{key:r,staticClass:"clitem",class:[n.id===e.clversm?"current":""],on:{click:function(t){e.mulchange(n.id)}}},[e._v(e._s(n.name))])]:e._e()})]:e._e()})],2)])],1),e._v(" "),a("el-row",[a("el-col",{attrs:{sm:24}},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("div",{staticClass:"input-search"},[a("el-input",{attrs:{placeholder:"讲义ID／讲义名称",size:"small"},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("HANDOUT_CREATE")?a("router-link",{staticClass:"routerBtn",attrs:{to:"/resource/handout/create"}},[e._v("+ 新增讲义\n                        ")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.uploaddialogVisible=!0}}},[e._v("+ 批量导入讲义资源\n                        ")])],1)])],1)],1)],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.resource.resources}},[a("el-table-column",{attrs:{prop:"id",label:"讲义ID","min-width":"100",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"讲义名称","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"project_name",label:"项目","min-width":"110"}}),e._v(" "),a("el-table-column",{attrs:{prop:"extension",label:"类型","min-width":"110"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"creator.username",label:"操作员","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("HANDOUT_EDIT")?a("router-link",{staticStyle:{margin:"0 6px"},attrs:{to:{path:"/resource/handout/edit/"+t.row.id}}},[e._v("修改\n                    ")]):e._e(),e._v(" "),e.unlocking("HANDOUT_DELETE")?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.onRemove(t.row)}}},[e._v("删除\n                    ")]):e._e()]}}])})],1),e._v(" "),a("div",{staticClass:"clues-pagination"},[a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"page-sizes":[50,200,300,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginationTotal},on:{"size-change":e.didChangePageSize,"current-change":e.didChangePage}})],1),e._v(" "),a("el-row",[a("v-upload",{attrs:{"b-visible":e.uploaddialogVisible,title:"批量导入讲义资源","url-title":"批量讲义资源Excel模板下载","download-url":"//simg01.gaodunwangxiao.com/lecture_notes_template.xlsx","upload-url":e.uploadUrl,name:"file",fileTypes:["xlsx"]},on:{uploadSuccessCallback:e.uploadSuccessCallback,handleCloesDialog:function(t){e.uploaddialogVisible=!1}}})],1)],1)])},staticRenderFns:[]};var v=a("Z0/y")(d,p,!1,function(e){a("lYeS")},null,null);t.default=v.exports}});
//# sourceMappingURL=14.c114b36eb57407b89785.js.map