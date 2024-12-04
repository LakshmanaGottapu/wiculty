import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const updateInstructorDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.INSTRUCTOR_INFO;
  postService(dispatch, Url, null, null, null, null, cb, payload);
};

export default updateInstructorDetails;
