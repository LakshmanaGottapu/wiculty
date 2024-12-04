import sf from '../common/safeTraverse';

export default function offerReducer (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_OFFER__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_OFFER__SUCCESS':
      return { ...state, ...sf(data, ['data', 'data']), isLoading: false };
    case 'GET_OFFER__FAILURE':
      return { ...data, isLoading: false };
    case 'CLEAR_OFFER_BANNER':
      return {};
    default:
      return state;
  }
}
