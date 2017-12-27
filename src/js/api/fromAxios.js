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
let {get,post} = instance;


//新增一个课程
export const addCourse = parameters => post(`${getBaseUrl()}course-service.gaodun.com/course`, parameters)
