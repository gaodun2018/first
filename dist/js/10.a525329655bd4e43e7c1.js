webpackJsonp([10],{"016g":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("ZhBQ");a.n(s);for(var i in s)"default"!==i&&function(e){a.d(t,e,function(){return s[e]})}(i);var l=a("Lf3f");var o=function(e){a("afbU")},n=a("vSla")(s.default,l.a,!1,o,null,null);t.default=n.exports},Lf3f:function(e,t,a){"use strict";var s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"module-edu-content permission-outlinemodule"},[a("el-row",{staticClass:"outlineeat"},[a("el-col",{attrs:{span:18}},[e._v("\n      课程大纲："+e._s(e.title)+"\n    ")]),e._v(" "),4===e.coursesylllevel&&0!=e.subject_id?a("el-col",{staticStyle:{"text-align":"right"},attrs:{span:6}},[a("el-switch",{attrs:{"active-text":"是否启用知识点关联"},on:{change:e.handleChangeIsKnowledgeOpen},model:{value:e.is_knowledge_open,callback:function(t){e.is_knowledge_open=t},expression:"is_knowledge_open"}})],1):e._e()],1),e._v(" "),a("div",{staticClass:"outlinebox"},[a("div",{staticClass:"chapterbox"},[3===e.coursesylllevel?e._l(e.tabledata,function(t){return a("div",{key:t.id,staticClass:"first-chapter-box"},[a("div",{staticClass:"chaptit"},[a("span",{staticClass:"chlft"},[e._v("条目ID："+e._s(t.id)+" | "+e._s(t.name))]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.editproject(t.id,t.name)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelOutlineDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt1",on:{click:function(a){e.openChildDialog(t.id)}}},[e._v("增加子目录")])]),e._v(" "),a("draggable",{attrs:{element:"div",move:e.onMoveCallback,options:{animation:150,draggable:".second-chapter-box"}},on:{end:e.dragEnd},model:{value:t.children,callback:function(a){e.$set(t,"children",a)},expression:"firstItem.children"}},e._l(t.children,function(t){return a("div",{key:t.id,staticClass:"second-chapter-box"},[a("div",{staticClass:"chaptit chapsecd"},[a("span",{staticClass:"chlft"},[e._v("条目ID："+e._s(t.id)+" | "+e._s(t.name))]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.editproject(t.id,t.name)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt yellow",on:{click:function(a){e.openDelOutlineDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt1",on:{click:function(a){e.copyId(t.id)}}},[e._v("复制条目ID")]),e._v(" "),a("span",{staticClass:"chrgt1 yellow",on:{click:function(a){e.openAddResDialog(t.id)}}},[e._v("新增资源")])]),e._v(" "),a("draggable",{attrs:{element:"div",move:e.onMoveCallback,options:{animation:150,draggable:".third-chapter-box"}},on:{end:e.dragEnd},model:{value:t.children,callback:function(a){e.$set(t,"children",a)},expression:"secItem.children"}},e._l(t.children,function(t){return a("div",{key:t.id,staticClass:"resourcebox third-chapter-box"},[a("div",{staticClass:"knowledge"},["1"==t.apply_to||"2"==t.apply_to?a("el-tag",{staticClass:"attribute-tag",attrs:{size:"small",type:"danger"}},[e._v(e._s("2"==t.apply_to?"提分盒子":"1"==t.apply_to?"跳级测试":""))]):e._e(),e._v(" "),a("span",{staticClass:"chlft"},[e._v("\n                      条目ID："+e._s(t.id)+" | "+e._s(t.name)+"\n                      "),t.study_time&&"0"!=t.study_time?[a("span",{staticClass:"chline"},[e._v("|")]),e._v("建议学习："+e._s(t.study_time)+"分钟")]:e._e(),e._v(" "),t.resource?[a("span",{staticClass:"chline"},[e._v("|")]),e._v("资源ID："+e._s(t.resource&&t.resource.id)+" 【"+e._s(e._f("Resource2chn")(t.resource&&t.resource.discriminator))+"】，"+e._s(t.resource&&t.resource.title))]:e._e()],2),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openeEditResource(t)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelResDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.copyId(t.id,t)}}},[e._v("复制条目/资源ID")])],1)])}))],1)}))],1)}):e._e(),e._v(" "),4===e.coursesylllevel?e._l(e.tabledata,function(t){return a("div",{key:t.id,staticClass:"first-chapter-box"},[a("div",{staticClass:"chaptit"},[a("span",{staticClass:"chlft"},[e._v("条目ID："+e._s(t.id)+" | "+e._s(t.name))]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.editproject(t.id,t.name)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelOutlineDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt1",on:{click:function(a){e.openChildDialog(t.id)}}},[e._v("增加子目录")])]),e._v(" "),a("draggable",{attrs:{element:"div",move:e.onMoveCallback,options:{animation:150,draggable:".second-chapter-box"}},on:{end:e.dragEnd},model:{value:t.children,callback:function(a){e.$set(t,"children",a)},expression:"firstItem.children"}},e._l(t.children,function(t){return a("div",{key:t.id,staticClass:"second-chapter-box"},[a("div",{staticClass:"chaptit chapsecd"},[a("span",{staticClass:"chlft"},[e._v("条目ID："+e._s(t.id)+" | "+e._s(t.name))]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.editproject(t.id,t.name)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelOutlineDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt1",on:{click:function(a){e.openChildDialog(t.id,!0)}}},[e._v("增加子目录")]),e._v(" "),a("span",{staticClass:"chrgt1",on:{click:function(a){e.copyId(t.id)}}},[e._v("复制条目ID")])]),e._v(" "),a("draggable",{attrs:{element:"div",move:e.onMoveCallback,options:{animation:150,draggable:".third-chapter-box"}},on:{end:e.dragEnd},model:{value:t.children,callback:function(a){e.$set(t,"children",a)},expression:"secItem.children"}},e._l(t.children,function(t){return a("div",{key:t.id,staticClass:"third-chapter-box"},[a("div",{staticClass:"knowledge"},[a("span",{staticClass:"chlft"},[a("i"),e._v(" "),a("span",[e._v("条目ID："+e._s(t.id)+" | "+e._s(t.name))]),e._v("   "),t.knowledge_id?a("span",{staticClass:"connect-knowledage"},[e._v("关联："+e._s(t.knowledge_id)+"  "+e._s(t.knowledge_name))]):e._e()]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.editproject(t.id,t.name)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelOutlineDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt1",on:{click:function(a){e.copyId(t.id)}}},[e._v("复制条目ID")]),e._v(" "),0!=e.subject_id?a("span",{staticClass:"chrgt1 yellow",on:{click:function(a){e.handleOpenKnowledgeDialog(t)}}},[e._v("关联知识点")]):e._e(),e._v(" "),a("span",{staticClass:"chrgt1 yellow",on:{click:function(a){e.openAddResDialog(t.id)}}},[e._v("新增资源")])]),e._v(" "),a("draggable",{attrs:{element:"div",move:e.onMoveCallback,options:{animation:150,draggable:".fourth-chapter-box"}},on:{end:e.dragEnd},model:{value:t.children,callback:function(a){e.$set(t,"children",a)},expression:"thirdItem.children"}},e._l(t.children,function(t){return a("div",{key:t.id,staticClass:"resourcebox fourth-chapter-box"},[a("div",{staticClass:"knowledge"},["2"==t.apply_to||"1"==t.apply_to?a("el-tag",{staticClass:"attribute-tag",attrs:{size:"small",type:"danger"}},[e._v(e._s("2"==t.apply_to?"提分盒子":"1"==t.apply_to?"跳级测试":""))]):e._e(),e._v(" "),a("span",{staticClass:"chlft"},[e._v("\n                          条目ID："+e._s(t.id)+" | "+e._s(t.name)+"\n                          "),t.study_time&&"0"!=t.study_time?[a("span",{staticClass:"chline"},[e._v("|")]),e._v("建议学习："+e._s(t.study_time)+"分钟")]:e._e(),e._v(" "),t.resource?[a("span",{staticClass:"chline"},[e._v("|")]),e._v("资源ID："+e._s(t.resource&&t.resource.id)+" 【"+e._s(e._f("Resource2chn")(t.resource&&t.resource.discriminator))+"】 "+e._s(t.resource&&t.resource.title)+" ")]:e._e()],2),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openeEditResource(t)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelResDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.copyId(t.id,t)}}},[e._v("复制条目/资源ID")])],1)])}))],1)}))],1)}))],1)}):e._e(),e._v(" "),2===e.coursesylllevel?e._l(e.tabledata,function(t){return a("div",{key:t.id,staticClass:"first-chapter-box"},[a("div",{staticClass:"chaptit"},[a("span",{staticClass:"chlft"},[e._v("条目ID："+e._s(t.id)+" | "+e._s(t.name))]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.editproject(t.id,t.name)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelOutlineDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt1 yellow",on:{click:function(a){e.openAddResDialog(t.id)}}},[e._v("新增资源")])]),e._v(" "),a("draggable",{attrs:{element:"div",move:e.onMoveCallback,options:{animation:150,draggable:".second-chapter-box"}},on:{end:e.dragEnd},model:{value:t.children,callback:function(a){e.$set(t,"children",a)},expression:"firstItem.children"}},e._l(t.children,function(t){return a("div",{key:t.id,staticClass:"resourcebox second-chapter-box"},[a("div",{staticClass:"knowledge"},["2"==t.apply_to||"1"==t.apply_to?a("el-tag",{staticClass:"attribute-tag",attrs:{size:"small",type:"danger"}},[e._v(e._s("2"==t.apply_to?"提分盒子":"1"==t.apply_to?"跳级测试":""))]):e._e(),e._v(" "),a("span",{staticClass:"chlft"},[e._v("\n                  条目ID："+e._s(t.id)+" | "+e._s(t.name)+"\n                  "),t.study_time&&"0"!=t.study_time?[a("span",{staticClass:"chline"},[e._v("|")]),e._v("建议学习："+e._s(t.study_time)+"分钟")]:e._e(),e._v(" "),t.resource?[a("span",{staticClass:"chline"},[e._v("|")]),e._v("资源ID："+e._s(t.resource&&t.resource.id)+" 【"+e._s(e._f("Resource2chn")(t.resource&&t.resource.discriminator))+"】，"+e._s(t.resource&&t.resource.title)+" ")]:e._e()],2),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openeEditResource(t)}}},[e._v("修改")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.openDelResDialog(t.id)}}},[e._v("删除")]),e._v(" "),a("span",{staticClass:"chrgt",on:{click:function(a){e.copyId(t.id,t)}}},[e._v("复制条目/资源ID")])],1)])}))],1)}):e._e(),e._v(" "),a("div",{staticClass:"chaptit additem"},[a("span",{on:{click:e.openFirLvDialog}},[e._v("新增一级大纲目录")])])],2)]),e._v(" "),a("el-dialog",{staticClass:"tabplane addResourceDialog",attrs:{title:"选择学习资源",width:"60%",top:"2%",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-steps",{staticStyle:{"margin-top":"-10px","margin-bottom":"10px"},attrs:{active:e.active,"finish-status":"finish",simple:""}},e._l(e.progressText,function(e,t){return a("el-step",{key:t,attrs:{title:e.text,description:""}})})),e._v(" "),a("el-form",{directives:[{name:"show",rawName:"v-show",value:0==e.active,expression:"active == 0"}],ref:"addResFirFrom",staticClass:"demo-ruleForm",attrs:{model:e.addResFirFrom,"label-width":"100px"},nativeOn:{submit:function(e){e.preventDefault()}}},[a("el-form-item",{attrs:{label:"显示名称",prop:"name",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:100})}},[a("el-input",{staticClass:"coursetxt",nativeOn:{keydown:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.firstNextSubmit("addResFirFrom")}},model:{value:e.addResFirFrom.name,callback:function(t){e.$set(e.addResFirFrom,"name",t)},expression:"addResFirFrom.name"}})],1),e._v(" "),a("el-row",{staticClass:"ep-set-box"},[a("p",{staticClass:"ep-line"}),e._v(" "),a("span",{staticClass:"ep-tips"},[e._v("以下设置为EP专用：（选填）")])]),e._v(" "),a("el-form-item",{attrs:{label:"建议学习时长",prop:"study_time"}},[a("el-select",{attrs:{"popper-class":"study-time-select",clearable:"",placeholder:"请选择"},model:{value:e.addResFirFrom.study_time,callback:function(t){e.$set(e.addResFirFrom,"study_time",t)},expression:"addResFirFrom.study_time"}},e._l(e.study_time_options,function(e){return a("el-option",{key:e.value,attrs:{label:e.value,value:e.value}})})),e._v("\n        分钟\n      ")],1),e._v(" "),a("el-form-item",{staticClass:"coursebtn"},[a("el-button",{staticStyle:{"margin-top":"12px"},on:{click:function(t){e.firstNextSubmit("addResFirFrom")}}},[e._v("下一步")])],1)],1),e._v(" "),a("el-form",{directives:[{name:"show",rawName:"v-show",value:1==e.active,expression:"active == 1"}],staticClass:"demo-ruleForm",attrs:{"label-width":"100px"}},[a("div",{staticClass:"selectmodel"},e._l(e.resourceTypeList,function(t,s){return a("span",{key:s,class:[e.resourceType==t.discriminator?"is-active":""],on:{click:function(a){e.selectclk(t.discriminator)}}},[e._v("\n          "+e._s(t.label)+"\n        ")])})),e._v(" "),"paper"===e.resourceType?a("el-row",{staticClass:"ep-set-box"},[a("p",{staticClass:"ep-line"}),e._v(" "),a("span",{staticClass:"ep-tips"},[e._v("以下设置为EP专用：（选填）")])]):e._e(),e._v(" "),"paper"===e.resourceType?a("el-form-item",{attrs:{label:"资源应用"}},[a("el-checkbox-group",{on:{change:e.handleCheckboxChange},model:{value:e.addResFirFrom.apply_to,callback:function(t){e.$set(e.addResFirFrom,"apply_to",t)},expression:"addResFirFrom.apply_to"}},[a("el-checkbox",{attrs:{label:"1"}},[e._v("跳级测试")]),e._v(" "),a("el-checkbox",{attrs:{label:"2"}},[e._v("提分盒子")])],1)],1):e._e(),e._v(" "),"paper"===e.resourceType?a("el-form-item",{attrs:{label:"开启时间",prop:"start_time"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"timestamp",placeholder:"请设置开启时间"},model:{value:e.addResFirFrom.start_time,callback:function(t){e.$set(e.addResFirFrom,"start_time",t)},expression:"addResFirFrom.start_time"}})],1):e._e(),e._v(" "),a("el-form-item",{staticClass:"coursebtn"},[a("el-button",{staticStyle:{"margin-top":"12px"},on:{click:e.prev}},[e._v("上一步")]),e._v(" "),a("el-button",{staticStyle:{"margin-top":"12px"},on:{click:e.secondSubmit}},[e._v("下一步")])],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:2==e.active,expression:"active == 2"}],staticClass:"rulemodule"},[a("el-form",{directives:[{name:"show",rawName:"v-show",value:"video"===e.resourceType||"lecture_note"===e.resourceType,expression:"resourceType === 'video' || resourceType === 'lecture_note'"}],attrs:{"label-position":"left","label-width":"80px"}},[a("el-form-item",{attrs:{label:"来源"}},[a("el-radio-group",{model:{value:e.sourceRadio,callback:function(t){e.sourceRadio=t},expression:"sourceRadio"}},[a("el-radio",{attrs:{label:1}},[e._v("上传/创建资源")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("从已有资源选择")])],1)],1)],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:1===e.sourceRadio&&"lecture_note"===e.resourceType,expression:"sourceRadio === 1 && resourceType === 'lecture_note'"}]},[a("HandoutUpload",{ref:"handoutUpload",on:{getHandoutPath:e.getHandoutPath}})],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:1===e.sourceRadio&&"video"===e.resourceType,expression:"sourceRadio === 1 && resourceType === 'video'"}]},[a("el-form",{ref:"videoForm",staticClass:"resource-ruleForm",attrs:{model:e.videoForm,"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"视频地址",prop:"video_id",rules:e.filter_rules({required:!0,type:"isVideoId"})}},[a("el-input",{attrs:{placeholder:"请输入视频地址","auto-complete":"off"},model:{value:e.videoForm.video_id,callback:function(t){e.$set(e.videoForm,"video_id",t)},expression:"videoForm.video_id"}}),e._v(" "),a("el-tooltip",{attrs:{placement:"top"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("\n                只需要输入地址中不同部分即可,如示例:红色部分："),a("br"),e._v(e._s(e.urltip)+"\n                "),a("span",{staticStyle:{color:"red"}},[e._v("16oe3We00h1ye2hZ")]),e._v(e._s(e.urltip2))]),e._v(" "),a("i",{staticClass:"el-icon-info"})])],1),e._v(" "),a("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（分）",prop:"duration_minutes",rules:[{required:!0,type:"number",message:"请填写视频时长的分钟",trigger:["change","blur"]}]}},[a("el-input",{attrs:{placeholder:"请填写视频时长的分钟","auto-complete":"off"},model:{value:e.videoForm.duration_minutes,callback:function(t){e.$set(e.videoForm,"duration_minutes",e._n(t))},expression:"videoForm.duration_minutes"}}),e._v("\n            分\n          ")],1),e._v(" "),a("el-form-item",{staticClass:"displayinline",attrs:{label:"视频时长（秒）",prop:"duration_second",rules:[{message:"请填写视频时长的秒",trigger:["change","blur"]}]}},[a("el-input",{attrs:{placeholder:"请填写视频时长的秒","auto-complete":"off"},on:{change:e.handleInputChange},model:{value:e.videoForm.duration_second,callback:function(t){e.$set(e.videoForm,"duration_second",t)},expression:"videoForm.duration_second"}}),e._v("\n            秒\n          ")],1)],1)],1),e._v(" "),a("el-row",{directives:[{name:"show",rawName:"v-show",value:2===e.sourceRadio,expression:"sourceRadio === 2"}]},[a("el-input",{attrs:{placeholder:e.inputPlaceholder,size:"small"},nativeOn:{keydown:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.handleIconClick(t):null}},model:{value:e.resourceinput,callback:function(t){e.resourceinput=t},expression:"resourceinput"}},[a("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:e.handleIconClick},slot:"append"})],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.resLoading,expression:"resLoading"}],ref:"singleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:e.resourceTable,border:"","tooltip-effect":"dark","max-height":"400","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange,"current-change":e.handleTableChange}},e._l(e.resourceTableConfig,function(t,s){return a("el-table-column",{key:s,attrs:{label:t.label,width:t.wh,"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(s){return["id"==t.key||"paper_id"==t.key||"live_id"==t.key?[a("el-radio",{staticClass:"radio",attrs:{label:String(s.row.id)},model:{value:e.resourceRadio,callback:function(t){e.resourceRadio=t},expression:"resourceRadio"}}),e._v(" "),a("span",[e._v(e._s(s.row[t.key]))])]:"discriminator"==t.key?a("span",[e._v(e._s(e._f("Resource2chn")(s.row[t.key])))]):a("span",[e._v(e._s(s.row[t.key]))])]}}])})})),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pagination.current_page,"page-size":50,layout:"total, prev, pager, next, jumper",total:e.pagination.total},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.pagination,"current_page",t)}}})],1),e._v(" "),a("div",{staticClass:"coursebtn",staticStyle:{"padding-top":"0","margin-top":"20px"}},[a("el-button",{staticStyle:{"margin-top":"12px"},on:{click:e.prev}},[e._v("上一步")]),e._v(" "),"add"==e.resourceAction?a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.addSyllabusResourceItem}},[e._v(e._s(e.btnLoading?"新增中":"确 定")+"\n        ")]):e._e(),e._v(" "),"update"==e.resourceAction?a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:e.updateSyllabusResource}},[e._v(e._s(e.btnLoading?"新增中":"确 定")+"\n        ")]):e._e()],1)],1)],1),e._v(" "),a("el-dialog",{staticClass:"tabplane",attrs:{title:e.deleteModule?"删除课程大纲目录":"删除已选资源",visible:e.dialogVisible,size:"tiny"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("span",[e._v(e._s(e.deleteModule?"确定要删除该课程大纲目录吗？删除后，该目录下的子目录及资源关系均将被删除！":"确定要删除已选择的资源吗？"))]),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.confirmDelete}},[e._v("确 定")])],1)]),e._v(" "),a("SelectKnowledge",{ref:"selectKnowledge",attrs:{"dialog-knowledge-visible":e.dialogKnowledgeVisible,"knowledge-list":e.knowledgeList,"current-syllabus-item-knowledge":e.currentSyllabusItemKnowledge},on:{changeCurrentSyllabusItemKnowledge:e.changeCurrentSyllabusItemKnowledge,handleCloseKnowledgeDialog:e.handleCloseKnowledgeDialog,handleSaveKnowledgeDialog:e.handleSaveKnowledgeDialog}}),e._v(" "),a("el-dialog",{staticClass:"tabplane",attrs:{title:e.Moduledialog?e.bigdislog?"新增一级大纲目录":"新增课程大纲子目录":"修改课程大纲名称",center:"",visible:e.adddialogVisible,size:"tiny"},on:{"update:visible":function(t){e.adddialogVisible=t}}},[a("el-form",{ref:"ruleProject",staticClass:"demo-ruleForm",attrs:{model:e.ruleProject,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"显示名称",prop:"name",rules:e.filter_rules({required:!0,type:"isAllSpace",maxLength:100})}},[a("el-input",{staticClass:"coursetxt",model:{value:e.ruleProject.name,callback:function(t){e.$set(e.ruleProject,"name",t)},expression:"ruleProject.name"}})],1)],1),e._v(" "),a("div",{staticClass:"footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.adddialogVisible=!1}}},[e._v("取 消")]),e._v(" "),1==e.Moduledialog?a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.addruleProject("ruleProject")}}},[e._v(e._s(e.btnLoading?"新增中":"确 定")+"\n      ")]):a("el-button",{attrs:{type:"primary",loading:e.btnLoading},on:{click:function(t){e.updateruleProject("ruleProject")}}},[e._v("\n        "+e._s(e.btnLoading?"保存中":"保 存")+"\n      ")])],1)],1)],1)},staticRenderFns:[]};t.a=s},ZhBQ:function(e,t){throw new Error("Module build failed: SyntaxError: D:/zeus-console.gaodun.com/src/components/SyllabusManage/SyllabusModuleEdit.vue: Unexpected token (1320:1)\n\n[0m [90m 1318 | [39m      let ep2 [33m=[39m localStorage[33m.[39mgetItem([32m'isInEP2'[39m) [33m?[39m [36mtrue[39m [33m:[39m[36mfalse[39m[33m;[39m\n [90m 1319 | [39m      [36mif[39m (ep2){\n[31m[1m>[22m[39m[90m 1320 | [39m[33m<<[39m[33m<<[39m[33m<<[39m[33m<[39m [33mHEAD[39m\n [90m      | [39m [31m[1m^[22m[39m\n [90m 1321 | [39m        [36mif[39m ([36mthis[39m[33m.[39mresourceTypeList [33m&&[39m [36mthis[39m[33m.[39mresourceTypeList[33m.[39mlength [33m<[39m [35m5[39m){\n [90m 1322 | [39m[33m===[39m[33m===[39m[33m=[39m\n [90m 1323 | [39m        [36mif[39m([36mthis[39m[33m.[39mresourceTypeList [33m&&[39m [36mthis[39m[33m.[39mresourceTypeList[33m.[39mlength [33m<[39m [35m5[39m){[0m\n")},afbU:function(e,t){}});
//# sourceMappingURL=10.a525329655bd4e43e7c1.js.map