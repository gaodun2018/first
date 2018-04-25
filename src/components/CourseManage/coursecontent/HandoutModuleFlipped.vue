<template>
    <div>
        <!--批量讲义 -->
        <el-form ref="firstForm" :model="ruleForm" label-width="100%" label-position="left" :inline="true">

            <el-form-item label="本课程是否启用批量下载讲义模块" class="handouts-form-item">
                <el-radio-group v-model="ruleForm.bEnabled" @change="handleChange">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">不启用</el-radio>
                </el-radio-group>

                <el-button
                    v-if="ruleForm.bEnabled==1?true:false"
                    class="addhandout"
                    type="primary"
                    size="small"
                    @click="addTableData"
                    label-position="right">+&nbsp;新增一个讲义
                </el-button>

            </el-form-item>

        </el-form>

        <template v-if="ruleForm.bEnabled==1?true:false">
            <el-table :data="handout" border style="width: 90%;margin-top: 16px;" :show-header="true">
                <el-table-column label="序号" width="60" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="显示名称" width="350" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="文件" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.file_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="大小" width="160" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.size}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)"
                                   style="margin: 0 10px">删除
                        </el-button>
                        <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)"
                                   style="margin: 0 10px">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>


        <el-dialog class="addContent tabplane handoutsDialog" :title="Doing=='update'?'编辑讲义':'新增讲义'"
                   :visible.sync="dialogVisible" @close="cancel('NewTableForm')">
            <el-form :model="NewTableForm" ref="NewTableForm" label-width="120px">
                <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
                    <el-input v-model="NewTableForm.name" auto-complete="off" class="coursetxt"
                              placeholder="请输入显示名称"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="content" :rules="filter_rules({type:'isAllSpace',max:50})">
                    <el-input v-model="NewTableForm.content" type="textarea" auto-complete="off" placeholder="请输入备注"
                              class="coursetxt"></el-input>
                </el-form-item>
                <el-form-item label="上传文件" prop="file_name">

                    <FilesUpload :file="file" @updateFlies="updateFlies"></FilesUpload>
                </el-form-item>

                <el-form-item class="coursebtn">
                    <el-button @click="cancel('NewTableForm')">取 消</el-button>
                    <el-button type="primary" @click="updateTable('NewTableForm')" v-if="Doing=='update'">保 存
                    </el-button>
                    <el-button type="primary" @click="addTable('NewTableForm')" v-if="Doing=='addDate'">确 定</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>


    </div>
</template>
<style>
    .handouts-form-item {
        width: 89%;
    }

    .handouts-form-item .el-form-item__content {
        width: 100%;
    }

    .handouts-form-item .el-form-item__content .addhandout {
        float: right;
    }
