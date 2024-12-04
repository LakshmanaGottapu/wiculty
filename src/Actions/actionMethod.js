import axios from 'axios';
import authService from '../services/authService'

const getActionMethod = (dispatch, URL, methodType, requestType,
  successType, failureType, cb) => {
  dispatch({ type: requestType, data: [] });
  return axios({
    method: methodType,
    url: URL,
    headers: {
      'Authorization': authService.getAccessToken()
    }
  }).then((data) => {
    dispatch({ type: successType, data });
    if (typeof cb === 'function') {
      cb(data);
    }
  })
    .catch((err) => {
      dispatch({ type: failureType, error: err });
      if (typeof cb === 'function') {
        cb(err);
      }
    })
}

export default getActionMethod;
