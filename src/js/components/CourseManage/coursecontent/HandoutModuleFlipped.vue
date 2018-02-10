<template>
    <div>
        <!--翻转课程 -->
        <el-form ref="firstForm" :model="ruleForm"  label-width="100%" label-position="left" :inline="true">

            <el-form-item label="本课程是否启用批量下载讲义模块" class="handouts-form-item">
                <el-radio-group v-model="ruleForm.bEnabled">
                    <el-radio label="0">启用</el-radio>
                    <el-radio label="1">不启用</el-radio>
                </el-radio-group>

                <el-button
                    v-if="ruleForm.bEnabled=='0'?true:false"
                    class="addhandout"
                    type="primary"
                    size="small"
                    @click="addTableData"
                    label-position="right">新增一个讲义</el-button>

            </el-form-item>

        </el-form>

        <template v-if="ruleForm.bEnabled=='0'?true:false">
            <el-table :data="handout" border style="width: 90%;margin-top: 16px;" :show-header="true">
                <el-table-column  label="显示名称"  width="350"  align="center">
                    <template scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="文件" align="center">
                    <template scope="scope">
                        <span>{{scope.row.file_name}}</span>
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


        <el-dialog class="addContent tabplane handoutsDialog" :title="Doing=='update'?'编辑讲义':'新增讲义'" :visible.sync="dialogVisible" @close="cancel('NewTableForm')">
            <el-form :model="NewTableForm" ref="NewTableForm" label-width="120px">
                <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:40})">
                    <el-input v-model="NewTableForm.name" auto-complete="off" class="coursetxt" placeholder="请输入显示名称"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="content" :rules="filter_rules({type:'isAllSpace',maxLength:200})">
                    <el-input v-model="NewTableForm.content" type="textarea"  auto-complete="off" placeholder="请输入备注" class="coursetxt"></el-input>
                </el-form-item>
                <el-form-item label="上传文件" prop="file_name">

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
<style>
    .handouts-form-item{
        width: 89%;
    }
    .handouts-form-item .el-form-item__content{
        width: 100%;
    }
    .handouts-form-item .el-form-item__content .addhandout{
        float: right;
    }
</style>
<script>
    import {format} from '../../../util/util'
    import FilesUpload from '../courseset/FilesModelUpload.vue'
    import {deleteCourseHandout,getCourseHandout,AddCourseHandout,updateCourseHandout} from '../../../api/course'
    import vue from '../../../common/vue.js'
    export default {
        components: {FilesUpload},
        props:[
            'handout'
        ],
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    bEnabled: '1',
                },
                NewTableForm: {},
                tableData: [

                ],
                file: {
                    
                },
                currentIndex: '',
                Doing: 'addDate'
            }
        },
        methods: {
            //获取讲义列表
            async getCourseHandout(){
                let url = this.course_id ;
                let ret = await getCourseHandout(url);
                if(ret.status == 0){
                    this.handout= ret.result.list;
                }
                console.log(ret);
            },
            //删除数据
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteStage(row.id);  
                }).catch(() => {
                        this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            async DeleteStage(id){ 
                let ret = await deleteCourseHandout(id);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getCourseHandout();
                } else if (ret.status > 0) {
                    ret.message ? ret.message :'删除失败！'
                    this.$message.error(ret.message)
                }
                
            },
            //新增数据
            addTableData(){
                this.NewTableForm = {
                    name: '',
                    content: '',
                    file_name: '',
                    size:'',
                    path:''
                }
                this.Doing = 'addDate';
                this.file = null;
                this.dialogVisible = true 
                
            },
            addTable(formName)
            {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.AddCourseHandout();
                    } else {
                        return false;
                    }
                });
            },
            async AddCourseHandout(){
                debugger
                if(this.NewTableForm.path == ""){
                    this.$message({
                        showClose: true,
                        message: '你必须要上传一个讲义！',
                        type: 'warning'
                    })
                    return;
                }
                let params = {
                    ...this.NewTableForm,
                    course_id: this.course_id  ,
                }
                let ret = await AddCourseHandout(params);
                console.log(ret);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: ret.message ? ret.message : '添加成功！',
                    })
                    this.dialogVisible = false;
                    this.getCourseHandout();
                } else if (ret.status > 0) {
                    this.$message.error('添加失败！');
                }
                
            },
            //编辑数据按钮
            handleEdit(index, row) {
                this.Doing = 'update';
                this.NewTableForm = {...this.handout[index]};
                this.currentIndex = index;
                // this.file = this.NewTableForm
                this.file = [
                    {
                        name : this.NewTableForm.file_name,
                        response:{
                            filePath: this.NewTableForm.path
                        }
                    }
                ]
                this.dialogVisible = true;

            },
            //更新数据
            updateTable(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateCourseHandout();
                    } else {
                        return false;
                    }
                });
            },
            async updateCourseHandout(){
                if(this.NewTableForm.path == ""){
                    this.$message({
                        showClose: true,
                        message: '你必须要上传一个讲义！',
                        type: 'warning'
                    })
                    return;
                }
                let params = {
                    ...this.NewTableForm,
                    course_id: this.course_id ,
                }
                console.log(params);
                let ret = await updateCourseHandout(params.id, params);
                console.log(ret);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: ret.message ? ret.message : '编辑成功！',
                    })
                    this.dialogVisible = false;
                    this.getCourseHandout();
                } else if (ret.status > 0) {
                    ret.message ? ret.message : '编辑失败！'
                    this.$message.error(ret.message);
                }
            },
            //取消
            cancel(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
            },
        },
        computed: { 
            course_id(){
                return this.$route.params.cid;
            }
        },
        mounted() {
            vue.$on('uploadFile',(res)=>{

                this.NewTableForm.path = res.filePath?res.filePath:'';
                this.NewTableForm.upload_size = res.result&&res.result.file.size?res.result.file.size:'';
                this.NewTableForm.file_name = res.result&&res.result.file.name?res.result.file.name:'';
                
            })
        },
        created() {
        }
    }
</script>