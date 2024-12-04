import reqBatchConstants from './constants';
import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const {
  POST_REQUEST_BATCH_REQUEST, POST_REQUEST_BATCH_SUCCESS
  , POST_REQUEST_BATCH_FAILURE
} =
reqBatchConstants;

const requestBatchAction = (payload, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.REQUEST_BATCH;
  const methodType = 'POST';
  postService(dispatch, Url, methodType,
    POST_REQUEST_BATCH_REQUEST, POST_REQUEST_BATCH_SUCCESS,
    POST_REQUEST_BATCH_FAILURE, cb, payload);
};

export default requestBatchAction;
