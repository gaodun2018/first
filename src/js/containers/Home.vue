<template>
  <div class="home">
    <div class="header">
      <div class="w_1200 clear">
        <a href="javascript:;" class="logo left"></a>
        <!--<div class="head_login right" v-if="loginFlag" @click="dialogFormVisible = true">
          <span>登录</span>
        </div>
        <div class="user right" v-if="!loginFlag">
          <el-dropdown trigger="hover" @command="handleCommands">
              <span class="el-dropdown-link-2">
                <img class="user_icon" src="../../images/financeHome/group.png" alt="头像">
                <span class="user_name">超级管理员,Alan</span>
                <i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="passwordModify">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>-->
      </div>
    </div>
    <div class="banner">
      <div class="w_1200">
        <h3 class="banner_titt">高顿教育-财经云</h3>
        <h4 class="banner_titb">提供教学活动和教育资源管理、分析的一体化解决方案</h4>
        <!--<a href="javascript:;" class="login ban_btn" v-if="loginFlag" @click="dialogFormVisible = true">登录</a>-->
        <!--<router-link to="/index" v-if="!loginFlag" class="goIn ban_btn">进入</router-link>-->
        <!--<router-link to="/index" class="goIn ban_btn">进入</router-link>-->
      </div>
    </div>
    <div class="contentHome">
      <div class="w_1200">
        <div class="contentBox">
          <ul>

              <router-link tag="li" to="/ResourceTag" class="item">
                <span class="item-img">
                  <img src="../../images/financeHome/group-5.png">
                </span>
                  <span class="item-titt">资源中心</span>
                  <span class="item-titb">Resource Center</span>
              </router-link>



            <li class="item" @click="openEDU">
                <span class="item-img">
                  <img src="../../images/financeHome/group-2.png">
                </span>
              <span class="item-titt">教务管理</span>
              <span class="item-titb">Teaching Management</span>
            </li>


              <li class="item" @click="openCRM">
                <span class="item-img">
                  <img src="../../images/financeHome/group-8.png">
                </span>
                  <span class="item-titt">CRM</span>
                  <span class="item-titb">Custom Relation Management</span>
              </li>

           <!-- <li class="item">
                <span class="item-img">
                  <img src="../../images/financeHome/group-7.png">
                </span>
              <span class="item-titt">应用服务</span>
              <span class="item-titb">Service</span>
            </li>-->

              <li class="item" @click="afterFunction">
                <span class="item-img">
                  <img src="../../images/financeHome/group.png">
                </span>
                  <span class="item-titt">权限管理</span>
                  <span class="item-titb">User Permission</span>
              </li>
            <li class="item" @click="afterFunction">
                <span class="item-img">
                  <img src="../../images/financeHome/group-10.png">
                </span>
              <span class="item-titt">产品管理</span>
              <span class="item-titb">Product Management</span>
            </li>

            <li class="item" @click="afterFunction">
                <span class="item-img">
                  <img src="../../images/financeHome/group-9.png">
                </span>
              <span class="item-titt">报表中心</span>
              <span class="item-titb">Business Intelligence</span>
            </li>


          </ul>
        </div>
      </div>
    </div>

    <el-dialog title="高顿教育 | 财经云" :visible.sync="dialogFormVisible" :show-close="false" modal="true" lock-scroll="true">
      <el-form :model="ruleForm" :rules="rules" autoComplete="on" ref="ruleForm">


        <el-form-item label="" prop="name" placeholder="账号">
          <el-input icon="erp-yonghu" v-model="ruleForm.Account" @keyup.enter.native="submitForm('ruleForm')"
                    autoComplete="on"></el-input>
        </el-form-item>

        <el-form-item label="" prop="pass" placeholder="密码">
          <el-input type="password" icon="erp-mima" v-model="ruleForm.Password"
                    @keyup.enter.native="submitForm('ruleForm')" autoComplete="on"></el-input>
        </el-form-item>

        <el-checkbox v-model="ruleForm.checked">记住密码</el-checkbox>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="large" :loading="loading" @click.native.prevent="submitForm('ruleForm')">
          {{loading ? '登录中' : '登录'}}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {post} from '../util/zeusAxios';
  import {getCookie, setCookie} from 'cookieUtils';
  import {userLogin, getToken, getLoginUserInfo, getCurrentUserMenuTree} from '../api/login';
  import {stringify} from 'queryString';
  import {CRM_MENU, CRM_USER_INFO, CRM_TOKEN, FORMAT_MENU} from '../util/keys';
  import {getEnv} from '../util/config';
  import {parseUrl} from 'base';
  let prefix = getEnv();
  import routesMenu from '../routes/routes'
  import KMENU from '../common/KMENU'
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
    methods: {
        afterFunction(){
          this.$message({
              message:'后续功能正在开发中~~'
          })
        },
        openEDU(){
            window.open('//eds.gaodun.com')
        },
        openCRM(){
            window.open('//baiyi.gaodun.com/')
        },
      formatRoute(menu, Title){
        let menuarr = [];
        function createRoutes(menu, Item) {
            console.log('create routes')
            console.log(menu)
          for (let i in menu) {
            menu[i].parenttitle = menu[i].parenttitle ? menu[i].parenttitle : [{name:menu[i].Title,url:menu[i].Url}];
            if (Item) {
              menu[i].parenttitle = [...Item, ...menu[i].parenttitle]
            }
            menuarr.push(menu[i])

            if (menu[i].ChildNavigations) {
              createRoutes(menu[i].ChildNavigations, menu[i].parenttitle);
            }
          }
        }

        console.log('format route')
        console.log(menuarr);
        createRoutes(menu, Title)
        if(localStorage.getItem(FORMAT_MENU) == undefined){
            localStorage.setItem(FORMAT_MENU, JSON.stringify(menuarr));
        }
        // localStorage.setItem(FORMAT_MENU, JSON.stringify(menuarr));    //2017-12-20 11:48:46 修改
      },
      handleCommands(command) {
        let prefix = getEnv();
        if (command == 'logout') {
          /* let exp = new Date();
           exp.setTime(exp.getTime() - 1);
           setCookie(CRM_TOKEN, undefined, {
           expires: exp
           });
           setCookie(`${prefix}GDSID`,undefined, {
           expires: exp
           })
           sessionStorage.clear(CRM_OPEN_TABS);
           localStorage.clear();
           this.$store.state.navigation.currentLevelOneId = 488;
           window.crmSocket && window.crmSocket.disconnect();
           this.$router.push({ path: '/login' });*/
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
      async submitForm() {
        this.loading = true;
        // 登录
        console.log(prefix);
        console.log(getCookie(`${prefix}GDSID`));

        let loginRet = await userLogin({
          ...this.ruleForm,
          GDSID: getCookie(`${prefix}GDSID`)
        });
        if (loginRet.status == 0) {
          localStorage.setItem(CRM_USER_INFO, JSON.stringify(loginRet.result));
        } else {
          this.loading = false;
          return;
        }
        // 获取token
        let tokenRet = await getToken(stringify({
          grant_type: 'password',
          GDSID: getCookie(`${prefix}GDSID`)
        }));
        if (tokenRet.access_token) {
          setCookie(CRM_TOKEN, tokenRet.access_token);
        } else {
          this.loading = false;
          return;
        }
        // 获取菜单树
        let menuRet = await getCurrentUserMenuTree();
        this.loading = false;
        if (menuRet.status === 0) {
          console.log(menuRet.result);
          console.log(KMENU);
          let routesMenus = [...KMENU,...routesMenu]
          console.log(routesMenus);
          this.formatRoute(routesMenus); //格式化菜单
//                this.reWriteEmptyUrl(menuRet.result);
//                localStorage.setItem(CRM_MENU, JSON.stringify(menuRet.result));
          this.reWriteEmptyUrl(KMENU);          //2017-12-15 13:26:37  修改
          localStorage.setItem(CRM_MENU, JSON.stringify(KMENU));    //2017-12-15 11:49:10 修改
          if (loginRet.result.PwdType == 0) {
            if (loginRet.result.HomePage == '') {
//              this.$router.push({path: '/'})           //2017-12-18 15:20:17   登录后的跳转到路由
              this.loginFlag = false;
              this.dialogFormVisible = false;
            }
            else {
//              this.$router.push({path: loginRet.result.HomePage})             //2017-12-18 15:20:17   登录后的跳转到路由
              this.loginFlag = false;
              this.dialogFormVisible = false;
            }
          }
          else {
            this.$router.push({path: '/updatePwd?NavigationId=520&nw=1'})
          }
        } else {
          this.loading = false;
          return;
        }

      },
      loadSSIDJS() {
        let script = document.createElement('script');
        script.type = "text/javascript";
        // script.src = "http://192.168.35.251:8006/gdssid_v2.js?v=" + Date.now();
        script.src = `//${prefix}s.gaodun.com/web/sso/gdssid_v2.js`;
        document.getElementsByTagName('head')[0].appendChild(script);
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
      async restPassword() {
        this.isRest = true;
      }
    },
    async created() {
      const GDSID = parseUrl().gdsid;
      if (GDSID) {
        setCookie(`${prefix}GDSID`, GDSID);
        let loginRet = await getToken(stringify({
          grant_type: 'password'
        }));
        if (loginRet.access_token) {
          setCookie(CRM_TOKEN, loginRet.access_token);
        }
        let ret = await getLoginUserInfo();
        if (ret.status == 0) {
          localStorage.setItem(CRM_USER_INFO, JSON.stringify(ret.result));
          let menuRet = await getCurrentUserMenuTree();
          this.$router.push({path: '/', query: {nid: 5500}})
        }
        return;
      }
      // this.loadSSIDJS();
    },
    mounted() {
      //暂时写在这儿
        console.log('monted');
      let routesMenus = [...KMENU,...routesMenu]
      this.formatRoute(routesMenus); //格式化菜单
      this.reWriteEmptyUrl(KMENU);          //2017-12-15 13:26:37  修改
        localStorage.setItem(CRM_MENU, JSON.stringify(KMENU));    //2017-12-15 11:49:10 修改
    }
  }
</script>

<style>

</style>