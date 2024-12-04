import React, { Component } from 'react';
import {
  Row,
  Col,
  Container,
  Label,
  Input,
  Button,
  Collapse
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import submitQuizAction from './submitQuiz';

class Quiz extends Component {
  constructor (props) {
    super(props);
    const { quizList, moduleTitle } = this.props;
    this.recordAnswer = this.recordAnswer.bind(this);
    this.state = {
      questionList: quizList,
      mTitle: moduleTitle,
      answer: [],
      showAnswers: false,
      quizResponse: []
    };
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { quizList, moduleTitle } = props || {}

    if (quizList !== null && moduleTitle !== '') {
      return {
        questionList: quizList,
        mTitle: moduleTitle
      }
    }
    return null
  }

  recordAnswer = (questionStmt, questionId, optionSelected, currentAnswer) => {
    const temp = {
      question: questionStmt,
      question_id: questionId,
      option_selected: optionSelected
    };

    const tempAnswer = currentAnswer;
    const obj = tempAnswer.findIndex(o => o.question_id === questionId);

    if (obj === -1) {
      tempAnswer.push(temp);
      this.setState({
        answer: tempAnswer
      });
    } else {
      tempAnswer[obj].option_selected = optionSelected;
      this.setState({
        answer: tempAnswer
      });
    }
  }

  submitQuiz = () => {
    const { answer } = this.state;
    const { submitQuiz } = this.props;
    const quizRequest = {
      quiz: answer
    }
    submitQuiz({ quizRequest }, (data) => {
      this.setState({
        quizResponse: data.data.data.quiz,
        showAnswers: true
      });
    })
  }

  render () {
    const {
      questionList,
      mTitle,
      answer,
      showAnswers,
      quizResponse
    } = this.state;
    return (
      <React.Fragment>
        <Container className="quiz-container">
          <Col lg="12">
            <Row className="quizTitle">
              <p>
                {mTitle}
                {' Quiz'}
              </p>
            </Row>
            {(questionList.length) > 0 ? (
              <React.Fragment>
                {questionList.map(item => (
                  <Row className="questionsRow">
                    <Col lg="12" className="questionContainer">
                      <p>{item.question}</p>
                    </Col>
                    {item.description !== '' &&
                      <Col lg="12" className="descriptionContainer"> {/* eslint-disable-line */}
                        <p>{item.description}</p>
                      </Col>
                    }
                    <Col lg="12">
                      <Row>
                        <Col lg="3">
                          <Label check>
                            <Input type="radio" name={item.question_id} value="option_a" onChange={() => this.recordAnswer(item.question, item.question_id, 'option_a', answer)} />
                            {'A) '}
                            {item.option_a}
                          </Label>
                        </Col>
                        <Col lg="3">
                          <Label check>
                            <Input type="radio" name={item.question_id} value="option_b" onChange={() => this.recordAnswer(item.question, item.question_id, 'option_b', answer)} />
                            {'B) '}
                            {item.option_b}
                          </Label>
                        </Col>
                        <Col lg="3">
                          <Label check>
                            <Input type="radio" name={item.question_id} value="option_c" onChange={() => this.recordAnswer(item.question, item.question_id, 'option_c', answer)} />
                            {'C) '}
                            {item.option_c}
                          </Label>
                        </Col>
                        <Col lg="3">
                          <Label check>
                            <Input type="radio" name={item.question_id} value="option_d" onChange={() => this.recordAnswer(item.question, item.question_id, 'option_d', answer)} />
                            {'D) '}
                            {item.option_d}
                          </Label>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                ))}
                <Row className="quizFooter">
                  <Button onClick={() => this.submitQuiz()}>Submit</Button>
                  <Collapse isOpen={showAnswers} className="fullWidth">
                    <Row className="questionsRow">
                      {(quizResponse.length) > 0 &&
                        <React.Fragment> {/* eslint-disable-line */}
                          <Col lg="12">
                            <Row>
                              <p>Answers</p>
                            </Row>
                            <Row>
                              <Col lg="4">
                                <p>Question</p>
                              </Col>
                              <Col lg="4">
                                <p>Right Answer</p>
                              </Col>
                              <Col lg="4">
                                <p>Status</p>
                              </Col>
                            </Row>
                            {quizResponse.map(item => (
                              <Row>
                                <Col lg="4">
                                  {item.question}
                                </Col>
                                <Col lg="4">
                                  {item.right_answer}
                                </Col>
                                <Col lg="4">
                                  {item.status}
                                </Col>
                              </Row>
                            ))}
                          </Col>
                        </React.Fragment>
                      }
                    </Row>
                  </Collapse>
                </Row>
              </React.Fragment>
            ) : (
              <Row>
                <Col lg="11" className="noResultsBlock">
                  <h3>No Questions Found</h3>
                </Col>
              </Row>
            )}
          </Col>
        </Container>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  submitQuiz: (payload, cb) => {
    dispatch(submitQuizAction(payload, cb));
  }
});

Quiz.propTypes = {
  quizList: PropTypes.isRequired,
  moduleTitle: PropTypes.isRequired,
  submitQuiz: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Quiz);
