<template>
  <div class="module-edu-content permission-outlinemodule">
    <div class="outlineeat">
      课程大纲：CFA持证无忧Level1 - 2018年6月 - 基础精讲<span class="eaticon"></span>
    </div>
    <div class="outlinebox">
      <div class="chapterbox">

        <template v-if="coursesylllevel == 3">
          <draggable v-model="tabledata" element="div">
            <div v-for="(firstItem,index) in tabledata" :key="firstItem.id">
              <div class="chaptit">
                <span class="chlft">第{{(index+1) | Arab2Chn}}章 {{firstItem.name}}</span>
                <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
                <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
                <span class="chrgt1" @click="openChildDialog(firstItem.id)">增加子目录</span>
              </div>

              <draggable v-model="firstItem.children" element="div">
                <div v-for="(secItem,index1) in firstItem.children" :key="secItem.id">
                  <div class="chaptit chapsecd">
                    <span class="chlft">第{{(index+1) | Arab2Chn}}节 {{secItem.name}}</span>
                    <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                    <span class="chrgt" @click="openDelOutlineDialog(secItem.id)">删除</span>
                    <span class="chrgt1 yellow" @click="openAddResDialog(thirdItem.id)">新增资源</span>
                  </div>

                  <draggable v-model="secItem.children" element="div">
                    <div class="resourcebox" v-for="(thirdItem,index3) in secItem.children" :key="thirdItem.id">
                      <div class="knowledge">
                        <span class="chlft">{{thirdItem.name}}<span class="chline">|</span>资源ID：{{thirdItem.sid}} 【{{thirdItem.type}}】，{{thirdItem.name}} </span>
                        <span class="chrgt" @click="editprojectknow(thirdItem.id,thirdItem.name)">修改</span>
                        <span class="chrgt" @click="openDelResDialog">删除</span>
                      </div>
                    </div>
                  </draggable>


                </div>

              </draggable>
            </div>
          </draggable>
        </template>

        <template v-if="coursesylllevel == 4">
          <draggable v-model="tabledata" element="div">
            <div v-for="(firstItem,index) in tabledata" :key="firstItem.id">
              <div class="chaptit">
                <span class="chlft">第{{(index+1) | Arab2Chn}}章 {{firstItem.name}}</span>
                <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
                <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
                <span class="chrgt1" @click="openChildDialog(firstItem.id)">增加子目录</span>
              </div>

              <draggable v-model="firstItem.children" element="div">
                <div v-for="(secItem,index) in firstItem.children" :key="secItem.id">
                  <div class="chaptit chapsecd">
                    <span class="chlft">第{{(index+1) | Arab2Chn}}节 {{secItem.name}}</span>
                    <span class="chrgt" @click="editproject(secItem.id,secItem.name)">修改</span>
                    <span class="chrgt" @click="openDelOutlineDialog(secItem.id)">删除</span>
                    <span class="chrgt1" @click="openChildDialog(secItem.id)">增加子目录</span>
                  </div>

                  <draggable v-model="secItem.children" element="div">
                    <div v-for="(thirdItem,index2) in secItem.children" :key="thirdItem.id">
                      <div class="knowledge">
                        <span class="chlft"><i></i><span>{{thirdItem.name}}</span></span>
                        <span class="chrgt" @click="editproject(thirdItem.id,thirdItem.name)">修改</span>
                        <span class="chrgt" @click="openDelOutlineDialog(thirdItem.id)">删除</span>
                        <span class="chrgt1 yellow" @click="openAddResDialog(thirdItem.id)">新增资源</span>
                      </div>
                      <draggable v-model="thirdItem.children" element="div">
                        <div class="resourcebox" v-for="(fourthItem,index3) in thirdItem.children" :key="fourthItem.id">
                          <div class="knowledge">
                            <span class="chlft">{{fourthItem.name}}<span class="chline">|</span>资源ID：{{fourthItem.sid}} 【{{fourthItem.type}}】，{{fourthItem.name}} </span>
                            <span class="chrgt" @click="editprojectknow(fourthItem.id,fourthItem.name)">修改</span>
                            <span class="chrgt" @click="openDelResDialog">删除</span>
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
          <draggable v-model="tabledata" element="div">
            <div v-for="(firstItem,index) in tabledata" :key="firstItem.id">
              <div class="chaptit">
                <span class="chlft">第{{(index+1) | Arab2Chn}}节 {{firstItem.name}}</span>
                <span class="chrgt" @click="editproject(firstItem.id,firstItem.name)">修改</span>
                <span class="chrgt" @click="openDelOutlineDialog(firstItem.id)">删除</span>
                <span class="chrgt1 yellow" @click="openAddResDialog(firstItem.id)">新增资源</span>
              </div>
              <draggable v-model="firstItem.children" element="div">
                <div class="resourcebox" v-for="(secItem,index3) in firstItem.children" :key="secItem.id">
                  <div class="knowledge">
                    <span class="chlft">{{secItem.name}}<span class="chline">|</span>资源ID：{{secItem.sid}} 【{{secItem.type}}】，{{secItem.name}} </span>
                    <span class="chrgt" @click="editprojectknow(secItem.id,secItem.name)">修改</span>
                    <span class="chrgt" @click="openDelResDialog">删除</span>
                  </div>
                </div>
              </draggable>
            </div>
          </draggable>
        </template>
        <div class="chaptit additem"><span @click="openFirLvDialog">新增一级大纲目录</span></div>
      </div>
    </div>

    <!-- -----------------弹层---------------- -->

    <el-dialog title="选择学习资源" class="tabplane addResourceDialog" :visible.sync="dialogFormVisible">
      <el-col v-for="item in progressText" :key="item.text" :sm="8">
        <div class="order-progress-bar">
          <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
          <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
          <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
        </div>
      </el-col>
      <!-- ----------第一步----------- -->
      <el-form :model="addResFirFrom" ref="addResFirFrom" v-show="module1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:1000})">
          <el-input class="coursetxt" v-model="addResFirFrom.name"></el-input>
        </el-form-item>
        <!--标签-->
        <!--<el-form-item label="性质标签" prop="region">
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
        </el-form-item>-->
        <el-form-item class="coursebtn">
          <!-- <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button> -->
          <!--<el-button style="margin-top:12px;" v-show="nextclk" @click="submitForm('addResFirFrom')">下一步</el-button>-->
          <el-button style="margin-top:12px;" @click="firstNextSubmit('addResFirFrom')">下一步</el-button>
          <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
          <!-- <el-button type="primary" @click="submitForm('addResFirFrom')">确 定</el-button> -->
        </el-form-item>
      </el-form>
      <!-- -----------第二步---------- -->
      <el-form label-width="100px" v-show="module2" class="demo-ruleForm">
        <div class="selectmodel">
          <span :class="[selcurrent === 1 ? 'is-active' : '']" @click="selectclk(1)" v-for="(item,index) in resourceTypeList" :key="index">{{item.label}}</span>


