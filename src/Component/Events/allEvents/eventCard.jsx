import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';
import { getOrdinal, handleIntervalFormat } from '../../common/utilFunctions/utilFunction';
import EventOverview from '../eventOverview';

export default function EventCard ({
  webinars = [], time_zone_label,
  courseName, time_zone
}) {
  const renderAccordion = () => webinars.length > 0 && webinars.map(event => (
    <div>
      <div
        className="shadow bg-white p-4 my-4 rounded"
        style={{ marginBottom: 2 }}
      >
        <Link to={`/event/${event.event_slug}`}>
          <Row>
            <Col xl="6" lg="8" sm="12" md="12">
              <h2 className="event-title mb-4">
                {event.display_title}
              </h2>
              <EventOverview
                event={event}
                courseName={courseName}
              />
            </Col>
            {event.start_date && (
              <Col xl="4" lg="4" sm="12" md="12" className="d-block d-md-flex align-items-center mb-2 mb-md-0 justify-content-start justify-content-lg-center">
                <div className="event-period p-2 mb-2" style={{ backgroundColor: '#F6F9FE' }}>
                  <span>
                    <FontAwesomeIcon className="mr-2" icon={faCalendar} alt={event.display_title} />
                    {event.start_date && `${handleIntervalFormat(event.start_date, 'DD', time_zone)}${getOrdinal(Number(handleIntervalFormat(event.start_date, 'DD')))}  ${handleIntervalFormat(event.start_date, 'MMM', time_zone)}`}
                  </span>
                  <span>|</span>
                  <span>
                    {event.start_date && handleIntervalFormat(event.start_date, 'hh:mma', time_zone)}
                    {`(${time_zone_label})`}
                  </span>
                </div>
              </Col>
            )}
            <Col className="flex-vertical-center event-know-more my-2" xl="2" lg="12" sm="12" md="12">
              <div className="text-center p-2 br-2 border-primary text-primary rounded">
                Know More
              </div>
            </Col>
          </Row>
        </Link>
      </div>
    </div>
  ))

  return (
    <div className="container mgt20">
      {renderAccordion()}
    </div>
  )
}

EventCard.propTypes = {
  webinars: PropTypes.shape({}).isRequired,
  time_zone_label: PropTypes.string.isRequired,
  courseName: PropTypes.string.isRequired,
  time_zone: PropTypes.string.isRequired
};
