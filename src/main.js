import { createApp } from 'vue'
import { createStore } from "vuex"
import App from './App.vue'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      device: null
    }
  },
  mutations: {
    addDevice (state, device) {
      state.device = device;
      console.log("state >>>>>>>>>",state.device)
    }
  }
})


const app = createApp(App).use(store)
app.mount('#app')