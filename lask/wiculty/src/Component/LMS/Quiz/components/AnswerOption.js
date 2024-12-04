import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function AnswerOption (props) {
  const {
    answerType, answerContent, questionId
  } = props;
  return (
    <li className="answerOption">
      <input
        type="radio"
        className="radioCustomButton"
        name={`ques-${questionId}`}
        id={answerType}
        value={answerType}
      />
      <label className="radioCustomLabel" htmlFor={answerType}>{/* eslint-disable-line */}
        {parse(answerContent)}
      </label>
    </li>
  );
}

AnswerOption.propTypes = {
  answerType: PropTypes.string.isRequired,
  answerContent: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired
};

export default AnswerOption;
