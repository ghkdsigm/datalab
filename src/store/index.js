import { createStore } from 'vuex';
//import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
    };
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    
  },
  plugins: [
    // createPersistedState({
    //   key: 'vuexStore',
    //   storage: window.sessionStorage,
    // }),
  ],
});

export default store;