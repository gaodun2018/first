import { post, get, zDelete, put } from '../util/zeusAxios';
import { formPost, formPut } from '../util/zeusFormAxios.js';

import { Message } from 'element-ui';
import { getBaseUrl } from '../util/config'

//拉取项目科目
export const getProjectSubject = params => get(`/saas-service/course/manage/get/project/subject/list`, params)

//根据条件搜索课程接口
export const searchCourse = params => get(`/saas-service/course/manage/search`, params)

//课程基本设置拉取课程信息接口
export const getCourseInfo = (url, params) => get(`/saas-service/course/${url}`, params)

//课程讲义
export const getCourseHandout = (course_id, params) => get(`/saas-service/course/${course_id}/handout`, params)

export const deleteCourseHandout = (id, params) => zDelete(`/saas-service/handout/${id}`, params)

export const AddCourseHandout = params => post(`/saas-service/handout`, params)

export const updateCourseHandout = (handout_id, params) => put(`/saas-service/handout/${handout_id}`, params);

//拉取课程下的资源介绍接口
export const getCourseResourceIntro = (course_id, params) => get(`/saas-service/course/${course_id}/source`, params)

//拉取课程下所有阶段和大纲接口
export const getStageAndOutline = (course_id, params) => get(`/course-api/course/${course_id}/admin/gradation`, params)

//删除一个阶段接口
export const DeleteStage = (gradation_id, params) => zDelete(`/saas-service/gradation/${gradation_id}`, params);

//新增一个课程
export const addCourse = params => formPost(`/saas-service/course`, params);

//课程基本设置
export const SetCourse = (url, params) => formPut(`/saas-service/course/${url}`, params);

//新增资源介绍接口
export const AddSourceIntro = (course_id, params) => formPost(`/saas-service/course/${course_id}/source`, params);

//新增一个阶段接口
export const AddCourseStage = params => formPost(`/saas-service/gradation`, params);

//修改一个阶段接口
export const changeStage = (gradation_id, params) => formPut(`/saas-service/gradation/${gradation_id}`, params);

//拉取课程内容管理设置
export const GetCourseDisable = (course_id, params) => get(`/saas-service/course/${course_id}/setting`, params);

//课程管理设置（是否启用的设置）
export const SetCourseDisable = (course_id, params) => formPut(`/saas-service/course/${course_id}/setting`, params);


//课程内容 批量讲义 排序
export const handoutSort = (params) => formPost(`/course-api/course/handout/sort`, params);

// 预览课程
export const previewCourse = (params) => formPost(`/saas-service/user/verify`, params);

//创建考季&计划
export const createSeason = (params) => formPost(`/plan-api/season`, params);

//删除考季及计划
export const deleteSeason = (seasonId,params) => zDelete(`/plan-api/season/${seasonId}`, params);

//考季及计划详情列表--后台
export const getSeasonList = (courseId,params) => get(`/plan-api/season/item/${courseId}`, params);

//修改计划（不含阶段）
export const editPlan = (planId,params) => formPut(`/plan-api/season/plan/${planId}`, params);

//修改考季（考季及计划）
export const updateSeason = (seasonId,params) => formPut(`/plan-api/season/plan/item/${seasonId}`, params);

//创建计划
export const createPlan = (seasonId,params) => formPost(`/plan-api/season/${seasonId}/plan`, params);

//查询课程全部老师
export const getTeacherList = (course,params) => get(`/caen/v1/course/teacher/${course}`, params);

// 查询老师接口（后台）
export const searchTeacher = (params) => get(`/caen/v1/backend/teachers`, params);

//增加课程老师(后台)
export const addTeacher = (params) => formPost(`/caen/v1/backend/course/teacher`, params);

//删除课程老师（后台）
export const removeTeacher = (params) => zDelete(`/caen/v1/backend/course/teacher`, params);

// 考季的新接口(后台)
export const getNewSeason = (id,params) => get(`/plan-api/course/${id}/admin/gradation`, params);

// :: 课程阶段排序
export const courseStageSort = (params) => formPost(`/saas-service/course/gragation/sort`,params);

/***日志****/
// 获取日志列表
export const getLogsList = (params) => get(`/calais/v1/backend/logs`,params);
