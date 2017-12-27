import {
    ORDER_CREATE_PRODUCT,
    ORDER_MANAGE_NO
} from '../mutation-types';
const state = {
    selectedProduct: [], // 已选课程
    crmOrderNo: '', // 获取订单管理页每行所选的订单号
}
const getters = {}
    // 方法调用逻辑
const actions = {
    selectedProduct({ commit, state, dispatch }, data) { // 已选课程
        commit(ORDER_CREATE_PRODUCT, data);
    },
    crmOrderNo({ commit, state, dispatch }, No) { // 获取订单管理页每行所选的订单号
        commit(ORDER_MANAGE_NO, No);
    },
};
// 逻辑代码
const mutations = {
    [ORDER_CREATE_PRODUCT](state, data) { // 已选课程 
        state.selectedProduct = data;
    },
    [ORDER_MANAGE_NO](state, No) { // 获取订单管理页每行所选的订单号 
        state.crmOrderNo = No;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}