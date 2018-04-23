import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import common from './modules/common';
import resources from './modules/resources';
import navigation from './modules/navigation';
import course from './modules/course';
import outline from './modules/outline';
const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        common,
        home,
        resources,
        course,
        outline,
        navigation
    },
    strict: false
})