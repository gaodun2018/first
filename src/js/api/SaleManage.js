import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';
// 线索导入查询

const objParam = {
        "Where": {

        },
        "PageIndex": 1,
        "PageSize": 10,
        "OrderBy": "",
        "SortCol": ""
    }
    // 今日重复咨询线索
export const GetRepeatedClueList = (objParam) => post('/SalesManagement/GetRepeatedClueList', objParam);

// 今日重复咨询索统计
export const GetRepeatedClueStatistics = () => post('/SalesManagement/GetRepeatedClueStatistics', objParam);

//预约沟通
export const GetReservationCommunicatClueList = (objParam) => post('/SalesManagement/GetReservationCommunicatClueList', objParam);

// 预约沟通统计
export const GetReservationCommunicatClueStatistics = () => post('/SalesManagement/GetReservationCommunicatClueStatistics', {});


// 今日新线索列表
export const GetSaleNewClueSearchList = (objParam) => post('/SalesManagement/GetSaleNewClueList', objParam);
// 今日新线索统计
export const GetSaleNewClueStatistics = () => post('/SalesManagement/GetSaleNewClueStatistics', objParam);


// 客户推荐列表
export const GetRecommendClueList = (objParam) => post('/SalesManagement/GetRecommendClueList', objParam);


//  线索分配
export const Distribute = (objParam) => post('/ClueDistribute/Distribute', objParam);

//踢回公池
export const KickCluePool = (objParam) => post('/ClueDistribute/KickPool', objParam);

// 公池列表
export const GetSalePublicPoolList = (objParam) => post('/SalesManagement/GetSalePublicPoolList', objParam);
// 获取公池数据树（根据当前登录人）
export const GetPublicUserTree = (objParam) => get('/DataStru/GetDepartmentPublicUserTree', objParam);
// 我的客户查询列表
export const GetMyCustomClueList = (objParam) => post('/SalesManagement/GetMyCustomClueList', objParam);
// 我的客户列表快捷查询
export const GetVagueMyCustomClueList = (objParam) => post('/SalesManagement/GetVagueMyCustomClueList', objParam);