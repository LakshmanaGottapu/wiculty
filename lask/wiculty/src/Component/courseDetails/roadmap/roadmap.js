import React from 'react';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';

const RoadMap = ({ courseDetails }) => {
  const { roadmap_url } = courseDetails.course || {};
  return (
    <div className="roadmap-menu-container container mt-4">
      <h2>
        {'Road Map'}
      </h2>
      <div className="mgt20">
        <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }} className="roadmap-details-img pd0 bg-white box-shadow">
          <img className="w-100" src={roadmap_url} alt="course-analysis" />
        </Col>
      </div>
    </div>
  )
};

RoadMap.propTypes = {
  courseDetails: PropTypes.isRequired

};

export default RoadMap;
