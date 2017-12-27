import axios from 'axios';
// 登录
var instance = axios.create({
    baseURL: 'http://192.168.35.243:8008',
    //headers: {'X-Custom-Header': 'foobar'}
});
export const sendCall = parameters => instance.post( '/api/call/send_call',parameters )

export const getCallInfo = extNo => instance.get( '/api/user/callInfo',{
    params: {
        extNo,
    }
});

//签入 签出
export const signOperate=parameters => instance.post('/api/user/sign',parameters);

//获取分机状态
export const getExtStatus=parameters=>instance.post('/api/record/ext_status',parameters);