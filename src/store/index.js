import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const initialState = {
  count: 0,
  pokedex: Array.from(new Array(493).fill({}))
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    increment (state) {
      state.count++
    },
    registPokedex (state, pokeData) {
      if (!state.pokedex[pokeData.id - 1].hasOwnProperty('id')) {
        state.pokedex[pokeData.id - 1] = pokeData
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