import {
  PROJECT_SUBJECT_LIST
} from '../mutation-types';
import {
  getProjectSubject
} from '../../api/course.js'
const state = {
  project_subject_list: [], //项目科目列表
};

// 方法调用逻辑
const actions = {
  //保存课程的所有信息
  getProjectSubjectList({
    commit,
    state
  }, data) {
    if (state.project_subject_list == undefined || state.project_subject_list == null || state.project_subject_list.length===0) {
      getProjectSubject().then((result) => {
        try {
          if (result.status === 0) {
            let list = result.result;
            commit(PROJECT_SUBJECT_LIST, list);
          }
        } catch (error) {
          console.log(error);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
const getters = {}
// 逻辑代码
const mutations = {
  [PROJECT_SUBJECT_LIST](state, data) {
    state.project_subject_list = data;
  }
};
export default {
  state,
  actions,
  getters,
  mutations
}
