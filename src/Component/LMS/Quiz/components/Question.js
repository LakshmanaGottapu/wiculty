import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

function Question (props) {
  const { description, question } = props;
  return (
    <div>
      <p className="question">
        {parse(question)}
      </p>
      { description && <p className="description">{parse(description)}</p> }
    </div>
  )
}

Question.propTypes = {
  question: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Question;
