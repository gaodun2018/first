<template>
    <div>
        <!--翻转课程 -->
        <el-form ref="firstForm" :model="ruleForm"  label-width="100%" label-position="left" :inline="true">

            <el-form-item label="本课程是否启用批量下载讲义模块" class="first-form-item">
                <el-radio-group v-model="ruleForm.bEnabled">
                    <el-radio label="0">启用</el-radio>
                    <el-radio label="1">不启用</el-radio>
                </el-radio-group>

                <el-button v-if="ruleForm.bEnabled=='0'?true:false" type="primary" size="small" @click="addTableData" label-position="right" >新增一个讲义</el-button>

            </el-form-item>

        </el-form>

        <template v-if="ruleForm.bEnabled=='0'?true:false">
            <el-table :data="tableData" border style="width: 90%;margin-top: 16px;" :show-header="true">
                <el-table-column  label="显示名称"  width="350"  align="center">
                    <template scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="文件" align="center">
                    <template scope="scope">
                        <span>{{scope.row.file}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="大小" width="160" align="center">
                    <template scope="scope">
                        <span>{{scope.row.size}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center"  width="200">
                    <template scope="scope">
                        <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)" style="margin: 0 10px">删除</el-button>
                        <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)" style="margin: 0 10px">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>


        <el-dialog class="addContent tabplane" title="新增讲义" :visible.sync="dialogVisible" @close="cancel('NewTableForm')">
            <el-form :model="NewTableForm" :rules="rules" ref="NewTableForm" label-width="120px">
                <el-form-item label="显示名称" prop="name">
                    <el-input v-model="NewTableForm.name" auto-complete="off" class="coursetxt" placeholder="请输入显示名称"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="content">
                    <el-input v-model="NewTableForm.content" type="textarea"  auto-complete="off" placeholder="请输入备注" class="coursetxt"></el-input>
                </el-form-item>
                <el-form-item label="上传文件" prop="file">

                    <FilesUpload :file="file"></FilesUpload>
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
    import FilesUpload from '../courseset/FilesModelUpload.vue'
    export default {
        components: {FilesUpload},
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    bEnabled: '1',
                },
                NewTableForm: {},
                tableData: [
                    {
                        name: 'CMA 2018年1月考季翻转课堂',
                        content:'描述对对对11',
                        file: 'CMA 2018年1月考季.zip',
                        path:'http://simg01.gaodunwangxiao.com/uploadfiles/ep/upload/201802/02/09f4f_20180202150929.zip',
                        size:'50M'
                    }, {
                        name: 'CMA 2018年2月考季翻转课堂',
                        content:'描述对对对33',
                        file: 'CMA 2018年2月考季.rar',
                        path:'http://simg01.gaodunwangxiao.com/uploadfiles/ep/upload/201802/02/09f4f_20180202150929.zip',
                        size:'60M'
                    }, {
                        name: 'CMA 2018年3月考季翻转课堂',
                        content:'描述对对对22',
                        file: 'CMA 2018年3月考季.zip',
                        path:'http://simg01.gaodunwangxiao.com/uploadfiles/ep/upload/201802/02/09f4f_20180202150929.zip',
                        size:'70M'
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
                Doing: 'addDate'
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
            //删除数据
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
                this.Doing = 'update';
                this.NewTableForm = {...this.tableData[index]};
                this.currentIndex = index;
                this.dialogVisible = true;
            },
            //取消
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