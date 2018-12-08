import Api from '@/services/api'

export default {
  getsubs () {
    return Api().get('/submissions')
  },
  addsub (sub) {
    return Api().post('/add-submission', sub, {
      headers: {'Content-type': 'application/json'}
    })
  }
}
