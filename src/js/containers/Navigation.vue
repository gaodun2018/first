<template>
  <div :class="$route.query.nw == 1 ? 'crm-navigation pointer-events' : 'crm-navigation'">
    <div class="header-logo">
      <div style="text-align: center;margin-right: 20px;margin-top: -3px">
        <router-link to="/home">
          <img src="../../images/logo.png">
        </router-link>
      </div>
    </div>
    <el-tabs v-model="id" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in menu" :key="item.NavigationId" :item="item" :label="item.Title"
                   :name="item.NavigationId">
        {{item}}
      </el-tab-pane>
      <!--<el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    </el-tabs>
    <!--<ul class="crm-nav">
                            <li @click="updateCurrentSubMenu(item)" :class="id == item.NavigationId ? 'active':''" v-for="(item,index) in menu" :key="item.NavigationId">{{item.Title}}</li>
                        </ul>-->
    <div class="user-info">
      <div class="can-work">
        <el-dropdown trigger="hover" @command="handleCommands">
              <span class="el-dropdown-link-2">
                <img class="user_icon" src="../../images/financeHome/group.png" alt="头像">
                <span class="user_name">超级管理员,Alan</span>
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
  import Vue from 'vue';
  import {mapState, mapActions} from 'vuex';
  import {setCookie} from 'cookieUtils';
  import {parseUrl} from 'base';
  import {getEnv} from '../util/config';
  import Modal from 'vueModal';

  import {
    CRM_MENU,
    CRM_USER_INFO,
    CRM_TOKEN,
    CRM_CURRENT_TAB,
    CRM_OPEN_TABS,
    CRM_CURRENT_LEVEL_ONE_MENU
  } from '../util/keys';

  export default {
    data() {
      return {
        name: 'linxin',
        callNum: '',
        userInfo: '',
        /*menu: function(){
         return JSON.parse(localStorage.getItem(CRM_MENU))
         },*/
        activeName: '',
      }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));

      this.$store.dispatch('initCurrentLevelOneId');  // 记录一级菜单ID
      this.$store.dispatch('updateCurrentSubMenu', this.$store.state.navigation.currentLevelOneId);   // 根据一级菜单ID找到二级菜单
      //this.$store.dispatch('GetUnreadMessageCount')
    },
    mounted() {
      let nid = localStorage.getItem(CRM_CURRENT_LEVEL_ONE_MENU)
      if (parseUrl().nw != 1 && !nid) {
        nid = '9';
        for (var i in this.menu) {
          if (this.menu[i].NavigationId == nid) {
            this.updateCurrentSubMenu(this.menu[i]);
            break;
          }
        }
      }
    },

    computed: {
      menu() {
        return JSON.parse(localStorage.getItem('CRM_MENU'))
      },
      TrueName() {
        return this.userInfo.TrueName
      },
      workNo() {
        return this.userInfo.WorkNo
      },
      ...mapState({
        duration: state => state.navbar.callDuration,
        callCount: state => state.navbar.callCount,
        id: state => {
          return state.navigation.currentLevelOneId;
        },
        extStatus: state => {
          return state.navigation.extStatusName
        },
      })
    },
    watch: {
      extStatusId: function (val) {
        this.setExtStatus(val);
      }
    },
    methods: {
      onMessageList(){
        this.$router.push({path: '/messageList'})
      },
      handleClick(tab) {
        for (let i in this.menu) {
          if (tab.name == this.menu[i].NavigationId) {
            if (this.menu[i].Path == 130520) {
              location.href = this.menu[i].Url
            } else {
              this.updateCurrentSubMenu(this.menu[i]);
            }
            return;
          }
        }
      },
      updateCurrentSubMenu(item) {
        //this.$store.dispatch('updateCurrentSubMenu', item.NavigationId);
        if (item.ChildNavigations) {
          let path = item.ChildNavigations[0].ChildNavigations ? item.ChildNavigations[0].ChildNavigations[0].Url : item.ChildNavigations[0].Url;
          let NavigationId = item.ChildNavigations[0].ChildNavigations ? item.ChildNavigations[0].ChildNavigations[0].Url : item.ChildNavigations[0].Url;
          this.$router.push({
            path,
          });
          setTimeout(() => {
            this.$store.dispatch('updateCurrentTabId', NavigationId);
          }, 0)
        }
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
          // sessionStorage.clear(CRM_OPEN_TABS);
          localStorage.clear();
          this.$store.state.navigation.currentLevelOneId = 488;
          window.crmSocket && window.crmSocket.disconnect();
          this.$router.push({path: '/login'});
            // location.reload();
        } else if (command == 'passwordModify') {
          require.ensure([], (require) => {
            let PasswordModify = require("./PasswordModify.vue");
            Modal.openComponent(PasswordModify, {
              title: '修改密码',
              showCancelButton: false,
              showConfirmButton: false,
              width: '500px',
              self: this,
            });
          }, 'passwordModify');
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
    clear:none;
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
