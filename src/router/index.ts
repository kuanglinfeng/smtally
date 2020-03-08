import Vue from 'vue'
import VueRouter from 'vue-router'
import MyOutlayTag from '@/views/Tally/MyOutlayTagList.vue'
import MyIncomeTag from '@/views/Tally/MyIncomeTagList.vue'
import Tally from '@/views/Tally/Tally.vue'
import OutlayTagList from '@/views/Tally/OutlayTagList.vue'
import IncomeTagList from '@/IncomeTagList.vue'
import Detail from '@/views/Detail.vue'
import Chart from '@/views/Chart.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/tally',
    name: 'Tally',
    component: Tally,
    redirect: '/tally/outlay',
    children: [
      {
        path: 'outlay',
        name: 'Outlay',
        component: MyOutlayTag
      },
      {
        path: 'income',
        name: 'Income',
        component: MyIncomeTag
      },
    ]
  },
  {
    path: '/outlayTagList',
    name: 'OutlayTagList',
    component: OutlayTagList
  },
  {
    path: '/incomeTagList',
    name: 'IncomeTagList',
    component: IncomeTagList
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/chart',
    name: 'Chart',
    component: Chart
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
