export default function allCourses (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_ALL_COURSES__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_ALL_COURSES__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_ALL_COURSES__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
