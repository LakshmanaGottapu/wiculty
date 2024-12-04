import React from 'react';
import { Col, Row, Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faTasks } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { BOGOIcons } from '../../staticJSON/staticIconJson';
import { courseCSS } from '../../staticJson';
// import { getOrdinal, handleIntervalFormat } from '../../common/utilFunctions/utilFunction';

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

export default function courseSuggestions ({ courseSuggeInfo, time_zone_label }) {
  return (
    <React.Fragment>
      {(courseSuggeInfo && courseSuggeInfo.length) > 0 && (
        <div className="blogs-menu-container event-card-container container my-4">
          <h2 className="mb-2 title-color">
            Course Suggestions For You
          </h2>
          <Row className="blog-carousel">
            <Col className="blogCarouselHolder" sm="12">
              <Slider {...sliderSettings}>
                {courseSuggeInfo && courseSuggeInfo.map(course => (
                  <Card className="c-p px-4 py-3">
                    <h3 className="py-3 px-2 slick-title-height">{course.display_title}</h3>
                    <p className="text-center text-primary m-0" title={course.display_title}>
                      <FontAwesomeIcon
                        className="fa-icon-size pr-1"
                        icon={BOGOIcons[course.unique_title] || faGraduationCap}
                        style={{
                          color: courseCSS[course.unique_title] &&
                           courseCSS[course.unique_title].color
                        }}
                      />
                    </p>
                    <Row className="my-3">
                      <Col lg="6" md="6" sm="12">
                        <p className="mb-2 text-secondary">
                          <FontAwesomeIcon className="mr-2" icon={faClock} alt={course.display_title} />
                          Duration
                        </p>
                        <h3 className="font-weight-normal text-black">
                          {`${course.course_duration}+ Hrs`}
                        </h3>
                      </Col>
                      <Col lg="6" md="6" sm="12">
                        <p className="mb-2 text-secondary">
                          <FontAwesomeIcon className="mr-2" icon={faTasks} alt={course.display_title} />
                          Project
                        </p>
                        <h3 className="font-weight-normal text-black">
                          {`${course.project_duration} Hrs`}
                        </h3>
                      </Col>
                    </Row>
                    <p className="event_link text-center my-4 p-2 border border-primary text-primary">
                      <Link to={`/${course.course_slug}`}>
                        Know More
                      </Link>
                    </p>
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

courseSuggestions.propTypes = {
  courseSuggeInfo: PropTypes.shape({}).isRequired,
  time_zone_label: PropTypes.string.isRequired
};
