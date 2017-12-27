import axios from 'axios';
import {getEnv, getBaseUrl} from '../util/config';
import {CRM_TOKEN, CRM_USER_INFO} from './keys';
import {getCookie, setCookie} from 'cookieUtils';
import {Message} from 'element-ui';
let prefix = getEnv();
let userInfo = localStorage.getItem(CRM_USER_INFO);
if (userInfo) {
    userInfo = JSON.parse(userInfo);
}
/*if (prefix == 'dev-') {
 axios.defaults.baseURL = '//t-baiyi.gaodun.com/api';
 } else {
 axios.defaults.baseURL = `//${prefix}baiyiapi.gaodun.com`;
 }*/
axios.defaults.baseURL = getBaseUrl();
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.interceptors.request.use(function (config) {
    let GDSID = getCookie(`${prefix}GDSID`);
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
    config.headers.common[`GDSID`] = GDSID;
    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 获取token接口不校验，直接返回
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
    }
    return Promise.resolve(response.data);
}, function (error) {
    // 获取token接口不校验，直接返回
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
    });
    return Promise.reject(error);
});
export default class CRMAxios {
    constructor(options = {}) {
        this.options = options;
    }

    request(options) {
        return axios.request(options);
    }

    get(url, options = {}) {
        return this.request({
            url,
            params: {
                ...options
            }
        })
    }

    post(url, data, options = {}) {
        if (data instanceof Object) {
            data = JSON.stringify(data);
        }
        return this.request({
            method: 'post',
            url,
            data,
            ...options
        });
    }
}
const instanceAxios = new CRMAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);