import { post, get, put } from '../util/zeusAxios';
import { getBaseUrl } from '../util/config'

//获取项目和科目
export const getProjectSubject = parameters => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/get/project/subject/list`, parameters);

//大纲列表
export const CourseSyllabuses = parameters => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabuses`, parameters);

//修改大纲
export const UpdateCourseSyllabus = (url,param) => put(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus/${url}`, param);

//添加大纲条目
export const CourseSyllabusItem = parameters => post(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus-item`, parameters);

//课程大纲模板
export const CourseSyllabusTemplates = parameters => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus-templates`, parameters);

// 班级列表
export const getClassList = parameters => get(`${getBaseUrl()}plan-api.gaodun.com/class/lists`, parameters);