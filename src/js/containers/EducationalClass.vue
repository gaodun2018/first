<template>
  <div class="coudata" v-title data-title="EP课程学习数据统计">
    <div class="coudata-header headbar">
      <div class="w_1140 p_t_36 clear ">
        <div class="cou-head_l head_l">
          <p class="coudata_time white_12"><span>{{proclass.course_name}}</span></p>
          <!-- <p class="coudata_tit white_24">{{proclass.teacher_name}}的（{{proclass.class_id}}）班</p> -->
          <p class="coudata_tit white_24">{{proclass.class_name}}</p>
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

              <el-tab-pane v-for="(res,index) in resource_json" :key="index" :name="res.plan_id">
                <span slot="label">{{res.plan_name}}</span>
              </el-tab-pane>
              <div v-if="planshow == 1">
                <div class="planebox">
                  <el-col :span="13" class="stu_cou_res_card edplane">
                    <el-card :body-style="{ padding: '0px 20px' }">
                      <div class="edht">当前阶段</div>
                      <p class="edp1">{{planlist.start_time}} - {{planlist.end_time}}</p>
                      <p class="edp2" v-if="planlist.target != ''">阶段学习目标：{{planlist.target}}</p>
                      <p class="edp2">需完成：
                        <template v-for="(rev,index) in planlist.phase">
                          <span v-for="(val,index) in rev.item">{{rev.type}} - {{val.name}}，</span>
                        </template>
                      </p>
                      <div class="edplbotm">
                        <i></i>
                        <p class="edp2">建议完成度<em>{{planval.recommend_progress}}%</em></p>
                        <!-- <p class="edp3 gray_12">占总资源的 70%</p> -->
                        <router-link :to="'/EducationalPlanAll/'+cid+'/'+clid+'/'+tabnum" target="_blank" tag="a" class="edubtn detail_btn">查看完整计划</router-link>
                      </div>
                    </el-card>
                  </el-col>
                  <el-col :span="11" class="stu_cou_res_card edplane">
                    <el-card :body-style="{ padding: '0px 20px' }">
                      <div class="card_con_l">
                        <div class="myechart">
                          <div id="resource_echart" style="width: 200px;height: 200px;z-index: 999;"></div>
                          <div class="echart_txt">
                            <p class="black_16 f_w_700">总人数</p>
                            <p class="black_36 f_w_700">{{planval.total_students}}</p>
                          </div>
                        </div>
                      </div>
                      <div class="card_con_r">
                        <ul>
                          <li class="type_item">
                            <i class="col_icon" style="background: #00aeff"></i>
                            <p class="black_14">达标人数 <span class="black_24">{{planval.up_standard_students}}</span></p>
                            <p class="gray_14">占总人数的 <span>{{planval.up_standard_students_range}}%</span></p>
                          </li>
                          <li class="type_item">
                            <i class="col_icon" style="background: #ffdd61"></i>
                            <p class="black_14">未达标人数 <span class="black_24">{{planval.not_up_standard_students}}</span></p>
                            <p class="gray_14">占总人数的 <span>{{planval.not_up_standard_students_range}}%</span></p>
                          </li>
                        </ul>
                      </div>
                    </el-card>
                  </el-col>
                </div>

                <div class="planetit">
                  <div class="edht">计划进度未达标TOP10</div>
                  <router-link :to="'/EducationalClasslist/'+cid+'/'+clid" target="_blank" tag="a" class="ckallstudent detail_btn">查看全部学员详情</router-link>
                </div>

                <div class="planetab">
                  <el-table :data="tableData" style="width: 100%" v-loading="TabLoading" element-loading-text="拼命加载中...">
                    <el-table-column label="排序" width="80">
                      <template scope="scope">
                        {{scope.$index + 1 > 9 ? scope.$index + 1 : '0' + [scope.$index + 1]}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="nick_name" label="学员姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="phone" label="手机号" width="160">
                    </el-table-column>
                    <el-table-column label="阶段完成进度" width="150">
                      <template scope="scope">
                        {{scope.row.progress}}%
                      </template>
                    </el-table-column>
                    <el-table-column label="课程总进度" width="150">
                      <template scope="scope">
                        {{scope.row.total_progress}}%
                      </template>
                    </el-table-column>
                    <el-table-column label="学习情况" width="180">
                      <template scope="scope">
                        <span>
                          {{scope.row.no_study_days}}天未学习

                          <el-tooltip placement="top" v-if="scope.row.no_study_days > 5">
                            <div slot="content">超过5天未登录学习的高危学员</div>
                            <i class="warning_icon"></i>
                          </el-tooltip>
                        </span>

                      </template>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template scope="scope">
                        <!-- <el-button type="text" class="removebtn" @click="remindPlan(scope.$index, scope.row)">一键提醒</el-button>
                        <el-button type="text" class="editbtn" @click="callbackPlan(scope.$index, scope.row)">电话回访</el-button> -->
                        <router-link :to="'/studentCourse/'+cid+'/'+scope.row.group+'/'+scope.row.student_id" class="editbtn" target="_blank" tag="a">查看详情</router-link>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div v-if="planshow == 2">
                <div class="planempty">
                  <p class="plane1 black_16">当前无计划安排<br/>请您合理安排学员的计划哦！</p>
                  <div class="planebtn">
                    <router-link :to="'/EducationalPlanAll/'+cid+'/'+clid+'/'+tabnum" target="_blank" tag="a" class="planbill detail_btn">查看完整计划</router-link>
                    <router-link :to="'/EducationalClasslist/'+cid+'/'+clid" target="_blank" tag="a" class="planbill detail_btn">查看全部学员详情</router-link>
                  </div>
                </div>
              </div>
              <div v-if="planshow == 3">
                <div class="planempty">
                  <p class="plane1 black_16">暂未制定标杆学习计划！</p>
                  <div class="planebtn">
                    <router-link :to="'/customizedPlan/'+cid+'/'+clid" target="_blank" tag="a" class="planbill detail_btn">去制定计划</router-link>
                  </div>
                </div>
              </div>
            </el-tabs>
          </el-card>
        </el-col>
      </div>
    </div>
    <div class="coudata_educat">
      <div class="w_1140">
        <el-row type="flex" justify="space-between" class="cardgroup_1">
          <el-col :span="12" class="cards_educat">
            <el-card :body-style="{ padding: '20px 0px 0px 0px' }" v-loading="ELoading" element-loading-text="拼命加载中...">
              <div slot="header" class="card_title">
                <span class="black_14" style="position: relative;">完课情况</span>
              </div>
              <div class="card_contont clear">
                <div class="cards_3_l">
                  <p class="gray_14">
                    <span style="position:relative;">
                      本班平均完成率
                      <el-tooltip placement="top">
                        <div slot="content">本班学员的平均课程完成率，是平均值。</div>
                        <i class="tips"></i>
                      </el-tooltip></span>
                  </p>
                  <p class="black_36"><span>{{ProgressCm.average_progress}}%</span></p>
                  <!-- <p class="gray_14 educt1">比上周提升了5%</p> -->
                </div>
                <div class="cards_3_r">
                  <p class="gray_14">
                    <span style="position:relative;">
                      本班平均知识点掌握率
                      <el-tooltip placement="top">
                        <div slot="content">本班学员的平均知识点掌握率，是平均值。</div>
                        <i class="tips"></i>
                      </el-tooltip>
                    </span>
                  </p>
                  <p class="black_36"><span style="margin-left:16px;">{{ProgressCm.knowledge_masteryrate}}%</span></p>
                  <!-- <p class="gray_14 educt1">比上周提升了5%</p> -->
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12" class="cards_educat">
            <el-card :body-style="{ padding: '20px 0px 0px 0px' }" v-loading="ELoading" element-loading-text="拼命加载中...">
              <div slot="header" class="card_title">
                <span class="black_14" style="position: relative;">做题情况</span>
              </div>
              <div class="card_contont clear">
                <div class="cards_3_l">
                  <p class="gray_14">
                    <span style="position:relative;">
                      本班平均做题数
                      <el-tooltip placement="top">
                        <div slot="content">本班学员的平均做题数，是平均值。</div>
                        <i class="tips"></i>
                      </el-tooltip></span>
                  </p>
                  <p class="black_36"><span>{{ProgressCm.average_exercise_count}}</span></p>
                  <!-- <p class="gray_14 educt1">比上周提升了5%</p> -->
                </div>
                <div class="cards_3_r">
                  <p class="gray_14">
                    <span style="position:relative;">
                      本班平均做题正确率
                      <el-tooltip placement="top">
                        <div slot="content">本班学员的平均做题正确率，是平均值。</div>
                        <i class="tips"></i>
                      </el-tooltip>
                    </span>
                  </p>
                  <p class="black_36"><span>{{ProgressCm.average_exercise_accuracy}}%</span><!-- <i class="risefall upicon"></i><i class="risefall downpic"></i> --></p>
                  <!-- <p class="gray_14 educt1">比上周提升了5%</p> -->
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>
<script>
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/pie';
  import 'echarts/lib/component/tooltip';
  import base from 'base';
  import {getEnv} from '../util/config';

  import {PlanProgress,TopoProgress} from '../api/plan.js'
  import {ProgressStatics} from '../api/plantop.js'

  export default {
    components: {
      
    },
    data(){
      return {
        Loading:false,
        DoExLoading:false,
        activeName:'',
        resource_json:[],
        option: {
          tooltip: {
            trigger: 'item',
            formatter: "<p style='font-size:16px;'>{b}: <span style='color: #00AEFF;'>{c}</span></p>占总人数的  {d}%",
            position: 'right',
            padding: [10, 10, 10, 10]
          },
          series: [
            {
              name: '达标人数',
              type: 'pie',
              radius: ['60%', '80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: []
            }
          ]
        },
        myChart:'',
        tabContent:'',
        tableData: [],
        resultData:[],
        ProgressCm:'',
        proclass:'',
        planlist:[],
        planval:'',
        student_sum:'0',
        tabid:'',
        planshow:1,
        Loading:true,
        ELoading:true,
        TabLoading:true,
        tabnum:0,
        tabname:"",
        baseurl:getEnv(),
        clid:'',
        cid:''
      }
    },
    computed: {
      
    },
    created(){
      console.log(this.$route)
      this.clid = this.$route.params.sid;  //班级id
      this.cid = this.$route.params.cid;  //课程id
      this.getProgressStatics();
    },
    mounted(){
       this.myChart = echarts.init(document.getElementById('resource_echart'));
       this.myChart.setOption(this.option);
       this.getPlanProgress();
    },
    methods: {
      //tab切换标杆计划
      handleClick(tab, event){
        console.log(tab.name,tab.index);
        this.tabid = tab.index;
        this.tabnum = tab.name;

        if(this.resource_json.length > 0){
          if(this.resource_json[Number(tab.index)] && this.resource_json[Number(tab.index)]['plan_item'].length > 0){
              console.log("有标杆计划，有当前阶段");
              this.planlist = this.resource_json[Number(tab.index)]['plan_item'][0];
              this.CountLoad();
              this.planshow = 1;
          }else{
            console.log("有标杆计划，无当前阶段");
            this.planshow = 2;
            // this.planlist = [];
          }
        }else{
          this.planshow = 3;
          // this.planlist = [];
          console.log("有标杆计划，无阶段计划和无标杆计划")
        }
        for(let o = 0; o < this.resultData.length; o++){
          if(this.resultData[o].plan_id == tab.name){
            this.tableData = this.resultData[o]['top'];
            return;
          }else{
            this.tableData = []
          }
        }

        // this.tableData = this.resultData[Number(tab.index)]?this.resultData[Number(tab.index)]['top']:[];
      },
      CountLoad(){
        let up_standard_students_range,not_up_standard_students_range
        if(this.planlist.progress.total_students > 0){
          up_standard_students_range = (Number(this.planlist.progress.up_standard_students / this.planlist.progress.total_students)*100).toFixed(0);
          not_up_standard_students_range = (Number(this.planlist.progress.not_up_standard_students / this.planlist.progress.total_students)*100).toFixed(0);
        }else{
          up_standard_students_range = 0;
          not_up_standard_students_range = 0;
        }
        
        this.planval = {
          total_students:this.planlist['progress']['total_students'],
          up_standard_students:this.planlist['progress']['up_standard_students'],
          not_up_standard_students:this.planlist['progress']['not_up_standard_students'],
          recommend_progress:this.planlist['progress']['recommend_progress'],
          up_standard_students_range:up_standard_students_range,
          not_up_standard_students_range:not_up_standard_students_range
        }

        let echartData = {
          series:[
            {
              data:[{
                value: this.planlist.progress.up_standard_students,
                name: '达标人数',
                itemStyle: {
                  normal: {
                    color: '#00aeff',
                  }
                },
              },
              {
                value:this.planlist.progress.not_up_standard_students,
                name: '未达标人数',
                itemStyle: {
                  normal: {
                    color: '#ffdd61',
                  },
                },
              }]
            }
          ]
        }
        setTimeout(()=>{
          this.myChart = echarts.init(document.getElementById('resource_echart'));
          this.myChart.setOption(this.option);
          this.myChart.setOption(echartData)
        },100)
      },
      remindPlan(index,row){
        console.log(index,row);
      },
      callbackPlan(index,row){
        console.log(index,row);
      },
      detailsPlan(index,row){
        console.log(index,row);
      },
      async getPlanProgress(planid){
        // let url = `${this.baseurl}plan-api.gaodun.com/plan/class/${this.clid}/progress`;
        let ret = await PlanProgress(this.clid);
        console.log(ret,"plan-api.gaodun.com/plan/class/${this.clid}/progress")
        if(ret.data.status == 0){
          this.proclass = ret.data.result.class;
          this.student_sum = ret.data.result.student_sum;
          this.resource_json = ret.data.result.plan;

          let starttt,enddd,startdata,enddata,datatime;
          if(ret.data.result.plan.length > 0){
            this.tabnum = ret.data.result.plan[0]['plan_id'];
            this.activeName = ret.data.result.plan[0].plan_id;
          }

          if(planid){
              console.log("有标杆计划，有当前阶段");
              this.planlist = ret.data.result.plan[planid]['plan_item'][0];
              this.CountLoad();
              this.planshow = 1;
          }else{
            if(this.resource_json.length > 0){
              if(ret.data.result.tag[0] && ret.data.result.plan[0]['plan_item'].length > 0){
                this.tabname = ret.data.result.plan[0]['plan_id'];
                  console.log("有标杆计划，有当前阶段");
                  this.planlist = ret.data.result.plan[0]['plan_item'][0]
                  this.CountLoad();
                  this.planshow = 1;
              }else{
                console.log("有标杆计划，无当前阶段");
                this.planshow = 2;
                // this.planlist = [];
              }
            }else{
              this.planshow = 3;
              // this.planlist = [];
              console.log("有标杆计划，无阶段计划和无标杆计划")
            }
          }
          this.Loading = false;
          this.getTopoProgress(planid);
        }
      },
      async getProgressStatics(){
        // let url = `${this.baseurl}plan-api.gaodun.com/gcloud/course/${this.cid}/class/${this.clid}/progress/statics`;
        let ret = await ProgressStatics(this.cid,this.clid);
        if(ret.data.status == 0){
          this.ProgressCm = {
            average_progress:ret.data.result.average_progress,
            knowledge_masteryrate:ret.data.result.knowledge_masteryrate,
            average_exercise_count:ret.data.result.average_exercise_count,
            average_exercise_accuracy:ret.data.result.average_exercise_accuracy
          }
          this.ELoading = false;
        }
      },
      async getTopoProgress(planid){
        // let url = `${this.baseurl}plan-api.gaodun.com/plan/class/${this.clid}/top/progress`;
        let ret = await TopoProgress(this.clid);
        this.resultData = ret.data.result;
        if(ret.data.status == 0){
          if(planid){
            this.tableData = this.resultData[Number(planid)]?this.resultData[Number(planid)]['top']:[];
          }else{
            if(ret.data.result.length > 0){
              for(let o = 1; o < ret.data.result.length; o++){
                if(this.resultData[o]['plan_id'] == this.tabname){
                  this.tableData = this.resultData[o]?this.resultData[o]['top']:[];
                }else{
                  this.tableData = []
                }
              }
            }else{
              this.tableData = []
            }
            
            // this.tableData = ret.result.length!=0 ? ret.result[0].top:[];
          }
          this.TabLoading = false;
        }
      }
    }
  }
</script>