export default function trendingTopicsReducer (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_TRENDING_TOPICS__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_TRENDING_TOPICS__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_TRENDING_TOPICS__FAILURE':
      return { ...data, isLoading: false };
    case 'CLEAR_TRENDING_TOPICS_BANNER':
      return {};
    default:
      return state;
  }
}
