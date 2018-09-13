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
      <el-table ref="table" border :data="data" :height="setMaxHeight()" style="width: 100%">
        <el-table-column prop="id" label="id" width="80" fixed>
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="260">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="240" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
            >
              预览
            </el-button>
            <el-button
              type="text"
            >
              修改
            </el-button>
            <el-button
              type="text"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <!--<el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="eduTotal"
        >
        </el-pagination>-->
      </div>
    </div>
    <el-dialog title="编辑日签图" center :visible.sync="dialogVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px">
        <el-form-item label="名称" prop="name" :rules="filter_rules({required:true,type:'isAllSpace',max:50})">
          <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="upload-item">
        <div>
          <span>上传文件</span>
        </div>
        <div>
          <v-upload
            :upload-url="'123'"
            :file-types="['png']"
            :name="'name'"
          >
          </v-upload>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading">
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
          name: ''
        },
        btnLoading: false
      };
    },
    computed: {},
    methods: {
      setMaxHeight() {
        const bdh = document.body.offsetHeight || document.documentElement.offsetHeight;
        return (bdh - 200) + 'px'
      }
    },
    watch: {
      $route: ["setMaxHeight"]
    },
    mounted() {
    },
    created() {
      this.tableHeight(this);
      setTimeout(() => {
        this.data = [
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
          {id: 1, name: '12312'},
        ]
      }, 1000)
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
