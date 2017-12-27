<template>
  <div class="module-clues-content order-manage">
    <!--<el-row class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>讲义管理</el-breadcrumb-item>
        <el-breadcrumb-item>讲义列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="24">
          <div class="button_group_t">
            <span> 分 类:</span>
            <span class="clitem" :class="[clver === '0'||clver === 0 ?'current':'']" @click="outlinechange('0')">全部</span>
            <template v-for="(rev,index) in tablist">
                <span class="clitem" :class="[rev.id === clver ?'current':'']" @click="outlinechange(rev.id)">{{rev.name}}</span>
            </template>
          </div>
          <!--<div class="button_group_b">
            <span> 类 型:</span>
            <el-radio-group v-model="radio2">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="BCCA"></el-radio-button>
              <el-radio-button label="BCCB"></el-radio-button>
              <el-radio-button label="BCCD"></el-radio-button>
            </el-radio-group>
          </div>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :sm="24" style="margin-top: 5px;">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
              <el-button type="primary" size="small">新建讲义</el-button>
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
        <el-table-column prop="project" label="项目" min-width="150">
        </el-table-column>
        <el-table-column prop="num" label="引用数" min-width="115">
        </el-table-column>
        <el-table-column prop="updatetime" label="更新时间" min-width="150">
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="155">
          <template scope="scope">
            <el-button type="text">预览</el-button>
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
  .order-manage-dislog .el-dialog--small {
    width: 30%;
  }

  .order-manage-dislog .el-dialog__body {
    padding: 20px
  }

  .roder-content-label .el-form-item {
    margin-bottom: 10px;
  }

  .order-search-form .el-form-item {
    margin-bottom: 10px;
  }

  .order-manage .cell-reset-padding {
    margin-right: -12px
  }

  .clues-bnt-item .tracking-text-font .el-form-item__label {
    padding: 11px 0 11px 0;
  }

  .el-dropdown {
    font-size: 12px;
    color: #20a0ff;
  }

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
        videoList:[{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '1MB',
          type: '课程录播',
          project: 'ACCA',
          num: '12',
          updatetime: '2017-10-21 09:57'
        },{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '3MB',
          type: '课程录播',
          project: 'ACCA',
          num: '12',
          updatetime: '2017-10-21 09:57'
        },{
          videoid: '123',
          classname: '基金从业一类线索',
          duration: '2MB',
          type: '课程录播',
          project: 'ACCA',
          num: '12',
          updatetime: '2017-10-21 09:57'
        }],
        clver:'0',
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