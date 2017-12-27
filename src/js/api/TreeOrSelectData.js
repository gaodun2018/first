//树和下拉列表通用数据
import { post, get } from '../util/crmAxios';

//获取人员树
export const GetUserDepartmentTree = () => get('/DataStru/GetUserDepartmentTree');