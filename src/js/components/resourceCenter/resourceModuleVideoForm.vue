<template>
    <div class="module-clues-content add-resource">
        <div class="outlineeat">
            {{id?'编辑视频':'新增视频'}}
        </div>
        <div class="frombox">
            <el-form :model="ruleForm" ref="ruleForm" label-width="120px"
                     class="demo-ruleForm" v-loading="loading">
                <el-form-item label="视频名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',max:30})">
                    <el-input v-model="ruleForm.title" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="项目" prop="project" class="w_50"
                              :rules="[{required: true, message: '请选择所属项目', trigger: 'change'}]">
                    <el-select v-model="ruleForm.project" filterable
                               @change="didChangeProjectSelection" @visible-change="visibleChange">
                        <el-option :label="tag.name" :value="String(tag.id)" v-for="tag in tags"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目" prop="subject" class="w_50"
                              :rules="[{required: true, message: '请选择所属科目', trigger: 'change'}]">
                    <el-select v-model="ruleForm.subject" filterable>
                        <el-option :label="tag.name" :value="String(tag.id)" v-for="tag in subjects"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明" prop="description">
                    <el-input v-model="ruleForm.description" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="视频地址" prop="video_id"
                              :rules="[{required: true, message: '请输入视频ID', trigger: 'change'}]">
                    <el-input v-model="ruleForm.video_id" auto-complete="off" class="w_60"></el-input>
                    <!-- <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button> -->
                </el-form-item>
                <el-form-item label="视频时长（分）" prop="duration_minute" class="displayinline"
                              :rules="[{required: true, message: '请填写视频时长的分钟', trigger: 'change,blur'}]">
                    <el-input v-model="ruleForm.duration_minute" auto-complete="off"></el-input>
                    分
                </el-form-item>
                <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline"
                              :rules="[{message: '请填写视频时长的分钟', trigger: 'change,blur'}]">
                    <el-input v-model="ruleForm.duration_second" auto-complete="off"></el-input>
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
    import {getTags, getOneResource, storeResource} from '../../api/resource.js'

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
                loading: false,
                selectFalg: false,
                ruleForm: {
                    title: '',
                    project: '',
                    subject: '',
                    video_id: '',
                    duration_minute: '',
                    duration_second: '',
                    description: '',
                    partner_id: '1'
                },
                multipleSelection: []
            }
        },
        methods: {
            async initData() {
                if (this.$route.params.id) {  // 编辑
                    let ret = await getOneResource(this.$route.params.id);
                    this.ruleForm.title = ret.result.resource.title;
                    this.ruleForm.description = ret.result.resource.description;
                    this.ruleForm.video_id = ret.result.resource.uri;
                    this.ruleForm.duration_second = ret.result.resource.duration;
                    this.ruleForm.project = '116';
                    this.ruleForm.partner_id = ret.result.resource.partner_id;
                }
                return this.ruleForm;
            },
            //选择器开关函数
            visibleChange(bool) {
                this.selectFalg = bool
            },
            // 项目
            didChangeProjectSelection(id) {
                this.tags.forEach((item) => {
                    if (item.id == id) {
                        let subject_list = [...item.children];
                        subject_list.unshift({
                            id: '0',
                            name: '全部'
                        })
                        this.subjects = subject_list;
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
            async createResourceForm() {
                let params = {
                    title: this.ruleForm.title,
                    description: this.ruleForm.description,
                    tag_id: this.ruleForm.subject == '0' ? this.ruleForm.project : this.ruleForm.subject,
                    duration: `${this.ruleForm.duration_minute}:${this.ruleForm.duration_second}`,
                    video_id: this.ruleForm.video_id
                }
                this.loading = true;
                let createResponse = await storeResource(params);
                if (createResponse.status == 0) {
                    this.loading = false;
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    this.resetForm('ruleForm');
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
                        this.createResourceForm();
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
            this.id = this.$route.params.id
            this.resource = (await getOneResource(this.id)).result
            let ret = await this.initData();
            this.tags = (await getTags('project', {partner_id: ret.partner_id})).result;
            this.loading = false;

        }
    }
</script>