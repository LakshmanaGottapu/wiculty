export default function homeCourses (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_COURSE_FIRST__REQUEST':
      return { data, isLoading: true };
    case 'GET_COURSE_FIRST__SUCCESS':
      return { data, isLoading: false };
    case 'GET_COURSE_FIRST__FAILURE':
      return { data, isLoading: false };
    default:
      return state;
  }
}
