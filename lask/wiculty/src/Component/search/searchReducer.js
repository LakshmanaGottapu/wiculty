export default function searchCourses (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_SEARCH__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_SEARCH__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_SEARCH__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
