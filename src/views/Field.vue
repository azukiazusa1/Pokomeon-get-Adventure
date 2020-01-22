<template>
  <div>
    <div>フィールド{{ id }}</div>
    <encount-pokemon v-if="pokemons" v-bind:pokemons="pokemons"></encount-pokemon>
  </div>
</template>

<script>
import axios from 'axios'
import EncountPokemon from '@/components/EncountPokemon'

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
  },
  components: {
    EncountPokemon
  }
}
</script>