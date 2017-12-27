import {
    CALL_RING
} from '../mutation-types';
const state = {
    RecordId: 0 // 电话信息
}
const getters = {}
// 方法调用逻辑
const actions = {
    setCallInfo({ commit, state }, data) { // 电话呼入信息
        commit(CALL_RING, data);
    },
};
// 逻辑代码
const mutations = {
    [CALL_RING](state, recordId) { // 电话呼入信息 
        if (!recordId) {
            state.RecordId = 0;
            return;
        }
        state.RecordId = recordId;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}