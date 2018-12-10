import Api from '@/services/api'

export default {
  getSubmissions () {
    return Api().get('/submissions')
  },
  addSubmissions (sub) {
    return Api().post('/add-submission', sub, {
      headers: {'Content-type': 'application/json'}
    })
  },
  deleteSubmission (id) {
    return Api().delete(`/delete-submission/${id}`)
  },
  findOneSubmission (id) {
    return Api().get(`/listOneSubmission/${id}`)
  },
  putSubmission (id, sub) {
    console.log('REQUESTING' + sub._id + ' ' +
    JSON.stringify(sub, null, 5))
    return Api().put(`/update-sugit commit -m "Include CSS in bundle"bmission/${id}`, sub,
      { headers: {'Content-type': 'application/json'} })
  }
}
