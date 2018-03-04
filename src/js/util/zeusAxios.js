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

axios.defaults.baseURL = '//';
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.put['Content-Type'] = "application/json";
axios.interceptors.request.use(function (config) {
    let token = getCookie("token");

    if (config.url.indexOf('login') === -1) {
        config.headers.common['Authentication'] = `Basic ${token}`;
    }
    /*// 非登录和获取login接口
     if (config.url.indexOf('UserLogin') === -1 && config.url.indexOf('token') === -1 && token == undefined) {
     localStorage.clear();
     location.href = '/#/login';
     location.reload();
     }
     if (config.url.indexOf('UserLogin') === -1) {
     config.headers.common['Authorization'] = `Bearer ${token}`;
     }
     config.headers.common[`GDSID`] = GDSID;*/
    return Promise.resolve(config);
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    // 登录失效
    if (response.data.status == 553649409 || response.data.status == 553650183 || response.data.status == 553649952) {
        localStorage.clear();
        location.href = '/#/login';
        location.reload();
        return;
    }
    /*// 获取token接口不校验，直接返回
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
     }*/
    return Promise.resolve(response.data);
}, function (error) {
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