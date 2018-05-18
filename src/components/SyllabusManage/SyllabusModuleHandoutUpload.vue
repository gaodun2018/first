<template>
    <el-row>
        <el-col :span="6">*选择文件：</el-col>
        <el-col :span="18">
            <el-upload
                class="syllabus-handout-upload"
                :headers="apiHeader"
                :file-list="fileList"
                drag
                :on-success="uploadSuccess"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-progress="handleProgress"
                :on-error="handleAvatarError"
                :before-upload="beforeAvatarUpload"
                ref="onUpload"
                :action="materialUpload"
                v-loading="loading"
                element-loading-text="正在上传中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.6)"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">目前仅支持.pdf文件哦！</div>
            </el-upload>
        </el-col>
    </el-row>
</template>
<style lang="less">
.syllabus-handout-upload {
    .el-upload__tip {
        line-height: 18px;
    }
}

</style>
<script>
import { getBaseUrl } from "../../util/config";
import { getCookie, setCookie } from "../../util/cookie.js";
import { SAAS_TOKEN } from "../../util/keys.js";
export default {
    computed: {
        materialUpload() {
            return `${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/file`;
        }
    },
    data() {
        return {
            fileList: [],
            apiHeader: {},
            isUpload: false,
            loading: false,
        };
    },
    methods: {
        // 清除上传的文件
        clearAllFileList(){
            this.fileList = [];
        },
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
                this.$emit('getHandoutPath','');
            }
            this.fileList = fileList;
        },
        //上传失败回调
        handleAvatarError(err, file, fileList) {
            this.loading = false;
            this.$message.error("上传失败！");
            setTimeout(() => {
                this.fileList = [];
            }, 0);
        },
        // 上传中
        handleProgress() {
            this.loading = true;
        },
        // 上传结束
        uploadSuccess(response, file) {
            this.loading = false;
            if (response.status === 0) {
                this.isUpload = true;
                this.$message({
                    message: "文件上传成功",
                    type: "success"
                });
                this.$emit('getHandoutPath',response.result.path);
            } else {
                this.isUpload = false;
                setTimeout(() => {
                    this.fileList = [];
                }, 0);
                this.$emit('getHandoutPath','');
                this.$message({
                    message: "文件上传失败",
                    type: "warning"
                });
            }
        },
    },
    mounted() {},
    async created() {
        let token = "Basic " + getCookie(SAAS_TOKEN);
        this.apiHeader = { Authentication: token };
    }
};
</script>
