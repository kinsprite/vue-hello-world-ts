import routes from './routes';
import LazyPage from './LazyPage.vue';
import { InitModule } from '../../router/types';
import lazyModule from './store';

const initModule: InitModule = ({ router, store, output }) => {
  if (!store.hasModule('lazy')) {
    store.registerModule('lazy', lazyModule, { preserveState: true });
    router.addRoutes(routes);
    output.firstLoading = true;
  }
};

export {
  routes,
  initModule,
};

export default LazyPage;
