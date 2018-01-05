import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as home from './modules/home';
import * as resources from './modules/resources';
import * as navigation from './modules/navigation';
const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);
export default new Vuex.Store({
  getters,
  modules: {
    home,
    resources,
    navigation,
  },
  strict: false
})