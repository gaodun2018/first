// 订单分单
import { post, get } from '../util/crmAxios';

const objParam=[]
const param={}

//获取人员树
export const GetUserDepartmentTree = () => get('/DataStru/GetUserDepartmentTree');
//新增分单
export const SaveOrderSplit = (objParam) => post('/OrderSplit/SaveOrderSplit',objParam);
//获取一个订单的分单列表
export const GetOrderSplit = (param)=>get('/OrderSplit/GetOrderSplit',param);