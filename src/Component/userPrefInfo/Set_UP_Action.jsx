import userPrefConstants from './constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const {
  SET_USER_PREF_INFO_REQUEST,
  SET_USER_PREF_INFO_SUCCESS,
  SET_USER_PREF_INFO_FAILURE
} = userPrefConstants;

const UserPrefAction = (payload = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.USER_PREF_INFO}`;
  const methodType = 'POST';
  const obj = { ...payload }
  postService(dispatch, Url, methodType,
    SET_USER_PREF_INFO_REQUEST, SET_USER_PREF_INFO_SUCCESS,
    SET_USER_PREF_INFO_FAILURE, cb, obj);
};

export default UserPrefAction;
