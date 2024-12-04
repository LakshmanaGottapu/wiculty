import { signinConstants } from '../Constants/constants';
import URL from '../Constants/app-url-constants';
import postService from '../services/postService';

const { GET_SIGN_DETAILS__REQUEST, GET_SIGN_DETAILS__SUCCESS, GET_SIGN_DETAILS__FAILURE } =
signinConstants;

const signInAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.SIGNIN_URL;
  const methodType = 'POST';
  const { values } = payload;
  postService(dispatch, Url, methodType,
    GET_SIGN_DETAILS__REQUEST, GET_SIGN_DETAILS__SUCCESS,
    GET_SIGN_DETAILS__FAILURE, cb, values);
};

export default signInAction;
