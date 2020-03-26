import Vue from 'vue'
import ECharts from 'echarts'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.prototype.$echarts = ECharts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')