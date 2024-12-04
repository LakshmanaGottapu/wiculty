import { orderSummaryConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_ORDER_SUMMARY__REQUEST, GET_ORDER_SUMMARY__SUCCESS, GET_ORDER_SUMMARY__FAILURE } =
orderSummaryConstants;

const orderDetails = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.ORDER_SUMMARY_URL;
  const methodType = 'POST';
  postService(dispatch, Url, methodType,
    GET_ORDER_SUMMARY__REQUEST, GET_ORDER_SUMMARY__SUCCESS,
    GET_ORDER_SUMMARY__FAILURE, cb, payload);
};

export default orderDetails;
