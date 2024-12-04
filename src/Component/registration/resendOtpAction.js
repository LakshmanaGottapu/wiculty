import { resendOtp } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_RESENDOTP__REQUEST, GET_RESENDOTP__SUCCESS, GET_RESENDOTP__FAILURE } =
resendOtp;

const resendOtpAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.RESEND_OTP;
  const methodType = 'POST';
  const obj = { ...payload.resendOtpValues }
  postService(dispatch, Url, methodType,
    GET_RESENDOTP__REQUEST, GET_RESENDOTP__SUCCESS,
    GET_RESENDOTP__FAILURE, cb, obj);
};

export default resendOtpAction;
