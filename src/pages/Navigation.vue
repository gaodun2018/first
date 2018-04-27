<template>
    <div :class="$route.query.nw == 1 ? 's-navigation pointer-events' : 's-navigation'">
        <div class="header-logo">
            <div style="text-align: center;margin-right: 20px;margin-top: -3px">
                <router-link to="/home">
                    <img src="./../assets/images/logo.png">
                </router-link>
            </div>
        </div>
        <el-tabs v-model="id" class="nav" @tab-click="handleClick">
            <el-tab-pane v-for="item in submenu" :key="item.NavigationId" :item="item" :label="item.Title" v-if="item.isAuth" :name="String(item.NavigationId)">
                {{item}}{{id}}{{item.NavigationId}}
            </el-tab-pane>
        </el-tabs>
        <div class="user-info">
            <div class="can-work">
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
</template>
<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { setCookie, getCookie } from "../util/cookie.js";
import { setToken } from "../util/setToken";
import { parseUrl } from "base";
import { getEnv } from "../util/config";
import { appid ,loginPage} from "../common/config.js";
// import Modal from 'vueModal'

import {
    SAAS_MENU,
    SAAS_USER_INFO,
    SAAS_TOKEN,
    SAAS_USER_NAME,
    SAAS_REFRESH_TOKEN,
    SAAS_CURRENT_TAB,
    SAAS_OPEN_TABS,
    SAAS_CURRENT_LEVEL_ONE_MENU,
    SAAS_CURRENT_LEVEL_TOP_MENU
} from "../util/keys";

export default {
    data() {
        return {
            name: "linxin",
            callNum: "",
            userInfo: "",
            /*menu: function(){
        return JSON.parse(localStorage.getItem(SAAS_MENU))
        },*/
            activeName: "",
            Menu: "",
            SubMenu: ""
        };
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(SAAS_USER_INFO));
        this.$store.dispatch("initCurrentLevelTopId"); // 记录顶级菜单ID
        this.$store.dispatch("initCurrentLevelOneId"); // 记录一级菜单ID
        this.$store.dispatch(
            "updateCurrentMenu",
            this.$store.state.navigation.currentLevelTopId
        ); // 根据顶级菜单ID找到一级菜单
        this.$store.dispatch(
            "updateCurrentSubMenu",
            this.$store.state.navigation.currentLevelOneId
        ); // 根据一级菜单ID找到二级菜单
    },
    mounted() {
        this.updateMenu(); //更新菜单栏
        this.updateSubMenu(); //更新菜单栏
        let nbid = localStorage.getItem(SAAS_CURRENT_LEVEL_TOP_MENU);
        if (!nbid) {
            if (this.menu && this.menu.length == 0) return;
            this.updateCurrentMenu(this.menu);
        }

        let nid = localStorage.getItem(SAAS_CURRENT_LEVEL_ONE_MENU);
        if (!nid) {
            if (this.submenu && this.submenu.length == 0) return;
            this.updateCurrentSubMenu(this.submenu);
        }
    },

    computed: {
        menu() {
            return this.Menu;
        },
        submenu() {
            return this.SubMenu;
        },
        TrueName() {
            return this.userInfo.TrueName;
        },
        CardImgUrl() {
            return this.userInfo && this.userInfo.CardImgUrl;
        },
        id: {
            get: function() {
                return String(this.$store.state.navigation.currentLevelOneId);
            },
            set: function() {}
        },
        ...mapState({
            duration: state => state.navbar.callDuration,
            callCount: state => state.navbar.callCount
        })
    },
    watch: {
        //切换路由时更新菜单栏 防止用户改变url
        $route: ["updateMenu", "updateSubMenu"]
    },
    methods: {
        //更新菜单栏
        updateMenu() {
            this.Menu = JSON.parse(localStorage.getItem("SAAS_MENU"));
        },
        updateSubMenu() {
            this.SubMenu = JSON.parse(
                localStorage.getItem("SAAS_CURRENT_MENU")
            );
        },
        //查看是否有权限跳转地址
        checkRouterPath(ChildNavigation) {
            for (var i in ChildNavigation) {
                //有权限
                if (ChildNavigation[i].isAuth) {
                    //看有无子集
                    if (!ChildNavigation[i].ChildNavigations) {
                        //无子集
                        return ChildNavigation[i].Url;
                    } else if (ChildNavigation[i].ChildNavigations) {
                        //有子集
                        return this.checkRouterPath(
                            ChildNavigation[i].ChildNavigations
                        );
                    }
                }
            }
        },
        handleClick(tab) {
            for (let i in this.submenu) {
                if (tab.name == this.submenu[i].NavigationId) {
                    if (this.submenu[i].Path == 180302) {
                        location.href = this.submenu[i].Url;
                    } else {
                        this.updateCurrentSubMenu(this.submenu[i]);
                    }
                    return;
                }
            }
        },
        updateCurrentMenu(item) {
            if (item.ChildNavigations) {
                //控制台菜单
                let ChildNavigation = item.ChildNavigations;
                let path = this.checkRouterPath(ChildNavigation);
                let NavigationId = path;
                this.$router.push({
                    path
                });
                setTimeout(() => {
                    this.$store.dispatch("updateCurrentTabId", NavigationId);
                }, 0);
            } else {
                this.afterFunction();
            }
        },
        updateCurrentSubMenu(item) {
            if (item.ChildNavigations) {
                let ChildNavigation = item.ChildNavigations;

                let path = this.checkRouterPath(ChildNavigation);
                let NavigationId = path;
                this.$router.push({
                    path
                });
                setTimeout(() => {
                    this.$store.dispatch("updateCurrentTabId", NavigationId);
                }, 0);
            } else {
                this.afterFunction();
            }
        },
        afterFunction() {
            this.$message({
                message: "后续功能正在开发中~~"
            });
        },
        async handleCommands(command) {
            let prefix = getEnv();
            if (command == "logout") {
                let params = {
                    appid: appid,
                    token: getCookie(SAAS_TOKEN)
                };
                let logoutRet = await this.$http.userLogout(params);
                if (logoutRet.status == 0) {
                    let exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    setToken(SAAS_TOKEN, undefined, -1);
                    setToken(SAAS_REFRESH_TOKEN, undefined, -1);
                    setToken(SAAS_USER_NAME, undefined, -1);
                    setToken(`${prefix}GDSID`, undefined, -1);
                    localStorage.clear();
                    this.$store.state.navigation.currentLevelOneId = 9;
                    location.href = loginPage;
                }
            } else if (command == "passwordModify") {
                // require.ensure([], (require) => {
                //     let PasswordModify = require("./PasswordModify.vue")
                //     Modal.openComponent(PasswordModify, {
                //         title: '修改密码',
                //         showCancelButton: false,
                //         showConfirmButton: false,
                //         width: '500px',
                //         self: this,
                //     })
                // }, 'passwordModify')
            }
        }
    }
};
</script>

