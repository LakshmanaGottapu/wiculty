import { attendance } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import getService from '../../../services/getService';

const {
  GET_ATTENDANCE__REQUEST,
  GET_ATTENDANCE__SUCCESS,
  GET_ATTENDANCE__FAILURE
} =
attendance;

const attendanceDetails = (batchID = {}, cb) => (dispatch) => {
  const Url = `${URL.RESOURCES.SERVICE_URL.ATTENDANCE}${batchID.batchID}`;
  const methodType = 'GET';
  getService(dispatch, Url, methodType,
    GET_ATTENDANCE__REQUEST,
    GET_ATTENDANCE__SUCCESS,
    GET_ATTENDANCE__FAILURE, cb);
};

export default attendanceDetails;
