import {post, get} from '../util/zeusAxios.js';
import {formPost, formPut} from '../util/zeusFormAxios';
import {Message} from 'element-ui';
import {getBaseUrl} from '../util/config'


// 登录
export const userLogin = parameters => formPost(`/api/v1/vigo/login`, parameters)

//退出登录
export const userLogout = parameters => formPost(`/api/v1/vigo/logout`, parameters)

//获取新的AccessToken
export const getAccessToken = (params) => formPost(`/api/v1/token/refreshtoken`, params)


//获取菜单权限
export const getCurrentUserMenuTree = parameters => get(`/saas-service/menu`, parameters) // 用户菜单
