import { post, get } from '../util/zeusAxios';
import { Message } from 'element-ui';
import { getBaseUrl } from '../util/config'
// 登录

export const userLogin = parameters => post(`${getBaseUrl()}apigateway.gaodun.com/api/v1/vigo/login`, parameters)

export const getToken = parameters => post('/token', parameters);

export const getLoginUserInfo = parameters => get('/UserInfo/GetLoginUserInfo', parameters)

export const getCurrentUserMenuTree = parameters => get('/Menu/GetCurrentUserMenuTree', parameters) // 用户菜单

export const getChangePwd = parameters => post('/Login/ChangePwd', parameters) // 忘记密码