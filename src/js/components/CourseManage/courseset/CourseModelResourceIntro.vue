<template>

  <div class="resourceIntro">
    <el-row>
      <el-col :span="6" v-for="(item,index) in courseIntroList" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="line-height: 26px;">{{item.title}}</span>
          </div>
          <div class="introItem">
            {{item.content}}
          </div>
          <div class="box-card-bottom">
            <el-button type="text" class="button" @click="openAddResDialog(index)">修改</el-button>
            <el-button type="text" class="button" @click="deleteResIntro(index)">删除</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card add-card" @click.native="openAddResDialog">
          <i class="el-icon-plus"></i>
          <p>建议：添加3个</p>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="新增资源介绍" class="tabplane" :visible.sync="dialogAddResVisible" @close="resetForm('AddResForm')">
      <el-form :model="AddResForm" :rules="AddResFormRules" ref="AddResForm" >
        <el-form-item label="标题" prop="title">
          <el-input v-model="AddResForm.title" class="coursetxt" auto-complete="off" placeholder="示例：15章课程学习"></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="content">
          <el-input v-model="AddResForm.content" autosize type="textarea" class="coursetxt" auto-complete="off" placeholder="示例：每天按照计划完成学习，把握好学习节奏"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button @click="resetForm('AddResForm')">取 消</el-button>
        <el-button type="primary" @click="saveAddResForm('AddResForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {AddSourceIntro} from '../../../api/fromAxios'
  import {getCourseResourceIntro} from '../../../api/course'
  export default {
    components: {},
    data() {
      return {
        dialogAddResVisible: false,   //新增资源介绍弹层
        //新增资源介绍的表单
        AddResForm: {
          title: '',
          content: '',
        },
        //新增资源介绍的表单的验证
        AddResFormRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详情', trigger: 'blur'}
          ],
        },
        courseIntroList: [],  //新增资源介绍列表
      }
    },
    computed: {
      course_id(){
        return this.$route.params.cid;
      }
    },
    methods: {
      //openAddResDialog
      openAddResDialog(index){
        if (index >= 0) {
          this.AddResForm = {
            title: this.courseIntroList[index]['title'],
            content: this.courseIntroList[index]['content'],
          }
        } else {
          this.AddResForm = {
            title: '',
            content: '',
          }
        }
        this.dialogAddResVisible = true;
      },
      //删除新增资源的介绍
      deleteResIntro(index){
        this.$confirm('此操作将删除该资源介绍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.courseIntroList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //保存新增资源的介绍
      saveAddResForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let course_id = this.course_id;
            let params = {...this.AddResForm}
            AddSourceIntro(course_id, params).then((res) => {
              console.log(res);
              if(res.status == 0){
                this.$message({
                  type: 'success',
                  message: res.message
                })
                this.dialogAddResVisible = false;
                this.courseIntroList.push(res.result);
              }else{
                this.$message.error(res.message? res.message:'课程资源添加失败！');
              }
            })
//            this.dialogAddResVisible = false;
          } else {
            return false;
          }
        });
      },
      //重置表单.新增资源介绍
      resetForm(formName) {
        this.dialogAddResVisible = false;
        this.$refs[formName].resetFields();
      },
      async getCourseResourceIntro(){
        let course_id = this.course_id;
        let ret = await getCourseResourceIntro(course_id);
        console.log(ret);
        if(ret.status == 0){
          this.courseIntroList = ret.result;
        }
      }
    },
    mounted() {
    },
    destroyed() {
    },
    created() {
      this.getCourseResourceIntro();
    }
  }
</script>