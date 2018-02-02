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


export const getClassPlanDetail = (url,params) => get(`/plan/phase/class/${url}`,params);//获取班级下阶段计划明细

export const deleteClassPlan = (url,params) => instance.delete(`plan/${url}`,params);//删除班级标杆计划

export const getCourseOutline = (url,params) => get(`plan/phase/course/${url}`,params);//

export const deletePlanPhase = (url,params) => instance.delete(`/plan/phase/${url}`,params);//删除阶段计划

//班级学员列表
// export const getClassList = (url,params) => get(`/class/${url}/students`,params);






export const getClassList = (class_id,params) => get(`/class/${class_id}/students`,params);

export const PlaneList = (url, params) => get(url, params); //教务端后台班级下的全部整体计划

export const PlanProgress = (clid, params) => get(`/plan/class/${clid}/progress`, params); //教务统计查看本班各阶段的完成情况

export const CheckAllPlan = (clid,cid, params) => get(`/plan/whole/all/class/${clid}/course/${cid}`, params); //教务统计查看完整计划

export const TopoProgress = (clid, params) => get(`/plan/class/${clid}/top/progress`, params); //计划进度未达标TOPO



export const PelList = (url, params) => get(url, params); //学员列表
