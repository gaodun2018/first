<template>
  <div class="module-edu-content course-manage">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>


        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']" @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in tablist">
              <span class="clitem" :class="[rev.id === clver ?'current':'']" @click="outlinechange(rev.id)">{{rev.name}}</span>
            </template>

          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']" @click="mulchange('0')">全部</span>

            <template v-for="(revm,index) in tablist">
              <template v-for="(revs,index) in revm.tabdata">
                <span class="clitem" :class="[revs.id === clversm ?'current':'']" @click="mulchange(revs.id)">{{revs.name}}</span>
              </template>
            </template>
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
        <el-table-column fixed="right" label="操作" min-width="200" align="center">
          <template scope="scope">
            <el-button type="text"><router-link class="routerBtn" to="/CourseSet">基本设置</router-link></el-button>
            <el-button type="text"><router-link class="routerBtn" to="/CourseContent">课程内容</router-link></el-button>
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

    <el-dialog class="addCourse" title="新建课程" :visible.sync="dialogCourseVisible" @close="closeDialog('ruleForm')">
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
            <el-button @click="closeDialog('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>

          </el-form-item>
        </el-form>

      </div>
    </el-dialog>

  </div>
</template>
<style>
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
        tablist:[
          {
            id:"12",
            name:"CFA",
            tabdata:[{
              id:"1",
              name:"level11"
            },{
              id:"2",
              name:"level12"
            },{
              id:"3",
              name:"level13"
            }]
          },{
            id:"123",
            name:"ACCA",
            tabdata:[{
              id:"4",
              name:"alevel14"
            },{
              id:"5",
              name:"alevel15"
            },{
              id:"6",
              name:"alevel16"
            }]
          }
        ],
        selectvalue:'全部课程类型',
        options: [
          {
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
        }
        ],
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
        input2: '',
        clver:"0",
        clversm:"0",
        videoList: [
          {
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
    computed:{
    },
    methods: {

      outlinechange(reid){
        this.clver = reid;
        // let ret = this.tablist
        // if(ret.id == reid){
        //   this.outdata = ret;
        // }
      },
      mulchange(reid){
        this.clversm = reid;
      },
      //关闭弹层
      closeDialog(formName){
        this.dialogCourseVisible = false;
        this.$refs[formName].resetFields();

      },
      submitForm(formName) {
        console.log('submitFormsubmitFormsubmitFormsubmitFormsubmitFormsubmitFormsubmitFormsubmitForm');
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
    mounted() {

    },
    created() {

    }
  }
</script>