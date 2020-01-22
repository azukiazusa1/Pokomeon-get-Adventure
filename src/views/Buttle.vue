<template>
  <div>
    <div id="anime-area">
        <div id="box-left"></div>
        <div><img v-if="pokemon" :src="this.pokemon.sprites.front_default" /></div>
        <div id="box-right"></div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import anime from 'animejs'
export default {
  data: function() {
    return {
      pokemon: null
    }
  },
  created() {
    this.getPokemon()
  },
  mounted() {
    this.visitingAnime()
  },
  methods: {
    getPokemon: async function() {
      try {
        const url = `${this.$url}pokemon/${this.$route.params.name}`
        const result = await axios.get(url)
        this.pokemon = result.data
      } catch {
        alert('通信エラーが発生しました。')
      }
    },

    visitingAnime: function() {
      const animaTime = 2500
      anime({
        targets: document.getElementById('box-right'),
        translateX: '120%',
        duration: animaTime,
        easing: 'easeInCubic'
      })
      anime({
        targets: document.getElementById('box-left'),
        translateX: '-120%',
        duration: animaTime,
        easing: 'easeInCubic'
      })
    }
  }
}
</script>
<style scoped>
  #anime-area{
    display: flex;
  }
  #box-right {
    width: 50vw;
    height: 100vh;
    background-color: black;
  }
  #box-left {
    width: 50vw;
    height: 100vh;
    background-color: black;
  }
  keyframes fadein {
  0%{
    opacity:0;
  }
  75%{
    opacity:0.5;
  }
  100% {
    opacity:1;
  }
}
/* キーフレームをanimationプロパティで指定 */
#pokemom{
  animation: fadein 3s linear 0s 1;
}

</style>