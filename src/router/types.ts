import Vue from 'vue';
import { Store } from 'vuex';
import VueRouter, { RawLocation } from 'vue-router';
import { RootState } from '../store/types';

export interface InitModule {
  (args: {
    app: Vue,
    router: VueRouter,
    store: Store<RootState>,
  }): any
}

export interface TransitionTo {
  (location: RawLocation,
    onComplete?: (...args: any[]) => any,
    onAbort?: (...args: any[]) => any): void
}
