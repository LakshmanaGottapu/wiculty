import axios from 'axios';
import authService from './authService';
import handleExceptions from './helper';

const getService = (dispatch, URL, methodType, requestType,
  successType, failureType, cb) => {
  if (requestType) {
    dispatch({ type: requestType, data: {} });
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': authService.getAccessToken()
  }
  return axios.get(
    URL,
    {
      headers: {
        ...headers
      }
    }
  ).then((data) => {
    if (successType) {
      dispatch({ type: successType, data });
    }
    if (typeof cb === 'function') {
      cb(data);
    }
  }).catch((err) => {
    handleExceptions(dispatch, err, failureType, cb, URL)
  });
};

export default getService;
