import Vue from 'vue'
import Vuex from 'vuex'
// import FastClick from 'fastclick'
import router from './router'
import App from './App'
import store from './store'
// require('es6-promise').polyfill()
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(Vuex)
Vue.use(MintUI)

// FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
