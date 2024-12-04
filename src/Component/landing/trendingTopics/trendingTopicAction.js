import trendingTopicsConstants from './constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const { GET_TRENDING_TOPICS__REQUEST, GET_TRENDING_TOPICS__SUCCESS, GET_TRENDING_TOPICS__FAILURE } =
trendingTopicsConstants;

const bannerOffer = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.TRENDING_TOPICS;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_TRENDING_TOPICS__REQUEST, GET_TRENDING_TOPICS__SUCCESS,
    GET_TRENDING_TOPICS__FAILURE, cb);
};

export default bannerOffer;
