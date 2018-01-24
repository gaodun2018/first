<template>
  <div class="module-edu-content permission-outlinemodule">
    <div class="outlineeat">
      课程大纲：CFA持证无忧Level1 - 2018年6月 - 基础精讲<span class="eaticon"></span>
    </div>
    <div class="outlinebox">
      <div class="chapterbox">


        <!-- <draggable v-model="tabledata" element="div">
          <div v-for="(rev,index) in tabledata" :key="index">
            <div class="chaptit">
              <span class="chlft" :ref="'sid'+rev.id">{{rev.name}}</span>
              <span class="chrgt" @click="editproject(rev.id)">修改</span>
              <span class="chrgt" @click="deleteproject">删除</span>
              <span class="chrgt1" @click="addproject">增加子目录</span>
            </div>

            <draggable v-model="rev.data" element="div">
              <div v-for="(chap,index1) in rev.data" :key="index1">
                <div class="chaptit chapsecd">
                  <span class="chlft" :ref="'sid'+chap.id">{{chap.name}}</span>
                  <span class="chrgt" @click="editproject(chap.id)">修改</span>
                  <span class="chrgt" @click="deleteproject">删除</span>
                  <span class="chrgt1" @click="addproject">增加子目录</span>
                </div>

                <draggable v-model="chap.data" element="div">
                  <div v-for="(val,index2) in chap.data" :key="index2">
                    <div class="knowledge">
                      <span class="chlft"><i></i><span :ref="'sid'+val.id">{{val.name}}</span></span>
                      <span class="chrgt" @click="editproject(val.id)">修改</span>
                      <span class="chrgt" @click="deleteproject">删除</span>
                      <span class="chrgt1 yellow" @click="dialogFormVisible = true">新增资源</span>
                    </div>
                    <draggable v-model="val.data" element="div">
                      <div class="resourcebox">
                        <div class="knowledge" v-for="(know,index3) in val.data" :key="index3">
                          <span class="chlft">{{know.title}}<span class="chline">|</span>资源ID：{{know.sid}} 【{{know.type}}】，{{know.name}} </span>
                          <span class="chrgt" @click="editprojectknow(index)">修改</span>
                          <span class="chrgt" @click="deletedata">删除</span>
                        </div>
                      </div>
                    </draggable>
                  </div>
                </draggable>
              </div>

            </draggable>
          </div>
        </draggable> -->



        <template v-if="coursesylllevel == 4">
          层级4
          <draggable v-model="tabledata" element="div">
            <div v-for="(rev,index) in tabledata" :key="index">
              <div class="chaptit">
                <span class="chlft" :ref="'sid'+rev.id">{{rev.name}}</span>
                <span class="chrgt" @click="editproject(rev.id)">修改</span>
                <span class="chrgt" @click="deleteproject(rev.id)">删除</span>
                <span class="chrgt1" @click="addproject(rev.id)">增加子目录</span>
              </div>

              <draggable v-model="rev.data" element="div">
                <div v-for="(chap,index1) in rev.data" :key="index1">
                  <div class="chaptit chapsecd">
                    <span class="chlft" :ref="'sid'+chap.id">{{chap.name}}</span>
                    <span class="chrgt" @click="editproject(chap.id)">修改</span>
                    <span class="chrgt" @click="deleteproject(chap.id)">删除</span>
                    <span class="chrgt1" @click="addproject(chap.id)">增加子目录</span>
                  </div>

                  <draggable v-model="chap.data" element="div">
                    <div v-for="(val,index2) in chap.data" :key="index2">
                      <div class="knowledge">
                        <span class="chlft"><i></i><span :ref="'sid'+val.id">{{val.name}}</span></span>
                        <span class="chrgt" @click="editproject(val.id)">修改</span>
                        <span class="chrgt" @click="deleteproject(val.id)">删除</span>
                        <span class="chrgt1 yellow" @click="dialogFormVisible = true">新增资源</span>
                      </div>
                      <draggable v-model="val.data" element="div">
                        <div class="resourcebox">
                          <div class="knowledge" v-for="(know,index3) in val.data" :key="index3">
                            <span class="chlft">{{know.title}}<span class="chline">|</span>资源ID：{{know.sid}} 【{{know.type}}】，{{know.name}} </span>
                            <span class="chrgt" @click="editprojectknow(index)">修改</span>
                            <span class="chrgt" @click="deletedata">删除</span>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </draggable>
                </div>

              </draggable>
            </div>
          </draggable>
        </template>
        <template v-if="coursesylllevel == 3">
          层级3
          <draggable v-model="tabledata" element="div">
            <div v-for="(rev,index) in tabledata" :key="index">
              <div class="chaptit">
                <span class="chlft" :ref="'sid'+rev.id">{{rev.name}}</span>
                <span class="chrgt" @click="editproject(rev.id)">修改</span>
                <span class="chrgt" @click="deleteproject(rev.id)">删除</span>
                <span class="chrgt1" @click="addproject(rev.id)">增加子目录</span>
              </div>

              <draggable v-model="rev.data" element="div">
                <div v-for="(chap,index1) in rev.data" :key="index1">
                  <div class="chaptit chapsecd">
                    <span class="chlft" :ref="'sid'+chap.id">{{chap.name}}</span>
                    <span class="chrgt" @click="editproject(chap.id)">修改</span>
                    <span class="chrgt" @click="deleteproject(chap.id)">删除</span>
                    <span class="chrgt1" @click="addproject(chap.id)">增加子目录</span>
                  </div>

                  <draggable v-model="chap.data" element="div">
                    <div v-for="(val,index2) in chap.data" :key="index2">
                      <div class="knowledge">
                        <span class="chlft"><i></i><span :ref="'sid'+val.id">{{val.name}}</span></span>
                        <span class="chrgt" @click="editproject(val.id)">修改</span>
                        <span class="chrgt" @click="deleteproject(val.id)">删除</span>
                        <span class="chrgt1 yellow" @click="dialogFormVisible = true">新增资源</span>
                      </div>
                      <draggable v-model="val.data" element="div">
                        <div class="resourcebox">
                          <div class="knowledge" v-for="(know,index3) in val.data" :key="index3">
                            <span class="chlft">{{know.title}}<span class="chline">|</span>资源ID：{{know.sid}} 【{{know.type}}】，{{know.name}} </span>
                            <span class="chrgt" @click="editprojectknow(index)">修改</span>
                            <span class="chrgt" @click="deletedata">删除</span>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </draggable>
                </div>

              </draggable>
            </div>
          </draggable>
        </template>
        <template v-if="coursesylllevel == 2">
          层级2
          <draggable v-model="tabledata" element="div">
            <div v-for="(rev,index) in tabledata" :key="index">
              <div class="chaptit">
                <span class="chlft" :ref="'sid'+rev.id">{{rev.name}}</span>
                <span class="chrgt" @click="editproject(rev.id)">修改</span>
                <span class="chrgt" @click="deleteproject(rev.id)">删除</span>
                <span class="chrgt1" @click="addproject(rev.id)">增加子目录</span>
              </div>

              <draggable v-model="rev.data" element="div">
                <div v-for="(chap,index1) in rev.data" :key="index1">
                  <div class="chaptit chapsecd">
                    <span class="chlft" :ref="'sid'+chap.id">{{chap.name}}</span>
                    <span class="chrgt" @click="editproject(chap.id)">修改</span>
                    <span class="chrgt" @click="deleteproject(chap.id)">删除</span>
                    <span class="chrgt1" @click="addproject(chap.id)">增加子目录</span>
                  </div>

                  <draggable v-model="chap.data" element="div">
                    <div v-for="(val,index2) in chap.data" :key="index2">
                      <div class="knowledge">
                        <span class="chlft"><i></i><span :ref="'sid'+val.id">{{val.name}}</span></span>
                        <span class="chrgt" @click="editproject(val.id)">修改</span>
                        <span class="chrgt" @click="deleteproject(val.id)">删除</span>
                        <span class="chrgt1 yellow" @click="dialogFormVisible = true">新增资源</span>
                      </div>
                      <draggable v-model="val.data" element="div">
                        <div class="resourcebox">
                          <div class="knowledge" v-for="(know,index3) in val.data" :key="index3">
                            <span class="chlft">{{know.title}}<span class="chline">|</span>资源ID：{{know.sid}} 【{{know.type}}】，{{know.name}} </span>
                            <span class="chrgt" @click="editprojectknow(index)">修改</span>
                            <span class="chrgt" @click="deletedata">删除</span>
                          </div>
                        </div>
                      </draggable>
                    </div>
                  </draggable>
                </div>

              </draggable>
            </div>
          </draggable>
        </template>
        <div class="chaptit additem"><span @click="addbig">新增一级大纲目录</span></div>
      </div>
    </div>

    <!-- <el-button @click="dialogFormVisible = true" type="primary" size="small">新建一个课程大纲</el-button> -->
    <el-dialog title="选择学习资源" class="tabplane" :visible.sync="dialogFormVisible">
      <el-col v-for="item in progressText" :key="item.text" :sm="8">
        <div class="order-progress-bar">
          <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
          <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
          <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
        </div>
      </el-col>
      <el-form :model="ruleForms" :rules="rules" ref="ruleForms" v-show="module1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="name">
          <el-input class="coursetxt" v-model="ruleForms.name"></el-input>
        </el-form-item>
        <el-form-item label="性质标签" prop="region">
          <el-radio-group v-model="radio1">
            <el-radio :label="1">不显示标签</el-radio>
            <el-radio :label="2">必修</el-radio>
            <el-radio :label="3">选修</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="环节标签" prop="region">
          <el-radio-group v-model="radio2">
            <el-radio :label="4">不显示标签</el-radio>
            <el-radio :label="5">课前</el-radio>
            <el-radio :label="6">课中</el-radio>
            <el-radio :label="7">课后</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="coursebtn">
          <!-- <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button> -->
          <el-button style="margin-top:12px;" v-show="nextclk" @click="submitForm('ruleForms')">下一步</el-button>
          <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
          <!-- <el-button type="primary" @click="submitForm('ruleForms')">确 定</el-button> -->
        </el-form-item>
      </el-form>
      <el-form label-width="100px" v-show="module2" class="demo-ruleForm">
        <div class="selectmodel">
          <span :class="[selcurrent === 1 ? 'is-active' : '']" @click="selectclk(1)">视频</span>
          <span :class="[selcurrent === 2 ? 'is-active' : '']" @click="selectclk(2)">讲义</span>
          <span :class="[selcurrent === 3 ? 'is-active' : '']" @click="selectclk(3)">试卷</span>
        </div>
        <el-form-item class="coursebtn">
          <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button>
          <el-button style="margin-top:12px;" v-show="nextclk" @click="submitForm">下一步</el-button>
          <!-- <el-button type="primary" @click="submitForm('ruleForms')">确 定</el-button> -->
        </el-form-item>
      </el-form>
      <div class="rulemodule" v-show="module3">
        <el-input :placeholder="txtcomt" size="small" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width:100%;margin-top:20px;" @selection-change="handleSelectionChange">
          <el-table-column label="资源ID" width="120">
            <template scope="scope">
              <el-radio class="radio" v-model="radio" :label="scope.row.rid"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="资源类型" width="120">            
          </el-table-column>
          <el-table-column prop="cname" label="资源名称" show-overflow-tooltip>            
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template scope="scope">
              <span>查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="coursebtn">
          <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button>
          <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
          <el-button type="primary">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog :title="deleteModule ? '删除课程大纲目录' : '删除已选资源'" class="tabplane" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
      <span>{{deleteModule ? '确定要删除该课程大纲目录吗？删除后，该目录下的子目录及资源关系均将被删除！' : '确定要删除已选择的资源吗？'}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteOK">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog :title="Moduledialog ? bigdislog ? '新增一级大纲目录' : '新增课程大纲子目录' : '修改课程大纲名称'" class="tabplane" :visible.sync="adddialogVisible" size="tiny" :before-close="handleClose">
      <el-form :model="ruleProject" :rules="rulesject" ref="ruleProject" label-width="100px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="name">
          <el-input class="coursetxt" v-model="ruleProject.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="adddialogVisible = false">取 消</el-button>
          <el-button type="primary" v-if="Moduledialog == true" @click="addruleProject('ruleProject')">确 定</el-button>
          <el-button type="primary" v-else @click="updateruleProject('ruleProject')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>
<style>

</style>
<script>
  import Vue from 'vue';
  import draggable from 'vuedraggable';
  import {CourseSyllabusItem} from '../../api/outline.js'

  export default {
    components: {
      draggable,
    },
    data() {
      return {
        active: 0,
        radio:'',
        radio1:1,
        radio2:4,
        tabledata:[{  // 层级4
          id:1,
          name:"第一章  公司战略的基本概念",
          data:[{
            id:2,
            name:"第一节  公司战略的基本概念 菁英",
            data:[{
              id:3,
              name:"导入",
              data:[{
                id:4,
                title:"第一节 章节预习",
                sid:1234,
                type:"视频",
                name:"level1"
              }]
            },{
              id:5,
              name:"前导",
              data:[{
                id:6,
                title:"第二节 章节预习",
                sid:4578,
                type:"练习",
                name:"level3"
              }]
            }]
          }]
        },{
          id:7,
          name:"第一章  公司战略的基本概念2",
          data:[{
            id:8,
            name:"第一节  公司战略的基本概念嘎嘎嘎",
            data:[{
              id:9,
              name:"导入2",
              data:[{
                id:10,
                title:"第一节 章节预习2",
                sid:2542,
                type:"视频",
                name:"level2"
              }]
            }]
          }]
        }],
        progressText: [
          {
            text: '资源设置',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: true
          }, {
            text: '资源类型',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: false
          }, {
            text: '资源选择',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: false
          }
        ],
        ruleForms: {
          name: ''
        },
        ruleProject:{
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '显示名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ]
        },
        rulesject:{
          name: [
            { required: true, message: '显示名称', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ]
        },
        dialogFormVisible: false,
        model1:'视频',
        module1:true,
        module2:false,
        module3:false,
        tableData3: [{
          rid: '7533',
          type: '视频',
          cname: 'ACCA-F3课程 chapter1'
        }, {
          rid: '45677',
          type: '视频',
          cname: 'ACCA-F3课程 chapter1'
        }, {
          rid: '2323',
          type: '视频',
          cname: 'ACCA-F3课程 chapter1'
        }, {
          rid: '23213',
          type: '视频',
          cname: 'ACCA-F3课程 chapter1'
        }, {
          rid: '5645',
          type: '视频',
          cname: 'ACCA-F3课程 chapter1'
        }],
        multipleSelection: [],
        prevclk:false,
        nextclk:true,
        dialogVisible:false,
        adddialogVisible:false,
        Moduledialog:true,
        bigdislog:false,
        deleteModule:true,
        selcurrent:1,
        txtcomt:'请输入视频资源ID / 名称',
        ddd:'',
        indexs:'',
        refname:'',
        coursesylllevel:'',
        coursesyllid:'',
        pid:''
      }
    },
    methods: {
      selectclk(oi){
        console.log(oi);
        this.selcurrent = oi;
      },
      submitForm(formName) {
        if(this.active == 0){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log('submit!');
              if(this.active >= this.progressText.length-1)return;
              this.active++;
              this.progressText[this.active].isCustomerConfirm=true;
              this.showitem();
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }else{
          if(this.active >= this.progressText.length-1)return;
          this.active++;
          this.progressText[this.active].isCustomerConfirm=true;
          this.showitem();
        }

        if(this.selcurrent == 1){
          this.txtcomt = "请输入视频资源ID / 名称"
        }else if(this.selcurrent == 2){
          this.txtcomt = "请输入讲义资源ID / 名称"
        }else if(this.selcurrent == 3){
          this.txtcomt = "请输入试卷资源ID / 名称"
        }
      },
      prev(){
        if(this.active<=0)return
        this.progressText[this.active].isCustomerConfirm=false;
        this.active--;
        console.log(this.active);
        this.showitem();
      },
      showitem(){
        if(this.active == 0){
          this.module1 = true;
          this.module2 = false;
          this.module3 = false;
          this.prevclk = false;
          this.nextclk = true;
        }else if(this.active == 1){
          this.module1 = false;
          this.module2 = true;
          this.module3 = false;
          this.prevclk = true;
          this.nextclk = true;
        }else if(this.active == 2){
          this.module1 = false;
          this.module2 = false;
          this.module3 = true;
          this.prevclk = true;
          this.nextclk = false;
        }
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deletedata(){
        // 弹出资源删除框
        this.dialogVisible = true;
        this.deleteModule = false;
      },
      deleteproject(){
        // 弹出大纲删除框
        this.dialogVisible = true;
        this.deleteModule = true;
      },
      deleteOK(){
        // 删除确定
        this.dialogVisible = false;
      },
      addproject(pid){
        // 新增课程大纲子目录
        this.adddialogVisible = true;
        this.Moduledialog = true;
        this.bigdislog = false;
        this.ruleProject.name = "";
        this.pid = pid;
      },
      addbig(){
        // 新增一级大纲
        this.adddialogVisible = true;
        this.Moduledialog = true;
        this.bigdislog = true;
        this.ruleProject.name = "";
        this.pid = '0';
      },
      addruleProject(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.adddialogVisible = false;
            if(this.Moduledialog != true){
              this.$refs[this.refname][0].innerText = this.ruleProject.name;
            }else{
              this.addbigCourse();
            }
            console.log('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async addbigCourse(){  // 添加大纲目录
        console.log(this.pid);
        let ret = await CourseSyllabusItem({
          title:this.ruleProject.name,
          pid:this.pid,
          // level:this.coursesylllevel,
          course_syllabus_id:this.coursesyllid
        });
        if(ret.status == 0){
          ret.message = "添加成功！";
          this.pid = '0';
        }else{
          ret.message = "添加失败！";
        }
        this.$message({
          message: ret.message,
          type: 'success'
        });
      },
      updateruleProject(){  // 修改大纲目录
        console.log(this.pid);
      },
      editproject(pid){
        // 修改课程大纲名称
        this.refname = 'sid'+pid;
        console.log(this.$refs[this.refname])
        //这个是获取当前revref值，用index来区分当前元素是v-for 产生的数组中的第几个数
        
        this.ruleProject.name = this.$refs[this.refname][0].innerText;
        this.adddialogVisible = true;
        this.Moduledialog = false;
        this.pid = pid;
      },
    },
    computed: {},
    mounted() {

    },
    created() {
      this.coursesyllid = this.$route.params.sid;
      this.coursesylllevel = this.$route.params.level;
    }
  }
</script>