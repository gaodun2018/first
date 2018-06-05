import {
  KNOWLEDGE_DIALOG,
  TAGS_LIST
} from '../mutation-types';
import {
  getTags
} from '../../api/resource.js'
const state = {
  bKnowledge: false, //
  tagsList: [], //标签列表
};
// 方法调用逻辑
const actions = {
  //更新项目科目列表
  changeDialog({
    commit,
    state
  }, bool) {
    commit(KNOWLEDGE_DIALOG, bool);
  },
  // 获取标签列表
  getTagsList({
    commit,
    state
  }, params) {
    return new Promise(function (resolve, reject) {
      if (state.tagsList == undefined || state.tagsList == null || state.tagsList.length === 0) {
        getTags(params).then((result) => {
          try {
            if (result.status === 0) {
              let list = result.result;
              commit(TAGS_LIST, list);
              //成功后调用
              resolve(result);
            }
          } catch (error) {
            console.log(error);
            //失败后调用
            reject(err);
          }
        }).catch((err) => {
          console.log(err);
          //失败后调用
          reject(err);
        });
      } else {
        resolve({
          'status': 0
        });
      }
    });
  },
};
// 逻辑代码
const mutations = {
  [KNOWLEDGE_DIALOG](state, bool) {
    state.bKnowledge = bool;
  },
  [TAGS_LIST](state, data) {
    state.tagsList = data;
  },
};
export default {
  state,
  actions,
  mutations
}
