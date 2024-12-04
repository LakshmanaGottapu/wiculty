import URL from '../Constants/app-url-constants';
import getService from '../services/getService';

const reviewDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.CURRENCY_LIST;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    'GET_CURRENCY_DETAILS__REQUEST', 'GET_CURRENCY_DETAILS__SUCCESS',
    'GET_CURRENCY_DETAILS__FAILURE', cb);
};

export default reviewDetails;
