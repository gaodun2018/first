import {post, get, zDelete, put} from '../util/zeusAxios';
import {formPost, formPut} from '../util/zeusFormAxios.js';

import {Message} from 'element-ui';
import {getBaseUrl} from '../util/config'

//日签图背景添加/修改
export const saveWXImage = (params) => formPost(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/wx-image/save`, params);

//日签背景图列表
export const getWXImageList = (params) => get(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/wx-image/list`, params);

//日签图背景删除
export const deleteWXImageList = (params) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/wx-image/del`, params);
