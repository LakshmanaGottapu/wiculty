import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'
import myCoursesAction from './mycourseAction';
import CourseLeftPanel from './courseLeftPanel';
import MyCourseCard from './myCourseCard/myCourseCard';
import CourseBannerLatest from './courseBannner/courseBannerLatest';

import courseFeedBackAction from './courseFeedBackAction';
import sf from '../common/safeTraverse';
import { MESSAGES } from '../locales/locale';
import NoDataComp from '../common/noDataComp/noDataComp';
import GifContainer from '../common/gifContainer';
import messageFn from '../common/message';
import './mycourses.scss';

const { ERROR: { NO_COURSES, GENERIC_ERR }, TOASTER_STATUS: { ERROR, SUCCESS } } = MESSAGES;

const getPlaceHolder = (courses, flag) => {
  if (flag && !courses.length > 0) {
    return <NoDataComp msg={NO_COURSES} />
  }
  return (
    <div>
      <GifContainer />
      <GifContainer />
      <GifContainer />
    </div>
  )
}

class MycourseContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isComponentUpdate: false,
      mycourseDetails: {},
      feedBackObj: {
        course_rating: 6,
        instructor_rating: 6
      },
      feedBackSectionObj: {},
      loadingBarProgress: 40,
      feedBackError: false
    };
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { mycourseDetails, isLoading } = props || {};
    const { isComponentUpdate } = state;

    if (isComponentUpdate) {
      return {
        mycourseDetails: mycourseDetails.data,
        isLoading,
        loadingBarProgress: 100
      }
    }
    return null
  }

  componentDidMount () {
    const { getMyCourseDetails } = this.props || {};

    getMyCourseDetails({}, (resp) => {
      this.setState({
        isComponentUpdate: true,
        loadingBarProgress: 100
      })
    })
  }

  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 })
  }

  handleFeedBack (feedBackValue, feedBackField, courseName, course_id) {
    const { feedBackObj } = this.state;
    const feedBack = {
      ...feedBackObj,
      [feedBackField]: feedBackValue,
      course_id,
      courseName
    }
    const { course_rating, instructor_rating } = feedBack;
    if (course_rating && instructor_rating) {
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

  toggleFeedBack (courseName) {
    this.setState(state => ({
      feedBackSectionObj: {
        [courseName]: !state.feedBackSectionObj[courseName]
      },
      feedBackObj: {
        ...state.feedBackObj,
        feedback: ''
      },
      feedBackError: false
    }))
  }

  handleSubmitFeedBack (course_id) {
    let { feedBackObj } = this.state;
    const { course_rating, instructor_rating, courseName } = feedBackObj;
    feedBackObj = {
      ...feedBackObj,
      course_id
    }
    const { submitFeedBack } = this.props;
    if (course_rating && instructor_rating) {
      submitFeedBack(feedBackObj, (resp) => {
        const { data = {}, status } = resp || {};
        if (status === 200) {
          const { data: { message = '' } } = data
          messageFn(message, SUCCESS)
          this.toggleFeedBack(courseName);
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
      mycourseDetails = {}, feedBackObj, loadingBarProgress,
      feedBackSectionObj, isComponentUpdate, feedBackError
    } = this.state;
    const { history } = this.props;
    const myCourses = sf(mycourseDetails, ['data', 'courses']) || [];

    return (
      <React.Fragment>
        <div className="mycourses-container">
          <Helmet>
            <title>Wiculty - My Courses</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Wiculty - My Courses" />
          </Helmet>
          {/* {isLoading && <div className="loading" />} */}
          <Row>
            <Col className="pd0" lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
              <div className="right-cards mb-4">
                <CourseBannerLatest />
              </div>
            </Col>
          </Row>
          <div className="lecture-bay-details container-fluid">
            <Row>
              <Col className="course-right order-sm-2" lg={{ size: 9 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <div className="right-cards-mycourse">
                  {myCourses.length > 0 ? myCourses.map(item => (
                    <MyCourseCard
                      courseData={item || {}}
                      history={history}
                      toggleFeedBack={courseName => this.toggleFeedBack(courseName)}
                      handleFeedBack={(feedBackValue,
                        feedBackField, courseName, course_id) => this.handleFeedBack(
                        feedBackValue, feedBackField, courseName, course_id
                      )}
                      handleSubmitFeedBack={() => this.handleSubmitFeedBack(item.course_id)}
                      feedBackSectionObj={feedBackSectionObj}
                      feedBackObj={feedBackObj}
                      feedBackError={feedBackError}
                    />
                  ))
                    : (
                      getPlaceHolder(myCourses, isComponentUpdate)
                    )}
                </div>
              </Col>
              <Col className="course-left order-sm-1" lg={{ size: 3 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <CourseLeftPanel />
              </Col>
            </Row>
          </div>
        </div>
        <LoadingBar
          progress={loadingBarProgress}
          height={3}
          color="red"
          onLoaderFinished={() => this.onLoaderFinished()}
        />
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getMyCourseDetails: (payload, cb) => {
    dispatch(myCoursesAction(payload, cb));
  },
  submitFeedBack: (payload, cb) => {
    dispatch(courseFeedBackAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  mycourseDetails: state.mycourseDetails
});

MycourseContainer.propTypes = {
  history: PropTypes.isRequired,
  submitFeedBack: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MycourseContainer);
