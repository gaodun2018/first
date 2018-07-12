<template>
  <div class="exam-time">
    <el-row class="set-tab-wrapper">
      <el-row class="tab-title">
        本课程是否启用考季管理的功能
      </el-row>
      <el-row class="tab-radio">
        <el-radio-group v-model="isEnabled" @change="handleChange">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">不启用</el-radio>
        </el-radio-group>
      </el-row>
    </el-row>
    <template v-if="isEnabled===1?true:false">
      <el-table :data="seasonList" border style="width: 90%;margin-top: 16px;">
        <el-table-column label="序号" align="center" width="60">
          <template slot-scope="scope">
            <span>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考季ID" width="80" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.season_id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="考季时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.time}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <!-- <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button> -->
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)" style="margin: 0 10px">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="addBox">
        <div @click="addTableData" style="cursor: pointer;display: inline-block;padding: 0 30px;">
          <i class="additem"></i>
          <el-button type="text" class="addBtn">增加一个考季及学习规划设置</el-button>
        </div>
      </div>
    </template>
    <el-dialog :title="isAddSeason?'增加一个考季及学习规划设置':'修改一个考季及学习规划设置'" width="60%" center class="tabplane" top="8%" :visible.sync="dialogVisible"  @close='handleCloseSeasonDialog'>
      <el-steps :active="active" finish-status="finish" simple style="margin-top: -10px;margin-bottom:30px;">
        <el-step :title="item.text" :key="index" v-for="(item,index) in progressText" description=""></el-step>
      </el-steps>
      <!-- 第一步 -->
      <el-form :model="firstAddForm" ref="firstAddForm" v-show="active === 0" @submit.native.prevent label-width="120px" class="el-ruleForm el-first-form">
        <el-form-item label="设置考季时间" prop="dateFormat" :rules="[{required: true,type:'number',message:'考季时间必须要要设置！', trigger: ['change','blur']}]">
          <el-radio-group @change="handleRaidoChange" v-model="firstAddForm.dateFormat">
            <el-radio :label="1">年-月</el-radio>
            <el-radio :label="2">年-月-日</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="firstAddForm.dateFormat === 1" label="" prop="date" :rules="[{required: true,message:'考季时间必须要要设置！', trigger: ['change','blur']}]">
          <el-date-picker v-model="firstAddForm.date" type="month" value-format="yyyy-MM" placeholder="选择考季时间（年-月）">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-show="firstAddForm.dateFormat === 2" label="" prop="date" :rules="[{required: true,message:'考季时间必须要要设置！', trigger: ['change','blur']}]">
          <el-date-picker type="date" placeholder="选择考季时间（年-月-日）" value-format="yyyy-MM-dd" v-model="firstAddForm.date"></el-date-picker>
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button style="margin-top:12px;" @click="firstNextSubmit('firstAddForm')">下一步</el-button>
        </el-form-item>
      </el-form>
      <!-- 第二步 -->
      <el-row v-show="active === 1">
        <el-row>
          <p class="exam-time-form-title">第一次开启确认学员考季的问卷</p>
          <p class="exam-time-form-sub-title">学员开课后首次进入课程</p>
        </el-row>
        <el-form label-width="-12px" :model="secondAddForm" ref="secondAddForm" class="el-ruleForm">
          <el-row style="margin-top:20px;margin-bottom:10px;">
            <p class="exam-time-form-title">第二次开启确认学员考季的问卷</p>
          </el-row>
          <el-form-item label="" prop="date1" :rules="[{ type: 'array', required: true, message: '请选择开启学员考季的问卷的日期', trigger: 'change' }]">
            <el-date-picker v-model="secondAddForm.date1" type="daterange" range-separator="至" start-placeholder="请设置开始时间" value-format="yyyy-MM-dd" end-placeholder="请设置结束时间">
            </el-date-picker>
          </el-form-item>
          <el-row style="margin-top:20px;margin-bottom:10px;">
            <p class="exam-time-form-title">第三次开启确认学员考季的问卷</p>
          </el-row>
          <el-form-item label="" prop="date2" :rules="[{ type: 'array', required: true, message: '请选择开启学员考季的问卷的日期', trigger: 'change' }]">
            <el-date-picker v-model="secondAddForm.date2" type="daterange" range-separator="至" start-placeholder="请设置开始时间" value-format="yyyy-MM-dd" end-placeholder="请设置结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="coursebtn">
            <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
            <el-button style="margin-top:12px;" @click="secondSubmit('secondAddForm')">下一步</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 第三步 -->
      <div class="rulemodule" v-show="active === 2">
        <div class="plan-box">
          <div class="setline"></div>
          <!-- <div class="planwel">
            <span class="icon-plan-rang prompt"></span>
            <div class="plantab promptbox">注意：当您制定，删除或修改了一段学习计划后，该学员看到的学习计划就会发生相应变化。建议您在制定计划前与学员充分沟通！</div>
          </div> -->
          <div class="scroll-content">
            <div class="planwel" v-for="(val,index) in planlist" :key="index">
              <span class="icon-plan-rang"></span>
              <div class="plantab">
                <div class="planmil">
                  <div class="plan-date black_14">{{val.start_time}} 至 {{val.end_time}}</div>
                  <div class="plan-content">
                    学习内容：
                    <template v-for="(ol,index) in val.gradation" class="planref">
                      {{ol.name}}
                      <template v-if="(index+1) != val.gradation.length">，</template>
                    </template>
                  </div>
                  <div class="plan-target" v-if="val.target != ''">
                    学习目标：{{val.target}}
                  </div>
                </div>
                <div class="plan-btns">
                  <span class="deleitd" @click="delplan(val,index)">删除</span>
                  <span class="deleitd" @click="eidtplan(val,index)">修改</span>
                </div>
              </div>
            </div>
          </div>
          <div class="planwel outlinehit">
            <span class="icon-plan-rang"></span>
            <div class="addoutline" @click="handleOpenPlanDialog">
              <span class="addbtn">新增一段学习计划</span>
            </div>
          </div>
        </div>
        <div class="coursebtn" style="text-align:center;">
          <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
          <el-button type="primary" :loading="btnLoading" @click="handleCreateSeason()">确 定</el-button>
        </div>
        <el-dialog width="60%" center class="innerDialog" top="8%" :title="isAddPlan?'新增一段学习计划':'修改学习计划'" :visible.sync="innerVisible" append-to-body :before-close="toClose">
          <el-form :model="planForm" ref="planForm" @submit.native.prevent label-width="140px" class="el-ruleForm">
            <el-form-item label="学习内容" prop="content" :rules="[{ required: true, message: '请选择学习内容', trigger: 'change' }]">
              <el-select v-model="planForm.content" multiple style="width:90%;" placeholder="请选择学习内容">
                <el-option v-for="val in daration_list" :key="val.id" :label="val.name" :value="val.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始时间" prop="date" :rules="[{ type: 'array', required: true, message: '请选择起始时间', trigger: 'change' }]">
              <el-date-picker v-model="planForm.date" type="daterange" range-separator="至" start-placeholder="请设置开始时间" value-format="yyyy-MM-dd" end-placeholder="请设置结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="学习目标(选填)" prop="target" :rules="filter_rules({type:'isAllSpace',maxLength:100})">
              <el-input type="textarea" style="width:90%;" v-model="planForm.target"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('planForm')">重置</el-button>
            <el-button type="primary" :loading="palnBtnLoading" @click="handleSavePlan('planForm')">保 存</el-button>
          </div>
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less">
.exam-time {
  .el-steps {
    padding: 13px 5%;
    line-height: normal;
    .el-step__title {
      font-size: 14px;
    }
  }
  .set-form-item {
    width: 89%;
  }
  .set-form-item .el-form-item__content {
    width: 100%;
  }
  .set-form-item .el-form-item__content .addhandout {
    float: right;
  }
  .el-dialog__body {
    padding-top: 10px;
    .el-first-form {
      .coursebtn {
        margin-top: 180px;
      }
    }
    .exam-time-form-title {
      font-size: 14px;
      font-weight: 700;
      color: #000;
    }
    .exam-time-form-sub-title {
      font-size: 13px;
      color: red;
    }
  }
  .plan-box {
    position: relative;
    .setline {
      position: absolute;
      top: 10px;
      left: 7px;
      bottom: 15px;
      width: 2px;
      background: #35c25e;
      font-size: 0;
    }
    .planwel {
      position: relative;
      padding-left: 30px;
      overflow: hidden;
      .plantab {
        overflow: hidden;
        padding-left: 20px;
        padding-bottom: 14px;
        position: relative;
        &:hover {
          background: #fbfbfb;
        }
        &.promptbox {
          color: #ff802c;
          margin-top: 8px;
          margin-right: 150px;
          &:hover {
            background: none;
          }
        }
      }
      .icon-plan-rang {
        width: 12px;
        height: 12px;
        background: #fff;
        border: 2px solid #35c25e;
        border-radius: 20px;
        position: absolute;
        left: 0;
        top: 10px;
        &.prompt {
          border-color: #f60;
          background: #f60;
        }
      }
      .planmil {
        width: 86%;
        float: left;
        margin-right: 4%;
        .plan-date {
          font-weight: bold;
          margin: 8px 0 0px;
        }
        .plan-target {
          color: #898b92;
          font-size: 14px;
          word-break: break-word;
        }
      }
      .plan-content {
        color: #898b92;
        font-size: 14px;
        word-break: break-word;
      }
    }
    .plan-btns {
      width: 8%;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;
      height: 50px;
      margin: auto;
      .deleitd {
        color: #898b92;
        margin: 0 4px;
        font-size: 12px;
        cursor: pointer;
        display: block;
      }
    }
  }
  .addoutline {
    border: 2px dotted #ebebec;
    background: #fbfbfb;
    padding: 10px 0;
    text-align: center;
    margin-left: 20px;
    cursor: pointer;
  }
  .scroll-content {
    max-height: 460px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 6px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-track {
      border-radius: 3px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #d3d3d3;
    }
  }
  .outlinehit .icon-plan-rang {
    top: 24px !important;
  }
}
.innerDialog {
  .el-dialog {
    height: 580px;
    .el-dialog__body {
      .el-form-item {
        margin-bottom: 36px;
      }
      .el-form-item__label {
        color: #8f9aac;
      }
    }
  }
}
</style>

