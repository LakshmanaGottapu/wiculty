import batchInfoConstants from './constants';
import sf from '../../common/safeTraverse'

const {
  GET_BATCH_INFO_REQUEST,
  GET_BATCH_INFO_SUCCESS,
  GET_BATCH_INFO_FAILURE
} =
  batchInfoConstants;

export default function batchInfo (state = {}, action) {
  const {
    type, data
  } = action;
  switch (type) {
    case GET_BATCH_INFO_REQUEST:
      return { ...data, isLoading: true };
    case GET_BATCH_INFO_SUCCESS:
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false }
    case GET_BATCH_INFO_FAILURE:
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
