import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quiz from './components/Quiz';
import Result from './components/Result';
import submitQuizAction from '../submitQuiz';
import sf from '../../common/safeTraverse';
import './Quiz.scss';

const getOrderList = quizList => (
  quizList.reduce((acc, item) => {
    const orderList = Object.keys(item).reduce((obj, key) => {
      if (['description', 'question_id', 'question'].includes(key)) {
        obj[key] = item[key]
      } else {
        obj.answers.push({ 'option': item[key], 'type': key })
      }
      return obj;
    }, { answers: [] })
    return acc.concat(orderList)
  }, [])
)

class QuizContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      counter: 0,
      questionCount: 1,
      question: '',
      questionId: '',
      description: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      orderedQuizList: [],
      recordedAnswers: [],
      quizResults: [],
      showAnswers: false,
      isLoading: false,
      moduleName: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  static getDerivedStateFromProps (props, state) {
    const { moduleName } = state;
    const { moduleTitle, quizList = [] } = props || {};
    if (moduleName !== moduleTitle) {
      const orderedQuizList = getOrderList(quizList);

      const shuffledAnswerOptions = orderedQuizList.map(question => question.answers);
      return {
        isLoading: false,
        showAnswers: false,
        moduleName: moduleTitle,
        question: orderedQuizList[0].question,
        counter: 0,
        questionCount: 1,
        answer: '',
        answersCount: {},
        questionId: orderedQuizList[0].question_id,
        description: orderedQuizList[0].description,
        answerOptions: shuffledAnswerOptions[0],
        orderedQuizList,
        recordedAnswers: []
      }
    }
    return null
  }

  setUserAnswer (answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1
      },
      answer
    }));
  }

  setNextQuestion () {
    let { counter, questionCount } = this.state;
    const { orderedQuizList } = this.state;
    counter += 1;
    questionCount += 1;

    this.setState({
      counter,
      questionCount,
      question: orderedQuizList[counter].question,
      questionId: orderedQuizList[counter].question_id,
      description: orderedQuizList[counter].description,
      answerOptions: orderedQuizList[counter].answers,
      answer: ''
    });
  }

  getResults () {
    const { recordedAnswers } = this.state;

    const { submitQuiz } = this.props;
    const quizRequest = {
      quiz: recordedAnswers
    }
    submitQuiz({ quizRequest }, (data) => {
      const result = sf(data, ['data', 'data', 'quiz']) || [];
      this.setState({
        quizResults: result,
        showAnswers: true,
        isLoading: false
      });
    })
  }

  nextStep () {
    const { questionCount, orderedQuizList } = this.state;
    if (questionCount < orderedQuizList.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      this.setState({
        isLoading: true
      })
      setTimeout(() => this.getResults(), 300);
    }
  }

  handleAnswerSelected (optionSelected, questionId, question) {
    const { recordedAnswers } = this.state;
    this.setUserAnswer(optionSelected);
    const recordAnswerObj = {
      question,
      question_id: questionId, //eslint-disable-line
      option_selected: optionSelected //eslint-disable-line
    };
    this.setState({
      recordedAnswers: recordedAnswers.concat(recordAnswerObj)
    }, () => {
      this.nextStep()
    })
  }

  retakeQuiz () {
    const { quizList = [] } = this.props || {};
    const orderedQuizList = getOrderList(quizList);

    const shuffledAnswerOptions = orderedQuizList.map(question => question.answers);
    this.setState({
      isLoading: false,
      showAnswers: false,
      question: orderedQuizList[0].question,
      counter: 0,
      questionCount: 1,
      answer: '',
      answersCount: {},
      questionId: orderedQuizList[0].question_id,
      description: orderedQuizList[0].description,
      answerOptions: shuffledAnswerOptions[0],
      orderedQuizList,
      recordedAnswers: []
    })
  }

  renderQuiz () {
    const {
      answer, answerOptions, questionCount,
      question, questionId, orderedQuizList,
      description
    } = this.state;
    return (
      <Quiz
        answer={answer}
        answerOptions={answerOptions}
        questionCount={questionCount}
        question={question}
        questionId={questionId}
        description={description}
        questionTotal={orderedQuizList.length}
        onAnswerSelected={
          (optionSelected, queId) => this.handleAnswerSelected(optionSelected, queId, question)
        }
      />
    );
  }

  renderResult () {
    const { quizResults, orderedQuizList } = this.state;
    return (
      <Result
        quizResults={quizResults}
        orderedQuizList={orderedQuizList}
        retakeQuiz={() => this.retakeQuiz()}
      />
    );
  }

  render () {
    const { showAnswers, isLoading } = this.state;
    return (
      <div className="quiz-container">
        {isLoading && <div className="loading" />}
        {showAnswers ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  submitQuiz: (payload, cb) => {
    dispatch(submitQuizAction(payload, cb));
  }
});

QuizContainer.propTypes = {
  submitQuiz: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(QuizContainer);
