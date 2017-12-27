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
    // 电话呼出
export const ClueFollowShortcut = (objParam) => post('/ClueFollow/ClueFollowShortcut', objParam);
// 电话呼入
export const CallInClues = (objParam) => get('/ClueOwner/CallInClues', objParam);
// 电话呼入保存
export const AddCallInClue = (objParam) => post('/clue/AddCallInClue', objParam);