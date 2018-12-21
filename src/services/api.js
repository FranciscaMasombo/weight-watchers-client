import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://localhost:3000/'
    // heroku config:set NPM_CONFIG_PRODUCTION=false
    baseURL: 'https://weight-watchers-server2.herokuapp.com/'
  })
}
