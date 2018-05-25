<template>
  <div class="module-edu-content">
    <div class="outlineeat">
      课中交互：【视频资源ID：{{id}}】{{title}}
    </div>
    <div class="video-content clear">
      <div id="videoPlay" class="videoPlay" ref="videoPlay"></div>
    </div>
    <el-row class="flag-btn-box">
      <el-button type="primary" @click="handleFlag" round>标记为重要节点</el-button>
    </el-row>
    <el-row>
      <el-table ref="table" border :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column prop="title" align="center" label="重要节点时间点" width="200">
        </el-table-column>
        <el-table-column prop="project_name" align="center" label="重要节点名称">
        </el-table-column>
        <el-table-column prop="updated_at" align="center" label="课中练习（题目ID）" width="320">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="didClickEdit(scope)">修改
            </el-button>
            <el-button type="text" @click="onRemove(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="新增一个重要节点" center class="tabplane" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" ref="ruleForm" label-width="140px">
        <el-form-item label="时间点" required>
          <el-col :span="7">
            <el-form-item prop="hour">
              <el-input @change="handleInputChange" class="coursetxt" v-model="ruleForm.hour"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">时</el-col>
          <el-col :span="7">
            <el-form-item prop="minute">
              <el-input @change="handleInputChange" class="coursetxt" v-model="ruleForm.minute"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">分</el-col>
          <el-col :span="7">
            <el-form-item prop="second">
              <el-input @change="handleInputChange" class="coursetxt" v-model="ruleForm.second"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">秒</el-col>
        </el-form-item>
        <el-form-item label="节点名称" prop="title" :rules="filter_rules({required:true,type:'isAllSpace',maxLength:100})">
          <el-input class="coursetxt" placeholder="请输入节点名称" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="课中练习（选填 ）" prop="timu" :rules="filter_rules({type:'isAllSpace'})">
          <el-input class="coursetxt" placeholder="请输入题目，多道题目请用英文逗号隔开" v-model="ruleForm.timu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <!-- <el-button type="primary" :loading="btnLoading" @click="submitForm('ruleForm')">{{btnLoading?'保存中':'确 定'}} -->
        <!-- </el-button> -->
        <!-- <el-button @click="resetForm('ruleForm')">取 消</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import VideoPlayer from "../../../util/play.js";
import { secondToDate } from "../../../util/util.js";
console.log(VideoPlayer);
export default {
  components: {},
  props: [],
  data() {
    return {
      id: "", //视频id
      video_id: "", //视频地址
      title: "", //视频名称
      tableData: [],
      videoPlayer: null,
      dialogFormVisible: false,
      ruleForm: {
        hour: "",
        minute: "",
        second: "",
        title: "",
        timu:''
      },
      openTime:{
        h:'',
        h:'',
        h:'',
      },
      duration: 0 //时间总时常
    };
  },
  methods: {
    handleInputChange(v) {
      this.checkVideoTime();
    },
    // 校验时间
    checkVideoTime() {
      let aTime =
        parseInt(this.ruleForm.hour) * 60 * 60 +
        parseInt(this.ruleForm.minute) * 60 +
        parseInt(this.ruleForm.second);
      console.log(aTime);
      if (aTime > this.duration) {
        this.$message({
          message: "设置时间节点已超过视频总时长，请重新设置！",
          type:'warning',
        });
        this.ruleForm.hour = this.openTime.h;
        this.ruleForm.minute = this.openTime.m;
        this.ruleForm.second = this.openTime.s;
        return false;
      } else {
        return true;
      }
    },
    //打标记
    handleFlag() {
      this.videoPlayer = VideoPlayer.getVideoPlayer(); //获取播放器
      console.log(this.videoPlayer);
      if (!this.videoPlayer) {
        return this.$message({
          message: "请确认视频是否正常播放！"
        });
      }
      this.videoPlayer.pause(); //暂停
      let timer = this.videoPlayer.getPosition(); //当前时间
      this.duration = this.videoPlayer.getDuration(); //总时间
      const { h, m, s } = secondToDate(parseInt(timer));
      this.ruleForm.hour = h;
      this.ruleForm.minute = m;
      this.ruleForm.second = s;
      this.openTime.h = h;
      this.openTime.m = m;
      this.openTime.s = s;
      console.log(this.duration, timer, h, m, s);
      this.dialogFormVisible = true;
    },
    async initData() {
      let ret = await this.$http.getOneResource(this.$route.params.id);
      try {
        if (ret.status == 0) {
          let data = ret.result.resource;
          this.title = data.title;
          this.video_id = data.video_id;
          if (this.video_id) {
            this.palyVideo(this.video_id);
          } else {
            this.$message({
              message: "无视频播放地址"
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    palyVideo(video_id) {
      if (window.GDVideoPlayerLoaded != undefined) {
        window.GDVideoPlayerLoaded = undefined;
      }
      let params = video_id.split("-");
      if (params.length === 1) {
        video_id = video_id + "-3";
      }
      this.video_id = video_id; //视频id
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//s.gaodun.com/web/static-player/loader.js?${
        this.video_id
      }`;
      document.getElementById("videoPlay").appendChild(script);
    }
  },
  async created() {
    this.id = this.$route.params.id;
    this.initData();
  }
};
</script>
<style lang="less" scoped>
.outlineeat {
  margin-bottom: 20px;
}
.video-content {
  width: 100%;
  height: 500px;
  .videoPlay {
    width: 100%;
    height: 100%;
  }
}
.flag-btn-box {
  text-align: right;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 40px;
}
</style>

