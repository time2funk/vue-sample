import Vue from 'vue'
import Router from 'vue-router'
import * as Auth from '@/components/pages/Authentication'

// Pages
import Home from '@/components/pages/Home'
import Authentication from '@/components/pages/Authentication/Authentication'
import Details from '@/components/pages/Details/Details'
import Inbox from '@/components/pages/Inbox/Inbox'

// Global components
import Header from '@/components/Header'
import List from '@/components/List/ListBlock'
import DetailsBlock from '@/components/pages/Details/DetailsBlock'

var leadip = ''

// Register components
Vue.component('app-header', Header)
Vue.component('list', List)
Vue.component('details-block', DetailsBlock)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header,
        list: List
      },
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/inbox',
      name: 'Inbox',
      component: Inbox
    },
    {
      path: '/details',
      name: 'Details',
      components: {
        default: Details,
        header: Header,
        DetailsBlock: DetailsBlock
      },
      params: {
        leadip: leadip
      },
      meta: {
        requiredAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
