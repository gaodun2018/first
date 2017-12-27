import { SEND_CALL, GET_CALL_INFO } from '../mutation-types';
import { sendCall, getCallInfo } from '../../api/callCenter';
import { Message } from 'element-ui';
const state = {
    telNumber: null,
    callDuration: 0,
    callCount: 0,
    crmSendCall: null
};
// 方法调用逻辑
const actions = {
    async callUp({ commit, rootState }, parameterCallInfo) {
        if (rootState.navigation.extStatusId != 2) {
            switch (rootState.navigation.extStatusId) {
                case 1:
                    Message({
                        showClose: true,
                        message: '请先签入，再进行操作',
                        type: 'warning'
                    });
                    break;
                case 3:
                    Message({
                        showClose: true,
                        message: '请先置闲，再进行操作',
                        type: 'warning'
                    });
                    break;
                case 4:
                    Message({
                        showClose: true,
                        message: '正在通话中，请稍后再试',
                        type: 'warning'
                    });
                    break;
            }
            return;
        }
        let ret = await sendCall(parameterCallInfo);
        commit(SEND_CALL, ret.status)
    },
    async getCallInfo({ commit }, userNo) {
        let ret = await getCallInfo({ extNo: userNo });
        if (ret && ret.status === 0) {
            commit(GET_CALL_INFO, ret.result);
        }
    }
};
// 逻辑代码
const mutations = {
    [SEND_CALL](state, info) {
        state.crmSendCall = info
    },
    [GET_CALL_INFO](state, result) {
        state.callDuration = result.Duration;
        state.callCount = result.CallCount
    }
};
export default {
    state,
    actions,
    mutations
}