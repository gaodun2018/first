<template>
    <div class="module-clues-content add-resource">
        <div class="outlineeat">
            {{id?'编辑讲义':'新增讲义'}}
        </div>
        <div class="frombox">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="loading">
                <el-form-item label="项目" prop="region" class="w_50"
                              :rules="[{required: true, message: '请选择所属项目', trigger: 'change'}]">
                    <el-select v-model="ruleForm.region" filterable placeholder="请选择所属项目"
                               @change="didChangeProjectSelection"
                               @visible-change="visibleChange">
                        <el-option :label="tag.name" :key="tag.id" :value="String(tag.id)"
                                   v-for="tag in tags"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="科目" prop="tag_id" class="w_50"
                              :rules="[{required: true, message: '请选择所属科目', trigger: 'change'}]">
                    <el-select v-model="ruleForm.tag_id" placeholder="请选择所属科目" filterable>
                        <el-option v-for="item in subjectData" :key="item.id" :label="item.name"
                                   :value="String(item.id)"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="讲义名称" prop="title"
                              :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
                    <el-input v-model="ruleForm.title" placeholder="请填写讲义名称" auto-complete="off"
                              class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="讲义描述">
                    <el-input v-model="ruleForm.description" placeholder="请填写讲义描述" auto-complete="off"
                              class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="文件名">
                    <el-upload
                        :headers="apiHeader"
                        :file-list="fileList"
                        drag
                        :on-success="uploadSuccess"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :on-error="handleAvatarError"
                        :before-upload="beforeAvatarUpload"
                        ref="onUpload"
                        :action="materialUpload">
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
        <!--<SelectKnowledge></SelectKnowledge>-->
    </div>
</template>
<style>
</style>
<script>
    import SelectKnowledge from './resourceModuleSelectKnowledge.vue';
    import {getBaseUrl} from '../../util/config';
    import {getCookie, setCookie} from 'cookieUtils';
    import {SAAS_TOKEN} from '../../util/keys.js'
    import {getTags, saveLecturenote, resourceFile, getOneResource, saveMidfyLecturenote} from '../../api/resource.js'

    export default {
        components: {
            SelectKnowledge
        },
        props: [
            'id'
        ],
        computed: {
            materialUpload() {
                return `${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/file`;
            }
        },
        data() {
            return {
                tags: [],
                subjectData: [],
                fileList: [],
                apiHeader: {},
                isUpload: false,
                loading: false,
                selectFalg: false,
                ruleForm: {
                    region: '',
                    tag_id: '',
                    title: '',
                    fileName: '',
                    path: '',
                    description: ''
                },
            }
        },
        methods: {
            // 项目数据
            async initTags() {
                let ret = await getTags('project');
                this.tags = ret.result;
            },

            // 获取讲义数据
            async getModifyData() {
                // 编辑讲义
                let ret = await getOneResource(this.$route.params.id);
                let data = ret.result.resource;
                this.ruleForm.title = data.title;
                this.ruleForm.description = data.description;
                if (data.tag.id) {
                    this.ruleForm.region = String(data.tag.id);
                    this.ruleForm.tag_id = (data.tag.children && data.tag.children.length != 0) ? String(data.tag.children[0].id) : '0';
                } else {
                    this.ruleForm.region = '';
                    this.ruleForm.tag_id = '';
                }
                if (data.path) {
                    this.isUpload = true;
                    this.ruleForm.path = data.path;  //文件路径
                    //上传文件的格式化
                    this.fileList = [{
                        name: data.title,
                        response: {filePath: data.path}
                    }]
                } else {
                    this.isUpload = false;   //没上传文件
                }

            },

            //选择知识点
            selectknowledge() {
                this.$store.dispatch('changeDialog', true)
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
                setTimeout(() => {
                    this.fileList = [];
                }, 0)
            },
            //上传前回调
            beforeAvatarUpload(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'pdf'
                if (!extension) {
                    this.$message({
                        message: '上传文件只能是 pdf格式!',
                        type: 'warning'
                    });
                }
                return extension;
            },
            //上传文件改变回调
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            //移除文件回调
            handleRemove(file, fileList) {
                if (fileList.length == 0) {
                    this.isUpload = false;
                }
                this.fileList = fileList;
            },
            //上传失败回调
            handleAvatarError(err, file, fileList) {
                this.$message.error('上传失败！');
                setTimeout(() => {
                    this.fileList = [];
                }, 0)
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
                    setTimeout(() => {
                        this.fileList = [];
                    }, 0);
                    this.ruleForm.path = '';
                    this.$message({
                        message: "文件上传失败",
                        type: "warning"
                    });
                }
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
                        this.subjectData = subject_list;
                        if (this.selectFalg) {
                            this.ruleForm.tag_id = '0';
                        }
                    }
                })
            },
            //新建讲义
            async saveLecturenote() {
                const {tag_id, title, file, path, description, region} = this.ruleForm;
                let params = {
                    tag_id: tag_id == '0' ? region : tag_id,
                    title, description, file, path,
                }
                this.loading = true;
                let ret = await saveLecturenote(params)
                this.loading = false;
                this.isUpload = false;
                // this.fileList = [];
                // this.ruleForm.path = '';
                // this.resetForm('ruleForm');
                if (ret.status == 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path: '/resource/handout/list'
                        })
                    }, 1000)
                } else {
                    this.$message({
                        message: "保存失败",
                        type: "error"
                    });
                }

            },
            //修改讲义
            async saveMidfyLecturenote() {
                const {tag_id, title, file, path, description, region} = this.ruleForm;
                let params = {
                    tag_id: tag_id == '0' ? region : tag_id,
                    _method: 'PUT',
                    title, description, path,
                }
                this.loading = true;
                let ret = await saveMidfyLecturenote(this.$route.params.id, params);
                this.loading = false;
                if (ret.status == 0) {
                    this.$message({
                        message: "保存成功",
                        type: "success"
                    });
                    setTimeout(() => {
                        this.$router.push({
                            path: '/resource/handout/list'
                        })
                    }, 1000)
                } else {
                    this.$message({
                        message: "保存失败",
                        type: "error"
                    });
                }
            },
            // 保存讲义
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.isUpload) {
                            this.$message({
                                message: "需上传文件才能保存",
                                type: "warning"
                            });
                            return;
                        }
                        let ids = this.$route.params.id;
                        this.loading = true;
                        if (ids) {
                            this.saveMidfyLecturenote();  //修改
                        } else {
                            this.saveLecturenote();  //新增
                        }
                    }
                });
            },
        },

        mounted() {

        },
        async created() {
            this.loading = true;
            let token = 'Basic ' + getCookie(SAAS_TOKEN);
            this.apiHeader = {Authentication: token};
            this.id = this.$route.params.id;
            await this.initTags();
            if (this.$route.params.id) {
                //有id是编辑讲义，不需要拉一次tag_Id列表
                await this.getModifyData();
            }
            this.loading = false;
        }
    }
</script>