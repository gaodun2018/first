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
                    <span class="item-sub-title">Custom Relation Management</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

    import {getCookie, setCookie} from 'cookieUtils';
    import {getCurrentUserMenuTree} from "../api/login.js";
    import {stringify} from 'queryString';
    import {SAAS_MENU, SAAS_USER_INFO, SAAS_USER_FUNCTIONS} from '../util/keys';
    import {getEnv} from '../util/config';
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
                return this.userInfo&&this.userInfo.TrueName
            },
            CardImgUrl (){
                return this.userInfo&&this.userInfo.CardImgUrl
            },
        },
        methods: {
            clickRouter(item) {
                for (let i in this.menu) {
                    if (item.NavigationId == this.menu[i].NavigationId) {
                        if (this.menu[i].Path == 180302) {
                            // location.href = this.menu[i].Url
                            window.open(this.menu[i].Url)
                        } else {
                            this.updateCurrentMenu(this.menu[i]);
                        }
                        return;
                    }
                }
            },
            updateCurrentMenu(item) {
                //this.$store.dispatch('updateCurrentSubMenu', item.NavigationId);
                if (item.ChildNavigations && item.ChildNavigations[0].ChildNavigations) { //控制台菜单
                    let ChildNavigation = item.ChildNavigations[0].ChildNavigations;
                    let path = ChildNavigation[0].ChildNavigations ? ChildNavigation[0].ChildNavigations[0].Url : ChildNavigation[0].Url;
                    // let path = item.ChildNavigations[0].ChildNavigations ? item.ChildNavigations[0].ChildNavigations[0].Url : item.ChildNavigations[0].Url;
                    let NavigationId = ChildNavigation[0].ChildNavigations ? ChildNavigation[0].ChildNavigations[0].Url : ChildNavigation[0].Url;
                    // let NavigationId = item.ChildNavigations[0].ChildNavigations ? item.ChildNavigations[0].ChildNavigations[0].Url : item.ChildNavigations[0].Url;
                    this.$router.push({
                        path,
                    });
                    setTimeout(() => {
                        this.$store.dispatch('updateCurrentTabId', NavigationId);
                    }, 0)
                }else{
                    this.afterFunction();
                }
            },
            afterFunction() {
                this.$message({
                    message: '后续功能正在开发中~~'
                })
            },
            handleCommands(command) {
                let prefix = getEnv();
                if (command == 'logout') {
                    let exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    setCookie("token", undefined, {
                        expires: exp
                    });
                    setCookie(`${prefix}GDSID`, undefined, {
                        expires: exp
                    })
                    // sessionStorage.clear(SAAS_OPEN_TABS);
                    localStorage.clear();
                    this.$store.state.navigation.currentLevelOneId = 488;
                    window.crmSocket && window.crmSocket.disconnect();
                    this.$router.push({path: '/login'});
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
            async getCurrentUserMenuTree(){
                let GDSID =  getCookie(`${prefix}GDSID`);

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

        }
    }
</script>

<style>

</style>