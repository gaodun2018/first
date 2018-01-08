<template>
  <div class="module-clues-content order-manage">
    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span> 项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']" @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in tablist">
                <span class="clitem" :class="[rev.id === clver ?'current':'']" @click="outlinechange(rev.id)">{{rev.name}}</span>
            </template>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']" @click="mulchange('0')">全部</span>
            <template v-for="(revm,index) in tablist">
              <template v-for="(revs,index) in revm.tabdata">
                  <span class="clitem" :class="[revs.id === clversm ?'current':'']" @click="mulchange(revs.id)">{{revs.name}}</span>
              </template>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" align="bottom">
        <el-col :sm="12">
          <el-row>
            <div class="select-search">
              <el-select v-model="selectvalue" placeholder="请选择" size="small">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-row>
        </el-col>
        <el-col :sm="12">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
              <el-button type="primary" size="small"><router-link to="/addVideo">新增视频</router-link></el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="videoList" style="width: 100%">

        <el-table-column prop="videoid" label="视频id" min-width="100"  fixed>
        </el-table-column>
        <el-table-column prop="classname" label="视频名称" min-width="200">
        </el-table-column>
        <el-table-column prop="duration" label="时长" min-width="100">
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="125">
        </el-table-column>
        <el-table-column prop="project" label="项目" min-width="115">
        </el-table-column>
        <el-table-column prop="num" label="引用数" min-width="115">
        </el-table-column>
        <el-table-column prop="updatetime" label="更新时间" min-width="150">
        </el-table-column>
        <el-table-column prop="dong" label="操作员" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" min-width="240">
          <template scope="scope">
            <el-button type="text">预览</el-button>
            <el-button type="text">修改</el-button>
            <el-button type="text">删除</el-button>
            <el-button type="text">使用统计</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="clues-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :page-sizes="[10, 20, 50, 100, 200, 300, 400]" :page-size="pageSize"
                       :current-page="currentPage" layout="total, sizes, prev, pager, next, jumper"
                       :total="cluesTotal" :page-count="10/pageSize">
        </el-pagination>
      </div>-->
    </div>

  </div>
</template>
<style>
</style>
<script>
  import Vue from 'vue';


  export default {
    components: {},
    data() {
      return {
        radio: '全部',
        radio2: '全部',
        input2:'',
        selectvalue: '全部视频类型', //下拉搜索所选择的的网课类型
        options: [
          {
            value: '',
            label: '全部视频类型'
          }, {
            value:'0',
            label:'1视频',
          },{
            value:'3',
            label:'2视频',
          }
        ],     //下拉搜索的网课类型列表
        videoList:[{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '00:55:40',
          type: '课程录播',
          project: 'ACCA',
          num: '12',
          dong:'alan',
          updatetime: '2017-10-21 09:57'
        },{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '00:55:40',
          type: '课程录播',
          project: 'ACCA',
          num: '12',
          dong:'alan',
          updatetime: '2017-10-21 09:57'
        },{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '00:55:40',
          type: '课程录播',
          project: 'ACCA',
          num: '12',
          dong:'alan',
          updatetime: '2017-10-21 09:57'
        }],
        clver:"0",
        clversm:"0",
        tablist:[{
          id:"12",
          name:"CFA",
          tabdata:[{
            id:"1",
            name:"level11"
          },{
            id:"2",
            name:"level12"
          },{
            id:"3",
            name:"level13"
          }]
        },{
          id:"123",
          name:"ACCA",
          tabdata:[{
            id:"4",
            name:"alevel14"
          },{
            id:"5",
            name:"alevel15"
          },{
            id:"6",
            name:"alevel16"
          }]
        }],
      }
    },
    methods: {
      outlinechange(reid){
        this.clver = reid;
      },
      mulchange(reid){
        this.clversm = reid;
      }
    },
    computed: {},
    mounted() {

    },
    created() {

    }
  }
</script>