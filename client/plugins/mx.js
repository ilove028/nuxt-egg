import Vue from 'vue'
import auth from './mx/components/auth'
import password from './mx/components/password.vue'

export default () => {
  Vue.component(auth.name, auth)
  Vue.component(password.name, password)
}
