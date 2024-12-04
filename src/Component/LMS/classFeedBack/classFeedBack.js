import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ClassFeedBackModal from './classFeedBackModal';
import classFeedBackAction from './classFeedBackAction';
import attendanceDetails from '../LMSModulePanel/attendanceAction';
import { MESSAGES } from '../../locales/locale';
import messageFn from '../../common/message'
import './classFeedBack.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class ClassFeedBack extends Component {
  constructor (props) {
    super(props);
    this.state = {
      feedBackObj: {
        class_rating: 6,
        instructor_rating: 6
      },
      feedBackError: false
    };
    window.scroll(0, 0);
  }

  handleFeedBack (feedBackValue, feedBackField, courseName, class_id) {
    const { feedBackObj } = this.state;
    const { classId } = this.props;
    const feedBack = {
      ...feedBackObj, [feedBackField]: feedBackValue, 'class_id': classId
    }
    const { class_rating, instructor_rating } = feedBack;
    if (class_rating && instructor_rating) {
      this.setState({
        feedBackObj: feedBack,
        feedBackError: false
      })
    } else {
      this.setState({
        feedBackObj: feedBack,
        feedBackError: true
      })
    }
  }

  handleSubmitFeedBack () {
    let { feedBackObj } = this.state;
    const { class_rating, instructor_rating } = feedBackObj;
    const {
      submitFeedBack, getAttendance, globalDetails,
      handlePopUpClose, classId
    } = this.props;
    feedBackObj = {
      ...feedBackObj,
      class_id: classId
    }
    const { courseBatchId } = globalDetails
    if (class_rating && instructor_rating) {
      submitFeedBack(feedBackObj, (resp) => {
        const { data = {}, status } = resp || {};
        if (data && status === 200) {
          handlePopUpClose()
          getAttendance({ batchID: courseBatchId }, () => {})
          const { data: { message = '' } } = data
          messageFn(message, SUCCESS)
          this.setState({
            feedBackObj: {
              ...feedBackObj,
              feedback: ''
            },
            feedBackError: false
          })
        } else {
          const { message = GENERIC_ERR } = data;
          messageFn(message, ERROR)
          this.setState({
            feedBackError: false
          })
        }
      })
    } else {
      this.setState({
        feedBackError: true
      })
    }
  }

  render () {
    const {
      feedBackObj, feedBackError, classTime, class_id
    } = this.state;
    const { handlePopUpClose, isModalOpen, batchDate } = this.props;
    return (
      <div className="class-feedback-container">
        <ClassFeedBackModal
          batchDate={batchDate}
          isModalOpen={isModalOpen}
          Close={() => handlePopUpClose()}
          handleFeedBack={
            (feedBackValue, feedBackField) => this.handleFeedBack(feedBackValue,
              feedBackField, classTime, class_id)
          }
          feedBackObj={feedBackObj}
          feedBackError={feedBackError}
          handleSubmitFeedBack={() => this.handleSubmitFeedBack(classTime)}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  submitFeedBack: (payload, cb) => {
    dispatch(classFeedBackAction(payload, cb));
  },
  getAttendance: (payload, cb) => {
    dispatch(attendanceDetails(payload, cb));
  }
});

export const mapStateToProps = state => ({
  globalDetails: state.globalDetails
});

ClassFeedBack.propTypes = {
  submitFeedBack: PropTypes.func.isRequired,
  handlePopUpClose: PropTypes.func.isRequired,
  getAttendance: PropTypes.func.isRequired,
  classId: PropTypes.string,
  isModalOpen: PropTypes.bool.isRequired,
  globalDetails: PropTypes.shape({}).isRequired,
  batchDate: PropTypes.string
}

ClassFeedBack.defaultProps = {
  batchDate: '',
  classId: ''
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassFeedBack);
