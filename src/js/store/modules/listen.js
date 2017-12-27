import { GET_LISTEN_DATA, GET_DICTIONARY_BY_TYPEID, GEt_DEPART_MENT_TREE, LISTEN_VAGUE_SEACH_DATA } from '../mutation-types'; // 'ADD' , 'SUBTRACT'
import { post, get } from '../../util/crmAxios';
import { Message } from 'element-ui';
import { GetListenList, GetDictionaryByTypeId, GetUserDepartmentTree, ListenVagueSeach } from '../../api/cluesManage';

const state = {
    //table数据
    loading: true,
    tabledata: [],
    getListenTypeList: [],
    getListenStatuList: [],
    getUidList: [],
    totalLength: 0

};
const getters = {

    }
    // 方法调用逻辑
const actions = {
    //获取产品列表数据
    GetListenListData({ commit, state }, data) {
        commit(GET_LISTEN_DATA, data);
    },
    GetListeStatuOrType({ commit, state }, data) {
        commit(GET_DICTIONARY_BY_TYPEID, data);
    },
    GetUidTree({ commit, state }, data) {
        commit(GEt_DEPART_MENT_TREE, data);
    },
    //模糊搜索
    GetListenVagueSeach({ commit, state }, data) {
        commit(LISTEN_VAGUE_SEACH_DATA, data);
    },

};
// 逻辑代码
const mutations = {
    //获试听列表
    [GET_LISTEN_DATA](state, param) {
        GetListenList(param).then(function(res) {
            if (res.status == 0) {
                state.tabledata = res.result.Body
                state.totalLength = res.result.Count
                state.loading = false;
            }
        })
    },
    [LISTEN_VAGUE_SEACH_DATA](state, param) {
        ListenVagueSeach(param).then(function(res) {
            if (res.status == 0) {
                state.tabledata = res.result.Body
                state.totalLength = res.result.Count
                state.loading = false;
            }
        })
    },
    //获取试听状态，类型
    [GET_DICTIONARY_BY_TYPEID](state, param) {
        GetDictionaryByTypeId(param).then(function(res) {
            if (param.dicType == '10039') //获取试听类型
            {
                state.getListenTypeList = res.result;
            }
            if (param.dicType == '10040') //获取试听状态
            {
                state.getListenStatuList = res.result;
            }
        })
    },
    //获取人员树
    [GEt_DEPART_MENT_TREE](state, param) {
        GetUserDepartmentTree(param).then(function(res) {
            state.getUidList = res.result;
        })
    }


};
export default {
    state,
    getters,
    actions,
    mutations
}