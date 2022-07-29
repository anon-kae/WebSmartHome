export default {
  isLoggedIn (state) {
    return !!state.token.accessToken
  },
  user (state) {
    return state.user
  },
};
