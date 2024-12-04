export default function homeContent (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_HOME_DETAILS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_HOME_DETAILS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_HOME_DETAILS__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
