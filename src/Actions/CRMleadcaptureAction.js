import { CRMleadCaptureConstants } from '../Constants/constants';
import URL from '../Constants/app-url-constants';
import postService from '../services/postService';

const {
  POST_LEAD_REQUEST, POST_LEAD_SUCCESS
  , POST_LEAD_FAILURE
} =
CRMleadCaptureConstants;

const CRMleadCaptureAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.GET_STARTED;
  const methodType = 'POST';
  const obj = { ...payload.leadInfo }
  postService(dispatch, Url, methodType,
    POST_LEAD_REQUEST, POST_LEAD_SUCCESS,
    POST_LEAD_FAILURE, cb, obj);
};

export default CRMleadCaptureAction;
