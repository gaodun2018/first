webpackJsonp([24],{MAzk:function(e,t){},baAQ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Xxa5"),n=i.n(a),s=i("exGp"),r=i.n(s),d={components:{},props:[],data:function(){return{id:"",video_id:"",title:""}},methods:{initData:function(){var e=this;return r()(n.a.mark(function t(){var i,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:i=t.sent;try{0==i.status&&(a=i.result.resource,e.title=a.title,e.video_id=a.video_id,e.video_id?e.palyVideo(e.video_id):e.$message({message:"无视频播放地址"}))}catch(e){}case 4:case"end":return t.stop()}},t,e)}))()},palyVideo:function(e){void 0!=window.GDVideoPlayerLoaded&&(window.GDVideoPlayerLoaded=void 0),1===e.split("-").length&&(e+="-3"),this.video_id=e;var t=document.createElement("script");t.type="text/javascript",t.src="//s.gaodun.com/web/static-player/loader.js?"+this.video_id,document.getElementById("videoPlay").appendChild(t)}},created:function(){var e=this;return r()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.id=e.$route.params.id,e.initData();case 2:case"end":return t.stop()}},t,e)}))()}},o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"module-edu-content"},[t("div",{staticClass:"outlineeat"},[this._v("\n    预览视频：【视频资源ID："+this._s(this.id)+"】"+this._s(this.title)+"\n  ")]),this._v(" "),t("div",{staticClass:"video-content clear"},[t("div",{ref:"videoPlay",staticClass:"videoPlay",attrs:{id:"videoPlay"}})])])},staticRenderFns:[]};var c=i("VU/8")(d,o,!1,function(e){i("MAzk")},"data-v-60930e6a",null);t.default=c.exports}});
//# sourceMappingURL=24.dcd3bdd80ea5f80e9a63.js.map