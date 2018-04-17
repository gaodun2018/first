<template>
  <div class="coudata" v-title data-title="EP课程学习数据统计">
    <div class="coudata-header headbar">
      <div class="w_1140 p_t_36 clear ">
        <div class="cou-head_l head_l">
          <p class="coudata_time white_12"><span>{{proclass.course_name}}</span></p>
          <p class="coudata_tit white_24">{{proclass.class_name}}</p>
        </div>
        <div class="cou-head_r head_r clear white_12">
          <p class="h_r_bar">
            <span class="h_r_bar_t">学员总数</span>
            <span><strong class="white_24">{{student_sum}}</strong>&nbsp;人</span>
          </p>
          <!-- <router-link to="" class="cou_stu_detail_btn green_16" tag="a" target="_blank">制定学习计划</router-link> -->
        </div>
      </div>
    </div>

    <div class="stulists-search" style="overflow:hidden;">
      <div class="w_1140">
        <el-input placeholder="输入学员ID/手机号/昵称/学员姓名" icon="search" class="inputsearch" v-model="inuptVal"
                  :on-icon-click="handleIconClick" @keydown.native.enter="handleIconClick">
        </el-input>

      </div>
    </div>

    <div class="cards_box edlist stulists_mian">
      <div class="w_1140 clear">
        <el-table :data="StudentDataList" :border='false' ref='word' class="stuTableData" @sort-change="SortChange" :default-sort = "{prop:defaultSort , order: 'descending'}" v-loading="TabLoading" element-loading-text="拼命加载中...">
          <el-table-column label="排序" width="60">
            <template slot-scope="scope">
              {{scope.$index > 9 ? (scope.$index + 1) : "0" + (scope.$index + 1) }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="学员姓名" width="90">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="100">
          </el-table-column>
          <el-table-column prop="course_progress" label="课程完成率" width="120" sortable="custom">

            <template slot-scope="scope">
              {{scope.row.course_progress}}%
            </template>

          </el-table-column>
          <el-table-column prop="knowledge_point_progress" label="知识点掌握率" width="140" sortable="custom">
            <template slot-scope="scope">
              {{scope.row.knowledge_point_progress}}%
            </template>
          </el-table-column>
          <el-table-column prop="exercise_count" label="本课做题数" width="130" sortable="custom">
          </el-table-column>
          <el-table-column prop="exercise_accuracy" label="最后五次正确率" width="150" sortable="custom">
            <template slot-scope="scope">
              {{scope.row.exercise_accuracy}}%

              <el-tooltip placement="top" v-if="scope.row.exercise_accuracy < 50">
                <div slot="content">正确率小于50%，需重点关注的学员</div>
                <span class="warning_icon"></span>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column prop="behind" label="落后任务数" width="110">
          </el-table-column>
          <el-table-column prop="last_login_time" label="最后登录时间" width="136" sortable="custom">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--  path: '/studentCourse/' + this.$route.params.cid + '/' + this.$route.params.group + '/' + row.student_id  -->
              <!-- <router-link class="viewStuBtn" :to="'/studentCourse/'+CourseID+'/'+scope.row.exam_date+'/'+scope.row.student_id" target="_blank" tag="a">查看学员</router-link> -->

              <router-link class="viewStuBtn" :to="'/studentCourse/'+courseid+'/'+scope.row.group+'/'+scope.row.student_id" target="_blank" tag="a">查看学员</router-link>

            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="pagination" v-show="pageshow">
        <div class="w_1140">
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next, jumper" :total="totalNum">
                </el-pagination>
            </div>
        </div>
    </div>
  </div>

</template>
<style>
  .edlist .el-table .cell,.edlist .el-table th > div{padding-right:10px;}
</style>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
export default {
  components: {
    
  },
  data(){
    return {
      StudentDataList: [],
      courseid:'',
      sid:'',
      proclass:'',
      student_sum:'0',
      orderrule:'',
      defaultSort:'course_progress',
      totalNum:'0',
      pagelt:'1',
      lock:true,
      sortlock:true,
      TabLoading:true,
      pageshow:false,
      flag:true
    }
  },
  computed: {
    
  },
  created(){
    this.courseid = this.$route.params.cid  //课程id
    this.sid = this.$route.params.clid  //课程群组
    this.getPelList()
  },
  methods: {
    async getPelList(){
      if(!this.defaultSort){
        this.flag = false
      }
      this.inuptVal = this.inuptVal ? this.inuptVal : ''
      this.defaultSort = this.defaultSort ? this.defaultSort : 'course_progress'
      this.orderrule = this.orderrule ? this.orderrule : 'desc'
      this.pagelt = this.pagelt ? this.pagelt :'1'
      let url = `/plan/course/${this.courseid}/study/list/${this.sid}?page=${this.pagelt}&order_by=${this.defaultSort}&order_rule=${this.orderrule}&search_info=${this.inuptVal}`
      let ret = await this.$http.PelList(url)
      this.flag = true
      this.lock = true
      this.sortlock = true
      if(ret.data.result.status == 0){
        this.proclass = ret.data.result.result.class
        this.StudentDataList = ret.data.result.result.list
        this.student_sum = Number(ret.data.result.result.student_sum)
        this.totalNum = Number(ret.data.result.result.student_sum)
        this.TabLoading = false
        if(this.student_sum > 0){
          this.pageshow = true
        }else{
          this.pageshow = false
        }
      }
    },
    SortChange(ordertype){
      console.log(ordertype)
      if(!this.defaultSort){
        this.lock = false
        this.sortlock = false
      }
      console.log(ordertype)
      this.defaultSort = ordertype.prop
      if(ordertype.order == "ascending"){
        this.orderrule = "asc"
      }else{
        this.orderrule = "desc"
      }
      if(this.defaultSort){
        this.getPelList()
      }
    },
    handleIconClick(){
      this.getPelList()
    },
    handleCurrentChange(valp){
      console.log(valp)
      this.pagelt = valp
      if(this.flag){
        this.getPelList()
      }
    }
  }
}
</script>
