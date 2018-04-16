<template>
    <div>
        <!--阶段-->
        <el-row style="margin-bottom: 22px;">
            <div class="fromtitle">
                <i class="titicon"></i>
                <span class="tittxt">阶段</span>
            </div>
            <el-table :data="tableData" border style="width: 90%;margin-top: 16px;">
                <el-table-column label="阶段名称" width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="阶段描述" width="220">
                    <template slot-scope="scope">
                        <span>{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="阶段课程大纲 ">
                    <template slot-scope="scope">
                        <span>{{scope.row.syllabus_id}} - {{scope.row.syllabus_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
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

        <el-dialog class="addContent tabplane" title="新增一个阶段" :visible.sync="dialogVisible"
                   @close="cancel('NewTableForm')">

            <el-form :model="NewTableForm" ref="NewTableForm" label-width="100px">
                <el-form-item label="阶段名称" prop="name"
                              :rules="filter_rules({required:true,type:'isAllSpace',max:10})">
                    <el-input v-model="NewTableForm.name" class="coursetxt"></el-input>
                </el-form-item>
                <el-form-item label="阶段介绍" prop="description"
                              :rules="filter_rules({required:true,type:'isAllSpace',max:20})">
                    <el-input v-model="NewTableForm.description" class="coursetxt"></el-input>
                </el-form-item>
                <el-form-item label="阶段课程大纲" prop="syllabus_id"
                              :rules="[{required: true, message: '选择该阶段的课程大纲', trigger: 'change'}]">
                    <el-select @change="handleChange" v-model="NewTableForm.syllabus_id" placeholder="选择该阶段的课程大纲"
                               style="width: 90%;">
                        <el-option :label="item.id+' - '+item.title" :value="String(item.id)"
                                   v-for="item in outlineList"
                                   :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="openSyllabusPage">查看大纲
                    </el-button>
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
                currentTemplate: '',//当前大纲的模板  定位需要跳转的页面
                tableData: [],
                currentIndex: '',
                operation: '',
                gradation_id: '',   //阶段的id 用于修改、删除
            }
        },
        methods: {
            //新增数据 确定
            addTable(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.AddCourseStage();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleChange(sy_id) {
                this.outlineList.forEach((item) => {
                    console.log(item);
                    if (item.id == sy_id) {
                        this.currentTemplate = item.template;
                    }
                })
            },
            //打开大纲页面
            openSyllabusPage() {
                let sy_id = this.NewTableForm.syllabus_id;
                console.log(this.currentTemplate);
                if (sy_id) {
                    if (this.currentTemplate) {
                        window.open(`/#/syllabus/manage/edit/${sy_id}`);
                    } else {
                        window.open(`/#/syllabus/manage/template/${sy_id}`);
                    }
                } else {
                    window.open('/#/syllabus/manage/list');
                }
            },
            async AddCourseStage() {
                let params = {
                    ...this.NewTableForm,
                    course_id: this.course_id,
                }
                let ret = await this.$http.AddCourseStage(params);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: ret.message,
                    })
                    this.dialogVisible = false;
                    this.getStageAndOutline();
                } else if (ret.status > 0) {
                    ret.message ? ret.message : '添加失败！'
                    this.$message.error(ret.message);
                }
            },
            //更新数据
            updateTable(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.changeStage();
                    } else {
                        return false;
                    }
                });
            },
            async changeStage() {
                let gradation_id = this.gradation_id;
                let params = {
                    ...this.NewTableForm,
                    course_id: this.course_id,
                }
                let ret = await this.$http.changeStage(gradation_id, params);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: ret.message
                    })
                    this.dialogVisible = false;
                    this.getStageAndOutline();
                } else if (ret.status > 0) {
                    ret.message ? ret.message : '修改失败！'
                    this.$message.error(ret.message)
                }
            },
            handleDelete(index, row) {
                this.gradation_id = row.id;
                this.$confirm('此操作将删除该阶段, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.DeleteStage();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            //删除一个阶段
            async DeleteStage() {
                let gradation_id = this.gradation_id;
                let ret = await this.$http.DeleteStage(gradation_id);
                if (ret.status == 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getStageAndOutline();
                } else if (ret.status > 0) {
                    ret.message ? ret.message : '删除失败！'
                    this.$message.error(ret.message)
                }
            },
            //弹层新增阶段弹层
            addTableData() {
                this.NewTableForm = {
                    name: '',
                    description: '',
                    syllabus_id: ''
                }
                this.Doing = 'addDate';
                this.dialogVisible = true
            },
            handleEdit(index, row) {
                this.Doing = 'update';
                this.gradation_id = row.id;
                this.NewTableForm = {...this.tableData[index]};
                this.currentIndex = index;
                this.dialogVisible = true;
            },
            cancel(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
            },
            async getStageAndOutline() {
                let course_id = this.course_id;
                let ret = await this.$http.getStageAndOutline(course_id);
                if (ret.status == 0) {
                    this.tableData = ret.result.gradation_list;
                }
            },
        },
        computed: {
            course_id() {
                return this.$route.params.cid;
            },
            outlineList() {
                return this.$store.state.course.course_Syllabuses;
            }
        },
        mounted() {
        },
        created() {
            this.getStageAndOutline();
        }
    }
</script>