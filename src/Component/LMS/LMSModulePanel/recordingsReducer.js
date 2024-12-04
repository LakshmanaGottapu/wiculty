export default function recordingsReducer (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_RECORDINGS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_RECORDINGS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_RECORDINGS__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
