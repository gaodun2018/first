webpackJsonp([20],{VhFQ:function(t,e){},wHci:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=s("Xxa5"),a=s.n(l),i=s("exGp"),u=s.n(i),n={name:"SyllabusModuleOptTemplate",components:{vUpload:s("G00f").a},data:function(){return{clonedialogVisible:!1,ruleProject:{region:""},rulesject:{region:[{required:!0,message:"选择旧大纲",trigger:"change"}]},uploaddialogVisible:!1,coursesyllid:"",modulelist:[],title:"",tag_id:""}},methods:{cloneruleProject:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;e.clonedialogVisible=!1})},uploadSuccessCallback:function(){this.$router.replace({path:"/syllabus/manage/edit/"+this.coursesyllid})},selectSyllabus:function(t){var e=this;return u()(a.a.mark(function s(){var l;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,e.$http.selectSyllabus(e.coursesyllid,{template_id:t});case 2:0==(l=s.sent).status&&1==l.result&&e.$router.replace({path:"/syllabus/manage/edit/"+e.coursesyllid});case 4:case"end":return s.stop()}},s,e)}))()},OutlineTemplates:function(){var t=this;return u()(a.a.mark(function e(){var s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.CourseSyllabusTemplates();case 2:0==(s=e.sent).status&&(t.modulelist=s.result);case 4:case"end":return e.stop()}},e,t)}))()},checkSyllabus:function(){var t=this;return u()(a.a.mark(function e(){var s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$http.checkSyllabus(t.coursesyllid);case 2:0==(s=e.sent).status&&(t.title=s.result.title,t.tag_id=s.result.tag_id,s.result.template&&s.result.template.id&&t.$router.push({path:"/syllabus/manage/edit/"+t.coursesyllid}));case 4:case"end":return e.stop()}},e,t)}))()}},computed:{uploadUrl:function(){return"toc-service/course/syllabus/"+this.coursesyllid+"/items/batch"},uploadData:function(){return{course_syllabus_id:this.coursesyllid,tag_id:this.tag_id}}},mounted:function(){},created:function(){this.coursesyllid=this.$route.params.sid,this.OutlineTemplates(),this.checkSyllabus()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"module-edu-content permission-outlineeat"},[s("div",{staticClass:"outlineeat"},[t._v("\n    课程大纲："+t._s(t.title)+"\n    "),t._v(" "),s("span",{staticClass:"tolead",on:{click:function(e){t.uploaddialogVisible=!0}}},[t._v("批量导入课程大纲")])]),t._v(" "),s("div",{staticClass:"outlinebox"},[s("div",{staticClass:"outlinetit"},[t._v("请先为该课程大纲选择合适的结构模板")]),t._v(" "),s("div",{staticClass:"outlinedrop"},t._l(t.modulelist,function(e){return s("div",{key:e.id,staticClass:"outlineitem",domProps:{innerHTML:t._s(e.description)},on:{click:function(s){t.selectSyllabus(e.id)}}})}))]),t._v(" "),s("v-upload",{attrs:{"b-visible":t.uploaddialogVisible,title:"批量导入课程大纲","url-title":"课程大纲Excel模板下载","download-url":"//simg01.gaodunwangxiao.com/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E7%9A%84%E8%A1%A8%E6%A0%BC%E6%A8%A1%E6%9D%BF.zip","upload-url":t.uploadUrl,"upload-data":t.uploadData,name:"import_from",fileTypes:["csv","xls","xlsx"]},on:{uploadSuccessCallback:t.uploadSuccessCallback,handleCloesDialog:function(e){t.uploaddialogVisible=!1}}})],1)},staticRenderFns:[]};var o=s("VU/8")(n,r,!1,function(t){s("VhFQ")},null,null);e.default=o.exports}});
//# sourceMappingURL=20.0aeac4fe4b132aa96377.js.map