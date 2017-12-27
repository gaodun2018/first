import {post, get} from '../util/crmAxios';
export const getChannel = () => get('/channel/getchannels');                             // 获取渠道列表
export const updateNodeName = objParam => post('/channel/SaveChannel', objParam);        // 更新节点名称
export const addChannelNode = objParam => post('/channel/AddChannel', objParam);         // 新增节点
export const deleteChannelNode = Id => post('/channel/RemoveChannel', {Id});             // 新增节点

 