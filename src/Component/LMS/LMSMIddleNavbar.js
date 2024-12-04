/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { buttonize, getOrdinal, handleIntervalFormat } from '../common/utilFunctions/utilFunction';
import LMSUpcomingClasses from './components/LMSUpcomingClasses';
import LMSAttendance from './components/LMSAttendance';
import LMSCertificate from './components/LMSCertificate';
import attendanceDetails from './LMSModulePanel/attendanceAction';
import sf from '../common/safeTraverse';
import ClassFeedBack from './classFeedBack/classFeedBack';

const LMSMiddleNavBar = ({
  data,
  profileDetails,
  getAttendance,
  globalDetails,
  isSelfpaced
}) => {
  const [activeTab, setActiveTab] = useState('upcoming_classes');
  const [attendance, setAttendance] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classId, setClassId] = useState(false);
  const [batchDate, setBatchDate] = useState(false);
  const { courseBatchId } = globalDetails;
  const userDetails = sf(profileDetails, ['data', 'data', 'user']) || {};

  const isInstructor = userDetails && userDetails.is_instructor;

  function isActiveTab (name) {
    return name === activeTab;
  }

  function classfeedBackPopUp (event) {
    // Filter pendingFeedbacks for who attended classes
    const pendingFeedBackItems = (attendance.length > 0) &&
     attendance.filter(classItem => !classItem.feedback && classItem.attendance);
    if (pendingFeedBackItems && pendingFeedBackItems.length > 0) {
      const [feedBackItem] = pendingFeedBackItems;
      const classDate = handleIntervalFormat(feedBackItem.start_date, 'DD')
      setClassId(feedBackItem.class_id);
      setIsModalOpen(true);
      setBatchDate(`${classDate}${getOrdinal(Number(classDate))}-${handleIntervalFormat(feedBackItem.start_date, 'MMM')}-${handleIntervalFormat(feedBackItem.start_date, 'YYYY')}`);
    } else {
      setClassId(false);
      event.target.nextSibling.click()
    }
  }

  useEffect(() => {
    if (isSelfpaced) {
      setActiveTab('certificate');
    }
  }, [isSelfpaced]);

  useEffect(() => {
    getAttendance({ batchID: courseBatchId }, (resp) => {
      const result = sf(resp, ['data', 'data', 'classes']) || [];
      setAttendance(result);
    })
  }, []);

  return (
    <>
      {!isSelfpaced && (
        <ClassFeedBack
          classId={classId}
          isModalOpen={isModalOpen}
          handlePopUpClose={() => setIsModalOpen(false)}
          batchDate={batchDate}
        />
      )}
      <Col xs={12} className={isSelfpaced ? 'd-none' : 'px-0'}>
        <nav className="nav bg-dark py-2 lms-navbar">
          { !isSelfpaced && (
            <a className={isActiveTab('upcoming_classes') ? 'nav-link active' : 'nav-link'} {...buttonize(setActiveTab, 'upcoming_classes')}>
              Upcoming Classes
            </a>
          ) }
          {!isInstructor && (
            <>
              <a className={isActiveTab('attendance') ? 'nav-link active' : 'nav-link'} {...buttonize(setActiveTab, 'attendance')}>
                Attendance
              </a>
              <a className={isActiveTab('certificate') ? 'nav-link active' : 'nav-link'} href="#" {...buttonize(setActiveTab, 'certificate')}>
                Certificate
              </a>
            </>
          )}
        </nav>
        <Row style={{ minHeight: '200px', marginBottom: '20px' }}>
          <Col xs={12}>
            { isActiveTab('upcoming_classes') &&
              <LMSUpcomingClasses classfeedBackPopUp={classfeedBackPopUp} />
            }
            { isActiveTab('attendance') &&
              <LMSAttendance attendance={attendance} />
            }
            { isActiveTab('certificate') &&
              <LMSCertificate />
            }
          </Col>
        </Row>
      </Col>
    </>
  )
};

LMSMiddleNavBar.propTypes = {
  data: PropTypes.shape({}).isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  globalDetails: PropTypes.shape({}).isRequired,
  getAttendance: PropTypes.func.isRequired,
  isSelfpaced: PropTypes.bool.isRequired
}

const mapDispatchToProps = dispatch => ({
  getAttendance: (payload, cb) => {
    dispatch(attendanceDetails(payload, cb));
  }
});

const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  profileDetails: state.profileDetails,
  attendanceData: state.attendanceReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(LMSMiddleNavBar);
