<template>
	<div>
	<transition
	v-for="(pokemon, index) in selectEncountPokemons"
	:pokemon="pokemon"
	:key="index"
	>
    <img class="pokeImg" :src="require(`@/assets/sprites/${pokemon.pokemon_species.name}.png`)" @click="startButtle(pokemon.pokemon_species.name)">
	</transition>
</div>
</template>

<script>
import anime from 'animejs'
export default {
	props: {
		pokemons: Array,
	},
  computed: {
    selectEncountPokemons: function() {
      const totalRate = this.pokemons.reduce((previous, current) => {
        return {rate:previous.rate + current.rate}
      })
      const encountPokemons = (pokemons) => {
        const encountPokemons = []
        // 出現数 15~5匹の範囲で出現
        const appearanceNum = Math.floor(Math.random()*(15-5)+5);
        for (let i = appearanceNum; i > 0; i--) {
          const encount = Math.random() * totalRate.rate;
          let searchPosition = 0.0
          for (const pokemon of pokemons) {
            searchPosition += pokemon.rate
            if (encount < searchPosition) {
              encountPokemons.push(pokemon)
              break
            }
          }
        }
        return encountPokemons
      }
      return encountPokemons(this.pokemons)
    },
  },
  methods: {
    startButtle(name) {
      this.$router.push({name: 'buttle', params: {name: name}})
    }
  },
  mounted() {
    const pokeImgs = document.getElementsByClassName('pokeImg')
    Object.keys(pokeImgs).forEach(function(key) {
      anime({
        targets: pokeImgs[key],
        translateX: 250
      })
    })
  },
}
</script>
<style>
<style>
