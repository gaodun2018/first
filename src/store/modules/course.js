import {COURSE_INFO,COURSE_SYLLABUSES,COURSE_COVER,RESOURCE_INTRO,RESOURCE_UPDATE,DRADATION_LIST} from '../mutation-types';
const state = {
  course_info:'',    //课程的所有信息
  course_Syllabuses:'',    //课程下的大纲
  course_cover: "",   //课程封面
  course_default_cover: "",   //课程默认封面
  resource_intro:[],   //所有资源介绍的信息
  resource_intro_id:[],   //所有资源介绍的id
  course_update_ids:[],   //修改的资源介绍的id
  course_update_titles:[],   //修改的资源介绍的标题
  course_update_contents:[],   //修改的资源介绍的内容
  course_daration_list:[],  //课程下阶段列表
};
const getters = {}
// 方法调用逻辑
const actions = {
  //保存课程的所有信息
  saveCourseInfo({commit, state}, data){
    commit(COURSE_INFO, data);
  },
  //保存课程下的大纲
  saveCourseSyllabuses({commit, state}, data){
    commit(COURSE_SYLLABUSES, data);
  },
  //保存课程封面
  changeCover({commit, state}, data){
    commit(COURSE_COVER, data);
  },
  //保存资源介绍的信息
  saveResourceIntro({commit, state}, data){
    commit(RESOURCE_INTRO, data);
  },
  //新增资源介绍的信息
  addResourceIntro({commit, state}, data){
    //data 是一个对象
    let resourceData = [...state.resource_intro];
    resourceData.push(data)
    commit(RESOURCE_INTRO, resourceData);
  },
  //删除资源介绍的信息
  deleteResourceIntro({commit, state}, index){
    let resourceData = [...state.resource_intro];
    resourceData.splice(index, 1)
    commit(RESOURCE_INTRO, resourceData);
  },
  //修改资源介绍的信息
  changeResourceIntro({commit, state}, data){
    let resourceData = [...state.resource_intro];
    resourceData[data.index].title = data.title;
    resourceData[data.index].content = data.content;
    commit(RESOURCE_INTRO, resourceData);
    commit(RESOURCE_UPDATE, data);
  },
  // 课程下所有阶段列表
  getDradationList({commit, state}, data){
    commit(DRADATION_LIST, data);
  },
};
// 逻辑代码
const mutations = {
  [COURSE_INFO](state, data) {
    state.course_info = data;
  },
  [COURSE_SYLLABUSES](state, data) {
    state.course_Syllabuses = data;
  },
  [COURSE_COVER](state, data) {
    state.course_cover = data.cover;
    state.course_default_cover = data.cover_default?data.cover_default:state.course_default_cover;
  },
  [RESOURCE_INTRO](state, data) {
    let resource_intro_id = []
    for(var i = 0;i < data.length; i++){
      resource_intro_id.push(data[i].id)
    }
    state.resource_intro = data;
    state.resource_intro_id = resource_intro_id;
    console.log(state.resource_intro_id);
  },
  [RESOURCE_UPDATE](state, data) {
    let ids = state.course_update_ids;
    if(ids.length == 0){
      state.course_update_ids.push(data.id);
      state.course_update_titles.push(data.title);
      state.course_update_contents.push(data.content);
    }else{
      for(var i = 0;i < ids.length; i++){
        if(data.id == ids[i]){
          //说明此次已经修改过了
          state.course_update_ids[i] = data.id;
          state.course_update_titles[i] = data.title;
          state.course_update_contents[i] = data.content;
        }else{
          state.course_update_ids.push(data.id);
          state.course_update_titles.push(data.title);
          state.course_update_contents.push(data.content);
        }
      }
    }

    console.log(state.course_update_ids,state.course_update_titles,state.course_update_contents);

  },
  [DRADATION_LIST](state,data){
    state.course_daration_list = data;
  }
};
export default {
  state,
  getters,
  actions,
  mutations
}
