import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';
const objParam = {
        "Where": {

        },
        "PageIndex": 1,
        "PageSize": 2,
        "OrderBy": "ProductID",
        "SortCol": ""
    }
    // 个人每日统计
export const GetTodayStatistics = () => get('/Statistics/GetTodayStatistics');
// 统计当月订单红榜
export const GetMonthRedRanking = (objParam) => get('/Statistics/GetMonthRedRanking', objParam);
// 统计当月订单黑榜
export const GetMonthBlackRanking = (objParam) => get('/Statistics/GetMonthBlackRanking', objParam);
// 话务状态分析
export const QueryTelStatusStatic = (objParam) => post('/CallCenter/QueryTelStatusStatic', objParam);
// 通话统计
export const QueryCallStaticData = (objParam) => post('/CallCenter/QueryCallStaticData', objParam);
// 团队业绩折线图
export const GetAchievement = (objParam) => get('/Statistics/GetAchievement', objParam);
// 个人业绩折线图
export const GetAchievementPerson = (objParam) => get('/Statistics/GetAchievementPerson', objParam);
// 试听转化率
export const GetClueConversion = (objParam) => get('/Statistics/GetClueConversion', objParam);
// 预约试听人数
export const GetListenInvitation = (objParam) => get('/Statistics/GetListenInvitation', objParam);
// 预约沟通人数
export const ReservationCommunication = (objParam) => get('/Statistics/ReservationCommunication', objParam);
//业绩排行报表
export const GetRankingList = () => get('/Statistics/GetRankingList');
//客户意向度统计
export const GetIntentionGrade = () => get('/Statistics/GetIntentionGrade');
//个人排行
export const GetCurrentUserRanking = () => get('/Statistics/GetCurrentUserRanking');
//紧急沟通线索
export const GetEmergencyClues = (objParam) => get('/Statistics/GetEmergencyClues',objParam);