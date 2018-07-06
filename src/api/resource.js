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
// export const storeResource = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/video`, params)
export const storeResource = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/resource/video`, params)

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
export const removeResource = (id) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/${id}`)
// 查询资源（后台）
export const searchResource = (id) => get(`${getBaseUrl()}apigateway.gaodun.com/resource-api/resource/${id}`)

//添加节点(后台)
export const createInsteractive = params => formPost(`${getBaseUrl()}apigateway.gaodun.com/caen/insteractive/add`, params)

//节点列表（后台）
export const getInsteractiveList = params => get(`${getBaseUrl()}apigateway.gaodun.com/caen/insteractive/list`, params)

//修改节点(后台)
export const updateInsteractive = params => formPut(`${getBaseUrl()}apigateway.gaodun.com/caen/insteractive/update`, params)

// 【后台】删除节点
export const removeInsteractive = (params) => zDelete(`${getBaseUrl()}apigateway.gaodun.com/caen/insteractive/delete`,params)

// 资源组增加
export const createResourceGroup = (params) => formPost(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/resource/group`,params)

//查询资源组
export const getResourceGroup = params => get(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/resource/group`, params)

//资源获取考纲和知识点
export const getResourceKnowledgeList = params => get(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/knowledge/syllabuses/tag`, params)

//获取视频资源&知识点&老师
export const getAllKnowledge = (id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/resource/video/${id}`, params)

// 获取对应id的试卷数据
export const getPaper = (id, params) => get(`${getBaseUrl()}apigateway.gaodun.com/caen/v1/backend/resource/paper/${id}`, params)
