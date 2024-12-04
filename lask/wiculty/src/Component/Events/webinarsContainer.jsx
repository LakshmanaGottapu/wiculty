import React, { useEffect, useState } from 'react';
import groupBy from 'lodash/groupBy';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventsList from './upcomingEventsList';
import AllEvents from './allEvents/AllEventsList';
import BrowseCategory from './browseCategories/courseCategory';

import EmptyEventBlock from './emptyEventBlock';
import { IMAGES } from '../locales/images'

// import Actions  start
import eventsAction from './eventsAction';
// import Actions  start

// import { IMAGES } from '../locales/images';
import './webinars.scss'

function WebinarsContainer ({ getEvents, allEvents = {}, UserPrefInfo }) {
  const [events, setEvents] = useState([]);
  // const [timeZone, setTimeZone] = useState('IST');
  const [courseCategory, setCourseCategory] = useState([]);
  const [courseIDsList, setCourseIDs] = useState([])
  const [isFiltered, setFilteredFlag] = useState(false);
  const { time_zone_label = 'IST', time_zone } = UserPrefInfo;
  useEffect(() => {
    getEvents({}, () => { })
    window.scroll(0, 0);
  }, []);

  const getCourseIDs = () => {
    const groupByCourse = groupBy(allEvents.events, 'course_id');
    return Object.keys(groupByCourse)
  }

  useEffect(() => {
    setEvents(allEvents.events || []);
    setCourseCategory(allEvents.courses || []);
    setCourseIDs(getCourseIDs())
  }, [allEvents]);

  // useEffect(() => {
  //   console.log({ time_zone_label });
  // }, [UserPrefInfo]);

  const handleCategorySelection = (selectedCategoryID) => {
    setCourseIDs([selectedCategoryID])
    setFilteredFlag(true);
  }

  const handleClearFilter = () => {
    setCourseIDs(getCourseIDs())
    setFilteredFlag(false);
  }

  return (
    <div className="event-container">
      <div className="event-banner-container" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.WEBINARS_BANNER})` }}>
        {/* --- banner section  --- */}
        <section className="event-banner container text-white d-none">
          <h1 className="mb-3 white-space-pre font-weight-bold">
            {'Wiculty ProClasses!'}
          </h1>
          <h2 className="event-category mb-3 font-weight-light">
            {'TRAINING | WEBINAR | SEMINAR | DEMO'}
          </h2>
          <p className="text-white font-weight-light">
            {`Boost your acumen and extend your tech-abilities with Wiculty ProClasses.
          Join the expert webinar series by Wiculty curated to help you master
          top trending technologies and set sail your career as a PRO.`}
          </p>
        </section>
      </div>
      <EventsList
        events={events.slice(0, 5)}
        time_zone_label={time_zone_label}
        time_zone={time_zone}
      />
      {courseCategory.length > 0 && (
        <BrowseCategory
          courseCategory={courseCategory}
          handleCategorySelection={handleCategorySelection}
          selectedCategoryID={courseIDsList}
          isFiltered={isFiltered}
          handleClearFilter={handleClearFilter}
        />
      )}
      {events.length > 0 ? (
        <AllEvents
          groupByWebinars={groupBy(events, 'course_id')}
          courseIDsList={courseIDsList}
          courseCategory={courseCategory}
          time_zone_label={time_zone_label}
          time_zone={time_zone}
        />
      )
        : (
          <EmptyEventBlock
            isLoading={allEvents.isLoading}
          />
        )}
    </div>
  )
}

export const mapDispatchToProps = dispatch => ({
  getEvents: (payload, cb) => {
    dispatch(eventsAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  allEvents: state.allEvents,
  UserPrefInfo: state.UserPrefInfo
});

WebinarsContainer.propTypes = {
  getEvents: PropTypes.func.isRequired,
  allEvents: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(WebinarsContainer);
