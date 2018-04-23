import { SAAS_USER_INFO, SAAS_CURRENT_LEVEL_ONE_MENU, SAAS_CURRENT_SUBMENU, SAAS_CURRENT_MENU, SAAS_MENU, SAAS_USER_FUNCTIONS } from '../util/keys';

export default {
    install(Vue, options) {
        Vue.prototype.unlocking = (key) => {
            let userFunctions = localStorage.getItem(SAAS_USER_FUNCTIONS);
            userFunctions = JSON.parse(userFunctions);
            // if (userFunctions) {
            //     var { SysFunctions } = userInfo;
            // }
            if (key instanceof Array) {
                let operation = false;
                for (var j in key) {
                    for (var i in userFunctions) {
                        if (key[j] == userFunctions[i].FunctionKey) {
                            operation = true;
                            break;
                        }
                    }
                }
                return operation;
            }
            for (var i in userFunctions) {
                if (userFunctions[i].FunctionKey == key) {
                    return true;
                }
            }
            return false;
        }
        Vue.prototype.tableHeight = (that, top) => {
            that.$nextTick(() => {
                debugger;
                let scroll = top || 0;
                let tableOffsetTop = 0;
                let thisTable = document.getElementsByClassName('el-table')
                for (var i = 0; i < thisTable.length; i++) {
                    if (thisTable[i].offsetTop != 0) {
                        tableOffsetTop = thisTable[i].offsetTop
                    }
                }
                let maxHeight = that.$el.offsetHeight - tableOffsetTop - 80 - scroll
                that.$refs['table'].$el.style.maxHeight = maxHeight + 'px'
                let tableBody = document.getElementsByClassName('el-table__body-wrapper')
                let tableFixedBody = document.getElementsByClassName('el-table__fixed-body-wrapper')

                if ((navigator.platform == "Win32") || (navigator.platform == "Windows")) {

                    for (var i = 0; i < tableBody.length; i++) {
                        tableBody[i].style.maxHeight = maxHeight - 43 + 'px'
                    }

                } else {
                    for (var i = 0; i < tableBody.length; i++) {
                        tableBody[i].style.maxHeight = maxHeight - 61 + 'px'
                    }

                }

                for (var i = 0; i < tableFixedBody.length; i++) {
                    tableFixedBody[i].style.maxHeight = maxHeight - 61 + 'px'
                }
            })
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
                            // if (key[j] == 'CM_FollowClue') { print += 'CM_FollowClue '}
                        }
                    }
                }
                return print;
            }

        }
        Vue.prototype.push = ({ path, context }) => {
            let menu = JSON.parse(localStorage.getItem(SAAS_CURRENT_MENU));
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