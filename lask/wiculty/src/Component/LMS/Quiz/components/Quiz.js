import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Question from './Question';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import messageFn from '../../../common/message';
import { MESSAGES } from '../../../locales/locale';

const {
  TOASTER_STATUS: { ERROR }
} = MESSAGES
function Quiz (props) {
  const {
    answer, questionCount, onAnswerSelected,
    answerOptions, questionTotal, description,
    question, questionId
  } = props;
  function renderAnswerOptions (key, index) {
    return (
      <AnswerOption
        key={`${key.option}${index}`}
        answerContent={key.option}
        answerType={key.type}
        answer={answer}
        questionCount={questionCount}
        questionId={questionId}
        onAnswerSelecteds={event => onAnswerSelected(event.target.value, questionId)}
      />
    );
  }

  function submitQuestion () {
    const val = document.querySelector(`input[name = "ques-${questionId}"]:checked`);
    if (!val) {
      messageFn('Please select the answer', ERROR)
      return;
    }
    onAnswerSelected(val.value, questionId)
  }

  return (
    <CSSTransition
      className="quiz-container question-section"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div key={questionId}>
        <QuestionCount questionCount={questionCount} total={questionTotal} />
        <Question question={question} description={description} />
        <ul className="answerOptions">
          {answerOptions.map(renderAnswerOptions)}
        </ul>
        <div className="mt-2 text-right mb-4 mx-3">
          <button type="button" className="btn btn-theme" onClick={() => submitQuestion()}>
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            Next
          </button>
        </div>
      </div>
    </CSSTransition>
  );
}

Quiz.propTypes = {
  answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.isRequired,
  description: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionCount: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
