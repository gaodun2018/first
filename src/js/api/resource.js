import { post, get, zDelete } from '../util/zeusAxios';
import { formPost } from '../util/zeusFormAxios';
import { Message } from 'element-ui';
import { getBaseUrl } from '../util/config'

//查询资源列表
export const getResource = params => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api`, params)
export const getOneResource = (id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/${id}`, params)
export const getTags = (slug, params) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/tag/slug/${slug}`, params)
export const storeResource = params => post(`${getBaseUrl()}apigateway.gaodun.com/resource-api/video`, params)
export const viewResource = id => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/${id}`)
    // 讲义保存
export const saveLecturenote = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/lecture-note`, params)
    // 讲义上传
export const resourceFile = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/file`, params)
    // 修改讲义
export const saveMidfyLecturenote = (id, params) => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/lecture-note/${id}`, params)
    // 删除资源
export const removeLecturenote = (id) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/${id}`)