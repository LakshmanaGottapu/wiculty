import freeEnrollConstants from './constants';
import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const {
  POST_FREE_COURSE_ENROLL_REQUEST,
  POST_FREE_COURSE_ENROLL_SUCCESS,
  POST_FREE_COURSE_ENROLL_FAILURE
} =
freeEnrollConstants;

const freeCourseEnroll = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.FREE_COURSE_ENROLL_URL;
  const methodType = 'POST';
  postService(dispatch, Url, methodType,
    POST_FREE_COURSE_ENROLL_REQUEST, POST_FREE_COURSE_ENROLL_SUCCESS,
    POST_FREE_COURSE_ENROLL_FAILURE, cb, payload);
};

export default freeCourseEnroll;
