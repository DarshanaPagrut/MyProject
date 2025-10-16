import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Auto-detect dark mode from user's system preference
try {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    vuetify.framework.theme.dark = true;
  }
} catch (e) {
  // Silently fail if matchMedia is not supported
}
