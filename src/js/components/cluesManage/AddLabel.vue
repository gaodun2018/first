<template>
	<div style="margin-top: 10px">
		<div class="clues-distribution">
			<span style="font-size: 14px;float: left;padding-right: 5px">标签:</span>
			<Tree style="display: inline-block;" :width="'335px'" placeholder="请选择标签" :data="labelData" :onCheck="labelTree"></Tree>
			<el-button style="width: 70px; height: 30px; vertical-align: top; background: #42aedf; border: 0" size="small" type="primary" @click="onAdd">添加</el-button>			
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
// import Tree from '../../containers/Tree.vue';
import Tree from '../../plugins/tree/ExtendZTree.vue';
import { SetClueLabel,GetClueLabelList, GetLabelList } from '../../api/cluesManage.js';
export default {
	props: ['self', 'modal'],
	components: { Tree },
	data() {
		return {
			getLabelIds: [],
			labelData: []
		};
	},
	methods: {
		labelTree(val) { 
            this.getLabelIds = val;
		},
		onAdd() { // 线索分配		
			if (this.getLabelIds.length === 0) {
				this.self.$message({
					message: '请选择关联标签',
					type: 'warning'
				});
				return;
            } 
            const params = {
				ClueGuidList: this.self.$store.state.cluesManage.getDistributionGuid,
				LabelIdList: this.getLabelIds
			}
			SetClueLabel(params).then(ret => {
                    if (ret.status === 0) {
                        this.self.$message({
                            message: '标签关联成功',
                            type: 'success'
                        });
						this.modal.close();
						if(this.self.objParams.where){
							this.self.getCluleDataList(this.self.objParams);
							this.self.paginationCount(this.self.objParams);
						}else{
							this.self.getCluleDataList();
							this.self.paginationCount();
						}
                        
                    }
                }).catch(() => {
			});
		},
	},
	mounted() {
        document.body.querySelector('.mint-msgbox-content').style.overflow = '-webkit-paged-x';
    },
    created() {
		GetLabelList().then(ret => { // 标签接口
            if (ret.status === 0) {
                this.labelData = ret.result;
            }
        });
    }
};
</script>