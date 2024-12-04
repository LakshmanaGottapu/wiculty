import { courseDetailsConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_COURSE_DETAILS__REQUEST, GET_COURSE_DETAILS__SUCCESS, GET_COURSE_DETAILS__FAILURE } =
courseDetailsConstants;

const productDetails = (payload = {}, cb) => (dispatch) => {
  const { courseSlug } = payload;
  const Url = `${URL.RESOURCES.SERVICE_URL.COURSE_DETAILS_URL}/${courseSlug}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_COURSE_DETAILS__REQUEST, GET_COURSE_DETAILS__SUCCESS,
    GET_COURSE_DETAILS__FAILURE, cb);
};

export default productDetails;
