import { SAAS_USER_INFO, SAAS_CURRENT_LEVEL_ONE_MENU, SAAS_CURRENT_SUBMENU, SAAS_MENU } from '../util/keys';

export default {
    install(Vue, options) {
        Vue.prototype.unlocking = (key) => {
            let userInfo = localStorage.getItem(SAAS_USER_INFO);
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                var { SysFunctions } = userInfo;
            }
            if (key instanceof Array) {
                let operation = false;
                for (var j in key) {
                    for (var i in SysFunctions) {
                        if (key[j] == SysFunctions[i].FunctionKey) {
                            operation = true;
                            break;
                        }
                    }
                }
                return operation;
            }
            for (var i in SysFunctions) {
                if (SysFunctions[i].FunctionKey == key) {
                    return true;
                }
            }
            return false;
        }
        Vue.prototype.printClass = (key) => {
            let userInfo = localStorage.getItem(SAAS_USER_INFO);
            let print = '';
            
            userInfo = JSON.parse(userInfo);
            if (userInfo) {
                var { SysFunctions } = userInfo;
            }
            if (key instanceof Array) {
                for (var j in key) {
                    for (var i in SysFunctions) {
                        if (key[j] == SysFunctions[i].FunctionKey) {
                            // 线索管理页
                            if (key[j] == 'CM_FollowClue') { print += 'CM_FollowClue '}
                            if (key[j] == 'CRM_ClueFollow_ModifyInfo') { print += 'CRM_ClueFollow_ModifyInfo '}
                            if (key[j] == 'CM_Sign up') { print += 'CM_Sign_up '}
                            if (key[j] == 'CM_SearchShareClue') { print += 'CM_SearchShareClue '}
                            if (key[j] == 'CM_ListenInvitation') { print += 'CM_ListenInvitation '}

                            // 客户管理
                            if (key[j] == 'CM_FollowClue_WDKH') { print += 'CM_FollowClue_WDKH '}
                            if (key[j] == 'CRM_MyClent_ModifyInfo') { print += 'CRM_MyClent_ModifyInfo '}
                            if (key[j] == 'CM_Sign up_WDKH') { print += 'up_WDKH '}
                            if (key[j] == 'CM_ListenInvitation_WDKH') { print += 'CM_ListenInvitation_WDKH '}
                            if (key[j] == 'CM_SearchShareClue_WDKH') { print += 'CM_SearchShareClue_WDKH '}
                        }
                    }
                }
                return print;
            }

        }
        Vue.prototype.push = ({ path, context }) => {
            let menu = JSON.parse(localStorage.getItem(SAAS_MENU));
            let matchingPath = (m) => {
                for (let i in m) {
                    if (m[i].Url == path) {
                        context.$router.push({ path });
                        setTimeout(() => {
                            context.$store.dispatch('updateCurrentTabId', m[i].ParentPath[0]);
                            context.$store.dispatch('updateCurrentSubMenu', m[i].ParentPath[0]);
                        }, 0);
                        return;
                    }
                    if (m[i].ChildNavigations) {
                        matchingPath(m[i].ChildNavigations);
                    }
                }
            }
            matchingPath(menu);
        }
        Vue.prototype.getBaseUrl = () => {
            let host = location.host;
            // 开发环境
            if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1) {
                return 'http://192.168.60.235:6002';
            }
            let pre = location.host.match(/^.*-/);
            // 正式环境
            if (pre === null) {
                return '//baiyiapi.gaodun.com';
            }
            // 测试及预发布环境
            return `${pre[0]}baiyiapi.gaodun.com`;
        }
    }
}