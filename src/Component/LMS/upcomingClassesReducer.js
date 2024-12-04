export default function upcomingClasses (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_UPCOMING__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_UPCOMING__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_UPCOMING__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
