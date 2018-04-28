import { post, get, zDelete, put } from '../util/zeusAxios';
import { formPost, formPut } from '../util/zeusFormAxios.js';

import { Message } from 'element-ui';
import { getBaseUrl } from '../util/config'

//拉取项目科目
export const getProjectSubject = params => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/manage/get/project/subject/list`, params)

//根据条件搜索课程接口
export const searchCourse = params => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/manage/search`, params)

//课程基本设置拉取课程信息接口
export const getCourseInfo = (url, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${url}`, params)

//课程讲义
export const getCourseHandout = (course_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${course_id}/handout`, params)

export const deleteCourseHandout = (id, params) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/saas-service/handout/${id}`, params)

export const AddCourseHandout = params => post(`${getBaseUrl()}apigateway.gaodun.com/saas-service/handout`, params)

export const updateCourseHandout = (handout_id, params) => put(`${getBaseUrl()}apigateway.gaodun.com/saas-service/handout/${handout_id}`, params);

//拉取课程下的资源介绍接口
export const getCourseResourceIntro = (course_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${course_id}/source`, params)

//拉取课程下所有阶段和大纲接口
export const getStageAndOutline = (course_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/course-api/course/${course_id}/admin/gradation`, params)

//删除一个阶段接口
export const DeleteStage = (gradation_id, params) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/saas-service/gradation/${gradation_id}`, params);

//新增一个课程
export const addCourse = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course`, params);

//课程基本设置
export const SetCourse = (url, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${url}`, params);

//新增资源介绍接口
export const AddSourceIntro = (course_id, params) => formPost(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${course_id}/source`, params);

//新增一个阶段接口
export const AddCourseStage = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/saas-service/gradation`, params);

//修改一个阶段接口
export const changeStage = (gradation_id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/gradation/${gradation_id}`, params);

//拉取课程内容管理设置
export const GetCourseDisable = (course_id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${course_id}/setting`, params);

//课程管理设置（是否启用的设置）
export const SetCourseDisable = (course_id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/saas-service/course/${course_id}/setting`, params);


//课程内容 批量讲义 排序
export const handoutSort = (params) => formPost(`${getBaseUrl()}apigateway.gaodun.com/course-api/course/handout/sort`, params);