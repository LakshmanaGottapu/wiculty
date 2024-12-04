import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const eventDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.EVENT_REGISTER;
  const methodType = 'POST';
  postService(dispatch, Url, methodType, '', '', '', cb, payload);
};

export default eventDetails;
