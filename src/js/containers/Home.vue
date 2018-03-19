<template>
    <div class="home">
        <div class="header">
            <div class="w_1200 clear" style="max-width: 1200px;width: 100%;">
                <a href="javascript:;" class="logo left"></a>
                <div class="user right">
                    <el-dropdown trigger="hover" @command="handleCommands">
                        <span class="el-dropdown-link-2">
                            <img class="user_icon" :src="CardImgUrl" alt="头像" v-if="CardImgUrl">
                            <span class="user_name">{{TrueName}}</span>
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <!--<el-dropdown-item command="passwordModify">修改密码</el-dropdown-item>-->
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="banner">
            <div class="w_1200">
                <h3 class="banner_titt">高顿教育-财经云</h3>
                <h4 class="banner_titb">提供教学活动和教育资源管理、分析的一体化解决方案</h4>
            </div>
        </div>
        <div class="contentHome">
            <ul class="console-menu clear">
                <li
                    class="console-menu-items"
                    v-for="(item,index) in menu"
                    :key="item.NavigationId"
                    @click="clickRouter(item)"
                >
                    <span class="item-icon" :id="item.Iconurl"></span>
                    <span class="item-title">{{item.Title}}</span>
                    <!--<span class="item-sub-title">Custom Relation Management</span>-->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import {getCookie, setCookie} from 'cookieUtils';
    import {getCurrentUserMenuTree,userLogout} from "../api/login.js";
    import {stringify} from 'queryString';
    import {
        SAAS_MENU,
        SAAS_USER_INFO,
        SAAS_USER_FUNCTIONS,
        SAAS_TOKEN,
        FORMAT_MENU,
        SAAS_USER_NAME,
        SAAS_CURRENT_MENU,
        SAAS_CURRENT_SUBMENU,
        SAAS_CURRENT_LEVEL_ONE_MENU,
        SAAS_CURRENT_LEVEL_TOP_MENU
    } from '../util/keys';
    import {getEnv, getBaseUrl} from '../util/config';
    import {appid} from "../common/config.js";
    import {parseUrl} from 'base';

    let prefix = getEnv();
    export default {
        data: function () {
            return {
                dialogFormVisible: false,
                isRest: false,      //    2017-12-18 10:58:18  ↓
                ruleForm: {
                    Account: '',
                    Password: '',
                    checked: '',
                },
                loading: false,
                loginFlag: true
            }
        },
        created() {
            this.userInfo = JSON.parse(localStorage.getItem(SAAS_USER_INFO));
            this.getCurrentUserMenuTree();
        },
        computed: {
            menu() {
                return JSON.parse(localStorage.getItem('SAAS_MENU'))
            },
            TrueName() {
                return this.userInfo && this.userInfo.TrueName
            },
            CardImgUrl() {
                return this.userInfo && this.userInfo.CardImgUrl
            },
        },
        methods: {
            clickRouter(item) {
                if (!item.isAuth) {
                    this.stopHalt();
                    return;
                }
                for (let i in this.menu) {
                    if (item.NavigationId == this.menu[i].NavigationId) {
                        if (this.menu[i].Path == 180302) {
                            switch (this.menu[i].Url) {
                                case 'tiku':
                                    this.openTiku();  //登陆题库
                                    break;
                                default:
                                    window.open(this.menu[i].Url)
                                    break;
                            }
                        } else {
                            this.updateCurrentMenu(this.menu[i]);
                        }
                        return;
                    }
                }
            },
            //跳转题库
            openTiku() {
                let token = getCookie(SAAS_TOKEN);
                let GDSID = getCookie(`${prefix}GDSID`);
                let username = localStorage.getItem(SAAS_USER_NAME);
                username = JSON.parse(username);
                let params = {
                    session_id: GDSID,
                    username: username,
                }
                $.ajax({
                    url: `${getBaseUrl()}apigateway.gaodun.com/saas-service/tiku`,
                    type: 'POST', //
                    async: false, //或false,是否异步
                    data: params,
                    headers: {
                        'Authentication': `Basic ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    // timeout:5000, //超时时间
                    dataType: 'json', //返回的数据格式：
                    beforeSend: function (xhr) {
                    },
                    success: function (data, textStatus, jqXHR) {
                        if (data && data.status == 553649409 || data.status == 553650183 || data.status == 553649952 || data.status == 553649434) {
                            localStorage.clear();
                            location.href = '/#/login';
                            location.reload();
                            return;
                        }
                        if (data.status == 0) {
                            window.open(data.result)
                        }
                    },
                    error: function (xhr, textStatus) {
                    },
                    complete: function () {
                    }
                })
            },
            //查看是否有权限跳转地址
            checkRouterPath(ChildNavigation) {
                for (var i in ChildNavigation) {
                    //有权限
                    if (ChildNavigation[i].isAuth) {
                        //看有无子集
                        if (!ChildNavigation[i].ChildNavigations) {//无子集
                            return ChildNavigation[i].Url;
                        } else if (ChildNavigation[i].ChildNavigations) {//有子集
                            return this.checkRouterPath(ChildNavigation[i].ChildNavigations)
                        }
                    }
                }
            },
            updateCurrentMenu(item) {
                //this.$store.dispatch('updateCurrentSubMenu', item.NavigationId);
                if (item.ChildNavigations && item.ChildNavigations[0].ChildNavigations) { //控制台菜单
                    let ChildNavigation = item.ChildNavigations[0].ChildNavigations;

                    console.log(ChildNavigation);
                    let path = this.checkRouterPath(ChildNavigation);
                    let NavigationId = path;
                    this.$router.push({
                        path,
                    });
                    setTimeout(() => {
                        this.$store.dispatch('updateCurrentTabId', NavigationId);
                    }, 0)
                } else {
                    this.afterFunction();
                }
            },
            afterFunction() {
                this.$message({
                    message: '后续功能正在开发中~~'
                })
            },
            stopHalt() {
                this.$message({
                    message: '您暂未开通权限'
                })
            },
            async handleCommands(command) {
                let prefix = getEnv();
                if (command == 'logout') {
                    let params = {
                        appid: appid,
                        token: getCookie(SAAS_TOKEN)
                    }
                    let logoutRet = await userLogout(params)
                    if(logoutRet.status == 0){
                        let exp = new Date();
                        exp.setTime(exp.getTime() - 1);
                        setCookie(SAAS_TOKEN, undefined, {
                            expires: exp
                        });
                        setCookie(`${prefix}GDSID`, undefined, {
                            expires: exp
                        })
                        localStorage.clear();
                        this.$store.state.navigation.currentLevelOneId = 9;
                        this.$router.push({path: '/login'});
                    }
                } else if (command == 'passwordModify') {
                    /*require.ensure([], (require) => {
                     let PasswordModify = require("./PasswordModify.vue");
                     Modal.openComponent(PasswordModify, {
                     title: '修改密码',
                     showCancelButton: false,
                     showConfirmButton: false,
                     width: '500px',
                     self: this,
                     });
                     }, 'passwordModify');
                     }*/
                }
            },
            async getCurrentUserMenuTree() {
                let GDSID = getCookie(`${prefix}GDSID`);

                //获取菜单树
                let menuRet = await getCurrentUserMenuTree({
                    appId: appid,
                    GDSID: GDSID,
                });
                if (menuRet.status === 0) {
                    this.reWriteEmptyUrl(menuRet.result.Tpo_Sys_Navigations);
                    localStorage.setItem(SAAS_MENU, JSON.stringify(menuRet.result.Tpo_Sys_Navigations));
                    localStorage.setItem(SAAS_USER_FUNCTIONS, JSON.stringify(menuRet.result.Tpo_sys_Functions));
                }
            },
            reWriteEmptyUrl(menu) {
                for (var i in menu) {
                    if (menu[i].Url === "") {
                        menu[i].Url = Math.random().toString();
                    }
                    if (menu[i].Url.indexOf('Report') > -1) {
                        menu[i].Url = menu[i].Url.replace(/http.*key=/, '/Report/');
                    }
                    if (menu[i].ChildNavigations) {
                        this.reWriteEmptyUrl(menu[i].ChildNavigations)
                    }
                }
            },
        },
        mounted() {
            localStorage.removeItem(FORMAT_MENU);
            localStorage.removeItem(SAAS_CURRENT_MENU);
            localStorage.removeItem(SAAS_CURRENT_SUBMENU);
            localStorage.removeItem(SAAS_CURRENT_LEVEL_ONE_MENU);
            localStorage.removeItem(SAAS_CURRENT_LEVEL_TOP_MENU);
        }
    }
</script>

<style>

</style>