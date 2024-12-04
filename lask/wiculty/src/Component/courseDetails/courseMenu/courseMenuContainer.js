import React, { Component } from 'react';
import {
  Row,
  Col,
  Container,
  Modal,
  ModalBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay, faTimes, faStar, faGift, faFolderOpen
} from '@fortawesome/free-solid-svg-icons';
import CourseMenu from './courseMenu';
import './courseMenu.scss';
import {
  buttonize,
  isShowGift, getLinuxSlug
} from '../../common/utilFunctions/utilFunction';
import BOGO from '../../common/BOGO/BOGO';

// import { IMAGES } from '../../locales/images';
import CourseSneakPeak from './quickGlance/courseSneakPeak';
import CourseSneakPrice from './quickGlance/courseSneakPrice';
import CourseSneakCorporate from './quickGlance/courseSneakCorporate';
import CourseDemo from './quickGlance/courseDemo';
import CurrmDownload from '../curriculum/currmDownload';
import courseInfoAction from '../courseDetailsAction';

class CourseMenuContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
    window.scroll(0, 0);
  }

  toggleModal () {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))
  }

  handleGiftClick () {
    const { history, getCourseDetails } = this.props;
    // course details API call
    getCourseDetails({ courseSlug: getLinuxSlug() }, (data) => {
      history.push(`/${getLinuxSlug()}`);
    })
  }

  render () {
    const {
      courseDetails,
      menuItems,
      history,
      signIn
    } = this.props;
    const { course = {} } = courseDetails;
    const { isOpen } = this.state;
    const {
      display_title, short_description = '',
      rating, no_of_learners = 10,
      no_of_reviews = 10,
      course_banner,
      course_title,
      unique_title,
      course_curriculum,
      video_thumbnail,
      video_url,
      is_selfpaced,
      trending_topic,
      course_slug,
      course_demo_video
    } = course;
    const sectionStyle = {
      backgroundImage: `url(${course_banner})`
    }
    return (
      <>
        <div className="course-menu-container" style={sectionStyle}>
          <Container className="px-0">
            <Row className="mt-0 mt-lg-4" style={{ minHeight: 300, justifyContent: 'flex-start' }}>
              <Col lg={{ size: 8 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }} className="main-course-title pb-4 pt-4 pt-lg-0" style={sectionStyle}>
                <h1 className="course-title">
                  {display_title && display_title}
                  <span className="badge
                    badge-danger
                   live-title
                    ml-2
                    font-weight-normal"
                  >
                    {is_selfpaced ? 'Self Paced' : 'Live Class'}
                  </span>
                </h1>
                {!is_selfpaced && (
                  <h4 className="mb-3">
                    <FontAwesomeIcon icon={faFolderOpen} className="mr-2 linux-gift" />
                    {`Trending ${trending_topic} Included`}
                  </h4>
                )}
                <div className="d-inline-block learners-panel">
                  <div className="px-3 py-2 learners-title rounded text-center">
                    <span>
                      {rating}
                      <FontAwesomeIcon icon={faStar} className="pl-1 rating-star" />
                    </span>
                    <span className="mx-3">
                      {`${no_of_reviews.toLocaleString()}  Ratings`}
                    </span>
                    <span>
                      {`${no_of_learners.toLocaleString()}  Learners`}
                    </span>
                  </div>
                </div>
                <div className="mt-3 short-desc">
                  {parse(short_description)}
                </div>

                <div className="row my-3 users-views d-block d-md-flex justify-content-md-center justify-content-lg-start">
                  <div className="col-lg-6 col-12 p-0">
                    <CurrmDownload
                      course_curriculum={course_curriculum}
                      unique_title={unique_title}
                      page="banner"
                    />
                  </div>
                </div>
                {isShowGift(course_slug) && (
                  <div className="mt-2 px-0 font-weight-bold">
                    <button className="btn btn-link text-white" type="button" onClick={() => this.handleGiftClick()}>
                      <FontAwesomeIcon icon={faGift} className="mr-2 linux-gift" />
                    Free Linux & Shell Scripting Course
                    </button>
                  </div>
                )}

              </Col>
              <Col lg={{ size: 4 }} md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                <div className="course-glance mt-4">
                  <div className="card shadow border">
                    <div className="course-video">
                      <img
                        src={`${process.env.REACT_APP_IMAGE_BASE_URL}${video_thumbnail}`}
                        className="img img-fluid c-p"
                        alt={display_title}
                        {...buttonize(() => {
                          if (video_url) {
                            this.toggleModal()
                          }
                        })}
                      />
                      <span className="play-text font-weight-bold">Why Wiculty?</span>
                      {video_url && (
                        <span className="play-button" {...buttonize(() => { this.toggleModal() })}>
                          <FontAwesomeIcon icon={faPlay} />
                        </span>
                      )}
                    </div>
                    <div className="p-2">
                      {course_demo_video && <CourseDemo course_demo_video={course_demo_video} />}
                      <CourseSneakPrice
                        courseDetails={courseDetails || {}}
                        signIn={() => signIn()}
                        history={history}
                      />
                      <BOGO
                        course_title={course_title}
                        unique_title={unique_title}
                      />
                      <CourseSneakPeak course={course} />
                    </div>
                    <div>
                      <CourseSneakCorporate />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row className="course-menu d-none d-md-flex" id="course-menu">
              <Col lg={{ size: 8 }} md={{ size: 12 }} xs={{ size: 6 }} className="course-list px-0">
                <CourseMenu menuList={menuItems} />
              </Col>
            </Row>
          </Container>
        </div>
        <Modal
          isOpen={isOpen}
          toggle={() => this.toggleModal()}
          className="modal-dialog-centered course-video-modal"
        >
          <div className="modal-close" {...buttonize(() => { this.toggleModal() })}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <ModalBody className="p-0">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe title="video" src={video_url} frameBorder="0" allowFullScreen className="embed-responsive-item" />
            </div>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getCourseDetails: (payload, cb) => {
    dispatch(courseInfoAction(payload, cb))
  }
});

CourseMenuContainer.propTypes = {
  courseDetails: PropTypes.isRequired,
  menuItems: PropTypes.isRequired,
  history: PropTypes.isRequired,
  signIn: PropTypes.func.isRequired,
  getCourseDetails: PropTypes.func.isRequired
};

export default withRouter(
  connect(null, mapDispatchToProps)(CourseMenuContainer)
);
