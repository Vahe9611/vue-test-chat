import Vue from 'vue';
import moment from 'moment';
import Loading from 'vue-loading-overlay';
import App from './App.vue';

import store from './store';
import router from './router';

import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);

moment.locale('ru');
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
