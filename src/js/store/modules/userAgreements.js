import { GET_ORDERINFO_BYCARDID } from '../mutation-types';
import { getOrderInfoByCardId} from '../../api/anonymous';
const state = {
    hasValid:false,
    cardOrderInfo:""
};
const getters = {

}
// 方法调用逻辑
const actions = {
    async getUserAgreementOrderInfo({commit},reqParm) {
        let ret = await getOrderInfoByCardId(reqParm);
        if(ret && ret.status === 0){
            commit(GET_ORDERINFO_BYCARDID,ret.result);
        }
    }
};
// 逻辑代码
const mutations = {
    /**
     * 更新当前一级菜单ID，二级菜单内容
     * @param state { Object }
     * @param ChildNavigations { Array } 二级菜单
     * @param NavigationId { Number } 一级菜单ID
     */
    [GET_ORDERINFO_BYCARDID](state,recult){
        state.hasValid=true;
        state.cardOrderInfo=result;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}