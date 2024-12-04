export default function LMSDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_LMS_DETAILS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_LMS_DETAILS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_LMS_DETAILS__FAILURE':
      return { ...data, isLoading: false };
    case 'RESET_LMS_DATA':
      return {};
    default:
      return state;
  }
}
