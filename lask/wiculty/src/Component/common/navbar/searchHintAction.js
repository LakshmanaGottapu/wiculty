import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const searchHint = (payload = {}, cb) => (dispatch) => {
  const { query } = payload
  const Url = `${URL.RESOURCES.SERVICE_URL.COURSE_SEARCH_HINT_URL}${query}`;
  getService(dispatch, Url, null, null, null, null, cb);
};

export default searchHint;
