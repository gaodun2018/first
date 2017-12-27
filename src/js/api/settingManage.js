import {
    post,
    get
} from '../util/crmAxios';
import {
    Message
} from 'element-ui';
// 新增、修改自定义视图
export const AddDefinitionViewInfo = params => post('/DefinitionViewInfo/AddDefinitionViewInfo', params)
    // 获取视图列表
export const GetDefinitionViewInfoList = params => post('/DefinitionViewInfo/GetDefinitionViewInfoList', params)
    // 修改自定义视图状态
export const ChangeDefinitionViewStatus = params => post('/DefinitionViewInfo/ChangeDefinitionViewStatus', params)
    // 根据id获取自定义视图
export const GetDefinitionViewInfoByID = params => get('/DefinitionViewInfo/GetDefinitionViewInfoByID', params) // 根据id获取自定义视图
    // 根据页面获取视图列表
export const GetViewNameList = params => get('/DefinitionViewInfo/GetViewNameList', params) // 根据id获取自定义视图
    // 根据页面ID和视图名称获取自定义显示列
export const GetDefinitionViewInfo = params => post('/DefinitionViewInfo/GetDefinitionViewInfo', params) // 根据id获取自定义视图
    // 删除视图
export const DeleteViewInfo = params => get('/DefinitionViewInfo/DeleteViewInfo', params) // 根据id获取自定义视图