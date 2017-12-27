<template>
	<div class="la-ball-elastic-dots" v-if="loadingMsg.loading">
	    <div></div>
	    <div></div>
	    <div></div>
	    <div></div>
	</div>
	<div class="listEmpty"  v-else>
		<p>{{loadingMsg.title}}</p>
	</div>
</template>


<style scoped>
	.la-ball-elastic-dots,.la-ball-elastic-dots>div{position:relative;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}

	.la-ball-elastic-dots{display:block;position: absolute;left:50%;top:50%;margin:-10px 0 0 -120px;}
	.la-ball-elastic-dots>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}
	.la-ball-elastic-dots{width:240px;height:20px;font-size:0;text-align:center;}
	.la-ball-elastic-dots>div{display:inline-block;width:10px;height:10px;white-space:nowrap;border-radius:100%;-webkit-animation:ball-elastic-dots-anim 1s infinite;-moz-animation:ball-elastic-dots-anim 1s infinite;-o-animation:ball-elastic-dots-anim 1s infinite;animation:ball-elastic-dots-anim 1s infinite;background:#addbfd;}
	.la-ball-elastic-dots.la-sm{width:60px;height:8px}
	.la-ball-elastic-dots.la-sm>div{width:8px;height:8px}
	.la-ball-elastic-dots.la-2x{width:480px;height:40px}
	.la-ball-elastic-dots.la-2x>div{width:40px;height:40px}
	.la-ball-elastic-dots.la-3x{width:960px;height:60px}
	.la-ball-elastic-dots.la-3x>div{width:60px;height:60px}@-webkit-keyframes ball-elastic-dots-anim{0%,100%{margin:0;-webkit-transform:scale(1);transform:scale(1)}50%{margin:0 5%;-webkit-transform:scale(0.65);transform:scale(0.65)}}@-moz-keyframes ball-elastic-dots-anim{0%,100%{margin:0;-moz-transform:scale(1);transform:scale(1)}50%{margin:0 5%;-moz-transform:scale(0.65);transform:scale(0.65)}}@-o-keyframes ball-elastic-dots-anim{0%,100%{margin:0;-o-transform:scale(1);transform:scale(1)}50%{margin:0 5%;-o-transform:scale(0.65);transform:scale(0.65)}}@keyframes ball-elastic-dots-anim{0%,100%{margin:0;-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);transform:scale(1)}50%{margin:0 5%;-webkit-transform:scale(0.65);-moz-transform:scale(0.65);-o-transform:scale(0.65);transform:scale(0.65)}}
</style>

<script type="text/javascript">
	
	export default {
		props:['loadingMsg'],
	}
</script>