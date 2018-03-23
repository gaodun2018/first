import {post, get, zDelete} from '../util/zeusAxios';
import {formPost, formPut} from '../util/zeusFormAxios';
import {Message} from 'element-ui';
import {getBaseUrl} from '../util/config'

//查询资源列表
export const getResource = params => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource`, params)

//查询资源数据
export const getOneResource = (id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/${id}`, params)

//按slug查询标签
export const getTags = (slug, params) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/tag/slug/${slug}`, params)

//保存视频资源
export const storeResource = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/video`, params)

//修改视频资源
export const editVideoResource = (id, params) => formPut(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/video/${id}`, params)

//分析视频地址
export const getVideoPath = params => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/video-path`, params)


// 讲义保存
export const saveLecturenote = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/lecture-note`, params)
// 讲义上传
export const resourceFile = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/file`, params)
// 修改讲义
export const saveMidfyLecturenote = (id, params) => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/lecture-note/${id}`, params)
// 删除资源
export const removeLecturenote = (id) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/${id}`)