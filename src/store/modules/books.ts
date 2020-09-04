import { Module } from 'vuex';
import fetchBooks from '../../api/fetchBooks';
import { BooksState, BookItem, RootState } from '../types';

export const SET_ITEMS = 'setItems';
export const SET_LOADING = 'setLoading';
export const PRICE_SUM = 'priceSum';
export const FETCH_BOOKS = 'fetchBooks';

const booksModule: Module<BooksState, RootState> = {
  state: () => ({
    items: [],
    loading: true,
  }),
  mutations: {
    [SET_ITEMS](state, items: BookItem[]) {
      state.items = items;
    },
    [SET_LOADING](state, loading: boolean) {
      state.loading = loading;
    },
  },
  actions: {
    async [FETCH_BOOKS](context, age: number) {
      const items = await fetchBooks(context.rootState.user.id);
      context.commit(SET_ITEMS, items);
    },
  },
  getters: {
    [PRICE_SUM](state) {
      return (state.items || []).reduce((preVal, cur) => (preVal + cur.price), 0);
    },
  },
};

export default booksModule;
