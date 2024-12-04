import { countryDdConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_COUNTRIES__REQUEST, GET_COUNTRIES__SUCCESS, GET_COUNTRIES__FAILURE } =
countryDdConstants;

const countryDdAction = (payload = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.COUNTRY_LIST_URL}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_COUNTRIES__REQUEST, GET_COUNTRIES__SUCCESS,
    GET_COUNTRIES__FAILURE, cb);
};

export default countryDdAction;
