import { post, get, put, zDelete } from '../util/zeusAxios.js';
import { getBaseUrl } from '../util/config'
import { formPost, formPut } from "../util/zeusFormAxios";

//获取项目和科目
export const getProjectSubject = params => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/manage/get/project/subject/list`, params);

//课程大纲列表
export const CourseSyllabuses = params => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course-syllabuses`, params);

//考试大纲列表
export const ExamSyllabuses = params => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/examination/syllabuses`, params);

//修改大纲
export const UpdateCourseSyllabus = (url, param) => put(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course-syllabus/${url}`, param);


//课程大纲模板
export const CourseSyllabusTemplates = params => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course-syllabus-templates`, params);

//查看大纲
export const checkSyllabus = (id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course-syllabus/${id}`, params);

//拉取某个大纲的条目
export const getSyllabusItems = (params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/items`, params);

//删除大纲条目
export const DeleteSyllabusItem = (id, params) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/item/${id}`, params);

//检查大纲下是否已有该资源
export const checkResIsInOutline = (syllabus_id, resource_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/${syllabus_id}/resources/${resource_id}`, params);

//创建课程大纲
export const CourseSyllabus = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course-syllabus`, params);

//复制课程大纲
export const CourseSyllabusCopy = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course-syllabus/copy`, params);

//选择大纲模板接口
export const selectSyllabus = (id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/${id}/template`, params);

//添加大纲条目
export const CourseSyllabusItem = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/item`, params);

//修改大纲条目
export const ChangeSyllabusItem = (id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/item/${id}`, params);

//大纲条目上挂资源
export const mountSyllabusResource = (id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/item/${id}/resource`, params);


// 班级列表
export const getClassListout = parameters => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/class/lists`, parameters);

// 班级列表
export const teachermin = parameters => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/school/teacher`, parameters);

//创建班级时的课程搜索
export const checkcoursemit = (projectId, subjectId, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/plan/class/get/${projectId}/course/${subjectId}`, params);

//搜索学员
export const checkstudent = (page, pageSize, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/plan/search/${page}/student/${pageSize}`, params); // /${page}

//搜索班级
export const checkclass = (studentId, page, pageSize, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/plan/${studentId}/search/${page}/class/${pageSize}`, params);

// 大纲条目排序
export const sortSyllabus = (id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/syllabus/item/${id}/rank`, params);

//大纲获取考纲列表知识点
export const getOutlineKnowledgeList = (params) => get(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/knowledge/syllabuses/course`, params);

// 提交大纲知识点
export const saveOutlineKnowledgeList = (item_id,knowledge_id,params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/toc-service/item/${item_id}/knowledge/${knowledge_id}`, params);

//保存视频资源
export const createSyllabusVideoResource = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/video`, params)

//大纲获取二级科目
export const getSubjectTwoList = (params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/subject/two/list`, params);

// 获取直播地址
export const getLiveAddr = (syllabus_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/calais/api/v1/live-addresses/${syllabus_id}`, params);

// 获取直播回放地址
export const getPlaybackAddr = (item_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/calais/api/v1/playback-addresses/${item_id}`, params);

// 添加和更新直播地址
export const updateLiveAddr = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/calais/api/v1/live-addresses`, params)

// 添加和更新直播回放地址
export const updatePlaybackAddr = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/calais/api/v1/playback-addresses`, params)

// 校验课中\时间...
export const getValidation = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/calais/api/v1/items/validation`, params)

//拉取Glive大纲的条目
export const getGliveSyllabusItems = (params) => get(`${getBaseUrl()}apigateway.gaodun.com/calais/api/v1/course/syllabus/items`, params);
