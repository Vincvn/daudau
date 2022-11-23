import { createApp } from 'vue'
import { Quasar, LocalStorage } from 'quasar'
import quasarLang from 'quasar/lang/vi'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/eva-icons/eva-icons.css'
import '@quasar/extras/themify/themify.css'
import '@quasar/extras/line-awesome/line-awesome.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import ElementPlus from 'element-plus'
import vi from 'element-plus/dist/locale/vi.mjs'


// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)
myApp.use(ElementPlus, {
    locale: vi,
})

myApp.use(Quasar, {
    plugins: {
        LocalStorage,
    }, // import Quasar plugins and add here
    lang: quasarLang,
    config:{
        dark: true,
    }
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')