import axios from 'axios';
import {getBaseUrl} from '../util/config'
import queryString from 'queryString';
var instance = axios.create({
  baseURL: '//',
  headers :{
    'Content-Type': 'application/x-www-form-urlencoded'
//  	"origin":"gaodun.com"
  },
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
export const addCourse = params => post(`${getBaseUrl()}course-service.gaodun.com/course`, params)

//创建课程大纲
export const CourseSyllabus = params => post(`${getBaseUrl()}toc-service.gaodun.com/course-syllabus`, params)

//课程基本设置
export const SetCourse = (url,params) => put(`${getBaseUrl()}course-service.gaodun.com/course/${url}`, params)

//新增资源介绍接口
export const AddSourceIntro = (course_id,params) => post(`${getBaseUrl()}toc-service.gaodun.com/course/${course_id}/source`, params)