<script>
import { examTimeProgressText } from "../../common/courseConfig.js";

export default {
  data() {
    return {
      newPlanlist:[],//添加修改后的数组
      planlist: [],
      dialogVisible: false,
      innerVisible: false,
      tableData: [],
      file: [],
      currentIndex: "",
      seasonList: [], //考季列表
      active: 0,
      progressText: examTimeProgressText,
      firstAddForm: {
        dateFormat: 1, //考季日期格式
        date: "" //考季时间
      },
      secondAddForm: {
        date1: "",
        date2: ""
      },
      planForm: {
        content: [],
        date: "",
        target: ""
      },
      isAddSeason: true, //标记是否新增考季
      isAddPlan: true, //标记是否新增学习计划
      btnLoading: false, //按钮loading
      palnBtnLoading: false, //保存计划的loading
      currentPlanIndex: "", //当前修改的计划的索引
      seasonId: "", //当前修改的考季的id
      daration_list:[],//阶段列表
    };
  },
  // watch:{
  //   planlist:function () {
  //     this.planlist.sort(this.compare('start_time'));
  //     console.log(this.planlist,'////////////');
  //     // start_time
  //   }
  // },
  methods: {
    // 修改学习计划框关闭之前
    toClose(){
      if(!this.isAddPlan){
        this.newPlanlist.forEach(o=>{
          this.daration_list.forEach((x,i)=>{
            if(x.id == o.id){
              this.daration_list.splice(i,1);
            }
          })
        })
      }
      this.newPlanlist = [];
      this.innerVisible = false;
    },

    //技术排序
    compare(property) {
      return function(a, b) {
        try {
          var value1 = new Date(a[property]).getTime();
          var value2 = new Date(b[property]).getTime();
        } catch (error) {
          console.log(error);
        }
        return value1 - value2;
      };
    },
    // 保存计划
    handleSavePlan(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 保存在本地
          const { content, target, date } = this.planForm;
          let gradation = new Array();
          content.forEach(id => {
            this.daration_list.forEach((ele,i) => {
              if (ele.id == id) {
                gradation.push(ele);
                this.daration_list.splice(i,1);
              }
            });
          });
          // 是否是新增学习计划
          if (this.isAddPlan) {
            this.planlist.push({
              gradation: gradation,
              target,
              start_time: date[0],
              end_time: date[1]
            });
          } else {
            this.planlist[this.currentPlanIndex] = {
              gradation: gradation,
              target,
              start_time: date[0],
              end_time: date[1]
            };
          }
          this.planlist.sort(this.compare("start_time"));
          this.resetForm("planForm");
          this.innerVisible = false;
        } else {
          return false;
        }
      });
    },
    // 删除学习计划
    delplan(v, i) {
      if(v.gradation != null && v.gradation != undefined){
        v.gradation.forEach(o=>{
          this.daration_list.push(o);
        })
      }
      this.planlist.splice(i, 1);
    },
    // 关闭考季弹层
    handleCloseSeasonDialog(){
      this.getCourseSeasonList();
      // 获取数据
    },
    // 编辑学习计划
    eidtplan(v, i) {
      // 编写方法将修改的数据推回去
      this.newPlanlist = [];
      if(v.gradation != null && v.gradation != undefined){
        v.gradation.forEach(o=>{
          this.daration_list.push(o);
          this.newPlanlist.push(o);
        })
      }
      this.currentPlanIndex = i;
      this.isAddPlan = false;
      const { gradation, plan_id, target, start_time, end_time } = v;
      let date = new Array(2);
      let content = new Array();
      date[0] = start_time;
      date[1] = end_time;
      gradation.forEach((item, index) => {
        content.push(item.id);
      });
      this.planForm = {
        content: content,
        date: date,
        target: target
      };
      this.innerVisible = true;
    },
    // 校验考季时间
    checkSeasonTime(dateForm) {
      let beginTime1 = new Date(dateForm.date1[0]).getTime();
      let endTime1 = new Date(dateForm.date1[1]).getTime();
      let beginTime2 = new Date(dateForm.date2[0]).getTime();
      let endTime2 = new Date(dateForm.date2[1]).getTime();
      if (beginTime1 > endTime1 || beginTime2 > endTime2) {
        return { bool: false, message: "问卷开始时间不可大于结束时间！" };
      }
      let status = beginTime2 - beginTime1;
      let status2;
      if (status > 0) {
        status2 = beginTime2 - endTime1;
        if (status2 > 0) {
          return { bool: true };
        } else {
          return { bool: false, message: "考季问卷时间设置有重叠！" };
        }
      } else {
        return { bool: false, message: "问卷确认时间第二次不可大于第三次！" };
      }
    },
    // 打开新增学习计划的弹层
    handleOpenPlanDialog() {
      this.planForm = {
        content: [],
        date: "",
        target: ""
      };
      this.isAddPlan = true;
      this.innerVisible = true;
    },
    // 创建新增/修改考季
    async handleCreateSeason() {
      let params = {
        course_id: this.course_id, //课程id
        enable: this.isEnabled, //是否启用（0:不启用;1:启用;2:仅启用考季管理）
        time: this.firstAddForm.date, //考季设置时间，  年-月/年-月-日
        time_type: this.firstAddForm.dateFormat, //时间格式：1:（年-月）2:（年-月-日）
        "confirm[second][start_time]": this.secondAddForm.date1[0], //第二次考季问卷确认开始时间
        "confirm[second][end_time]": this.secondAddForm.date1[1], //第二次考季问卷确认结束时间
        "confirm[third][start_time]": this.secondAddForm.date2[0], //第三次考季问卷确认开始时间
        "confirm[third][end_time]": this.secondAddForm.date2[1] //第三次考季问卷确认结束时间
      };
      if (
        this.planlist == null ||
        this.planlist == undefined ||
        this.planlist == "" ||
        this.planlist.length === 0
      ) {
        this.$message({
          message: "请新增一段学习计划！",
          type: "warning"
        });
        return;
      }
      this.planlist.forEach((val, index) => {
        let gradation = val.gradation;
        let content = [];
        gradation.forEach(item => {
          //  = item.id;
          content.push(item.id);
        });
        params[`plan[${index}][content][]`] = content;
        params[`plan[${index}][start_time]`] = val.start_time;
        params[`plan[${index}][end_time]`] = val.end_time;
        params[`plan[${index}][target]`] = val.target;
      });
      let ret;
      if (this.isAddSeason) {
        this.btnLoading = true;
        ret = await this.$http.createSeason(params);
      } else {
        let seasonId = this.seasonId;
        this.btnLoading = true;
        ret = await this.$http.updateSeason(seasonId, params);
      }

      this.btnLoading = false;
      if (ret.status === 0) {
        this.$message({
          message: this.isAddSeason ? "新增考季成功！" : "修改考季成功！",
          type: "success"
        });
        this.dialogVisible = false;
      } else {
        this.$message({
          message: this.isAddSeason
            ? "新增考季失败:" + ret.message
            : "修改考季失败:" + ret.message,
          type: "error"
        });
      }
    },
    handleRaidoChange(r) {
      this.firstAddForm.date = ""; //清除日期
    },
    //第一步往下一步
    firstNextSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.active >= this.progressText.length - 1) return;
          this.active++;
        } else {
          return false;
        }
      });
    },
    //第二步往下一步
    secondSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ret = this.checkSeasonTime(this.secondAddForm);
          if (!ret.bool) {
            return this.$message({
              message: ret.message,
              type: "error"
            });
          }
          if (this.active >= this.progressText.length - 1) return;
          this.active++;
        } else {
          return false;
        }
      });
    },
    prev() {
      if (this.active <= 0) return;
      this.active--;
    },
    handleChange(value) {
      this.SetCourseDisable();
    },
    // 设置讲义模块的启用
    async SetCourseDisable() {
      let cource_id = this.course_id;
      let params = {
        setting_value: this.isEnabled, //是否启用，0:不启用，1:启用
        setting_key: "season_manage_open" //启用键值，prefix:前导阶段；mock:模考阶段；classroom:翻转课堂；review:特殊复习阶段;knowledge_recommend:知识点判断推荐；knowledge_syllabus:知识骨牌;gaodun_course_id:高顿关联课程id;classroom_pk_open:班级pk；handout_download_open：讲义下载；study_record_open：学习记录；course_syllabus_open：课程大纲；glive_open：glive开关；season_manage_open ：考季开关
      };
      let ret = await this.$http.SetCourseDisable(cource_id, params);
      if (ret.status === 0) {
        this.$message({
          message: this.isEnabled === 0 ? "关闭考季成功" : "启用考季成功！",
          type: "success"
        });
      } else {
        this.$message({
          message: this.isEnabled === 0 ? "关闭考季失败" : "启用考季失败！",
          type: "error"
        });
        this.isEnabled = this.isEnabled === 1 ? 0 : 1;
      }
    },
    // //获取考季列表
    async getCourseSeasonList() {
      let course_id = this.course_id;
      let ret = await this.$http.getSeasonList(course_id);
      if (ret.status === 0) {
        this.seasonList = ret.result.list;
        this.$store.dispatch("getSeasonList", ret.result.list);
      }
    },
    //删除考季确认
    handleDelete(index, row) {
      this.$confirm("此操作将删除该考季, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.DeleteSeason(row.season_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除考季
    async DeleteSeason(id) {
      let ret = await this.$http.deleteSeason(id);
      if (ret.status === 0) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      } else {
        ret.message ? ret.message : "删除失败！";
        this.$message.error(ret.message);
      }
    },
    // //新增数据
    async addTableData() {
     let res = await this.$http.getNewSeason(this.$route.params.cid)
      if(res.status === 0){
        this.daration_list = res.result;
      }else {
        this.$message({
          message: '获取考季信息失败',
          type: 'warning'
        });
        return
      }
      this.firstAddForm = {
        dateFormat: 1, //考季日期格式
        date: "" //考季时间
      };
      this.secondAddForm = {
        date1: "",
        date2: ""
      };
      this.planlist = [];
      this.isAddSeason = true;
      this.active = 0;
      this.dialogVisible = true;
    },
    // //编辑数据按钮
    async handleEdit(index, row) {
      let params = {
        season_id:row.season_id
      }
      let ret = await this.$http.getNewSeason(this.$route.params.cid,params);
      if(ret.status === 0){
        this.daration_list = ret.result;
      } else {
          this.$message({
            message: '获取考季信息失败',
            type: 'warning'
          });
          return ;
      }

      let item = row;
      this.active = 0;
      this.seasonId = row.season_id; //考季id
      this.isAddSeason = false;
      this.firstAddForm.dateFormat = parseInt(item.time_type); //考季日期格式
      this.firstAddForm.date = item.time; //考季时间
      try {
        this.secondAddForm = {
          date1: [
            item.confirm[0].cycle.start_time,
            item.confirm[0].cycle.end_time
          ],
          date2: [
            item.confirm[1].cycle.start_time,
            item.confirm[1].cycle.end_time
          ]
        };
      } catch (error) {
        this.secondAddForm = {
          date1: "",
          date2: ""
        };
      }
      this.planlist = item.plan;

      // 天加修改数组的方法
      let arr = [];
      if(this.planlist != null && this.planlist != undefined){
        this.planlist.forEach(o=>{
          if(o.gradation != null && o.gradation != undefined){
            o.gradation.forEach(x=>{
              arr.push(x)
            })
          }
        })
      }
      arr.forEach(o=>{
        if(this.daration_list != null && this.daration_list != undefined){
          this.daration_list.forEach((x,i)=>{
            if(x.id == o.id){
              this.daration_list.splice(i,1);
            }
          })
        }
      })
      console.log(this.planlist);
      console.log('这时候的考季数据', this.daration_list);

      this.currentIndex = index;
      this.dialogVisible = true;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    course_id() {
      return this.$route.params.cid;
    },
    // daration_list() {
    //   return this.$store.state.course.course_daration_list;
    // },
    isEnabled: {
      get() {
        return this.$store.state.course.course_disable.season_manage_open;
      },
      set(v) {
        let data = {};
        data.season_manage_open = v;
        this.$store.dispatch("courseDisable", data);
      }
    }
  },
  mounted() {
    // Vue.$on('uploadFile', (res, fileList) => {
    // })
  },
  created() {
    // this.GetCourseDisable();
    this.getCourseSeasonList();
  }
};
</script>