</style>
<script>
    import {format} from '../../../util/util'
    import FilesUpload from '../courseset/FilesModelUpload.vue'
    import Vue from '../../../common/vue.js'

    export default {
        components: {FilesUpload},
        props: [],
        data() {
            return {
                dialogVisible: false,
                ruleForm: {
                    bEnabled: '',
                },
                NewTableForm: {},
                tableData: [],
                file: [],
                currentIndex: '',
                Doing: 'addDate',
                handout: [],//讲义列表
            }
        },
        methods: {
            //获取讲义列表
            async getCourseHandout() {
                let url = this.course_id;
                let ret = await this.$http.getCourseHandout(url);
                if (ret.status == 0) {
                    this.handout = ret.result.list;
                }
            },
            //获取讲义是否设置
            async GetCourseDisable() {
                let course_id = this.$route.params.cid;
                let ret = await this.$http.GetCourseDisable(course_id);
                if (ret.status == 0) {
                    //0是没启用 1是启用了
                    this.ruleForm = {
                        bEnabled: ret.result.handout_download_open ? Number(ret.result.handout_download_open) : 0
                    }
                }
            },
            handleChange(value) {
                this.SetCourseDisable();
            },
            //设置讲义模块的启用
            async SetCourseDisable() {
                let cource_id = this.$route.params.cid;
                let params = {
                    setting_value: this.ruleForm.bEnabled,  //是否启用，0:不启用，1:启用
                    setting_key: 'handout_download_open', //启用键值，prefix:前导阶段；mock:模考阶段；classroom:翻转课堂；review:特殊复习阶段;knowledge_recommend:知识点判断推荐；knowledge_syllabus:知识骨牌;gaodun_course_id:高顿关联课程id;classroom_pk_open:班级pk；handout_download_open：讲义下载；study_record_open：学习记录；course_syllabus_open：课程大纲；glive_open：glive开关；
                }
                let ret = await this.$http.SetCourseDisable(cource_id, params);
            },
            //获取讲义列表
            async getCourseHandout() {
                let url = this.course_id;
                let ret = await this.$http.getCourseHandout(url);
                if (ret.status == 0) {
                    this.handout = ret.result.list;
                }
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
            async DeleteStage(id) {
                let ret = await this.$http.deleteCourseHandout(id);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getCourseHandout();
                } else if (ret.status > 0) {
                    ret.message ? ret.message : '删除失败！'
                    this.$message.error(ret.message)
                }

            },
            //新增数据
            addTableData() {
                this.NewTableForm = {
                    name: '',
                    content: '',
                    file_name: '',
                    size: '',
                    path: ''
                }
                this.Doing = 'addDate';
                this.file = [];
                this.dialogVisible = true;

            },
            addTable(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.AddCourseHandout();
                    } else {
                        return false;
                    }
                });
            },
            // 上传批量讲义
            async AddCourseHandout() {
                if (this.NewTableForm.path == "") {
                    this.$message({
                        showClose: true,
                        message: '你必须要上传一个讲义！',
                        type: 'warning'
                    })
                    return;
                }
                let params = {
                    ...this.NewTableForm,
                    course_id: this.course_id,
                }
                let ret = await this.$http.AddCourseHandout(params);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: ret.message ? ret.message : '添加成功！',
                    })
                    this.dialogVisible = false;
                    this.NewTableForm = {
                        name: '',
                        content: '',
                        file_name: '',
                        size: '',
                        path: ''
                    }
                    this.file = [];
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
                this.file = [
                    {
                        name: this.NewTableForm.file_name,
                        response: {
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
            // 更新讲义
            async updateCourseHandout() {
                if (this.NewTableForm.path == "") {
                    this.$message({
                        showClose: true,
                        message: '你必须要上传一个讲义！',
                        type: 'warning'
                    })
                    return;
                }
                let params = {
                    ...this.NewTableForm,
                    course_id: this.course_id,
                }
                console.log(params);
                let ret = await this.$http.updateCourseHandout(params.id, params);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: ret.message ? ret.message : '编辑成功！',
                    })
                    this.dialogVisible = false;
                    this.NewTableForm = {
                        name: '',
                        content: '',
                        file_name: '',
                        size: '',
                        path: ''
                    }
                    this.file = [];
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
                this.file = [];
            },
            //更新文件
            updateFlies(res, fileList){
                if(res && res != 'remove'){
                    this.NewTableForm.path = res.filePath ? res.filePath : '';
                    this.NewTableForm.upload_size = res.result && res.result.file.size ? res.result.file.size : '';
                    this.NewTableForm.file_name = res.result && res.result.file.name ? res.result.file.name : '';
                }else if(res == 'remove'){
                     this.NewTableForm.path = '';
                     this.NewTableForm.upload_size = '';
                     this.NewTableForm.file_name = '';
                     this.file = [];
                     return;
                }
                this.file = this.file.concat(fileList).slice(-1);
            },
        },
        computed: {
            course_id() {
                return this.$route.params.cid;
            }
        },
        mounted() {
            // Vue.$on('uploadFile', (res, fileList) => {
              
            // })
        },
        created() {
            this.GetCourseDisable();
            this.getCourseHandout()
        }
    }
</script>
