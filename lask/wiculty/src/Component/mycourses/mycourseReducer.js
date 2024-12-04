// import mycourses from '../test/myCourse.json';

export default function myocurseDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_MYCOURSE_DETAILS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_MYCOURSE_DETAILS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_MYCOURSE_DETAILS__FAILURE':
      return { ...data, isLoading: false };
    case 'RESET':
      return {};
    default:
      return state;
  }
}
