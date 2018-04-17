<template>
  <div class="coudata" v-title data-title="EP课程学习数据统计">
    <div class="coudata-header headbar">
      <div class="w_1140 p_t_36 clear ">
        <div class="cou-head_l head_l">
          <p class="coudata_time white_12"><span>{{classDetail.course_name}}</span></p>
          <!-- <p class="coudata_tit white_24">{{classDetail.teacher_name}}的（{{classDetail.class_id}}）班</p> -->
          <p class="coudata_tit white_24">{{classDetail.class_name}}</p>
        </div>
        <div class="cou-head_r head_r clear white_12">
          <p class="h_r_bar">
            <span class="h_r_bar_t">学员总数</span>
            <span><strong class="white_24">{{student_sum}}</strong>&nbsp;人</span>
          </p>
          <router-link :to="'/customizedPlan/'+cid+'/'+clid" class="cou_stu_detail_btn green_16" tag="a" target="_blank">制定学习计划</router-link>
        </div>
      </div>
    </div>
    <div class="cards_box educabox">
      <div class="w_1140 p_t_36 clear">
        <el-col :span="24" class="stu_cou_res_card edbox">
          <el-card :body-style="{ padding: '0px 20px' }" class="plane-card" v-loading="Loading" element-loading-text="拼命加载中...">
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-for="res in taglist" :key="res.id" :label="res.plan_name" :name="res.id">
                <span slot="label">{{res.name}}
                  <!-- <el-tooltip :content="res.name" placement="top">
                    <el-button>{{res.name | comname}}</el-button>
                  </el-tooltip> -->
                </span>
              </el-tab-pane>

              <div class="planebox edplane">
                <div class="edht">全部完整计划</div>
              </div>
              <div class="planetab">
                <div class="planbox" v-loading="Loading" element-loading-text="拼命加载中...">
                  <div class="planepan" v-if="planopty == 1">
                    <div class="pline"></div>
                    <template v-for="(rev,index) in planlist">
                      <div class="plfix passcur" :key="index">
                        <span class="fixpiont"></span>
                        <div class="fixmin">{{rev.start_time}} - {{rev.end_time}}</div>
                        <p class="fixp1" v-if="rev.target != ''">阶段学习目标：{{rev.target}}</p>
                        <p class="fixp1">需完成：
                          <template v-for="val in rev.phase">
                            <span class="fixval" v-for="cmt in val.item" :key="cmt.name">{{val.type}} - {{cmt.name}}，</span>
                          </template>
                        </p>
                        <div class="plansum gray_14">
                          <span class="planal" v-for="(rangeval,index) in rev.range" :key="index">
                            <p class="al1">{{rangeval.count}}人</p>
                            <p class="al2">{{rangeval.range}}</p>
                          </span>
                        </div>
                      </div>
                    </template>
                  </div>

                  <div class="planempty" v-if="planopty == 2">
                    <p class="plane1 black_16">暂无阶段计划<br/>请您合理安排学员的计划哦！</p>
                  </div>

                  <div class="planempty" v-if="planopty == 3">
                    <p class="plane1 black_16">暂未制定标杆学习计划！</p>
                  </div>
                </div>
              </div>
            </el-tabs>
          </el-card>
        </el-col>
      </div>
    </div>
  </div>

</template>
<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
export default {
  data(){
    return {
      Loading:false,
      DoExLoading:false,
      activeName:'',
      resource_json:[],
      tabContent:'',
      classDetail:'',
      tabname:'',
      tabid:'',
      student_sum:'0',
      planlist:[],
      clid:'',
      cid:'',
      tabnum:"",
      taglist:[],
      planopty:1,
      Loading:true
    }
  },
  filters: {
    comname: function (value) {
      console.log(value.length)
      let realLength = 0,
        len = value.length,
        charCode = -1
      for(var i = 0; i < len; i++) {
        charCode = value.charCodeAt(i)
        if(charCode == 32) {
          realLength -= 1
        }
        if(charCode >= 0 && charCode <= 128) {
          realLength += 1
        } else {
          realLength += 1
        }
      }
      return realLength
        // return value.substring(5)
    }
  },
  created(){
    this.clid = this.$route.params.clid  //班级id
    this.cid = this.$route.params.cid  //课程id
    this.tabnum = this.$route.params.tabnum   //切换tab的索引
    this.getCheckAllPlan()
  },
  methods: {
    async getCheckAllPlan(){
      // let url = `/plan/whole/all/class/${this.clid}/course/${this.cid}`
      let ret = await this.$http.CheckAllPlan(this.clid,this.cid)
      if (ret.data.status == 0) {
        this.classDetail = ret.data.result.class
        this.student_sum = ret.data.result.student_sum
        this.taglist = ret.data.result.tag
        this.resource_json = ret.data.result.plan
        if(ret.data.result.han_tag == 1){
          for(let o = 0; o < this.taglist.length; o++){
            if(Number(this.taglist[o].id) == this.tabnum){
              this.activeName = this.taglist[o].id
              if(this.resource_json.length > 0){
                for(let i = 0; i < this.resource_json.length; i++){
                  if(Number(this.resource_json[i].plan_id) == this.tabnum){
                    if(this.resource_json[i] && this.resource_json[i]['plan_item'].length > 0){
                      this.planlist = this.resource_json[i]['plan_item']
                      this.planopty = 1
                      this.Loading = false
                      return
                    }else{
                      this.planopty = 2
                      this.planlist = []
                      console.log("暂无阶段计划1")
                      this.Loading = false
                      return
                    }
                  }else{
                    this.planopty = 2
                    this.planlist = []
                    console.log("暂无阶段计划2")
                    this.Loading = false
                  }
                }
              }else{
                this.planopty = 2
                this.planlist = []
                console.log("暂无阶段计划4")
                this.Loading = false
              }
            }else{
              this.planopty = 2
              this.planlist = []
              console.log("暂无阶段计划3")
              this.Loading = false
            }
          }
        }else{
          this.planopty = 3
          console.log("暂无标杆计划4")
          this.Loading = false
        }
      }
    },
    //tab切换标杆计划
    handleClick(tab) {
      this.Loading = true
      for(let o = 0;o < this.resource_json.length; o++){
        if(Number(this.resource_json[o].plan_id) == Number(tab.name)){
          if(this.resource_json[o] && this.resource_json[o]['plan_item'].length > 0){
            this.planlist = this.resource_json[o]['plan_item']
            this.planopty = 1
          }else{
            this.planopty = 2
            this.planlist = []
            console.log("暂无阶段计划")
          }
          this.Loading = false
          return
        }else{
          this.planopty = 2
          this.planlist = []
          this.Loading = false
          console.log("暂无阶段计划")
        }
      }
      // this.planlist = this.resource_json[tab.index]['plan_item']
    }
  }
}
</script>