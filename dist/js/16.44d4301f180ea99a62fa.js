webpackJsonp([16],{"I+KM":function(e,t){},baAQ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("lC5x"),n=i.n(a),s=i("J0Oq"),r=i.n(s),o={components:{},props:[],data:function(){return{id:"",video_id:"",title:""}},methods:{initData:function(){var e=this;return r()(n.a.mark(function t(){var i,a;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.getOneResource(e.$route.params.id);case 2:i=t.sent;try{0==i.status&&(a=i.result.resource,e.title=a.title,e.video_id=a.video_id,e.video_id?e.palyVideo(e.video_id):e.$message({message:"无视频播放地址"}))}catch(e){console.log(e)}case 4:case"end":return t.stop()}},t,e)}))()},palyVideo:function(e){void 0!=window.GDVideoPlayerLoaded&&(window.GDVideoPlayerLoaded=void 0),1===e.split("-").length&&(e+="-3"),this.video_id=e;var t=document.createElement("script");t.type="text/javascript",t.src="//s.gaodun.com/web/static-player/loader.js?"+this.video_id,document.getElementById("videoPlay").appendChild(t)}},created:function(){var e=this;return r()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.id=e.$route.params.id,e.initData();case 2:case"end":return t.stop()}},t,e)}))()}},d={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"module-edu-content"},[t("div",{staticClass:"outlineeat"},[this._v("\n        预览视频：【视频资源ID："+this._s(this.id)+"】"+this._s(this.title)+"\n    ")]),this._v(" "),t("div",{staticClass:"video-content clear"},[t("div",{ref:"videoPlay",staticClass:"videoPlay",attrs:{id:"videoPlay"}})])])},staticRenderFns:[]};var c=i("Z0/y")(o,d,!1,function(e){i("I+KM")},"data-v-7e6abf56",null);t.default=c.exports}});
//# sourceMappingURL=16.44d4301f180ea99a62fa.js.map