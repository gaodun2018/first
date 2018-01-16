import { post, get,DELETE } from '../util/zeusAxios';
import { Message } from 'element-ui';
import {getBaseUrl} from '../util/config'

//查询资源列表
export const getResource = params => get(`${getBaseUrl()}resource-api.gaodun.com/`, params)




