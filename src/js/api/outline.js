import axios from 'axios';
import { post, get } from '../util/zeusAxios';
import { getBaseUrl } from '../util/config'
// 登录
var instance = axios.create({
    baseURL: getBaseUrl(),
});

//获取项目和科目
export const getProjectSubject = parameters => get(`${getBaseUrl()}course-service.gaodun.com/course/manage/get/project/subject/list`, parameters);

//大纲列表
export const CourseSyllabuses = parameters => get(`${getBaseUrl()}toc-service.gaodun.com/course-syllabuses`, parameters);


// //根据身份证号获取订单信息
// export const getOrderInfoByCardId = parameters => instance.post('/Agreement/GetOrderInfoByCardId', parameters);

// //协议确认
// export const confirmAgreement = parameters => instance.post('/Agreement/ConfirmAgreement', parameters);

// //删除文件
// export const removeUploadFile = parameters => instance.post('/Agreement/RemoveUploadFile', parameters);

// // 用户协议
// export const CustomRegisterInfo = (objParam) => instance.post('/Agreement/CustomRegisterInfo', objParam);

// // 用户协议-金融
// export const FinancialRegisterInfo = (objParam) => instance.post('/Agreement/FinancialRegisterInfo', objParam);

// // 生成pdf文档
// export const CreateRegisterAgreement = (objParam) => instance.post('/Agreement/CreateRegisterAgreement', objParam);