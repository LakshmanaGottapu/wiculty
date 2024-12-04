import React, { useState, useEffect } from 'react';
import { Col, Row, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { getOrdinal, handleIntervalFormat } from '../common/utilFunctions/utilFunction';

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 790,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1
      }
    }
  ]
}

export default function EventsList ({ events, time_zone_label, time_zone }) {
  const [slideSettings, setSlideSetting] = useState(sliderSettings);
  const getSlidesCount = () => (events.length >= 3 ? 3 : events.length)
  useEffect(() => {
    setSlideSetting({ ...sliderSettings, slidesToShow: getSlidesCount() })
  }, [events])
  return (
    <React.Fragment>
      {(events && events.length) > 0 && (
        <div className="blogs-menu-container event-card-container container my-4">
          <h2 className="mb-2 title-color">
            {`Upcoming Events (${events.length || 0})`}
          </h2>
          <Row className="blog-carousel">
            <Col className="blogCarouselHolder" sm="12">
              <Slider {...slideSettings}>
                {events && events.map(event => (
                  <Card className="event-card px-4 py-3">
                    <h3 className="py-3 px-2 slick-title-height">{event.display_title}</h3>
                    {event.start_date && (
                      <div className="event-period">
                        <span>
                          <FontAwesomeIcon className="mr-2" icon={faCalendar} alt={event.display_title} />
                          {`${handleIntervalFormat(event.start_date, 'DD', time_zone)}${getOrdinal(Number(handleIntervalFormat(event.start_date, 'DD', time_zone)))}  ${handleIntervalFormat(event.start_date, 'MMM', time_zone)}`}
                        </span>
                        <span>|</span>
                        <span>
                          {handleIntervalFormat(event.start_date, 'hh:mma', time_zone)}
                          {' '}
                          {`(${time_zone_label})`}
                        </span>
                      </div>
                    )}
                    <div className="registers my-2">
                      <FontAwesomeIcon className="mr-2" icon={faUser} alt={event.display_title} />
                      <span>
                        {`${event.registered_users || 0} Registered`}
                      </span>
                    </div>
                    <Link to={`/event/${event.event_slug}`}>
                      <p className="event_link text-center c-p my-4 p-2 br-2 border-primary text-primary rounded">
                        Know More
                      </p>
                    </Link>
                  </Card>
                ))}
              </Slider>
            </Col>
          </Row>
        </div>
      )}
    </React.Fragment>
  );
}

EventsList.propTypes = {
  events: PropTypes.shape({}).isRequired,
  time_zone_label: PropTypes.string.isRequired,
  time_zone: PropTypes.string.isRequired
};
