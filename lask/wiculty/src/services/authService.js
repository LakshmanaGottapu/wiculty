import Cookies from 'universal-cookie';

const cookies = new Cookies();

const authService = {
  isAuthenticated () {
    if (cookies.get('auth')) {
      return true;
    }
    return false;
  },
  signIn (token) {
    cookies.set('auth', token, { path: '/' });
  },
  signOut (history) {
    document.cookie = 'auth=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
    if (history) {
      history.push('/');
    }
  },
  getAccessToken () {
    return cookies.get('auth');
  }
};

export default authService;
