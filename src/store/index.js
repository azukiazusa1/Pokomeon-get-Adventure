import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

const initialState = {
  count: 0,
  pokedex: Array.from(new Array(493).fill({})),
  recentryGet: [],
  filterQuery: {},
  AREA: {
    kanto: {start:0, end:150},
    johto: {start:151, end:250},
    hohen: {start:251, end:385},
    sinnoh: {start:386, end:492},
  },
  HABITAT: {
    forest: 'もり',
    field: 'へいち',
    mountain: 'やま',
    pond: 'みずうみ',
    sea: 'うみ',
  }
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    registPokedex (state, pokeData) {
      if (!state.pokedex[pokeData.id - 1].hasOwnProperty('id')) {
        state.pokedex[pokeData.id - 1] = pokeData
      }
    },
    setFilterQuery(state, filterQuery) {
      state.filterQuery = {...filterQuery}
    },
    registRecentryGet(state, pokeData) {
      state.recentryGet.unshift(pokeData)
    }
  },
  getters: {
    filteredPokedex (state) {
      let data = state.pokedex
      if (state.filterQuery.area) {
        data = data.slice(state.AREA[state.filterQuery.area].start, state.AREA[state.filterQuery.area].end)
      }

      if (state.filterQuery.word) {
        data = data.filter(v => v.name == state.filterQuery.word)
      }

      if (state.filterQuery.type) {
        const reg = new RegExp(state.filterQuery.type);
        data = data.filter(v => v.type && v.type.match(reg) )
      }

      if (state.filterQuery.habitat) {
        data = data.filter(v => v.habitat && v.habitat === state.filterQuery.habitat)
      }

      return data
    },
    registPokedexCount: (state, getters) => getters.filteredPokedex.filter(v => v.id).length,
    registPokedexCountAll: (state, getters) => getters.filteredPokedex.length,
    limitedRecentryGet: (state) => state.recentryGet.slice(0, 20),
    recentryGetCount: (state) => state.recentryGet.length,
    todayGetCount: (state) => {
      const today = moment().startOf('days')
      return state.recentryGet.filter(v => moment(v.date).isAfter(today)).length
    }
  },
  plugins: [createPersistedState()]
})