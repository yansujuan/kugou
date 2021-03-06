import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mint from 'mint-ui'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.min.css'
import '../static/css/neat-min.css'
import './assets/css/style.css'

Vue.use(mint)
Vue.use(VueResource)

new Vue({
	el:"#app",
	router,
	store,
	render:h=>h(App)
})