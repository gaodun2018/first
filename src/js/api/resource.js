import { post, get,zDelete } from '../util/zeusAxios';
import { Message } from 'element-ui';
import {getBaseUrl} from '../util/config'

//查询资源列表
export const getResource = params => get(`${getBaseUrl()}resource-api.gaodun.com/resource`, params)
export const getOneResource = (id, params) => get(`${getBaseUrl()}resource-api.gaodun.com/${id}`, params)
export const getTags = (slug, params) => get(`${getBaseUrl()}resource-api.gaodun.com/tag/slug/${slug}`, params)
export const storeResource = params => post(`${getBaseUrl()}resource-api.gaodun.com/video`, params)


