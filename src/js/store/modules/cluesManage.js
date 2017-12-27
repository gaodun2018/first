import {
    GETCLUESGUID,
    DISTRIBUTIONGUID,
    GETKICKPOOL,
    CLUESSELECTEDNUM,
    CLUESSHAREDGUID,
    GETCLULEDATA,
    GEt_TRACKING_IDS,
    SHOW_TRACKING,
    SHOW_RULERIGHT,
    CLUES_HIGHLIGHETED,
    CLUES_TABLE_SETTING,
    CLUES_RULE_GUID,
    CLIENT_TABLE_SETTING
} from '../mutation-types';
const state = {
    getCluesId: { // 获取线索id 
        Guid: '',
        CustomGuid: '',
    },
    getDistributionGuid: [], // 线索分配Guid
    getTkickPool: '', // 踢回公池
    cluesSelectedNum: '', // 选中的线索条数
    cluesSharedGuid: '', // 选中线索共享guid
    getCluleData: {}, // 线索列表数据
    getTrackingIds: {}, // 跟进页ID
    isTracking: false, // 显示跟进页
    isRuleRight: false, // 分配规则侧滑
    cluesHighligheted: false, // 拨打电话时线索管理页高亮显示
    cluesTableSetting: [],
    clientTableSetting: [],
    AllocationRuleGuid: '' // 分配规则Guid  
}
const getters = {}
    // 方法调用逻辑
const actions = {
    getCluesId({ commit, state, dispatch }, guid) { // 获取线索id 
        commit(GETCLUESGUID, guid);
    },
    getDistributionGuid({ commit, state, dispatch }, guid) { // 线索分配Guid
        commit(DISTRIBUTIONGUID, guid);
    },
    getTkickPool({ commit, state, dispatch }, tkick) { // 踢回公池
        commit(GETKICKPOOL, tkick);
    },
    cluesSelectedNum({ commit, state, dispatch }, num) { // 选中的线索条数
        commit(CLUESSELECTEDNUM, num);
    },
    cluesSharedGuid({ commit, state, dispatch }, id) { // 选中线索共享guid
        commit(CLUESSHAREDGUID, id);
    },
    getCluleData({ commit, state, dispatch }, data) { // 线索列表数据
        commit(GETCLULEDATA, data);
    },
    getTrackingIds({ commit, state, dispatch }, data) { // 跟进页ID
        commit(GEt_TRACKING_IDS, data);
    },
    isTracking({ commit, state, dispatch }, flag) { // 显示跟进页
        commit(SHOW_TRACKING, flag);
    },
    isRuleRight({ commit, state, dispatch }, flag) {
        commit(SHOW_RULERIGHT, flag);
    },
    cluesHighligheted({ commit, state, dispatch }, guid) {
        commit(CLUES_HIGHLIGHETED, guid);
    },
    cluesTableSetting({ commit, state, dispatch }, table) {
        commit(CLUES_TABLE_SETTING, table);
    },
    clientTableSetting({ commit, state, dispatch }, table) {
        commit(CLIENT_TABLE_SETTING, table);
    },
    AllocationRuleGuid({ commit, state, dispatch }, guid) {
        commit(CLUES_RULE_GUID, guid);
    }
};
// 逻辑代码
const mutations = {
    [GETCLUESGUID](state, guid) { // 获取线索id 
        state.getCluesId = guid;
    },
    [DISTRIBUTIONGUID](state, guid) { // 线索分配Guid 
        state.getDistributionGuid = guid;
    },
    [GETKICKPOOL](state, tk) { // 踢回公池
        state.getTkickPool = tk;
    },
    [CLUESSELECTEDNUM](state, num) { // 选中的线索条数
        state.cluesSelectedNum = num;
    },
    [CLUESSHAREDGUID](state, id) { // 选中线索共享guid
        state.cluesSharedGuid = id;
    },
    [GETCLULEDATA](state, id) { // 选中线索共享guid
        state.getCluleData = id;
    },
    [GEt_TRACKING_IDS](state, data) { // 跟进页ID
        state.getTrackingIds = data;
    },
    [SHOW_TRACKING](state, flag) { // 显示跟进页
        state.isTracking = flag;
    },
    [SHOW_RULERIGHT](state, flag) {
        state.isRuleRight = flag;
    },
    [CLUES_HIGHLIGHETED](state, guid) {
        state.cluesHighligheted = guid;
    },
    [CLUES_TABLE_SETTING](state, table) {
        state.cluesTableSetting = table;
    },
    [CLIENT_TABLE_SETTING](state, table) {
        state.clientTableSetting = table;
    },
    [CLUES_RULE_GUID](state, guid) {
        state.AllocationRuleGuid = guid;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
}