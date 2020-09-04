import { Module } from 'vuex';
import { UserState, RootState } from '../types';

export const SET_USER = 'setUser';
export const SET_AGE = 'setAge';
export const SET_NAME = 'setName';
export const DOUBLE_AGE = 'doubleAge';
export const SET_AGE_ASYNC = 'setAgeAsync';

const userModule: Module<UserState, RootState> = {
  state: () => ({
    id: 0,
    age: 0,
    name: '',
  }),
  mutations: {
    [SET_USER](state, user: UserState) {
      Object.assign(state, user);
    },
    [SET_AGE](state, age: number) {
      state.age = age;
    },
    [SET_NAME](state, name: string) {
      state.name = name;
    },
  },
  actions: {
    [SET_AGE_ASYNC](context, age: number) {
      Promise.resolve().then(() => {
        context.commit(SET_AGE, age);
      });
    },
  },
  getters: {
    [DOUBLE_AGE](state) {
      return state.age * 2;
    },
  },
};

export default userModule;
