<template>
    <div class="home">
        <div class="header">
            <div class="w_1200 clear">
                <a href="javascript:;" class="logo left"></a>
                <!-- <div class="head_login right" v-if="loginFlag" @click="dialogFormVisible = true">
                   <span>登录</span>
                 </div>-->
                <!--<div class="user right" v-if="!loginFlag">-->
                <div class="user right">
                    <el-dropdown trigger="hover" @command="handleCommands">
                        <span class="el-dropdown-link-2">
                            <img class="user_icon" src="../../images/default_icon.png" alt="头像">
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
                        <li
                            class="item"
                            v-for="(item,index) in menu"
                            :key="item.NavigationId"
                            @click="clickRouter(item)"
                        >
                            <span class="item-img" :id="item.Iconurl"></span>
                            <span class="item-titt">{{item.Title}}</span>
                            <span class="item-titb">{{item.Title}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- <el-dialog title="高顿教育 | 财经云" :visible.sync="dialogFormVisible" :show-close="false" modal="true"
                    lock-scroll="true">
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
                 <el-button type="primary" size="large" :loading="loading"
                            @click.native.prevent="submitForm('ruleForm')">
                     {{loading ? '登录中' : '登录'}}
                 </el-button>
             </div>
         </el-dialog>-->
    </div>
</template>

<script>
    import Vue from 'vue';
    import {post} from '../util/zeusAxios';
    import {getCookie, setCookie} from 'cookieUtils';
    import {userLogin, getToken, getLoginUserInfo, getCurrentUserMenuTree} from '../api/login';
    import {stringify} from 'queryString';
    import {SAAS_MENU, SAAS_USER_INFO, SAAS_TOKEN, FORMAT_MENU} from '../util/keys';
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
        computed: {
            menu() {
                return JSON.parse(localStorage.getItem('SAAS_MENU'))
            }
        },
        methods: {
            clickRouter(item) {
                console.log(item);
                for (let i in this.menu) {
                    if (item.NavigationId == this.menu[i].NavigationId) {
                        if (this.menu[i].Path == 180302) {
                            // location.href = this.menu[i].Url
                            window.open(this.menu[i].Url)
                        } else {
                            this.updateCurrentSubMenu(this.menu[i]);
                        }
                        return;
                    }
                }
            },
            updateCurrentSubMenu(item) {
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
                    // setTimeout(() => {
                    //     this.$store.dispatch('updateCurrentTabId', NavigationId);
                    // }, 0)
                }
            },
            afterFunction() {
                this.$message({
                    message: '后续功能正在开发中~~'
                })
            },
            openEDU() {
                window.open(`//${prefix}eds.gaodun.com`)
            },
            openCRM() {
                window.open(`//${prefix}baiyi.gaodun.com/#/stage?to=/index`)
            },
            //格式化菜单树 => 面包屑菜单
            formatRoute(menu, Title) {
                let menuarr = [];

                function createRoutes(menu, Item) {
                    console.log('create routes')
                    console.log(menu)
                    for (let i in menu) {
                        menu[i].parenttitle = menu[i].parenttitle ? menu[i].parenttitle : [{
                            name: menu[i].Title,
                            url: menu[i].Url
                        }];
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
                if (localStorage.getItem(FORMAT_MENU) == undefined) {
                    localStorage.setItem(FORMAT_MENU, JSON.stringify(menuarr));
                }
                // localStorage.setItem(FORMAT_MENU, JSON.stringify(menuarr));    //2017-12-20 11:48:46 修改
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


        },
        async created() {

        },
        mounted() {

        }
    }
</script>

<style>

</style>