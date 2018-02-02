<template>
    <div class="FilesUpload">
        <el-row>
            <el-item>CMA 2018年1月考季.zip{{imageUrl}}</el-item>
            <el-button @click="">下载</el-button>
            <el-col :span="12">
                <el-upload
                        class="upload-demo"
                        with-credentials
                        :action="materialUpload"
                        :on-change="handleChange"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                        :on-error="handleAvatarError"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传文件</el-button>
                    <!--<div slot="tip" class="el-upload__tip">只能上传zip/rar文件</div>-->

                </el-upload>
            </el-col>
        </el-row>
        <el-row>
            <!--<el-col :span="8" style="margin-top: 10px;">-->
                <!--<img v-if="coverImageUrl" style="max-width: 100%;" :src="coverImageUrl" class="avatar">-->
            <!--</el-col>-->
        </el-row>
    </div>
</template>

<script>
    import { getBaseUrl,getEnv } from '../../../util/config';
    export default {
        components: {},
        props: {

        },
        data() {
            return {
                fileList: [],
                imageUrl: '',
            }
        },
        computed:{
            coverImageUrl(){
                if(this.$store.state.course.course_cover){
                    return this.$store.state.course.course_cover;
                }else{
                    return this.$store.state.course.course_default_cover;
                }
            },
            materialUpload(){
                return getBaseUrl() + 'course-api.gaodun.com/upload/picture';
            }
        },
        methods: {
            beforeAvatarUpload(file) {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'zip'
                const extension2 = testmsg === 'rar'
                const isLt2M = file.size / 1024 / 1024 < 10
                if(!extension && !extension2) {
                    this.$message({
                        message: '上传文件只能是 zip、rar格式!',
                        type: 'warning'
                    });
                }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning'
                    });
                }

                return extension || extension2 && isLt2M
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-1);
            },
            handleRemove(file, fileList) {
                this.fileList = fileList;
                this.$store.dispatch('changeCover',{
                    cover:'',
                }) //封面图片
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                if(res.status == 0){
                    this.$store.dispatch('changeCover',{
//          cover:URL.createObjectURL(file.raw),
                        cover:res.filePath,
                    }) //封面图片
                    this.$message({
                        type: 'success',
                        message:('上传成功！')
                    })
                }
            },
            handleAvatarError(err, file, fileList){
                this.$store.dispatch('changeCover',{
                    cover:'',
                }) //封面图片
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