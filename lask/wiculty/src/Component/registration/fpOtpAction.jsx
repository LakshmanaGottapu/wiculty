import { resetPassword } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_RESETPASSWORD__REQUEST, GET_RESETPASSWORD__SUCCESS, GET_RESETPASSWORD__FAILURE } =
resetPassword;

const forgotPasswordOtpAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.RESET_PASSWORD;
  const methodType = 'POST';
  const obj = { ...payload.getOtpValues }
  postService(dispatch, Url, methodType,
    GET_RESETPASSWORD__REQUEST, GET_RESETPASSWORD__SUCCESS,
    GET_RESETPASSWORD__FAILURE, cb, obj);
};

export default forgotPasswordOtpAction;
