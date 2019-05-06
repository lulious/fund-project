import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element.js'
import axios from './apis'
import GLOBAL_CONFIG from './global.config'
Vue.use(axios)
Vue.use(GLOBAL_CONFIG)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
