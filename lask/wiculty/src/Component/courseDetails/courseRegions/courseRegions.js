import React from 'react';
import PropTypes from 'prop-types';
import sf from '../../common/safeTraverse';

const CourseRegions = ({ courseData }) => {
  const regions = sf(courseData, ['regions']) || [];
  const title = (courseData && courseData.course_title) ? courseData.course_title : 'Course';

  return (regions.length > 0 && (
    <div className="container-fluid bg-white p-4 mt-4 course-regions-menu-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>
              {`Find ${title} in Other Regions`}
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {regions.map(({ id, course_slug, location }) => (
              <a href={`/${course_slug}`} className="text-body hover-underline pr-2" key={id}>
                {location}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))
};

CourseRegions.propTypes = {
  courseData: PropTypes.isRequired
};

export default CourseRegions;
