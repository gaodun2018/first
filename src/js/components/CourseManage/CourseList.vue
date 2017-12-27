<template>
  <div class="module-edu-content course-manage">
    <!--<el-row class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>讲义管理</el-breadcrumb-item>
        <el-breadcrumb-item>讲义列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <el-radio-group v-model="radio">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="ACCA"></el-radio-button>
              <el-radio-button label="CPA1"></el-radio-button>
              <el-radio-button label="CFA2"></el-radio-button>
              <el-radio-button label="CFA3"></el-radio-button>
              <el-radio-button label="CFA4"></el-radio-button>
              <el-radio-button label="CFA5"></el-radio-button>
              <el-radio-button label="CFA6"></el-radio-button>
              <el-radio-button label="CFA7"></el-radio-button>
              <el-radio-button label="CFA8"></el-radio-button>
              <el-radio-button label="CFA9"></el-radio-button>
              <el-radio-button label="CFA10"></el-radio-button>
              <el-radio-button label="CFA11"></el-radio-button>
              <el-radio-button label="CFA12"></el-radio-button>
              <el-radio-button label="CFA13"></el-radio-button>
              <el-radio-button label="CFA14"></el-radio-button>
              <el-radio-button label="CFA15"></el-radio-button>
              <el-radio-button label="CFA16"></el-radio-button>
              <el-radio-button label="CFA17"></el-radio-button>
              <el-radio-button label="CFA18"></el-radio-button>
              <el-radio-button label="CFA19"></el-radio-button>
              <el-radio-button label="CFA20"></el-radio-button>
              <el-radio-button label="CFA21"></el-radio-button>
              <el-radio-button label="CFA22"></el-radio-button>
              <el-radio-button label="CFA23"></el-radio-button>
              <el-radio-button label="CFA24"></el-radio-button>
              <el-radio-button label="CFA25"></el-radio-button>
            </el-radio-group>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <el-radio-group v-model="radio2">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="Level1"></el-radio-button>
              <el-radio-button label="Level2"></el-radio-button>
              <el-radio-button label="Level3"></el-radio-button>
              <el-radio-button label="Level4"></el-radio-button>
              <el-radio-button label="Level5"></el-radio-button>
              <el-radio-button label="Level6"></el-radio-button>
              <el-radio-button label="Level7"></el-radio-button>
              <el-radio-button label="Level8"></el-radio-button>
              <el-radio-button label="Level9"></el-radio-button>
              <el-radio-button label="Level10"></el-radio-button>
              <el-radio-button label="Level11"></el-radio-button>
              <el-radio-button label="Level12"></el-radio-button>
              <el-radio-button label="Level13"></el-radio-button>
              <el-radio-button label="Level14"></el-radio-button>
              <el-radio-button label="Level15"></el-radio-button>
              <el-radio-button label="Level16"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>

      </el-row>
      <el-row type="flex" align="bottom">
        <el-col :sm="12">
          <el-row>
            <div class="select-search">
              <el-select v-model="selectvalue" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-row>
        </el-col>
        <el-col :sm="12">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input2"
                        :on-icon-click="handleIconClick"></el-input>
              <el-button type="primary" size="small" @click="dialogCourseVisible = true">新增一个课程</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" @selection-change="handleSelectionChange"
                :data="videoList" style="width: 100%">

        <el-table-column prop="courseid" label="课程id" min-width="100" fixed>
        </el-table-column>
        <el-table-column prop="coursename" label="课程名称" min-width="300">
        </el-table-column>
        <el-table-column prop="usefullife" label="课程有效期" min-width="150">
        </el-table-column>
        <el-table-column prop="price" label="课程价格" min-width="125">
        </el-table-column>
        <el-table-column prop="coursetype" label="课程包类型" min-width="150">
        </el-table-column>
        <el-table-column prop="onlinecoursetype" label="网课类型" min-width="115">
        </el-table-column>
        <el-table-column prop="status" label="发布状态" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template scope="scope">
            <!--<el-button type="text">基本设置</el-button>-->
            <router-link class="routerBtn" to="/CourseSet">基本设置</router-link>
            <router-link class="routerBtn" to="/CourseSet">课程内容</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="eduTotal"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog class="addCourse" title="新建课程" :visible.sync="dialogCourseVisible">
      <div>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所属项目" prop="project">
            <el-select v-model="ruleForm.project" placeholder="请选择所属项目">
              <el-option label="CFA" value="shanghai"></el-option>
              <el-option label="CMA" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所属科目" prop="subject">
            <el-select v-model="ruleForm.subject" placeholder="请选择所属科目">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="网课类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择网课类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item class="last-form-item">
            <el-button @click="dialogCourseVisible = false">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>

          </el-form-item>
        </el-form>

      </div>
    </el-dialog>

  </div>
</template>
<style>
  .course-manage .input-search .el-button {
    width: 114px;
  }
  .course-manage .el-dialog__header {
    padding: 30px 20px 0;
    text-align: center;
  }
  .course-manage .el-form-item__label {
    color: #8f9aac;
  }
  .course-manage .last-form-item {
    text-align: center;
    margin-top: 40px;
  }
  .course-manage .last-form-item .el-form-item__content {
    margin-left: 0 !important;
  }
</style>
<script>
  import Vue from 'vue';


  export default {
    components: {},
    data() {
      return {
        selectvalue:'全部课程类型',
        options: [{
          value: '1',
          label: '全部课程类型'
        }, {
          value: '2',
          label: 'EP'
        }, {
          value: '3',
          label: 'Glive'
        }, {
          value: '4',
          label: '普通网课'
        }],
        rules: {
          name: [
            {required: true, message: '请输入课程名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '请选择所属项目', trigger: 'change'}
          ],
          subject: [
            {required: true, message: '请选择所属科目', trigger: 'change'}
          ],
          type: [
            {required: true, message: '请选择网课类型', trigger: 'change'}
          ]
        },
        ruleForm: {
          name: '',
          project: '',
          subject: '',
          type: '',
        },
        dialogCourseVisible: false,
        radio: '全部',
        radio2: '全部',
        input2: '',
        videoList: [{
          courseid: '123',
          coursename: 'CFA持证无忧123456789',
          usefullife: '36个月',
          price: '99999.999',
          coursetype: 'EP课',
          onlinecoursetype: '大包',
          status: '发布'
        }, {
          courseid: '123',
          coursename: 'CFA持证无忧12345672',
          usefullife: '36个月',
          price: '99999.999',
          coursetype: 'EP课',
          onlinecoursetype: '大包',
          status: '发布'
        }, {
          courseid: '123',
          coursename: 'CFA持证无忧123456789',
          usefullife: '36个月',
          price: '99999.999',
          coursetype: 'EP课',
          onlinecoursetype: '大包',
          status: '发布'
        },
        ],
        eduTotal:3,
        currentPage:1,
        pageSize:10,
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSizeChange(size){
        console.log(size);
      },
      handleCurrentChange(page){
        console.log(page);
      }
    },
    computed: {},
    mounted() {

    },
    created() {

    }
  }
</script>