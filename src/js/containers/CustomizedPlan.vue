<template>
  <div class="customized" v-title data-title="EP课程学习数据统计">
    <div class="student-header headbar">
      <div class="w_1140 p_t_36 clear ">
        <div class="student-head_l head_l">
          <p class="white_12 stu_cou_group" style="letter-spacing:1px;">{{classDetail.course_name}}</p>
          <p class="student_tit white_24">
            <!--<router-link class="studentName white_24" :to="'/studentHome/'+StudentID" target="_blank" tag="a">{{$store.state.studydata.student_statics.name}}</router-link>-->
            <span class="studentName white_24" show-overflow-tooltip="true">{{classDetail.class_name}}</span>
            <!-- <el-tooltip placement="top" class="studentName white_24">
              <div slot="content">{{classDetail.class_name}}</div>
              <el-button show-overflow-tooltip="true">{{classDetail.class_name}}</el-button>
            </el-tooltip>
 -->
          </p>
        </div>

      </div>
    </div>
    <div class="tabmenu">
      <div class="w_1140">
        <div class="tabs">
          <div class="tabs_nav">
            <div class="tabs_item is-active">制定班级学习计划</div>
            <div class="tabs_item">
              <router-link :to="'/choosePlan/'+course_id+'/'+class_id">为学员选择学习计划</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="addPlanbox">
      <div class="w_1140 clear">
        <el-tabs v-model="classPlanTabValue" type="card" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in classPlanTab"
            :key="item.id"
            :label="item.name"
            :name="item.id"
          >
          </el-tab-pane>
        </el-tabs>
        <el-button type="primary" icon="plus" class="addPlanbtn" @click="addTab(editableTabsValue2)">新建一套班级标杆
        </el-button>
      </div>

    </div>
    <!--新建一套班级标杆弹层-->
    <el-dialog title="新建一套班级标杆" :visible.sync="dialogFormVisible" @close="resetForm('ruleForm')">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="班级标杆名称" prop="name">
          <el-input style="width: 90%;" v-model.trim="form.name" auto-complete="off"
                    @keyup.native.enter="submitTab('ruleForm')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="phaseflag" @click="submitTab('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <div class="stulists_mian" v-loading="TabLoading" element-loading-text="拼命加载中...">
      <div class="w_1140">
        <el-table :data="stagePlandData" :border='false' ref='word' class="stuTableData">
          <el-table-column type="index" label="序号" width="70">
          </el-table-column>
          <el-table-column prop="start_time" label="阶段开始时间" width="130">
          </el-table-column>
          <el-table-column prop="end_time" label="阶段结束时间" width="130">
          </el-table-column>
          <el-table-column prop="phase" label="阶段学习内容" width="360" show-overflow-tooltip="true">
            <template scope="scope">
              <span v-for="(item,index) in scope.row.phase" :key="index">
                <span v-for="(itemk,index) in item.item" :key="index">{{item.type}} - {{itemk.name}}，</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="target" label="阶段学习目标" width="300" show-overflow-tooltip="true">
            <template scope="scope">
              <div class="custarrow">{{scope.row.target}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text" class="removebtn" @click="deletePlanPhase(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" class="editbtn" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="addstagebox" v-show="classPlanTab.length!=0">
          <div class="addstagebtn" @click="addstagebtn">
            <i class="el-icon-plus"></i>
            <el-button type="text">新增一个阶段学习计划</el-button>
          </div>
        </div>
      </div>
    </div>

    <!--新增时间段计划-->
    <el-dialog title="新增一个阶段学习计划" class="plandialog" :visible.sync="dialogVisible" @close="resetForm('phaseForm')" top="10%" modal-append-to-body="true">
      <el-row class="progressBox">
        <el-col v-for="item in progressText" :key="item.text" :sm="12">
          <div class="order-progress-bar">
            <i class="progress-bar-line" :class="item.isCustomerConfirm ? item.currentLine : ''"></i>
            <i class="progress-bar-dot" :class="item.isCustomerConfirm ? item.currentDot : ''"></i>
            <span :class="item.isCustomerConfirm ? item.currentText : ''">{{item.text}}</span>
          </div>
        </el-col>
      </el-row>
      <el-form v-show="active==0" :model="phaseForm" :rules="phaserules" ref="phaseForm" label-width="80px"
               style="margin-top: 30px;">

        <el-form-item label="开始时间" prop="start_time" style="display: inline-block;width: 49%;">
          <el-date-picker v-model="phaseForm.start_time" format="yyyy-MM-dd" type="date"
                          placeholder="选择开始时间" :picker-options="pickerBeginDateBefore"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time" style="display: inline-block;width: 49%;">
          <el-date-picker v-model="phaseForm.end_time" format="yyyy-MM-dd" type="date"
                          placeholder="选择结束时间" :picker-options="pickerBeginDateAfter"></el-date-picker>
        </el-form-item>
        <el-form-item label="阶段学习目标（选填）" prop="target" class="fromtxt">
          <el-input v-model="phaseForm.target" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right;margin-right: 10px;">
          <el-button @click="next('phaseForm')">下一步</el-button>
        </el-form-item>
      </el-form>

      <div class="choose-resourse" v-show="active==1">
        <div class="selected">
          <span style="float: left;">已选择：</span>
          <span v-for="item in CheckedList" class="checkeditem">{{item}}</span>
        </div>
        <div class="resourcebox">
          <el-checkbox-group v-model="checkList" :min="1" @change="handleCheckedCitiesChange">
            <div v-for="(item,index) in gradations" :key="item.id">
              <div class="resourcetit">
                <p>{{item.title}}</p>
              </div>
              <div class="checkbox">
                <el-checkbox :label="item.syllabus.id+'#'+itemk.id" v-for="(itemk,index) in item.syllabus.contents">{{itemk.title}}
                </el-checkbox>
              </div>
            </div>
            <div v-if="mocks.length!=0">
              <div class="resourcetit">
                <p>{{mockstitle}}</p>
              </div>
              <div class="checkbox">
                <el-checkbox :label="'0#'+item.mock.id" v-for="(item,index) in mocks">{{item.mock.title}}
                </el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
        </div>
        <div class="choose-footer">
          <el-button @click="prev">上一步</el-button>
          <el-button type="primary" :disabled="plandib" @click="changePhase">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>

</template>
<script>
  import {getClassPlanDetail, deleteClassPlan, getCourseOutline, deletePlanPhase} from '../api/plan'
  import {addClassPlan, changePhase} from '../api/fromAxios'
  import {format} from '../util/util'
  export default {
    components: {},
    data(){
      return {
        active: 0,    //新增阶段的进度
        checkList: [],  //已选择的章节的id
        CheckedList: [],  //已选的章节的名字
        CheckedIdList: [],  //已选的章节的阶段-id值
        progressText: [
          {
            text: '第一步：设置起始时间',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: true
          }, {
            text: '第二步：选择学习内容',
            currentLine: 'bar-line-current',
            currentDot: 'bar-dot-current',
            currentText: 'current-text',
            isCustomerConfirm: false
          }
        ],
        dialogFormVisible: false,
        dialogVisible: false,
        phaseForm: {},
        phaserules: {
          start_time: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          end_time: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
        form: {},
        rules: {
          name: [
            {required: true, message: '请输入班级标杆名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
          ],
        },
        classPlanTabValue: '1',//当前所选标杆计划的id
        classPlanTab: [],
        tabIndex: 2,
        stagePlandData: [],
        classDetail: '',   //班级是详情数据
        gradations: '',  //大纲
        mocks:'',    //模考
        mockstitle:'',    //模考mingzi
        currentIndex: '',
        planphaseId:'',
        Doing:'change',  //标记是新增还是修改
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.phaseForm.end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.phaseForm.start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tabid:'',
        tabname:'',
        phaseflag:false,
        plandib:false,
        TabLoading:true
      }
    },
    // filters: {
    //   capitalize: function (value) {
    //     if (!value) return ''
    //     value = value.toString()
    //     return value.charAt(0).toUpperCase() + value.slice(1)
    //   }
    // },
    computed: {
      course_id(){
        return this.$route.params.cid;  //课程id
      },
      class_id(){
        return this.$route.params.clid;  //班级id
      }
    },
    methods: {
      //增加一个班级标杆
      addTab() {
        this.form = {
          name: ''
        }
        this.dialogFormVisible = true;
      },
      addstagebtn(){
        this.Doing = 'add';
        this.active = 0;
        this.phaseForm = {
          start_time: '',
          end_time: '',
          target: '',
        }
        this.checkList = [];
        this.CheckedList = [];
//        this.CheckedIdList = [];
        this.dialogVisible = true;
      },
      //tab切换标杆计划
      handleClick(tab) {
        this.classPlanTabValue = tab.name;
        this.stagePlandData = this.classPlanTab[Number(tab.index)]['plan']?this.classPlanTab[Number(tab.index)]['plan']['plan_item']:[];

        this.tabname = tab.name;
        this.tabid = tab.index;
      },
      //选择章节按钮时
      handleCheckedCitiesChange(value) {
        console.log(value);
        let Checked = [];
//        let CheckedId = [];
        for (var k = 0; k < value.length; k++) {
          if((/^0#/).test(value[k])){
            for (var m = 0; m < this.mocks.length; m++) {
              if ('0#'+this.mocks[m]['mock']['id'] == value[k]) {
                Checked.push(this.mocks[m]['mock']['title']);
              }
            }
          }else{
            for (var i = 0; i < this.gradations.length; i++) {
              for (var j = 0; j < this.gradations[i]['syllabus']['contents'].length; j++) {
                let syllabus_id = this.gradations[i]['syllabus']['id'];
                let id = this.gradations[i]['syllabus']['contents'][j]['id'];
                if (syllabus_id +'#'+ id == value[k]) {
                  Checked.push(this.gradations[i]['syllabus']['contents'][j]['title']);
                }
              }
            }
          }

        }
        this.CheckedList = [...Checked];
//        this.CheckedIdList = [...CheckedId]
//        console.log(this.CheckedIdList);
      },
      //将时间转换成时间戳
      formatTime(value){
        var d = new Date(value);
        return d;
      },
      //修改阶段计划
      handleEdit(index, row) {
        this.Doing = 'change';
        this.active = 0;
        let checkList = [];
//        let CheckedIdList = [];
        let CheckedList = [];
        let phase = this.stagePlandData[index]['phase'];
        for(var i = 0;i < phase.length; i++){
          let syllabus_id = phase[i]['syllabus_id'];
          let item = phase[i]['item'];
          for(var j = 0;j < item.length; j++){
            checkList.push(syllabus_id + '#' +item[j].id);
            CheckedList.push(item[j].name)
//            CheckedIdList.push(content[i]['title']+'#'+syllabus[j].id);
          }
        }
        this.planphaseId = row.plan_item_id;
        this.phaseForm = {...this.stagePlandData[index]};
        this.phaseForm.start_time = this.formatTime(this.phaseForm.start_time);
        this.phaseForm.end_time = this.formatTime(this.phaseForm.end_time);
        this.checkList = checkList;
        this.CheckedList = CheckedList;
//        this.CheckedIdList = CheckedIdList;
        this.currentIndex = index;
        this.dialogVisible = true;
      },
      //关闭重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      next(formName) {
        if (this.active >= this.progressText.length - 1)return;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.active++;
            this.progressText[this.active].isCustomerConfirm = true;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      prev(){
        if (this.active <= 0)return
        this.progressText[this.active].isCustomerConfirm = false;
        this.active--;
      },
      async getClassPlanDetail(plan_id,tabid){
        let ret = await getClassPlanDetail(this.class_id);
        if (ret.data.status == 0) {
          this.classDetail = ret.data.result.class;
          this.classPlanTab = ret.data.result.plan;
          this.classPlanTabValue = plan_id ? plan_id : ret.data.result.plan.length != 0 && ret.data.result.plan[0]['id'];

          if(plan_id){
            console.log("kkksdsdfsdf")
            this.stagePlandData = this.classPlanTab[Number(tabid)]['plan']?this.classPlanTab[Number(tabid)]['plan']['plan_item']:[];
          }else{
            // this.stagePlandData = ret.data.result.plan.length != 0 && ret.data.result.plan[0]['plan']['plan_item'];
            if(this.classPlanTab && this.classPlanTab.length > 0 && this.classPlanTab[Number(this.tabid)]['plan'] && ret.data.result.plan[0]['plan']['plan_item'].length > 0){
              this.stagePlandData = ret.data.result.plan[0]['plan']['plan_item'];
              //this.CountLoad();
              //this.planshow = true;
            }else{
              //this.planshow = false;
              this.stagePlandData = [];
              console.log("内容为空")
            }
          }
          this.TabLoading = false;
        }
      },
      //新增班级标杆计划表单验证
      submitTab(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let exist = true;
            for(let o of this.classPlanTab){
              if(o.plan_name == this.form.name){
                this.$message.error('此标杆计划名称已存在！');
                exist = false;
                return false;
              }
            }

            if(exist == true){
              console.log("添加成功！");
              this.addClassPlan(this.form.name);
              this.dialogFormVisible = false
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async deleteClassPlan(){
        let ret = await deleteClassPlan('1');
//        console.log(ret);
        /*if(ret.data.status == 0){
         this.classPlanTab = ret.data.result;
         this.classPlanTabValue = ret.data.result.length!=0&&ret.data.result[0]['plan_id'];
         }*/
      },
      ////删除阶段计划
      deletePlanPhase(index, row){
        this.$confirm('此操作将删除该阶段计划, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePlanPhase(row.plan_item_id).then((res) => {
            if (res.data.result == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getClassPlanDetail(this.tabname,this.tabid);
            } else if (res.data.result == 1) {
              this.$message.error('删除失败');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //新增班级标杆计划
      async addClassPlan(planName){
        // let ret = await addClassPlan({
        //   'params[planName]': planName,
        //   'params[classId]': this.class_id,
        // });
        this.phaseflag = true;
        let ret = await addClassPlan({
          'plan_name': planName,
          'class_id': this.class_id,
        });

//        console.log(ret);
        if (ret.status == 0) {
          if (ret.result == 1) {
            this.$message({
              message: '创建成功',
              type: 'success'
            });
            this.getClassPlanDetail();
          } else if (ret.result == 0) {
            this.$message.error('创建失败');
          } else {
            this.$message({
              message: ret.result,
              type: 'warning'
            });
          }
          this.phaseflag = false;
        }
      },
      //增加/修改阶段学习计划
      async changePhase(id){
        this.plandib = true;
        if(this.CheckedList.length > 0){
          let ret = await changePhase({
            'start_time': format(this.phaseForm.start_time),
            'end_time': format(this.phaseForm.end_time),
            'target': this.phaseForm.target,
  //          "data[content][]": this.CheckedIdList,
            "content[]": this.checkList,
            "plan_id": this.classPlanTabValue,
            "class_id": this.class_id,
            "id": this.Doing=='change'?this.planphaseId:'',
          });

          if (ret.status == 0) {
            if (ret.result == 1) {
              this.$message({
                message: this.Doing=='change'?"修改成功":'创建成功',
                type: 'success'
              });
              this.dialogVisible = false;
              this.getClassPlanDetail(this.tabname,this.tabid);
            } else if (ret.result == 0) {
              this.$message.error(this.Doing=='change'?"修改失败":'创建失败');
            } else {
              this.$message({
                message: ret.result,
                type: 'warning'
              });
            }
            this.plandib = false;
          }
        }else{
          this.$message({
            message: "请选择章节",
            type: 'warning'
          });
          this.plandib = false;
        }
      },
      //获取课程大纲
      async getCourseOutline(){
        let url = this.course_id;
        let ret = await getCourseOutline(url);
        if (ret.data.status == 0) {
          if(ret.data.result != false){
            this.gradations = ret.data.result.gradations;
            this.mocks = ret.data.result.mocks;
            this.mockstitle = ret.data.result.mocks&&ret.data.result.mocks.length!=0&&ret.data.result.mocks[0].title;
          }
        }
      }
    },
    created(){
      this.getClassPlanDetail();
      this.getCourseOutline();
    },
    mounted(){
    },

  }
</script>