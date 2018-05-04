<template>
    <div class="">
        <div class="frombox">
            <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="loading">
                <el-form-item label="视频名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
                    <el-input v-model="ruleForm.title" placeholder="请填写视频名称" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="视频地址" prop="video_id" :rules="filter_rules({required:true,type:'isVideoId'})">
                    <el-input v-model="ruleForm.video_id" placeholder="请输入视频ID" auto-complete="off" class="w_60"></el-input>
                    <!--<span class="gray_12">asdasdasd</span>-->
                    <!-- <el-button type="text" @click="" style="margin-left: 20px;">本地上传</el-button> -->
                </el-form-item>
                <el-form-item label="视频时长（分）" prop="duration_minutes" class="displayinline" :rules="[{required: true,type:'number', message: '请填写视频时长的分钟', trigger: 'change,blur'}]">
                    <el-input v-model.number="ruleForm.duration_minutes" placeholder="请填写视频时长的分钟" auto-complete="off"></el-input>
                    分
                </el-form-item>
                <el-form-item label="视频时长（秒）" prop="duration_second" class="displayinline" :rules="[{message: '请填写视频时长的秒',type:'number', trigger: 'change,blur'}]">
                    <el-input v-model.number="ruleForm.duration_second" @change="handleInputChange" placeholder="请填写视频时长的秒" auto-complete="off"></el-input>
                    秒
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>
<script>
import { getSrcStr } from "../../util/util.js";

export default {
    components: {

    },
    data() {
        return {
            tags: [],
            subjectData: [],
            loading: false,
            selectFalg: false,
            ruleForm: {
                title: "",
                project: "",
                subject: "",
                video_id: "",
                duration_minutes: "",
                duration_second: 0,
                description: ""
            },
            multipleSelection: []
        };
    },
    methods: {
        //秒数输入框change事件
        handleInputChange(val){
            if(val == ''){
                this.ruleForm.duration_second = 0;
            }
        },
        //解析视频地址获得视频id
        async getVideoPath() {
            let url = getSrcStr(this.ruleForm.video_id);
            let params = {
                url: url
            };
            let ret = await this.$http.getVideoPath(params);
            return ret;
        },
        //新增视频
        async createResourceForm() {
            let pathRet = await this.getVideoPath();
            let video_id = "";
            if (pathRet.status == 0) {
                if (!pathRet.result.video_id) {
                    return this.$message({
                        type: "warning",
                        message: "视频地址解析失败！"
                    });
                }
                video_id = pathRet.result.video_id;
            } else if (pathRet.status == 1) {
                //为1时使用用户输入的地址
                video_id = this.ruleForm.video_id;
            } else {
                return this.$message({
                    type: "warning",
                    message: "视频地址解析失败！"
                });
            }
            let params = {
                title: this.ruleForm.title,
                description: this.ruleForm.description,
                tag_id:
                    this.ruleForm.subject == "0"
                        ? this.ruleForm.project
                        : this.ruleForm.subject,
                // duration: `${this.ruleForm.duration_minutes}:${this.ruleForm.duration_second}`,
                duration_minutes: this.ruleForm.duration_minutes,
                duration_seconds: this.ruleForm.duration_second
                    ? this.ruleForm.duration_second
                    : 0,
                video_id: video_id
            };
            this.loading = true;
            let createResponse = await this.$http.storeResource(params);
            this.loading = false;
            if (createResponse.status == 0) {
                this.$message({
                    message: "保存成功",
                    type: "success"
                });
                setTimeout(() => {
                    this.$router.push({
                        path: "/resource/video/list"
                    });
                }, 1000);
                // this.resetForm('ruleForm');
            } else {
                this.$message({
                    message: "保存失败",
                    type: "error"
                });
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.$route.params.id) {
                        //修改'
                        this.editVideoResource();
                    } else {
                        //新增
                        this.createResourceForm();
                    }
                } else {
                    console.log("error submit!!");
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
    },
    async created() {
    }
};
</script>
