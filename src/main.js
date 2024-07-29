import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Vuex store
import store from './api/apiStore'

// Router
import router from './router'

// Components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')
