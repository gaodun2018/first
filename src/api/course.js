import { post, get, zDelete, put } from '../util/zeusAxios';
import { formPost, formPut } from '../util/zeusFormAxios.js';

import { Message } from 'element-ui';
import { getBaseUrl } from '../util/config'
import { constants } from 'zlib';
import axios from 'axios';

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

// 获取课程讲义分类列表
export const getHandoutTypeList = (id, params) => get(`/saas-service/course/${id}/handout/cate`,params);

// 新增课程讲义分类
export const addHandoutType = (params) => post(`/saas-service/course/handout/cate/add`,params);

// 删除课程讲义分类
export const deleteHandoutType = (id,params) => zDelete(`/saas-service/course/handout/cate/${id}`,params);

// 更新课程讲义分类
export const updateHandoutType = (id,params) => put(`/saas-service/course/handout/cate/${id}`,params);

// 获取续派课任务列表
export const sendLessonList = (params) => get(`/saas-service/assign-course/task`,params);

// 新建续课任务
export const addSendLesson = (params) => formPost(`/saas-service/assign-course/task`,params);

//远程搜索续派课课程项目
export const getRemoteCourse =(classid, courseid, params) => get(`/school-service/plan/class/get/${classid}/course/${courseid}`,params);

// 删除续派课
export const deleteCfaLesson = (task_id,params) => zDelete(`/saas-service/assign-course/task/${task_id}`,params);

// 修改续课课程
export const changeCfaLesson = (task_id,params) => put(`/saas-service/assign-course/task/${task_id}`,params);

// 远程搜索学员标签
export const getRemoteTag = (params) => get(`/saas-service/assign-course/api/InterFace/tagList`,params);
