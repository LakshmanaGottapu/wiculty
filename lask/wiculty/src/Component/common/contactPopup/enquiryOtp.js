import { otpConstants } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const { GET_OTP__REQUEST, GET_OTP__SUCCESS, GET_OTP__FAILURE } =
otpConstants;

const getEnquiryOtpAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.VERIFY_OTP;
  const methodType = 'POST';
  const obj = { ...payload.enquiryValues }
  postService(dispatch, Url, methodType,
    GET_OTP__REQUEST, GET_OTP__SUCCESS,
    GET_OTP__FAILURE, cb, obj);
};

export default getEnquiryOtpAction;
