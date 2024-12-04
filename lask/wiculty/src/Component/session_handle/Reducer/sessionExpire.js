import { sessionExpConstants } from '../Constants/constant';

const { SESSION_EXPIRE } =
sessionExpConstants;

export default function sessionExpireInfo (state = {}, action) {
  const { type, data = {} } = action;
  switch (type) {
    case SESSION_EXPIRE:
      return { ...data };
    default:
      return state;
  }
}
