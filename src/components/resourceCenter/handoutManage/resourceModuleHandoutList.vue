<template>
  <div class="module-clues-content order-manage">
    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span> 项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']" @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in tagsList">
              <span :key="index" class="clitem" :class="[rev.id === clver ?'current':'']" @click="outlinechange(rev.id)">{{rev.name}}</span>
            </template>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']" @click="mulchange('0')">全部</span>
            <template v-for="revm in tagsList" v-if="clver != '0'">
              <template v-for="(revs,index) in revm.children" v-if="parseInt(clver) == revm.id">
                <span :key="index" class="clitem" :class="[revs.id === clversm ?'current':'']" @click="mulchange(revs.id)">{{revs.name}}</span>
              </template>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="24">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="讲义ID／讲义名称" size="small" v-model="keywords">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="handleIconClick"></i>
              </el-input>
              <router-link
                class="routerBtn"
                :to="isBtnDisabled ? '#' : '/resource/handout/create'"
                :class="{'is-disabled': isBtnDisabled}"
                v-if="unlocking('HANDOUT_CREATE')"
              >
                +&nbsp;新增讲义
              </router-link>
              <el-button type="primary" size="small" :disabled="isBtnDisabled" @click="uploaddialogVisible = true">+&nbsp;批量导入讲义资源
              </el-button>
              <a class='docBtn' :href="`${docUrl}#/resourceCourse`" target="_blank">
                <i class="el-icon-question"></i>
                使用帮助
              </a>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" :data="resource.resources" style="width: 100%">

        <el-table-column prop="id" label="讲义ID" min-width="100" fixed>
        </el-table-column>
        <el-table-column prop="title" label="讲义名称" min-width="200">
        </el-table-column>
        <!--<el-table-column prop="duration" label="大小" min-width="100">-->
        <!--</el-table-column>-->
        <el-table-column prop="project_name" label="项目" min-width="110">
        </el-table-column>
        <el-table-column prop="extension" label="类型" min-width="110">
        </el-table-column>
        <!--<el-table-column prop="num" label="引用数" min-width="110">
                </el-table-column>-->
        <el-table-column prop="updated_at" label="更新时间" min-width="150">
        </el-table-column>
        <el-table-column prop="creator.username" label="操作员" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" min-width="150">
          <template slot-scope="scope">
            <!-- <el-button type="text" v-if="unlocking('HANDOUT_PREVIEW')">预览</el-button> -->
            <router-link :to="{path: `/resource/handout/edit/${scope.row.id}`}" v-if="unlocking('HANDOUT_EDIT')" style="margin: 0 6px;">修改
            </router-link>
            <el-button type="text" v-if="unlocking('HANDOUT_DELETE')" @click="onRemove(scope.row)">删除
            </el-button>
             <el-button type="text" @click="toShow(scope.row.id)">操作日志</el-button>
            <!-- <el-button type="text" v-if="unlocking('HANDOUT_STATISTICS')">使用统计</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="clues-pagination">
        <el-pagination @size-change="didChangePageSize" @current-change="didChangePage" :page-sizes="[50, 200, 300, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="paginationTotal" style="text-align: center;">
        </el-pagination>
      </div>
      <el-row>
        <v-upload :b-visible="uploaddialogVisible" :title="'批量导入讲义资源'" :url-title="'批量讲义资源Excel模板下载'" :download-url="'//s.gaodun.com/web/static-saas/file/%E6%89%B9%E9%87%8F%E8%AE%B2%E4%B9%89%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx'" :upload-url="uploadUrl" :name="'file'" @uploadSuccessCallback="uploadSuccessCallback" @handleCloesDialog="uploaddialogVisible = false" :fileTypes="['xlsx']"></v-upload>
      </el-row>
    </div>

    <log-dialog
    :dialog="logVisiable"
    :list="logList"
    :total="logTotal"
    @handleChangePage="handleChangePage"
    @toClose="toClose"
    ></log-dialog>
  </div>
