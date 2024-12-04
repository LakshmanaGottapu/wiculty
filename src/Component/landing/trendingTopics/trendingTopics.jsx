import groupBy from 'lodash/groupBy';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import sf from '../../common/safeTraverse';
// Componets import
import EmptyEventBlock from '../../Events/emptyEventBlock';
import webinarsAction from '../../Events/eventsAction';
import { getCourseName } from '../../Events/eventsUtil';
import { handleIntervalFormat, getOrdinal } from '../../common/utilFunctions/utilFunction'
import { courseCSS } from '../../staticJson';
import TrendingTopicAction from './trendingTopicAction';

function eventTime (date, time_zone_label, time_zone) {
  return (
    <>
      <span>
        {date && `${handleIntervalFormat(date, 'DD', time_zone)}${getOrdinal(Number(handleIntervalFormat(date, 'DD', time_zone)))}  ${handleIntervalFormat(date, 'MMM', time_zone)}`}
      </span>
      <span className="mx-2">|</span>
      <span>
        {date && handleIntervalFormat(date, 'hh:mma', time_zone)}
        {' '}
        {`( ${time_zone_label} )`}
      </span>
    </>
  )
}

function destTopEventTime (date, time_zone_label, time_zone) {
  return (
    <>
      <span className="mx-2">
        {date && `${handleIntervalFormat(date, 'DD', time_zone)}/${handleIntervalFormat(date, 'MM', time_zone)}/${handleIntervalFormat(date, 'YYYY', time_zone)}`}
      </span>
      <span>
        {date && handleIntervalFormat(date, 'hh:mma', time_zone)}
        &nbsp;
        &nbsp;
        {`(${time_zone_label})`}
      </span>
    </>
  )
}

function getCourseEvent (events, courseID) {
  const groupByEvents = groupBy(events, 'course_id');
  if (groupByEvents[courseID]) {
    const [topEvent] = groupByEvents[courseID];
    return [topEvent];
  }

  return [];
}

function getColor (courseCategory, event) {
  const course = courseCSS[getCourseName(courseCategory, event.course_id).unique_title]
  const color = course ? course.color : '#ff6f00';
  return color;
}

class TrendingTopics extends Component {
  constructor (props) {
    super(props);
    this.state = {
      upcomingEvents: [],
      courseCategory: []
    }
  }

  componentDidMount () {
    const { getWebinars, mobileView, courseID } = this.props;

    getWebinars({}, (resp) => {
      const events = sf(resp, ['data', 'data', 'events']) || [];
      const courseCategory = sf(resp, ['data', 'data', 'courses']) || [];
      let upcomingEvents = events.slice(0, 5);
      if (mobileView === 'true') {
        upcomingEvents = getCourseEvent(events, courseID) || [];
      }
      this.setState({
        upcomingEvents,
        courseCategory
      })
    })
  }

