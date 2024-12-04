export default function myOrdersReducer (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_MYORDERS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_MYORDERS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_MYORDERS__FAILURE':
      return { ...data, isLoading: false };
    case 'RESET':
      return {};
    default:
      return state;
  }
}
