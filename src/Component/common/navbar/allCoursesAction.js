import { allCoursesConstants } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const { GET_ALL_COURSES__REQUEST, GET_ALL_COURSES__SUCCESS, GET_ALL_COURSES__FAILURE } =
allCoursesConstants;

const allCourses = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.ALL_COURSES;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_ALL_COURSES__REQUEST, GET_ALL_COURSES__SUCCESS,
    GET_ALL_COURSES__FAILURE, cb);
};

export default allCourses;
