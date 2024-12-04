import sf from '../Component/common/safeTraverse';

export default function currencyList (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_CURRENCY_DETAILS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_CURRENCY_DETAILS__SUCCESS':
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false };
    case 'GET_CURRENCY_DETAILS__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
