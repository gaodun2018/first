<template>
    <div class="module-edu-content permission-courseoutline">

        <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
            <el-row>
                <el-col :sm="24">
                    <div class="button_group_t">
                        <span>项 目:</span>
                        <span class="clitem" :class="[clver === null ?'current':'']" @click="outlinechange(null)">全部</span>
                        <span class="clitem" :class="[rev.project_id === clver ?'current':'']" v-for="(rev,index) in projectlist" :key="index" @click="outlinechange(rev.project_id,index)">{{rev.project_name}}
                        </span>
                    </div>
                    <div class="button_group_b">
                        <span> 科 目:</span>
                        <span class="clitem" :class="[clversm === null ?'current':'']" @click="mulchange(null)">全部</span>
                        <span class="clitem" :class="[revs.subject_id === clversm ?'current':'']" v-for="(revs,index) in subjectlist" :key="index" @click="mulchange(revs.subject_id,index)">{{revs.subject_name}}
                        </span>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" align="bottom">
                <el-col :sm="6">
                    <el-row>
                        <div class="select-search">
                            <el-select v-model="selectvalue" @change="selectval" placeholder="请选择" size="small">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </div>
                    </el-row>
                </el-col>
                <el-col :sm="18">
                    <el-row type="flex" justify="end">
                        <div class="input-search">
                            <el-input placeholder="请输入课程大纲ID、名称" size="small" v-model="searchinput" @keyup.native.enter="handleIconClick">
                                <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
                            </el-input>
                            <el-button type="primary" size="small" @click="addCourseOutline" v-if="unlocking('SY_CREATE')">+&nbsp;新建一个课程大纲</el-button>
                            <a class='docBtn' :href="`${docUrl}#/outlineCourse`" target="_blank">
                                <i class="el-icon-question"></i>
                                使用帮助
                            </a>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="edu_table">
            <el-table ref="multipleTable" v-loading="tableLoading" border :data="CourseLineList" style="width: 100%">
                <el-table-column prop="id" label="大纲ID" min-width="100" fixed>
                </el-table-column>
                <el-table-column prop="title" label="课程大纲名称" min-width="200">
                </el-table-column>
                <el-table-column prop="project.name" label="所属项目" min-width="100">
                </el-table-column>
                <el-table-column prop="subject.name" label="所属科目" min-width="125">
                </el-table-column>
                <!--<el-table-column prop="num" label="使用" min-width="150">-->
                <!--</el-table-column>-->
                <el-table-column label="所属状态" min-width="115">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == 0">启用</span>
                        <span class="rowtype" v-else>禁用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="200" fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row)" v-if="unlocking('SY_BASIC_SET')">基本设置</el-button>
                        <el-button type="text" @click="checkSyllabus(scope.$index, scope.row)" v-if="unlocking('SY_CONTENT')">编辑大纲内容</el-button>
                        <el-button type="text" @click="UpdateOutlineTitle(scope.$index, scope.row, 'true')" >复制大纲</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="edu-pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 30,50]" :page-size="page_size" :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper" :total="courselinenum">
                </el-pagination>
            </div>
        </div>

        <el-dialog :title="dialogTitle" class="tabplane" :visible.sync="dialogFormVisible" @close="resetForm('ruleForm')">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="课程大纲名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
                    <el-input class="coursetxt" v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="所属项目" prop="project_id" :rules="[ { required: true, message: '请选择所属项目', trigger: 'change' }]">
                    <el-select v-model="ruleForm.project_id" @change="checkproject" @visible-change="visibleChange" placeholder="请选择所属项目" :disabled="isCopy">
                        <el-option v-for="rev in projectlist" :key="rev.project_id" :label="rev.project_name" :value="String(rev.project_id)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属科目" prop="subject_id" :rules="[ { required: true, message: '请选择所属科目', trigger: 'change' }]">
                    <el-select v-model="ruleForm.subject_id" :disabled="!issubject" placeholder="请选择所属科目">
                        <el-option label="不限科目" value="0"></el-option>
                        <el-option v-for="com in boxsubject" :key="com.subject_id" :label="com.subject_name" :value="String(com.subject_id)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="status" :rules="[ { required: true, message: '请选择是否启用', trigger: 'change' }]">
                    <el-select v-model="ruleForm.status" placeholder="是否启用" :disabled="isCopy">
                        <el-option label="是" value="0"></el-option>
                        <el-option label="否" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="coursebtn">
                    <el-button type="primary" v-if="substatus=='addoutline'" :loading="btnLoading" @click="submitForm('ruleForm')">{{btnLoading?'保存中':'确 定'}}
                    </el-button>
                    <el-button type="primary" v-if="substatus=='updateoutline'" :loading="btnLoading" @click="updateForm('ruleForm')">{{btnLoading?'保存中':'保 存'}}
                    </el-button>
                    <el-button type="primary" v-if="substatus=='copyoutline'" :loading="btnLoading" @click="submitForm('ruleForm')">{{btnLoading?'保存中':'复 制'}}
                    </el-button>
                    <el-button @click="resetForm('ruleForm')">取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<style>

