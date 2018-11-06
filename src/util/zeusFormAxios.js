import axios from 'axios';
import {getBaseUrl} from './config'
import {loginPage} from '../common/config.js'
import queryString from 'queryString';
import {SAAS_TOKEN, SAAS_USER_INFO} from './keys';
import {getCookie, setCookie} from './cookie.js';
import {Message} from 'element-ui';
import {logs} from './logs'

window.message = null;

var instance = axios.create({
    baseURL: `${getBaseUrl()}apigateway.gaodun.com`,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // withCredentials : true,   //不能携带cookie 网关会报big header
    transformRequest(data, headers) {
        let strData = queryString.stringify(data);
        return strData;
    },
});

instance.interceptors.request.use(function (config) {
    let token = getCookie(SAAS_TOKEN);

    // 登录接口直接返回
    if (config.url.indexOf('login') !== -1) {
        return Promise.resolve(config);
    }

    // 换取token接口直接返回验证
    if (config.url.indexOf('refreshtoken') !== -1) {
        return Promise.resolve(config);
    }

    // 非登录接口 & 非换取token接口 携带token
    if (config.url.indexOf('login') === -1 && config.url.indexOf('refreshtoken') === -1 && token != undefined) {
        config.headers.common['Authentication'] = `Basic ${token}`;
        return Promise.resolve(config);
    }

    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    try {
        logs(response);
    }catch (e) {
        console.log(e);
    }

    //登陆接口直接返回response (需要headers头信息)
    if (response.config.url.indexOf('login') !== -1) {
        return Promise.resolve(response);
    }

    // 预览
    if (response.config.url.indexOf('user/verify') !== -1) {
        return Promise.resolve(response);
    }
    // 获取token不校验，直接返回
    if (response.config.url.indexOf('refreshtoken') !== -1) {
        return Promise.resolve(response.data);
    }
    // 登录失效 553649410～553649444
    if (response.data.status > 553649000 && response.data.status < 563649999) {
        localStorage.clear();
        location.href = loginPage;
        return Promise.resolve(response.data);
    }

    if (response.data.status === '403') {
        //无项目权限
        window.message = !window.message && Message({
            message: '需要配置项目权限才能使用。请联系技术客服主管老师配置相应的项目权限。',
            type: 'warning',
            duration: 0,
            showClose: true
        })
        return Promise.resolve(response.data);
    }

    return Promise.resolve(response.data);
}, function (error) {
    return Promise.reject(error);
});

export const formPost = instance.post.bind(instance);
export const formPut = instance.put.bind(instance);
