import { post, get, put,DELETE } from '../util/zeusAxios.js';
import { getBaseUrl } from '../util/config'
import {formPost, formPut} from "../util/zeusFormAxios";

//获取项目和科目
export const getProjectSubject = params => get(`${getBaseUrl()}saas-service.gaodun.com/course/manage/get/project/subject/list`, params);

//课程大纲列表
export const CourseSyllabuses = params => get(`${getBaseUrl()}saas-service.gaodun.com/course-syllabuses`, params);

//考试大纲列表
export const ExamSyllabuses = params => get(`${getBaseUrl()}courseapi.gaodun.com/examination/syllabuses`, params);

//修改大纲
export const UpdateCourseSyllabus = (url,param) => put(`${getBaseUrl()}saas-service.gaodun.com/course-syllabus/${url}`, param);


//课程大纲模板
export const CourseSyllabusTemplates = params => get(`${getBaseUrl()}saas-service.gaodun.com/course-syllabus-templates`, params);

//查看大纲
export const checkSyllabus = (id,params) => get(`${getBaseUrl()}saas-service.gaodun.com/course-syllabus/${id}`, params);

//拉取某个大纲的条目 
export const getSyllabusItems = (params) => get(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/items`, params);

//删除大纲条目
export const DeleteSyllabusItem = (id,params) => DELETE(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item/${id}`, params);

//检查大纲下是否已有该资源
export const checkResIsInOutline = (syllabus_id,resource_id,params) => get(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/${syllabus_id}/resources/${resource_id}`, params);

//创建课程大纲
export const CourseSyllabus = params => formPost(`${getBaseUrl()}saas-service.gaodun.com/course-syllabus`, params);

//选择大纲模板接口
export const selectSyllabus = (id,params) => formPut(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/${id}/template`, params);

//添加大纲条目
export const CourseSyllabusItem = params => formPost(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item`, params);

//修改大纲条目
export const ChangeSyllabusItem = (id,params) => formPut(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item/${id}`, params);

//大纲条目上挂资源
export const addSyllabusResource = (id,params) => formPut(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item/${id}/resource`, params);





// 班级列表
export const getClassListout = parameters => get(`${getBaseUrl()}school-service.gaodun.com/class/lists`, parameters);

// 班级列表
export const teachermin = parameters => get(`${getBaseUrl()}school-api.gaodun.com/school/teacher`, parameters);

//创建班级时的课程搜索
export const checkcoursemit = (projectId,subjectId,params) => get(`${getBaseUrl()}school-service.gaodun.com/plan/class/get/${projectId}/course/${subjectId}`, params);

//搜索学员
export const checkstudent = (page,pageSize,params) => get(`${getBaseUrl()}school-service.gaodun.com/plan/search/${page}/student/${pageSize}`, params);// /${page}

//搜索班级
export const checkclass = (studentId,page,pageSize,params) => get(`${getBaseUrl()}school-service.gaodun.com/plan/${studentId}/search/${page}/class/${pageSize}`, params);




















// 班级列表
// export const getStudentList = parameters => get(`${getBaseUrl()}jerusalemapi.gaodun.com/Student/getStudentList`, parameters);