// import profileJson from '../test/profile.json';

export default function profileDetails (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case 'GET_PROFILE_INFO__REQUEST':
      return { ...data, isLoading: true };
    case 'GET_PROFILE_INFO__SUCCESS':
      return { ...data, isLoading: false };
    case 'GET_PROFILE_INFO__FAILURE':
      return { ...data, isLoading: false };
    case 'RESET':
      return {};
    default:
      return state;
  }
}
