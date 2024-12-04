import { myBatchesConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const {
  GET_MYBATCHES__REQUEST,
  GET_MYBATCHES__SUCCESS,
  GET_MYBATCHES__FAILURE
} =
myBatchesConstants;

const mybatchesDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.BATCHES;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_MYBATCHES__REQUEST, GET_MYBATCHES__SUCCESS,
    GET_MYBATCHES__FAILURE, cb);
};

export default mybatchesDetails;
