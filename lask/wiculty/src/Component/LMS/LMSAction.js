import { LMSConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const {
  GET_LMS_DETAILS__REQUEST,
  GET_LMS_DETAILS__SUCCESS,
  GET_LMS_DETAILS__FAILURE
} =
LMSConstants;

const mycourseDetails = (payload = {}, cb) => (dispatch) => {
  const { courseSlug, batch_id } = payload;

  const selfPacedUrl = `${URL.RESOURCES.SERVICE_URL.LMS_DETAILS}${courseSlug}`;
  const Url = batch_id ? `${selfPacedUrl}/${batch_id}` : selfPacedUrl;

  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_LMS_DETAILS__REQUEST, GET_LMS_DETAILS__SUCCESS,
    GET_LMS_DETAILS__FAILURE, cb);
};

export default mycourseDetails;
