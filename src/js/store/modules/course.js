import {COURSE_COVER} from '../mutation-types';
const state = {
  course_cover: "",   //课程封面
  course_default_cover: "",   //课程默认封面
};
const getters = {}
// 方法调用逻辑
const actions = {
  //保存课程封面
  changeCover({commit, state}, data){
    commit(COURSE_COVER, data);
  },
};
// 逻辑代码
const mutations = {
  [COURSE_COVER](state, data) {
    state.course_cover = data.cover;
    state.course_default_cover = data.cover_default?data.cover_default:state.course_default_cover;
  },
};
export default {
  state,
  getters,
  actions,
  mutations
}