<template>
  <div id="buttle">
    <flash-message></flash-message>
    <div id="anime-area">
        <div id="box-left"></div>
          <pokemon-details
          @close="$router.go(-1)"
          v-if="modal"
          v-bind:pokemon="pokemon"
          v-bind:species="species"
          v-bind:name="name"
          v-bind:genera="genera"
          v-bind:type="type"
          v-bind:habitat="habitat"
          v-bind:sprites="sprites"
          v-bind:local="local"
        >
        </pokemon-details>
          <div  v-else id="pokemon">
            <transition mode="in-out" v-on:enter="enter">
              <img :key=1 v-if="show" id="img" :src="sprites" />
              <img :key=2 v-else id="ball" :src="require(`@/assets/icon/ball.png`)" />
            </transition>
            <button @click="throwBall" v-if="show">ボールをなげる</button>
            <button @click="$router.go(-1)" v-if="show">にげる</button>
          </div>
        <div id="box-right"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import anime from 'animejs'
import moment from 'moment'
import mixin from '@/mixin'
import PokemonDetails from '@/components/PokemonDetails'
export default {
  data: function() {
    return {
      pokemon: null,
      species: null,
      show: true,
      rateModify: 0,
      modal: false,
      name: null,
      genera: null,
      sprites: require(`@/assets/images/${this.$route.params.name}.png`),
      type: null,
      local: 'JP'
    }
  },
  created() {
    this.getPokemon()
  },
  mounted() {
    this.visitingAnime()
  },
  mixins: [mixin],
  methods: {
    getPokemon: async function() {
      try {
        const result1 = await axios.get(`${this.$url}pokemon-species/${this.$route.params.name}`)
        this.species = result1.data

        const result2 = await axios.get(result1.data.varieties[0].pokemon.url)
        this.pokemon = result2.data
        this.getI18nName()
        this.getI18nGenera()
        this.getTypes()
        this.habitat = this.species.pal_park_encounters[0].area.name
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
        const tl = anime.timeline()
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
      const caputureRate = this.species.capture_rate + this.rateModify
      const random = Math.floor(Math.random()*(100))
      if (random < caputureRate) {
        this.registPokedex()
        this.registRecentryGet()
        this.flash(`やったー！${this.name}をつかまえた！`, 'success', {
          important: true,
          timeout: 1000,
          beforeDestroy: () => {
            this.modal = true
          }
        });
      } else {
        this.show = true
        // 捕獲に失敗するたびに補正をかける
        this.rateModify += 10
      }
    },
    registPokedex: function() {
      const pokeData = {
        id: this.pokemon.id,
        name: this.name,
        englishName: this.$route.params.name,
        genera: this.genera,
        type: this.type,
        height: this.pokemon.height,
        weight: this.pokemon.weight,
        habitat: this.habitat
      }
      this.$store.commit('registPokedex', pokeData)
    },
    registRecentryGet: function() {
      const m = moment().format('YYYY-MM-DD HH:mm')
      const pokeData = {
        id: this.pokemon.id,
        name: this.name,
        englishName: this.$route.params.name,
        date: m,
        habitat: this.habitat
      }
      this.$store.commit('registRecentryGet', pokeData)
    },
    throwBall: function() {
      this.show = !this.show
    },
    a: function() {
      this.modal = true
    }
  },
  components: {
    PokemonDetails
  }
}
</script>
<style scoped>
@media screen and (max-width: 480px) {
   #box-left{
    width: 100vw;
    height: 100vw;
    background-color: black;
    z-index: 1
  }
}

@media screen and (min-width: 481px) {
  #box-left, #box-right {
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 1
  }
}

#ball {
  width: 20px;
  height: 20px;
}

#anime-area{
  display: flex;
}

#pokemon, img, #ball{
  left: 0;
  right: 0;
  margin: auto;
}

#pokemon{
  position: absolute;
  padding-top: 70px
}

#ball {
  position: absolute;
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
.v-enter, .v-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

</style>