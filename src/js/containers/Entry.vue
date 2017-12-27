<template>
  <div id="app">
    <div class="container">
      <div style="margin-bottom: 0">
        <Navbar></Navbar>
      </div>
      <div v-if="!this.$route.query.NavigationId" class="content-menu">
        <Menu></Menu>
      </div>
      <section class="content-container" :style="this.$route.query.NavigationId && 'margin-left: 0'">
        <Breadcrumb></Breadcrumb>
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
    transition: all .3s
  }

  .fade-enter,
  .fade-leave-active {
    transition: all .3s;
    opacity: 0
  }

  .fold-enter-active {
    animation-name: fold-in;
    animation-duration: .1s;
  }

  .fold-leave-active {
    animation-name: fold-out;
    animation-duration: .1s;
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
  import Vue from 'vue';
  import Navbar from '../containers/Navigation.vue';
  import Menu from './Menu.vue';
  import Breadcrumb from './Breadcrumb.vue';
  import {messageTitle} from '../util/util';
  import {CRM_MENU, CRM_USER_INFO, CRM_TOKEN} from '../util/keys';
  import {getCookie, setCookie} from 'cookieUtils';
  import {CallInClues} from '../api/message';
  import {mapState} from 'vuex';
  import {parseUrl} from 'base';
  import modal from 'vueModal';
  import CrmMessage from '../plugins/message';
  import Access from '../util/accessControl';
  import {getEnv} from '../util/config';
  Vue.use(Access);
  export default {
    name: 'app',
    components: {
      Navbar,
      Menu,
      Breadcrumb,
    },
    data() {
      return {}
    },
    created() {
      this.mapMenuToWindow();
      this.mapPageIdToWindow();
    },
    methods: {
      loadMessage() {
        let prefix = getEnv();
        let userInfo = localStorage.getItem(CRM_USER_INFO);
        userInfo && (userInfo = JSON.parse(userInfo));
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.src = `//s.gaodun.com/web/scripts/widget/socket.io.min.js`
        window.crmSocket = null;
        script.onload = () => {
          //window.crmSocket = io(`https://${prefix}message.gaodunwangxiao.com:3002`, {
          //  path: '/crm',
          //  reconnection: true
          //});
          // window.crmSocket = io(`http://localhost:3002`, {
          //     path: '/crm',
          //     //reconnection: true
          // });
          //window.crmSocket.on('connect', () => {
           // if (window.socketReconnect === 1) {
              //location.reload();
          //  }
          //  crmSocket.emit('sendUserInfo', {
          //    UserId: userInfo.UserId,
          //    PartialPhone: userInfo.PartialPhone,
          //  });
          //  crmSocket.on('message', (message) => {
          //    this.handleMessage(message);
          //   this.MessageBrowser(message);
          //  });
          //  window.socketReconnect = 1;
          //});
          //window.crmSocket.on('disconnect', function () {
          //  console.log("与服务其断开!");
          //  window.socketReconnect = 0;
          //});
        }
        document.getElementsByTagName('head')[0].appendChild(script);
      },
      handleMessage(msg) {
        if (!msg.Data && !msg.data) {
          return;
        }
        if (this[`messageType${msg.MessageType}`]) {
          this[`messageType${msg.MessageType}`](msg);
          return;
        }
        CrmMessage.create({
          type: 'info',
          message: msg.Data
        });
      },
      // 振铃
      messageType10000(msg) {
        if (msg.data) {
          this.$store.dispatch("setCallInfo", msg.data.RecordId)
        }
        //alert(this.$store.state.callInfo.RecordId);
      },
      // 挂断电话获取通话记录信息
      messageType10003(msg) {
        let vself = this;
        setTimeout(function () {
          vself.$store.dispatch('getCallInfo', msg.ExtId);
        }, 1000);
        setTimeout(function () {
          vself.$store.dispatch('getExtStatus', {"ExtNo": msg.ExtId});
        }, 1000);
      },
      // 来电信息
      messageType10004(msg) {
        CallInClues({phoneNo: msg.data.FromNo}).then(ret => {
          if (ret.status === 0) {
            this.CallInData = ret.result;
            let CallFromNo = {
              FromNo: msg.data.FromNo,
              ToNo: msg.data.ToNo
            }
            require.ensure([], (require) => {
              let CallIn = require("../components/message/CallIn.vue");
              modal.openComponent(CallIn, {
                title: '来电信息',
                showCancelButton: false,
                width: '950px',
                CallInData: ret.result,
                CallFromNo,
                self: this
              });
            }, 'CallIn');
          }
        })
      },
      messageDesktop(msg) {
        if (Notification.permission == "granted") {
          let text = msg.Data;
          if (!text)
            return;
          var notification = new Notification("消息提示:", {
            body: text.replace(/<[^>]+>/g, "")
          });
          notification.onclick = function () {
            window.focus();
            notification.close();
          };
        }
      },
      MessageBrowser(message) {
        messageTitle.show();
        setTimeout(() => {
          messageTitle.clear();
        }, 5000)
        window.onfocus = function () {
          messageTitle.clear();
        };
        document.onfocusin = function () {
          messageTitle.clear();
        };
        if (window.Notification) {
          if (Notification.permission == "granted") {
            this.messageDesktop(message);
          } else if (Notification.permission != "denied") {
            Notification.requestPermission(function (permission) {
              this.messageDesktop(message);
            });
          }
        } else {
          console.log('浏览器不支持Notification');
        }
      },
      messageType20014(msg) {
        CrmMessage.create({
          type: 'car', // car ,plane
          message: msg.Data
        });
      },
      messageType20015(msg) {
        CrmMessage.create({
          type: 'balloon', // car ,plane
          message: msg.Data
        });
      },
      messageType20016(msg) {
        CrmMessage.create({
          type: 'plane', // car ,plane
          message: msg.Data
        });
      },
      mapMenuToWindow() {
        let menu = localStorage.getItem(CRM_MENU);
        window.Menu = JSON.parse(menu);
      },
      mapPageIdToWindow() {
        var mapMethod = menu => {
          for (var i in menu) {
            if (menu[i].ChildNavigations) {
              mapMethod(menu[i].ChildNavigations);
            }
          }
        }
        mapMethod(window.Menu);
      },
    },
    computed: {
      ...mapState({
        count: state => {
          return state.list.number
        }
      }),
    },
    destroyed() {

    },
    mounted() {
//      this.loadMessage();
    }
  }
</script>
