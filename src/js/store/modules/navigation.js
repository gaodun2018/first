import {CURRENT_SUB_MENU, BREADCRUMB_MENU} from '../mutation-types';
import {SAAS_MENU, SAAS_CURRENT_SUBMENU, SAAS_CURRENT_LEVEL_ONE_MENU, FORMAT_MENU} from '../../util/keys';

const state = {
    currentLevelOneId: 9,
    currentSubMenu: [],
    currentTabId: 0,
    extStatusId: 0,
    extStatusName: "",
    breadcrumbmenu: '',     //面包屑菜单
};
const getters = {}
// 方法调用逻辑
const actions = {
    // 初始化一级菜单选中的ID
    initCurrentLevelOneId() {
        let id = localStorage.getItem(SAAS_CURRENT_LEVEL_ONE_MENU);
        id && (state.currentLevelOneId = id);
    },
    // 更新二级菜单
    updateCurrentSubMenu({commit, state}, nid) {
        console.log(nid);
        let saasMenu = JSON.parse(localStorage.getItem(SAAS_MENU));
        let subMenuId = nid || localStorage.getItem(SAAS_CURRENT_LEVEL_ONE_MENU);
        console.log(subMenuId,'  subMenuId subMenuId');
        for (var i in saasMenu) {
            console.log(saasMenu[i].NavigationId, subMenuId ,'this is saasMenu[i].NavigationId == subMenuId');
            if (saasMenu[i].NavigationId == subMenuId) {
                // console.log(crmMenu[i]);
                commit(CURRENT_SUB_MENU, saasMenu[i]);
                break;
            }
        }

    },
    //更新面包屑
    updateBreadcrumb({commit, state}, path) {
        let formatMenu = JSON.parse(localStorage.getItem(FORMAT_MENU));
        for (let i in formatMenu) {
            // if (formatMenu[i]['Url'].indexOf(path) > -1) {
            if (path.indexOf(formatMenu[i]['Url']) > -1) {
                commit(BREADCRUMB_MENU, formatMenu[i].parenttitle);
            }
        }

    },
    updateCurrentTabId({commit, state}, id) {
        state.currentTabId = id;
    },
};
// 逻辑代码
const mutations = {
    /**
     * 更新当前一级菜单ID，二级菜单内容
     * @param state { Object }
     * @param ChildNavigations { Array } 二级菜单
     * @param NavigationId { Number } 一级菜单ID
     */
    [CURRENT_SUB_MENU](state, {ChildNavigations, NavigationId}) {
        debugger
        state.currentSubMenu = ChildNavigations;
        state.currentLevelOneId = NavigationId;
        localStorage.setItem(SAAS_CURRENT_SUBMENU, JSON.stringify(state.currentSubMenu));
        localStorage.setItem(SAAS_CURRENT_LEVEL_ONE_MENU, state.currentLevelOneId)
    },
    [BREADCRUMB_MENU](state, data) {
        state.breadcrumbmenu = data;
    },
};
export default {
    state,
    getters,
    actions,
    mutations
}