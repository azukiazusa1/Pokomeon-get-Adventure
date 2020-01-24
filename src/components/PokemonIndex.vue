<template>
  <li class="pokemon-index">
      <h3 @click=openModal>{{ pokemon.id }}. {{ name }}</h3>
    <span class="circle">
      <img v-bind:src="sprites" @click=chengeSprites />
    </span>
      <div>{{ type }}</div>
      <div>{{ genera }}</div>
      <div>たかさ: {{ pokemon.height / 10 }}m</div>
      <div>おもさ: {{ pokemon.weight / 10 }}Kg</div>
      <div>
        <pokemon-details
          @close="closeModal"
          v-if="modal"
          v-bind:pokemon="pokemon"
          v-bind:species="species"
          v-bind:name="name"
          v-bind:genera="genera"
          v-bind:type="type"
          v-bind:sprites="sprites"
          v-bind:local="local"
        >
        </pokemon-details>
      </div>
  </li>
</template>

<script>
import axios from 'axios'
import mixin from '@/mixin'
import PokemonDetails from '@/components/PokemonDetails.vue'

export default {
  props: {
    pokemon: Object,
    local: String
  },
  data: function() {
    return {
      species : null,
      name: null,
      genera: null,
      sprites: null,
      type: null,
      types: [],
      modal: false,
      front: true,
      shiny: false,
    }
  },
  mounted () {
    // 色違いの判定
    if (Math.random() < 0.03) {
      this.shiny = true
    }
    this.getSpecies()
    this.getTypes()
  },
  mixins: [mixin],
  methods: {
    getSpecies: async function() {
      try {
        const species = await axios.get(this.pokemon.species.url)
        this.species = species.data
        this.getI18nName()
        this.getI18nGenera()
        this.getSprites()
      } catch(err){
        console.error(err)
      }
    },
    getSprites: function() {
      if (this.shiny) {
          if (this.front) {
            this.sprites = this.pokemon.sprites.front_shiny;
          } else {
            this.sprites = this.pokemon.sprites.back_shiny;
          }
      } else {
        if (this.front) {
          this.sprites =  this.pokemon.sprites.front_default;
        } else {
          this.sprites =  this.pokemon.sprites.back_default;
        }
      }
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    chengeSprites() {
      this.front = !this.front;
    }
  },
  components: {
    PokemonDetails
  }
}

</script>

<style scoped>
@media screen and (max-width: 480px) {
  li{
    display: inline;
    width:90%;
    height:32%;
    background: #FFFFFF;
    box-sizing: border-box;
    margin-right:0.5%;
    margin-top:5px;
    border-radius: 10px
  }
}
@media screen and (min-width: 481px){
  li{
    display: inline;
    width:32%;
    height:32%;
    background: #FFFFFF;
    box-sizing: border-box;
    margin-right:0.5%;
    margin-top:5px;
    border-radius: 10px
  }
  li:nth-child(3n){
    margin-right: 0.2%;
  }
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #ccc;
}
img, h3 {
  cursor: pointer;
}

.pokemon-index {
  text-align: center;
}
h3 {
  text-decoration: underline;
}
img {
  transition-duration: 0.3s;
}
img:hover {
  transform: scale(1.5);
  transition-duration: 0.3s;
}
</style>