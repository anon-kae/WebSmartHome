export default function ({ store, redirect }) {
  // If there is no "isLoggedIn" in store, or redirected from inside pages, no need to check
  if (!store.getters['auth/isLoggedIn']) return;
  if (store.getters['auth/isLoggedIn']) redirect('/');
};
