<template>
  <div>
    <!--翻转课程-->
    <el-form ref="firstForm" :model="ruleForm" label-width="240px" label-position="left" :inline="true" style="margin-top:22px;">
      <div class="fromtitle">
        <i class="titicon"></i>
        <span class="tittxt">特殊复习阶段</span>
      </div>
      <el-form-item label="是否启用特殊复习阶段？" class="first-form-item">
        <el-radio-group v-model="ruleForm.bEnabled">
          <el-radio label="0">启用</el-radio>
          <el-radio label="1">不启用</el-radio>
        </el-radio-group>
      </el-form-item>

      <template v-if="ruleForm.bEnabled=='0'?true:false">
        <el-table :data="tableData" border style="width: 90%;margin-top: 16px;" :show-header="false">
          <el-table-column width="260" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column width="200" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.outline}}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.starttime}}</span>
            </template>
          </el-table-column>
          <el-table-column width="100" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.lasttime}}</span>
            </template>
          </el-table-column>
          <el-table-column width="140" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.people}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)" style="margin: 0 10px">删除</el-button>
              <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)" style="margin: 0 10px">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="addBox">
          <div @click="addTableData" style="cursor: pointer;display: inline-block;padding: 0 30px;">
            <i class="additem"></i>
            <el-button type="text" class="addBtn">新增特殊的复习阶段</el-button>
          </div>
        </div>
      </template>


    </el-form>

    <el-dialog class="addContent tabplane" title="新增特殊的复习阶段" :visible.sync="dialogVisible" @close="cancel('NewTableForm')">
      <el-form :model="NewTableForm" :rules="rules" ref="NewTableForm" label-width="100px">
        <el-form-item label="复习阶段的名称" prop="name">
          <el-input v-model="NewTableForm.name" auto-complete="off" class="coursetxt" placeholder="请输入复习阶段的名称"></el-input>
        </el-form-item>
        <el-form-item label="复习阶段的课程大纲" prop="outline">
          <el-select v-model="NewTableForm.outline" placeholder="选择该复习阶段的课程大纲">
            <el-option label="21321" value="课程大纲课程大纲"></el-option>
            <el-option label="21323" value="课程大纲课程大纲"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="启用时间" prop="starttime">
          <el-date-picker v-model="NewTableForm.starttime" format="yyyy-MM-dd" type="date" placeholder="选择启用时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="lasttime">
          <el-date-picker v-model="NewTableForm.lasttime" format="yyyy-MM-dd" type="date" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="复习阶段的启用人群" prop="people">
          <el-input v-model="NewTableForm.people"  auto-complete="off" placeholder="选择该复习阶段的启用人群" class="coursetxt"></el-input>
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
  import {format} from '../../../util/util'
  export default {
    components: {},
    data() {
      return {
        dialogVisible: false,
        ruleForm: {
          bEnabled: '1',
        },
        NewTableForm: {},
        tableData: [
          {
            name: 'CMA 2018年12月考季翻转课堂',
            outline: 'CMA 2018年12月考季',
            starttime: '2018-09-01',
            lasttime: '2018-10-01',
            people:'班级名称'
          }, {
            name: 'CMA 2018年12月考季翻转课堂',
            outline: 'CMA 2018年12月考季',
            starttime: '2018-09-01',
            lasttime: '2018-10-01',
            people:'班级名称'
          }, {
            name: 'CMA 2018年12月考季翻转课堂',
            outline: 'CMA 2018年12月考季',
            starttime: '2018-09-01',
            lasttime: '2018-10-01',
            people:'班级名称'
          }
        ],
        rules: {
          name: [
            { required: true, message: '请输入翻转课堂的名称', trigger: 'blur' }
          ],
          outline: [
            { required: true, message: '选择该翻转课堂的课程大纲', trigger: 'change' }
          ],
          starttime: [
            { type: 'date', required: true, message: '选择启用时间', trigger: 'change' }
          ],
          lasttime: [
            { type: 'date', required: true, message: '选择结束时间', trigger: 'change' }
          ],
          people: [
            { type: 'string', required: true, message: '选择该翻转课堂的启用人群', trigger: 'blur' }
          ]
        },
        currentIndex: '',
        Doing: ''
      }
    },
    methods: {
      //新增数据 确定按钮
      addTable(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.NewTableForm.starttime = format(this.NewTableForm.starttime);
            this.NewTableForm.lasttime = format(this.NewTableForm.lasttime);
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
            this.tableData[this.currentIndex].name = this.NewTableForm.name;
            this.tableData[this.currentIndex].outline = this.NewTableForm.outline;
            this.tableData[this.currentIndex].starttime = format(this.NewTableForm.starttime);
            this.tableData[this.currentIndex].lasttime = format(this.NewTableForm.lasttime);
            this.tableData[this.currentIndex].people = this.NewTableForm.people;
            this.dialogVisible = false;
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
          outline: '',
          starttime: '',
          lasttime: '',
          people:''
        }
        this.Doing = 'addDate';
        this.dialogVisible = true
      },
      //编辑数据按钮
      handleEdit(index, row) {
        this.operation = 'update';
        this.StageFrom = {...this.tableData[index]};
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