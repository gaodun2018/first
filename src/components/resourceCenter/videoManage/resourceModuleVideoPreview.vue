<template>
  <div class="module-edu-content">
    <div class="outlineeat">
      预览视频：【视频资源ID：{{id}}】{{title}}
    </div>
    <div class="video-content clear">
      <div id="videoPlay" class="videoPlay" ref="videoPlay"></div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      id: "", //视频id
      video_id: "", //视频地址
      title: "" //视频名称
    };
  },
  methods: {
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
        // console.log(error);
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
</style>

