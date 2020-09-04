/* eslint-disable import/prefer-default-export */

import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

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

  router.beforeEach((to, from, next) => {
    if (to.path.match(/^\/lazy(\/.*)?$/)) {
      import(/* webpackChunkName: "lazy" */ '../views/lazy').then(({ initModule }) => {
        const { app } = router;
        const output = { firstLoading: false };
        initModule({
          app, router, store: app.$store, output,
        });

        if (output.firstLoading) {
          console.log(from);

          if (from.matched.length === 0) {
            // Page F5
            next('/');
            router.replace(to.path);
          } else {
            // From others
            next(false);
            Promise.resolve().then(() => router.push(to.path));
          }
        } else {
          next();
        }
      }, (e) => {
        console.error('[ERROR] Lazy routes failed.', e);
        next(false);
      });
    } else {
      next();
    }
  });

  return router;
}
