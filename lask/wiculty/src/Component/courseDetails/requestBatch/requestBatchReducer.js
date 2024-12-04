import reqBatchConstants from './constants';
import sf from '../../common/safeTraverse'

const {
  POST_REQUEST_BATCH_REQUEST, POST_REQUEST_BATCH_SUCCESS
  , POST_REQUEST_BATCH_FAILURE
} =
  reqBatchConstants;

export default function requestBatch (state = {}, action) {
  const {
    type, data
  } = action;
  switch (type) {
    case POST_REQUEST_BATCH_REQUEST:
      return { ...data, isLoading: true };
    case POST_REQUEST_BATCH_SUCCESS:
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false }
    case POST_REQUEST_BATCH_FAILURE:
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
