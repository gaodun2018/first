<template>
  <div>
    <div class="input-search">
      <el-button
        type="primary"
        size="small"
        @click="showCfaDialog"
        v-if="unlocking('COURSE_CREATE')"
      >
        +&nbsp;新增一次续派课
      </el-button>
    </div>
    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" :data="cfaList" style="width: 100%">
        <el-table-column prop="course_id" label="任务ID" width="80" fixed>
        </el-table-column>
        <el-table-column prop="course_name" label="任务名称" min-width="180">
        </el-table-column>
        <el-table-column prop="" label="项目" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.project&&scope.row.project.project_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="课程ID" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.subject&&scope.row.subject.subject_name?scope.row.subject.subject_name:'不限科目'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="course_type" label="首次开启时间" min-width="160" fixed="right">
          <template slot-scope="scope">
            <span>{{scope.row.course_type}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="course_type" label="二次开启时间" min-width="160" fixed="right">
          <template slot-scope="scope">
            <span>{{scope.row.course_type}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="clearCache(scope.row)">修改</el-button>
            <el-button type="text" @click="clearCache(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="edu-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="eduTotal">
        </el-pagination>
      </div>
    </div>

    <creatCFA></creatCFA>
  </div>
</template>

<script>
import creatCFA from './updateCFADialog'
import Vue from '../../common/vue.js'
export default {
  data () {
    return {
      cfaList: [
        {course_id: '123'}
      ],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      eduTotal: 30,
    }
  },
  components: {
    creatCFA
  },
  methods: {
    handleSizeChange(){},
    handleSizeChange(){},
    handleCurrentChange(){},
    showCfaDialog (){
      Vue.$emit('showCfaDialog')
    }
  }
}
</script>

<style scoped>
  .input-search {
    text-align: right;
    margin-bottom: 20px;
  }
</style>
