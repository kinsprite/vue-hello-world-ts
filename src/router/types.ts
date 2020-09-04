import Vue from 'vue';
import { Store } from 'vuex';
import VueRouter from 'vue-router';
import { RootState } from '../store/types';

export interface InitModule {
  (args: {
    app: Vue,
    router: VueRouter,
    store: Store<RootState>,
    output: {
      firstLoading: boolean,
    },
  }): any
}