<style>
ul,
ol {
    list-style: none;
}
@media screen and (max-width: 800px) {
    .info-messge {
        display: none;
    }
}
.s-navigation .el-tabs {
    float: left;
    clear: none;
    height: 50px;
}
.s-navigation .el-dropdown-menu__item {
    text-align: center;
}
.s-navigation .el-tabs__item {
    color: #fff;
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    transition: all 0.5s;
    min-width: 80px;
    text-align: center;
}
.s-navigation .el-tabs__nav-wrap::after {
    height: 0;
}
.s-navigation .el-tabs__header {
    margin: 0;
    border: none;
    height: 100%;
}
.s-navigation .el-tabs__content {
    display: none;
}
.s-navigation .el-tabs__active-bar {
    height: 100%;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    padding: 0 20px;
    cursor: pointer;
    margin-left: -20px;
}
.s-navigation .el-tabs__item.is-active {
    min-width: 80px;
    text-align: center;
    height: 50px;
    z-index: 0;
    background: rgba(255, 255, 255, 0.2);
    top: -1px;
}
.s-navigation .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
.s-navigation .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.s-navigation .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.s-navigation .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
}
.el-tabs--bottom .el-tabs__item.is-bottom:last-child,
.el-tabs--bottom .el-tabs__item.is-top:last-child,
.el-tabs--top .el-tabs__item.is-bottom:last-child,
.el-tabs--top .el-tabs__item.is-top:last-child {
    padding-right: 20px;;
}
.s-navigation .el-tabs__item:hover {
    color: #fff;
}
</style>
