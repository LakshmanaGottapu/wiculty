import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Col, Row, Collapse, Button, Alert
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import upcomingClassesAction from './upcomingClassesAction';
import requestCertificateAction from './requestCertAction';
import attendanceDetails from './LMSModulePanel/attendanceAction';
import ClassFeedBack from './classFeedBack/classFeedBack';
import { getOrdinal, handleIntervalFormat } from '../common/utilFunctions/utilFunction';
import sf from '../common/safeTraverse';
import messageFn from '../common/message'
import menuBar from '../../img/menu.svg';
import { IMAGES } from '../locales/images';
import { MESSAGES } from '../locales/locale'

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, WARNING }
} = MESSAGES

class LMSright extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.requestCert = this.requestCert.bind(this);
    this.getCertificate = this.getCertificate.bind(this);
    this.state = {
      courseBatchId: null,
      upcomingClasses: [],
      attendance: [],
      classId: '',
      isModalOpen: false,
      collapse: false,
      certificate: null
    };
    window.scrollTo(0, 0)
  }

  static getDerivedStateFromProps (props, state) {
    const {
      globalDetails,
      profileDetails,
      attendanceReducer,
      upcomingClasses,
      mycourseDetails
    } = props || {}
    const profileInfo = sf(profileDetails, ['data', 'data']) || {};
    const attendance = sf(attendanceReducer, ['data', 'data', 'classes']) || [];
    const uc = sf(upcomingClasses, ['data', 'data']) || {};
    const { courseBatchId } = globalDetails;
    if (courseBatchId) {
      return {
        mycourseDetails: mycourseDetails.data,
        courseBatchId,
        profileInfo,
        attendance,
        upcomingClasses: uc.classes
      }
    }
    return null
  }

  componentDidMount () {
    const { getUpcomingClasses, getAttendance, LMSData } = this.props;
    const LMSInfo = sf(LMSData, ['data', 'data']) || {};
    const { is_selfpaced } = LMSInfo;
    const { courseBatchId, mycourseDetails } = this.state;
    if (!is_selfpaced) {
      getUpcomingClasses({ batch_id: courseBatchId }, (resp) => {
        const upcoming = sf(resp, ['data', 'data']) || {};
        this.setState({
          upcomingClasses: upcoming.classes
        });
      })
      getAttendance({ batchID: courseBatchId }, (resp) => {
        const attendance = sf(resp, ['data', 'data', 'classes']) || [];
        this.setState({
          attendance
        }, () => {
          this.classfeedBackPopUp()
        });
      })
    }

    this.getCertificate(mycourseDetails, courseBatchId);
  }

  getCertificate (mycourseDetails, batchId) {
    const courseDetails = sf(mycourseDetails, ['data', 'courses']) || [];
    const index = (courseDetails).findIndex(item => item.batch_id === batchId);
    if (index !== -1) {
      this.setState({
        certificate: (mycourseDetails.data.courses)[index].certificate_link
      })
    }
  }

  classfeedBackPopUp (methodName = 'componentDid', url, event) {
    const { attendance } = this.state;
    // Filter pendingFeedbacks for who attended classes
    const pendingFeedBackItems = (attendance.length > 0) &&
     attendance.filter(classItem => !classItem.feedback && classItem.attendance);

    if (pendingFeedBackItems.length > 0) {
      const [feedBackItem] = pendingFeedBackItems;
      const classDate = handleIntervalFormat(feedBackItem.start_date, 'DD')
      this.setState({
        classId: feedBackItem.class_id,
        isModalOpen: true,
        batchDate: `${classDate}${getOrdinal(Number(classDate))}-${handleIntervalFormat(feedBackItem.start_date, 'MMM')}-${handleIntervalFormat(feedBackItem.start_date, 'YYYY')}`
      })
    } else {
      this.setState({
        classId: '',
        isModalOpen: false
      })
      if (methodName === 'joinClass') {
        // clicking the join now link
        event.target.nextSibling.click()
      }
    }
  }

  toggle () {
    this.setState(state => ({
      collapse: !state.collapse
    }));
  }

  requestCert () {
    const { requestCertificate } = this.props;
    const { courseBatchId } = this.state;

    requestCertificate({ batchID: courseBatchId }, (resp) => {
      const { data = {}, status } = resp;
      if (data && status === 200) {
        const { message } = data;
        messageFn(message, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, WARNING)
      }
    })
  }

  handleJoinClass (event, url) {
    this.classfeedBackPopUp('joinClass', url, event)
  }

  handlePopUpClose () {
    this.setState({
      isModalOpen: false
    })
  }

  toggleRightPanel () {
    window.scrollTo(0, 0);
    const { toggleRightPanel } = this.props;
    toggleRightPanel()
  }

  render () {
    const {
      courseBatchId,
      upcomingClasses,
      attendance,
      collapse,
      certificate,
      classId,
      isModalOpen,
      batchDate
    } = this.state;
    const { courseName, UserPrefInfo = {} } = this.props;
    const { time_zone_label = 'IST', country_name, country } = UserPrefInfo;
    return (
      <React.Fragment>
        <ClassFeedBack
          classId={classId}
          isModalOpen={isModalOpen}
          handlePopUpClose={() => this.handlePopUpClose()}
          batchDate={batchDate}
        />
        <p className="title d-none d-lg-block">
          <span role="button" tabIndex={0} onKeyPress={() => {}} onClick={() => this.toggleRightPanel()}>
            <img src={menuBar} alt="menuBar" />
          </span>
          <span>
            {'Upcoming Classes'}
          </span>
        </p>
        <div className="d-flex d-lg-none justify-content-between p-1">
          <p className="mb-0 p-1 font-weight-bold">
            Upcoming Classes
          </p>
          <button type="button" className="btn btn-link" onClick={() => this.toggleRightPanel()}>
            <FontAwesomeIcon icon={faTimes} />
            <span className="pl-1">
              Close
            </span>
          </button>
        </div>
        <div className="LMS-right-scroll">
          <Alert color="info m-2">
            <p className="tag mb-1">
              <FontAwesomeIcon
                className="mr-2"
                icon={faInfoCircle}
                alt="selected timezone info"
                title="selected timezone info"
              />
              Preffered time zone:
              <span className="font-weight-bold mx-2">
                {country === 231 ? `${country_name}` : `${country_name} (${time_zone_label})`}
              </span>
            </p>
            <p className="mb-2 text-muted">
            ( Select proper timezone to view accurate class timings )
            </p>
          </Alert>
          <Col lg="12" md="12" sm="12" className="upcomingContainer text-center py-2">
            <p className="tag">Join proceeding classes from here</p>
            {upcomingClasses && (upcomingClasses.length) > 0 ? (
              <div className="p-2">
                {upcomingClasses.map(item => (
                  <Row>
                    <Col className="col-sm-3 col-lg-3">
                      <p className="classDate">
                        {`${handleIntervalFormat(item.start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(item.start_date, 'DD')))} ${handleIntervalFormat(item.start_date, 'MMM')}`}
                      </p>
                    </Col>
                    <Col className="col-sm-5 col-lg-6">
                      <p className="classTime">
                        {`${handleIntervalFormat(item.start_date, 'hh:mma')} - ${handleIntervalFormat(item.end_date, 'hh:mma')}`}
                      </p>
                    </Col>
                    <Col className="col-sm-3 col-lg-3">
                      {item.join_url &&
                          (
                            <div>
                              <div role="button" tabIndex={0} onKeyPress={() => {}} className="classLink" onClick={event => this.handleJoinClass(event, item.join_url)}>
                                {'Join Now'}
                              </div>
                              <a href={item.join_url} className="join-link" rel="noopener noreferrer" target="_blank" /> {/* eslint-disable-line */}
                            </div>
                          )
                      }
                    </Col>
                  </Row>
                ))}
              </div>

            ) : (
              <Row>
                <Col lg="12" className="noResultsBlock">
                  <p>No upcoming classes</p>
                </Col>
              </Row>
            )}
          </Col>
          {attendance && attendance.length > 0 && (
            <Col lg="12" className="attendanceContainer mt-3 text-center">
              <p className="title">
                <span>Attendance status</span>
              </p>
              <p className="batchDetails">
                <span>
                  {courseName}
                </span>
                <span>
                  {' | Batch No.'}
                  {courseBatchId}
                </span>
                <span> | Weekday</span>
              </p>
              <Collapse isOpen={collapse}>
                {attendance.map(item => (
                  <Row className="px-2 py-2">
                    <Col className="col-sm-3 col-lg-3">
                      <p className="mb-0">{`${handleIntervalFormat(item.start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(item.start_date, 'DD')))} ${handleIntervalFormat(item.start_date, 'MMM')}`}</p>
                    </Col>
                    <Col className="col-sm-3 col-lg-6">
                      <p className="mb-0">
                        {item.join_time ? `${handleIntervalFormat(item.join_time, 'hh:mma')} - ${handleIntervalFormat(item.leave_time, 'hh:mma')}` : 'No timings'}
                      </p>
                    </Col>
                    <Col className="col-sm-3 col-lg-3">
                      <p className="mb-0">{(item.attendance === 0) ? 'Absent' : 'Present'}</p>
                    </Col>
                  </Row>
                ))}
              </Collapse>
              <Button className="viewDetails" color="link" onClick={this.toggle}>
                {collapse ? 'Close Attendance' : 'View Attendance'}
              </Button>
            </Col>
          )}
          <Col lg="12" className="certificate-container mt-10">
            <p className="title"><span>Preview Certificate</span></p>
            <img src={`${IMAGES.WICULTYCERT}`} alt="preview" className="img-fluid mb-2" />
            {certificate ? <a className="viewDetails mt-2" href={certificate} target="_blank" rel="noopener noreferrer">Download Certificate</a>
              : <Button className="requestCert" color="warning" onClick={this.requestCert}>Request Certificate</Button>}
          </Col>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUpcomingClasses: (payload, cb) => {
    dispatch(upcomingClassesAction(payload, cb));
  },
  getAttendance: (payload, cb) => {
    dispatch(attendanceDetails(payload, cb));
  },
  requestCertificate: (payload, cb) => {
    dispatch(requestCertificateAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  profileDetails: state.profileDetails,
  upcomingClasses: state.upcomingClasses,
  attendanceReducer: state.attendanceReducer,
  mycourseDetails: state.mycourseDetails,
  UserPrefInfo: state.UserPrefInfo,
  LMSData: state.LMSDetails
});

LMSright.propTypes = {
  getUpcomingClasses: PropTypes.func.isRequired,
  getAttendance: PropTypes.func.isRequired,
  requestCertificate: PropTypes.func.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
  courseName: PropTypes.string.isRequired,
  LMSData: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LMSright);
