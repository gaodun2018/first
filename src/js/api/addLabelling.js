import axios from 'axios';
import {getEnv} from '../util/config';
//axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
import queryString from 'queryString';
var instance = axios.create({
    baseURL: getEnv() == "dev-" ? "https://t-apigateway.gaodun.com" : `//${getEnv()}apigateway.gaodun.com`,
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

export const GetUserDepartmentTree = (params) => get('/DataStru/GetUserDepartmentTree',{params});

//检查用户包名称
export const checkUserPackageResult = params =>post('/boracay/v1/customertag/checktitle',params);

//添加用户包
export const addCustomerTag = params =>post('/boracay/v1/customertag/add',params);

//获取系统标签
export const GetSysTags = params =>post('/tagsapi/v1/systag/get',params);

//添加用户包规则
export const getUserPackageRule = params =>post('/boracay/v1/tagrule/add',params);

//获取系统标签详情（字典类型）
export const getSysTagDetail = params =>post('/tagsapi/v1/systag/getdetail',params);

//用户包规则设置
export const setUserPackageRule = params =>post('/boracay/v1/tagrule/set',params);

//获取用户包规则
export const getRuleDetail = params =>post('/boracay/v1/tagrule/get',params);

//设置用户包
export const setCustomerTag = params =>post('/boracay/v1/customertag/set',params);