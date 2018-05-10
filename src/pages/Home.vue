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
            <transition name="fade" mode="out-in" appear>
                <ul class="console-menu clear">
                    <li class="console-menu-items" v-for="item in menu" :key="item.NavigationId">
                        <template v-if="item.Path === '180302'">
                            <a :href="item.Url" target="_blank" style="display:block;">
                                <span class="item-icon" :id="item.Iconurl"></span>
                                <span class="item-title">{{item.Title}}</span>
                            </a>
                        </template>
                        <template v-else>
                            <div class="console-menu-items-wrapper" @click="clickRouter(item)">
                                <span class="item-icon" :id="item.Iconurl"></span>
                                <span class="item-title">{{item.Title}}</span>
                            </div>

                        </template>

                        <!--<span class="item-sub-title">Custom Relation Management</span>-->
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter,
.fade-leave-active {
    transition: all 0.3s;
    opacity: 0;
}

.fold-enter-active {
    animation-name: fold-in;
    animation-duration: 0.1s;
}

.fold-leave-active {
    animation-name: fold-out;
    animation-duration: 0.1s;
}

@keyframes fold-in {
    0% {
        transform: translate3d(0, 100%, 0);
    }
    100% {
        transform: translate3d(0, 0, 0);
    }
}

@keyframes fold-out {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(0, 100%, 0);
    }
}
</style>
<script>
import { getCookie, setCookie } from "../util/cookie.js";
import { stringify } from "queryString";
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
    SAAS_CURRENT_LEVEL_TOP_MENU,
    SAAS_REFRESH_TOKEN
} from "../util/keys";
import { getEnv, getBaseUrl } from "../util/config";
import { setToken } from "../util/setToken";
import { appid, loginPage} from "../common/config.js";
import { parseUrl } from "base";
import { Base64 } from "js-base64";
//需要npm安装js-base64

