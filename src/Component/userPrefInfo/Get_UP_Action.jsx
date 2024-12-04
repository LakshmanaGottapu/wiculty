import userPrefConstants from './constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const {
  GET_USER_PREF_INFO_REQUEST,
  GET_USER_PREF_INFO_SUCCESS,
  GET_USER_PREF_INFO_FAILURE
} = userPrefConstants;

const UserPrefAction = (payload = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.USER_PREF_INFO}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_USER_PREF_INFO_REQUEST, GET_USER_PREF_INFO_SUCCESS,
    GET_USER_PREF_INFO_FAILURE, cb);
};

export default UserPrefAction;
