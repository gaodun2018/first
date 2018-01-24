import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as home from './modules/home';
import * as resources from './modules/resources';
import * as navigation from './modules/navigation';
import * as course from './modules/course';
import * as outline from './modules/outline';
const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
export default new Vuex.Store({
  getters,
  modules: {
    home,
    resources,
    course,
    outline,
    navigation,
  },
  strict: false
})