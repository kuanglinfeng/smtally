import Vue from 'vue'
import VueRouter from 'vue-router'
import Tally from '@/views/Tally.vue'
import Labels from '@/views/Labels.vue'
import Statistics from '@/views/Statistics.vue'
import NotFound from '@/views/NotFound.vue'
import EditLabel from '@/views/EditLabel.vue'

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
    path: '/labels/edit',
    component: EditLabel
  },
  {
    path: '/statistics',
    component: Statistics
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
