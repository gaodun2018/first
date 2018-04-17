// import promise from 'es6-promise';
// promise.polyfill();
import Vue from 'vue';
if (process.env.NODE_ENV === 'development') {
    require('element-ui/lib/theme-chalk/index.css')
    const ELEMENT = require('element-ui')
    Vue.use(ELEMENT)
    Vue.use(VueRouter)
}
import store from './store/index';
import App from './App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes/index';

import './less/main.less';
import './less/teaching.css';
import './less/resources.css';
import './less/home.css';
import './less/outline.css';
import './less/animate.min.css';
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.js';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/_examples/editor_api.js'

import { setWindowNID, setWindowNBID, formatRoute, checkIsAuth } from './util/config';
import { SAAS_MENU, SAAS_CURRENT_MENU } from './util/keys';
import Validate from './util/filter_rules'
import VueJsonp from 'vue-jsonp'
import { Message } from 'element-ui';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import Service from './api/index'
Vue.prototype.$http = Service
Vue.prototype.message = Message
Raven
    .config('http://e4bd12ab2d1a43efb7fd822b5a89fd30@sentry.gaodunwangxiao.com/22')
    .addPlugin(RavenVue, Vue)
    .install();
Vue.use(VueJsonp)
Vue.use(Validate);

const router = new VueRouter({
    routes
});
//引入全局过滤器
import filters from './filters/index.js'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

router.beforeEach((to, from, next) => {
    if (!window.SAASMENU) {
        window.SAASMENU = JSON.parse(localStorage.getItem(SAAS_MENU));
    }

    if (to.path == '/home' || to.path == '/login') {
        window.nbid = '';
        window.nid = '';
    }
    // if (to.path == '/home') {
    //     window.nid = 9;
    // }
    // console.log(window.nid, 'this is index  window.nid');
    // store.dispatch('updateCurrentSubMenu', window.nid);
    // store.dispatch('updateBreadcrumb', to.path);//更新面包屑

    setWindowNBID(window.SAASMENU, to.path); // window.nid
    checkIsAuth(window.SAASMENU, window.nbid); //检查是否有权限
    if (!window.isAuth) {
        next({ path: '/home' });
        Message({
            message: '您暂未开通权限！'
        })
        return;
    }
    store.dispatch('updateCurrentMenu', window.nbid);
    // if (!window.SAASCURRENTMENU) {
    window.SAASCURRENTMENU = JSON.parse(localStorage.getItem(SAAS_CURRENT_MENU));
    // }
    setWindowNID(window.SAASCURRENTMENU, to.path); // window.nid
    store.dispatch('updateCurrentSubMenu', window.nid);

    //格式化菜单
    formatRoute(JSON.parse(localStorage.getItem(SAAS_CURRENT_MENU)), to.path);
    store.dispatch('updateBreadcrumb', to.path); //更新面包屑

    document.title = `高顿教育 ${to.meta.title}` || '高顿教育'
    if (!to.query.url && from.query.url) {
        to.query.url = from.query.url
    }
    setTimeout(() => {
        store.dispatch('updateCurrentTabId', to.path);
    }, 0)
    next();
});
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');