import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Container, Row } from 'reactstrap';

import CourseCards from '../../card/coursecard';

import { filterInstrLedCourse } from '../../common/utilFunctions/utilFunction';
import sf from '../../common/safeTraverse';

const RecommendedCourses = ({ courseId, homeCourses, history }) => {
  const coursesToDisplay = homeCourses.filter(o => o.id !== courseId);
  return (
    <div className="recommended-courses-menu-container container mt-4">
      <div className="row">
        <div className="col-12">
          <h2>Recommended Courses</h2>
        </div>
      </div>
      <Container fluid className="freeCourseSec">
        <Row className="freeCourseSecAlgn">
          <Col lg="12" xl="12" className="freeCourseSecCardAlgn">
            <Row className="justifyCenter refer-course-cards">
              <React.Fragment>
                {coursesToDisplay.map(item => (
                  <CourseCards
                    title={item.course_title}
                    is_selfpaced={item.is_selfpaced}
                    course_image={item.course_image}
                    short_description={item.short_description}
                    course_slug={item.course_slug}
                    unique_title={item.unique_title}
                    isFree
                    courseHighlighter={item.course_highlighter}
                    courseInfo={item}
                    isSharable="false"
                    reloadPage
                    history={history}
                  />
                ))}
              </React.Fragment>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

RecommendedCourses.propTypes = {
  homeCourses: PropTypes.isRequired,
  courseId: PropTypes.number.isRequired,
  history: PropTypes.isRequired
}

const mapStateToProps = state => ({
  homeCourses: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || [])
});

export default connect(mapStateToProps, null)(RecommendedCourses);
