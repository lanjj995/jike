import Vue from 'vue'
import App from './App.vue'
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';

Vue.config.productionTip = false
Vue.use(elementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