<!--
          <span :class="[selcurrent === 1 ? 'is-active' : '']" @click="selectclk(1)">视频</span>
          <span :class="[selcurrent === 2 ? 'is-active' : '']" @click="selectclk(2)">讲义</span>
          <span :class="[selcurrent === 3 ? 'is-active' : '']" @click="selectclk(3)">试卷</span>-->
        </div>
        <el-form-item class="coursebtn">
          <el-button style="margin-top:12px;" v-show="prevclk" @click="prev">上一步</el-button>
          <el-button style="margin-top:12px;" v-show="nextclk" @click="submitForm">下一步</el-button>
          <!-- <el-button type="primary" @click="submitForm('addResFirFrom')">确 定</el-button> -->
        </el-form-item>
      </el-form>
      <!-- -----------第三步---------- -->
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
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog :title="Moduledialog ? bigdislog ? '新增一级大纲目录' : '新增课程大纲子目录' : '修改课程大纲名称'" class="tabplane" :visible.sync="adddialogVisible" size="tiny" :before-close="handleClose">
      <el-form :model="ruleProject" ref="ruleProject" label-width="100px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
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
  import {CourseSyllabusItem,ChangeSyllabusItem} from '../../api/fromAxios'
  import {getSyllabusItems,checkSyllabus,DeleteSyllabusItem} from '../../api/outline'
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
        tabledata:[],
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
        addResFirFrom: {
          name: ''
        },
        ruleProject:{
          name: ''
        },
        dialogFormVisible: false,
        model1:'视频',
        module1:true,
        module2:false,
        module3:false,
        tableData3: [
          {
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
        adddialogVisible:false,    //新增和修改大纲目录的弹层
        Moduledialog:true,    //增加子目录的弹层的标题
        bigdislog:false,
        deleteModule:true,
        selcurrent:1,
        txtcomt:'请输入视频资源ID / 名称',
        ddd:'',
        indexs:'',
        refname:'',
        coursesylllevel:'',
        coursesyllid:'',
        pid:'0',    //0 是最外层父级大纲
        resourceTypeList:[
          {
            "discriminator": "video",
            "label": "视频"
          },
          {
            "discriminator": "lecture_note",
            "label": "讲义"
          },
          {
            "discriminator": "paper",
            "label": "试卷"
          },
          {
            "discriminator": "question",
            "label": "题目"
          },
          {
            "discriminator": "live",
            "label": "直播"
          }
        ],
      }
    },
    methods: {
      selectclk(oi){
        console.log(oi);
        this.selcurrent = oi;
      },
      //打开新增资源的弹层
      openAddResDialog(id){
        this.pid = id;
        this.dialogFormVisible = true;
      },
      firstNextSubmit(formName){
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            console.log(this.pid);
            let ret = await CourseSyllabusItem({
              name:this.addResFirFrom.name,
              pid:this.pid,
              course_syllabus_id:this.coursesyllid
            });
            if(ret.status == 0){
              if(this.active >= this.progressText.length-1)return;
              this.active++;
              this.progressText[this.active].isCustomerConfirm=true;
              this.showitem();
              this.getSyllabusItems();
            }
          } else {
            return false;
          }
        });
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
      // 弹出资源删除框
      openDelResDialog(id){
        this.pid = id;
        this.dialogVisible = true;
        this.deleteModule = false;
      },
      // 弹出大纲删除框
      openDelOutlineDialog(id){
        this.pid = id;
        this.dialogVisible = true;
        this.deleteModule = true;
      },
      // 删除确定
      async confirmDelete(){
        let id = this.pid;
        let ret = await DeleteSyllabusItem(id);
        console.log(ret);
        if(ret.status == 0){
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getSyllabusItems();
        }else{

        }
        this.dialogVisible = false;
      },
      // 新增课程大纲子目录的弹层
      openChildDialog(pid){
        this.adddialogVisible = true;
        this.Moduledialog = true;
        this.bigdislog = false;
        this.ruleProject.name = "";
        this.pid = pid;     //父级大纲条目id
      },
      // 新增一级大纲的弹层
      openFirLvDialog(){
        this.adddialogVisible = true;
        this.Moduledialog = true;
        this.bigdislog = true;
        this.ruleProject.name = "";
        this.pid = '0';
      },
      //确定增加一个子目录
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
      // 添加大纲目录
      async addbigCourse(){
        let ret = await CourseSyllabusItem({
          name:this.ruleProject.name,
          pid:this.pid,
//          level:this.coursesylllevel,
          course_syllabus_id:this.coursesyllid
        });
        if(ret.status == 0){
          ret.message = "添加成功！";
          this.pid = '0';
          this.getSyllabusItems();
        }else{
          ret.message = "添加失败！";
        }
        this.$message({
          message: ret.message,
          type: 'success'
        });
      },
      // 修改大纲目录
      async updateruleProject(){
        let id = this.pid;
        let name = {
          name:this.ruleProject.name
        };
        let ret = await ChangeSyllabusItem(id,name);
        console.log(ret);
        if(ret.status == 0){
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.adddialogVisible = false;
          this.getSyllabusItems();
        }else{
          this.$message.error('修改失败！')
        }
      },
      // 弹出修改课程大纲名称的弹层
      editproject(pid,name){
        console.log(pid,name);
        this.pid = pid;
        this.ruleProject.name = name;
        this.adddialogVisible = true;
        this.Moduledialog = false;
      },
      //拉取这个大纲的条目
      async getSyllabusItems(){
        let course_syllabus_id = {
          course_syllabus_id:this.coursesyllid
        };
        let ret = await getSyllabusItems(course_syllabus_id);
        if(ret.status == 0){
          this.tabledata = ret.result;
        }
        console.log(ret);
      },
      //查看大纲的详情
      async checkSyllabus(){
        let ret = await checkSyllabus(this.coursesyllid);
        console.log(ret);
        if(ret.status == 0){
          this.coursesylllevel = ret.result.template.level_max;    //大纲的层级
          console.log(this.coursesylllevel,'大纲的层级');
        }
      }
    },
    computed: {},
    mounted() {

    },
    created() {
      this.coursesyllid = this.$route.params.sid;
      this.getSyllabusItems();
      this.checkSyllabus();
    }
  }
</script>