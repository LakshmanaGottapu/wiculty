export default function seoContent (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_SEO__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_SEO__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_SEO__FAILURE':
      return { ...data, isLoading: false };
    default:
      return state;
  }
}
