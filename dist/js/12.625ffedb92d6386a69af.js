webpackJsonp([12],{E7eJ:function(e,t){},wHci:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=s("lC5x"),a=s.n(l),i=s("J0Oq"),u=s.n(i),n={name:"SyllabusModuleOptTemplate",components:{vUpload:s("G00f").a},data:function(){return{clonedialogVisible:!1,ruleProject:{region:""},rulesject:{region:[{required:!0,message:"选择旧大纲",trigger:"change"}]},uploaddialogVisible:!1,coursesyllid:"",modulelist:[],title:"",tag_id:""}},methods:{cloneruleProject:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.clonedialogVisible=!1})},uploadSuccessCallback:function(){this.$router.replace({path:"/syllabus/manage/edit/"+this.coursesyllid})},selectSyllabus:function(e){var t=this;return u()(a.a.mark(function s(){var l;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$http.selectSyllabus(t.coursesyllid,{template_id:e});case 2:0==(l=s.sent).status&&1==l.result&&t.$router.replace({path:"/syllabus/manage/edit/"+t.coursesyllid});case 4:case"end":return s.stop()}},s,t)}))()},OutlineTemplates:function(){var e=this;return u()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.CourseSyllabusTemplates();case 2:0==(s=t.sent).status&&(e.modulelist=s.result);case 4:case"end":return t.stop()}},t,e)}))()},checkSyllabus:function(){var e=this;return u()(a.a.mark(function t(){var s;return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.checkSyllabus(e.coursesyllid);case 2:0==(s=t.sent).status&&(e.title=s.result.title,e.tag_id=s.result.tag_id,s.result.template&&s.result.template.id&&e.$router.push({path:"/syllabus/manage/edit/"+e.coursesyllid}));case 4:case"end":return t.stop()}},t,e)}))()}},computed:{uploadUrl:function(){return"toc-service/course/syllabus/"+this.coursesyllid+"/items/batch"},uploadData:function(){return{course_syllabus_id:this.coursesyllid,tag_id:this.tag_id}}},mounted:function(){},created:function(){this.coursesyllid=this.$route.params.sid,this.OutlineTemplates(),this.checkSyllabus()}},r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"module-edu-content permission-outlineeat"},[s("div",{staticClass:"outlineeat"},[e._v("\n    课程大纲："+e._s(e.title)+"\n    "),e._v(" "),s("span",{staticClass:"tolead",on:{click:function(t){e.uploaddialogVisible=!0}}},[e._v("批量导入课程大纲")])]),e._v(" "),s("div",{staticClass:"outlinebox"},[s("div",{staticClass:"outlinetit"},[e._v("请先为该课程大纲选择合适的结构模板")]),e._v(" "),s("div",{staticClass:"outlinedrop"},e._l(e.modulelist,function(t){return s("div",{key:t.id,staticClass:"outlineitem",domProps:{innerHTML:e._s(t.description)},on:{click:function(s){e.selectSyllabus(t.id)}}})}))]),e._v(" "),s("v-upload",{attrs:{"b-visible":e.uploaddialogVisible,title:"批量导入课程大纲","url-title":"课程大纲Excel模板下载","download-url":"//simg01.gaodunwangxiao.com/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E7%9A%84%E8%A1%A8%E6%A0%BC%E6%A8%A1%E6%9D%BF.rar","upload-url":e.uploadUrl,"upload-data":e.uploadData,name:"import_from",fileTypes:["csv","xls","xlsx"]},on:{uploadSuccessCallback:e.uploadSuccessCallback,handleCloesDialog:function(t){e.uploaddialogVisible=!1}}})],1)},staticRenderFns:[]};var o=s("Z0/y")(n,r,!1,function(e){s("E7eJ")},null,null);t.default=o.exports}});
//# sourceMappingURL=12.625ffedb92d6386a69af.js.map