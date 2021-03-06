import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode:"history",
    base:process.env.BASE_URL,
    routes:[
        {
            path:'/login',
            name:'login',
            component: function(){
                return import ("./components/login");
            }
        },
        {
            path:'/',
            name:'index',
            component: function(){
                return import ("./components/index");
            },
            children:[
                {
                    path:'/',
                    name:'home',
                    component:function(){
                        return import ('./components/tabs/hometab');
                    }
                },
                {
                    path:'user',
                    name:'user',
                    component:function(){
                        return import ('./components/tabs/user');
                    }
                },
                {
                    path:'banner',
                    name:'banner',
                    component:function(){
                        return import ('./components/tabs/banner');
                    }
                },
                {
                    path:'teacher',
                    name:'teacher',
                    component:function(){
                        return import ('./components/tabs/teacher');
                    }
                },
                {
                    path:'course',
                    name:'course',
                    component:function(){
                        return import ('./components/tabs/course');
                    }
                },
                {
                    path:'404',
                    name:'404',
                    component: function(){
                        return import ("./components/common/404");
                    }
                },
                
            ]
        },
        
        
        
    ]
})

