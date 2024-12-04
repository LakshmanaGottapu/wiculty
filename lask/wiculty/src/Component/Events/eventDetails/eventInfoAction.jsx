import eventInfoConstants from './constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const {
  GET_EVENT_DETAILS_REQUEST,
  GET_EVENT_DETAILS_SUCCESS,
  GET_EVENT_DETAILS_FAILURE
} =
eventInfoConstants;

const eventDetails = (payload = {}, cb) => (dispatch) => {
  const { eventSlug } = payload;
  const Url = `${URL.RESOURCES.SERVICE_URL.EVENT_INFO}/${eventSlug}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_EVENT_DETAILS_REQUEST, GET_EVENT_DETAILS_SUCCESS,
    GET_EVENT_DETAILS_FAILURE, cb);
};

export default eventDetails;
