import { Module } from 'vuex';
import fetchLazy from '../../api/fetchLazy';
import { LazyState, RootState } from '../../store/types';

export const SET_VALUE = 'setValue';
export const FETCH_LAZY = 'fetchLazy';

const lazyModule: Module<LazyState, RootState> = {
  state: () => ({
    value: 0,
  }),
  mutations: {
    [SET_VALUE](state, value: number) {
      state.value = value;
    },
  },
  actions: {
    async [FETCH_LAZY](context) {
      const value = await fetchLazy();
      context.commit(SET_VALUE, value);
    },
  },
};

export default lazyModule;
