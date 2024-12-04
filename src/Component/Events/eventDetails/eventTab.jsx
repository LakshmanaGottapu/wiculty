import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';
import { getOrdinal, handleIntervalFormat } from '../../common/utilFunctions/utilFunction';
import EventOverView from '../eventOverview';

export default function eventTab ({
  event, time_zone_label,
  courseName, time_zone
}) {
  return (
    <div className="bg-white p-4 shadow rounded-top">
      <Row className="justify-content-between">
        <Col lg="8" sm="12" md="5">
          <h2 className="event-title mb-4">
            {event.display_title}
          </h2>
          <EventOverView
            event={event}
            courseName={courseName}
          />

        </Col>
        <Col className="text-center d-flex align-self-center" lg="4" sm="12" md="4">
          {event.start_date && (
            <div className="event-period p-2 mb-2" style={{ backgroundColor: '#F6F9FE' }}>
              <span>
                <FontAwesomeIcon className="mr-2" icon={faCalendar} alt={event.display_title} />
                {`${handleIntervalFormat(event.start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(event.start_date, 'DD')))}  ${handleIntervalFormat(event.start_date, 'MMM')}`}
              </span>
              <span>|</span>
              <span>
                {handleIntervalFormat(event.start_date, 'hh:mma', time_zone)}
                {' '}
                {`(${time_zone_label})`}
              </span>
            </div>
          )}
        </Col>
      </Row>
    </div>

  )
}

eventTab.propTypes = {
  event: PropTypes.shape({}).isRequired,
  time_zone_label: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  time_zone: PropTypes.string.isRequired
};
