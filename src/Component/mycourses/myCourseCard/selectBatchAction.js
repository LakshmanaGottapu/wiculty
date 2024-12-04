import { batchSelection } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import putService from '../../../services/putService';

const { GET_BATCHSELECTION__REQUEST, GET_BATCHSELECTION__SUCCESS, GET_BATCHSELECTION__FAILURE } =
batchSelection;

const batchSelectionAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.BATCHSELECT;
  const methodType = 'PUT';
  const obj = { ...payload.request }
  putService(dispatch, Url, methodType,
    GET_BATCHSELECTION__REQUEST, GET_BATCHSELECTION__SUCCESS,
    GET_BATCHSELECTION__FAILURE, cb, obj);
};

export default batchSelectionAction;
