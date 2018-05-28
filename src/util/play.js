
 function on_cc_player_init(vid, objectId ){
     var config = {};
     //关闭右侧菜单
     config.rightmenu_enable = 0;
     config.on_player_stop = "on_spark_player_stop";
     player = getSWF(objectId);
     player.setConfig(config);
 }
 
 function getSWF(objectId) {
    if (window.document[ objectId ]) {
         return window.document[ objectId ];
     } else if (navigator.appName.indexOf("Microsoft") == -1) {
         if (document.embeds && document.embeds[ objectId ]) {
             return document.embeds[ objectId ];
         }
     } else {
         return document.getElementById( objectId );
     }
 }
 
 //获取视频播放时长
 function getVideoTime() {
 	var player = VideoPlayer.getVideoPlayer();
 	return player.getPosition();
 }
 
 
 var VideoPlayer = {
 
 	// Player types.
 	TYPE_BOKECC : 1,
 	TYPE_FLASH  : 2,
 	TYPE_HTML5  : 3,
 
 	newInstance : function(obj) {
 		// Check the argument.
 		if (obj === undefined || obj === null) {
 			return null;
 		}
 		
 		// Initiate an empty instance.
 		var instance = {};
 
 		// Save the external video player.
 
 		instance.player = obj;
 
 		// Check its type via its ID.
 		var pgid = instance.player.id;
 
 		if (pgid === undefined || pgid == "") {
 			// The ID attribute of the video tag is usually undefined.
 			instance.type = VideoPlayer.TYPE_HTML5;
 		}
 		else if (pgid.indexOf("videoPlayer_") !== -1) {
 			// The ID attribute of the Flash video player should begins with "videoPlayer_" always.
 			instance.type = VideoPlayer.TYPE_FLASH;
 		}
 		else {
 			// Then we consider it as a bokecc (Flash) video player.
 
 			instance.type = VideoPlayer.TYPE_BOKECC;
 		}
 
 		// Player methods.
 		instance.start = function() {
 			switch (instance.type) {
 				case VideoPlayer.TYPE_BOKECC :
 					instance.player.start();
 					break;
 				case VideoPlayer.TYPE_FLASH :
 					instance.player.play2();
 					break;
 				case VideoPlayer.TYPE_HTML5 :
 					instance.player.play();
 					break;
 			}
 		};
 		instance.pause = function() {
 			instance.player.pause();
 		};
 		instance.resume = function() {
 			switch (instance.type) {
 				case VideoPlayer.TYPE_BOKECC :
 					instance.player.resume();
 					break;
 				case VideoPlayer.TYPE_FLASH :
 					instance.player.play2();
 					break;
 				case VideoPlayer.TYPE_HTML5 :
 					instance.player.play();
 					break;
 			}
 		};
 		instance.seek = function(time) {
 			switch (instance.type) {
 				case VideoPlayer.TYPE_BOKECC :
 					instance.player.seek(time);
 					break;
 				case VideoPlayer.TYPE_FLASH :
 					instance.player.seek(time);
 					break;
 				case VideoPlayer.TYPE_HTML5 :
 					instance.player.currentTime = time;
 					break;
 			}
 		};
 		instance.getDuration = function() {
 			switch (instance.type) {
 				case VideoPlayer.TYPE_BOKECC :
 					return instance.player.getDuration();
 				case VideoPlayer.TYPE_FLASH :
 					return instance.player.getDuration();
 				case VideoPlayer.TYPE_HTML5 :
 					return instance.player.duration;
 			}
 		};
 		instance.getPosition = function() {
 			switch (instance.type) {
 				case VideoPlayer.TYPE_BOKECC :
 					var bckeccid = getSWF(pgid);
 					return bckeccid.getPosition();
 				case VideoPlayer.TYPE_FLASH :
 					return instance.player.getCurrentTime();
 				case VideoPlayer.TYPE_HTML5 :
 					return instance.player.currentTime;
 			}
 		};
        instance.autoPlay = function(Func,data) {
            switch (instance.type) {
                case VideoPlayer.TYPE_BOKECC :
                    instance.player.start();
                    break;
                case VideoPlayer.TYPE_FLASH :
                    instance.player.play2();
                    break;
                case VideoPlayer.TYPE_HTML5 :
                    instance.player.click();
                    break;
            }
        };
        instance.end = function(Func,data) {
            switch (instance.type) {
                /*  case VideoPlayer.TYPE_BOKECC :
                      var bckeccid = getSWF(pgid);
                      return bckeccid.getPosition();*/
                /*case VideoPlayer.TYPE_FLASH :
                    return instance.player.Playing + '' + instance.player.ReadyState;*/
                case VideoPlayer.TYPE_HTML5 :
                    instance.player.onended = Func(data);
                    return;
            }
        };
 
 		return instance;
 	},
 
 	getVideoPlayer : function() {
 		// Get a Flash object.
        var videoPlay = document.getElementById('videoPlay');
 		var players = videoPlay.getElementsByTagName('object');
 		if (players[0] === undefined) {
 			// If the HTML5 video player is used, get the video tags instead.
 			players = videoPlay.getElementsByTagName('video');
 		}
 		if(typeof(players)!="undefined"){
 			return VideoPlayer.newInstance(players[0]);
 		}else{
 			return false;
 		}
 	}
 };

export default VideoPlayer;
