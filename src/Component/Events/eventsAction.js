import webinarConstants from './constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const {
  GET_ALL_WEBINARS_REQUEST,
  GET_ALL_WEBINARS_SUCCESS,
  GET_ALL_WEBINARS_FAILURE
} =
webinarConstants;

const webinars = (payload = {}, cb) => (dispatch) => {
  const { limit } = payload;
  let Url = `${URL.RESOURCES.SERVICE_URL.ALL_WEBINARS}`;
  if (limit) {
    Url = `${Url}/${limit}`
  }
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_ALL_WEBINARS_REQUEST, GET_ALL_WEBINARS_SUCCESS,
    GET_ALL_WEBINARS_FAILURE, cb);
};

export default webinars;
