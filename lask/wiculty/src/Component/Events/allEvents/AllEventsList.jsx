import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import EventCard from './eventCard';
import { getCourseName } from '../eventsUtil';
import { BOGOIcons } from '../../staticJSON/staticIconJson';

export default function AllEventsList ({
  groupByWebinars, time_zone_label,
  courseCategory, courseIDsList, time_zone
}) {
  return (
    <>
      {courseIDsList.map(courseID => (
        <section className="all-events-section my-4">
          <div className="event-title-section bg-white my-5 p-4">
            <h2 className="container title-color">
              <FontAwesomeIcon
                className="mr-4 align-middle"
                icon={BOGOIcons[getCourseName(courseCategory, courseID).unique_title] || faBookOpen}
              />
              {getCourseName(courseCategory, courseID).course_title}
            </h2>
          </div>
          <EventCard
            webinars={groupByWebinars[courseID]}
            time_zone_label={time_zone_label}
            courseName={getCourseName(courseCategory, courseID).unique_title}
            time_zone={time_zone}
          />
        </section>
      ))}
    </>
  )
}

AllEventsList.propTypes = {
  groupByWebinars: PropTypes.shape({}).isRequired,
  courseCategory: PropTypes.shape({}).isRequired,
  courseIDsList: PropTypes.shape({}).isRequired,
  time_zone_label: PropTypes.string.isRequired,
  time_zone: PropTypes.string.isRequired
};
