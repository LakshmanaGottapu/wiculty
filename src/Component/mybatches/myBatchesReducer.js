export default function mybatchDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_MYBATCHES__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_MYBATCHES__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_MYBATCHES__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
