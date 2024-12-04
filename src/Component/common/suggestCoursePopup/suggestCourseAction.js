import { contactPopupConstants } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const { GET_CONTACT__REQUEST, GET_CONTACT__SUCCESS, GET_CONTACT__FAILURE } =
contactPopupConstants;

const suggestCourseAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.SUGGEST;
  const methodType = 'POST';
  const obj = { ...payload.enquiryValues }
  postService(dispatch, Url, methodType,
    GET_CONTACT__REQUEST, GET_CONTACT__SUCCESS,
    GET_CONTACT__FAILURE, cb, obj);
};

export default suggestCourseAction;
