import React, { Component } from 'react';
//  { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar'
import sf from '../common/safeTraverse';
import myBatchesAction from './mybatchesAction';
import myCoursesAction from '../mycourses/mycourseAction';
import CourseLeftPanel from '../mycourses/courseLeftPanel';
import CourseBannerLatest from '../mycourses/courseBannner/courseBannerLatest';
import MyBatchCard from './mybatchesCards';

import './mybatches.scss'

class MybatchesContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isComponentUpdate: false,
      myBatches: {},
      loadingBarProgress: 10,
      isLoading: false
    };
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { mybatchDetails, isLoading } = props || {};
    const { isComponentUpdate } = state;

    if (isComponentUpdate) {
      const myBatches = sf(mybatchDetails, ['data', 'data', 'batches']) || []
      return {
        myBatches,
        isLoading,
        loadingBarProgress: 100
      }
    }
    return null
  }

  componentDidMount () {
    const { getMyBatchDetails } = this.props || {};
    getMyBatchDetails({}, (resp) => {
      this.setState({
        isComponentUpdate: true,
        loadingBarProgress: 100
      })
    })
  }

  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 })
  }

  progress () {
    const { loadingBarProgress } = this.state;
    if (loadingBarProgress < 80) {
      this.setState(state => ({
        loadingBarProgress: state.loadingBarProgress + 10
      }))
      this.timer = setInterval(
        () => { this.progress() },
        1000
      );
    } else {
      clearInterval(this.timer);
    }
  }

  render () {
    const {
      myBatches = [], loadingBarProgress, isLoading
    } = this.state;
    const { history } = this.props;
    return (
      <>
        <div className="mycourses-container">
          <Helmet>
            <title>Wiculty - My Batches</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Wiculty - My Batches" />
          </Helmet>
          {isLoading && <div className="loading" />}
          <Row>
            <Col className="pd0" lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
              <div className="right-cards" style={{ marginBottom: 20 }}>
                <CourseBannerLatest />
              </div>
            </Col>
          </Row>
          <div className="lecture-bay-details">
            <Row>
              <Col className="course-right mb-4 order-sm-2" lg={{ size: 8 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <div className="right-cards-mycourse">
                  {myBatches.length > 0 ? myBatches.map(item => (
                    <MyBatchCard
                      courseData={item || {}}
                      history={history}
                    />
                  ))
                    : (
                      <div className="noCourses-msg-section">
                        <span>
                          {'No batches assigned to you, Please contact support '}
                        </span>
                      </div>
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
      </>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  getMyBatchDetails: (payload, cb) => {
    dispatch(myBatchesAction(payload, cb));
  },
  getMyCourseDetails: (payload, cb) => {
    dispatch(myCoursesAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  mybatchDetails: state.mybatchDetails
});

MybatchesContainer.propTypes = {
  history: PropTypes.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(MybatchesContainer);
