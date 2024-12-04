import { requestCertificate } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const {
  GET_REQCERT__REQUEST,
  GET_REQCERT__SUCCESS,
  GET_REQCERT__FAILURE
} =
requestCertificate;

const requestCertificateAction = (batchID = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.REQUEST_CERTIFICATE}${batchID.batchID}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_REQCERT__REQUEST,
    GET_REQCERT__SUCCESS,
    GET_REQCERT__FAILURE, cb);
};

export default requestCertificateAction;
