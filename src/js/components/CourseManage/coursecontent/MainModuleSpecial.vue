<template>
  <div>
    <!--特殊前导阶段-->
    <el-form ref="ruleForm" :model="ruleForm" label-width="240px" label-position="left" :inline="true">
      <div class="fromtitle">
        <i class="titicon"></i>
        <span class="tittxt">特殊前导阶段</span>
      </div>
      <el-form-item label="是否启用特殊前导阶段？" class="first-form-item">
        <el-radio-group v-model="ruleForm.bEnabled">
          <el-radio label="0">启用</el-radio>
          <el-radio label="1">不启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="id" v-show="bShow">
        <el-input v-model="ruleForm.id" placeholder="请输入学前测试试卷ID"></el-input>
      </el-form-item>
      <el-form-item label="" prop="name" class="w_350" v-show="bShow">
        <el-input v-model="ruleForm.name" placeholder="请输入前导阶段的名称"></el-input>
      </el-form-item>
      <el-form-item label="" prop="outline" class="w_350" v-show="bShow">
        <el-select v-model="ruleForm.outline" clearable placeholder="选择该前导阶段的课程大纲">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" v-show="bShow">保存</el-button>

    </el-form>

  </div>
</template>
<style>

</style>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          bEnabled: '1',
          id: '',
          name: '',
          outline: '',
        },
      }
    },
    methods: {},
    computed: {
      bShow(){
        if(this.ruleForm.bEnabled=='0'){
          return true;
        }else{
          return false;
        }
      }
    },
    mounted() {
    },
    created() {
    }
  }
</script>