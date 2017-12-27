import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as home from './modules/home';
import * as cluesManage from './modules/cluesManage';
import * as message from './modules/message';
import * as order from './modules/order';
import * as product from './modules/product';
import * as channel from './modules/channel';
import * as CustomerSource from './modules/CustomerSource';
import * as SourceDetails from './modules/SourceDetails';
import * as navbar from './modules/navbar';
import * as listen from './modules/listen';
import * as navigation from './modules/navigation';
import * as MarketingActivity from './modules/cluesManage';
const debug = process.env.NODE_ENV !== 'production';
import * as SaleNewClueList1 from './modules/cluesManage';
import * as callInfo from './modules/callinfo'
Vue.use(Vuex);
export default new Vuex.Store({
    getters,
    modules: {
        home,
        cluesManage,
        message,
        order,
        product,
        channel,
        navbar,
        navigation,
        listen,
        CustomerSource,
        SourceDetails,
        MarketingActivity,
        SaleNewClueList1,
        callInfo
    },
    strict: false
})