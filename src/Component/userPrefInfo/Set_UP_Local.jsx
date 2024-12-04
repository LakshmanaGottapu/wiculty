import userPrefConstants from './constants';

const {
  SET_USER_PREF_INFO_LOCAL
} = userPrefConstants;

const Set_UP_local = (data = {}) => (dispatch) => {
  dispatch({ type: SET_USER_PREF_INFO_LOCAL, data });
};
export default Set_UP_local;
