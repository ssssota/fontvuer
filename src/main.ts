import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = new Store()

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
