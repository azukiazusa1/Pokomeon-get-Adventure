import Vue from 'vue'
import VueFlashMessage from 'vue-flash-message';
import App from './App.vue'
import router from './router'
import store from './store'
require('vue-flash-message/dist/vue-flash-message.min.css');
Vue.config.productionTip = false
Vue.prototype.$url = 'https://pokeapi.co/api/v2/'
Vue.prototype.$language = {
  JP: 'ja-Hrkt',
  EN: 'en',
  KO: 'ko',
  FR: 'fr',
  DE: 'de',
  ES: 'es',
  IT: 'it',
};

Vue.use(VueFlashMessage);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
