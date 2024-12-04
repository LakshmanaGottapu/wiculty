import webinarConstants from './constants';
import sf from '../common/safeTraverse'

const {
  GET_ALL_WEBINARS_REQUEST,
  GET_ALL_WEBINARS_SUCCESS,
  GET_ALL_WEBINARS_FAILURE
} =
webinarConstants;

export default function allEvents (state = {}, action) {
  const {
    type, data
  } = action;
  switch (type) {
    case GET_ALL_WEBINARS_REQUEST:
      return { ...data, isLoading: true };
    case GET_ALL_WEBINARS_SUCCESS:
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false }
    case GET_ALL_WEBINARS_FAILURE:
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
