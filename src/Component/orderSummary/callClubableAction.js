import { orderSummaryConstants } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import putService from '../../services/putService';

const { GET_ORDER_SUMMARY__REQUEST, GET_ORDER_SUMMARY__SUCCESS, GET_ORDER_SUMMARY__FAILURE } =
orderSummaryConstants;

const callApplyCoupon = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.ORDER_SUMMARY_URL;
  const methodType = 'PUT';
  putService(dispatch, Url, methodType,
    GET_ORDER_SUMMARY__REQUEST, GET_ORDER_SUMMARY__SUCCESS,
    GET_ORDER_SUMMARY__FAILURE, cb, payload);
};

export default callApplyCoupon;
