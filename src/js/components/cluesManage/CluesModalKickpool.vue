<template>
	<div style="font-size:14px;margin-top: 10px">
		<div class="clues-kickpool">
			<span style="font-size: 14px;margin-right: 10px">踢回公池:</span>
			<el-cascader size="small" v-model="getSources" :options="getUserTree" clearable :props="channelsProps" :show-all-levels="false" @change="onKickpoll" style="width: 81%;font-size: 12px"></el-cascader>
		</div>
		<div class="clues-kickpool-style" v-show="getSources[this.getSources.length-1]">
			<div class="kickpool-modal-icon">
				<span style="line-height: 25px">将
					<span style="color: #42aedf"></span> 
					{{this.self.$store.state.cluesManage.cluesSelectedNum}}条线索踢回
					<span style="color: #42aedf">【
				<span>{{kickText}}</span>】</span>踢回将无法恢复，是否确认？</span>
			</div>
		</div>
	</div>
</template>
<style>

</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { Distribute, GetAllowedUserTree,GetPublicPoolUser, getchannels } from '../../api/cluesManage.js';

export default {
	props: ['self'],
	data() {
		return {
			getSources: [],
			getUserTree: [],
			kickText: '',
			channelsProps: {
				value: 'Id',
				label: 'Name',
				children: 'ChildrenList'
			},
			isKIckpoll: false
		}
	},
	methods: {
		async onKickpoll() {
			const sources = this.getSources[this.getSources.length-1];
			this.self.$store.dispatch('getTkickPool', sources);
			if (sources) {
				this.isKIckpoll = true;	
			}
			setTimeout(()=> {
				const kickpool = document.querySelector('.clues-kickpool');
				this.kickText = kickpool.querySelector('.el-cascader__label').innerText;
			},50);
		}
	},
	mounted() {
		GetPublicPoolUser().then(ret => {
			if (ret.status === 0) {
				this.getUserTree = ret.result;
			}
		})
	},
};
</script>