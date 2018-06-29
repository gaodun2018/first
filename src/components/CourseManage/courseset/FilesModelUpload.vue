<template>
    <div class="FilesUpload">
        <el-row style="position: relative;">
            <!-- <a class="download_btn" :href="fileList[0].response&&fileList[0].response.filePath" download="filename" v-if="isShowDownload" style="color:#4db3ff">下载</a> -->
            <el-col :span="12">
                <el-upload class="handout-upload" :action="materialUpload" :on-change="handleChange" :on-remove="handleRemove" :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :headers="apiHeader" :before-upload="beforeAvatarUpload" :file-list="fileList" :on-progress	='progressUpload'>
                    <el-button size="small" type="primary" v-if="isShow()">点击上传文件</el-button>
                    <el-button size="small" type="primary" v-if="!isShow()">重新上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传zip/rar文件</div>
                </el-upload>
            </el-col>
        </el-row>
        <!--<el-row><el-item v-if="isShow(2)">{{file.file_name}}</el-item></el-row>-->
    </div>
</template>
<style>
.handout-upload {
    width: 100%;
}
</style>
 <style scoped>
.download_btn {
    padding: 7px 9px;
    font-size: 12px;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c4c4c4;
    color: #1f2d3d;
    margin: 0;
    position: absolute;
    top: 5px;
    left: 100px;
}
</style>
<script>
import { getBaseUrl, getEnv } from "../../../util/config";
import Vue from "../../../common/vue.js";
import { SAAS_TOKEN } from "../../../util/keys.js";
import { getCookie, setCookie } from "../../../util/cookie.js";

export default {
    components: {},
    props: [
        "file"
        ],
    data() {
        return {
            // fileList: [],
            // fileList: this.file == null ? [] : this.file,
            imageUrl: "",
            apiHeader: {}
        };
    },
    /* watch:{
             file(val){
                 debugger
                 console.log(val,'showClose: true,showClose: true,showClose: true,showClose: true,');

             }
         },*/
    computed: {
        fileList(){
          return this.file == null || this.file == 'null' ? [] : this.file;
        },
        isShowDownload() {
            // this.fileList = this.file == null ? [] : this.file;
            return this.file == null || this.file == "null" ? false : true;
        },
        materialUpload() {
            return (
                getBaseUrl() + "apigateway.gaodun.com/course-api/upload/handout"
            );
        }
    },
    methods: {
        isShow() {
            if(this.file && this.file.length != 0){
                return false;
            }else {
                return true;
            }
        },
        beforeAvatarUpload(file) {
            var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
            const extension = testmsg === "zip";
            const extension2 = testmsg === "rar";
            const isLt2M = file.size / 1024 / 1024 < 90;
            if (!extension && !extension2) {
                this.$message({
                    message: "上传文件只能是 zip、rar格式!",
                    type: "warning"
                });
            }
            if (!isLt2M) {
                this.$message({
                    message: "上传文件大小不能超过 90MB!",
                    type: "warning"
                });
            }

            return (extension && isLt2M) || (extension2 && isLt2M) ;
        },
        handleChange(file, fileList) {
            // console.log(file,fileList)
            // this.$emit('updateFlies','change',fileList.slice(-1),);
            // this.fileList = fileList.slice(-1);
        },
        handleRemove(file, fileList) {
            if(fileList.length==0){
                this.$emit("updateFlies", "remove", []);
            }else{
                this.$emit("updateFlies", '', fileList);
            }
        },
        handleAvatarSuccess(res, file) {
            if (res.status == 0) {
                this.$emit("updateFlies", res, file);
                this.$message({
                    type: "success",
                    message: "上传成功！"
                });
            } else {
                this.$message.error("上传失败！");
                this.$emit("updateFlies", '', []);
            }
        },
        handleAvatarError(err, file, fileList) {
            this.$message.error("上传失败！");
            setTimeout(() => {
                this.$emit("updateFlies", '', []);
            }, 0);
        },
        progressUpload(event, file, fileList){
            //上传中事件
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
