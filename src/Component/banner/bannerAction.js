import { offerConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import getService from '../../services/getService';

const { GET_OFFER__REQUEST, GET_OFFER__SUCCESS, GET_OFFER__FAILURE } =
offerConstants;

const bannerOffer = (payload = {}, cb) => (dispatch) => {
  const { countryID } = payload
  const Url = `${URL.RESOURCES.SERVICE_URL.OFFER}/${countryID}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_OFFER__REQUEST, GET_OFFER__SUCCESS,
    GET_OFFER__FAILURE, cb);
};

export default bannerOffer;
