import Vue from 'vue'
import Axios from 'axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/bulmaswatch.scss'

Vue.config.productionTip = false
Vue.prototype.$http = Axios

const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
