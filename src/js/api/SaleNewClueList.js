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
// 今日新线索列表
export const GetSaleNewClueSearchList = (objParam) => post('/SalesManagement/GetSaleNewClueList', objParam);
// 今日新线索统计
export const GetSaleNewClueStatistics = () => post('/SalesManagement/GetSaleNewClueStatistics', objParam); 