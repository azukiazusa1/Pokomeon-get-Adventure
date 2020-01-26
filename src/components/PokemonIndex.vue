<template>
  <li class="pokemon-index" v-if="registered">
      <h3 id="poke-name" @click=openModal>{{ pokemon.id }}. {{ pokemon.name }}</h3>
    <span class="circle">
      <img id="poke-img" v-bind:src="require(`@/assets/images/${this.pokemon.englishName}.png`)"/>
    </span>
      <div>{{ pokemon.type }}</div>
      <div>{{ pokemon.genera }}</div>
      <div>たかさ: {{ pokemon.height / 10 }}m</div>
      <div>おもさ: {{ pokemon.weight / 10 }}Kg</div>
      <div>
<!--         <pokemon-details
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
        </pokemon-details> -->
      </div>
  </li>
  <li v-else>
    <h3>{{ index + 1 }}.  ???? </h3>
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
// import PokemonDetails from '@/components/PokemonDetails.vue'

export default {
  props: {
    pokemon: Object,
    local: String,
    index: Number
  },
  data: function() {
    return {
      species : null,
      name: null,
      genera: null,
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
  methods: {
    isRegistered() {
      this.registered = this.pokemon.hasOwnProperty('id')
    },
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    }
  },
  // components: {
  //   PokemonDetails
  // }
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