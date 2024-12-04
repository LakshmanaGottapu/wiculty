import { searchConstants } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const { GET_SEARCH__REQUEST, GET_SEARCH__SUCCESS, GET_SEARCH__FAILURE } =
searchConstants;

const searchAction = (payload = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.SEARCH}${payload}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_SEARCH__REQUEST, GET_SEARCH__SUCCESS,
    GET_SEARCH__FAILURE, cb);
};

export default searchAction;
