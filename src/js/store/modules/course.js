import {PROJECTLIST} from '../mutation-types';
const state = {
  projectList: [],   //项目科目列表
};
const getters = {}
// 方法调用逻辑
const actions = {
  //更新项目科目列表
  updateProjectList({commit, state}, data){
    commit(PROJECTLIST, data);
  },
};
// 逻辑代码
const mutations = {
  [PROJECTLIST](state, data) {
    state.projectList = data;
  },
};
export default {
  state,
  getters,
  actions,
  mutations
}