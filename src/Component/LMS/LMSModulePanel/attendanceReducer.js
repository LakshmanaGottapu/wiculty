export default function attendanceReducer (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_ATTENDANCE__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_ATTENDANCE__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_ATTENDANCE__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
