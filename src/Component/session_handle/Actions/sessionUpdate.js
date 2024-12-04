import URL from '../../../Constants/app-url-constants';
import putService from '../../../services/putService';

const sessionUpdate = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.SIGNIN_URL;
  const { sessionVals } = payload;
  putService(dispatch, Url, null, null, null, null, cb, sessionVals);
};

export default sessionUpdate;
