<template>
  <li class="pokemon-index" v-if="registered">
      <h3 id="poke-name" @click=openModal>{{ pokemon.id }}. {{ name }}</h3>
    <span class="circle">
      <img id="poke-img" v-bind:src="sprites"/>
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
  <li v-else>
    <h3>{{ pokemon.id }}.  ???? </h3>
    <span>
      <img :src="require(`@/assets/none.jpg`)"/>
    </span>
      <div>《??》</div>
      <div>??ポケモン</div>
      <div>たかさ: ??m</div>
      <div>おもさ: ??Kg</div>
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
      sprites: require(`@/assets/images/${this.pokemon.name}.png`),
      type: null,
      types: [],
      modal: false,
      front: true,
      shiny: false,
      registered: false
    }
  },
  created () {
    this.isRegistered()
  },
  mounted () {
    if (this.registered) {
      this.getSpecies()
      this.getTypes()
    }
  },
  mixins: [mixin],
  methods: {
    getSpecies: async function() {
      try {
        const species = await axios.get(this.pokemon.species.url)
        this.species = species.data
        this.getI18nName()
        this.getI18nGenera()
      } catch(err){
        console.error(err)
      }
    },
    isRegistered: function() {
      this.registered = this.$store.getters.isRegistedId(this.pokemon.id)
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
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
#poke-img, #pokeName {
  cursor: pointer;
}

#poke-img:hover {
  transition-duration: 0.3s;
  transform: scale(1.5);
  transition-duration: 0.3s;
}
.pokemon-index {
  text-align: center;
}

#poke-name {
  text-decoration: underline;
}
</style>