</style>
<script>
import { mapState } from "vuex";
import {getDocumentUrl} from '../../util/config.js'

export default {
    data() {
        return {
            docUrl:getDocumentUrl,
            tableLoading: false, //列表loading
            btnLoading: false, //按钮loading
            searchinput: "",
            CourseLineList: [],
            courselinenum: 0,
            ruleForm: {
                title: "",
                project_id: "",
                subject_id: "",
                status: ""
            },
            dialogFormVisible: false,
            options: [
                {
                    value: "",
                    label: "全部状态"
                },
                {
                    value: "0",
                    label: "启用"
                },
                {
                    value: "1",
                    label: "禁用"
                }
            ],
            selectvalue: "",
            clver: null, //项目id
            clversm: null, //科目id
            subjectlist: [],
            issubject: false,
            boxsubject: [],
            currentPage: 1, //第几页 当前页码
            page_size: 15, //一页显示多少
            currentIndex: "",
            substatus: "addoutline",
            outlineid: "",
            dialogCourse: true,
            selectcur: false, //项目选择器开关
            isCopy:false,//复制大纲状态
            dialogTitle: '新建课程大纲'
        };
    },
    methods: {
        //项目选择器开关
        visibleChange(bool) {
            this.selectcur = bool;
        },
        checkproject(value) {
            if (this.selectcur) {
                console.log("checkproject   checkproject   checkproject");
                for (let reg of this.projectlist) {
                    if (reg.project_id == value) {
                        this.issubject = true;
                        let subjectall = [...reg.subject_list];
                        /*subjectall.unshift({
                              subject_id:'0',
                              subject_name:'全部'
                            })*/
                        this.boxsubject = subjectall;
                        this.ruleForm.subject_id = "0";
                    }
                }
            }
        },
        async coursesubmit(ruleForm) {
            // 添加一个课程大纲提交
            this.btnLoading = true;
            let ret = await this.$http.CourseSyllabus({ ...ruleForm });
            this.btnLoading = false;
            if (ret.status == 0) {
                this.dialogFormVisible = false;
                this.clver = null; //项目id
                this.clversm = null; //科目id
                this.currentPage = 1;
                this.page_size = 15;
                this.getCourseSyllabuses();
                this.$message({
                    message: "已添加成功",
                    type: "success"
                });
            }
        },
        async coursesubmitcopy(ruleForm) {
            // 复制一个课程大纲提交
            this.btnLoading = true;
            let ret = await this.$http.CourseSyllabusCopy({ ...ruleForm });
            this.btnLoading = false;
            if (ret.status == 0) {
                this.dialogFormVisible = false;
                this.clver = null; //项目id
                this.clversm = null; //科目id
                this.currentPage = 1;
                this.page_size = 15;
                this.getCourseSyllabuses();
                this.$message({
                    message: "已复制成功",
                    type: "success"
                });
            }else{
              this.$message({
                message: "复制失败",
                type: "error"
              });
            }
        },
        submitForm(formName) {
            // 添加一个课程大纲
            if (this.substatus == "addoutline") {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.coursesubmit(this.ruleForm);
                    } else {
                        return false;
                    }
                });
            }else if(this.substatus == "copyoutline"){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.coursesubmitcopy(this.ruleForm);
                    } else {
                        return false;
                    }
                });
            }
        },
        async courseupdate() {
            // 修改一个课程大纲提交
            this.btnLoading = true;
            let ret = await this.$http.UpdateCourseSyllabus(this.outlineid, {
                ...this.ruleForm
            });
            this.btnLoading = false;
            if (ret.status == 0) {
                this.dialogFormVisible = false;
                this.clver = null; //项目id
                this.clversm = null; //科目id
                this.currentPage = 1;
                this.page_size = 15;
                this.getCourseSyllabuses();
                this.outlineid = "";
                this.$message({
                    message: "修改大纲成功",
                    type: "success"
                });
            }
        },
        updateForm(formName) {
            // 修改一个课程大纲
            if (this.substatus == "updateoutline") {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.courseupdate();
                    } else {
                        return false;
                    }
                });
            }
        },
        addCourseOutline() {
            // 新增一个课程大纲 弹出框
            this.btnLoading = false;
            this.substatus = "addoutline";
            this.dialogCourse = true;
            this.isCopy = false;
            this.dialogTitle = "新建课程大纲";
            this.ruleForm = {
                title: "",
                project_id: "",
                subject_id: "",
                status: ""
            };
            this.dialogFormVisible = true;
            this.issubject = false;
        },
        //关闭新建、编辑大纲弹层
        resetForm(formName) {
            this.ruleForm = {
                title: "",
                project_id: "",
                subject_id: "",
                status: ""
            };
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        outlinechange(reid, index) {
            this.clver = reid;
            if (reid === null) {
                this.subjectlist = [];
            } else {
                this.subjectlist = this.projectlist[index].subject_list;
            }
            this.clversm = null; //科目设置为0
            this.pageSize = 15;
            this.currentPage = 1;
            this.searchinput = "";
            this.selectvalue = "";
            this.getCourseSyllabuses(1, this.page_size);
        },
        mulchange(reid) {
            this.clversm = reid;
            this.pageSize = 15;
            this.currentPage = 1;
            this.searchinput = "";
            this.getCourseSyllabuses();
        },
        // async getProjectSubject(projectid) {
        //     let ret = await this.$http.getProjectSubject();
        //     if (ret.status == 0) {
        //         this.projectlist = ret.result;
        //     }
        // },
        selectval(value) {
            // 状态搜索
            this.selectvalue = value;
            this.getCourseSyllabuses(1, this.page_size);
            this.searchinput = "";
        },
        handleIconClick() {
            // 搜索框
            this.clversm = null;
            this.clver = null;
            this.selectvalue = "";
            this.subjectlist = [];
            this.getCourseSyllabuses();
        },
        //拉去大纲列表
        async getCourseSyllabuses() {
            console.log(this.currentPage);
            this.tableLoading = true;
            let ret = await this.$http.CourseSyllabuses({
                page: this.currentPage,
                page_size: this.page_size,
                project_id: this.clver,
                subject_id: this.clversm,
                status: this.selectvalue,
                keyword: this.searchinput
            });
            if (ret.status == 0) {
                this.tableLoading = false;
                this.CourseLineList = ret.result.list;
                this.courselinenum = parseInt(ret.result.total);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.page_size = val;
            this.currentPage = 1;
            this.getCourseSyllabuses();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getCourseSyllabuses();
        },
        UpdateOutlineTitle(index, row, copy) {

            this.ruleForm = {
                title: row.title,
                project_id: String(row.project.id),
                subject_id: String(row.subject.id),
                status: String(row.status)
            };
            //判断是编辑还是复制
            if(copy){
                //复制一个课程大纲
                this.btnLoading = false;
                this.dialogTitle = "复制课程大纲";
                this.ruleForm.title = "";
                this.substatus = "copyoutline";
                this.issubject = false;
                this.ruleForm.id = row.id;
                this.isCopy = true;
                if(row.template){
                  this.ruleForm.template_id = row.template.id;
                }else{
                  this.ruleForm.template_id = 0;
                }
            }else{
                // 修改一个课程大纲 弹出框
                this.btnLoading = false;
                this.isCopy = false;
                this.dialogTitle = "编辑课程大纲";
                console.log(row);
                if(this.ruleForm.hasOwnProperty("id")){
                    delete this.ruleForm.id;
                }
                if(this.ruleForm.hasOwnProperty("template_id")){
                  delete this.ruleForm.template_id;
                }
                this.substatus = "updateoutline";
                this.dialogCourse = false;
                this.issubject = true;
                this.outlineid = row.id;
            }
            for (var i = 0; i < this.projectlist.length; i++) {
                if (this.projectlist[i].project_id == row.project.id) {
                    let subjectall = [...this.projectlist[i]["subject_list"]];
                    this.boxsubject = subjectall;
                }
            }

            this.currentIndex = index;
            this.dialogFormVisible = true;
        },
        //查看大纲按钮
        checkSyllabus(index, row) {
            if (row.template == null) {
                this.$router.push({
                    path: "/syllabus/manage/template/" + row.id
                });
            } else {
                this.$router.push({
                    path: "/syllabus/manage/edit/" + row.id
                });
            }
        }
    },
    computed: {
        ...mapState({
            projectlist: state => {
                return state.common.project_subject_list;
            }
        })
    },
    mounted() {
        // this.getProjectSubject();
        this.$store.dispatch("getProjectSubjectList");
        this.getCourseSyllabuses();
    },
    created() {}
};
</script>
