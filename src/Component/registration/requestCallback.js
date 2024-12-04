import { requestCallback } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_CALLBACK__REQUEST, GET_CALLBACK__SUCCESS, GET_CALLBACK__FAILURE } =
requestCallback;

const requestCallbackAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.CALLBACK;
  const methodType = 'POST';
  const obj = { ...payload.getOtpValues }
  postService(dispatch, Url, methodType,
    GET_CALLBACK__REQUEST, GET_CALLBACK__SUCCESS,
    GET_CALLBACK__FAILURE, cb, obj);
};

export default requestCallbackAction;
