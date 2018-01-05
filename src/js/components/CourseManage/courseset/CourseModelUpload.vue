<template>
  <div class="Imgupload">
    <el-row>
      <el-col :span="12">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
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
        <img v-if="imageUrl" style="max-width: 100%;" :src="imageUrl" class="avatar">
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        fileList: [],
        imageUrl: ''
      }
    },
    computed:{

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
        this.imageUrl = '';
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleAvatarError(err, file, fileList){
        this.imageUrl = '';
        this.$message.error('上传失败！');
      }
    },
    mounted() {
      setInterval(()=>{
        console.log(this.fileList);
      },1000)

    },
    destroyed() {
    },
    created() {
    }
  }
</script>