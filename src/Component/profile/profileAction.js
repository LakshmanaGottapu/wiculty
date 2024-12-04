import { profileInfoConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_PROFILE_INFO__REQUEST, GET_PROFILE_INFO__SUCCESS, GET_PROFILE_INFO__FAILURE } =
profileInfoConstants;

const profileDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.PROFILE_URL;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_PROFILE_INFO__REQUEST, GET_PROFILE_INFO__SUCCESS,
    GET_PROFILE_INFO__FAILURE, cb);
};

export default profileDetails;
