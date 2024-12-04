import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const classFeedBack = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.CLASS_FEEDBACK;
  postService(dispatch, Url, null, null, null, null, cb, payload);
};

export default classFeedBack;
