import redeemWalletConstants from './redeemConstants';

const { GET_REDEEM_WALLET_REQUEST, GET_REDEEM_WALLET_SUCCESS, GET_REDEEM_WALLET_FAILURE } =
redeemWalletConstants;

export default function redeemWalletDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case GET_REDEEM_WALLET_REQUEST:
      return { ...data, isLoading: true };
    case GET_REDEEM_WALLET_SUCCESS:
      return { ...data, isLoading: false };
    case GET_REDEEM_WALLET_FAILURE:
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
