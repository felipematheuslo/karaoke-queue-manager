import {createApp} from 'vue';
import App from '@/views/Home.vue';

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
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createApp(App).use(vuetify).mount('#app');
