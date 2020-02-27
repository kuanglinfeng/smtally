import Vue from 'vue'
import VueRouter from 'vue-router'
import Tally from '@/views/Tally.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/tally'
  },
  {
    path: '/tally',
    component: Tally
  },
  {
    path: '/labels',
    component: Labels
  },
  {
    path: '/statistics',
    component: Statistics
  }
]

const router = new VueRouter({
  routes
})

export default router
