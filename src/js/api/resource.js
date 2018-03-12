import { post, get,zDelete } from '../util/zeusAxios';
import { Message } from 'element-ui';
import {getBaseUrl} from '../util/config'

//查询资源列表

export const getResource = params => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api`, params)
export const getOneResource = (id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/${id}`, params)
export const getTags = (slug, params) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/tag/slug/${slug}`, params)
export const storeResource = params => post(`${getBaseUrl()}apigateway.gaodun.com/resource-api/video`, params)
export const viewResource = id => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/${id}`)


