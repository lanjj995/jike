import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // 用户
    {
      path: '/user',
      name: 'user',
      component: function () {
        return import('./views/user.vue')
      },
      children: [
        {
          path: 'regist',
          name: 'regist',
          component: function () {
            return import('./components/user/regist.vue');
          }
        },
        {
          path: 'login',
          name: 'login',
          component: function () {
            return import('./components/user/login.vue');
          }
        },
        {
          path: 'findpassword',
          name: 'findpassword',
          component: function () {
            return import('./components/user/findpassword.vue');
          }
        },
      ]
    },
    // 新闻
    {
      path: "/new",
      name: 'new',
      component: function () {
        return import("./views/new.vue");
      },
      children: [
        {
          path: "/",
          name: "list",
          component: function () {
            return import("./components/new/new_list.vue");
          }
        },
        {
          path: "details/:id",
          name: "details",
          component: function () {
            return import("./components/new/details.vue");
          }
        }
      ]
    },
    // 个人
    {
      path: '/message',
      name: 'message',
      component: function () {
        return import('./views/message.vue');
      },
      children: [
        {
          path: '/',
          name: 'mycomment',
          component: function () {
            return import('./components/message/my-comment.vue');
          }
        },
        {
          path: 'mymessage',
          name: 'mymessage',
          component: function () {
            return import('./components/message/my-message.vue');
          }
        }
      ]
    },
    {
      path:'/account',
      name:'account',
      component:function(){
        return import('./views/account.vue');
      },
      children:[
        {
          path: '/',
          component: function () {
            return import('./components/account/account-message.vue');
          }
        },
        {
          path: 'updatepsw',
          name: 'updatepsw',
          component: function () {
            return import('./components/account/account-updatepsw.vue');
          }
        }
      ]
    }
  ]
})
