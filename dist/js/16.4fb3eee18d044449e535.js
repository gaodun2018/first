webpackJsonp([16],{oDjQ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("HzJ8"),r=n.n(a),s=n("lC5x"),c=n.n(s),i=n("J0Oq"),o=n.n(i),l=(n("lRwf"),n("xJrl")),u=n("yt7g"),d=n("BK/k"),p={data:function(){return{docUrl:d.d,radio:"全部",radio2:"全部",keywords:"",clver:"0",clversm:"0",resource:{resources:[],pagination:{total:0,current_page:1}},tags:[],currentPage:1,paginationTotal:0,pageSize:50,loading:!1,videoList:[]}},methods:{handleIconClick:function(){this.loadResources()},onRemove:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.removeLecturenote(e.id).then(function(e){0==e.status?(t.$message({type:"success",message:"删除成功"}),t.loadResources()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},outlinechange:function(e){this.clver=e,this.clversm="0",this.loadResources()},mulchange:function(e){this.clversm=e,this.loadResources()},fetchResources:function(){var e=this;return o()(c.a.mark(function t(){var n,a;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={page_size:e.pageSize,page:e.currentPage,keywords:e.keywords,discriminator:"lecture_note"},"0"!=e.clver&&(n.tag_id=e.clver),"0"!=e.clversm&&(n.tag_id=e.clversm),t.next=5,Object(l.getResource)(n);case 5:return a=t.sent,t.abrupt("return",a);case 7:case"end":return t.stop()}},t,e)}))()},loadResources:function(){var e=this;return o()(c.a.mark(function t(){var n,a,s,i,o,l,d,p;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.fetchResources();case 3:for(n=t.sent,a=n.result,s=!0,i=!1,o=void 0,t.prev=8,l=r()(a.resources);!(s=(d=l.next()).done);s=!0)(p=d.value).created_at=new Date(1e3*p.created_at),p.updated_at=Object(u.g)(new Date(1e3*p.updated_at)),p.project_name=null==p.tag?"":p.tag.name;t.next=16;break;case 12:t.prev=12,t.t0=t.catch(8),i=!0,o=t.t0;case 16:t.prev=16,t.prev=17,!s&&l.return&&l.return();case 19:if(t.prev=19,!i){t.next=22;break}throw o;case 22:return t.finish(19);case 23:return t.finish(16);case 24:e.resource=a,e.paginationTotal=e.resource.pagination.total,e.loading=!1;case 27:case"end":return t.stop()}},t,e,[[8,12,16,24],[17,,19,23]])}))()},didChangePage:function(e){var t=this;return o()(c.a.mark(function n(){return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t.currentPage=e,t.loadResources();case 2:case"end":return n.stop()}},n,t)}))()},didChangePageSize:function(e){this.pageSize=e,this.loadResources()}},created:function(){var e=this;return o()(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(l.getTags)("project");case 2:return e.tags=t.sent.result,t.next=5,e.loadResources();case 5:case"end":return t.stop()}},t,e)}))()}},v={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"module-clues-content order-manage"},[n("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[n("el-row",[n("el-col",{attrs:{sm:24}},[n("div",{staticClass:"button_group_t"},[n("span",[e._v(" 项 目:")]),e._v(" "),n("span",{staticClass:"clitem",class:["0"===e.clver||0===e.clver?"current":""],on:{click:function(t){e.outlinechange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tags,function(t,a){return[n("span",{key:a,staticClass:"clitem",class:[t.id===e.clver?"current":""],on:{click:function(n){e.outlinechange(t.id)}}},[e._v(e._s(t.name))])]})],2),e._v(" "),n("div",{staticClass:"button_group_b"},[n("span",[e._v(" 科 目:")]),e._v(" "),n("span",{staticClass:"clitem",class:["0"===e.clversm||0===e.clversm?"current":""],on:{click:function(t){e.mulchange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tags,function(t){return"0"!=e.clver?[e._l(t.children,function(a,r){return parseInt(e.clver)==t.id?[n("span",{key:r,staticClass:"clitem",class:[a.id===e.clversm?"current":""],on:{click:function(t){e.mulchange(a.id)}}},[e._v(e._s(a.name))])]:e._e()})]:e._e()})],2)])],1),e._v(" "),n("el-row",[n("el-col",{attrs:{sm:24}},[n("el-row",{attrs:{type:"flex",justify:"end"}},[n("div",{staticClass:"input-search"},[n("el-input",{attrs:{placeholder:"讲义ID／讲义名称",size:"small"},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[n("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),e.unlocking("HANDOUT_CREATE")?n("router-link",{staticClass:"routerBtn",attrs:{to:"/resource/handout/create"}},[e._v("+ 新增讲义\n                        ")]):e._e(),e._v(" "),n("a",{staticClass:"docBtn",attrs:{href:e.docUrl+"#/resourceCourse",target:"_blank"}},[n("i",{staticClass:"el-icon-question"}),e._v("\n                            使用帮助\n                        ")])],1)])],1)],1)],1),e._v(" "),n("div",{staticClass:"edu_table"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{border:"",data:e.resource.resources}},[n("el-table-column",{attrs:{prop:"id",label:"讲义ID","min-width":"100",fixed:""}}),e._v(" "),n("el-table-column",{attrs:{prop:"title",label:"讲义名称","min-width":"200"}}),e._v(" "),n("el-table-column",{attrs:{prop:"project_name",label:"项目","min-width":"110"}}),e._v(" "),n("el-table-column",{attrs:{prop:"extension",label:"类型","min-width":"110"}}),e._v(" "),n("el-table-column",{attrs:{prop:"updated_at",label:"更新时间","min-width":"150"}}),e._v(" "),n("el-table-column",{attrs:{prop:"creator.username",label:"操作员","min-width":"150"}}),e._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center","min-width":"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.unlocking("HANDOUT_EDIT")?n("router-link",{staticStyle:{margin:"0 6px"},attrs:{to:{path:"/resource/handout/edit/"+t.row.id}}},[e._v("修改\n                    ")]):e._e(),e._v(" "),e.unlocking("HANDOUT_DELETE")?n("el-button",{attrs:{type:"text"},on:{click:function(n){e.onRemove(t.row)}}},[e._v("删除\n                    ")]):e._e()]}}])})],1),e._v(" "),n("div",{staticClass:"clues-pagination"},[n("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"page-sizes":[50,200,300,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginationTotal},on:{"size-change":e.didChangePageSize,"current-change":e.didChangePage}})],1)],1)])},staticRenderFns:[]};var g=n("Z0/y")(p,v,!1,function(e){n("qEs0")},null,null);t.default=g.exports},qEs0:function(e,t){}});
//# sourceMappingURL=16.4fb3eee18d044449e535.js.map