  render () {
    const {
      upcomingEvents, courseCategory
    } = this.state;
    const {
      mobileView, isLoading,
      allEvents,
      UserPrefInfo
    } = this.props;
    const { time_zone_label = 'IST', time_zone } = UserPrefInfo;
    return (
      <React.Fragment>
        {allEvents.events && allEvents.events.length > 0 ? (
          <Container fluid className="trending-topic">
            <div className={mobileView !== 'true' ? 'home-page-section' : ''}>
              {mobileView !== 'true' && (
                <Row className="justify-content-between mb-2 px-4">
                  <Col lg="6">
                    <h2>Free Webinars on Trending Topics</h2>
                  </Col>
                  <Col className="d-none d-md-block text-right" lg="6">
                    <Link to="/events">
                      <button type="button" className="btn btn-theme btn-md rounded-pill">
                          View More Events
                      </button>
                    </Link>
                  </Col>
                </Row>
              )}
              {
                upcomingEvents.length > 0 ? (
                  <React.Fragment>
                    <Row className="mt-0 trending-topic-cards">
                      <Col>
                        <div className={`table-responsive-sm bg-white trending-topic-table rounded-top rounded-left ${mobileView === 'true' ? 'd-none' : 'd-none d-sm-block'}`}>
                          <table className="table table-striped table-sm">
                            <thead className="thead-dark">
                              <tr>
                                <th className="pl-4" scope="col">Course</th>
                                <th scope="col">
                                Topic
                                &nbsp;
                                  <small>(online)</small>
                                </th>
                                <th scope="col">Time</th>
                                <th scope="col" />
                              </tr>
                            </thead>
                            <tbody>
                              {upcomingEvents.map(event => (
                                <tr>
                                  <td
                                    className="course-rect-ct"
                                    style={{
                                      color: getColor(courseCategory, event),
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    <div
                                      className="course-rect"
                                      style={{
                                        background: getColor(courseCategory, event)
                                      }}
                                    />
                                    {getCourseName(courseCategory,
                                      event.course_id).course_title}
                                  </td>
                                  <td>
                                    {event.display_title}
                                  </td>
                                  <td className={!event.start_date && 'text-muted'}>
                                    {event.start_date ? destTopEventTime(event.start_date, time_zone_label, time_zone) : 'Coming soon'}
                                    <br />
                                    <small>
                                      {event.duration}
                                    </small>
                                  </td>
                                  <td>
                                    <Link type="button" className="btn btn-theme-bordered btn-sm" to={`/event/${event.event_slug}`}>
                                    Know More
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div className={mobileView !== 'true' ? 'd-block d-sm-none' : ''}>
                          <Row className="mb-4">
                            {upcomingEvents.map(event => (
                              <Col lg="12" className="mb-4">
                                <Row className="tt-card shadow">
                                  <Col className="p-0">
                                    <div
                                      className="course-rec-mb"
                                      style={{
                                        background: getColor(courseCategory, event)
                                      }}
                                    />
                                    <Row>
                                      <Col sm="12" className="mt-2">
                                        <small className="text-uppercase">
                                          {getCourseName(courseCategory,
                                            event.course_id).course_title}
                                        </small>
                                      </Col>
                                      <Col sm="12" className="mt-1">
                                        <div>
                                          <span className="tt-card-label">Topic:</span>
                                          <div
                                            style={{
                                            // eslint-disable-next-line max-len
                                              color: getColor(courseCategory, event)
                                            }}
                                            className="topic-title"
                                          >
                                            {event.display_title}
                                          </div>
                                        </div>
                                      </Col>
                                      <Col sm="12" className="mt-2">
                                        <Row>
                                          <Col xs="12" className="p-0 mt-2 d-flex">
                                            <div className="tt-card-label mr-2">
                                            Time:
                                            </div>
                                            <div className={!event.start_date && 'text-muted'}>
                                              {event.start_date ? eventTime(event.start_date, time_zone_label, time_zone) : 'Coming soon'}
                                              <br />
                                            </div>
                                          </Col>
                                          <Row>
                                            <Col xs="12" className="p-0 mt-2 d-flex">
                                              <div className="tt-card-label mr-2">
                                            Duration:
                                              </div>
                                              <div className={!event.start_date && 'text-muted'}>
                                                {event.event_duration}
                                              &nbsp; Hrs
                                              </div>
                                            </Col>
                                          </Row>
                                        </Row>
                                      </Col>
                                      <Col sm="12" className="text-center mt-4 pb-3">
                                        <Link
                                          type="button"
                                          className="btn btn-theme-bordered"
                                          to={`/event/${event.event_slug}`}
                                        >
                                        Know More
                                        </Link>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Col>
                            ))}
                          </Row>
                          <div className="flex-vertical-center">
                            <Link to="/events">
                              <button type="button" className="btn btn-theme btn-md rounded-pill">
                                View More Events
                              </button>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  <EmptyEventBlock isLoading={isLoading} />
                )
              }
            </div>
          </Container>
        ) : ''}
      </React.Fragment>
    )
  }
}

TrendingTopics.propTypes = {
  mobileView: PropTypes.string,
  trendingTopics: PropTypes.shape({}),
  getWebinars: PropTypes.func.isRequired,
  courseID: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  allEvents: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

TrendingTopics.defaultProps = {
  mobileView: 'false',
  trendingTopics: {}
}

const mapStateToProps = state => ({
  allEvents: state.allEvents,
  UserPrefInfo: state.UserPrefInfo
})

const mapDispatchToProps = dispatch => ({
  getTrendingTopics: (payload, cb) => {
    dispatch(TrendingTopicAction(payload, cb))
  },
  getWebinars: (payload, cb) => {
    dispatch(webinarsAction(payload, cb));
  }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrendingTopics));
