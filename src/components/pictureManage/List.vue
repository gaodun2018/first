<template>
  <div class="module-edu-content picture-manage">
    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row type="flex" align="bottom">
        <el-col :sm="24">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-button type="primary" size="small" @click="dialogVisible = true">新增一张日签图
              </el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="edu_table">
      <el-table ref="table" border :data="data" :max-height="setMaxHeight()" style="width: 100%">
        <el-table-column prop="id" label="id" width="80" fixed>
        </el-table-column>
        <el-table-column prop="title" label="名称" min-width="260">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              :data-url="scope.row.path"
              @click="handleClickPreview(scope.row)"
            >
              预览
            </el-button>
            <el-button
              type="text"
              @click="handleEditCurrentItem(scope.row)"
            >
              修改
            </el-button>
            <el-button
              type="text"
              @click="handleClickDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="total, prev, pager, next, jumper"
          :total="eduTotal"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="编辑日签图" center :visible.sync="dialogVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
          <el-input v-model="ruleForm.title" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="upload-item">
        <div>
          <span>上传文件</span>
        </div>
        <div>
          <v-upload
            :upload-url="uploadUrl"
            :file-types="['png','jpg']"
            :name="'file'"
            :max-file-size="2"
            :show-upload-image="true"
            @uploadSuccessCallback="uploadSuccessCallback"
            :uploaded-image-url="ruleForm.path"
          >
          </v-upload>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="validateForm('ruleForm')">
          {{btnLoading?'保存中':'确定'}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import vUpload from '../public/MyFilesUpload.vue'

  export default {
    components: {
      vUpload
    },
    data() {
      return {
        data: [],
        dialogVisible: false,
        ruleForm: {
          id: '',
          path: '',
          title: ''
        },
        btnLoading: false,
        uploadUrl: 'caen/v1/backend/image/upload',
        currentPage: 1,
        eduTotal: 1
      };
    },
    computed: {},
    methods: {
      setMaxHeight() {
        const bdh = document.body.offsetHeight || document.documentElement.offsetHeight;
        return (bdh - 200) + 'px'
      },
      uploadSuccessCallback(file) {
        console.log('12312312313123213132', file);
        this.ruleForm.path = file.response.result
      },
      validateForm(formName) {
        const self = this;
        if (!this.ruleForm.path) {
          this.$message({
            message: '请上传图片～～'
          })
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.saveWXImage();
          } else {
            return false;
          }
        });
      },
      async saveWXImage() {
        const self = this;
        const {id, path, title} = this.ruleForm;
        let params = {
          path, title
        }
        if (id) {
          params.id = id;
        }
        this.btnLoading = true
        let imageRet = await this.$http.saveWXImage(params);
        console.log(imageRet);
        this.btnLoading = false;
        if (imageRet.status === 0) {
          this.dialogVisible = false;
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.loadPictureList();
        } else {
          this.$message({
            message: '保存失败'
          })
        }
      },
      async loadPictureList() {
        let params = {
          page: this.currentPage,
          page_size: 20,
        }
        let listRet = await this.$http.getWXImageList(params);
        if (listRet.status === 0) {
          this.data = listRet.result.item_list;
          this.eduTotal = listRet.result.all_item_count;
        }
      },
      handleClickPreview(row) {
        const {path} = row;
        if (/^\/\/simg/.test(path)) {
          window.open(row.path)
        } else {
          this.$message({
            type: 'warning',
            message: `图片网络路径异常：${path}`
          })
        }
      },
      async handleClickDelete(row) {
        const self = this;
        const {id} = row;
        if (!id) {
          alert('ID不存在')
          return
        }
        let params = {
          id
        }
        let delRet = await this.$http.deleteWXImageList(params);
        if (delRet.status === 0) {
          this.$message({
            type: 'warning',
            message: '删除成功'
          })
          this.loadPictureList();
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败'
          })
        }
      },
      handleCurrentChange(page) {
        this.loadPictureList();
      },
      handleEditCurrentItem(row) {
        const {id, path, title} = row;
        for (let ele in row) {
          this.ruleForm[ele] = row[ele];
        }
        this.dialogVisible = true;

      }
    },
    watch: {
      $route: ["setMaxHeight"]
    },
    mounted() {
    },
    created() {
      this.tableHeight(this);
      this.loadPictureList();
    }
  };
</script>
<style lang="less" scoped>
  .picture-manage {
    height: 100%;
    .upload-item {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      > div:nth-child(1) {
        margin-left: 32px;
      }
      > div:nth-child(2) {
        margin-left: 12px;
      }
    }
    .edu_table {
      .el-table__body-wrapper {
        tr {
          td {
            height: auto;
          }
        }
      }
    }
    .edu_table {
      .edu-pagination {
        padding-top: 14px;
      }
    }
  }
</style>
<style lang="less">
  .picture-manage {
    .edu_table {
      .el-table__body-wrapper,
      .el-table__fixed-body-wrapper {
        tr {
          td {
            height: auto;
            padding: 10px 0;
          }
          th {
            height: auto;
            padding: 10px 0;
          }
        }
        .el-button {
          padding: 6px 10px;
          font-size: 14px;
          font-weight: 400;
          font-style: normal;
        }
      }
    }
  }
</style>
