<template>
    <div class="FilesUpload">
        <el-row style="position: relative;">
            <el-button style="position: absolute;top: 5px;left: 100px;" size="small" type="" v-if="isShowDownload">
                <a :href="fileList[0].response&&fileList[0].response.filePath" download="filename" style="color:#4db3ff">下载</a>
            </el-button>
            <el-col :span="12">
                <el-upload
                    class="handout-upload"
                    with-credentials
                    :action="materialUpload"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                    :on-success="handleAvatarSuccess"
                    :on-error="handleAvatarError"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList">
                    <el-button size="small" type="primary" v-if="isShow(1)">点击上传文件</el-button>
                    <el-button size="small" type="primary" v-if="isShow(2)">重新上传</el-button>
                    <!--<div slot="tip" class="el-upload__tip">只能上传zip/rar文件</div>-->
                </el-upload>
            </el-col>
        </el-row>
        <!--<el-row><el-item v-if="isShow(2)">{{file.file_name}}</el-item></el-row>-->
        <el-row>
            <!--<el-col :span="8" style="margin-top: 10px;">-->
            <!--<img v-if="coverImageUrl" style="max-width: 100%;" :src="coverImageUrl" class="avatar">-->
            <!--</el-col>-->
        </el-row>
    </div>
</template>
<style>
    .handout-upload{
        width: 100%;
    }
</style>
<script>
    import {getBaseUrl, getEnv} from '../../../util/config';
    import vue from '../../../common/vue.js'

    export default {
        components: {},
        props: [
            'file'
        ],
        data() {
            return {
                fileList: [],
                imageUrl: '',
            }
        },
        /* watch:{
             file(val){
                 debugger
                 console.log(val,'showClose: true,showClose: true,showClose: true,showClose: true,');

             }
         },*/
        computed: {
            // fileList(){
            //   return this.file == null || this.file == 'null' ? [] : this.file;
            // },
            isShowDownload(){
                this.fileList = this.file == null ? [] : this.file;
                return this.file == null || this.file == 'null' ? false : true;
            },
            coverImageUrl() {
                if (this.$store.state.course.course_cover) {
                    return this.$store.state.course.course_cover;
                } else {
                    return this.$store.state.course.course_default_cover;
                }
            },
            materialUpload() {
                return getBaseUrl() + 'course-api.gaodun.com/upload/handout';
            }
        },
        methods: {
            isShow(flag) {
                if (flag == 1) {
                    return this.file == null || this.file == 'null' ? true : false;
                }
                if (flag == 2) {
                    return this.file == null || this.file == 'null' ? false : true;
                }
            },
            beforeAvatarUpload(file) {
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
                const extension = testmsg === 'zip'
                const extension2 = testmsg === 'rar'
                const isLt2M = file.size / 1024 / 1024 < 10
                if (!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 zip、rar格式!',
                        type: 'warning'
                    });
                }
                if (!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning'
                    });
                }

                return extension || extension2 && isLt2M
            },
            handleChange(file, fileList) {
                console.log(this.fileList);
                this.fileList = fileList.slice(-1);
            },
            handleRemove(file, fileList) {
                this.fileList = fileList;
                vue.$emit('uploadFile',{})
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                if (res.status == 0) {
                    vue.$emit('uploadFile', res)
                    this.$message({
                        type: 'success',
                        message: ('上传成功！')
                    })
                } else {

                    this.$message.error('上传失败！');
                }
            },
            handleAvatarError(err, file, fileList) {
                this.$message.error('上传失败！');
            }
        },
        mounted() {
        },
        destroyed() {
        },
        created() {
        }
    }
</script>