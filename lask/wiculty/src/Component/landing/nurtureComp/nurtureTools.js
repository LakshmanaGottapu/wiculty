import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faGift } from '@fortawesome/free-solid-svg-icons';

import { getFilteredCourses, getLinuxSlug, isShowGift } from '../../common/utilFunctions/utilFunction';

const NurtureTools = ({
  order,
  courses = {}
}) => {
  const { data = [] } = courses;
  const courseList = getFilteredCourses('instructorLed', data);
  const getKeySkills = nurtureItem => nurtureItem.key_skills.join(', ').substr(0, 40);
  return (
    <Row className="nurture-tools-container padding0">
      {courseList.map(nurtureItem => (
        <Col lg="6" sm="12" className="nurture-card d-flex align-items-stretch">
          <a href={nurtureItem.course_slug} className={`pt-2 nurture-item-link shadow nc-${nurtureItem.course_slug}`}>
            <Row key={`s-${nurtureItem.id}`}>
              <Col className="col-12 padding0">
                <Row className="padding0 mb-2">
                  <Col className="course-info">
                    <h4 style={{ color: nurtureItem.course_color }}>
                      {nurtureItem.display_title}
                    </h4>
                  </Col>
                  <Col className="nurture-img-container">
                    <span className="badge badge-color">{`${nurtureItem.program_type} program`}</span>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12" md="12" xs="12">
                    <div>
                      <div className="align-top mt-1 text-white badge badge-warning">
                        {nurtureItem.rating}
                        <FontAwesomeIcon icon={faStar} className="pl-1" />
                      </div>
                      <div className="align-top ml-1 d-inline-block">
                      (
                        {`${nurtureItem.no_of_reviews || 0}`}
                      )
                      </div>
                      <div className="ml-3 align-top mt-1 text-white badge badge-success d-none d-md-inline-block">
                        {`${nurtureItem.no_of_learners || 0}+ learners`}
                      </div>
                      {nurtureItem.trending_topic ? (
                        <div className="ml-3 align-top mt-1 text-white badge badge-info">
                        Trending Topic:
                          <span className="pl-1">
                            {nurtureItem.trending_topic}
                          </span>
                        </div>
                      ) : ''}
                      {!nurtureItem.is_selfpaced && (
                        <div className="ml-3 align-top text-muted d-none d-md-inline-block">
                          <FontAwesomeIcon icon={faCalendar} className="pr-1 pt-1" />
                          <span className="small">
                        Weekend/Weekday
                          </span>
                        </div>
                      )}
                    </div>
                    {isShowGift(nurtureItem.course_slug) && (
                      <div className="my-2 text text-success">
                        <Link className="text-success" to={getLinuxSlug()}>
                          <FontAwesomeIcon
                            icon={faGift}
                            className="mr-1 mt-1"
                          />
                    Free Linux & Shell Scripting Course
                        </Link>

                      </div>
                    )}
                  </Col>
                </Row>
                {(nurtureItem.key_skills && nurtureItem.key_skills.length > 0) && (
                  <Row>
                    <Col>
                      <div className="mt-2 text-muted">
                        <strong>
                          Key Skills -
                        </strong>
                        {getKeySkills(nurtureItem)}
                        <>
                          <a href={`/${nurtureItem.course_slug}`}>
                            <i>&nbsp;...more</i>
                          </a>
                        </>
                      </div>
                    </Col>
                  </Row>
                )}
                <Row className="my-3">
                  <Col className="font-weight-bold">
                  Learning Enhancers:
                  </Col>
                </Row>
                <Row className="padding0 nei-container bg-light p-2">
                  <Col lg="4" md="4" sm="12" className="nei">
                    <h3 className="text-center">
                      {`${nurtureItem.course_duration || 50} hrs`}
                    </h3>
                    <div className="nei-text tac">
                    Course Duration
                    </div>
                  </Col>
                  <Col lg="4" md="4" sm="12" className="nei">
                    <h3 className="text-center">
                      {`${nurtureItem.project_duration || 3} hrs`}
                    </h3>
                    <div className="nei-text tac">
                     Projects
                    </div>
                  </Col>
                  <Col lg="4" md="4" sm="12" className="nei">
                    <h3 className="text-center">
                      {`${nurtureItem.free_videos_hrs || 10} hrs`}
                    </h3>
                    <div className="nei-text tac">
                    Self Paced Videos
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </a>
          <style jsx="true">
            {
              `.nc-${nurtureItem.course_slug}:hover {
              border: 2px solid ${nurtureItem.course_color} !important;
              box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important;
              transition: border-color 1s ease;  
            }
            .nc-${nurtureItem.course_slug}  .badge-color {
              background: ${nurtureItem.course_color};
              color: #fff;
            }
            `
            }
          </style>
        </Col>
      ))}
    </Row>
  )
}

NurtureTools.propTypes = {
  order: PropTypes.string,
  courses: PropTypes.isRequired
};
NurtureTools.defaultProps = {
  order: 'lr'
};

const mapStateToProps = state => ({
  courses: state.homeCourses
});

export default connect(mapStateToProps, null)(NurtureTools);
