import {CURRENT_SUB_MENU, SIGNIN_OUT, EXT_STATUS, HANGUP_CALL, Breadcrumb} from '../mutation-types';
import {signOperate, getSingleExtStatus, hangup} from '../../api/callCenter';
import {CRM_MENU, CRM_CURRENT_SUBMENU, CRM_CURRENT_LEVEL_ONE_MENU, FORMAT_MENU} from '../../util/keys';
const state = {
  currentLevelOneId: 9,
  currentSubMenu: [],
  currentTabId: 0,
  extStatusId: 0,
  extStatusName: "",
  breadcrumbmenu:'',     //面包屑菜单
};
const getters = {}
// 方法调用逻辑
const actions = {
  // 初始化一级菜单选中的ID
  initCurrentLevelOneId() {
    let id = localStorage.getItem(CRM_CURRENT_LEVEL_ONE_MENU);
    id && (state.currentLevelOneId = id);
  },
  // 更新二级菜单
  updateCurrentSubMenu({commit, state}, nid) {
    let crmMenu = JSON.parse(localStorage.getItem(CRM_MENU));
    let subMenuId = nid || localStorage.getItem(CRM_CURRENT_LEVEL_ONE_MENU);

    for (var i in crmMenu) {
      if (crmMenu[i].NavigationId == subMenuId) {
        // console.log(crmMenu[i]);
        commit(CURRENT_SUB_MENU, crmMenu[i]);
        break;
      }
    }

  },
  //更新面包屑
  updateBreadcrumb({commit, state}, path){
    let formatMenu = JSON.parse(localStorage.getItem(FORMAT_MENU));
    for (let i in formatMenu) {
      if (formatMenu[i]['Url'].indexOf(path) > -1) {
        console.log(formatMenu[i]);
        console.log(formatMenu[i].parenttitle);
        commit(Breadcrumb, formatMenu[i].parenttitle);
      }
    }

  },
  updateCurrentTabId({commit, state}, id) {
    state.currentTabId = id;
  },
  async signOperate({commit}, parmSignInfo) {
    let ret = await signOperate(parmSignInfo);
    if (ret && ret.status === 0) {
      commit(SIGNIN_OUT, ret.result);
    } //获取签入状态
    let queryPrm = {ExtNo: parmSignInfo.ExtNo};
    let extInfo = await getSingleExtStatus(queryPrm);
    commit(EXT_STATUS, extInfo.result);
  },
  async getExtStatus({commit}, parmExtStatus) {
    let ret = await getSingleExtStatus(parmExtStatus);
    if (ret && ret.status === 0) {
      commit(EXT_STATUS, ret.result);
    }
  },
  async hangupCall({commit}, parm) {
    let ret = await hangup(parm);
    if (ret && ret.status === 0) {
      commit(HANGUP_CALL, ret.result);
    }
  }
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
    state.currentSubMenu = ChildNavigations;
    state.currentLevelOneId = NavigationId;
    localStorage.setItem(CRM_CURRENT_SUBMENU, JSON.stringify(state.currentSubMenu));
    localStorage.setItem(CRM_CURRENT_LEVEL_ONE_MENU, state.currentLevelOneId)
  },
  [Breadcrumb](state,data){
      state.breadcrumbmenu = data;
  },
  [SIGNIN_OUT](state, recult) {

  },
  [EXT_STATUS](state, result) {
    state.extStatusId = result.StatusId;
    state.extStatusName = result.Status;
  },
  [HANGUP_CALL](state, result) {

  }
};
export default {
  state,
  getters,
  actions,
  mutations
}