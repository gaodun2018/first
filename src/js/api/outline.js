import { post, get, put,DELETE } from '../util/zeusAxios';
import { getBaseUrl } from '../util/config'

//获取项目和科目
export const getProjectSubject = params => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/get/project/subject/list`, params);

//大纲列表
export const CourseSyllabuses = params => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabuses`, params);

//修改大纲
export const UpdateCourseSyllabus = (url,param) => put(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus/${url}`, param);


//课程大纲模板
export const CourseSyllabusTemplates = params => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus-templates`, params);

//查看大纲
export const checkSyllabus = (id,params) => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus/${id}`, params);

//拉取某个大纲的条目 
export const getSyllabusItems = (params) => get(`${getBaseUrl()}toc-service.gaodun.com/course/syllabus/items`, params);

//删除大纲条目
export const DeleteSyllabusItem = (id,params) => DELETE(`${getBaseUrl()}toc-service.gaodun.com/course/syllabus/item/${id}`, params);

// 班级列表
export const getClassList = parameters => get(`${getBaseUrl()}plan-api.gaodun.com/class/lists`, parameters);
