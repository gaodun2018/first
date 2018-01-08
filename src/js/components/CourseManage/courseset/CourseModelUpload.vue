<template>
  <div class="Imgupload">
    <el-row>
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
  export default {
    components: {},
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
        this.$store.dispatch('changeCover',{
          cover:URL.createObjectURL(file.raw),
        }) //封面图片
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