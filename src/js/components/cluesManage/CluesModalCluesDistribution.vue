<template>
	<div v-loading="isLoading" style="margin-top: 10px">
		<div class="clues-distribution">
			<span style="font-size: 14px;float: left;padding-right: 5px">分配给:</span>
			<Tree style="display: inline-block;" :width="'335px'" placeholder="请选择分配人员" :data="createData" :onCheck="distributionTree"></Tree>
			<el-button style="width: 70px; height: 30px; vertical-align: top; background: #42aedf; border: 0" size="small" type="primary" @click="onDistribution">分配</el-button>			
		</div>
	</div>
</template>
<style>
	.clues-distribution .g-extend-ztree-area {
		position: relative;
	}
</style>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import { checkedUserTree } from '../../util/util';
import { CRM_USER_INFO } from '../../util/keys';
// import Tree from '../../containers/Tree.vue';
import Tree from '../../plugins/tree/ExtendZTree.vue';
import { Distribute, GetAllowedUserTree } from '../../api/cluesManage.js';
export default {
	props: ['self', 'modal'],
	components: { Tree },
	data() {
		return {
			getUserId: [],
			createData: [],
			isDistribute: false,
			isLoading:false
		};
	},
	methods: {
		distributionTree(val) { 
            this.getUserId = val;
		},
		onDistribution() { // 线索分配
			if (this.getUserId.length === 0) {
				this.self.$message({
					message: '请选择分配信息',
					type: 'warning'
				});
				return;
			} 
            const params = {
				CluesIds: this.self.$store.state.cluesManage.getDistributionGuid,
				UserIds: this.getUserId
			}
			this.isLoading=true;
			Distribute(params).then(ret => {
				this.isLoading=false;
				if (ret.status === 0) {
					this.self.$message({
						message: '线索分配成功',
						type: 'success'
					});
					this.isDistribute = true;
					this.modal.close();
				}
			}).catch(() => {
			});
		},
	},
	mounted() {
		document.body.querySelector('.mint-msgbox-content').style.overflow = '-webkit-paged-x';
	},
	created() {
		let userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
		GetAllowedUserTree({ userId: userInfo.UserId }).then(ret => { // 人员树接口
            if (ret.status === 0) {
                this.createData = ret.result;
            }
        });
	}
};
</script>