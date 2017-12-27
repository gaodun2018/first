import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';

const objParam = {
        "Where": {
           "SearchType": 1
        },
        "PageIndex": 1,
        "PageSize": 2,
        
    }
    // 通话记录列表
export const getCallRecordList = (objParam) => post('/CallCenter/QueryCallRecord', objParam);

//获取分机状态
export const getExtStatus=(objParam)=>post('/CallCenter/QueryExtInfo',objParam);

//获取单个分机状态
export const getSingleExtStatus=(objParam)=>post('/CallCenter/GetExtStatus',objParam);

//拨打电话
export const sendCall = parameters => post( '/CallCenter/SendCall',parameters );

//获取通时通次
export const getCallInfo = parameters => get( '/CallCenter/GetCallInfo',parameters);

//签入 签出
export const signOperate=parameters =>post('/CallCenter/UserSign',parameters);

//挂断电话
export const hangup=parameters =>post('/CallCenter/HandupCall',parameters);
// 获取手机号码明文
export const GetContactByUid=parameters =>get('/CustomCenter/GetContactByUid',parameters);
