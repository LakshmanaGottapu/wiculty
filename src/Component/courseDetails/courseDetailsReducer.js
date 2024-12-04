export default function courseDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_COURSE_DETAILS__REQUEST':
      return {
        ...data,
        isLoading: true,
        isCourseSlug: false,
        isLoaded: false
      };
    case 'GET_COURSE_DETAILS__SUCCESS':
      return {
        ...data,
        isLoading: false,
        isCourseSlug: true,
        isLoaded: true
      };
    case 'GET_COURSE_DETAILS__FAILURE':
      return {
        ...data,
        isLoading: false,
        isCourseSlug: false,
        isLoaded: true
      };
    default:
      return state;
  }
}