let prefix = getEnv();
export default {
    data: function() {
        return {
            dialogFormVisible: false,
            isRest: false, //    2017-12-18 10:58:18  ↓
            ruleForm: {
                Account: "",
                Password: "",
                checked: ""
            },
            loading: false,
            loginFlag: true,
            checkTokenTimer: "",
            userInfo:'',
            menu:[],
        };
    },
    async created() {
        // let tokenRet = await this.Refeshtoken2Accesstoken()
        // console.log(tokenRet)
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        this.userInfo = JSON.parse(localStorage.getItem(SAAS_USER_INFO));
        this.menu = JSON.parse(localStorage.getItem(SAAS_MENU));
        localStorage.setItem(
            SAAS_USER_NAME,
            JSON.stringify(getCookie(SAAS_USER_NAME))
        );
        this.getCurrentUserMenuTree();
        let times = 1 * 60 * 1000; //1分钟查询一次
        let minute = 30; //30分钟过期前更换
        this.checkTokenTimer = setInterval(() => {
            if (this.checkToken(minute)) {
                this.Refeshtoken2Accesstoken();
            }
        }, times);
    },
    computed: {
        TrueName() {
            return this.userInfo && this.userInfo.TrueName;
        },
        CardImgUrl() {
            return this.userInfo && this.userInfo.CardImgUrl;
        }
    },
    methods: {
        //用Refeshtoken换Accesstoken
        async Refeshtoken2Accesstoken() {
            let Refesh_token = getCookie(SAAS_REFRESH_TOKEN);
            if (!Refesh_token) return;
            let params = {
                refreshtoken: Refesh_token,
                appid: appid
            };
            let tokenRet = await this.$http.getAccessToken(params);
            if (tokenRet.status === 0) {
                //name,value,hours
                setToken(SAAS_TOKEN, tokenRet.result, 2);
            }
        },
        //检查token是否过期
        checkToken(minute) {
            //minute=>分钟
            let Token = getCookie(SAAS_TOKEN);
            if(!Token){
                return true;
            }
            let str_token = Token.split(".")[1];
            let obj_token = JSON.parse(Base64.decode(str_token));
            let exp = obj_token.exp; //过期时间
            let currentTime = new Date().getTime(); //当前时间
            let timeDifference = parseInt(exp) - parseInt(currentTime / 1000); //时间差(换算成秒)
            if (timeDifference <= minute * 60) {
                return true;
            } else {
                return false;
            }
        },
        clickRouter(item) {
            for (let i in this.menu) {
                if (item.NavigationId == this.menu[i].NavigationId) {
                    if (this.menu[i].Url.indexOf("http") > -1) {
                        let appid = this.menu[i].Path;
                        let z_url = this.menu[i].Url;
                        console.log(appid);
                        this.openPages(appid, z_url);
                    } else {
                        if (!item.isAuth) {
                            return this.stopHalt();
                        }
                        this.updateCurrentMenu(this.menu[i]);
                    }
                    return;
                }
            }
        },
        // 跳转其他系统
        openPages(appid, z_url) {
            console.log(z_url);
            let GDSID = getCookie(`${prefix}GDSID`);
            let token = getCookie(SAAS_TOKEN);
            //获取菜单树
            let params = {
                appId: appid,
                GDSID: GDSID
            };
            let that = this;
            $.ajax({
                url: `${getBaseUrl()}apigateway.gaodun.com/saas-service/menu/child`,
                type: "GET", //
                async: false, //或false,是否异步
                data: params,
                headers: {
                    Authentication: `Basic ${token}`,
                    "Content-Type": "application/json"
                },
                // timeout:5000, //超时时间
                dataType: "json", //返回的数据格式：
                //beforeSend: function(xhr) {},
                success: function(data, textStatus, jqXHR) {
                    // 登录失效 553649410～553649444
                    if (
                        data &&
                        data.status > 553649000 &&
                        data.status < 563649999
                    ) {
                        localStorage.clear();
                        location.href = loginPage;
                        return;
                    }
                    if (data.status == 0) {
                        window.open(z_url);
                    } else if (data.status == 101) {
                        // 无权限访问
                        that.$message({
                            message: "您暂未开通权限！"
                        });
                    }
                },
                error: function(xhr, textStatus) {},
                complete: function() {}
            });
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
        updateCurrentMenu(item) {
            //this.$store.dispatch('updateCurrentSubMenu', item.NavigationId)
            if (item.ChildNavigations) {
                //控制台菜单
                let ChildNavigation = item.ChildNavigations;

                let path = this.checkRouterPath(ChildNavigation);
                if (parseInt(path) == 0) {
                    // url为0.xxxx
                    return this.stopHalt();
                }
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
        stopHalt() {
            this.$message({
                message: "您暂未开通权限！"
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
                /*require.ensure([], (require) => {
              let PasswordModify = require("./PasswordModify.vue")
              Modal.openComponent(PasswordModify, {
              title: '修改密码',
              showCancelButton: false,
              showConfirmButton: false,
              width: '500px',
              self: this,
              })
              }, 'passwordModify')
              }*/
            }
        },
        async getCurrentUserMenuTree() {
            let GDSID = getCookie(`${prefix}GDSID`);
            //获取菜单树
            let menuRet = await this.$http.getCurrentUserMenuTree({
                appId: appid,
                GDSID: GDSID
            });
            if (menuRet.status === 0) {
                this.reWriteEmptyUrl(menuRet.result.Tpo_Sys_Navigations);
                localStorage.setItem(
                    SAAS_MENU,
                    JSON.stringify(menuRet.result.Tpo_Sys_Navigations)
                );
                localStorage.setItem(
                    SAAS_USER_FUNCTIONS,
                    JSON.stringify(menuRet.result.Tpo_sys_Functions)
                );

                localStorage.setItem(
                    SAAS_USER_INFO,
                    JSON.stringify(menuRet.result.Tpo_Sys_Users)
                );

                this.menu = menuRet.result.Tpo_Sys_Navigations;
                this.userInfo = JSON.parse(
                    localStorage.getItem(SAAS_USER_INFO)
                );
            }
        },
        reWriteEmptyUrl(menu) {
            for (var i in menu) {
                if (menu[i].Url === "") {
                    menu[i].Url = Math.random().toString();
                }
                if (menu[i].Url.indexOf("Report") > -1) {
                    menu[i].Url = menu[i].Url.replace(/http.*key=/, "/Report/");
                }
                if (menu[i].ChildNavigations) {
                    this.reWriteEmptyUrl(menu[i].ChildNavigations);
                }
            }
        }
    },
    mounted() {
        localStorage.removeItem(FORMAT_MENU);
        localStorage.removeItem(SAAS_CURRENT_MENU);
        localStorage.removeItem(SAAS_CURRENT_SUBMENU);
        localStorage.removeItem(SAAS_CURRENT_LEVEL_ONE_MENU);
        localStorage.removeItem(SAAS_CURRENT_LEVEL_TOP_MENU);
    },
    beforeDestroy() {
        clearInterval(this.checkTokenTimer);
    }
};
</script>

<style>

</style>
