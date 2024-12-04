import { getStartedConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_GETSTARTED__REQUEST, GET_GETSTARTED__SUCCESS, GET_GETSTARTED__FAILURE } =
getStartedConstants;

const getStartedAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.GET_STARTED;
  const methodType = 'POST';
  const obj = { ...payload.getOtpValues }
  postService(dispatch, Url, methodType,
    GET_GETSTARTED__REQUEST, GET_GETSTARTED__SUCCESS,
    GET_GETSTARTED__FAILURE, cb, obj);
};

export default getStartedAction;
