<template>
  <div>
    <!--阶段-->
    <el-row style="margin-bottom: 22px;">
      <div class="fromtitle">
        <i class="titicon"></i>
        <span class="tittxt">阶段</span>
      </div>
      <el-table :data="tableData" border style="width: 90%;margin-top: 16px;">
        <el-table-column label="阶段名称" width="220">
          <template scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="阶段课程大纲 " width="500">
          <template scope="scope">
            <span>{{scope.row.outline}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="addBox">
        <div @click="addTableData" style="cursor: pointer;display: inline-block;padding: 0 30px;">
          <i class="additem"></i>
          <el-button type="text" class="addBtn">新增一个阶段</el-button>
        </div>
      </div>

    </el-row>

    <el-dialog class="addContent tabplane" title="新增一个阶段" :visible.sync="dialogVisible" @close="cancel('NewTableForm')">

      <el-form :model="NewTableForm" :rules="rules" ref="NewTableForm" label-width="100px">
        <el-form-item label="阶段名称" prop="name">
          <el-input v-model="NewTableForm.name" class="coursetxt"></el-input>
        </el-form-item>
        <el-form-item label="阶段课程大纲" prop="outline">
          <el-select v-model="NewTableForm.outline" placeholder="选择该阶段的课程大纲" style="width: 90%;">
            <el-option label="CFA" value="shanghai"></el-option>
            <el-option label="CMA" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="coursebtn">
          <el-button @click="cancel('NewTableForm')">取 消</el-button>
          <el-button type="primary" @click="updateTable('NewTableForm')" v-if="Doing=='update'">保 存</el-button>
          <el-button type="primary" @click="addTable('NewTableForm')" v-if="Doing=='addDate'">确 定</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>


  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        ruleForm: {
          bEnabled: '1',
        },
        NewTableForm: {},
        dialogVisible: false,
        tableData: [
          {
            name: '王小虎',
            outline: '上海市普陀区金沙江路 1518 弄',
          }, {
            name: '王小虎',
            outline: '上海市普陀区金沙江路 1517 弄',
          }
        ],
        rules: {
          name: [
            { required: true, message: '请输入阶段的名称', trigger: 'blur' }
          ],
          outline: [
            { required: true, message: '选择该阶段的课程大纲', trigger: 'blur' }
          ]
        },
        currentIndex: '',
        operation: ''
      }
    },
    methods: {
      //新增数据 确定按钮
      addTable(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData.push(this.NewTableForm)
            this.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //更新数据
      updateTable(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for(var key in this.NewTableForm){
              this.tableData[this.currentIndex][key] = this.NewTableForm[key];
            }
            this.dialogVisible = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1)
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
      //新增数据
      addTableData(){
        this.NewTableForm = {
          name: '',
          outline: ''
        }
        this.Doing = 'addDate';
        this.dialogVisible = true
      },
      handleEdit(index, row) {
        this.Doing = 'update';
        this.NewTableForm = {...this.tableData[index]};
        this.currentIndex = index;
        this.dialogVisible = true;
      },
      cancel(formName) {
        this.$refs[formName].resetFields();
        this.dialogVisible = false;
      },
    },
    computed: {},
    mounted() {
    },
    created() {
    }
  }
</script>