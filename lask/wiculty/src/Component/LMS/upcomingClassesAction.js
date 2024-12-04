import { upcominConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_UPCOMING__REQUEST, GET_UPCOMING__SUCCESS, GET_UPCOMING__FAILURE } =
upcominConstants;

const upcomingClassesAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.UPCOMING_CLASSES;
  const methodType = 'POST';
  const obj = { ...payload }
  postService(dispatch, Url, methodType,
    GET_UPCOMING__REQUEST, GET_UPCOMING__SUCCESS,
    GET_UPCOMING__FAILURE, cb, obj);
};

export default upcomingClassesAction;
