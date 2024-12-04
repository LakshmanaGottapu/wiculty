import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import SelfPacedCard from './selfPacedCard';
import sf from '../common/safeTraverse';

import './selfPaced.scss';

const SelfPacedCourses = ({
  courses, history
}) => {
  const courseData = sf(courses, ['data']) || [];
  const selfPacedCourses = courseData.length > 0 ? courseData
    .filter(({ is_selfpaced, is_visible }) => is_selfpaced && is_visible) : [];
  return (
    <div className="freeCourseSec container-fluid mt-5">
      {selfPacedCourses.length > 0 ? (
        <div className="freeCourseSecAlgn">
          <h2 className="text-center wiculty-blue h1">
            <span className="self_paced_title p-2">
            Self-Paced Learning
            </span>
          </h2>
          <Row className="mt-4">
            {
              selfPacedCourses.map(item => (
                <SelfPacedCard
                  key={item.course_title}
                  title={item.course_title}
                  course_slug={item.course_slug}
                  course_image={item.course_image}
                  course_duration={item.course_duration}
                  project_duration={item.project_duration}
                  is_freecourse={item.is_freecourse}
                  history={history}
                />
              ))}
          </Row>
        </div>
      ) : ''}

    </div>
  );
}

SelfPacedCourses.propTypes = {
  courses: PropTypes.shape({}).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired
};
const mapStateToProps = state => ({
  courses: state.homeCourses
});

export default connect(mapStateToProps, null)(SelfPacedCourses);
