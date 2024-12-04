import React, { Component } from 'react';
import {
  Col, Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faGift } from '@fortawesome/free-solid-svg-icons';

import globalDataAction from '../../Actions/globalDataAction';
import { isShowGift, getLinuxSlug } from '../common/utilFunctions/utilFunction';

class CoursesListing extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  getCourseDetails (slug) {
    const { history, getGlobalDetails } = this.props;
    getGlobalDetails({ isFrom: 'course-details' }, (data) => {
      history.push(`/${slug}`)
    });
  }

  render () {
    const {
      image,
      displayTitle,
      rating,
      key_skills = [],
      no_of_learners,
      no_of_reviews,
      course_duration,
      project_duration,
      trending_topic,
      free_video_hrs,
      slug,
      isSelfpaced
    } = this.props;
    return (
      <React.Fragment>
        <div className="mobile-view mb-3">
          <Row className="px-2 py-4 mobile-view-courseitem bg-white rounded">
            <Col lg="2" md="3" className="d-none d-sm-block">
              <img className="img-fluid" src={image} alt={displayTitle} />
            </Col>
            <Col lg="10" md="9" xs="12">
              <Row>
                <Col lg="12" md="12" xs="12">
                  <h5 className="mb-2">
                    {displayTitle}
                  </h5>
                  <div>
                    <div className="align-top mt-1 text-white badge badge-warning">
                      {rating}
                      <FontAwesomeIcon icon={faStar} className="pl-1" />
                    </div>
                    <div className="align-top ml-1 d-inline-block">
                      (
                      {`${no_of_reviews || 0}`}
                      )
                    </div>
                    <div className="ml-3 align-top mt-1 text-white badge badge-success d-none d-md-inline-block">
                      {`${no_of_learners || 0}+ learners`}
                    </div>
                    {trending_topic ? (
                      <div className="ml-3 align-top mt-1 text-white badge badge-info">
                        Trending Topic:
                        <span className="pl-1">
                          {trending_topic}
                        </span>
                      </div>
                    ) : ''}
                    {!isSelfpaced && (
                      <div className="ml-3 align-top text-muted d-none d-md-inline-block">
                        <FontAwesomeIcon icon={faCalendar} className="pr-1 pt-1" />
                        <span className="small">
                        Weekend/Weekday
                        </span>
                      </div>
                    )}
                  </div>
                  {isShowGift(slug) && (
                    <div className="mt-2 text">
                      <button
                        className="btn btn-link btn-md text-success"
                        onClick={() => this.getCourseDetails(getLinuxSlug())}
                        type="button"
                      >
                        <FontAwesomeIcon
                          icon={faGift}
                          className="mr-1 mt-1"
                        />
                    Free Linux & Shell Scripting Course
                      </button>

                    </div>
                  )}
                </Col>
              </Row>
              <Row>
                <Col lg="7" md="12" xs="12">
                  <div className="mt-2 text-muted">
                    <strong>
                      Key Skills -
                    </strong>
                    {key_skills.join(', ')}
                  </div>
                  <button
                    className="btn btn-theme-bordered btn-sm rounded-pill mt-2 d-none d-md-flex"
                    onClick={() => this.getCourseDetails(slug)}
                    type="button"
                  >
                    Get More Details
                  </button>
                </Col>
                <Col lg="5" md="12" xs="12">
                  <div className="d-flex justify-content-around align-items-center mt-4 mt-lg-0">
                    <div className="text-center w-100">
                      <h3>
                        {course_duration || 0}
                        <small> hrs</small>
                      </h3>
                      <small className="text-muted">Duration</small>
                    </div>
                    <div className="text-center border-left w-100">
                      <h3>
                        {project_duration || 0}
                        <small> hrs</small>
                      </h3>
                      <small className="text-muted">Projects</small>
                    </div>
                    {free_video_hrs ? (
                      <div className="text-center w-100 border-left">
                        <h3>
                          {free_video_hrs}
                          <small> hrs</small>
                        </h3>
                        <small className="text-muted pl-2">Self Paced Videos</small>
                      </div>
                    ) : ''}
                  </div>
                  <div className="mt-4 d-block d-md-none text-center">
                    <button
                      className="btn btn-theme-bordered btn-sm rounded-pill mt-2"
                      onClick={() => this.getCourseDetails(slug)}
                      type="button"
                    >
                      Get More Details
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb));
  }
});

CoursesListing.propTypes = {
  image: PropTypes.isRequired,
  displayTitle: PropTypes.isRequired,
  rating: PropTypes.isRequired,
  slug: PropTypes.isRequired,
  getGlobalDetails: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
  no_of_learners: PropTypes.isRequired,
  no_of_reviews: PropTypes.isRequired,
  key_skills: PropTypes.isRequired,
  course_duration: PropTypes.isRequired,
  project_duration: PropTypes.isRequired,
  trending_topic: PropTypes.string,
  free_video_hrs: PropTypes.number,
  isSelfpaced: PropTypes.number
};

CoursesListing.defaultProps = {
  trending_topic: false,
  free_video_hrs: 0,
  isSelfpaced: 0
}

export default connect(null, mapDispatchToProps)(CoursesListing);
