import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';

const objParam = {
        "Where": {

        },
        "PageIndex": 1,
        "PageSize": 2
    }
    // 查询支付流水
export const queryPaySerial = (objParam) => post('/OrderSerial/QuerySerialPay', objParam);

//我的定金
export const queryDeposit=(objParam)=>post('/OrderDeposit/MyDeposit',objParam);

//根据订单编号获取订单信息
export const getOrderInfoByNo = (parameters) => post('/Agreement/GetOrderInfoByNo',parameters);