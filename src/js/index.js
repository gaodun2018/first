import promise from 'es6-promise';
promise.polyfill();
import Vue from 'vue';
import store from './store/index';
import App from './containers/App.vue';
import VueRouter from 'vue-router';
import { routes } from './routes/index';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css'
import '../css/main.less';
import '../css/teaching.css';
import '../css/resources.css';
import '../css/home.css';
import '../css/outline.css';
import '../css/animate.min.css';
import '../iconfont/iconfont.css'
import '../iconfont/iconfont.js';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import { setWindowNID } from './util/config';
import { CRM_MENU } from './util/keys';
import Validate from './util/filter_rules'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.use(ElementUI)
Vue.use(VueRouter);
Vue.use(Validate);
const router = new VueRouter({
    routes
});
//引入全局过滤器
import filters from './filters/index.js'
Object.keys(filters).forEach(key=>Vue.filter(key,filters[key]));

router.beforeEach((to, from, next) => {
    if (!window.CRMMENU) {
        window.CRMMENU = JSON.parse(localStorage.getItem(CRM_MENU));
    }
    setWindowNID(window.CRMMENU, to.path); // window.nid
    if (to.path == '/index') {
        window.nid = 9;
    }
    store.dispatch('updateCurrentSubMenu', window.nid);
    store.dispatch('updateBreadcrumb', to.path);//更新面包屑
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