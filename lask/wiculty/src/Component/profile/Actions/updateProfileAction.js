import URL from '../../../Constants/app-url-constants';
import putService from '../../../services/putService';

const updateProfileDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.UPDATE_PROFILE_INFO;
  putService(dispatch, Url, null, null, null, null, cb, payload);
};

export default updateProfileDetails;
