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
  import {mapState} from 'vuex';
  import {parseUrl} from 'base';
  import modal from 'vueModal';
  import CrmMessage from '../plugins/message';
//  import Access from '../util/accessControl';
  import {getEnv} from '../util/config';
//  Vue.use(Access);
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
