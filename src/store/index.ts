import Vue from 'vue';
import Vuex from 'vuex';
import userModule from './modules/user';
import eventModule from './modules/event';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    event: eventModule,
  },
});
