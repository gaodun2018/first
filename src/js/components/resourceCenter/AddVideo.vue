<template>
  <div class="module-clues-content add-resource">
    <div class="outlineeat">
      新增视频
    </div>
    <div class="frombox">
      <el-form :model="ruleForm" :rules="resourceFormRules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading.fullscreen.lock="loading">

        <el-form-item label="视频名称" prop="title">
          <el-input v-model="ruleForm.title" auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="项目" prop="project" class="">
          <el-select v-model="ruleForm.project" style="width: 150px;" :change="didChangeProjectSelection()">
            <el-option :label="tag.name" :value="tag.id" v-for="tag in tags"></el-option>
          </el-select>
          <el-select v-model="ruleForm.subject" style="width: 150px;">
            <el-option :label="tag.name" :value="tag.id" v-for="tag in subjects"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="description">
          <el-input v-model="ruleForm.description" auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" prop="video_id">
          <el-input v-model="ruleForm.video_id" auto-complete="off" class="w_60"></el-input>
          <!-- <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button> -->
        </el-form-item>
        <el-form-item label="视频时长（分）" prop="duration_minute" class="displayinline">
          <el-input v-model="ruleForm.duration_minute" auto-complete="off"></el-input>
          分
        </el-form-item>
        <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline">
          <el-input v-model="ruleForm.duration_second" auto-complete="off"></el-input>
          秒
        </el-form-item>
        <el-form-item label="知识点关联" prop="name">
          <el-button type="text" @click="selectknowledge">选择知识点</el-button>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <SelectKnowledge></SelectKnowledge>

  </div>
</template>
<style>
</style>
<script>
  import SelectKnowledge from './SelectKnowledge.vue'
  import { getTags, storeResource } from '../../api/resource.js'
  export default {
    components: {
      SelectKnowledge
    },
    data() {
      return {
        tags: [],
        loading: false,
        ruleForm: {
          title: '',
          project: '',
          subject: '',
          video_id: '',
          duration_minute: '',
          duration_second: '',
        },
        resourceFormRules: {
          title: [
            {required: true, message: '请输入资源名称', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          project: [
            {required: true, message: '请选择项目', trigger: 'change', type: 'number'}
          ],
          subject: [
            {required: true, message: '请选择科目', trigger: 'change'}
          ],
          video_id: [
            {required: true, message: '请输入视频ID', trigger: 'change'}
          ],
          duration_minute: [
            {required: true, message: '请填写视频时长的分钟', trigger: 'blur'}
          ],
          duration_second: [
            {required: true, message: '请填写视频时长的分钟', trigger: 'blur'}
          ]
        },
        multipleSelection: []
      }
    },
    methods: {
      getSubjectByProjectId(projectId) {
        var subjects = null
        for (var project of this.tags) {
          if (project.id == projectId) {
            subjects = project.children;
          }
        }
        return subjects
      },

      didChangeProjectSelection() {
        console.error(this.ruleForm)
        this.subjects = this.getSubjectByProjectId(this.ruleForm.project)
      },
      //选择知识点
      selectknowledge(){
        this.$store.dispatch('changeDialog',true)
      },


      createResourceForm()
      {
        return {
          title: this.ruleForm.title,
          description: this.ruleForm.description,
          tag_id: this.ruleForm.subject,
          duration: `${this.ruleForm.duration_minute}:${this.ruleForm.duration_second}`,
          video_id: this.ruleForm.video_id
        }
      },

      async submitForm(formName) {
        console.error('submit form')
        console.error(this.$refs[formName])
        this.$refs[formName].validate((valid) => {
          console.error(`form valid ${valid}`)
          this.loading = true
          if (valid) {
            console.error('form creation')
            console.error(this.createResourceForm())
            let createResponse = storeResource(
              this.createResourceForm()
            )
            console.error(createResponse)
          } else {
            console.log('error submit!!');
          }
          this.loading = false
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //关闭弹层
      closeDialog(formName){
        this.bSubject = false;
        this.dialogCourseVisible = false;
        this.$refs[formName].resetFields();
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
    },
    computed: {},
    mounted() {

    },
    async created() {
      this.tags = (await getTags('project', {partner_id: 1})).result
    }
  }
</script>