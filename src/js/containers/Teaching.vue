<template>
  <div class="module-teaching-content teaching-manage-style">
   <!-- <el-row class="breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/index' }">班级管理</el-breadcrumb-item>
        <el-breadcrumb-item>课程管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>-->

    <div class="course">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="课程列表" name="first">
            <el-row class="btn_items">
              <el-button class="btn_new" type="primary" size="small">新建课程</el-button>
              <el-button class="btn_excel" size="small">Excel导入课程／资源</el-button>
            </el-row>
            <el-row>
              <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="classid" label="班级id" min-width="125">
                </el-table-column>
                <el-table-column prop="classname" label="班级名称" min-width="150">
                </el-table-column>
                <el-table-column prop="time" label="下节课时间" min-width="160">
                </el-table-column>
                <el-table-column prop="course" label="课程详情" min-width="200">
                </el-table-column>
                <el-table-column prop="student" label="学员" min-width="120">
                </el-table-column>
                <el-table-column prop="teacher" label="老师" min-width="120">
                </el-table-column>
                <el-table-column prop="platform" label="平台" min-width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="240">
                  <template scope="scope">
                    <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                    <el-button type="text" size="small">编辑课件</el-button>
                    <el-button type="text" size="small">上课</el-button>
                    <el-button type="text" size="small">下课</el-button>
                    <el-button type="text" size="small">修改</el-button>
                    <el-button type="text" size="small">更多</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-dialog class="addVideo" title="添加视频" :visible.sync="dialogVideoVisible">
              <div>
                <el-steps :space="100" :active="active">
                  <el-step title="选择视频"></el-step>
                  <el-step title="信息配置"></el-step>
                </el-steps>
                <div class="chooseVideo" v-show="active == 1">
                  <div class="chooseVideo_t">

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
                          <div class="button_group_b">
                            <span> 类 型:</span>
                            <el-radio-group v-model="radio2">
                              <el-radio-button label="全部"></el-radio-button>
                              <el-radio-button label="BCCA"></el-radio-button>
                              <el-radio-button label="BCCB"></el-radio-button>
                              <el-radio-button label="BCCD"></el-radio-button>
                            </el-radio-group>
                          </div>
                        </el-col>
                        <el-col :sm="12" style="margin-top: 34px;">
                          <el-row type="flex" justify="end">
                            <div class="input-search">
                              <el-input placeholder="课程ID／课程名称" size="small" icon="search" v-model="input1" :on-icon-click="handleIconClick"></el-input>
                              <!--<el-button type="primary" size="small">新建讲义</el-button>-->
                            </div>
                          </el-row>
                        </el-col>
                      </el-row>
                    </div>

                  </div>
                  <div class="chooseVideo_b">
                    <el-table :data="tableData4" border style="width: 100%" max-height="220">
                      <el-table-column fixed prop="videoid" label="视频id" min-width="120">
                      </el-table-column>
                      <el-table-column prop="videoname" label="视频名称" min-width="150">
                      </el-table-column>
                      <el-table-column prop="duration" label="时长" min-width="110">
                      </el-table-column>
                      <el-table-column prop="typek" label="类型" min-width="110">
                      </el-table-column>
                      <el-table-column prop="projectk" label="项目" min-width="120">
                      </el-table-column>
                      <el-table-column prop="num" label="引用数" min-width="110">
                      </el-table-column>
                      <el-table-column prop="timek" label="更新时间" min-width="120">
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" min-width="100">
                        <template scope="scope">
                          <el-button @click.native.prevent="deleteRow(scope.$index, tableData4)" type="text" size="small">
                            预览
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="10"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="80">
                    </el-pagination>
                  </div>



                </div>

              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="next">下一步</el-button>
                <el-button type="primary" @click="dialogVideoVisible = false">保存</el-button>
              </div>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="老师列表" name="second">老师列表</el-tab-pane>
          <el-tab-pane label="学管列表" name="third">学管列表</el-tab-pane>
          <el-tab-pane label="学员列表" name="fourth">学员列表</el-tab-pane>
          <el-tab-pane label="班级统计" name="fifth">班级统计</el-tab-pane>
        </el-tabs>
      </div>

  </div>
</template>
<style>

</style>
<script>
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import {parseUrl} from 'base';


  export default {
    components: {},
    data() {
      return {
        activeName: 'first',
        tableData: [{
          classid: '123',
          classname: '基金从业一类线索',
          time: '2017-10-21  09:57',
          course: '123',
          student: '12',
          teacher: '12',
          platform: 'pinytai'
        }, {
          classid: '123',
          classname: '基金从业一类线索',
          time: '2017-10-21  09:57',
          course: '123',
          student: '12',
          teacher: '12',
          platform: 'pinytai'
        }, {
          classid: '123',
          classname: '基金从业一类线索',
          time: '2017-10-21  09:57',
          course: '123',
          student: '12',
          teacher: '12',
          platform: 'pinytai'
        }, {
          classid: '123',
          classname: '基金从业一类线索',
          time: '2017-10-21  09:57',
          course: '123',
          student: '12',
          teacher: '12',
          platform: 'pinytai'
        }],
        dialogVideoVisible: 'true',
        active: 1,
        radio: '全部',
        radio2: '全部',
        input2: '',
        currentPage4: 4
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      next() {
        if (this.active++ > 2) this.active = 0;
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    computed: {},
    created() {

    },
  }
</script>