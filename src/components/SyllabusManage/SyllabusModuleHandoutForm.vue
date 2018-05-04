<template>
    <div class="">
        <div class="frombox">
            <el-form :model="ruleForm" label-position="left" ref="ruleForm" label-width="60px" class="demo-ruleForm" v-loading="loading">
                <el-form-item label="讲义名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:60})">
                    <el-input v-model="ruleForm.title" placeholder="请填写讲义名称" auto-complete="off" class="w_50"></el-input>
                </el-form-item>
                <el-form-item label="文件名">
                    <el-upload :headers="apiHeader" :file-list="fileList" drag :on-success="uploadSuccess" :on-change="handleChange" :on-remove="handleRemove" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload" ref="onUpload" :action="materialUpload">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">目前仅支持.pdf文件哦！</div>
                    </el-upload>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>
<style lang="less">
.add-resource {
    .el-upload__tip {
        line-height: 18px;
        margin-top: -10px;
    }
}
</style>
<script>

import { getBaseUrl } from "../../util/config";
import { getCookie, setCookie } from "../../util/cookie.js";
import { SAAS_TOKEN } from "../../util/keys.js";
export default {
    components: {},
    props: ["id"],
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
                region: "",
                tag_id: "",
                title: "",
                fileName: "",
                path: "",
                description: ""
            }
        };
    },
    methods: {

        //上传前回调
        beforeAvatarUpload(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = testmsg === "pdf";
            if (!extension) {
                this.$message({
                    message: "上传文件只能是 pdf格式!",
                    type: "warning"
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
            this.$message.error("上传失败！");
            setTimeout(() => {
                this.fileList = [];
            }, 0);
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
                this.ruleForm.path = "";
                this.$message({
                    message: "文件上传失败",
                    type: "warning"
                });
            }
        },
        //新建讲义
        async saveLecturenote() {
            const {
                tag_id,
                title,
                file,
                path,
                description,
                region
            } = this.ruleForm;
            let params = {
                tag_id: tag_id == "0" ? region : tag_id,
                title,
                description,
                file,
                path
            };
            this.loading = true;
            let ret = await this.$http.saveLecturenote(params);
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
                        path: "/resource/handout/list"
                    });
                }, 1000);
            } else {
                this.$message({
                    message: "保存失败",
                    type: "error"
                });
            }
        },

        // 保存讲义
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
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

                    this.saveLecturenote(); //新增

                }
            });
        }
    },

    mounted() {},
    async created() {
        let token = "Basic " + getCookie(SAAS_TOKEN);
        this.apiHeader = { Authentication: token };
    }
};
</script>