</template>
<style>
</style>
<script>
import Vue from "vue";
import { number2DateTime } from "../../../util/util.js";
import vUpload from "../../public/BatchFilesUpload.vue";
import { getDocumentUrl } from "../../../util/config.js";
import { mapState } from "vuex";
import logDialog from "../../public/showLogsDialog";
export default {
  components: {
    vUpload,logDialog
  },
  data() {
    return {
      docUrl: getDocumentUrl,
      logList:[],//日志数据列表
      logVisiable:false,
      logTotal: 0,
      page:1,
      sourceId:0,
      radio: "全部",
      radio2: "全部",
      keywords: "",
      clver: "0",
      clversm: "0",
      resource: {
        resources: [],
        pagination: {
          total: 0,
          current_page: 1
        }
      },
      currentPage: 1,
      paginationTotal: 0,
      pageSize: 50,
      loading: false,
      videoList: [],
      uploaddialogVisible: false ,//批量上传的显示隐藏
      isBtnDisabled: false,
    };
  },
  computed: {
    ...mapState({
      tagsList: state => {
        return state.resources.tagsList;
      }
    }),
    uploadUrl() {
      return `calais/resource/v1/lecture-note/batch`;
    }
  },
  methods: {
    //   打开弹层
    toShow(val){
        this.sourceId = val;
        this.logVisiable = true;
        this.getLogList();
    },
    //分页
    handleChangePage(val) {
        this.page = val;
        this.getlogList();
    },
    toClose(){
        this.logVisiable=false;
    },
    async getLogList() {
        let params = {
            log_type: 3,
            page_num: this.page,
            page_size: 50,
            source_id:this.sourceId?this.sourceId : '',
        }
        let ret = await this.$http.getLogsList(params);
        if(ret.code == 0){
            this.logTotal = ret.result.total;
            this.logList = ret.result.data;
        }else{
            this.$message({
                message:'获取日志失败',
                type: 'warning'
            })
        }
    },
    // 批量导入视频资源回调
    uploadSuccessCallback() {
      this.loadResources();
      this.uploaddialogVisible = false;
    },
    handleIconClick() {
      // 搜索
      this.loadResources();
    },
    onRemove(row) {
      // 删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.removeResource(row.id).then(ret => {
            if (ret.status == 0) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.loadResources();
            } else {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    outlinechange(reid) {
      this.clver = reid;
      this.clversm = "0";
      this.loadResources();
    },
    mulchange(reid) {
      this.clversm = reid;
      this.loadResources();
    },

    async fetchResources() {
      let parameters = {
        page_size: this.pageSize,
        page: this.currentPage,
        keywords: this.keywords,
        discriminator: "lecture_note"
      };

      if (this.clver != "0") {
        parameters.tag_id = this.clver;
      }
      if (this.clversm != "0") {
        parameters.tag_id = this.clversm;
      }

      let r = await this.$http.getResource(parameters);
      return r;
    },
    async loadResources() {
      this.loading = true;
      let resourceResponse = await this.fetchResources();
      if (resourceResponse.status === 0){
        this.isBtnDisabled = false;
        let resources = resourceResponse.result;
        try {
          for (var resource of resources.resources) {
            resource.created_at = new Date(resource.created_at * 1000);
            resource.updated_at = number2DateTime(
              new Date(resource.updated_at * 1000)
            );
            resource.project_name = resource.tag == null ? "" : resource.tag.name;
          }
        } catch (error) {
          console.log(error);
        }
        this.resource = resources;
        // let total = this.resource.pagination.total;
        // if (this.paginationTotal == 0)
        this.paginationTotal = this.resource.pagination.total;
      }else {
        this.isBtnDisabled = true;
      }
      this.loading = false;
    },
    async didChangePage(page) {
      this.currentPage = page;
      this.loadResources();
    },

    didChangePageSize(pageSize) {
      this.pageSize = pageSize;
      this.loadResources();
    }
  },
  async created() {
    this.$store.dispatch("getTagsList", "project");
    await this.loadResources();
  }
};
</script>
