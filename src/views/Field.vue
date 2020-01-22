<template>
  <div>
    <div>フィールド{{ id }}</div>
    <encount-pokemon v-if="pokemons" v-bind:pokemons="pokemons"></encount-pokemon>
    <footer>
    <button @click="reload">もっとさがしてみる</button>
    <router-link to="/adventure">ちがうばしょをさがしてみる</router-link>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
const EncountPokemon = function () {
  return import('@/components/EncountPokemon')
}


export default {
  data: function() {
    return {
      id: this.$route.params.id,
      pokemons: null
    }
  },
  created() {
    this.getFieldPokemons()
  },
  methods: {
    getFieldPokemons: async function() {
      const url = `${this.$url}pal-park-area/${this.id}`
      const result = await axios.get(url)
      this.pokemons = result.data.pokemon_encounters
    },
    reload() {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    }
  },
  components: {
    EncountPokemon
  }
}
</script>