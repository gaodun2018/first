<template>
    <div>
      <el-row style="margin-bottom: 40px;">
        <el-tabs>
          <el-tab-pane label="待办事宜">
            <el-col :sm="8">
              <el-card class="box-card_1" :body-style="{ padding: '6px 0 0' }">
                <div slot="header" class="clearfix">
                  <span style="line-height: 20px;">答疑</span>
                </div>
                <div class="text_item text_item1">
                  <span class="text_item1_num">23</span>个
                </div>
              </el-card>
            </el-col>
            <el-col :sm="8">
              <el-card class="box-card_2" :body-style="{ padding: '15px 0 0 32px' }">
                <div slot="header" class="clearfix">
                  <span style="line-height: 20px;">上课</span>
                </div>
                <div class="text_item text_item2">
                  2017-12-24  财务会计直播
                </div>
              </el-card>
            </el-col>
            <el-col :sm="8">
              <el-card class="box-card_3" :body-style="{ padding: '14px 0 0 36px' }">
                <div slot="header" class="clearfix">
                  <span style="line-height: 20px;">学习跟进</span>
                </div>
                <div class="text_item text_item3">
                  学员-是小明，连续缺勤2天
                </div>
              </el-card>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <el-row>
        <el-tabs>
          <el-tab-pane label="快捷操作">
            <div>
              <el-button size="small">创建课程</el-button>
              <el-button size="small">上传视频</el-button>
              <el-button size="small">上传讲义</el-button>
              <el-button size="small">编辑题目</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {}
    },
}
</script>

