import React from 'react';
import PropTypes from 'prop-types';
import DemandSection from './demandSection';
import './careerProspect.scss';

const Project = ({ courseDetails = {} }) => {
  const { career_prospect_url } = courseDetails.course || {};
  return (
    <div className="career-menu-container container mt-5">
      <h2 className="mb-4">
        {'Career Prospect | Take A Leap of Faith on Your Future Career Path'}
      </h2>
      <div className="career-list box-shadow" lg={{ size: 10 }} md={{ size: 12 }} xs={{ size: 12 }}>
        <img className="img-fluid" src={career_prospect_url} alt="course-analysis" />
      </div>
      <div xs={12} className="mt-4">
        <DemandSection courseDetails={courseDetails} />
      </div>
    </div>
  )
};

Project.propTypes = {
  courseDetails: PropTypes.isRequired

};

export default Project;
