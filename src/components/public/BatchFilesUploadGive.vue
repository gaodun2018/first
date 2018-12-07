<template>
  <el-dialog
    class="BatchFilesUpload"
    :title="title"
    width="640px"
    center
    :visible.sync="dialogUploadVisible"
  >
    <el-row>
      <el-upload
        ref="upload"
        class="upload-demo"
        drag
        :auto-upload="false"
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
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-row>
    <el-row :gutter="20" class="mould-download-btn">
      <a :href="downloadTemplate.url" download="download">
        <el-col :span="8">
          <div class="grid-content bg-purple">{{downloadTemplate.name}}</div>
        </el-col>
      </a>
      <el-col :span="6">
        <div>使用说明</div>
      </el-col>
    </el-row>

    <el-row class="upload-tips">
      <span>提示：若模板导入失败，请根据失败提示更新内容，再次导入</span>
    </el-row>
    <el-row>
      <span class="sc">上传类型</span>
      <el-radio v-model="radio" label="0">大纲</el-radio>
      <el-radio v-model="radio" label="1">资源</el-radio>
    </el-row>
    <el-button style="margin-left: 400px;" size="small" type="primary" @click="submitUpload">确定上传</el-button>
    <el-button style="position: absolute;" size="small" @click="dialogUploadVisible=true">取消</el-button>
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
  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #ffffe0;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    text-align: center;
  }

  .row-bg {
    padding: 10px 0;
    background-color: yellow;
  }

  .el-button--small,
  .el-button--small.is-round {
    margin-top: -32px;
  }

  .el-button + .el-button {
    margin-left: 328px;
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
      required: true,
      default: ""
    },
    fileTypes: {
      // 上传文件的类型
      // required:true,
      default: () => []
    },
    uploadData: {
      // 上传时附带的额外参数
      default: undefined
    },
    link: {
      default: function() {
        return {
            item_template: "",
            resource_template: ""
        }
      }
    },
    name: {
      // 上传文件的字段名
      default: "name"
    }
  },
  data() {
    return {
      apiHeader: {},
      centerDialogVisible: true,
      fileList: [],
      radio: "1",
      loading: false
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
    },
    downloadTemplate() {
      let link = this.link;
    //   console.log(link);
    //      link = {
    //     item_template:'',
    //     resource_template:''
    // };
      let obj = {
        name: "",
        url: link,
        type:"file_item"
      };
      if (this.radio == 0) {
        obj.name = "大纲导入模版";
        obj.url = link.item_template;
        obj.type = "file_item"
      } else {
        obj.name = "资源导入模版";
        obj.url = link.resource_template;
         obj.type = "file_resource"
        //...
      }
      return obj;
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },

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
        this.$emit("uploadSuccessCallback");
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
  mounted() {},
  destroyed() {},
  created() {
    let token = "Basic " + getCookie(SAAS_TOKEN);
    this.apiHeader = { Authentication: token };
  }
};
</script>