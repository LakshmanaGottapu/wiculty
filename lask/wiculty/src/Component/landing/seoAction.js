import { seoConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_SEO__REQUEST, GET_SEO__SUCCESS, GET_SEO__FAILURE } =
seoConstants;

const seoAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.SEO;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_SEO__REQUEST, GET_SEO__SUCCESS,
    GET_SEO__FAILURE, cb);
};

export default seoAction;
