import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const initialState = {
  count: 0
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    increment (state) {
      state.count++
    }
  },
  plugins: [createPersistedState()]
})