<template>
    <div class="module-clues-content add-resource">
        <div class="outlineeat">
            新增讲义
        </div>
        <div class="frombox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

                <el-form-item label="项目" prop="region" class="w_50">
                    <el-select v-model="ruleForm.region" @change="didChangeProjectSelection">
                        <el-option :label="tag.name" :value="String(tag.id)" v-for="tag in tags"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="科目" prop="project" class="w_50">
                    <el-select v-model="ruleForm.project">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="讲义名称" prop="name">
                    <el-input v-model="ruleForm.name" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="文件名" prop="fileName">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>
                <!--<el-form-item label="知识点关联" prop="name">
                  <el-button type="text" @click="selectknowledge">选择知识点</el-button>
                </el-form-item>-->
                <el-form-item style="text-align: right">
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                </el-form-item>
            </el-form>
        </div>

        <SelectKnowledge></SelectKnowledge>
    </div>
</template>
<style>
</style>
<script>
    import SelectKnowledge from './SelectKnowledge.vue'
    import {getTags} from '../../api/resource.js'
    export default {
        components: {
            SelectKnowledge
        },
        computed: {

        },
        data() {
            return {
                tags: [],
                ruleForm: {
                    region: '',
                    project: '',
                    name: '',
                    fileName: '',
                },
                rules: {
                    region: [
                        {required: true, message: '请选择项目', trigger: 'blur'}
                    ],
                    project: [
                        {required: true, message: '请选择科目', trigger: 'change'}
                    ],
                    name: [
                        {required: true, message: '请输入讲义名称', trigger: 'change'}
                    ],
                    fileName: [
                        {required: true, message: '请输入文件名', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            async initTags(){
                let ret = await getTags('project', {partner_id: 1});
                this.tags = ret.result;
                console.log(this.tags)
            },
            //选择知识点
            selectknowledge() {
                this.$store.dispatch('changeDialog', true)
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            didChangeProjectSelection(a,b,c){
                debugger;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

        mounted() {

        },
        created() {
            this.initTags();
        }
    }
</script>