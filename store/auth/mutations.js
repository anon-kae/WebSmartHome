export default {
  setToken (state, token = null) {
    token = {
      accessToken: '',
      ...token
    }
    state.token = token
  },
  setUser (state, user = {}) {
    state.user = {
      uid: -1,
      email: '',
      ...user
    }
  },
}
