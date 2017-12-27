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
export const GetMarketingActivitySearch = (objParam) => post('/MarketingActivity/GetMarketingActivityList', objParam);
// 感兴趣项目
export const interestedProject = () => get('/DataStru/GetCurrentUserCourseTypeList', objParam);
// 来源渠道
export const getSourceDetailsTree= () => get('/channel/GetSourceDetailsTree', objParam);