import { signupConstants } from '../Constants/constants';
import URL from '../Constants/app-url-constants';
import postService from '../services/postService';

const { GET_SIGNUP_DETAILS__REQUEST, GET_SIGNUP_DETAILS__SUCCESS, GET_SIGNUP_DETAILS__FAILURE } =
signupConstants;

const reviewDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.SIGNUP_URL;
  const methodType = 'POST';
  const obj = { ...payload }
  postService(dispatch, Url, methodType,
    GET_SIGNUP_DETAILS__REQUEST, GET_SIGNUP_DETAILS__SUCCESS,
    GET_SIGNUP_DETAILS__FAILURE, cb, obj);
};

export default reviewDetails;
