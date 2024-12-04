import { sessionExpConstants } from '../Constants/constant';

const { SESSION_EXPIRE } =
sessionExpConstants;

const sessionExpire = (data = {}, cb) => (dispatch) => {
  dispatch({ type: SESSION_EXPIRE, data: { isSessionExpired: false } });
};
export default sessionExpire;
