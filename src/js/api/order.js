import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';
// 登录
export const login = () => post('/ProductCenter/GetProductList', {
    "Where": {
        "ProductName": "2017-ACCA"
    },
    "PageIndex": 1,
    "PageSize": 2,
    "OrderBy": "ProductID",
    "SortCol": ""
})

const objParam = {
        "Where": {

        },
        "PageIndex": 1,
        "PageSize": 2,
        "OrderBy": "ProductID",
        "SortCol": ""
    }
    // 获取学生信息
export const GetStudentInfo = (objParam) => post('/OrderCenter/GetStudentInfo', objParam);
// 添加订单
export const getCreateOrder = (objParam) => post('/OrderCenter/CreateOrder', objParam);
// 修改订单
export const UpdateOrder = (objParam) => post('/OrderCenter/UpdateOrder', objParam);
// 获取产品信息 根据项目类型
export const GetProductList = (objParam) => post('/OrderCenter/GetProductList', objParam);
// 检查支付地址
export const CheckPayUrl = (objParam) => post('/OrderCenter/CheckPayUrl', objParam);
// 添加支付流水
export const AddSerial = (objParam) => post('/OrderCenter/AddSerial', objParam);
// 获取已保存的订单信息
export const GetSaveOrderInfo = (objParam) => post('/OrderCenter/GetSaveOrderInfo', objParam);
// 获取所有校区
export const GetSchoolAreaByID = () => post('/Area/GetSchoolArea', objParam);
// 获取支付流水信息
export const GetSavePaySerial = (objParam) => post('/OrderCenter/GetSavePaySerial', objParam);
// 计算折扣
export const ComputeDiscount = (objParam) => post('/OrderCenter/ComputeDiscount', objParam);
// 订单保存后 获取学生信息
export const GetSaveStudentInfo = (objParam) => post('/OrderCenter/GetSaveStudentInfo', objParam);
// 订单类型
export const GetDictionaryByTypeId = (objParam) => get('/Dictionary/GetDictionaryByTypeId', objParam);
// 获得该项目下的 所有启用的优惠策略
export const GetDiscountByCourseType = (objParam) => post('/ProductCenter/GetDiscountByCourseType', objParam);
// 订单查询
export const OrderSearch = (objParam) => post('/OrderCenter/OrderSearch', objParam);
// 发送支付短信
export const SendPayUrl = (objParam) => post('/OrderCenter/SendPayUrl', objParam);
// 订单取消
export const CancelOrder = (objParam) => post('/OrderCenter/CancelOrder', objParam);
// 订单审核
export const getSaveReview = (objParam) => post('/OrderCenter/SaveReview', objParam);
// 订单审核记录
export const GetReviewInfoByOrderNo = (objParam) => post('/OrderCenter/GetReviewInfoByOrderNo', objParam);
// 添加身份证照片
export const UploadIDcard = (objParam) => post('/OrderCenter/UploadIDcard', objParam);
// 获取用户协议 根据订单号
export const GetAgreementByOrderNo = (objParam) => post('/OrderCenter/GetAgreementByOrderNo', objParam);
// 订单审核搜索列表
export const OrderCheckSearch = (objParam) => post('/OrderCenter/OrderCheckSearch', objParam);
// 订单提交
export const SubmitOrder = (objParam) => post('/OrderCenter/SubmitOrder', objParam);
// 订单推送
export const PushOrder = (objParam) => post('/OrderCenter/PushOrder', objParam);
// 产品包
export const GetProductPackageByID = (objParam) => get('/ProductCenter/GetProductPackageByID', objParam);
// 订单审核模糊搜索
export const OrderFuzzyCheckSearch = (objParam) => post('/OrderCenter/OrderFuzzyCheckSearch', objParam);
// 用户协议
export const CustomRegisterInfo = (objParam) => post('/Agreement/CustomRegisterInfo', objParam);
// 生成pdf文档
export const CreateRegisterAgreement = (objParam) => post('/Agreement/CreateRegisterAgreement', objParam);
// 项目
export const GetCurrentUserCourseTypeList = () => get('/DataStru/GetCurrentUserCourseTypeList');