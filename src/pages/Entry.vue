<template>
    <div id="app">
        <div class="container">
            <div style="margin-bottom: 0">
                <Navbar></Navbar>
            </div>
            <div v-if="!this.$route.query.NavigationId" class="content-menu">
                <Menu></Menu>
            </div>
            <Breadcrumb></Breadcrumb>
            <section id="content-container" class="content-container" :style="this.$route.query.NavigationId && 'margin-left: 0'">
                <div class="content-box">
                    <transition name="fade" mode="out-in" appear>
                        <router-view></router-view>
                    </transition>
                </div>
            </section>
        </div>
    </div>
</template>
<style>
nav {
    margin-bottom: 10px;
}

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
import Vue from "vue";
import Navbar from "../pages/Navigation.vue";
import Menu from "./Menu.vue";
import Breadcrumb from "./Breadcrumb.vue";
import {
    SAAS_MENU,
    SAAS_USER_INFO,
    SAAS_TOKEN,
    SAAS_REFRESH_TOKEN
} from "../util/keys";
import { getCookie, setCookie } from "../util/cookie.js";
import { setToken } from "../util/setToken";
import { mapState } from "vuex";
import { parseUrl } from "base";
import Access from "../util/accessControl";
import { Base64 } from "js-base64"; //需要npm安装js-base64
import { appid } from "../common/config.js";

Vue.use(Access);
export default {
    name: "app",
    components: {
        Navbar,
        Menu,
        Breadcrumb
    },
    data() {
        return {
            checkTokenTimer: ""
            //查询token时间的定时器
        };
    },
    created() {
        this.mapMenuToWindow();
        this.mapPageIdToWindow();
        let times = 1 * 60 * 1000;
        //1分钟查询一次
        let minute = 30;
        //30分钟过期前更换
        this.checkTokenTimer = setInterval(() => {
            if (this.checkToken(minute)) {
                this.Refeshtoken2Accesstoken();
            }
        }, times);
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
                setToken(SAAS_TOKEN, tokenRet.result,2);
            } else {
            }
        },
        //检查token是否过期
        checkToken(minute) {
            //minute=>分钟
            let Token = getCookie(SAAS_TOKEN);
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
        mapMenuToWindow() {
            let menu = localStorage.getItem(SAAS_MENU);
            window.Menu = JSON.parse(menu);
        },
        mapPageIdToWindow() {
            var mapMethod = menu => {
                for (var i in menu) {
                    if (menu[i].ChildNavigations) {
                        mapMethod(menu[i].ChildNavigations);
                    }
                }
            };
            mapMethod(window.Menu);
        }
    },
    beforeDestroy() {
        clearInterval(this.checkTokenTimer);
    }
};
</script>
