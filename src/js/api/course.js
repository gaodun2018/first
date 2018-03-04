
import { post, get,zDelete,put } from '../util/zeusAxios';
import {formPost,formPut} from '../util/zeusFormAxios.js';

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
export const deleteCourseHandout = (id,params) => zDelete(`${getBaseUrl()}course-service.gaodun.com/handout/${id}`, params)
export const AddCourseHandout = params => post(`${getBaseUrl()}course-service.gaodun.com/handout`, params)
export const updateCourseHandout = (handout_id,params) => put(`${getBaseUrl()}course-service.gaodun.com/handout/${handout_id}`, params);

//拉取课程下的资源介绍接口
export const getCourseResourceIntro = (course_id,params) => get(`${getBaseUrl()}saas-service.gaodun.com/course/${course_id}/source`, params)

//拉取课程下所有阶段和大纲接口
export const getStageAndOutline= (course_id,params) => get(`${getBaseUrl()}course-api.gaodun.com/course/${course_id}/gradation`, params)

//删除一个阶段接口
export const DeleteStage = (gradation_id,params) => zDelete(`${getBaseUrl()}saas-service.gaodun.com/gradation/${gradation_id}`, params);

//新增一个课程
export const addCourse = params => formPost(`${getBaseUrl()}saas-service.gaodun.com/course`, params);

//课程基本设置
export const SetCourse = (url,params) => formPut(`${getBaseUrl()}saas-service.gaodun.com/course/${url}`, params);

//新增资源介绍接口
export const AddSourceIntro = (course_id,params) => formPost(`${getBaseUrl()}saas-service.gaodun.com/course/${course_id}/source`, params);

//新增一个阶段接口
export const AddCourseStage = params => formPost(`${getBaseUrl()}saas-service.gaodun.com/gradation`, params);

//修改一个阶段接口
export const changeStage = (gradation_id,params) => formPut(`${getBaseUrl()}saas-service.gaodun.com/gradation/${gradation_id}`, params);

//拉取课程内容管理设置
export const GetCourseDisable = (course_id,params) => get(`${getBaseUrl()}course-service.gaodun.com/course/${course_id}/setting`, params);

//课程管理设置（是否启用的设置）
export const SetCourseDisable = (course_id,params) => formPut(`${getBaseUrl()}saas-service.gaodun.com/course/${course_id}/setting`, params);
