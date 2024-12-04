import { orderCreate } from '../constants';
import URL from '../../../Constants/app-url-constants';
import putService from '../../../services/postService';

const { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE } =
orderCreate;

const orderCreateAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.ORDER_CREATE_URL;
  const obj = { ...payload.orderPayload }
  putService(dispatch, Url, '',
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAILURE, cb, obj);
};

export default orderCreateAction;
