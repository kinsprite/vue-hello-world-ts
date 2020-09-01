/* eslint-disable import/prefer-default-export */

import { Store } from 'vuex';
import { Route } from 'vue-router';
import { Component } from 'vue';

export interface AsyncDataParam {
  store: Store<any>,
  route: Route
}

export type AsyncDataComponent = Component & {
  asyncData(param: AsyncDataParam): Promise<any>
};
