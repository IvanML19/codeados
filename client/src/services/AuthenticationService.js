import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('api/register', credentials)
  }
}

/*
AuthenticationService.register({
  email: 'test@test.com',
  password: '123456'
})
*/
