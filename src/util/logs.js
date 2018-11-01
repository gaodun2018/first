import axios from 'axios';
import {getEnv, getBaseUrl} from './config';
import {SAAS_TOKEN} from './keys';
import {getCookie, setCookie} from './cookie.js';
import {loginPage} from "../common/config";
import {requestConfig} from './logsConfig'
import queryString from 'queryString';

const logAxios = axios.create({
    baseURL: `${getBaseUrl()}apigateway.gaodun.com`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest(data, headers) {
        let strData = queryString.stringify(data);
        return strData;
    },
})

logAxios.interceptors.request.use(function (config) {
    let token = getCookie(SAAS_TOKEN);

    if (token) {
        config.headers.common['Authentication'] = `Basic ${token}`;
        return Promise.resolve(config);
    }
    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});

logAxios.interceptors.response.use(function (response) {
    return Promise.resolve(response.data);
}, function (error) {
    return Promise.reject(error);
});

const logPost = logAxios.post.bind(logAxios);
const logPut = logAxios.put.bind(logAxios);

//操作日志
const backendLog = (params) => logPost(`/calais/v1/backend/logs`, params)

const formatQueryData = (data) => {
    if (!data) return data;
    let formatData = {};
    let arr = data.split('&');
    arr.forEach((i) => {
        formatData[i.split('=')[0]] = i.split('=')[1]
    })
    return formatData;
}

const syncHttpLog = (res, item) => {
    console.log('sync', res, item);
    let source_id = 0;
    if (item.callbackFn) {
        source_id = item.callbackFn(res, item);
        console.log('source_id:', source_id);
    }

    // action: ''行为,
    // params: ''api,
    // log_type: ''日志类型,
    // source_id: ''对应id,
    // status:''状态码
    // return
    let params = {};
    params.action = item.action instanceof Array ? (source_id != 0 ? item.action[1] : item.action[0]) : item.action;
    params.params = res.config.data ? JSON.stringify(formatQueryData(res.config.data)) : JSON.stringify(res.config.params);
    // if (source_id !== 0){
    //     params.source_id = source_id;
    // }
    params.source_id = source_id;
    //日志类型(课程1，大纲2，资源3)
    switch (item.type) {
        case 'course':
            params.log_type = 1
            break;
        case 'syllabus':
            params.log_type = 2
            break;
        case 'resource':
            params.log_type = 3
            break;
        default:
            params.log_type = 0
    }
    if(res.data){// 判断状态码
        params.status = res.data.status==0? 0:1;
    }

    console.log(params);
    backendLog(params);
}

export function logs(response) {
    // console.log(response);
    const {config: {baseURL, method, url}} = response;
    let formatMethod = method.toUpperCase();
    // console.log(url);
    let targetItem = null;
    requestConfig.forEach((item) => {
        if (baseURL + item.url === url && !item.regex && formatMethod === item.method) {
            targetItem = item;
        } else if (baseURL + item.url !== url && item.regex && formatMethod === item.method && item.regex.test(url)) {
            targetItem = item;
        }
    })
    console.log('找到：', targetItem);
    if (!targetItem) return;
    // if (targetItem.callbackFn) {
    //     targetItem.callbackFn(response, targetItem);
    // }
    //发送请求log日志
    syncHttpLog(response, targetItem);

}


