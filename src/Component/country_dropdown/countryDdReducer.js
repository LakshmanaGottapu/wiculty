import sf from '../common/safeTraverse';

export default function countryList (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_COUNTRIES__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_COUNTRIES__SUCCESS':
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false };
    case 'GET_COUNTRIES__FAILURE':
      return { ...data, isLoading: false };
    case 'GET_SELECTED__COUNTRY':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
