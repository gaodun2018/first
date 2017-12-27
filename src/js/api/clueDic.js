//js字典项
import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';


const objParam = {}
   
// 感兴趣的项目
export const dicCourseType = (objParam) => get('/DataStru/GetCurrentUserCourseTypeList', objParam);

//支付方式
export const dicPayType = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=10041', objParam);

//订单来源
export const dicOrderSource = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=10037', objParam);

//订单状态
export const dicOrderStatus = (objParam) => get('/Dictionary/GetDictionaryByTypeId?dicType=10036', objParam);