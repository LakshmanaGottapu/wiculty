export default function refferalInfo (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_REFERAL__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_REFERAL__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_REFERAL__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
