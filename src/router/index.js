import Vue from 'vue'
import Router from 'vue-router'
import addSub from '../components/addSub'
import home from '../components/home'
import newViewSubs from '../components/newViewSubs'
import update from '../components/update'
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
      name: 'newViewSubs',
      component: newViewSubs
    },
    {
      path: '/add-submission',
      name: 'addSub',
      component: addSub
    },
    {
      path: '/update-submission',
      name: 'update',
      component: update,
      props: true
    }
  ]
})
