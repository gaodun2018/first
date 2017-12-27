import axios from 'axios';
import {getEnv} from '../util/config';
//axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded";
import queryString from 'queryString';
var instance = axios.create({
    baseURL: getEnv() == "dev-" ? "https://t-apigateway.gaodun.com" : `//${getEnv()}apigateway.gaodun.com`,
    headers :{
    	'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest(data,headers){
    	let strData = queryString.stringify(data);
    	return strData;	
    },
});
let {get,post} = instance;

//用户表列表
export const getlabellingList= params =>post('/boracay/v1/customertag/get',params);


//生成
export const returnActivating= params =>post('/boracay/v1/customertag/excute',params);