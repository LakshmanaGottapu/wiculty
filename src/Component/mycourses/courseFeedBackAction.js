import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const courseFeedBack = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.COURSE_FEED_BACK;
  postService(dispatch, Url, null, null, null, null, cb, payload);
};

export default courseFeedBack;
