import './bootstrap';

import Alpine from 'alpinejs';

import { createApp } from 'vue';
import MainApp from './components/MainApp.vue';

createApp(MainApp).mount('#app');


window.Alpine = Alpine;

Alpine.start();
