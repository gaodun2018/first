<template>
    <div :class="$route.query.nw == 1 ? 'crm-navigation pointer-events' : 'crm-navigation'">
        <div class="header-logo">
            <div style="text-align: center;margin-right: 20px;margin-top: -3px">
                <router-link to="/home">
                    <img src="./../assets/images/logo.png">
                </router-link>
            </div>
        </div>
        <el-tabs v-model="id" @tab-click="handleClick">
            <el-tab-pane v-for="item in submenu" :key="item.NavigationId" :item="item" :label="item.Title"
                         v-if="item.isAuth"
                         :name="item.NavigationId">
                {{item}}
            </el-tab-pane>
            <!--<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>-->
        </el-tabs>
        <!--<ul class="crm-nav">
                                <li @click="updateCurrentSubMenu(item)" :class="id == item.NavigationId ? 'active':''" v-for="(item,index) in menu" :key="item.NavigationId">{{item.Title}}</li>
                            </ul>-->
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
import Vue from 'vue'
import {mapState, mapActions} from 'vuex'
import {setCookie, getCookie} from '../util/cookie.js'
import {parseUrl} from 'base'
import {getEnv} from '../util/config'
import {appid} from '../common/config.js'
// import Modal from 'vueModal'

import {
  SAAS_MENU,
  SAAS_USER_INFO,
  SAAS_TOKEN,
  SAAS_REFRESH_TOKEN,
  SAAS_CURRENT_TAB,
  SAAS_OPEN_TABS,
  SAAS_CURRENT_LEVEL_ONE_MENU,
  SAAS_CURRENT_LEVEL_TOP_MENU
} from '../util/keys';

export default {
  data() {
    return {
      name: 'linxin',
      callNum: '',
      userInfo: '',
      /*menu: function(){
        return JSON.parse(localStorage.getItem(SAAS_MENU))
        },*/
      activeName: '',
      Menu: '',
      SubMenu: '',
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem(SAAS_USER_INFO))
    this.$store.dispatch('initCurrentLevelTopId')  // 记录顶级菜单ID
    this.$store.dispatch('initCurrentLevelOneId')  // 记录一级菜单ID
    this.$store.dispatch('updateCurrentMenu', this.$store.state.navigation.currentLevelTopId)   // 根据顶级菜单ID找到一级菜单
    this.$store.dispatch('updateCurrentSubMenu', this.$store.state.navigation.currentLevelOneId)   // 根据一级菜单ID找到二级菜单
  },
  mounted() {
    this.updateMenu()//更新菜单栏
    this.updateSubMenu()//更新菜单栏
    let nbid = localStorage.getItem(SAAS_CURRENT_LEVEL_TOP_MENU)
    if (!nbid) {
      if (this.menu && this.menu.length == 0) return
      this.updateCurrentMenu(this.menu)
    }

    let nid = localStorage.getItem(SAAS_CURRENT_LEVEL_ONE_MENU)
    if (!nid) {
      if (this.submenu && this.submenu.length == 0) return
      this.updateCurrentSubMenu(this.submenu)
    }

  },

  computed: {
    menu() {
      return this.Menu
    },
    submenu() {
      return this.SubMenu
    },
    TrueName() {
      return this.userInfo.TrueName
    },
    CardImgUrl() {
      return this.userInfo && this.userInfo.CardImgUrl
    },
    ...mapState({
      duration: state => state.navbar.callDuration,
      callCount: state => state.navbar.callCount,
      id: state => {
        return state.navigation.currentLevelOneId
      },
      extStatus: state => {
        return state.navigation.extStatusName
      },
    })
  },
  watch: {
      //切换路由时更新菜单栏 防止用户改变url
    "$route": ['updateMenu', 'updateSubMenu'],
  },
  methods: {
    //更新菜单栏
    updateMenu() {
      this.Menu = JSON.parse(localStorage.getItem('SAAS_MENU'))
    },
    updateSubMenu() {
      this.SubMenu = JSON.parse(localStorage.getItem('SAAS_CURRENT_MENU'))
    },
    //查看是否有权限跳转地址
    checkRouterPath(ChildNavigation) {
      for (var i in ChildNavigation) {
        //有权限
        if (ChildNavigation[i].isAuth) {
          //看有无子集
          if (!ChildNavigation[i].ChildNavigations) {//无子集
            return ChildNavigation[i].Url
          } else if (ChildNavigation[i].ChildNavigations) {//有子集
            return this.checkRouterPath(ChildNavigation[i].ChildNavigations)
          }
        }
      }
    },
    handleClick(tab) {
      for (let i in this.submenu) {
        if (tab.name == this.submenu[i].NavigationId) {
          if (this.submenu[i].Path == 180302) {
            location.href = this.submenu[i].Url
          } else {
            this.updateCurrentSubMenu(this.submenu[i])
          }
          return
        }
      }
    },
    updateCurrentMenu(item) {
      if (item.ChildNavigations) { //控制台菜单
        let ChildNavigation = item.ChildNavigations
        let path = this.checkRouterPath(ChildNavigation)
        let NavigationId = path
        this.$router.push({
          path
        })
        setTimeout(() => {
          this.$store.dispatch('updateCurrentTabId', NavigationId)
        }, 0)
      } else {
        this.afterFunction()
      }
    },
    updateCurrentSubMenu(item) {
      if (item.ChildNavigations) {
        let ChildNavigation = item.ChildNavigations

        let path = this.checkRouterPath(ChildNavigation)
        let NavigationId = path
        this.$router.push({
          path
        })
        setTimeout(() => {
          this.$store.dispatch('updateCurrentTabId', NavigationId)
        }, 0)
      } else {
        this.afterFunction()
      }
    },
    afterFunction() {
      this.$message({
        message: '后续功能正在开发中~~'
      })
    },
    async handleCommands(command) {
      let prefix = getEnv()
      if (command == 'logout') {
        let params = {
          appid: appid,
          token: getCookie(SAAS_TOKEN)
        }
        let logoutRet = await this.$http.userLogout(params)
        if (logoutRet.status == 0) {
          let exp = new Date()
          exp.setTime(exp.getTime() - 1)
          setCookie(SAAS_TOKEN, undefined, {
            expires: exp
          })
          setCookie(SAAS_REFRESH_TOKEN, undefined, {
            expires: exp
          })
          setCookie(`${prefix}GDSID`, undefined, {
            expires: exp
          })
          localStorage.clear()
          this.$store.state.navigation.currentLevelOneId = 9
          this.$router.push({path: '/login'})
        }
      } else if (command == 'passwordModify') {
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
}
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

    .crm-navigation .el-tabs {
        float: left;
        clear: none;
    }

    .crm-navigation .el-dropdown-menu__item {
        text-align: center;
    }

    .crm-navigation .el-tabs__item {
        color: #fff;
        font-size: 12px;
        height: 50px;
        line-height: 50px;
        transition: all .5s;
        min-width: 80px;
        text-align: center;
    }

    .crm-navigation .el-tabs__item,
    .crm-navigation .el-tabs__item.is-active {
        color: #fff !important;
    }

    .crm-navigation .el-tabs__content {
        display: none;
    }

    .crm-navigation .el-tabs__active-bar {
        min-width: 80px;
        text-align: center;
        height: 50px;
        z-index: 0;
        background: #1796cf;
        top: -1px;
    }

    .crm-navigation .el-tabs__item:hover {
        color: #fff;
        background: #17A7E8;
    }

    .crm-navigation .el-tabs__header {
        border: 0 none;
        margin-bottom: 0;
    }
</style>
