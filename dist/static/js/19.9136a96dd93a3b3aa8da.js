webpackJsonp([19],{f2KD:function(e,t){},wHci:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("lC5x"),i=s.n(n),l=s("J0Oq"),r=s.n(l),a={name:"SyllabusModuleOptTemplate",components:{},data:function(){return{clonedialogVisible:!1,ruleProject:{region:""},rulesject:{region:[{required:!0,message:"选择旧大纲",trigger:"change"}]},uploaddialogVisible:!1,coursesyllid:"",modulelist:[],title:""}},methods:{cloneruleProject:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.clonedialogVisible=!1})},selectSyllabus:function(e){var t=this;return r()(i.a.mark(function s(){var n;return i.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.$http.selectSyllabus(t.coursesyllid,{template_id:e});case 2:0==(n=s.sent).status&&1==n.result&&t.$router.replace({path:"/syllabus/manage/edit/"+t.coursesyllid});case 4:case"end":return s.stop()}},s,t)}))()},OutlineTemplates:function(){var e=this;return r()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.CourseSyllabusTemplates();case 2:0==(s=t.sent).status&&(e.modulelist=s.result);case 4:case"end":return t.stop()}},t,e)}))()},checkSyllabus:function(){var e=this;return r()(i.a.mark(function t(){var s;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.checkSyllabus(e.coursesyllid);case 2:0==(s=t.sent).status&&(e.title=s.result.title,s.result.template&&s.result.template.id&&e.$router.push({path:"/syllabus/manage/edit/"+e.coursesyllid}));case 4:case"end":return t.stop()}},t,e)}))()}},computed:{},mounted:function(){},created:function(){this.coursesyllid=this.$route.params.sid,this.OutlineTemplates(),this.checkSyllabus()}},u={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"module-edu-content permission-outlineeat"},[s("div",{staticClass:"outlineeat"},[e._v("\n    课程大纲："+e._s(e.title))]),e._v(" "),s("div",{staticClass:"outlinebox"},[s("div",{staticClass:"outlinetit"},[e._v("请先为该课程大纲选择合适的结构模板")]),e._v(" "),s("div",{staticClass:"outlinedrop"},e._l(e.modulelist,function(t){return s("div",{key:t.id,staticClass:"outlineitem",domProps:{innerHTML:e._s(t.description)},on:{click:function(s){e.selectSyllabus(t.id)}}})}))])])},staticRenderFns:[]};var c=s("Z0/y")(a,u,!1,function(e){s("f2KD")},null,null);t.default=c.exports}});
//# sourceMappingURL=19.9136a96dd93a3b3aa8da.js.map