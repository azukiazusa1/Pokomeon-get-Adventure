import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$url = 'https://pokeapi.co/api/v2/'
Vue.prototype.$area = {
  kanto: '?offset=0&limit=21',
  johto: '?offset=151&limit=21',
  hohen: '?offset=251&limit=21',
  sinnoh: '?offset=386&limit=21',
};
Vue.prototype.$language = {
  JP: 'ja-Hrkt',
  EN: 'en',
  KO: 'ko',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  IT: 'it',
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
