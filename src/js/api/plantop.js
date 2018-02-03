import axios from 'axios';
import {getEnv} from '../util/config';
import { Message } from 'element-ui';
import queryString from 'queryString';
var instance = axios.create({
  // baseURL: `//${getEnv()}plan-api.gaodun.com`,
  baseURL: `//t-plan-api.gaodun.com`,
  headers :{
    'Content-Type': 'application/json'
//  	"origin":"gaodun.com"
  },
  withCredentials : true,
  transformRequest(data,headers){
    let strData = queryString.stringify(data);
    return strData;
  },
});
let {get,post,put} = instance;

export const ProgressStatics = (cid,clid, params) => get(`/gcloud/course/${cid}/class/${clid}/progress/statics`, params); //教务端后台班级下的全部整体计划

