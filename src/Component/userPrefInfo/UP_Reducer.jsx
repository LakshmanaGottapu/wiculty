import userPrefConstants from './constants';
import sf from '../common/safeTraverse'

const {
  GET_USER_PREF_INFO_REQUEST,
  GET_USER_PREF_INFO_SUCCESS,
  GET_USER_PREF_INFO_FAILURE,
  SET_USER_PREF_INFO_LOCAL
} = userPrefConstants;

export default function UserPrefInfo (state = {}, action) {
  const {
    type, data
  } = action;
  switch (type) {
    case GET_USER_PREF_INFO_REQUEST:
      return { ...data, isLoading: true };
    case GET_USER_PREF_INFO_SUCCESS:
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false }
    case SET_USER_PREF_INFO_LOCAL:
      return { ...state, ...data, isLoading: false }
    case GET_USER_PREF_INFO_FAILURE:
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
