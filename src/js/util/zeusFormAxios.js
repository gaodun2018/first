import axios from 'axios';
import {getBaseUrl} from './config'
import queryString from 'queryString';
import {SAAS_TOKEN, SAAS_USER_INFO} from './keys';
import {getCookie, setCookie} from 'cookieUtils';

var instance = axios.create({
    baseURL: '//',
    headers :{
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // withCredentials : true,   //不能携带cookie 网关会报big header
    transformRequest(data,headers){
        let strData = queryString.stringify(data);
        return strData;
    },
});

instance.interceptors.request.use(function (config) {
    let token = getCookie(SAAS_TOKEN);
    // 非登录接口
    if (config.url.indexOf('login') === -1 && token == undefined) {
        localStorage.clear();
        location.href = '/#/login';
        location.reload();
    }
    // 非登录接口携带token
    if (config.url.indexOf('login') === -1) {
        config.headers.common['Authentication'] = `Basic ${token}`;
    }

    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    //登陆接口直接返回response (需要headers头信息)
    if (response.config.url.indexOf('login') !== -1) {
        return Promise.resolve(response);
    }
    // 登录失效
    if (response.data.status == 553649409 || response.data.status == 553650183 || response.data.status == 553649952 || response.data.status == 553649434) {
        localStorage.clear();
        location.href = '/#/login';
        location.reload();
        return;
    }
    return Promise.resolve(response.data);
}, function (error) {
    return Promise.reject(error);
});

export const formPost = instance.post.bind(instance);
export const formPut = instance.put.bind(instance);
