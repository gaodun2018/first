webpackJsonp([16],{"3UgS":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("BO1k"),s=a.n(n),r=a("Xxa5"),i=a.n(r),c=a("exGp"),o=a.n(c),l=a("Dd8w"),u=a.n(l),d=a("yt7g"),p=a("G00f"),v=a("BK/k"),g=a("SJI6"),m={components:{vUpload:p.a},data:function(){return{docUrl:v.d,radio:"全部",radio2:"全部",input2:"",keywords:"",resource:{resources:[],pagination:{total:0,current_page:1}},clver:"0",clversm:"0",currentPage:1,paginationTotal:0,pageSize:50,loading:!1,uploaddialogVisible:!1,isBtnDisabled:!1}},computed:u()({},Object(g.mapState)({tagsList:function(e){return e.resources.tagsList}}),{uploadUrl:function(){return"calais/resource/v1/video/batch"}}),methods:{uploadSuccessCallback:function(){this.loadResources(),this.uploaddialogVisible=!1},outlinechange:function(e){this.clver=e,this.clversm="0",this.loadResources()},mulchange:function(e){this.clversm=e,this.loadResources()},onRemove:function(e){var t=this;this.$confirm("此操作将删除该资源, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http.removeResource(e.id).then(function(e){0==e.status?(t.$message({type:"success",message:"删除成功"}),t.loadResources()):t.$message({type:"warning",message:"删除失败"})})}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},didClickEdit:function(e){console.log("navigate to edit video "+e.row.id),this.$router.push({name:"editResourceGroup",params:{id:e.row.id}})},fetchResources:function(){var e=this;return o()(i.a.mark(function t(){var a,n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page_size:e.pageSize,page:e.currentPage,discriminator:"resource_group",keywords:e.keywords},"0"!=e.clver&&(a.tag_id=e.clver),"0"!=e.clversm&&(a.tag_id=e.clversm),t.next=5,e.$http.getResource(a);case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}},t,e)}))()},loadResources:function(){var e=this;return o()(i.a.mark(function t(){var a,n,r,c,o,l,u,p,v;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.fetchResources();case 3:if(0!==(a=t.sent).status){t.next=37;break}for(e.isBtnDisabled=!1,n=a.result,t.prev=7,r=!0,c=!1,o=void 0,t.prev=11,l=s()(n.resources);!(r=(u=l.next()).done);r=!0)(p=u.value).created_at=new Date(1e3*p.created_at),p.updated_at=Object(d.g)(new Date(1e3*p.updated_at)),p.project_name=null==p.tag?"":p.tag.name,p.amount=null==p.members?0:p.members.length;t.next=19;break;case 15:t.prev=15,t.t0=t.catch(11),c=!0,o=t.t0;case 19:t.prev=19,t.prev=20,!r&&l.return&&l.return();case 22:if(t.prev=22,!c){t.next=25;break}throw o;case 25:return t.finish(22);case 26:return t.finish(19);case 27:t.next=32;break;case 29:t.prev=29,t.t1=t.catch(7),console.log(t.t1);case 32:e.resource=n,v=e.resource.pagination.total,e.paginationTotal=v,t.next=38;break;case 37:e.isBtnDisabled=!0;case 38:e.loading=!1;case 39:case"end":return t.stop()}},t,e,[[7,29],[11,15,19,27],[20,,22,26]])}))()},didChangePage:function(e){var t=this;return o()(i.a.mark(function a(){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:t.currentPage=e,t.loadResources();case 2:case"end":return a.stop()}},a,t)}))()},didChangePageSize:function(e){this.pageSize=e,this.loadResources()},handleIconClick:function(){this.clver="0",this.clversm="0",this.loadResources()}},created:function(){var e=this;return o()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.$store.dispatch("getTagsList","project"),t.next=3,e.loadResources();case 3:case"end":return t.stop()}},t,e)}))()}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-clues-content order-manage"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",[a("el-col",{attrs:{sm:24}},[a("div",{staticClass:"button_group_t"},[a("span",[e._v(" 项 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clver||0===e.clver?"current":""],on:{click:function(t){e.outlinechange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tagsList,function(t,n){return a("span",{key:n,staticClass:"clitem",class:[t.id===e.clver?"current":""],on:{click:function(a){e.outlinechange(t.id)}}},[e._v(e._s(t.name)+"\n          ")])})],2),e._v(" "),a("div",{staticClass:"button_group_b"},[a("span",[e._v(" 科 目:")]),e._v(" "),a("span",{staticClass:"clitem",class:["0"===e.clversm||0===e.clversm?"current":""],on:{click:function(t){e.mulchange("0")}}},[e._v("全部")]),e._v(" "),e._l(e.tagsList,function(t){return"0"!=e.clver?[e._l(t.children,function(n){return parseInt(e.clver)==t.id?[a("span",{key:n.id,staticClass:"clitem",class:[n.id===e.clversm?"current":""],on:{click:function(t){e.mulchange(n.id)}}},[e._v(e._s(n.name))])]:e._e()})]:e._e()})],2)])],1),e._v(" "),a("el-row",{attrs:{type:"flex",align:"bottom"}},[a("el-col",{attrs:{sm:6}},[a("el-row",[a("div",{staticClass:"select-search"})])],1),e._v(" "),a("el-col",{attrs:{sm:18}},[a("el-row",{attrs:{type:"flex",justify:"end"}},[a("div",{staticClass:"input-search"},[a("el-input",{attrs:{placeholder:"资源组ID／资源组名称",size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.keywords,callback:function(t){e.keywords=t},expression:"keywords"}},[a("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"suffix"},on:{click:e.handleIconClick},slot:"suffix"})]),e._v(" "),a("router-link",{staticClass:"routerBtn",class:{"is-disabled":e.isBtnDisabled},attrs:{to:e.isBtnDisabled?"#":"/resource/resource-group/create"}},[e._v("\n              + 新增资源组合\n            ")])],1)])],1)],1)],1),e._v(" "),a("div",{staticClass:"edu_table"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"table",staticStyle:{width:"100%"},attrs:{border:"",data:e.resource.resources}},[a("el-table-column",{attrs:{prop:"id",label:"资源组ID","min-width":"100",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"title",label:"资源组名称","min-width":"200"}}),e._v(" "),a("el-table-column",{attrs:{label:"资源数量","min-width":"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.amount)+"\n        ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"project_name",label:"项目","min-width":"115"}}),e._v(" "),a("el-table-column",{attrs:{prop:"updated_at",label:"更新时间","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{prop:"creator.username",label:"操作员","min-width":"150"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",align:"center","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.didClickEdit(t)}}},[e._v("修改\n          ")]),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(a){e.onRemove(t.row)}}},[e._v("删除\n          ")])]}}])})],1)],1),e._v(" "),a("el-row",{attrs:{type:"flex",align:"center"}},[a("el-col",{attrs:{sm:24}},[a("el-pagination",{staticStyle:{"text-align":"center"},attrs:{"page-sizes":[50,200,300,400],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginationTotal},on:{"size-change":e.didChangePageSize,"current-change":e.didChangePage}})],1)],1),e._v(" "),a("el-row",[a("v-upload",{attrs:{"b-visible":e.uploaddialogVisible,title:"批量导入视频资源","url-title":"批量视频资源Excel模板下载","download-url":"//s.gaodun.com/web/static-saas/file/%E6%89%B9%E9%87%8F%E8%A7%86%E9%A2%91%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx","upload-url":e.uploadUrl,name:"file",fileTypes:["xlsx"]},on:{uploadSuccessCallback:e.uploadSuccessCallback,handleCloesDialog:function(t){e.uploaddialogVisible=!1}}})],1)],1)},staticRenderFns:[]};var h=a("VU/8")(m,f,!1,function(e){a("xmGC")},null,null);t.default=h.exports},xmGC:function(e,t){}});
//# sourceMappingURL=16.4cbb13e80d9c4fd21dfa.js.map