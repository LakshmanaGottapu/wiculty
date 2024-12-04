import { sessionExpConstants } from '../Component/session_handle/Constants/constant';
import sf from '../Component/common/safeTraverse';
import authService from './authService';

const { SESSION_EXPIRE } =
sessionExpConstants;

const handleErr = (dispatch, err, failureType, cb, URL) => {
  const errorInfo = sf(err, ['response', 'data']) || err;
  if (errorInfo && errorInfo.status === 401 && !URL.endsWith('logout')) {
    // when ever cookie is invalid remove existing cookie from browser.
    authService.signOut();
    dispatch({ type: SESSION_EXPIRE, data: { isSessionExpired: true } });
  } else if (failureType) {
    dispatch({ type: failureType, error: errorInfo });
  }
  if (typeof cb === 'function') {
    cb(errorInfo);
  }
}

export default handleErr;
