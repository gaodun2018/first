import { post, get,DELETE,put } from '../util/zeusAxios';
import { Message } from 'element-ui';
import {getBaseUrl} from '../util/config'

//拉取项目科目
export const getProjectSubject = params => get(`${getBaseUrl()}saas-service.gaodun.com/course/manage/get/project/subject/list`, params)

//根据条件搜索课程接口
export const searchCourse = params => get(`${getBaseUrl()}saas-service.gaodun.com/course/manage/search`, params)

//课程基本设置拉取课程信息接口
export const getCourseInfo = (url,params) => get(`${getBaseUrl()}saas-service.gaodun.com/course/${url}`, params)

//课程讲义
export const getCourseHandout = (course_id,params) => get(`${getBaseUrl()}course-service.gaodun.com/course/${course_id}/handout`, params)
export const deleteCourseHandout = (id,params) => DELETE(`${getBaseUrl()}course-service.gaodun.com/handout/${id}`, params)
export const AddCourseHandout = params => post(`${getBaseUrl()}course-service.gaodun.com/handout`, params)
export const updateCourseHandout = (handout_id,params) => put(`${getBaseUrl()}course-service.gaodun.com/handout/${handout_id}`, params);

//拉取课程下的资源介绍接口
export const getCourseResourceIntro = (course_id,params) => get(`${getBaseUrl()}saas-service.gaodun.com/course/${course_id}/source`, params)


//拉取课程下所有阶段和大纲接口
export const getStageAndOutline= (course_id,params) => get(`${getBaseUrl()}course-api.gaodun.com/course/${course_id}/gradation`, params)

//删除一个阶段接口
export const DeleteStage = (gradation_id,params) => DELETE(`${getBaseUrl()}saas-service.gaodun.com/gradation/${gradation_id}`, params);


