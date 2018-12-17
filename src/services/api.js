import axios from 'axios'
// baseURL: 'https://weightwatchers-server.herokuapp.com/'

export default () => {
  return axios.create({
    baseURL: 'http://localhost:3000/'
  })
}
