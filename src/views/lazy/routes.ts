import { RouteConfig } from 'vue-router';
import LazyPage from './LazyPage.vue';

const LazySub = () => import(/* webpackChunkName: "lazy-sub" */ './LazySub.vue');

const routes: Array<RouteConfig> = [
  {
    path: '/lazy',
    name: 'Lazy',
    component: LazyPage,
    children: [
      {
        path: 'sub',
        name: 'LazySub',
        component: LazySub,
      },
    ],
  },
];

export default routes;
