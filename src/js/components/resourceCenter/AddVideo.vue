<template>
  <div class="module-clues-content add-resource">
    <div class="outlineeat">
      新增视频
    </div>
    <div class="frombox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="项目" prop="region" class="w_50">
          <el-select v-model="ruleForm.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频类型" prop="region" class="w_50">
          <el-select v-model="ruleForm.region">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称" prop="name">
          <el-input v-model="ruleForm.name"  auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="备注说明" prop="name">
          <el-input v-model="ruleForm.name"  auto-complete="off" class="w_50"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" prop="name">
          <el-input v-model="ruleForm.name"  auto-complete="off" class="w_60"></el-input>
          <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button>
        </el-form-item>
        <el-form-item label="视频时长" prop="name" class="displayinline">
          <el-input v-model="ruleForm.name" auto-complete="off"></el-input>分<el-input v-model="ruleForm.name" auto-complete="off" style="margin-left: 20px;"></el-input>秒
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

    <el-dialog class="selectknowledge" title="请选择知识点关联" :visible.sync="dialogVisible" @close="closeDialog('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="一级分类" prop="project_id">
          <el-select v-model="ruleForm.project_id" placeholder="请选择所属项目" @change="changeProject">
            <el-option :label="item.project_name" :value="item.project_id" v-for="(item,index) in projectlist" :key="item.project_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属科目" prop="subject_id">
          <el-select v-model="ruleForm.subject_id" :disabled="!bSubject" placeholder="请选择所属科目">
            <el-option :label="item.subject_name" :value="item.subject_id" v-for="(item,index) in selectedlist" :key="item.subject_id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网课类型" prop="course_type_id">
          <el-select v-model="ruleForm.course_type_id" placeholder="请选择网课类型">
            <el-option :label="item.name" :value="item.course_type_id" v-for="item in course_type" :key="item.course_type_id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="日期" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer last-form-item">
        <el-button @click="closeDialog('ruleForm')">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<style>
</style>
<script>
  export default {
    components: {},
    data() {
      return {
        dialogVisible:true,
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
        },
        tableData3: [
          {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
        ],
        multipleSelection: []
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
    created() {

    }
  }
</script>