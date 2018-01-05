import {KNOWLEDGE_DIALOG} from '../mutation-types';
const state = {
  bKnowledge: false,   //
};
const getters = {}
// 方法调用逻辑
const actions = {
  //更新项目科目列表
  changeDialog({commit, state}, bool){
    commit(KNOWLEDGE_DIALOG, bool);
  },
};
// 逻辑代码
const mutations = {
  [KNOWLEDGE_DIALOG](state, bool) {
    state.bKnowledge = bool;
  },
};
export default {
  state,
  getters,
  actions,
  mutations
}