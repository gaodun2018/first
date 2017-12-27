import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';
// 线索导入查询
 
const objParam = {
        "Where": {

        },
        "PageIndex": 1,
        "PageSize": 2,
        "OrderBy": "",
        "SortCol": ""
    } 
// 线索导入查询
export const CluebatchSearch = (objParam) => post('/ClueBatch/GetClueBatchList', objParam);
// 人员树
export const GetAllowedUserTree = () => get('/UserInfo/GetAllowedUserTree', objParam);
// 来源详情
export const getchannels = () => get('/channel/GetSourceDetailsTree', objParam);