import axios from 'axios';
import {getBaseUrl} from '../util/config'
import queryString from 'queryString';
var instance = axios.create({
  baseURL: '//',
  headers :{
    'Content-Type': 'application/x-www-form-urlencoded'
//  	"origin":"gaodun.com"
  },
  withCredentials : true,
  transformRequest(data,headers){
    let strData = queryString.stringify(data);
    return strData;
  },
});
instance.interceptors.request.use(function (config) {
  /* let GDSID = getCookie(`${prefix}GDSID`);
   let token = getCookie(CRM_TOKEN);
   // 非登录和获取login接口
   if (config.url.indexOf('UserLogin') === -1 && config.url.indexOf('token') === -1 && token == undefined) {
   localStorage.clear();
   location.href = '/#/login';
   location.reload();
   }
   if (config.url.indexOf('UserLogin') === -1) {
   config.headers.common['Authorization'] = `Bearer ${token}`;
   }
   config.headers.common[`GDSID`] = GDSID;*/
  return Promise.resolve(config);
}, function (error) {
  return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
  /*// 获取token接口不校验，直接返回
   if (response.config.url.indexOf('token') !== -1) {
   return Promise.resolve(response.data);
   }
   // 登录失效
   if (response.data && response.data.status === 100) {
   localStorage.clear();
   location.href = '/#/login';
   location.reload();
   return;
   }
   if (response.data && response.data.status !== 0) {
   Message({
   message: response.data.info,
   showClose: true,
   type: 'warning'
   });
   }*/
  return Promise.resolve(response.data);
}, function (error) {
  /* // 获取token接口不校验，直接返回
   if (error.config.url.indexOf('token') !== -1) {
   error.message = error.response.data.error_description
   }
   if (error.response.data.status == 100) {
   localStorage.clear();
   location.href = '/#/login';
   location.reload();
   }
   Message({
   message: error.message,
   showClose: true,
   type: 'warning'
   });*/
  return Promise.reject(error);
});
let {get,post,put} = instance;


//新增一个课程
export const addCourse = params => post(`${getBaseUrl()}saas-service.gaodun.com/course`, params);

//创建课程大纲
export const CourseSyllabus = params => post(`${getBaseUrl()}saas-service.gaodun.com/course-syllabus`, params);

//课程基本设置
export const SetCourse = (url,params) => put(`${getBaseUrl()}saas-service.gaodun.com/course/${url}`, params);

//新增资源介绍接口
export const AddSourceIntro = (course_id,params) => post(`${getBaseUrl()}saas-service.gaodun.com/course/${course_id}/source`, params);

//选择大纲模板接口
export const selectSyllabus = (id,params) => put(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/${id}/template`, params);

//添加大纲条目
export const CourseSyllabusItem = params => post(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item`, params);

//修改大纲条目
export const ChangeSyllabusItem = (id,params) => put(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item/${id}`, params);

//新增一个阶段接口
export const AddCourseStage = params => post(`${getBaseUrl()}saas-service.gaodun.com/gradation`, params);

//修改一个阶段接口
export const changeStage = (gradation_id,params) => put(`${getBaseUrl()}saas-service.gaodun.com/gradation/${gradation_id}`, params);

//大纲条目上挂资源
export const addSyllabusResource = (id,params) => put(`${getBaseUrl()}saas-service.gaodun.com/course/syllabus/item/${id}/resource`, params);





//添加班级
export const addClassList = (params) => post(`${getBaseUrl()}school-service.gaodun.com/class`, params);

//学员入班
export const OrginClassStudent = (params) => post(`${getBaseUrl()}school-service.gaodun.com/class/student`, params);

//修改班级
export const updateinfoClass = (class_id,params) => put(`${getBaseUrl()}school-service.gaodun.com/class/${class_id}`, params);


export const addClassPlan = (params) => post(`${getBaseUrl()}plan-api.gaodun.com/plan/`,params);//新增班级标杆计划

export const changePhase = (params) => post(`${getBaseUrl()}plan-api.gaodun.com/plan/phase/`,params);//增加/修改阶段学习计划

export const changeStudentPlan = (class_id,student_id,params) => post(`${getBaseUrl()}school-service.gaodun.com/class/${class_id}/student/${student_id}/set-plan`,params);//为班级学员设置计划


