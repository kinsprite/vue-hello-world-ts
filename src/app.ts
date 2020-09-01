/* eslint-disable import/prefer-default-export */

import Vue from 'vue';
import { sync } from 'vuex-router-sync';

import App from './App.vue';
import './registerServiceWorker';
import { createRouter } from './router';
import { createStore } from './store';

Vue.config.productionTip = false;

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return { app, router, store };
}
