<template>
  <div class="chooseplan" v-title data-title="EP课程学习数据统计">
    <div class="student-header headbar">
      <div class="w_1140 p_t_36 clear ">
        <div class="student-head_l head_l">
          <p class="white_12 stu_cou_group">{{classDetail.course_name}}</p>
          <p class="student_tit white_24">
            <!--<router-link class="studentName white_24" :to="'/studentHome/'+StudentID" target="_blank" tag="a">{{$store.state.studydata.student_statics.name}}</router-link>-->
            <span class="studentName white_24">{{classDetail.class_name}}</span>
          </p>
        </div>

      </div>
    </div>
    <div class="tabmenu">
      <div class="w_1140">
        <div class="tabs">
          <div class="tabs_nav">
            <div class="tabs_item">
              <router-link :to="'/customizedPlan/'+course_id+'/'+class_id">制定班级学习计划</router-link>
            </div>
            <div class="tabs_item is-active">为学员选择学习计划</div>
          </div>
        </div>
      </div>
    </div>

    <div class="stulists-search">
      <div class="w_1140">
        <el-input placeholder="输入学员ID/手机号/昵称/学员姓名" icon="search" class="inputsearch" v-model="inuptVal"
                  :on-icon-click="handleIconClick" @keydown.native.enter="handleIconClick">
        </el-input>
      </div>
    </div>
    <div class="stulists_mian">
      <div class="w_1140">
        <el-table :data="StudentDataList" :border='false' ref='word' class="stuTableData">
          <el-table-column type="index" label="排序" width="80">
          </el-table-column>
          <el-table-column prop="nick_name" label="学员姓名" width="200">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="200">
          </el-table-column>
          <el-table-column prop="student_id" label="学员ID" width="200">
          </el-table-column>
          <el-table-column prop="plan_name" label="学习计划" width="280" show-overflow-tooltip="true">
            <template scope="scope">
              <div class="custarrow">{{scope.row.plan_name}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="text" class="adjust" @click="adjustPlan(scope.$index, scope.row)">调整学习计划</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="pagination" v-show="pageshow">
      <div class="w_1140">
        <div class="block">
          <el-pagination @current-change="handleCurrentChange"
                         :current-page.sync="currentPage"
                          :page-size="20" layout="total, prev, pager, next, jumper"
                         :total="totalNum">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--调整计划弹层-->
    <el-dialog title="学习计划" :visible.sync="dialogFormVisible" @close="resetForm('ruleForm')">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="选择学习计划" prop="plan_id">
          <el-select v-model="form.plan_id" clearable  placeholder="请选择选择学习计划" style="width: 90%;">
            <el-option v-for="item in planList" :key="item.plan_id" :label="item.plan_name" :value="item.plan_id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
  import {getClassList} from '../api/plan'
  import {changeStudentPlan} from '../api/fromAxios'
  export default {
    components: {},
    data(){
      return {
        dialogFormVisible:false,
        inuptVal: '',
        StudentDataList: [],
        classDetail: [],
        planList: [],
        totalNum: 0,
        currentPage: 1,
        form:{},
        student_id:'',  //当前需要修改的学生的id
        pager:1,
        pageshow:false
      }
    },
    computed: {
      class_id(){
        return this.$route.params.clid;  //班级id
      },
      course_id(){
        return this.$route.params.cid;  //课程id
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleIconClick(){    //输入框搜索
        if (this.inuptVal != "") {
          this.completeVal = '';
        }
        this.fullscreenLoading = true;
        this.getClassList();
      },
      //弹层调整计划弹层
      adjustPlan(index,row){
        console.log(row);
        this.dialogFormVisible = true;
        this.form={
          plan_id:row.plan_id,
        }
        this.student_id = row.student_id
      },
      async getClassList(){
        // let url = this.class_id;
        // let ret = await getClassList(url);
        this.inuptVal = this.inuptVal ? this.inuptVal : '';
        
        // let url = `/class/${this.class_id}/students?search_info=${this.inuptVal}&page=${this.currentPage}`
        let ret = await getClassList(this.class_id,{
          search_info:this.inuptVal,
          page:this.currentPage
        });

        if (ret.data.status == 0) {
          this.StudentDataList = ret.data.result.list;
          this.classDetail = ret.data.result.class;
          this.planList = ret.data.result.plan;
          this.planList.unshift({
            plan_id:'0',
            plan_name:"无"
          })
          this.totalNum = Number(ret.data.result.pages.total);
          // this.currentPage = Number(ret.data.result.pages.current_page);
          this.pager = 2;

          if(this.totalNum > 0){
            this.pageshow = true;
          }else{
            this.pageshow = false;
          }
        }
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        // this.currentPage = `${val}`;   //this.currentPage已经更改，不要手动更改，不然会走两遍接口
        this.getClassList();
      },
      //确定按钮
      submitForm(formName) {
        /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
        this.changeStudentPlan();
      },
      async changeStudentPlan(){
        let class_id = this.class_id;
        let student_id = this.student_id;
        let plan_id = {
          plan_id:this.form.plan_id?this.form.plan_id:'0'
        }
        let ret = await changeStudentPlan(class_id,student_id,plan_id);
        console.log(ret);
        if(ret.data.status == 0){
          this.dialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.getClassList();
        }else{
          this.$message.error('修改失败');
        }
      }
    },
    created(){
      this.getClassList();
    },
    mounted(){

    },
  }
</script>