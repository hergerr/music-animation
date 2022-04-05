import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';
import AudioStore from './store/Audio.store';


createApp(App)
    .use(createStore({
        modules: {
            Audio: AudioStore
        }
    }))
    .mount('#app');
