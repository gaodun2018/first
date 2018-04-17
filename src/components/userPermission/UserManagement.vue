<template>
  <div class="module-edu-content permission-manage">
    <!--<el-row class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>讲义管理</el-breadcrumb-item>
        <el-breadcrumb-item>讲义列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->

    <div class="search_tools" style="overflow: hidden;margin-bottom: 22px;">
      <el-row>
        <el-col :sm="12">
          <div class="button_group_t">
            <span> 分 类:</span>
            <el-radio-group v-model="radio">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="ACCA"></el-radio-button>
              <el-radio-button label="ACCB"></el-radio-button>
              <el-radio-button label="ACCD"></el-radio-button>
            </el-radio-group>
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
        <el-col :sm="12" style="margin-top: 34px;">
          <el-row type="flex" justify="end">
            <div class="input-search">
              <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input2" :on-icon-click="handleIconClick"></el-input>
              <el-button type="primary" size="small">导入用户</el-button>
              <el-button type="primary" size="small">新建用户</el-button>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="edu_table">
      <el-table ref="multipleTable" border v-loading="loading" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="videoList" style="width: 100%">
                                                                                                                                                                    操作
        <el-table-column prop="userid" label="用户id" min-width="110">
        </el-table-column>
        <el-table-column prop="username" label="用户名" min-width="160">
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="240">
        </el-table-column>
        <el-table-column prop="createtime" label="创建时间" min-width="180">
        </el-table-column>
        <el-table-column label="操作" min-width="175">
          <template scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">授权</el-button>
            <el-button type="text">更多</el-button>
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
.permission-manage .edu_table .el-table .el-table__header-wrapper tr th:nth-child(5),
.permission-manage .edu_table .el-table .el-table__body-wrapper tr td:nth-child(5){
  text-align: center;
}
.permission-manage .edu_table .el-table .el-table__body-wrapper tr td:nth-child(5) .el-button{
  margin: 0 10px;
}
.permission-manage .search_tools .input-search .el-button {
  background: #fff;
  color: #26a1ff;
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
          userid: '123',
          username: 'sunny',
          remark: '2017-12-02   12:52',
          createtime: '2017-12-02   12:52'
        },{
          userid: '123',
          username: 'sunny',
          remark: '2017-12-02   12:52',
          createtime: '2017-12-02   12:52'
        },{
          userid: '123',
          username: 'sunny',
          remark: '2017-12-02   12:52',
          createtime: '2017-12-02   12:52'
        },
        ],
      }
    },
    methods: {},
    computed: {},
    mounted() {

    },
    created() {

    }
  }
</script>