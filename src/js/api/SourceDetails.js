import {post, get} from '../util/crmAxios';
 

//来源详情
export const GetSourceDetailsTree = () => get('/channel/GetSourceDetailsTree');                             // 获取来源详情列表
export const updateSourceDetailsNodeName = objParam => post('/channel/UpdateSourceDetails', objParam);  // 更新来源详情节点名称
export const addSourceDetailsNode = objParam => post('/channel/AddSourceDetails', objParam);         // 新增来源详情节点
export const deleteSourceDetailsNode = Id => post('/channel/RemoveSourceDetails', {Id});             // 移除来源详情节点及子节点

