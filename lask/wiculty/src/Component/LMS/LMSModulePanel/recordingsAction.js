import { classRecordings } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const {
  GET_RECORDINGS__REQUEST,
  GET_RECORDINGS__SUCCESS,
  GET_RECORDINGS__FAILURE
} =
classRecordings;

const redordingsDetails = (batchID = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.RECORDINGS}${batchID.batchID}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_RECORDINGS__SUCCESS,
    GET_RECORDINGS__REQUEST,
    GET_RECORDINGS__FAILURE, cb);
};

export default redordingsDetails;
