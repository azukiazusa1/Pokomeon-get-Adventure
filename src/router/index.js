import Vue from 'vue'
import VueRouter from 'vue-router'
import Adventure from '@/views/Adventure.vue'
import Top from '@/views/Top.vue'
import Pokedex from '@/views/Pokedex.vue'
import RecentryGet from '@/views/RecentryGet.vue'
import Field from '@/views/Field.vue'
import Buttle from '@/views/Buttle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'top',
    component: Top
  },
  {
    path: '/adventure',
    name: 'adventure',
    component: Adventure
  },
  {
    path: '/pokedex',
    name: 'pokedex',
    component: Pokedex
  },
  {
    path: '/recentry-get',
    name: 'RecentryGet',
    component: RecentryGet
  },
  {
    path: '/field/:id',
    name: 'field',
    component: Field
  },
  {
    path: '/buttle/:id',
    name: 'buttle',
    component: Buttle
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
