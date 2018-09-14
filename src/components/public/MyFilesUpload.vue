<template>
  <el-upload
    class="avatar-uploader"
    :drag="drag"
    :show-file-list="showFileLit"
    :action="materialUpload"
    :on-change="handleChange"
    :on-remove="handleRemove"
    :on-success="handleAvatarSuccess"
    :on-error="handleAvatarError"
    :on-progress="handleProgress"
    :headers="apiHeader"
    :before-upload="beforeAvatarUpload"
    :file-list="fileList"
    :data="uploadData"
    :name="name"
    v-loading="loading"
    element-loading-text="正在上传中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <template v-if="showUploadImage && !drag">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </template>
    <template v-if="drag && !showUploadImage">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </template>
    <div class="el-upload__tip" slot="tip">
      <span v-if="fileTypes.length!=0">只能上传{{fileTypes.join(' / ')}}文件</span>
      <span v-if="maxFileSize">，且不超过{{maxFileSize}}MB</span>
    </div>
  </el-upload>
</template>
<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  import {getBaseUrl} from "../../util/config.js";
  import {SAAS_TOKEN} from "../../util/keys.js";
  import {getCookie} from "../../util/cookie.js";

  export default {
    components: {},
    props: {
      uploadUrl: {
        // 上传的地址
        required: true,
        default: ""
      },
      fileTypes: {
        // 上传文件的类型
        // required:true,
        type: Array,
        default: () => []
      },
      uploadData: {
        // 上传时附带的额外参数
        default: undefined
      },
      name: {
        // 上传文件的字段名
        default: "name"
      },
      maxFileSize: {
        //上传限制文件大小  按MB计算-
        type: Number,
        default: 0
      },
      drag: {
        //是否拖拽
        type: Boolean,
        default: false
      },
      showFileLit: {
        //是否显示文件列表
        type: Boolean,
        default: false
      },
      showUploadImage: {
        //是否展示上传的图片
        type: Boolean,
        default: false
      },
      uploadedImageUrl: {
        type: String
      }
    },
    data() {
      return {
        apiHeader: {},
        centerDialogVisible: true,
        fileList: [],
        loading: false,
        imageUrl: '',//上传为图片是可以展示
      };
    },
    computed: {
      materialUpload() {
        return `${getBaseUrl()}apigateway.gaodun.com/${this.uploadUrl}`;
      },
    },
    methods: {
      beforeAvatarUpload(file) {
        const maxFileSize = this.maxFileSize
        if (this.fileTypes.length === 0 && this.maxFileSize === 0) {
          return true;
        }
        var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const extension = this.fileTypes.length !== 0 ? (this.fileTypes.indexOf(testmsg) > -1 ? true : false) : true;
        const isMaxSize = maxFileSize ? (file.size / 1024 / 1024 < maxFileSize) : true;
        if (!extension) {
          this.$message({
            message: `上传文件只能是${this.fileTypes.join("、")}格式!`,
            type: "warning"
          });
        }
        if (!isMaxSize) {
          this.$message({
            message: `上传文件大小不能超过 ${maxFileSize}MB!`,
            type: "warning"
          });
        }
        return extension && isMaxSize;
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-1);
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
        // vue.$emit("uploadFile", {}, this.fileList);
      },
      handleProgress() {
        this.loading = true;
      },
      handleAvatarSuccess(res, file) {
        // console.log(res);
        this.loading = false;
        if (res.status == 0) {
          this.$message({
            type: "success",
            message: "上传成功！"
          });
          this.imageUrl = URL.createObjectURL(file.raw);
          this.$emit("uploadSuccessCallback", file);
        } else {
          this.$message({
            type: "error",
            message: `上传失败：${res.message}`,
            showClose: true,
            duration: 5000
          });
          setTimeout(() => {
            this.fileList = [];
          }, 0);
        }
      },
      handleAvatarError(err, file, fileList) {
        this.$message({
          type: "error",
          message: `上传失败：${err}`,
          showClose: true,
          duration: 5000
        });
        this.loading = false;
        setTimeout(() => {
          this.fileList = [];
        }, 0);
      }
    },
    mounted() {
    },
    destroyed() {
    },
    created() {
      let token = "Basic " + getCookie(SAAS_TOKEN);
      this.apiHeader = {Authentication: token};
    },
    watch: {
      uploadedImageUrl: {
        handler(newVal, oldVal) {
          this.imageUrl = newVal
        },
        immediate: true
      }
    }
  };
</script>
