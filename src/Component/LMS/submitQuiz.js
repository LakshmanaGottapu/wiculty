import { submitQuiz } from '../../Constants/constants';
import URL from '../../Constants/app-url-constants';
import postService from '../../services/postService';

const { GET_QUIZ__REQUEST, GET_QUIZ__SUCCESS, GET_QUIZ__FAILURE } =
submitQuiz;

const submitQuizAction = (payload = {}, cb) => (dispatch) => {
  const Url = URL.RESOURCES.SERVICE_URL.VERIFY_ANSWER;
  const methodType = 'POST';
  const obj = { ...payload.quizRequest }
  postService(dispatch, Url, methodType,
    GET_QUIZ__REQUEST, GET_QUIZ__SUCCESS,
    GET_QUIZ__FAILURE, cb, obj);
};

export default submitQuizAction;
