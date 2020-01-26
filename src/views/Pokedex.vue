<template>
  <div id="pokedex">
    <h2> つかまえたかず：{{ registPokedexCount }} / {{ registPokedexCountAll }} </h2>
    <search-box
      id="search-box"
      v-if="searchBox"
      v-bind:area.sync="filterQuery.area"
      v-bind:word.sync="filterQuery.word"
      v-bind:type.sync="filterQuery.type"
      v-bind:habitat.sync="filterQuery.habitat"
      @close="searchBox = false"
    ></search-box>
    <div @click="searchBox = false">
      <a @click.stop.prevent="searchBox = !searchBox"><img :src="require(`@/assets/icon/search.png`)" id="search-btn"/></a>
      <div id="main">
        <ul>
          <pokemon-index
            v-for="(pokemon, index) in filteredPokedex"
            v-bind:pokemon="pokemon"
            v-bind:local="local"
            v-bind:index="index + (filterQuery.area ? $store.state.AREA[filterQuery.area].start : 0)"
            :key="index"
          ></pokemon-index>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PokemonIndex from '@/components/PokemonIndex.vue'
import SearchBox from '@/components/SearchBox.vue'

export default {
  name: 'app',
  data: function() {
    return {
      pokemons: [],
      searchBox: false,
      count: 0,
      word: null,
      type: null,
      filterQuery: {
        area: '',
        word: '',
        type: '',
        habitat: '',
      },
      local: 'JP'
    }
  },
  created(){
    this.$store.commit('setFilterQuery', this.filterQuery)
  },
  methods: {
    handleChangeQuery() {
      this.$store.commit('setFilterQuery', this.filterQuery)
    },
  },
  computed: {
    ...mapGetters([
      'filteredPokedex',
      'registPokedexCount',
      'registPokedexCountAll'
    ]),
  },
  watch: {
    filterQuery: {
      handler: function() {
        this.handleChangeQuery()
      },
      deep: true
    },
    registPokedexCount: function() {
      this.setCount(this.registPokedexCount)
    }
  },
  components: {
    SearchBox,
    PokemonIndex,
  },
}

</script>

<style scoped>
h2{
  color: #FFF
}
#pokedex{
  padding:0;
  width:100%;
  height: 100vh;
  overflow-y: scroll;
  clear:both;
  background: #F35F57;
}

#pokedex ul{
  display: flex;
  -webkit-justify-content: flex-start;
  justify-content: flex-start;
  text-decoration: none;
  flex-wrap: wrap;
}

#main {
  padding-top: 60px;
}

#next {
  cursor : pointer;
  text-align: center;
  font-size: 25px;
}
#empty {
  position: absolute;
  top:50%;
  left: 0;
  right: 0;
  margin: auto;
}

#search-btn {
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 20px;
}

p {
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
}

</style>