import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Ticket from './views/Ticket.vue'
import Home from './views/Home.vue'
import Center from './views/Center.vue'
import Nofound from './views/404.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            name: '404',
            component: Nofound
        },
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children:[
                {path: '', component: Home},
                {path: '/ticket', name: 'ticket', component: Ticket},
                {path: '/center', name: 'center', component: Center},
            ]
        },

    ]
})
