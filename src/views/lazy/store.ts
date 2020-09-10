import { Module } from 'vuex';
import fetchLazy from '../../api/fetchLazy';
import { LazyState, RootState } from '../../store/types';

export const SET_VALUE = 'SET_VALUE';
export const FETCH_LAZY = 'FETCH_LAZY';

const lazyModule: Module<LazyState, RootState> = {
  namespaced: true,
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
