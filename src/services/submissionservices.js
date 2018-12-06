import Api from '@/services/api'

export default {
  getsubs () {
    return Api().get('/submissions')
  }
}
