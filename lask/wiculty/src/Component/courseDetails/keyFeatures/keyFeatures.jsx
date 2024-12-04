import React from 'react'
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChalkboardTeacher, faProjectDiagram,
  faPhoneAlt, faCertificate, faFlask
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';

import './keyFeature.scss';

const KeyFeatures = ({ courseDetails }) => {
  const {
    course_duration = 50, project_duration = 10,
    free_videos_hrs = 30, is_selfpaced
  } = courseDetails.course || {};
  const keyFeaturesJSON = [
    {
      icon: faUser,
      desc: `${course_duration} Hrs ${is_selfpaced ? 'Self-paced Learning' : 'Instructor-led Training'}`,
      tooltip: 'It\'s  very extensive in the market'
    },
    {
      icon: faChalkboardTeacher,
      desc: `${is_selfpaced ? 'Lifetime LMS Access' : `${free_videos_hrs} Hrs Self-paced Videos`}`,
      tooltip: `${is_selfpaced ? 'Lifetime LMS Access' : 'Linux & Shell scripting course free'}`
    },
    {
      icon: faProjectDiagram,
      desc: `${project_duration} Hrs Project Work & Exercises`,
      tooltip: ''
    },
    {
      icon: faFlask,
      desc: 'Less theory, more practicals',
      tooltip: 'Check our curriculum below'
    },
    {
      icon: faPhoneAlt,
      desc: '24 x 7 Lifetime Support & Access',
      tooltip: ''
    },
    {
      icon: faCertificate,
      desc: 'Certification and Job Assistance',
      tooltip: ''
    }]
  return (
    <div className="container-fluid bg-white pt-5 p-3">
      <div className="container">
        <h2 className="mb-4">
        Key Features
        </h2>
        <div className="col-12 col-lg-8 my-0 my-md-4 px-0">
          <div className="row">
            {keyFeaturesJSON.map(({ tooltip, icon, desc }) => (
              <div className="col-lg-4 col-md-6 col-12 mb-4 pr-2 pl-0" title={tooltip || desc}>
                <div className="keyfeature-item d-flex shadow rounded">
                  <div className="icon d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={icon} className="font-icon-size" />
                  </div>
                  <div className="p-2">
                    {desc}
                  </div>
                </div>
                <div />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  )
};

KeyFeatures.propTypes = {
  courseDetails: PropTypes.isRequired

};

export default KeyFeatures;
