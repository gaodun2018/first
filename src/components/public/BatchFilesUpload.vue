<template>
    <el-dialog class="BatchFilesUpload" :title="title" width="640px" center :visible.sync="dialogUploadVisible">
        <el-row>
            <el-upload
                class="upload-demo"
                drag
                :action="materialUpload"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :on-error="handleAvatarError"
                :headers="apiHeader"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                :data="uploadData"
                :name="name"
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或
                    <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip" v-if="fileTypes.length!=0">只能上传{{fileTypes.join(' / ')}}文件</div>
            </el-upload>
        </el-row>
        <el-row>
            <a :href="downloadUrl" download='download' class="mould-download-btn" v-if="urlTitle && downloadUrl">{{urlTitle}}</a>
        </el-row>
        <el-row class="upload-tips">
            <span>提示：若模板Excel导入失败，请新建文件，将模板中内容复制到新文件中，再次尝试。</span>
        </el-row>
    </el-dialog>
</template>
<style lang="less">
.BatchFilesUpload {
    .el-dialog__header {
        font-weight: 600;
    }
    .el-dialog__body {
        padding: 25px 140px 10px;
        .mould-download-btn {
            color: #409eff;
            &:hover {
                color: #0c79e9;
            }
        }
        .upload-tips {
            font-size: 12px;
            margin-top: 10px;
        }
    }
}
</style>

<script>
import { getBaseUrl } from "../../util/config.js";
import { SAAS_TOKEN } from "../../util/keys.js";
import { getCookie } from "../../util/cookie.js";
export default {
    components: {},
    props: {
        title: {
            // 弹出层标题
            default: "批量导入"
        },
        urlTitle: {
            // 下载按钮文字
            default: ""
        },
        downloadUrl: {
            // 下载地址
            default: ""
        },
        bVisible: {
            default: false
        },
        uploadUrl: {
            // 上传的地址
            required:true,
            default: ""
        },
        fileTypes: {
            // 上传文件的类型
            // required:true,
            default: () => []
        },
        uploadData:{
            // 上传时附带的额外参数
            default:() => {},
        },
        name:{
            // 上传文件的字段名
            default:'name',
        }
    },
    data() {
        return {
            apiHeader: {},
            centerDialogVisible: true,
            fileList: []
        };
    },
    computed: {
        materialUpload() {
            return `${getBaseUrl()}apigateway.gaodun.com/${this.uploadUrl}`;
        },
        dialogUploadVisible: {
            get: function() {
                return this.bVisible;
            },
            set: function() {
                this.$emit("handleCloesDialog");
            }
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            if (this.fileTypes.length === 0) {
                return true;
            }
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = this.fileTypes.indexOf(testmsg) > -1 ? true : false;
            // const isLt2M = file.size / 1024 / 1024 < 10;
            if (!extension) {
                this.$message({
                    message: `上传文件只能是${this.fileTypes.join("、")}格式!`,
                    type: "warning"
                });
            }
            // if (!isLt2M) {
            //     this.$message({
            //         message: "上传文件大小不能超过 10MB!",
            //         type: "warning"
            //     });
            // }
            return extension;
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        handleRemove(file, fileList) {
            this.fileList = fileList;
            // vue.$emit("uploadFile", {}, this.fileList);
        },
        handleAvatarSuccess(res, file) {
            // console.log(res);
            if (res.status == 0) {
                this.$message({
                    type: "success",
                    message: "上传成功！"
                });
                this.$emit('uploadSuccessCallback');
            } else {
                this.$message.error("上传失败！");
                setTimeout(() => {
                    this.fileList = [];
                }, 0);
            }
        },
        handleAvatarError(err, file, fileList) {
            this.$message.error("上传失败！");
            setTimeout(() => {
                this.fileList = [];
            }, 0);
        }
    },
    mounted() {},
    destroyed() {},
    created() {
        let token = "Basic " + getCookie(SAAS_TOKEN);
        this.apiHeader = { Authentication: token };
    }
};
</script>
