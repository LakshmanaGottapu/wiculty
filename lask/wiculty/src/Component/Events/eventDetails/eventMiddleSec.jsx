import React from 'react';
import {
  Row, Col
} from 'reactstrap';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import EventForm from './EventForm';

export default function EventMiddleSec ({ event, handleSignUp, courseName }) {
  return (
    <Row className="p-4 bg-white">
      <Col lg="7" sm="12" md="12">
        <div>
          <h5>
              ABOUT THE WEBINAR
          </h5>
          <p className="text-secondary">
            {event.event_desc && parse(event.event_desc)}
          </p>
        </div>
        <div>
          <h5>
              AGENDA
          </h5>
          <p className="text-secondary">
            {event.event_agenda && parse(event.event_agenda)}
          </p>
        </div>

      </Col>
      <Col lg="5" sm="12" md="8">
        <EventForm
          event={event}
          handleSignUp={handleSignUp}
          courseName={courseName}
        />
      </Col>
    </Row>
  )
}

EventMiddleSec.propTypes = {
  event: PropTypes.shape({}).isRequired,
  handleSignUp: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired
};
