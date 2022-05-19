import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Cookies from 'js-cookie'

import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import './plugins/index'
//import '../../assets/css/element-variables.scss'
// import locale from 'element-plus/lib/locale/lang/fr'
import './permission'
import VueApexCharts from "vue3-apexcharts";
createApp(App)
    .use(VueApexCharts)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')