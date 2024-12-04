import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const updateCareerDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.WICULTY_CAREER_INFO;
  postService(dispatch, Url, null, null, null, null, cb, payload);
};

export default updateCareerDetails;
