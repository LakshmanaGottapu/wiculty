import { orderSummaryConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_ORDER_SUMMARY__REQUEST, GET_ORDER_SUMMARY__SUCCESS, GET_ORDER_SUMMARY__FAILURE } =
orderSummaryConstants;

const promoCodeAction = ({ couponPayload }, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.APPLY_COUPON_URL;
  const methodType = 'PUT';
  postService(dispatch, Url, methodType,
    GET_ORDER_SUMMARY__REQUEST, GET_ORDER_SUMMARY__SUCCESS,
    GET_ORDER_SUMMARY__FAILURE, cb, couponPayload);
};

export default promoCodeAction;
