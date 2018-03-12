import { post, get } from '../util/zeusAxios.js';
import {formPost,formPut} from '../util/zeusFormAxios';
import { Message } from 'element-ui';
import { getBaseUrl } from '../util/config'



// 登录
export const userLogin = parameters => formPost(`${getBaseUrl()}apigateway.gaodun.com/api/v1/vigo/login`, parameters)


/*export const getToken = parameters => post('/token', parameters);

export const getLoginUserInfo = parameters => get('/UserInfo/GetLoginUserInfo', parameters)

export const getChangePwd = parameters => post('/Login/ChangePwd', parameters) // 忘记密码*/


//获取菜单权限
export const getCurrentUserMenuTree = parameters => get(`${getBaseUrl()}apigateway.gaodun.com/saas-service/menu`, parameters) // 用户菜单
