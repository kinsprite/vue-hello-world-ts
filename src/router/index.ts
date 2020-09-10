/* eslint-disable import/prefer-default-export */

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import { TransitionTo } from './types';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import(/* webpackChunkName: "books" */ '../views/BooksPage.vue'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

export function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });

  const { history } = router as any;
  const originalTransitionTo = history.transitionTo as TransitionTo;

  const transitionTo: TransitionTo = function transitionTo(location, onComplete?, onAbort?) {
    const path = (typeof location === 'string') ? location : (location.path as string);

    if (path.match(/^\/lazy(\/.*)?$/)) {
      import(/* webpackChunkName: "lazy" */ '../views/lazy').then(({ initModule }) => {
        const { app } = router;

        initModule({
          app, router, store: app.$store,
        });

        originalTransitionTo.call(history, location, onComplete, onAbort);
      }, (err) => {
        console.error('[ERROR] Lazy routes failed.', err);
        // Do non-thing when error
        if (onAbort) {
          onAbort(err);
        }
      });
    } else {
      originalTransitionTo.call(history, location, onComplete, onAbort);
    }
  };

  history.transitionTo = transitionTo;
  return router;
}
