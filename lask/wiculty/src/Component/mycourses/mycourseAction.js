import { myCourseConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const {
  GET_MYCOURSE_DETAILS__REQUEST,
  GET_MYCOURSE_DETAILS__SUCCESS,
  GET_MYCOURSE_DETAILS__FAILURE
} =
myCourseConstants;

const mycourseDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.MYCOURSES_URL;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_MYCOURSE_DETAILS__REQUEST, GET_MYCOURSE_DETAILS__SUCCESS,
    GET_MYCOURSE_DETAILS__FAILURE, cb);
};

export default mycourseDetails;
