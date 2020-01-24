import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const initialState = {
  count: 0,
  pokedexIds: []
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    increment (state) {
      state.count++
    },
    registId (state, id) {
      if (!state.pokedexIds.includes(id)) {
        state.pokedexIds.push(id)
      }
    }
  },
  getters: {
    isRegistedId: (state) => (id) => {
      return state.pokedexIds.includes(id)
    }
  },
  plugins: [createPersistedState()]
})