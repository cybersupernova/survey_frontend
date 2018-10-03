import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './routes'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.prototype.$env = { baseUrl: "//54.149.123.123:3000/api" }

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
