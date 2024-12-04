import { LBayBatchDetailsConstants } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const {
  GET_LBAY_BATCH_DETAILS__REQUEST,
  GET_LBAY_BATCH_DETAILS__SUCCESS,
  GET_LBAY_BATCH_DETAILS__FAILURE
} =
LBayBatchDetailsConstants;

const LBayBatchDetails = (payload = {}, cb) => (dispatch) => {
  const { course_id } = payload;
  const Url = `${URL.RESOURCES.SERVICE_URL.LBAY_BATCH_DETAILS}${course_id}`
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_LBAY_BATCH_DETAILS__REQUEST, GET_LBAY_BATCH_DETAILS__SUCCESS,
    GET_LBAY_BATCH_DETAILS__FAILURE, cb);
};

export default LBayBatchDetails;
