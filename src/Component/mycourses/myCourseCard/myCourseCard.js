import React, { Component } from 'react';
import { Row, Col, Progress } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

import FeedBack from '../../common/feedBackForm/feedbackForm';
import LectureBayBatchDetails from '../lectureBayBatchDetails/LBayBatchDetails';

import sf from '../../common/safeTraverse';
import messageFn from '../../common/message';

import './myCourseCard.scss';

// redux actions import start
import globalDetails from '../../../Actions/globalDataAction';
import batchSelectionAction from './selectBatchAction';
import LBayBatchDetailsAction from '../lectureBayBatchDetails/LBayBatchDetailsAction';
// redux actions import end

import { MESSAGES } from '../../locales/locale'

const {
  NO_BATCHES,
  TOASTER_STATUS: { WARNING }
} = MESSAGES

class MyCourseCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      LBayBatchDetails: [],
      isComponentUpdate: false,
      isLoading: false,
      selectBatchToggleObj: {}
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { LBayBatchDetails, isLoading } = props || {};
    const { isComponentUpdate } = state;
    const LBayBatchDetailArr = sf(LBayBatchDetails, ['data', 'data', 'batch']) || [];
    if (isComponentUpdate) {
      return {
        LBayBatchDetails: LBayBatchDetailArr,
        isLoading
      }
    }
    return null
  }

  handleBatchDetails (course_id, courseName) {
    const { getLBayBatchDetails } = this.props;
    getLBayBatchDetails({ course_id }, (resp = {}) => {
      const batchInfo = sf(resp, ['data', 'data', 'batch']) || [];
      if (batchInfo.length > 0) {
        this.setState(state => ({
          isComponentUpdate: true,
          selectBatchToggleObj: {
            [courseName]: true
          }
        }))
      } else {
        messageFn(NO_BATCHES, WARNING)
        this.setState(state => ({
          selectBatchToggleObj: {
            [courseName]: false
          }
        }))
      }
    })
  }

  handleLMSView (courseID, courseSlug, batch_id) {
    const { setGlobalDetails, history, resetLMSData } = this.props;
    // clear LMS old data
    resetLMSData()
    // batch_id courseSlug store in global reducer
    setGlobalDetails({ courseBatchId: batch_id, courseSlug }, (resp) => {
      history.push(`/class-room/${courseSlug}`)
    })
  }

  selectBatchClick (courseID, courseSlug, batch_id) {
    const { selectBatch } = this.props;

    const request = {
      course: courseID,
      batch: batch_id
    };

    selectBatch({ request }, (resp) => {
      if (resp.status === 200) {
        this.handleLMSView(courseID, courseSlug, batch_id);
      }
    })
  }

  renderView () {
    const {
      courseData = {}
    } = this.props;
    const { course = {} } = courseData;
    const {
      course_title, display_title, batch_time, course_image,
      isSelfpaced, description, isFreeCourse
    } = course;
    return (
      <div className="row px-2 pt-3">
        <div className="col-lg-2 col-md-3 col-4">
          <img src={course_image} alt={course_title} className="img-fluid" />
        </div>
        <div className="col-lg-10 col-md-8 col-8">
          <h5>
            {display_title}
            {isFreeCourse ? (
              <span className="badge badge-info mx-2">Free Course</span>
            ) : ''}
          </h5>
          {!isSelfpaced && (
            <div className="text-capitalize my-2">
              <span>Batch Time:</span>
              <span className={classNames('font-weight-bold px-2', { 'text-info': !batch_time })}>
                {batch_time || 'Batch selection pending'}
              </span>
            </div>
          )}

          <p className="text-black-50 mt-2 d-none d-md-block">
            {description && parse(description)}
          </p>
          <div className="d-none d-md-block">
            {this.renderProgressSec()}
          </div>
        </div>
      </div>
    )
  }

  renderProgressSec () {
    const {
      courseData = {}, toggleFeedBack
    } = this.props;
    const { course = {} } = courseData;
    const { timeLeft = 0, isSelfpaced, course_title } = course;
    return (
      <Row>
        {!isSelfpaced && (
          <Col className="col-md-5 col-sm-12">
            {
              <>
                <Progress striped color="info" value={Math.ceil(timeLeft)}>{`${Math.ceil(timeLeft)}%`}</Progress>
                <span className="mt-2 text-black-50">
                    course coverage
                </span>
              </>
            }
          </Col>
        )}
        <Col className={classNames('col-md-6 col-sm-12', { 'text-center': !isSelfpaced, 'text-left': isSelfpaced })}>
          <button className="btn btn-link text-info" type="button" onClick={() => toggleFeedBack(course_title)}>
            <FontAwesomeIcon className="feed-back-icon mx-2" icon={faCommentAlt} />
            <span>Feedback</span>
          </button>
        </Col>
      </Row>
    )
  }

  render () {
    const {
      courseData = {}, handleFeedBack, feedBackObj,
      feedBackSectionObj, handleSubmitFeedBack, feedBackError
    } = this.props;
    const { course = {}, course_id, batch_id } = courseData
    const courseName = course.course_title;
    const {
      isSelfpaced
    } = course;
    const { LBayBatchDetails, isLoading, selectBatchToggleObj } = this.state;
    return (
      <div className="mycourse-card-container rounded mb-5">
        {isLoading && <div className="loading" />}
        <div className="mycourse-card-text">
          <div className="d-block">
            {this.renderView()}
          </div>
          <div className="d-block d-md-none my-3">
            {this.renderProgressSec()}
          </div>
        </div>
        <Row>
          <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <div className={classNames('feedback-section', { show: feedBackSectionObj[courseName] })}>
              <FeedBack
                handleFeedBack={
                  (feedBackValue, feedBackField) => handleFeedBack(feedBackValue,
                    feedBackField, courseName, course_id)
                }
                feedBackObj={feedBackObj}
                courseName={courseName}
                type="course"
                feedBackError={feedBackError}
                handleSubmitFeedBack={() => handleSubmitFeedBack(courseName)}
              />
            </div>
          </Col>
        </Row>
        {selectBatchToggleObj[courseName] &&
          (
            <div>
              {(LBayBatchDetails && LBayBatchDetails.length > 0) &&
                  (
                    <LectureBayBatchDetails
                      LBayBatchDetails={LBayBatchDetails}
                      slug={course.course_slug}
                      handleLMSView={
                        (courseId, course_slug, batchId) => this.selectBatchClick(
                          courseId, course.course_slug, batchId
                        )
                      }
                    />
                  )}
            </div>
          )}
        <div>
          <div className="text-center my-3">
            <h5>
              {`Join your ${isSelfpaced ? '' : 'live'} classroom here`}
            </h5>
            {batch_id || isSelfpaced
              ? (
                <button type="button" className="btn btn-theme btn-md" onClick={() => this.handleLMSView(course_id, course.course_slug, batch_id)}>
                  {'Bounce to course'}
                </button>
              )
              : (
                <button type="button" className="btn btn-theme btn-md" onClick={() => this.handleBatchDetails(course_id, courseName)}>
                  {'Select batch'}
                </button>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDetails(payload, cb));
  },
  getLBayBatchDetails: (payload, cb) => {
    dispatch(LBayBatchDetailsAction(payload, cb));
  },
  selectBatch: (payload, cb) => {
    dispatch(batchSelectionAction(payload, cb));
  },
  resetLMSData: () => {
    dispatch({ type: 'RESET_LMS_DATA', payload: [] });
  }
});

const mapStateToProps = state => ({
  LBayBatchDetails: state.LBayBatchDetails
});

MyCourseCard.propTypes = {
  getLBayBatchDetails: PropTypes.func.isRequired,
  handleSubmitFeedBack: PropTypes.func.isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  handleFeedBack: PropTypes.func.isRequired,
  toggleFeedBack: PropTypes.func.isRequired,
  selectBatch: PropTypes.func.isRequired,
  courseData: PropTypes.isRequired,
  feedBackSectionObj: PropTypes.isRequired,
  feedBackObj: PropTypes.isRequired,
  history: PropTypes.isRequired,
  feedBackError: PropTypes.bool.isRequired,
  resetLMSData: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourseCard);
