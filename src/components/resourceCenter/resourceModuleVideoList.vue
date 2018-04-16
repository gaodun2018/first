<template>
    <div class="module-clues-content order-manage">
        <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
            <el-row>
                <el-col :sm="24">
                    <div class="button_group_t">
                        <span> 项 目:</span>
                        <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']"
                              @click="outlinechange('0')">全部</span>
                        <span class="clitem" :class="[rev.id === clver ?'current':'']"
                            v-for="(rev,index) in tags"
                            :key="index"
                            @click="outlinechange(rev.id)">{{rev.name}}
                        </span>
                    </div>
                    <div class="button_group_b">
                        <span> 科 目:</span>
                        <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']"
                              @click="mulchange('0')">全部</span>
                        <template v-for="revm in tags" v-if="clver != '0'">
                            <template v-for="revs in revm.children" v-if="parseInt(clver) == revm.id">
                                <span class="clitem" :class="[revs.id === clversm ?'current':'']"
                                    :key="revs.id"
                                      @click="mulchange(revs.id)">{{revs.name}}</span>
                            </template>
                        </template>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" align="bottom">
                <el-col :sm="12">
                    <el-row>
                        <div class="select-search"></div>
                    </el-row>
                </el-col>
                <el-col :sm="12">
                    <el-row type="flex" justify="end">
                        <div class="input-search">
                            <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="keywords"
                                      :on-icon-click="handleIconClick"
                                      @keydown.native.enter="handleIconClick"></el-input>
                            <router-link
                                class="routerBtn"
                                v-if="unlocking('VIDEO_CREATE')"
                                to="/resource/video/create"
                            >新增视频
                            </router-link>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div class="edu_table">
            <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName"
                      @selection-change="handleSelectionChange" :data="resource.resources" style="width: 100%">

                <el-table-column prop="id" label="视频id" min-width="100" fixed>
                </el-table-column>
                <el-table-column prop="title" label="视频名称" min-width="200">
                </el-table-column>
                <el-table-column label="时长" min-width="100">
                    <template slot-scope="scope">
                        {{scope.row.duration_minutes > 10 ? scope.row.duration_minutes : "0"+scope.row.duration_minutes}}分
                        {{scope.row.duration_seconds > 10 ? scope.row.duration_seconds : "0"+scope.row.duration_seconds}}秒
                    </template>
                </el-table-column>
                <el-table-column prop="project_name" label="项目" min-width="115">
                </el-table-column>
                <el-table-column prop="updated_at" label="更新时间" min-width="150">
                </el-table-column>
                <el-table-column prop="creator.username" label="操作员" min-width="150">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" min-width="240">
                    <template slot-scope="scope">
                        <!--<el-button type="text" v-if="unlocking('VIDEO_PREVIEW')">预览</el-button>-->
                        <el-button type="text" v-if="unlocking('VIDEO_EDIT')" @click="didClickEdit(scope)">修改
                        </el-button>
                        <el-button type="text" v-if="unlocking('VIDEO_DELETE')" @click="onRemove(scope.row)">删除
                        </el-button>
                        <!--<el-button type="text" v-if="unlocking('VIDEO_STATISTICS')">使用统计</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-row type="flex" align="center">
            <el-col :sm="24">
                <el-pagination
                    @size-change="didChangePageSize"
                    @current-change="didChangePage"
                    :page-sizes="[50, 200, 300, 400]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="paginationTotal"
                    style="text-align: center;">
                </el-pagination>
            </el-col>
        </el-row>

    </div>
</template>
<style>
</style>
<script>
import {number2DateTime} from '../../util/util.js'

export default {
  components: {},
  data() {
    return {
      radio: '全部',
      radio2: '全部',
      input2: '',
      keywords: '',//关键字搜索
      resource: {
        resources: [],
        pagination: {
          total: 0,
          current_page: 1
        }
      },
      clver: "0",
      clversm: "0",
      tags: [],
      currentPage: 1,
      paginationTotal: 0,
      pageSize: 50,
      loading: false
    }
  },
  methods: {
    outlinechange(reid) {
      this.clver = reid
      this.clversm = '0'
      this.loadResources()
    },
    mulchange(reid) {
      this.clversm = reid
      this.loadResources()
    },
    onRemove(row) { // 删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.removeLecturenote(row.id).then(ret => {
          if (ret.status == 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.loadResources()
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    didClickEdit(scope) {
      console.log('navigate to edit video ' + scope.row.id)
      this.$router.push({name: "editVideo", params: {id: scope.row.id}})
    },
    async fetchResources() {
      let parameters = {
        page_size: this.pageSize,
        page: this.currentPage,
        discriminator: 'video',
        keywords: this.keywords,
      }

      if (this.clver != '0') {
        parameters.tag_id = this.clver
      }
      if (this.clversm != '0') {
        parameters.tag_id = this.clversm
      }
      let r = await this.$http.getResource(parameters)
      return r
    },
    async loadResources() {
      this.loading = true
      let resourceResponse = await this.fetchResources()
      let resources = resourceResponse.result;
      for (var resource of resources.resources) {
        resource.created_at = new Date((resource.created_at * 1000))
        resource.updated_at = number2DateTime(new Date(resource.updated_at * 1000))
        resource.project_name = (resource.tag == null) ? "" : resource.tag.name
      }
      this.resource = resources
      let total = this.resource.pagination.total;
      // if (this.paginationTotal == 0)
      //     this.paginationTotal = total
      this.paginationTotal = total;
      this.loading = false
    },
    async didChangePage(page) {
      this.currentPage = page;
      this.loadResources()
    },

    didChangePageSize(pageSize) {
      this.pageSize = pageSize;
      this.loadResources()
    },
    handleIconClick() {
      //输入框搜索
      this.clver = "0"
      //点击搜索所选项目
      this.clversm = "0"
      //点击搜索所选科目
      this.loadResources()
    }
  },
  async created() {
    this.tags = (await this.$http.getTags('project')).result;
    await this.loadResources()
  }
}
</script>
