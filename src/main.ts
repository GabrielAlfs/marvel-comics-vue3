import { createApp } from 'vue';
import '@/ui/assets/index.css';
import router from '@/application/router';
import store from '@/application/store';
import App from '@/ui/App.vue';
import BLoading from '@/ui/components/base/BLoading.vue';
import BButton from '@/ui/components/forms/BButton.vue';
import BInput from '@/ui/components/forms/BInput.vue';

createApp(App)
  .component('b-loading', BLoading)
  .component('b-input', BInput)
  .component('b-button', BButton)
  .use(store)
  .use(router)
  .mount('#app');
