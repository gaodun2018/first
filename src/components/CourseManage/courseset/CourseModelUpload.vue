<template>
  <div class="Imgupload">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="upload-demo"
          :action="materialUpload"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :headers="apiHeader"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" style="margin-top: 10px;">
        <img v-if="coverImageUrl" style="max-width: 100%;" :src="coverImageUrl" class="avatar">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getBaseUrl,getEnv } from '../../../util/config';
  import {SAAS_TOKEN} from '../../../util/keys.js'
  import {getCookie, setCookie} from '../../../util/cookie.js';
  export default {
    components: {},
    data() {
      return {
        fileList: [],
        imageUrl: '',
          apiHeader:''
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
        return getBaseUrl() + 'apigateway.gaodun.com/course-api/upload/picture';
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isImg = file.type==='image/png'||file.type ==='image/jpeg';
        if (!isImg) {
          this.$message.error('上传课程封面只能是 JPG/PNG 格式!');
        }
        return isImg;
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
        let token = 'Basic ' + getCookie(SAAS_TOKEN);
        this.apiHeader = {Authentication: token};
    }
  }
</script>