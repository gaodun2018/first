webpackJsonp([13],{"2vHp":function(e,t){},eyKa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),o=a("exGp"),s=a.n(o),i=a("bOdI"),l=a.n(i),c={components:{},data:function(){var e;return e={tableData:[],page:1,pageSize:50,keyword:"",eduTotal:1,daterange:"",phone:""},l()(e,"keyword",""),l()(e,"userSearch",""),e},computed:{},methods:{getList:function(){var e=this;return s()(r.a.mark(function t(){var a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={page_num:e.page,page_size:e.pageSize,mobile:e.phone,begin:e.daterange?Date.parse(e.daterange[0]):"",end:e.daterange?Date.parse(e.daterange[1]):"",keyword:e.keyword?e.keyword:"",status:0},t.next=3,e.$http.getLogsList(a);case 3:n=t.sent,e.tableData=n.result.data,e.eduTotal=n.result.total;case 6:case"end":return t.stop()}},t,e)}))()},setMaxHeight:function(){return(document.body.offsetHeight||document.documentElement.offsetHeight)-200},handleCurrentChange:function(e){this.page=e,this.getList()},searchList:function(){this.page=1,this.getList()}},watch:{$route:["setMaxHeight"]},mounted:function(){},created:function(){this.tableHeight(this),this.getList()},filters:{formatTime:function(e){var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1>9?t.getMonth()+1:"0"+t.getMonth()+1)+"-"+(t.getDate()>9?t.getDate():"0"+t.getDate())+" "+(t.getHours()>9?t.getHours():"0"+t.getHours())+":"+(t.getMinutes()>9?t.getMinutes():"0"+t.getMinutes())+":"+(t.getSeconds()>9?t.getSeconds():"0"+t.getSeconds())}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-edu-content operation-log"},[a("div",{staticClass:"search_tools",staticStyle:{overflow:"hidden","margin-bottom":"22px"}},[a("el-row",{attrs:{type:"flex",align:"bottom",justify:"space-between"}},[a("div",{staticClass:"search_item"},[a("span",[e._v("操作时间")]),e._v(" "),a("el-date-picker",{staticStyle:{width:"240px"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.daterange,callback:function(t){e.daterange=t},expression:"daterange"}})],1),e._v(" "),a("div",{staticClass:"search_item"},[a("span",[e._v("操作人手机号")]),e._v(" "),a("div",{staticStyle:{display:"inline-block"}},[a("el-input",{attrs:{placeholder:"请输入用户手机号",size:"small"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1)]),e._v(" "),a("div",{staticClass:"search_item"},[a("span",[e._v("关键词")]),e._v(" "),a("div",{staticStyle:{display:"inline-block"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入内容",clearable:""},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1)]),e._v(" "),a("div",[a("el-button",{staticStyle:{"margin-bottom":"2px"},attrs:{type:"primary",size:"small"},on:{click:e.searchList}},[e._v("查询\n                ")])],1)])],1),e._v(" "),a("div",[a("el-table",{ref:"table",staticStyle:{width:"100%"},attrs:{data:e.tableData,"max-height":e.setMaxHeight()}},[a("el-table-column",{attrs:{prop:"id",label:"日志ID",width:"80",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"操作人","min-width":"140"}}),e._v(" "),a("el-table-column",{attrs:{prop:"source_id",label:"操作对象ID","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                     "+e._s(0==t.row.source_id?"无":t.row.source_id)+"\n                 ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"log_type",label:"事件类型","min-width":"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.log_type?a("span",[e._v("课程操作")]):2==t.row.log_type?a("span",[e._v("大纲操作")]):3==t.row.log_type?a("span",[e._v("资源操作")]):a("span",[e._v("公共服务操作")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"action","min-width":"160",label:"操作内容"}}),e._v(" "),a("el-table-column",{attrs:{prop:"created_at",label:"操作时间","min-width":"260"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(e._f("formatTime")(t.row.created_at))+"\n                ")]}}])})],1),e._v(" "),a("div",{staticClass:"edu-pagination"},[a("el-pagination",{attrs:{"current-page":e.page,"page-size":e.pageSize,layout:"total, prev, pager, next, jumper",total:e.eduTotal},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.page=t}}})],1)],1)])},staticRenderFns:[]};var u=a("VU/8")(c,d,!1,function(e){a("gTrO"),a("2vHp")},"data-v-6ff5417d",null);t.default=u.exports},gTrO:function(e,t){}});
//# sourceMappingURL=13.514e688d1c41e2bc4bc8.js.map