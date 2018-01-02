<template>
  <div class="module-clues-content add-resource">
    <div class="outlineeat">
      新增讲义
    </div>
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="项目" prop="region" class="w_50">
          <el-select v-model="ruleForm.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="科目" prop="region" class="w_50">
          <el-select v-model="ruleForm.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="讲义名称" prop="name">
          <el-input v-model="ruleForm.name"  auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="文件名" prop="name">
          <el-input v-model="ruleForm.name"  auto-complete="off" class="w_60"></el-input>
          <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button>
        </el-form-item>
        <el-form-item label="知识点关联" prop="name">
          <el-button type="text" @click="">选择知识点</el-button>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<style>
</style>
<script>

  export default {
    components: {},
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    computed: {},
    mounted() {

    },
    created() {

    }
  }
</script>