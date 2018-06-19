import {
  COURSE_INFO,
  COURSE_SYLLABUSES,
  COURSE_COVER,
  RESOURCE_INTRO,
  RESOURCE_UPDATE,
  DRADATION_LIST,
  COURSE_DISABLE,
  SEASON_LIST
} from '../mutation-types';
const state = {
  course_info: '', //课程的所有信息
  course_Syllabuses: '', //课程下的大纲
  course_cover: "", //课程封面
  course_default_cover: "", //课程默认封面
  resource_intro: [], //所有资源介绍的信息
  resource_intro_id: [], //所有资源介绍的id
  course_update_ids: [], //修改的资源介绍的id
  course_update_titles: [], //修改的资源介绍的标题
  course_update_contents: [], //修改的资源介绍的内容
  course_daration_list: [], //课程下阶段列表
  course_disable: {
    class_room_pk_open: 0,
    classroom_open: 0,
    course_syllabus_open: 0,
    course_teacher_open:0,//选老师
    exam_key_point_open: 0,
    exam_syllabus_id: 0,
    gaodun_course_id: 0,
    glive_open: 0,
    handout_download_open: 0,   //批量讲义
    knowledge_recommend_open: 0,
    knowledge_syllabus_open: 0,
    mock_gradation_open: 0,
    pre_gradation_open: 0,
    review_gradation_open: 0,
    season_manage_open: 0, //考季管理
    study_record_open: 0,
  },
  seaconList:[], //考季列表
};
const getters = {}
// 方法调用逻辑
const actions = {
  //保存课程的所有信息
  saveCourseInfo({
    commit,
    state
  }, data) {
    commit(COURSE_INFO, data);
  },
  //保存课程下的大纲
  saveCourseSyllabuses({
    commit,
    state
  }, data) {
    commit(COURSE_SYLLABUSES, data);
  },
  //保存课程封面
  changeCover({
    commit,
    state
  }, data) {
    commit(COURSE_COVER, data);
  },
  //保存资源介绍的信息
  saveResourceIntro({
    commit,
    state
  }, data) {
    commit(RESOURCE_INTRO, data);
  },
  //新增资源介绍的信息
  addResourceIntro({
    commit,
    state
  }, data) {
    //data 是一个对象
    let resourceData = [...state.resource_intro];
    resourceData.push(data)
    commit(RESOURCE_INTRO, resourceData);
  },
  //删除资源介绍的信息
  deleteResourceIntro({
    commit,
    state
  }, index) {
    let resourceData = [...state.resource_intro];
    resourceData.splice(index, 1)
    commit(RESOURCE_INTRO, resourceData);
  },
  //修改资源介绍的信息
  changeResourceIntro({
    commit,
    state
  }, data) {
    let resourceData = [...state.resource_intro];
    resourceData[data.index].title = data.title;
    resourceData[data.index].content = data.content;
    commit(RESOURCE_INTRO, resourceData);
    commit(RESOURCE_UPDATE, data);
  },
  // 课程下所有阶段列表
  getDradationList({
    commit,
    state
  }, data) {
    commit(DRADATION_LIST, data);
  },
  // 课程下启用设置
  courseDisable({
    commit,
    state
  }, data) {
    commit(COURSE_DISABLE, data);
  },
  // 课程下考季列表
  getSeasonList({
    commit,
    state
  }, data) {
    commit(SEASON_LIST, data);
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
    state.course_default_cover = data.cover_default ? data.cover_default : state.course_default_cover;
  },
  [RESOURCE_INTRO](state, data) {
    let resource_intro_id = []
    for (var i = 0; i < data.length; i++) {
      resource_intro_id.push(data[i].id)
    }
    state.resource_intro = data;
    state.resource_intro_id = resource_intro_id;
    console.log(state.resource_intro_id);
  },
  [RESOURCE_UPDATE](state, data) {
    let ids = state.course_update_ids;
    if (ids.length == 0) {
      state.course_update_ids.push(data.id);
      state.course_update_titles.push(data.title);
      state.course_update_contents.push(data.content);
    } else {
      for (var i = 0; i < ids.length; i++) {
        if (data.id == ids[i]) {
          //说明此次已经修改过了
          state.course_update_ids[i] = data.id;
          state.course_update_titles[i] = data.title;
          state.course_update_contents[i] = data.content;
        } else {
          state.course_update_ids.push(data.id);
          state.course_update_titles.push(data.title);
          state.course_update_contents.push(data.content);
        }
      }
    }
  },
  [DRADATION_LIST](state, data) {
    state.course_daration_list = data;
  },
  [COURSE_DISABLE](state, data) {
    for (let ele in data){
      state.course_disable[ele] = data[ele] != undefined ? data[ele] : state.course_disable[ele]
    }
   /* state.course_disable.class_room_pk_open = data.class_room_pk_open !== undefined ? data.class_room_pk_open : state.course_disable.class_room_pk_open;
    state.course_disable.classroom_open = data.classroom_open !== undefined ? data.classroom_open : state.course_disable.classroom_open;
    state.course_disable.course_syllabus_open = data.course_syllabus_open !== undefined ? data.course_syllabus_open : state.course_disable.course_syllabus_open;
    state.course_disable.exam_key_point_open = data.exam_key_point_open !== undefined ? data.exam_key_point_open : state.course_disable.exam_key_point_open;
    state.course_disable.exam_syllabus_id = data.exam_syllabus_id !== undefined ? data.exam_syllabus_id : state.course_disable.exam_syllabus_id;
    state.course_disable.gaodun_course_id = data.gaodun_course_id !== undefined ? data.gaodun_course_id : state.course_disable.gaodun_course_id;
    state.course_disable.glive_open = data.glive_open !== undefined ? data.glive_open : state.course_disable.glive_open;
    state.course_disable.handout_download_open = data.handout_download_open !== undefined ? data.handout_download_open : state.course_disable.handout_download_open;
    state.course_disable.knowledge_recommend_open = data.knowledge_recommend_open !== undefined ? data.knowledge_recommend_open : state.course_disable.knowledge_recommend_open;
    state.course_disable.knowledge_syllabus_open = data.knowledge_syllabus_open !== undefined ? data.knowledge_syllabus_open : state.course_disable.knowledge_syllabus_open;
    state.course_disable.mock_gradation_open = data.mock_gradation_open !== undefined ? data.mock_gradation_open : state.course_disable.mock_gradation_open;
    state.course_disable.pre_gradation_open = data.pre_gradation_open !== undefined ? data.pre_gradation_open : state.course_disable.pre_gradation_open;
    state.course_disable.review_gradation_open = data.review_gradation_open !== undefined ? data.review_gradation_open : state.course_disable.review_gradation_open;
    state.course_disable.season_manage_open = data.season_manage_open !== undefined ? data.season_manage_open : state.course_disable.season_manage_open;
    state.course_disable.study_record_open = data.study_record_open !== undefined ? data.study_record_open : state.course_disable.study_record_open;*/
  },
  [SEASON_LIST](state, data) {
    state.seaconList = data;
  },
};
export default {
  state,
  getters,
  actions,
  mutations
}
