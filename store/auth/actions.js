export default {
  async login ({ commit }, credential) {
    const { accessToken, email, uid } = await this.$api.authService.login(credential)
    commit('setToken', { accessToken })
    commit('setUser', { email, uid })
  },
  async logout ({ commit }) {
    await this.$api.authService.logout()
    commit('setToken', null)
    commit('setUser', null)
  },
};
