import axios from 'axios';
import URL from '../Constants/app-url-constants';
import { courseList } from '../Constants/constants';
import sf from '../Component/common/safeTraverse';

const { GET_COURSE_FIRST__SUCCESS, GET_COURSE_FIRST__FAILURE } =
courseList;

const courseListAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.COURSE_LIST;
  const methodType = 'GET';
  getService(dispatch, Url, methodType, cb);
};

const getService = (dispatch, r_url, methodType, cb) => axios({
  method: methodType,
  url: r_url,
  headers: {
    'Authorization': ''
  }
}).then((data) => {
  const body = sf(data, ['data', 'data']) || {};
  dispatch({ type: GET_COURSE_FIRST__SUCCESS, data: body.courses || [] });
  if (typeof cb === 'function') {
    cb(body);
  }
})
  .catch((err) => {
    dispatch({ type: GET_COURSE_FIRST__FAILURE, error: err });
    if (typeof cb === 'function') {
      cb(err);
    }
  });

export default courseListAction;
