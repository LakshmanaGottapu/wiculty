import { reviewDetailsConstants } from '../Constants/constants';
import URL from '../Constants/app-url-constants';
import getService from '../services/getService';

const { GET_REVIEW_DETAILS__REQUEST, GET_REVIEW_DETAILS__SUCCESS, GET_REVIEW_DETAILS__FAILURE } =
reviewDetailsConstants;

const reviewDetails = ({ page, courseId = 0 }, cb) => (dispatch) => {
  let Url = URL.RESOURCES.SERVICE_URL.REVIEW_URL;
  if (page === 'course-details') {
    Url = `${URL.RESOURCES.SERVICE_URL.REVIEW_URL}/course/${courseId}`
  }
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_REVIEW_DETAILS__REQUEST, GET_REVIEW_DETAILS__SUCCESS,
    GET_REVIEW_DETAILS__FAILURE, cb);
};

export default reviewDetails;
