webpackJsonp([17],{bsHd:function(e,t){},x0EZ:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={components:{SelectKnowledge:r("gR9K").a},data:function(){return{ruleForm:{name:"",region:"",date1:"",date2:"",delivery:!1,type:[],resource:"",desc:""},rules:{name:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],region:[{required:!0,message:"请选择活动区域",trigger:"change"}],date1:[{type:"date",required:!0,message:"请选择日期",trigger:"change"}],date2:[{type:"date",required:!0,message:"请选择时间",trigger:"change"}],type:[{type:"array",required:!0,message:"请至少选择一个活动性质",trigger:"change"}],resource:[{required:!0,message:"请选择活动资源",trigger:"change"}],desc:[{required:!0,message:"请填写活动形式",trigger:"blur"}]}}},methods:{selectknowledge:function(){this.$store.dispatch("changeDialog",!0)},submitForm:function(e){this.$refs[e].validate(function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")})},resetForm:function(e){this.$refs[e].resetFields()},handleUpLoad:function(){}}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"module-clues-content add-resource"},[r("div",{staticClass:"outlineeat"},[e._v("\n    新增讲义\n  ")]),e._v(" "),r("div",{staticClass:"frombox"},[r("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[r("el-form-item",{staticClass:"w_50",attrs:{label:"项目",prop:"region"}},[r("el-select",{model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}},[r("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),r("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1),e._v(" "),r("el-form-item",{staticClass:"w_50",attrs:{label:"科目",prop:"region"}},[r("el-select",{model:{value:e.ruleForm.region,callback:function(t){e.$set(e.ruleForm,"region",t)},expression:"ruleForm.region"}},[r("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),r("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"讲义名称",prop:"name"}},[r("el-input",{staticClass:"w_50",attrs:{"auto-complete":"off"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"文件名",prop:"name"}},[r("el-input",{staticClass:"w_60",attrs:{"auto-complete":"off"},model:{value:e.ruleForm.name,callback:function(t){e.$set(e.ruleForm,"name",t)},expression:"ruleForm.name"}}),e._v(" "),r("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"text"},on:{click:e.handleUpLoad}},[e._v("本地上传")])],1),e._v(" "),r("el-form-item",{attrs:{label:"知识点关联",prop:"name"}},[r("el-button",{attrs:{type:"text"},on:{click:e.selectknowledge}},[e._v("选择知识点")])],1),e._v(" "),r("el-form-item",{staticStyle:{"text-align":"right"}},[r("el-button",{on:{click:function(t){e.resetForm("ruleForm")}}},[e._v("重置")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submitForm("ruleForm")}}},[e._v("保存")])],1)],1)],1),e._v(" "),r("SelectKnowledge")],1)},staticRenderFns:[]};var o=r("Z0/y")(l,a,!1,function(e){r("bsHd")},null,null);t.default=o.exports}});
//# sourceMappingURL=17.d97eaf2430de0e6969ab.js.map