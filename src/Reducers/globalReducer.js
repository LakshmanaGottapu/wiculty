export default function globalDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_GLOBAL_DETAILS':
      return { ...state, ...data, isLoading: true };
    case 'RESET':
      return { currentPage: 'showFooter' };
    default:
      return state;
  }
}
