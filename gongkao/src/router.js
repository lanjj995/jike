import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: function () {
        return import("./views/index.vue");
      }
    },
    {
      path: '/courses',
      name: 'courses',

      component: function () {
        return import('./views/courses.vue')
      }

    },
    {
      path: '/details',
      name: 'detials',
      component: function () {
        return import('./views/details.vue');
      }
    },
    {
      path: '/students',
      name: 'student',
      component: function () {
        return import('./views/students.vue');
      }
    },
    {
      path: '/message',
      name: 'message',
      component: function () {
        return import('./views/message.vue');
      },
      children: [
        {
          path: 'myset',
          name: 'myset',
          component: function () {
            return import('./components/myset.vue');
          }
        },
        {
          path: 'mycourse',
          name: 'mycourse',
          component: function () {
            return import('./components/mycourse.vue');
          }
        },
        {
          path: 'myorder',
          name: 'myorder',
          component: function () {
            return import('./components/myorder.vue');
          }
        }
      ]
    },

  ]
})
