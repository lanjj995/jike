import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(elementUI);

router.beforeEach(function(to,from,next) {
  if (to.path.indexOf('/new') === -1){
    window.onscroll = function(){}
  } 
  next();
})

new Vue({
  router,
  store,
  components: {
  },
  render: function (h) { return h(App) },
  created(){
    if (localStorage.user) {
      this.$store.state.user = JSON.parse(localStorage.user);
    }
    this.$store.state.avatar = localStorage.avatar;
    this.$store.state.token = localStorage.token;
  }
}).$mount('#app')
