import { myorders } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_MYORDERS__REQUEST, GET_MYORDERS__SUCCESS, GET_MYORDERS__FAILURE } =
myorders;

const myordersAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.MYORDERS;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_MYORDERS__REQUEST, GET_MYORDERS__SUCCESS,
    GET_MYORDERS__FAILURE, cb);
};

export default myordersAction;
