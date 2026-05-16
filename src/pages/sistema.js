import {createApp} from 'vue';
import App from '@/views/Sistema.vue';

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles';
import {createVuetify} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
  components,
  directives,
});

// Firebase
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
const firebaseConfig = {
  apiKey: 'AIzaSyCc1A8bWAwqsymOwYJ3t7TSMmwpVSesYoo',
  authDomain: 'karaoke-list-fa659.firebaseapp.com',
  projectId: 'karaoke-list-fa659',
  storageBucket: 'karaoke-list-fa659.appspot.com',
  messagingSenderId: '1078852115153',
  appId: '1:1078852115153:web:755cad25a570e1311cc3f0',
  measurementId: 'G-JYD6CWCQJK',
  databaseURL: 'https://karaoke-list-fa659-default-rtdb.firebaseio.com',
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).use(vuetify).use(analytics).mount('#app');
