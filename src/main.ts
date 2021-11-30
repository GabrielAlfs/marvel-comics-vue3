import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from './router';
import BLoading from '@/ui/components/base/BLoading.vue';
import BButton from '@/ui/components/forms/BButton.vue';
import BInput from '@/ui/components/forms/BInput.vue';
import store from './store';

createApp(App)
  .component('b-loading', BLoading)
  .component('b-input', BInput)
  .component('b-button', BButton)
  .use(store)
  .use(router)
  .mount('#app');
