import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/icons"
import SvgIcon from "@/components/SvgIcon";
import "@/styles/index.less"
import directives from '@/directives'

const app = createApp(App)
app.component("SvgIcon",SvgIcon)
app.use(store).use(router).use(directives).mount('#app')
