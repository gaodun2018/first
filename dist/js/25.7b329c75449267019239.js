webpackJsonp([25],{IAWm:function(e,t){},oDjQ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("BO1k"),n=a.n(s),r=a("Xxa5"),i=a.n(r),o=a("exGp"),l=a.n(o),c=a("Dd8w"),u=a.n(c),d=(a("lRwf"),a("yt7g")),g=a("G00f"),p=a("BK/k"),v=a("SJI6"),h=a("1E94"),f={components:{vUpload:g.a,logDialog:h.a},data:function(){return{docUrl:p.d,logList:[],logVisiable:!1,logTotal:0,page:1,sourceId:0,radio:"全部",radio2:"全部",keywords:"",clver:"0",clversm:"0",resource:{resources:[],pagination:{total:0,current_page:1}},currentPage:1,paginationTotal:0,pageSize:50,loading:!1,videoList:[],uploaddialogVisible:!1,isBtnDisabled:!1}},computed:u()({},Object(v.mapState)({tagsList:function(e){return e.resources.tagsList}}),{uploadUrl:function(){return"calais/resource/v1/lecture-note/batch"}}),methods:{toShow:function(e){this.sourceId=e,this.logVisiable=!0,this.getLogList()},handleChangePage:function(e){this.page=e,this.getlogList()},toClose:function(){this.logVisiable=!1},getLogList:function(){var e=this;return l()(i.a.mark(function t(){var a,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={log_type:3,page_num:e.page,page_size:50,source_id:e.sourceId?e.sourceId:""},t.next=3,e.$http.getLogsList(a);case 3:0==(s=t.sent).code?(e.logTotal=s.result.total,e.logList=s.result.data):e.$message({message:"获取日志失败",type:"warning"});case 5:case"end":return t.stop()}},t,e)}))()},uploadSuccessCallback:function(){this.loadResources(),this.uploaddialogVisible=!1},handleIconClick:function(){this.loadResources()},onRemove:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.removeResource(e.id).then(function(e){0==e.status?(t.$message({type:"success",message:"删除成功"}),t.loadResources()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},outlinechange:function(e){this.clver=e,this.clversm="0",this.loadResources()},mulchange:function(e){this.clversm=e,this.loadResources()},fetchResources:function(){var e=this;return l()(i.a.mark(function t(){var a,s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page_size:e.pageSize,page:e.currentPage,keywords:e.keywords,discriminator:"lecture_note"},"0"!=e.clver&&(a.tag_id=e.clver),"0"!=e.clversm&&(a.tag_id=e.clversm),t.next=5,e.$http.getResource(a);case 5:return s=t.sent,t.abrupt("return",s);case 7:case"end":return t.stop()}},t,e)}))()},loadResources:function(){var e=this;return l()(i.a.mark(function t(){var a,s,r,o,l,c,u,g;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.fetchResources();case 3:if(0!==(a=t.sent).status){t.next=36;break}for(e.isBtnDisabled=!1,s=a.result,t.prev=7,r=!0,o=!1,l=void 0,t.prev=11,c=n()(s.resources);!(r=(u=c.next()).done);r=!0)(g=u.value).created_at=new Date(1e3*g.created_at),g.updated_at=Object(d.g)(new Date(1e3*g.updated_at)),g.project_name=null==g.tag?"":g.tag.name;t.next=19;break;case 15:t.prev=15,t.t0=t.catch(11),o=!0,l=t.t0;case 19:t.prev=19,t.prev=20,!r&&c.return&&c.return();case 22:if(t.prev=22,!o){t.next=25;break}throw l;case 25:return t.finish(22);case 26:return t.finish(19);case 27:t.next=32;break;case 29:t.prev=29,t.t1=t.catch(7),console.log(t.t1);case 32:e.resource=s,e.paginationTotal=e.resource.pagination.total,t.next=37;break;case 36:e.isBtnDisabled=!0;case 37:e.loading=!1;case 38:case"end":return t.stop()}},t,e,[[7,29],[11,15,19,27],[20,,22,26]])}))()},didChangePage:function(e){var t=this;return l()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.currentPage=e,t.loadResources();case 2:case"end":return a.stop()}},a,t)}))()},didChangePageSize:function(e){this.pageSize=e,this.loadResources()}},created:function(){var e=this;return l()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$store.dispatch("getTagsList","project"),t.next=3,e.loadResources();case 3:case"end":return t.stop()}},t,e)}))()}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-clues-content order-manage"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",[a("el-col",{attrs:{sm:24}},[a("div",{staticClass:"button_group_t"},[a("span",[e._v(" 项 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clver||0===e.clver?"current":""],on:{click:function(t){e.outlinechange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tagsList,function(t,s){return[a("span",{key:s,staticClass:"clitem",class:[t.id===e.clver?"current":""],on:{click:function(a){e.outlinechange(t.id)}}},[e._v(e._s(t.name))])]})],2),e._v(" "),a("div",{staticClass:"button_group_b"},[a("span",[e._v(" 科 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clversm||0===e.clversm?"current":""],on:{click:function(t){e.mulchange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tagsList,function(t){return"0"!=e.clver?[e._l(t.children,function(s,n){return parseInt(e.clver)==t.id?[a("span",{key:n,staticClass:"clitem",class:[s.id===e.clversm?"current":""],on:{click:function(t){e.mulchange(s.id)}}},[e._v(e._s(s.name))])]:e._e()})]:e._e()})],2)])],1),e._v(" "),a("el-row",[a("el-col",{attrs:{sm:24}},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("div",{staticClass:"input-search"},[a("el-input",{attrs:{placeholder:"讲义ID／讲义名称",size:"small"},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("HANDOUT_CREATE")?a("router-link",{staticClass:"routerBtn",class:{"is-disabled":e.isBtnDisabled},attrs:{to:e.isBtnDisabled?"#":"/resource/handout/create"}},[e._v("\n              + 新增讲义\n            ")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small",disabled:e.isBtnDisabled},on:{click:function(t){e.uploaddialogVisible=!0}}},[e._v("+ 批量导入讲义资源\n            ")]),e._v(" "),a("a",{staticClass:"docBtn",attrs:{href:e.docUrl+"#/resourceCourse",target:"_blank"}},[a("i",{staticClass:"el-icon-question"}),e._v("\n              使用帮助\n            ")])],1)])],1)],1)],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.resource.resources}},[a("el-table-column",{attrs:{prop:"id",label:"讲义ID","min-width":"100",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"讲义名称","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"project_name",label:"项目","min-width":"110"}}),e._v(" "),a("el-table-column",{attrs:{prop:"extension",label:"类型","min-width":"110"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"creator.username",label:"操作员","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("HANDOUT_EDIT")?a("router-link",{staticStyle:{margin:"0 6px"},attrs:{to:{path:"/resource/handout/edit/"+t.row.id}}},[e._v("修改\n          ")]):e._e(),e._v(" "),e.unlocking("HANDOUT_DELETE")?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.onRemove(t.row)}}},[e._v("删除\n          ")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){e.toShow(t.row.id)}}},[e._v("操作日志")])]}}])})],1),e._v(" "),a("div",{staticClass:"clues-pagination"},[a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"page-sizes":[50,200,300,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginationTotal},on:{"size-change":e.didChangePageSize,"current-change":e.didChangePage}})],1),e._v(" "),a("el-row",[a("v-upload",{attrs:{"b-visible":e.uploaddialogVisible,title:"批量导入讲义资源","url-title":"批量讲义资源Excel模板下载","download-url":"//s.gaodun.com/web/static-saas/file/%E6%89%B9%E9%87%8F%E8%AE%B2%E4%B9%89%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx","upload-url":e.uploadUrl,name:"file",fileTypes:["xlsx"]},on:{uploadSuccessCallback:e.uploadSuccessCallback,handleCloesDialog:function(t){e.uploaddialogVisible=!1}}})],1)],1),e._v(" "),a("log-dialog",{attrs:{dialog:e.logVisiable,list:e.logList,total:e.logTotal},on:{handleChangePage:e.handleChangePage,toClose:e.toClose}})],1)},staticRenderFns:[]};var _=a("VU/8")(f,m,!1,function(e){a("IAWm")},null,null);t.default=_.exports}});
//# sourceMappingURL=25.7b329c75449267019239.js.map