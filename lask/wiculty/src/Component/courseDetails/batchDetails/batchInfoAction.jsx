import batchInfoConstants from './constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const {
  GET_BATCH_INFO_REQUEST,
  GET_BATCH_INFO_SUCCESS,
  GET_BATCH_INFO_FAILURE
} =
batchInfoConstants;

const batchInfo = (payload = {}, cb) => (dispatch) => {
  const { courseID, countryID } = payload;
  const Url = `${URL.RESOURCES.SERVICE_URL.COUNTRY_REALTED_BATCH_INFO}/${courseID}/${countryID}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_BATCH_INFO_REQUEST, GET_BATCH_INFO_SUCCESS,
    GET_BATCH_INFO_FAILURE, cb);
};

export default batchInfo;
