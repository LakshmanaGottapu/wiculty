import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  CardBody, Card, Modal
} from 'reactstrap';
import { JSONLD, Generic } from 'react-structured-data';

import EventMiddleSec from './eventMiddleSec';
import EventTab from './eventTab';
import CommunitySec from './communitySec';
import CourseSuggestions from './courseSuggestions';
import RegestrationSignInSection from '../../registration/registration-signIn'
import RegestrationSignUpSection from '../../registration/registration-signUp'
import ForgotPassword from '../../registration/forgotPassword';
import { IMAGES } from '../../locales/images'

// import Actions  start
import eventInfoAction from './eventInfoAction';
// import Actions  end

// services import start
import authService from '../../../services/authService'
// services import start

import sf from '../../common/safeTraverse';
import { isPrivateRoute, isAuthenticatedRoute } from '../../common/utilFunctions/utilFunction'

import '../webinars.scss';

class EventContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalObj: {},
      autoFillData: {}
    }
    window.scroll(0, 0)
  }

  componentDidMount () {
    const { getEvent, match = {} } = this.props;
    const { params: { eventSlug = '' } } = match;
    getEvent({ eventSlug }, () => {})
  }

  /* autnetication code section starts here ... */
  signIn () {
    this.setState({
      modalObj: { currentStatus: 'signIn', isModalOpen: true }
    })
  }

  signUp (autoFillData) {
    this.setState({
      modalObj: {
        currentStatus: 'signUp',
        isModalOpen: true
      },
      autoFillData
    })
  }

  forgotPassword () {
    this.setState(state => ({
      modalObj: { ...state.modalObj, currentStatus: 'forgotPass' }
    }))
  }

  handleClose () {
    const { history } = this.props || {};
    const { location: { pathname } } = history;
    if (!authService.isAuthenticated() &&
     (isAuthenticatedRoute(pathname) || isPrivateRoute(pathname))) {
      history.push('/');
    }
    this.setState({
      modalObj: { currentStatus: '', isModalOpen: false }
    })
  }

  handleForgetClose () {
    this.setState({
      modalObj: { currentStatus: '', isModalOpen: false }
    })
  }

  renderModalBody () {
    const { modalObj = {}, autoFillData } = this.state
    const { currentStatus } = modalObj
    switch (currentStatus) {
      case 'signIn':
        return (
          <RegestrationSignInSection
            onRegister={this.register}
            callSignUp={() => this.signUp()}
            forgotPassword={() => this.forgotPassword()}
            handleClose={() => this.handleClose()}
            autoFillData={autoFillData}
          />
        )
      case 'signUp':
        return (
          <RegestrationSignUpSection
            onRegister={this.register}
            callSignIn={() => this.signIn()}
            handleClose={() => this.handleClose()}
            refferalCode=""
            autoFillData={autoFillData}
          />
        )
      case 'forgotPass':
        return (
          <ForgotPassword handleForgetClose={() => this.handleForgetClose()} />
        )
      default:
        return null
    }
  }
  /* autnetication code section Ends here .... */

  render () {
    const {
      eventInfo = {},
      UserPrefInfo, courseSuggeInfo
    } = this.props;

    const { modalObj: { isModalOpen } } = this.state;

    const { time_zone_label = 'IST', time_zone } = UserPrefInfo;
    const { event = {}, course = {} } = eventInfo;
    const {
      event_title, start_date,
      end_date, event_desc, event_logo
    } = event;
    const suggestedCourses = sf(courseSuggeInfo, ['data', 'data', 'courses']);
    const { href } = window.location;
    return (
      <div className="event-container">
        <div className="event-banner-container flex-vertical-center ">
          {/* --- banner section  --- */}
          <div className="event-banner container text-white m-4">
            <h1 className="mb-3 font-weight-bold">
            Wiculty ProClasses!
            </h1>
            <h2 className="event-category mb-3 font-weight-light">
              {event.display_title}
            </h2>
            <p className="text-white font-weight-light h2">
            Boost your acumen and extend your tech-abilities with Wiculty ProClasses.
            Join the expert webinar series by Wiculty curated to help you master
            top trending technologies and set sail your career as a PRO.
            </p>
          </div>
          <div className="d-none d-lg-block">
            <embed
              src={IMAGES.PROCLASS_BANNER}
              height="300"
              type="image/svg+xml"
              className="align-middle mr-2"
            />
          </div>
        </div>
        <div className="container my-4">
          <EventTab
            event={event || {}}
            time_zone_label={time_zone_label}
            courseName={course.unique_title}
            time_zone={time_zone}
          />
          <Card>
            <CardBody>
              <EventMiddleSec
                event={event}
                handleSignUp={autoFillData => this.signUp(autoFillData)}
                courseName={course.unique_title}
              />
              <CommunitySec />
            </CardBody>
          </Card>
          <CourseSuggestions courseSuggeInfo={suggestedCourses} />
        </div>
        <Modal
          isOpen={isModalOpen}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          {this.renderModalBody()}
        </Modal>
        <JSONLD>
          <Generic
            type="Event"
            jsonldtype="Event"
            schema={
              {
                name: event_title,
                startDate: start_date,
                endDate: end_date,
                eventStatus: 'https://schema.org/EventScheduled',
                eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
                image: [
                  event_logo
                ],
                description: event_desc
              }
            }
          >
            <Generic
              type="location"
              jsonldtype="VirtualLocation"
              schema={
                {
                  url: href
                }
              }
            />
            <Generic
              type="offers"
              jsonldtype="Offer"
              schema={
                {
                  url: href,
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                  validFrom: start_date
                }
              }
            />
            <Generic
              type="performer"
              jsonldtype="PerformingGroup"
              schema={
                {
                  name: 'wiculty'
                }
              }
            />
          </Generic>
        </JSONLD>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  getEvent: (payload, cb) => {
    dispatch(eventInfoAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  eventInfo: state.eventInfo,
  UserPrefInfo: state.UserPrefInfo,
  courseSuggeInfo: state.homeCourses
});

EventContainer.propTypes = {
  getEvent: PropTypes.func.isRequired,
  eventInfo: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  courseSuggeInfo: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
