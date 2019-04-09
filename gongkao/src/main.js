import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
  beforeCreate() {
    window.onscroll = function () {
      var header = document.querySelector(".header");
      if (window.scrollY > 68) {
        header.style.position = "fixed";
        header.style.top = 0;
        header.style.background = "#fff";
        header.style.opacity = 0.95;
      }
      if (window.scrollY < 68) {
        header.style.position = "";
        header.style.top = 0;
        header.style.background = "";
        header.style.opacity = 1;
      }
    }
  }
}).$mount('#app')
