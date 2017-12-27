import {
    CALL_IN_CLUES
} from '../mutation-types';
const state = {
    getCallInClues: {}, // 获取线索id
}
const getters = {}
    // 方法调用逻辑
const actions = {
    getCallInClues({ commit, state, dispatch }, data) { // 电话呼入信息
        commit(CALL_IN_CLUES, data);
    },
};
// 逻辑代码
const mutations = {
    [CALL_IN_CLUES](state, clues) { // 电话呼入信息 
        state.getCallInClues = clues;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}