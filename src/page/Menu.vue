<template>
    <div>
        <el-menu background-color="#EFF2F7" :default-active="activeId" :unique-opened="true" :router="true" class="el-menu-vertical-demo">
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
.el-menu {
    .el-menu-item {
        height: 35px;
        line-height: 35px;
        min-width: 170px;
        color: #44576c;
    }
}
</style>

<script>
import { mapState } from "vuex";
import { SAAS_CURRENT_LEVEL_ONE_MENU, SAAS_MENU } from "../util/keys";
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
    }
};
</script>
