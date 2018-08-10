// Vue
import Vue from 'vue'
import App from './App.vue'

// VueAxios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// VueLodash
import VueLodash from 'vue-lodash'

Vue.use(VueLodash)

// VueNumerals
import VueNumerals from 'vue-numerals'

Vue.use(VueNumerals)

// Settings
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// Hotory
import '../node_modules/hotory/index.styl'

new Vue({
    render: h => h(App)
}).$mount('#app')
