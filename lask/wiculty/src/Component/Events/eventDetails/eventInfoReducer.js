import eventInfoConstants from './constants';
import sf from '../../common/safeTraverse'

const {
  GET_EVENT_DETAILS_REQUEST,
  GET_EVENT_DETAILS_SUCCESS,
  GET_EVENT_DETAILS_FAILURE
} =
eventInfoConstants;

export default function eventDetails (state = {}, action) {
  const {
    type, data
  } = action;
  switch (type) {
    case GET_EVENT_DETAILS_REQUEST:
      return { ...data, isLoading: true };
    case GET_EVENT_DETAILS_SUCCESS:
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false }
    case GET_EVENT_DETAILS_FAILURE:
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
