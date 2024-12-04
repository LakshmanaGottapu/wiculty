import axios from 'axios';
import sf from '../../common/safeTraverse';
import authService from '../../../services/authService';
import { homePageConstants, seoConstants, courseList } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';

const { GET_HOME_DETAILS__SUCCESS, GET_HOME_DETAILS__FAILURE } =
homePageConstants;
const { GET_SEO__SUCCESS, GET_SEO__FAILURE } =
  seoConstants;
const { GET_COURSE_FIRST__SUCCESS, GET_COURSE_FIRST__FAILURE } =
courseList;

const getActionMethod = (dispatch, r_url, methodType, cb) => axios({
  method: methodType,
  url: r_url,
  headers: {
    'Authorization': authService.getAccessToken()
  }
}).then((data) => {
  const body = sf(data, ['data', 'data']) || {};
  dispatch({ type: GET_HOME_DETAILS__SUCCESS, data: body });
  dispatch({ type: GET_SEO__SUCCESS, data: body.seoContent || {} });
  dispatch({ type: GET_COURSE_FIRST__SUCCESS, data: body.courses || [] });
  if (typeof cb === 'function') {
    cb(data);
  }
})
  .catch((err) => {
    dispatch({ type: GET_HOME_DETAILS__FAILURE, error: err });
    dispatch({ type: GET_SEO__FAILURE, error: err });
    dispatch({ type: GET_COURSE_FIRST__FAILURE, error: err });
    if (typeof cb === 'function') {
      cb(err);
    }
  });

const homeAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.HOME_PAGE;
  const methodType = 'GET';
  getActionMethod(dispatch, Url, methodType, cb);
};

export default homeAction;
