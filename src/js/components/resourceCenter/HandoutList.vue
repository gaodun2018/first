<template>
  <div class="module-clues-content order-manage">

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span>项 目:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']"
                  @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in projectlist">
              <span class="clitem" :class="[rev.project_id === clver ?'current':'']"
                    @click="outlinechange(rev.project_id,index)">{{rev.project_name}}</span>
            </template>
          </div>
          <div class="button_group_b">
            <span> 科 目:</span>
            <span class="clitem" :class="[clversm === '0'||clversm === 0 ?'current':'']"
                  @click="mulchange('0')">全部</span>
            <template v-for="(revs,index) in subtablist">
                <span class="clitem" :class="[revs.subject_id === clversm ?'current':'']"
                      @click="mulchange(revs.subject_id)">{{revs.subject_name}}</span>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row>
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
              <el-button type="primary" size="small"><router-link to="/addHandout" v-if="unlocking('HANDOUT_CREATE')">新增讲义</router-link></el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="videoList" style="width: 100%">

        <el-table-column prop="videoid" label="讲义ID" min-width="100"  fixed>
        </el-table-column>
        <el-table-column prop="classname" label="讲义名称" min-width="200">
        </el-table-column>
        <el-table-column prop="duration" label="大小" min-width="100">
        </el-table-column>
        <el-table-column prop="project" label="项目" min-width="110">
        </el-table-column>
        <el-table-column prop="type" label="类型" min-width="110">
        </el-table-column>
        <!--<el-table-column prop="num" label="引用数" min-width="110">
        </el-table-column>-->
        <el-table-column prop="updatetime" label="更新时间" min-width="150">
        </el-table-column>
        <el-table-column prop="dong" label="操作员" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" min-width="240">
          <template scope="scope">
            <el-button type="text" v-if="unlocking('HANDOUT_PREVIEW')">预览</el-button>
            <el-button type="text" v-if="unlocking('HANDOUT_EDIT')">修改</el-button>
            <el-button type="text" v-if="unlocking('HANDOUT_DELETE')">删除</el-button>
            <el-button type="text" v-if="unlocking('HANDOUT_STATISTICS')">使用统计</el-button>
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
        selectvalue: '全部讲义类型', //下拉搜索所选择的的网课类型
        options: [
          {
            value: '',
            label: '全部讲义类型'
          }, {
            value:'0',
            label:'1啊讲义',
          },{
            value:'1',
            label:'2讲义',
          }
        ],     //下拉搜索的网课类型列表
        videoList:[{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '1MB',
          type: 'PDF',
          project: 'ACCA',
          num: '12',
          dong:'Alan',
          updatetime: '2017-10-21 09:57'
        },{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '3MB',
          type: 'PDF',
          project: 'ACCA',
          num: '12',
          dong:'Alan',
          updatetime: '2017-10-21 09:57'
        },{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '2MB',
          type: 'PDF',
          project: 'ACCA',
          num: '12',
          dong:'Alan',
          updatetime: '2017-10-21 09:57'
        }],
        clver:"0",
        clversm:"0",
        tablist:[{
          id:"12",
          name:"CFA"
        },{
          id:"123",
          name:"ACCA"
        }],
      }
    },
    methods: {
      outlinechange(reid){
        this.clver = reid;
      },
    },
    computed: {},
    mounted() {

    },
    created() {

    }
  }
</script>