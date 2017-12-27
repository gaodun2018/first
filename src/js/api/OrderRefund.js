import { post, get } from '../util/crmAxios';

const objParam={}

//下拉列表-退款方式
export const GetRefundMode = () => get('/DataStru/GetRefundModeEnumList');
//下拉列表-退款原因
export const GetRefundReason = () => get('/DataStru/GetRefundReasonEnumList');
//下拉列表-审核结论
export const GetAuditVerdict = () => get('/DataStru/GetAuditVerdictEnumList');
//获取退款审核记录列表
export const GetRefundRecordList = (objParam) => get('/OrderRefund/GetRefundRecordList',objParam);
//保存退款申请
export const SaveRefundApply = (objParam) => post('/OrderRefund/SaveRefundApply',objParam);
//保存退款申请并提交审核
export const SaveRefundApplyAndAudit = (objParam) => post('/OrderRefund/SaveRefundApplyAndAudit',objParam);
//删除退款申请
export const DelRefundApply = (objParam) => get('/OrderRefund/DelRefundApply',objParam);
//退款申请列表
export const GetRefundApplyList =(objParam)=>post('/OrderRefund/GetRefundApplyList',objParam)
//订单列表
export const GetOrderRefundApplyList =(objParam)=>post('/OrderRefund/GetOrderRefundApplyList',objParam) 
//保存审核结果
export const SaveAudit = (objParam)=>post('/OrderRefund/Audit',objParam)
//获取申请单详细
export const GetRefundApply=(objParam) => get('/OrderRefund/GetRefundApply',objParam)