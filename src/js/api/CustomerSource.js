import {post, get} from '../util/crmAxios';
  
//客户来源
export const GetCustomerSourceTree = () => get('/channel/GetCustomerSourceTree');                             // 获取客户来源列表
export const updateCustomerSourceNodeName = objParam => post('/channel/UpdateCustomerSource', objParam);  // 更新客户来源节点名称
export const addCustomerSourceNode = objParam => post('/channel/AddCustomerSource', objParam);         // 新增客户来源节点
export const deleteCustomerSourceNode = Id => post('/channel/RemoveCustomerSource', {Id});             // 移除客户来源节点及子节点
 