<template>
  <div>
    <div id="anime-area">
        <div id="box-left"></div>
        <div id="pokemon"><img :src="require(`@/assets/images/${this.$route.params.name}.png`)" /></div>
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
  #box-left, #box-right {
    width: 50vw;
    height: 100vh;
    background-color: black;
    z-index: 1
  }
  #pokemon {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }

</style>