import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faToolbox
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const EventOverview = ({ event, courseName }) => (
  <Row className="overview-colors">
    <Col className="time-duration mb-2 mb-md-0 pl-0" lg="3" md="4" sm="12">
      <p className="mb-1 text-secondary">
        <FontAwesomeIcon className="mr-2" icon={faClock} alt={event.display_title} />
            Hours
      </p>
      <h3 className="text-black font-weight-normal">
        {event.event_duration}
        {' '}
            Hrs
      </h3>
    </Col>
    {courseName === 'DevOps Certification Training' && (
      <Col className="tools mb-2 mb-md-0 pl-0" lg="4" md="4" sm="12">
        <p className="mb-1 text-secondary">
          <FontAwesomeIcon className="mr-2" icon={faToolbox} alt={event.display_title} />
            Tools Explained
        </p>
        <h3 className="text-black font-weight-normal">
            10 +
        </h3>
      </Col>
    )}
    <Col className="registrants mb-2 mb-md-0 pl-0" lg="4" md="4" sm="12">
      <p className="mb-1 text-secondary">
        <FontAwesomeIcon className="mr-2" icon={faUser} alt={event.display_title} />
            Registered
      </p>
      <h3 className="text-black font-weight-normal">
        {event.registered_users || 0}
      </h3>
    </Col>
  </Row>
)

EventOverview.propTypes = {
  event: PropTypes.shape({}).isRequired,
  courseName: PropTypes.string.isRequired
};

export default EventOverview;
