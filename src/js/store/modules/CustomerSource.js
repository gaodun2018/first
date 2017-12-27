import { GET_CUSTOMERSCOURCE_DATA ,UPDATE_CURRENT_CUSTOMERSCOURCE} from '../mutation-types';
import { GetCustomerSourceTree, updateCustomerSourceNodeName, addCustomerSourceNode, deleteCustomerSourceNode } from '../../api/CustomerSource';
import { Message } from 'element-ui';
const state = {
	treeData:[],
    currentNode:{
        SourceName:'',
        SourceCode:'',
		id:null,
        Flag: 1		// 0: 保存，1: 新增
    },
};
const getters = {

}
// 方法调用逻辑
const actions = {
    /**
     * 初始化渠道数据
     * @param commit { Function }
     */
	async loadTreeData({ commit }) { 
        let ret = await GetCustomerSourceTree(); 
        if(ret.status === 0){
            commit(GET_CUSTOMERSCOURCE_DATA,ret.result);
        }
	},
    /**
     * 更新当前选中节点值
     * @param commit
     * @param obj { Object } 节点信息
     */
	updateCurrentNode({commit},obj){       
        commit(UPDATE_CURRENT_CUSTOMERSCOURCE,obj);
	},
	// 修改选中的节点名称
	async updateCustomerSourceName({state,dispatch}){        
		if(state.currentNode.SourceName === ''){ 
			return;
        };          
		// 选中的保存
		if(state.currentNode.Flag === 0){
            let ret = await updateCustomerSourceNodeName(state.currentNode);
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
            let ret = await addCustomerSourceNode({
                SourceName: state.currentNode.SourceName,
                SourceCode:'',
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
	deleteCustomerSourceNode({dispatch },id){
        deleteCustomerSourceNode(id).then(ret => {
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
	[GET_CUSTOMERSCOURCE_DATA](state, result) {
	    state.treeData = result;
	},
    [UPDATE_CURRENT_CUSTOMERSCOURCE](state,obj) {
		Object.assign(state.currentNode,obj)
    }
};
export default {
	state,
	getters,
	actions,
	mutations
}