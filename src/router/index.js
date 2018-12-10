import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import subs from '@/components/subs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/submissions',
      name: 'subs',
      component: subs
    },
    {
      path: '/add-submission',
      name: 'addSub'
      //  component: addSub
    },
    {
      path: '/update-submission',
      name: 'updateSub',
      // component: updateSub,
      props: true
    }
  ]
})
