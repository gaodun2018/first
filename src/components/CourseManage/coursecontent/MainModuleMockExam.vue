<template>
  <div>
    <!--模考-->
    <el-form ref="firstForm" :model="ruleForm" label-width="240px" label-position="left" :inline="true">
          <div class="fromtitle">
            <i class="titicon"></i>
            <span class="tittxt">模考+直播阶段</span>
          </div>
          <el-form-item label="是否启用模考阶段？" class="first-form-item">
            <el-radio-group v-model="ruleForm.bEnabled">
              <el-radio label="0">启用</el-radio>
              <el-radio label="1">不启用</el-radio>
            </el-radio-group>
          </el-form-item>

          <template v-if="ruleForm.bEnabled=='0'?true:false">
            <el-table :data="tableData" border style="width: 90%;margin-top: 16px;" :show-header="false">
              <el-table-column width="240" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column width="180" align="center">
                <template slot-scope="scope">
                  <span>试卷ID：{{scope.row.testid}}</span>
                </template>
              </el-table-column>
              <el-table-column width="180" align="center">
                <template slot-scope="scope">
                  <span>直播ID：{{scope.row.liveid}}</span>
                </template>
              </el-table-column>
              <el-table-column width="180" align="center">
                <template slot-scope="scope">
                  <span>知识点ID：{{scope.row.knowledgeid}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)" style="margin: 0 10px">删除</el-button>
                  <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)" style="margin: 0 10px">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="addBox">
              <div @click="addTableData" style="cursor: pointer;display: inline-block;padding: 0 30px;">
                <i class="additem"></i>
                <el-button type="text" class="addBtn">新增模考</el-button>
              </div>
            </div>
          </template>


        </el-form>

    <el-dialog class="addContent tabplane" title="新增模考" :visible.sync="dialogVisible" @close="cancel('NewTableForm')">
      <el-form :model="NewTableForm" :rules="rules" ref="NewTableForm" label-width="100px">
        <el-form-item label="模考的名称" prop="name">
          <el-input v-model="NewTableForm.name"  auto-complete="off" class="coursetxt" placeholder="请输入模考的名称"></el-input>
        </el-form-item>
        <el-form-item label="模考的试卷ID" prop="testid">
          <el-input v-model.number="NewTableForm.testid"  auto-complete="off" class="coursetxt" placeholder="请输入模考的试卷ID"></el-input>
        </el-form-item>
        <el-form-item label="模考后直播ID(选填)" prop="liveid">
          <el-input v-model.number="NewTableForm.liveid"  auto-complete="off" class="coursetxt" placeholder="请输入模考后的直播ID(选填)"></el-input>
        </el-form-item>
        <el-form-item label="需掌握的知识点ID" prop="knowledgeid">
          <el-input v-model="NewTableForm.knowledgeid"  auto-complete="off" class="coursetxt" placeholder="解锁需掌握的知识点ID(可填多个，用英文逗号隔开)"></el-input>
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
        dialogVisible: false,
        ruleForm: {
          bEnabled: '1',
          id: '',
          name: '',
          outline: '',
        },
        NewTableForm: {
          name: '',
          testid: '',
          liveid: '',
          knowledgeid: '',
        },
        tableData: [
          {
            name: '模考一',
            testid: 1233,
            liveid: 12312,
            knowledgeid: 12312,
          }, {
            name: '模考一',
            testid: 1233,
            liveid: 12312,
            knowledgeid: 12312,
          }, {
            name: '模考一',
            testid: 1233,
            liveid: 12312,
            knowledgeid: 12312,
          }
        ],
        rules: {
          name: [
            { required: true, message: '请输入模考的名称', trigger: 'blur' }
          ],
          testid: [
            { required: true, type:'number', message: '请输入模考的试卷ID', trigger: 'blur' }
          ]
        },
        currentIndex: '',
        Doing: 'addDate'
      }
    },
    methods: {
      //新增数据 确定按钮
      addTable(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableData.push(this.NewTableForm);
            this.dialogVisible = false;
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
              this.tableData[this.currentIndex][key] = this.NewTableForm[key]
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
        this.NewTableForm= {
          name: '',
          testid: '',
          liveid: '',
          knowledgeid: '',
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