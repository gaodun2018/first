import { GET_SourceDetails_DATA ,UPDATE_CURRENT_SourceDetails} from '../mutation-types';
import { GetSourceDetailsTree, updateSourceDetailsNodeName, addSourceDetailsNode, deleteSourceDetailsNode } from '../../api/SourceDetails';
import { Message } from 'element-ui';
const state = {
	treeData:[],
    currentNode:{
        DetailName:'',
        DetailCode:'',
		id:null,
        Flag: 1		// 0: 保存，1: 新增
    },
};
const getters = {

}
// 方法调用逻辑
const actions = {
    /**
     * 初始化来源详情数据
     * @param commit { Function }
     */
	async loadTreeData({ commit }) { 
        let ret = await GetSourceDetailsTree(); 
        if(ret.status === 0){
            commit(GET_SourceDetails_DATA,ret.result);
        }
	},
    /**
     * 更新当前选中节点值
     * @param commit
     * @param obj { Object } 节点信息
     */
	updateCurrentNode({commit},obj){       
        commit(UPDATE_CURRENT_SourceDetails,obj);
	},
	// 修改选中的节点名称
	async updateSourceDetailsName({state,dispatch}){        
		if(state.currentNode.DetailName === ''){ 
			return;
        };          
		// 选中的保存
		if(state.currentNode.Flag === 0){
            let ret = await updateSourceDetailsNodeName(state.currentNode);
            let opts = ret.status === 0 ? {
                type:'success',
                message:'修改成功！'
            }: {
                type:'warning',
                message:ret.info
            }
            Message(opts);
            dispatch('loadTreeData');
		}else{
            let ret = await addSourceDetailsNode({
                DetailName: state.currentNode.DetailName,
                DetailCode:'',
                ParentId: state.currentNode.id
            });
            let opts = ret.status === 0 ? {
                type:'success',
                message:'新增成功！'
            }: {
                type:'warning',
                message:ret.info
            }
            Message(opts);
            dispatch('loadTreeData');
		}

	},
    /**
     * 删除节点
     * @param dispatch
     * @param id
     */
	deleteSourceDetailsNode({dispatch },id){
        deleteSourceDetailsNode(id).then(ret => {
            let opts = ret.status === 0 ? {
                type:'success',
                message:'删除成功！'
            }: {
                type:'warning',
                message:ret.info
            }
            Message(opts);
            dispatch('loadTreeData');
        });
	}
};
// 逻辑代码
const mutations = {
	[GET_SourceDetails_DATA](state, result) {
	    state.treeData = result;
	},
    [UPDATE_CURRENT_SourceDetails](state,obj) {
		Object.assign(state.currentNode,obj)
    }
};
export default {
	state,
	getters,
	actions,
	mutations
}