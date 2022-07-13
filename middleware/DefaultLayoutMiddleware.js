export default async function ({ firebaseInit, store, redirect, app }) {
  if (store.getters['auth/isLoggedIn']) {
    try {
      console.log('Pass!')
    } catch (error) {
      await store.dispatch('auth/logout');
      redirect('login', { src: 'timeout' });
    }
  }

  if (!store.getters['auth/isLoggedIn']) {
    await store.dispatch('auth/logout');
    redirect('login', { src: 'timeout' });
  }
};
