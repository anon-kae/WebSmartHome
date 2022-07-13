import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default function ({ auth }, app, store) {
  return {
    async login ({ email, password }) {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Login Successfully!'
      )
      return user;
    },
    async logout () {
      await signOut(auth);

      await store.dispatch(
        'snackbar/setSuccessMessage',
        'Logout Successfully!'
      )
    }
  }
}
