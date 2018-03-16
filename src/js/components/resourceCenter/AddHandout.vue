<template>
    <div class="module-clues-content add-resource">
        <div class="outlineeat">
            新增讲义
        </div>
        <div class="frombox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="项目" prop="region" class="w_50">
                    <el-select v-model="ruleForm.region" @change="didChangeProjectSelection">
                        <el-option :label="tag.name" :key="tag.id" :value="String(tag.id)" v-for="tag in tags"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="科目" prop="tag_id" class="w_50">
                    <el-select v-model="ruleForm.tag_id">
                        <el-option v-for="item in projectData" :key="item.id" :label="item.name" :value="String(item.id)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="讲义名称" prop="title">
                    <el-input v-model="ruleForm.title" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="讲义描述">
                    <el-input v-model="ruleForm.description" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="文件名">
                    <el-upload :headers="apiHeader" :file-list="fileList" drag :on-success="uploadSuccess" ref="onUpload" :action="materialUpload">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                    </el-upload>
                </el-form-item>
                <!--<el-form-item label="知识点关联" prop="name">
                  <el-button type="text" @click="selectknowledge">选择知识点</el-button>
                </el-form-item>-->
                <el-form-item style="text-align: right">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>

        <SelectKnowledge></SelectKnowledge>
    </div>
</template>
<style>
</style>
<script>
    import SelectKnowledge from './SelectKnowledge.vue';
    import {getBaseUrl} from '../../util/config';
    import {getCookie, setCookie} from 'cookieUtils';
    import {SAAS_TOKEN} from '../../util/keys.js'
    import {getTags, saveLecturenote, resourceFile, getOneResource, saveMidfyLecturenote} from '../../api/resource.js'
    export default {
        components: {
            SelectKnowledge
        },
        computed: {
            materialUpload() {
                return `${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/file`;
            }
        },
        data() {
            return {
                tags: [],
                projectData: [],
                fileList: [],
                apiHeader: {},
                isUpload: false,
                loading: false,
                ruleForm: {
                    region: '',
                    tag_id: '',
                    title: '',
                    fileName: '',
                    path: '',
                    description: ''
                },
                rules: {
                    region: [
                        {required: true, message: '请选择项目', trigger: 'blur'}
                    ],
                    tag_id: [
                        {required: true, message: '请选择科目', trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '请输入讲义名称', trigger: 'change'}
                    ],
                    // fileName: [
                    //     {required: true, message: '请选择文件名', trigger: 'blur'}
                    // ]
                }
            }
        },
        methods: {
            // 项目数据
            async initTags(){
                let ret = await getTags('project');
                this.tags = ret.result;
            },

            // 获取讲义数据
            async getModifyData() {
                if(this.$route.query.id){ 
                    let ret = await getOneResource(this.$route.query.id);
                    let data = ret.result.resource;
                    this.ruleForm.title = data.title;
                    this.ruleForm.description = data.description;
                    this.ruleForm.tag_id = data.partner_id;
                    this.ruleForm.path = data.path;
                }
            },

            //选择知识点
            selectknowledge() {
                this.$store.dispatch('changeDialog', true)
            },

            // 保存讲义
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const {tag_id, title, file, path, description} = this.ruleForm;
                        let params = {tag_id, title, file, path, description}
                        let ids = this.$route.query.id;
                        if (!ids && !this.isUpload) {
                            this.$message({
                                message: "需上传文件才能保存",
                                type: "warning"
                            });
                            return;
                        }
                        this.loading = true;
                        if (ids) {
                            saveMidfyLecturenote(ids, params).then(ret => {
                                this.loading = false;
                            })
                        } else {
                            saveLecturenote(params).then(ret => {
                                this.loading = false;
                                this.isUpload = false;
                                this.fileList = [];
                                this.ruleForm.path = '';
                                if (ret.status == 0) {
                                    this.$message({
                                        message: "保存成功",
                                        type: "success"
                                    });
                                } else {
                                    this.$message({
                                        message: "保存失败",
                                        type: "success"
                                    });
                                }
                            })
                        }
                    }
                });
            },

            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
                setTimeout(()=>{
                    this.fileList = [];
                },0)
            },
            
            // 上传结束
            uploadSuccess(response, file) {
                if (response.status === 0) {
                    this.isUpload = true;
                     this.$message({
                        message: "文件上传成功",
                        type: "success"
                    });
                    this.ruleForm.path = response.result.path;
                } else {
                    this.isUpload = false;
                    setTimeout(()=>{
                        this.fileList = [];
                    },0);
                    this.ruleForm.path = '';
                    this.$message({
                        message: "文件上传失败",
                        type: "warning"
                    });
                }
            },

            // 项目
            didChangeProjectSelection(id){
                this.projectData = [];
                this.ruleForm.project = '';
                this.tags.forEach((item) => {
                    if (item.id == id) {
                        this.projectData = item.children;
                    }
                })
            }
        },

        mounted() {

        },
        async created() {
            this.initTags();
            let token = 'Basic ' + getCookie(SAAS_TOKEN);
            this.apiHeader = {Authentication: token};
            let ids = this.$route.query.id;
            let aaa = await this.getModifyData ()
            // if (ids) {
            // }
        }
    }
</script>