/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import Vuex from 'vuex';

import { fetchItem } from '../api';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      items: {},
    },
    mutations: {
      setItem(state, { id, item }) {
        Vue.set(state.items, id, item);
      },
    },
    actions: {
      fetchItem({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then((item) => {
          commit('setItem', { id, item });
        });
      },
    },
    modules: {
    },
  });
}
