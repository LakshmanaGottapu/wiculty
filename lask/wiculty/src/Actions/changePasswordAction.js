import { changePassword } from '../Constants/constants';
import URL from '../Constants/app-url-constants';
import putService from '../services/putService';

const { GET_CHANGE__REQUEST, GET_CHANGE__SUCCESS, GET_CHANGE__FAILURE } =
changePassword;

const changePasswordAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.CHANGE_PASSWORD;
  const methodType = 'PUT';
  const obj = { ...payload.getOtpValues }
  putService(dispatch, Url, methodType,
    GET_CHANGE__REQUEST, GET_CHANGE__SUCCESS,
    GET_CHANGE__FAILURE, cb, obj);
};

export default changePasswordAction;
