import { referal } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_REFERAL__REQUEST, GET_REFERAL__SUCCESS, GET_REFERAL__FAILURE } =
referal;

const referalDetails = (payload = {}, cb) => (dispatch) => {
  const { currencyID = 1 } = payload;
  const Url = `${URL.RESOURCES.SERVICE_URL.REFERRALS}/${currencyID}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_REFERAL__REQUEST, GET_REFERAL__SUCCESS,
    GET_REFERAL__FAILURE, cb);
};

export default referalDetails;
