import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';
import redeemWalletConstants from './redeemConstants';

const { GET_REDEEM_WALLET_REQUEST, GET_REDEEM_WALLET_SUCCESS, GET_REDEEM_WALLET_FAILURE } =
redeemWalletConstants;

const redeemAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.REDEEM_WALLET;
  const methodType = 'POST';
  const { redeemObj } = payload
  postService(dispatch, Url, methodType,
    GET_REDEEM_WALLET_REQUEST, GET_REDEEM_WALLET_SUCCESS,
    GET_REDEEM_WALLET_FAILURE, cb, redeemObj);
};

export default redeemAction;
