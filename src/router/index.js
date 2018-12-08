import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Submissions from '@/components/Submissions'
import AddSubmission from '@/components/AddSubmission'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/submissions',
      name: 'Submissions',
      component: Submissions
    },
    {
      path: '/add-submission',
      name: 'AddSubmission',
      component: AddSubmission
    }
  ]
})
