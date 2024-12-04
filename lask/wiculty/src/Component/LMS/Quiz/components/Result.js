import React from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import {
  Row,
  Col
} from 'reactstrap';
import { CSSTransition } from 'react-transition-group';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import 'react-circular-progressbar/dist/styles.css';

function Result (props) {
  const { quizResults, orderedQuizList } = props;
  function getSelectedOption (optionSelected) {
    return (optionSelected && optionSelected.split('_')[1].toUpperCase());
  }
  function getCircleColor (value) {
    if (value < 40) {
      return '#dc3545';
    }
    if (value >= 40 && value < 70) {
      return '#ffc107';
    }
    if (value >= 70) {
      return '#28a745';
    }
    return '#28a745';
  }
  function quizResultData () {
    const result = {
      total: quizResults.length,
      rightAnswers: 0,
      rightPercent: 0,
      color: 'green'
    };
    quizResults.forEach((r) => {
      const userAnswer = getSelectedOption(r.option_selected);
      if (userAnswer === r.right_answer) {
        result.rightAnswers += 1;
      }
    });
    result.rightPercent = Math.round((result.rightAnswers / result.total) * 100);
    result.circleColor = getCircleColor(result.rightPercent);
    return result;
  }

  function getUserAnswerText (item) {
    const { option_selected, question_id } = item;
    const question = orderedQuizList.find(o => o.question_id === question_id);
    if (question) {
      const { answers } = question;
      const answer = answers.find(o => o.type === option_selected);
      if (answer) {
        return answer.option;
      }
    }
    return '';
  }

  function getCorrectAnswerText (item) {
    const { right_answer, question_id } = item;
    const question = orderedQuizList.find(o => o.question_id === question_id);
    if (question) {
      const { answers } = question;
      const answer = answers.find(o => o.type === `option_${right_answer.toLowerCase()}`);
      if (answer) {
        return answer.option;
      }
    }
    return '';
  }

  function retakeQuizFn () {
    const { retakeQuiz } = props;
    retakeQuiz();
  }

  return (
    <CSSTransition
      className="container quiz-results"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <Row className="circle-progress">
          <Col className="text-center">
            <CircularProgressbar
              value={quizResultData().rightPercent}
              text={`${quizResultData().rightAnswers} / ${quizResultData().total}`}
              styles={buildStyles({
                // Text size
                textSize: '16px',
                // Colors
                pathColor: `${quizResultData().circleColor}`,
                textColor: 'grey'
              })}
            />
          </Col>
        </Row>
        <Row>
          {(quizResults.length) > 0 &&
            (
              <Col lg="12">
                <Row className="answer-heading">
                  {'Answers:'}
                </Row>
                <ol>
                  {quizResults.map(item => (
                    <li>
                      <Row className="quiz-results-body">
                        <Col lg="12">
                          {parse(item.question)}
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col>
                          {/* <span className="ftb pdlr5"> Your Answer: </span> */}
                          {/* <span>{getSelectedOption(item.option_selected)}</span> */}
                          <div className="mt-2 answer-marks">
                            {
                              getSelectedOption(item.option_selected) === item.right_answer
                                ? (
                                  <div className="alert alert-success" role="alert">
                                    <strong>
                                      Your Answer: (
                                      <FontAwesomeIcon icon={faCheck} />
                                      )
                                    </strong>
                                    { parse(getUserAnswerText(item)) }
                                  </div>
                                )
                                : (
                                  <div>
                                    <div className="alert alert-danger" role="alert">
                                      <strong>
                                        Your Answer: (&nbsp;
                                        <FontAwesomeIcon icon={faTimes} />
                                        &nbsp;)
                                      </strong>
                                      { parse(getUserAnswerText(item)) }
                                    </div>
                                    <div className="mt-2">
                                      {/* <span className="ftb pdlr5">Correct Answer:</span> */}
                                      <div className="alert alert-success" role="alert">
                                        <strong>
                                          Correct Answer: (
                                          <FontAwesomeIcon icon={faCheck} />
                                          )
                                        </strong>
                                        { parse(getCorrectAnswerText(item)) }
                                      </div>
                                    </div>
                                  </div>
                                )}
                          </div>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ol>
              </Col>
            )
          }
        </Row>
        <Row>
          <Col lg="12" className="text-center">
            <button type="button" className="btn btn-lg btn-theme" onClick={retakeQuizFn}> Retake Quiz</button>
          </Col>
        </Row>
      </div>
    </CSSTransition>
  );
}

Result.propTypes = {
  quizResults: PropTypes.string.isRequired,
  orderedQuizList: PropTypes.string.isRequired,
  retakeQuiz: PropTypes.func.isRequired
};

export default Result;
