import { registerWebinarConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_WEBINAR__REQUEST, GET_WEBINAR__SUCCESS, GET_WEBINAR__FAILURE } =
registerWebinarConstants;

const registerWebinarAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.REGISTER_WEBINAR;
  const methodType = 'POST';
  const obj = { ...payload.getOtpValues }
  postService(dispatch, Url, methodType,
    GET_WEBINAR__REQUEST, GET_WEBINAR__SUCCESS,
    GET_WEBINAR__FAILURE, cb, obj);
};

export default registerWebinarAction;
