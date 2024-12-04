import { affiliate } from '../../../Constants/constants';
import URL from '../../../Constants/app-url-constants';
import postService from '../../../services/postService';

const { GET_AFFILIATE__REQUEST, GET_AFFILIATE__SUCCESS, GET_AFFILIATE__FAILURE } =
affiliate;

const affiliateAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.AFFILIATE;
  const methodType = 'POST';
  const obj = { ...payload.getOtpValues }
  postService(dispatch, Url, methodType,
    GET_AFFILIATE__REQUEST, GET_AFFILIATE__SUCCESS,
    GET_AFFILIATE__FAILURE, cb, obj);
};

export default affiliateAction;
