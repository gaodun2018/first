import axios from 'axios';
import { getEnv, getBaseUrl } from './config';
import { loginPage } from '../common/config.js';
import { SAAS_TOKEN, SAAS_USER_INFO } from './keys';
import { getCookie, setCookie } from './cookie.js';
import { Message } from 'element-ui';

let prefix = getEnv();
let userInfo = localStorage.getItem(SAAS_USER_INFO);
if (userInfo) {
    userInfo = JSON.parse(userInfo);
}

axios.defaults.baseURL = '//';
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.put['Content-Type'] = "application/json";
axios.interceptors.request.use(function(config) {
    let token = getCookie(SAAS_TOKEN);

    // 登录接口直接返回
    if (config.url.indexOf('login') !== -1) {
        return Promise.resolve(config);
    }

    // 换取token接口直接返回验证
    if (config.url.indexOf('refreshtoken') !== -1) {
        return Promise.resolve(config);
    }
    // 非登录接口 & 非换取token接口  携带token
    if (config.url.indexOf('login') === -1 && config.url.indexOf('refreshtoken') === -1 && token != undefined) {
        config.headers.common['Authentication'] = `Basic ${token}`;
        return Promise.resolve(config);
    }

    return Promise.resolve(config);
}, function(error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function(response) {

    //登陆接口直接返回response (需要headers头信息)
    if (response.config.url.indexOf('login') !== -1) {
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

    return Promise.resolve(response.data);
}, function(error) {
    return Promise.reject(error);
});
export default class ZEUSAxios {
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

    delete(url, options = {}) {
        return this.request({
            method: 'delete',
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

    put(url, data, options = {}) {
        if (data instanceof Object) {
            data = JSON.stringify(data);
        }
        return this.request({
            method: 'put',
            url,
            data,
            ...options
        });
    }
}
const instanceAxios = new ZEUSAxios;
export const request = instanceAxios.request.bind(instanceAxios);
export const get = instanceAxios.get.bind(instanceAxios);
export const post = instanceAxios.post.bind(instanceAxios);
export const put = instanceAxios.put.bind(instanceAxios);
export const zDelete = instanceAxios.delete.bind(instanceAxios);