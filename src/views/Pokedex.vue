<template>
  <div id="pokedex">
<!--     <search-box
      v-bind:area.sync="area"
      v-bind:local.sync="local"
      v-bind:word.sync="word"
      v-bind:type.sync="type"
    ></search-box> -->
    <div id="main">
      <ul>
        <pokemon-index
          v-for="(pokemon, index) in pokemons"
          v-bind:pokemon="pokemon"
          v-bind:local="local"
          v-bind:index="index"
          :key="index"
        ></pokemon-index>
      </ul>
        <div id="next">
          <p v-if="empty" id="empty">見つかりませんでした。</p>
          <p v-else-if="loading">Now Loading...</p>
          <p v-else-if="next" @mouseover="get(next)">もっとみる</p>
        </div>
    </div>
  </div>
</template>

<script>
import PokemonIndex from '@/components/PokemonIndex.vue'
// import SearchBox from '@/components/SearchBox.vue'

export default {
  name: 'app',
  data: function() {
    return {
      pokemons: this.$store.state.pokedex,
      loading: true,
      next: null,
      empty: false,
      area: 'kanto',
      word: null,
      type: null,
      local: 'JP'
    }
  },
  components: {
    // SearchBox,
    PokemonIndex,
  }
}

</script>

<style scoped>
#pokedex{
  padding:0;
  width:100%;
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
p {
  padding: 0.5em 1em;
  text-decoration: none;
  background: #668ad8;/*ボタン色*/
  color: #FFF;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
}

</style>