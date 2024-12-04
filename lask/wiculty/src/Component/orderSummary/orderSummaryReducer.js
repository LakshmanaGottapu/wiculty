export default function orderSummaryDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_ORDER_SUMMARY__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_ORDER_SUMMARY__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_ORDER_SUMMARY__FAILURE':
      return { ...data, isLoading: false };
    case 'CLEAR_ORDER_SUMMARY_INFO':
      return {};
    default:
      return state;
  }
}
