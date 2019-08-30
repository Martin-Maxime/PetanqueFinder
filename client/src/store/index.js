import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug
});

const store = new Vuex.Store({
  state: {
    requests: [{}]
  },
  getters: {
    REQUESTS: (state) => {
      return state.requests;
    }
  },
  mutations: {
    SET_REQUEST: (state, payload) => {
      state.push(payload);
    }
  }
});
