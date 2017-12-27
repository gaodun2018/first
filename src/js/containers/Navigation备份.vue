<template>
    <div :class="$route.query.nw == 1 ? 'crm-navigation pointer-events' : 'crm-navigation'">
        <div class="header-logo">
            <div style="text-align: center;margin-right: 20px;margin-top: -3px">
                <img src="../../images/logo.png">
            </div>
        </div>
        <el-tabs v-model="id" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in menu" :key="item.NavigationId" :item="item" :label="item.Title" :name="item.NavigationId">{{item}}
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
           <!-- <div class="info-messge">
                <span class="call-time">
                    <span>通话时长:</span>
                    <span>{{this.duration}}</span>
                    <i></i>
                </span>
                <span class="messge-call">
                    <span>通话次数:</span>
                    <span>{{this.callCount}}</span>
                </span>
                <span class="email-icon" @click="onMessageList">
                    <i></i>
                    <span class="email-num">
                        <span>{{$store.state.home.getMessageCount}}</span>
                    </span>
                </span>
            </div>-->
            <div class="can-work">
              <!--  <el-dropdown style="margin-right: 5px" @command="handleExtCommands">
                    <span :class="{'el-dropdown-call':true,'el-dropdown-callIn': this.extStatusId===4,'el-dropdown-call-unsign':this.extStatusId===1,'el-dropdown-call-busy':this.extStatusId===3,'el-dropdown-call-idle':this.extStatusId===2}">
                        <span>{{this.extStatus}}</span>
                        <i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="signIn" :disabled="signIn">签入</el-dropdown-item>
                        <el-dropdown-item command="signOut" :disabled="singOut">签出</el-dropdown-item>
                        <el-dropdown-item command="setIdle" :disabled="setIdle">置闲</el-dropdown-item>
                        <el-dropdown-item command="setBusy" :disabled="setBusy">置忙</el-dropdown-item>
                        <el-dropdown-item command="setMonitor" :disabled="setMonitor">监控</el-dropdown-item>
                        <el-dropdown-item command="setHangup" :disabled="setHangup">挂断</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>-->
              <el-dropdown trigger="hover" @command="handleCommands">
              <span class="el-dropdown-link-2">
                <img class="user_icon" src="../../images/financeHome/group.png" alt="头像">
                <span class="user_name">超级管理员,Alan</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="passwordModify">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>


                <!--<el-dropdown trigger="hover" @command="handleCommands">
                    <span class="el-dropdown-link-2">
                        {{this.TrueName}}
                        <i class="el-icon-caret-bottom el-icon&#45;&#45;right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">注销退出</el-dropdown-item>
                        <el-dropdown-item command="passwordModify">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>-->
               <!-- <a href="javascript:void(0)" class="switched-systems">
                    <i></i>
                </a>-->
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { sendCall } from '../api/cluesManage';
import { setCookie } from 'cookieUtils';
import { parseUrl } from 'base';
import { getEnv } from '../util/config';
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
            signIn: false,
            singOut: true,
            setIdle: true,
            setBusy: true,
            setMonitor: true,
            setHangup: true,
            setOnLine: true,
            messageCount:0,
            /*menu: function(){
                return JSON.parse(localStorage.getItem(CRM_MENU))
            },*/
            activeName: '',
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem(CRM_USER_INFO));
        this.getCallInfo();
        this.getExtStatus();
        this.$store.dispatch('initCurrentLevelOneId');  // 记录一级菜单ID
        this.$store.dispatch('updateCurrentSubMenu', this.$store.state.navigation.currentLevelOneId);   // 根据一级菜单ID找到二级菜单
        this.$store.dispatch('GetUnreadMessageCount')
    },
    mounted() {
        let nid = localStorage.getItem(CRM_CURRENT_LEVEL_ONE_MENU)
        if (parseUrl().nw != 1 && !nid) {
            nid = '488';
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
            extStatusId: state => {
                return state.navigation.extStatusId;
            }
        })
    },
    watch: {
        extStatusId: function(val) {
            this.setExtStatus(val);
        }
    },
    methods: {
        onMessageList(){
            this.$router.push({ path: '/messageList'})
        },
        handleClick(tab) {
            for (let i in this.menu) {
                if (tab.name == this.menu[i].NavigationId) {
                    if(this.menu[i].Path == 130520){
                        location.href = this.menu[i].Url
                    }else{
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
                this.$router.push({ path: '/login' });
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
        },
        handleExtCommands(command) {//签入 签出
            let extInfo = {
                UserNo: this.userInfo.UserId,
                ExtNo: this.userInfo.PartialPhone
            };
            switch (command) {
                case "signIn":
                    extInfo.Operate = 1;
                    extInfo.OperateType = 1;
                    this.$store.dispatch('signOperate', extInfo);
                    break;
                case "signOut":
                    extInfo.Operate = 2;
                    extInfo.OperateType = 1;
                    this.$store.dispatch('signOperate', extInfo);
                    break;
                case "setIdle":
                    extInfo.Operate = 4;
                    extInfo.OperateType = 2;
                    this.$store.dispatch('signOperate', extInfo);
                    break;
                case "setBusy":
                    extInfo.Operate = 3;
                    extInfo.OperateType = 2;
                    this.$store.dispatch('signOperate', extInfo);
                    break;
                case "setMonitor":
                    this.$router.push({ path: '/callCenter/ExtMonitor' })
                    this.$store.dispatch('updateCurrentTabId', '/callCenter/ExtMonitor');
                    return;
                case "setHangup":
                    this.$store.dispatch('hangupCall', { "ExtNO": extInfo.ExtNo });
                    setTimeout(() => {
                        this.$store.dispatch('getExtStatus', { "ExtNO": extInfo.ExtNo });
                    }, 2000);
                    return;
                default:
                    break;
            }

        },
        setExtStatus: function(statusId) {//设置话机状态
            switch (statusId) {
                case 1:
                    this.signIn = false;
                    this.singOut = true;
                    this.setIdle = true;
                    this.setBusy = true;
                    this.setMonitor = true;
                    this.setHangup = true;
                    this.extStatus = "未签入";
                    break;
                case 2:
                    this.signIn = true;
                    this.singOut = false;
                    this.setIdle = true;
                    this.setBusy = false;
                    this.setMonitor = false;
                    this.setHangup = true;
                    this.extStatus = "空闲中";
                    break;
                case 3:
                    this.signIn = true;
                    this.singOut = false;
                    this.setIdle = false;
                    this.setBusy = true;
                    this.setMonitor = false;
                    this.setHangup = true;
                    this.extStatus = "忙碌中";
                    break;
                case 4:
                    this.signIn = true;
                    this.singOut = true;
                    this.setIdle = true;
                    this.setBusy = true;
                    this.setMonitor = false;
                    this.setHangup = false;
                    this.extStatus = "通话中";
                    break;
                default:
                    break;
            }
        },
        // 打电话
        sendCall() {
            this.$store.dispatch('callUp', {
                UserNo: this.userInfo.UserId,
                FromNo: this.userInfo.PartialPhone,
                ToNo: this.callNum
            })
        },
        // 获取电话记录信息
        getCallInfo() {
            this.$store.dispatch('getCallInfo', this.userInfo.PartialPhone)
        },
        //获取电话状态
        getExtStatus() {
            let queryPrm = { UserNo: this.userInfo.UserId, ExtNo: this.userInfo.PartialPhone };
            this.$store.dispatch('getExtStatus', queryPrm);
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
    width: 80px;
    text-align: center;
}

.crm-navigation .el-tabs__item,
.crm-navigation .el-tabs__item.is-active {
    color: #fff!important;
}

.crm-navigation .el-tabs__content {
    display: none;
}

.crm-navigation .el-tabs__active-bar {
    width: 80px;
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
}
</style>
