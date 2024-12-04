import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';

const KeySkills = ({ courseDetails = [] }) => {
  const { key_skills = [] } = courseDetails.course || {};
  return (
    <div className="my-4 skills-menu-container container">
      <Card>
        <CardBody>
          <h2>Skills Covered</h2>
          <div className="mt-4">
            {key_skills && key_skills.map(skill => (
              skill ? (
                <div className="card d-inline-block px-4 py-2 mr-2 mb-2 text-capitalize bg-app">
                  {skill}
                </div>
              ) : ''
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

KeySkills.propTypes = {
  courseDetails: PropTypes.isRequired
}

export default KeySkills;
