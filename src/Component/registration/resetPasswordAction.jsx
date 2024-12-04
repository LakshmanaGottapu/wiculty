import { newPassword } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import putService from '../../services/putService';

const { GET_NEWPASSWORD__REQUEST, GET_NEWPASSWORD__SUCCESS, GET_NEWPASSWORD__FAILURE } =
newPassword;

const resetPasswordAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.RESET_PASSWORD;
  const methodType = 'PUT';
  const obj = { ...payload.enquiryValues }
  putService(dispatch, Url, methodType,
    GET_NEWPASSWORD__REQUEST, GET_NEWPASSWORD__SUCCESS,
    GET_NEWPASSWORD__FAILURE, cb, obj);
};

export default resetPasswordAction;
