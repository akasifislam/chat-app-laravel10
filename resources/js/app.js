import './bootstrap';

import Alpine from 'alpinejs';
import { createApp } from 'vue';
import MainApp from './components/MainApp.vue';
import store from './store'; // Import your Vuex store

const app = createApp(MainApp);

app.use(store); // Use Vuex store
app.mount('#app');

window.Alpine = Alpine;
Alpine.start();
