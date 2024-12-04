import React from 'react';
import PropTypes from 'prop-types';

function QuestionCount (props) {
  const { questionCount, total } = props;
  return (
    <div className="questionCount">
      {'Question'}
      <span>{questionCount}</span>
      {'of'}
      <span>{total}</span>
    </div>
  );
}

QuestionCount.propTypes = {
  questionCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
