// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import VueCookie from 'vue-cookie'
import Vuetify from 'vuetify'
import Authentication from '@/components/pages/Authentication'
// import('../node_modules/vuetify/dist/vuetify.min.css')
require('./stylus/main.styl')

Vue.use(VueCookie)
Vue.use(Vuetify)
const options = {
  duration: '0.3',              // `animation-duration`
  firstEntryDisable: false,     // When the value is true, in the process of the user into the app, app no transition effect,the default is false
  firstEntryDuration: '.6',     //
  // forwardAnim: 'fadeInRight',   // Forward transition effect,the default is fadeInRight
  // backAnim: 'fadeInLeft',       // Back transition effect,the default is fadeInLeft
  sameDepthDisable: false,      // When the url depth is the same, the effect is disabled,the default is false
  // tabs: [
  //   {
  //     name: 'home'
  //   },
  //   {
  //     name: 'my'
  //   }
  // ],                       // the default is [],'name' is the name of the route,to achieve in the app click on the tab,the page horizontal transition effects,such as tabs[1] to tab [0],will use the backAnim effect,tabs[1] to tabs[2],will use the forwardAnim effect
  tabsDisable: false,           // when the value is true,disable the effect of the page in tabs,the default is false
  disable: true               // disable transition effect,the default is false,nested route default is true
}
Vue.use(vueg, router, options)

Vue.config.productionTip = false

Authentication.checkAuthentication()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
