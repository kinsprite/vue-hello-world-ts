import routes from './routes';
import LazyPage from './LazyPage.vue';
import { InitModule } from '../../router/types';
import lazyModule from './store';

const initModule: InitModule = ({ router, store }) => {
  if (!store.hasModule('lazy')) {
    store.registerModule('lazy', lazyModule, { preserveState: !!store.state.lazy });
    router.addRoutes(routes);
  }
};

export {
  initModule,
};

export default LazyPage;
