import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const logout = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.LOG_OUT;
  getService(dispatch, Url, null, null, null, null, cb);
};

export default logout;
