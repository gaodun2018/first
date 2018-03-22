<template>
    <div class="module-clues-content add-resource">
        <div class="outlineeat">
            {{id?'编辑视频':'新增视频'}}
        </div>
        <div class="frombox">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px"
                     class="demo-ruleForm" v-loading="loading">
                <el-form-item label="视频名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
                    <el-input v-model="ruleForm.title" placeholder="请填写视频名称" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="项目" prop="project" class="w_50"
                              :rules="[{required: true, message: '请选择所属项目', trigger: 'change'}]">
                    <el-select v-model="ruleForm.project" filterable placeholder="请选择所属项目"
                               @change="didChangeProjectSelection" @visible-change="visibleChange">
                        <el-option :label="tag.name" :value="String(tag.id)" v-for="tag in tags"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目" prop="subject" class="w_50"
                              :rules="[{required: true, message: '请选择所属科目', trigger: 'change'}]">
                    <el-select v-model="ruleForm.subject" filterable placeholder="请选择所属科目">
                        <el-option :label="tag.name" :value="String(tag.id)" v-for="tag in subjectData"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明" prop="description">
                    <el-input v-model="ruleForm.description"  placeholder="备注说明" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="视频地址" prop="video_id"
                              :rules="[{required: true, message: '请输入视频ID', trigger: 'change'}]">
                    <el-input v-model="ruleForm.video_id" placeholder="请输入视频ID" auto-complete="off" class="w_60"></el-input>
                    <!--<span class="gray_12">asdasdasd</span>-->
                    <!-- <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button> -->
                </el-form-item>
                <el-form-item label="视频时长（分）" prop="duration_minutes" class="displayinline"
                              :rules="[{required: true, message: '请填写视频时长的分钟', trigger: 'change,blur'}]">
                    <el-input v-model="ruleForm.duration_minutes" placeholder="请填写视频时长的分钟" auto-complete="off"></el-input>
                    分
                </el-form-item>
                <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline"
                              :rules="[{message: '请填写视频时长的秒', trigger: 'change,blur'}]">
                    <el-input v-model="ruleForm.duration_second" placeholder="请填写视频时长的秒" auto-complete="off"></el-input>
                    秒
                </el-form-item>
                <!--<el-form-item label="知识点关联" prop="name">-->
                <!--<el-button type="text" @click="selectknowledge">选择知识点</el-button>-->
                <!--</el-form-item>-->
                <el-form-item style="text-align: right">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--<SelectKnowledge></SelectKnowledge>-->

    </div>
</template>
<script>
    import SelectKnowledge from './resourceModuleSelectKnowledge.vue'
    import {getTags, getOneResource, storeResource, editVideoResource} from '../../api/resource.js'

    export default {
        components: {
            SelectKnowledge
        },
        props: [
            'id'
        ],
        data() {
            return {
                tags: [],
                subjectData: [],
                loading: false,
                selectFalg: false,
                ruleForm: {
                    title: '',
                    project: '',
                    subject: '',
                    video_id: '',
                    duration_minutes: '',
                    duration_second: '',
                    description: '',
                },
                multipleSelection: []
            }
        },
        methods: {
            async initData() {
                let ret = await getOneResource(this.$route.params.id);
                if (ret.status == 0) {
                    this.tags = ret.result.tags;
                    let data = ret.result.resource;
                    this.ruleForm.title = data.title;
                    this.ruleForm.description = data.description;
                    this.ruleForm.video_id = data.video_id;
                    this.ruleForm.duration_minutes = String(data.duration_minutes);
                    this.ruleForm.duration_second = String(data.duration_seconds);
                    if (data.tag.id) {
                        this.ruleForm.project = String(data.tag.id);
                        this.ruleForm.subject = (data.tag.children && data.tag.children.length != 0) ? String(data.tag.children[0].id) : '0';
                    } else {
                        this.ruleForm.project = '';
                        this.ruleForm.subject = '';
                    }
                }
            },
            //选择器开关函数
            visibleChange(bool) {
                this.selectFalg = bool
            },
            // 项目
            didChangeProjectSelection(id) {
                console.log(id);
                this.tags.forEach((item) => {
                    if (item.id == id) {
                        let subject_list = [...item.children];
                        console.log(subject_list);
                        subject_list.unshift({
                            id: '0',
                            name: '全部'
                        })
                        this.subjectData = subject_list;
                        if (this.selectFalg) {
                            this.ruleForm.subject = '0';
                        }
                    }
                })
            },
            //选择知识点
            selectknowledge() {
                this.$store.dispatch('changeDialog', true)
            },
            //新增视频
            async createResourceForm() {
                let params = {
                    title: this.ruleForm.title,
                    description: this.ruleForm.description,
                    tag_id: this.ruleForm.subject == '0' ? this.ruleForm.project : this.ruleForm.subject,
                    // duration: `${this.ruleForm.duration_minutes}:${this.ruleForm.duration_second}`,
                    duration_minutes: this.ruleForm.duration_minutes,
                    duration_seconds: this.ruleForm.duration_second ? this.ruleForm.duration_second : 0,
                    video_id: this.ruleForm.video_id
                }
                this.loading = true;
                let createResponse = await storeResource(params);
                this.loading = false;
                if (createResponse.status == 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path: '/resource/video/list'
                        })
                    }, 1000)
                    // this.resetForm('ruleForm');
                } else {
                    this.$message({
                        message: "保存失败",
                        type: "error"
                    });
                }
            },
            //修改视频资源
            async editVideoResource() {
                let params = {
                    title: this.ruleForm.title,
                    description: this.ruleForm.description,
                    tag_id: this.ruleForm.subject == '0' ? this.ruleForm.project : this.ruleForm.subject,
                    duration_minutes: this.ruleForm.duration_minutes,
                    duration_seconds: this.ruleForm.duration_second ? this.ruleForm.duration_second : 0,
                    video_id: this.ruleForm.video_id
                }
                this.loading = true;
                let Response = await editVideoResource(this.$route.params.id, params);
                this.loading = false;
                if (Response.status == 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path: '/resource/video/list'
                        })
                    }, 1000)
                    // this.resetForm('ruleForm');
                } else {
                    this.$message({
                        message: "保存失败",
                        type: "error"
                    });
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.$route.params.id) {
                            //修改'
                            this.editVideoResource();
                        } else {
                            //新增
                            this.createResourceForm();
                        }
                    } else {
                        console.log('error submit!!');
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //关闭弹层
            closeDialog(formName) {
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
        async created() {
            this.loading = true
            this.id = this.$route.params.id;
            // this.resource = (await getOneResource(this.id)).result
            if (this.$route.params.id) {
                await this.initData();
            } else {
                this.tags = (await getTags('project')).result;
            }
            this.loading = false;

        }
    }
</script>