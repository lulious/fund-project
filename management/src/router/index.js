import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import InvestmentGuidance from '@/views/investmentGuidance'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/investmentGuidance/TopicList',
          name: 'InvestmentGuidance_TopicList',
          component: InvestmentGuidance.TopicList
        },
        {
          path: '/home/investmentGuidance/ContentList',
          name: 'InvestmentGuidance_ContentList',
          component: InvestmentGuidance.ContentList
        }
      ]
    }
  ]
})
