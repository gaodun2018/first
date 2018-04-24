<template>
    <div>
        <el-menu background-color="#EFF2F7" :default-active="activeId" :unique-opened="false" :router="false" class="el-menu-vertical-demo" @select="handleSelect">
            <el-submenu :index="item.Url" v-if="item.ChildNavigations&&item.isAuth" v-for="item in menu" :key="item.NavigationId">
                <template slot="title">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="item.Iconurl"></use>
                    </svg>
                    {{item.Title}}
                </template>
                <el-menu-item :key="item2.NavigationId" :route="{path:`${item2.Url}`}" v-for="item2 in item.ChildNavigations" :index="item2.Url" v-if="item2.isAuth">
                    <a v-if="item2.AppId != 180302 " href="/" style="display:block;">{{item2.Title}}</a>
                    <span class="beyond-hidden" style="margin-right: -20px;" v-if="item2.AppId == 180302" :title="item2.Title">{{item2.Title}}</span>
                </el-menu-item>
            </el-submenu>
            <!-- 没有二级菜单的 -->
            <el-menu-item v-if="!item3.ChildNavigations&&item3.isAuth" :key="item3.NavigationId" :route="{path:`${item3.Url}`}" v-for="item3 in menu" :index="item3.Url  || Math.random()">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item3.Iconurl"></use>
                </svg>
                <a v-if="item3.AppId != 180302 " href="/" style="display:block;">{{item3.Title}}</a>
                <span v-if="item3.AppId == 180302">{{item3.Title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style lang="less">
.el-menu-vertical-demo {
    > .el-menu-item {
        padding-left: 10px !important;
        color: #99a9bf;
    }
    > .el-menu-item.is-active {
        color: #409eff;
    }
    .el-submenu {
        &.is-active {
            .el-submenu__title {
                color: #379ed7;
                .el-submenu__icon-arrow {
                    color: #379ed7;
                    font-size: 16px;
                }
            }
        }
        .el-submenu__title {
            padding-left: 10px !important;
            color: #99a9bf;
            &:hover {
                background-color: #d1dbe5 !important;
            }
        }
        .el-menu--inline {
            background: #e4e8f1 !important;
            .el-menu-item {
                background: #e4e8f1 !important;
                min-width: 170px;
                &:hover {
                    background-color: #d1dbe5 !important;
                }
            }
            // .el-menu-item.is-active {
            //     background: #e4e8f1 !important;
            // }
        }
    }
    .el-menu-item {
        &:hover {
            background-color: #d1dbe5 !important;
        }
    }
}
</style>

<script>
import { mapState } from "vuex";
import {
    SAAS_CURRENT_LEVEL_ONE_MENU,
    SAAS_MENU,
    SAAS_TOKEN,
    SAAS_USER_NAME
} from "../util/keys";
import { getCookie, setCookie } from "../util/cookie.js";
import { getEnv, getBaseUrl } from "../util/config";
export default {
    name: "saas-menu",
    computed: {
        ...mapState({
            menu: state => state.navigation.currentSubMenu
        }),
        activeId() {
            return this.$store.state.navigation.currentTabId;
        }
    },
    mounted() {
        //this.$store.dispatch('updateCurrentTabId',parseUrl().nid)
        this.$store.dispatch("updateCurrentTabId", this.$route.path);
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key !== "tiku") {
                this.$router.push({ path: key });
            } else {
                this.openTiku(); //跳转题库
            }
        },
        //跳转题库
        openTiku() {
            let token = getCookie(SAAS_TOKEN);
            let GDSID = getCookie(`${getEnv()}GDSID`);
            let username = JSON.parse(localStorage.getItem(SAAS_USER_NAME));
            let params = {
                session_id: GDSID,
                username: username
            };
            $.ajax({
                url: `${getBaseUrl()}apigateway.gaodun.com/saas-service/tiku`,
                type: "POST", //
                async: false, //或false,是否异步
                data: params,
                headers: {
                    Authentication: `Basic ${token}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                // timeout:5000, //超时时间
                dataType: "json", //返回的数据格式：
                beforeSend: function(xhr) {},
                success: function(data, textStatus, jqXHR) {
                    // 登录失效 553649410～553649444
                    if (
                        data &&
                        data.status > 553649000 &&
                        data.status < 563649999
                    ) {
                        localStorage.clear();
                        location.href = `//${getEnv()}yun.gaodun.com/login`;
                        location.reload();
                        return;
                    }
                    if (data.status == 0) {
                        window.open(data.result);
                    }
                },
                error: function(xhr, textStatus) {},
                complete: function() {}
            });
        }
    }
};
</script>
