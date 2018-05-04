<template>
    <div class="">
        <el-dialog title="选择学习资源" class="tabplane addResourceDialog" top="2%" :visible.sync="dialogVisble" @close="closeDialog('addResFirFrom')" width="60%">
            <el-steps :active="active" finish-status="finish" simple style="margin-top: -10px;margin-bottom:10px;">
                <el-step :title="item.text" :key="index" v-for="(item,index) in progressText" description=""></el-step>
            </el-steps>
            <!-- 第一步 -->
            <el-form :model="addResFirFrom" ref="addResFirFrom" v-show="active == 0" @submit.native.prevent label-width="100px" class="demo-ruleForm">
                <el-form-item label="显示名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
                    <el-input class="coursetxt" v-model="addResFirFrom.name" @keydown.native.enter="firstNextSubmit('addResFirFrom')"></el-input>
                </el-form-item>

                <el-form-item class="coursebtn">
                    <el-button style="margin-top:12px;" @click="firstNextSubmit('addResFirFrom')">下一步</el-button>
                </el-form-item>
            </el-form>
            <!-- 第二步 -->
            <el-form label-width="100px" v-show="active == 1" class="demo-ruleForm">
                <div class="selectmodel">
                    <span :class="[selcurrent == item.discriminator ? 'is-active' : '']" @click="selectclk(item.discriminator)" v-for="(item,index) in resourceTypeList" :key="index">
                        {{item.label}}
                    </span>
                </div>
                <el-form-item class="coursebtn">
                    <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
                    <el-button style="margin-top:12px;" @click="secondSubmit">下一步</el-button>
                </el-form-item>
            </el-form>
            <!-- 第三步 -->
            <div class="rulemodule" v-show="active == 2">
                <el-row v-show="selcurrent === 'lecture_note' || selcurrent === 'video'">
                    <el-form label-position='left' label-width="60px">
                        <el-form-item label="来源">
                            <el-radio-group v-model="sourceRadio">
                                <el-radio :label="1">上传/创建</el-radio>
                                <el-radio :label="2">资源库检索</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>

                </el-row>
                <el-row v-show="sourceRadio == 1">
                    <handout-form ref="handoutForm" v-show="selcurrent === 'lecture_note'"></handout-form>
                    <video-form ref="videoForm" v-show="selcurrent === 'video'"></video-form>
                </el-row>
                <el-row v-show="sourceRadio == 2">
                    <el-input :placeholder="inputPlaceholder" size="small" v-model="resourceinput" @keydown.native.enter="handleIconClick">
                        <el-button slot="append" icon="el-icon-search" @click="handleIconClick"></el-button>
                    </el-input>
                    <el-table ref="singleTable" :data="resourceTable" border tooltip-effect="dark" v-loading="resLoading" style="width:100%;margin-top:20px;" max-height="400" @selection-change="handleSelectionChange" highlight-current-row @current-change="handleTableChange">
                        <el-table-column :label="item.label" :width="item.wh" v-for="(item,index) in resourceTableConfig" :key="index" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <template v-if="item.key == 'id' || item.key == 'paper_id' || item.key == 'live_id' ">
                                    <el-radio class="radio" v-model="resourceRadio" :label="String(scope.row.id)"></el-radio>
                                    <span>{{scope.row[item.key]}}</span>
                                </template>
                                <span v-else-if="item.key == 'discriminator'">{{scope.row[item.key] | Resource2chn}}</span>
                                <span v-else>{{scope.row[item.key]}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="pagination.current_page" :page-size="50" layout="total, prev, pager, next, jumper" :total="pagination.total">
                    </el-pagination>

                </el-row>
                <div class="coursebtn" style="padding-top: 0;margin-top: 40px;">
                    <el-button style="margin-top:12px;" @click="prev">上一步</el-button>
                    <!-- <el-button style="margin-top:12px;" v-show="nextclk" @click="next">下一步</el-button> -->
                    <el-button type="primary" v-if="OptResAction==='add'" :loading="btnLoading" @click="addSyllabusResource">{{btnLoading?'新增中':'确 定'}}
                    </el-button>
                    <el-button type="primary" v-if="OptResAction==='update'" :loading="btnLoading" @click="updateSyllabusResource">{{btnLoading?'新增中':'确 定'}}
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
.tabplane .el-dialog {
    min-width: 680px;
}
.addResourceDialog .el-pagination {
    text-align: right;
    margin-top: 14px;
}
.ghostClass {
    opacity: 1;
}
.permission-outlinemodule {
    .el-dialog__body {
        .el-steps {
            line-height: normal;
        }
        .rulemodule {
            // .el-select {
            //     .el-input{
            //         width: 120px;
            //     }
            // }
            .el-table {
                .el-radio .el-radio__label {
                    display: none;
                }
            }
        }
    }
}
</style>
<script>
import {
    progressText,
    resourceTypeList,
    resourceTableConfig
} from "../../common/outlineConfig.js";
import { isNumber } from "../../util/util.js";
import handoutForm from "./SyllabusModuleHandoutForm.vue";
import videoForm from "./SyllabusModuleVideoForm.vue";
export default {
    name: "OptResurce",
    components: {
        handoutForm,
        videoForm
    },
    props: {
        itemId: {
            // 条目id
            required: true,
            default: 0
        },
        dialogVisble: {
            default: false
        },
        OptResAction: {
            default: "add"
        }
    },
    data() {
        return {
            project_id: "", //项目id
            subject_id: "", //科目id
            btnLoading: false, //按钮loading
            active: 0, //步骤条active
            resourceRadio: "", //选择的资源
            selectType: "", //输入框搜索
            nativeResourceRadio: "", //修改之前本来选择的资源
            ResIsInOutline: false, //检查该资源是否已经挂载
            resourceTableConfig: [], //表单配置
            radio1: 1,
            radio2: 4,
            tabledata: [],
            progressText: progressText,
            addResFirFrom: {
                name: ""
            },
            ruleProject: {
                name: ""
            },
            dialogFormVisible: true,
            resourceTable: [], //资源列表
            multipleSelection: [],
            dialogVisible: false,
            adddialogVisible: false, //新增和修改大纲目录的弹层
            Moduledialog: true, //增加子目录的弹层的标题
            bigdislog: false,
            deleteModule: true,
            selcurrent: "video",
            inputPlaceholder: "请输入视频资源ID / 名称",
            refname: "",
            coursesylllevel: "",
            coursesyllid: "",
            currentId: "0", //0是最外层父级大纲   pid也表示当前需要操作的id
            title: "", //课程大纲标题
            resourceTypeList: resourceTypeList,
            tag_id: "", //标签id
            resourceAction: "add", //资源弹层的操作
            pagination: {
                current_page: 1, //资源列表当前页数
                total: 1 //资源列表总数量
            },
            resLoading: false, //loading
            resourceinput: "", //根据id或者名称搜索
            searchResourceTimer: "", //搜索资源演示器
            sortOptions: "", //排序参数
            sourceRadio: 1 //资源选择的切换按钮
        };
    },
    methods: {
        handleTableChange(val) {
            this.resourceRadio = String(val.id);
        },
        selectclk(discriminator) {
            this.selcurrent = discriminator;
        },
        //关闭新增资源的弹层
        closeDialog(formName) {
            this.addResFirFrom = {
                name: ""
            };
            this.$refs[formName].resetFields();
        },
        //弹出新增资源的弹层
        openAddResDialog(id) {
            this.currentId = id;
            this.active = 0;
            this.addResFirFrom.name = "";
            this.resourceRadio = "";
            this.nativeResourceRadio = "";
            this.dialogFormVisible = true;
            this.resourceAction = "add";
        },
        //第一步往下一步
        firstNextSubmit(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    if (this.active >= this.progressText.length - 1) return;
                    this.active++;
                } else {
                    return false;
                }
            });
        },
        //第二步往下一步
        async secondSubmit() {
            if (!this.selcurrent) {
                this.$message.warning("请选择资源类型！");
                return;
            }
            if (this.active >= this.progressText.length - 1) return;
            resourceTableConfig.forEach(ele => {
                if (ele.discriminator == this.selcurrent) {
                    this.resourceTableConfig = ele.table;
                    this.inputPlaceholder = ele.inputPlaceholder;
                }
            });
            if (
                this.selcurrent !== "lecture_note" &&
                this.selcurrent !== "video"
            ) {
                this.sourceRadio = 2;
                //直接资源库检索
            } else {
                this.sourceRadio = 1;
            }
            this.active++;
            this.resourceinput = ""; //输入框搜索初始化
            this.resourceTable = []; //初始化资源列表
            if (this.pagination.current_page != 1) {
                this.pagination.current_page = 1;
            } else {
                this.searchResource();
            }
        },
        //分页搜索
        async handleCurrentChange(val) {
            val = Number(val);
            this.searchResource(val);
        },
        //点击搜索
        async handleIconClick() {
            if (this.pagination.current_page != 1) {
                this.pagination.current_page = 1;
            } else {
                this.searchResource();
            }
        },
        //搜索资源
        searchResource(val) {
            clearTimeout(this.searchResourceTimer);
            this.resLoading = true;
            this.searchResourceTimer = setTimeout(async () => {
                clearTimeout(this.searchResourceTimer);
                let params = {
                    discriminator: this.selcurrent,
                    page_size: 50,
                    page: val ? val : 1,
                    "order_by[]": "desc", //顺序   倒序
                    "order_by_field[]": "id", //排序字段
                    project_id: this.project_id
                    // subject_id: this.subject_id,
                };
                let resourceinput = this.resourceinput.trim();
                switch (this.selcurrent) {
                    case "legacy_live":
                        if (isNumber(resourceinput)) {
                            params.legacy_live_id = resourceinput;
                        } else {
                            params.keywords = resourceinput;
                        }
                        break;
                    case "paper":
                        if (isNumber(resourceinput)) {
                            params.paper_id = resourceinput;
                        } else {
                            params.keywords = resourceinput;
                        }
                        break;
                    default:
                        params.keywords = resourceinput;
                        break;
                }
                let ret = await this.$http.getResource(params);
                if (ret.status == 0) {
                    this.resLoading = false;
                    this.resourceTable = ret.result.resources;
                    this.pagination.total = ret.result.pagination.total;
                }
            }, 500);
        },
        prev() {
            if (this.active <= 0) return;
            this.active--;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //新增大纲资源
        async addSyllabusResource() {
            // 判断资源的来源 1 上传创建 2资源库检索
            debugger;
            if (this.sourceRadio === 1) {
                switch (this.selcurrent) {
                    case "lecture_note":
                        // 讲义
                        this.$refs.handoutForm.submitForm("ruleForm");
                        break;
                    case "video":
                        // 视频
                        this.$refs.videoForm.submitForm();
                        break;
                }
            } else if (this.sourceRadio === 2) {
                if (!this.resourceRadio) {
                    this.$message.error("请选择资源");
                    return;
                }
                //先查询时候挂载了该资源
                this.btnLoading = true;
                let res = await this.$http.checkResIsInOutline(
                    this.coursesyllid,
                    this.resourceRadio
                );
                if (res.status == 0) {
                    if (res.result.length > 0) {
                        this.resourceRadio = "";
                        this.$message({
                            type: "error",
                            message: "该资源已经挂载在这个大纲上！"
                        });
                        this.btnLoading = false;
                        return;
                    }
                } else {
                    this.btnLoading = false;
                    return;
                }
            }

            //先走新增大纲条目名字
            let ret = await this.$http.CourseSyllabusItem({
                name: this.addResFirFrom.name,
                pid: this.currentId,
                course_syllabus_id: this.coursesyllid
            });
            if (ret.status == 0) {
                //再走新增大纲资源
                let id = ret.result.id;
                let params = {
                    resource_id: this.resourceRadio,
                    tag_id: this.tag_id,
                    course_syllabus_id: this.coursesyllid
                };
                let retv = await this.$http.addSyllabusResource(id, params);
                this.btnLoading = false;
                if (retv.status == 0) {
                    this.$message({
                        type: "success",
                        message: "新增资源成功！"
                    });
                    this.dialogFormVisible = false;
                    this.getSyllabusItems();
                } else if (retv.status == 2) {
                    this.$message.error("添加失败！");
                }
            } else if (ret.status == 2) {
                this.$message.error("添加失败！");
                this.btnLoading = false;
            }
        },
        //修改大纲的资源 包含名称&挂载资源
        async updateSyllabusResource() {
            if (!this.resourceRadio) {
                this.$message.error("请选择资源");
                return;
            }
            if (this.nativeResourceRadio != this.resourceRadio) {
                //先查询时候挂载了该资源
                let res = await this.$http.checkResIsInOutline(
                    this.coursesyllid,
                    this.resourceRadio
                );
                if (res.status == 0) {
                    if (res.result.length > 0) {
                        this.resourceRadio = "";
                        this.$message({
                            type: "error",
                            message: "该资源已经挂载在这个大纲上！"
                        });
                        return;
                    }
                }
            }
            //先走修改大纲条目名字
            let id = this.currentId;
            let name = {
                name: this.addResFirFrom.name,
                course_syllabus_id: this.coursesyllid
            };
            let ret = await this.$http.ChangeSyllabusItem(id, name);
            if (ret.status == 0) {
                //再走修改大纲资源
                let id = ret.result.id ? ret.result.id : this.currentId;
                let params = {
                    resource_id: this.resourceRadio,
                    tag_id: this.tag_id,
                    course_syllabus_id: this.coursesyllid
                };
                let retv = await this.$http.addSyllabusResource(id, params);
                if (retv.status == 0) {
                    this.$message({
                        type: "success",
                        message: "修改资源成功！"
                    });
                    this.dialogFormVisible = false;
                    this.getSyllabusItems();
                } else if (retv.status == 2) {
                    this.$message.error("修改资源失败！");
                }
            } else if (ret.status == 2) {
                this.$message.error("修改资源失败！");
            }
        },
        //弹出修改资源的弹层
        openeEditResource(item) {
            this.active = 0;
            this.addResFirFrom.name = item.name;
            this.currentId = item.id;
            this.resourceRadio = item.resource && String(item.resource.id);
            this.nativeResourceRadio =
                item.resource && String(item.resource.id); //原来的选项
            this.selcurrent = item.resource && item.resource.discriminator;
            this.dialogFormVisible = true;
            this.resourceAction = "update";
        }
    },
    computed: {},
    mounted() {},
    created() {
        this.coursesyllid = this.$route.params.sid;
        this.getSyllabusItems();
        this.checkSyllabus();
    }
};
</script>
