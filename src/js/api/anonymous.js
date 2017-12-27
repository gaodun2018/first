import axios from 'axios';
import { getBaseUrl } from '../util/config'
// 登录
var instance = axios.create({
    baseURL: getBaseUrl(),
});

//视频播放地址
export const getVideoUrl = parameters => instance.post('/ListenInvitation/GetStudentUrl', parameters);

//根据身份证号获取订单信息
export const getOrderInfoByCardId = parameters => instance.post('/Agreement/GetOrderInfoByCardId', parameters);

//协议确认
export const confirmAgreement = parameters => instance.post('/Agreement/ConfirmAgreement', parameters);

//删除文件
export const removeUploadFile = parameters => instance.post('/Agreement/RemoveUploadFile', parameters);

// 用户协议
export const CustomRegisterInfo = (objParam) => instance.post('/Agreement/CustomRegisterInfo', objParam);

// 用户协议-金融
export const FinancialRegisterInfo = (objParam) => instance.post('/Agreement/FinancialRegisterInfo', objParam);

// 生成pdf文档
export const CreateRegisterAgreement = (objParam) => instance.post('/Agreement/CreateRegisterAgreement', objParam);