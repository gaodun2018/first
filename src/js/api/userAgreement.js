import { post, get } from '../util/crmAxios';
import { Message } from 'element-ui';

const objParam = {
    "Where": {

    },
    "PageIndex": 1,
    "PageSize": 2
}

// 用户协议列表
export const queryOrderAgreement = (objParam) => post('/Agreement/QueryAgreements', objParam);
