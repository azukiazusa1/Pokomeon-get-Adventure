<template>
  <div>
    <h2>さいきんつかまえたポケモン</h2>
    <div id="count">きょう：{{ todayCount }}</div>
    <div id="toDaycount">ごうけい：{{ count }}</div>
    <ul v-for="pokemon in limitedRecentryGet"
      :key="pokemon.id">
      <li>
        <div><h2>{{ pokemon.name }}</h2></div>
        <div><img id="poke-img" :src="require(`@/assets/images/${pokemon.englishName}.png`)"/></div>
        <div>つかまえたひ：{{ pokemon.date }}</div>
        <div>つかまえたばしょ：{{ $store.state.HABITAT[pokemon.habitat] }}</div>
      </li>
    </ul>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import anime from 'animejs'
export default {
  data: function() {
    return {
      count: 0,
      todayCount: 0
    }
  },
  mounted () {
    this.setCount(this.recentryGetCount);
    this.setTodayCount(this.todayGetCount);
  },
	methods: {
		setCount(val) {
      const obj = { n: this.count }
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 500,
        easing: 'linear',
        update: () => {
          this.count = obj.n
        }
      })
    },
    setTodayCount(val) {
      const obj = { n: this.todayCount }
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 500,
        easing: 'linear',
        update: () => {
          this.todayCount = obj.n
        }
      })
    }
	},
  computed: mapGetters([
    'limitedRecentryGet',
    'recentryGetCount',
    'todayGetCount',
    ])
}
</script>

<style scoped>
ul {
  color: #FFF;
  font-weight: bold;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0
}
@media screen and (max-width: 480px) {
  li{
    display: inline;
    width:90%;
    height:32%;
    background: #333;
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
    min-height: 260px;
    background: #333;
    box-sizing: border-box;
    margin-right:0.5%;
    margin-top:5px;
    border-radius: 10px
  }
  li:nth-child(3n){
    margin-right: 0.2%;
  }
}
</style>