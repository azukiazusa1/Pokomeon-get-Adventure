<template>
  <div>
    <div id="anime-area">
        <div id="box-left"></div>
        <div id="pokemon">
          <transition mode="in-out" v-on:enter="enter">
            <img :key=1 v-if="show" id="img" :src="require(`@/assets/images/${this.$route.params.name}.png`)" />
            <img :key=2 v-else id="ball" :src="require(`@/assets/ball.png`)" />
          </transition>
          <button @click="throwBall" v-if="show">ぼーるをなげる</button>
          <button @click="$router.go(-1)" v-if="show">にげる</button>
        </div>
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
      pokemon: null,
      show: true
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
    },
    enter: function(dom) {
      if (dom.id === 'ball') {
      const tl = anime.timeline({

      })
      tl
      .add({targets: dom,
        translateX: [-100, 0],
        translateY: [50, -50],
        easing: 'easeInOutCirc'
      })
      .add({targets: dom,
        translateY: 100,
        easing: 'easeInBack'
      })
      .add({
        targets: dom,
        rotate: 50,
      })
      .add({
        targets: dom,
        rotate: -50,
      })
      .add({
        targets: dom,
        rotate: 50,
        complete: this.canGet
      })


      }
    },

    canGet: function() {

        this.show = true

    },

    throwBall: function() {
      this.show = !this.show

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
  #pokemon, img, #ball{
    left: 0;
    right: 0;
    margin: auto;
  }
  #pokemon, #ball {
    position: absolute;
  }
  #ball {
    border-radius: 50%;
    background:linear-gradient(0deg,black 0%,black 50%,red 50%,red 100%);
    width: 10px;
    height: 10px;
  }
  img {
    display: block;
  }

.v-enter-active {
  transition: all .3s ease;
}
.v-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.v-enter, .v-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

</style>