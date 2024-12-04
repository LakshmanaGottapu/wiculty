import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'reactstrap';
import { connect } from 'react-redux';
import DateCountdown from 'react-date-countdown-timer';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleScroll, getCountryVals } from '../utilFunctions/utilFunction';
import handleDataLayer from '../utilFunctions/seoUtil';
import sf from '../safeTraverse';
import BOGOModalBody from '../../CRMLeadForms/BOGOForm';

// Actions
import CRMleadCaptureAction from '../../../Actions/CRMleadcaptureAction';
import authService from '../../../services/authService';
// import { IMAGES } from '../../locales/images';

import { BOGOIcons } from '../../staticJSON/staticIconJson';
// import { BOGOCourseListJson } from '../../staticJson'
import messageFn from '../message'
import { MESSAGES } from '../../locales/locale';
import './BOGO.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

const BOGO = ({
  sendEnquiry, UserPrefInfo,
  batchInfo, offerInfo,
  course_title, unique_title
}) => {
  const [isModalOpen, setModalFlag] = useState(false);
  const [isfreesCourseAvail, setFreeCourseFlag] = useState(true);
  const freeCourseList = sf(batchInfo, ['course_price', 'freeCourseList']) || [];
  const { offer_banner = {} } = offerInfo;
  const { end_date } = offer_banner
  useEffect(() => {
    setFreeCourseFlag(freeCourseList.length)
  }, [batchInfo]);

  const handleBOGOClose = () => {
    setModalFlag(false);
  }
  const handleGrabNow = () => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      handleScroll('batchDetails');
    } else {
      setModalFlag(true);
    }
  }
  const handleBOGOSubmit = (event, values) => {
    const { Name, phone_code } = getCountryVals(UserPrefInfo)
    setModalFlag(true);
    const leadInfo = {
      name: Name || 'User',
      email: values.email,
      contact_no: values.contact_no,
      mobile_code: phone_code,
      course_interested: unique_title,
      source: 'BOGO'
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'course details page',
      url: window.location.href,
      course: unique_title,
      source: 'BOGO'
    })

    sendEnquiry({ leadInfo }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        const { data: { message = '' } } = data
        messageFn(message, SUCCESS);
        setModalFlag(false);
        handleScroll('BATCH DETAILS');
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }
  const handleCountryChange = () => {};
  return (
    <div className={isfreesCourseAvail ? 'd-block' : 'd-none'}>
      <Row className="cd-uw">
        <Col lg={{ size: 12 }} className="mb-4 flex-">
          <div className="BOGO_card shadow mb-3 p-3">
            {/* <div>
              <embed
                src={IMAGES.BOGO_WIC_TEXT}
                width="150"
                height="40"
                type="image/svg+xml"
              />
            </div> */}
            <svg className="blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#8EDBF3" d="M48.2,-51.8C59.2,-37.2,62.5,-18.6,60.7,-1.8C58.8,14.9,51.8,29.8,40.8,38.3C29.8,46.7,14.9,48.7,-2.9,51.6C-20.8,54.6,-41.6,58.5,-56.7,50C-71.7,41.6,-81.1,20.8,-80.8,0.3C-80.6,-20.2,-70.6,-40.4,-55.5,-55C-40.4,-69.5,-20.2,-78.4,-0.8,-77.7C18.6,-76.9,37.2,-66.4,48.2,-51.8Z" transform="translate(100 100)" />
            </svg>
            <div className="mt-3 text-bogo">
              <div className="text-center BOGO_card_offertitle mb-2">
                <p className="big_text mb-0">
                  Buy
                  <span className="font-weight-bold px-2">
                    {`${course_title}`}
                  </span>
                  Course
                </p>
                <p className="big_text">
                    Get 1 Instructor Led
                </p>
                <h4 className="big_text d-flex justify-content-center">
                  <p>LIVE COURSE</p>
                  <p className="animated infinite pulse delay-2s font-weight-bold pl-2 wic-color">FREE</p>
                </h4>
                <hr className="border-white" />
              </div>
              {/* <div className="BOGO_promotion mt-2 text-center">
                <p className="mb-2">
                  Industry-oriented course with advanced skillset
                </p>
                <p>
                  Rush fast & add value to your profile now
                </p>
              </div> */}
              <h5 className="pb-2 text-center">
               Free Course Options
              </h5>
              <div className="course_list d-flex justify-content-center">
                <ul>
                  {freeCourseList.map(course => (
                    <li className="pb-2">
                      <FontAwesomeIcon className="fa-icon-size wic-color mr-2" icon={BOGOIcons[course.unique_title]} />
                      {course.unique_title}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 text-center offer_count">
                <p className="text-capitalize pr-2 mb-2">
                  <b>
                    LIMITED PERIOD OFFER
                  </b>
                </p>
                <DateCountdown className="pt-4" dateTo={end_date} callback={() => {}} mostSignificantFigure="day" />
              </div>
              <div className="mt-3 text-center">
                <button type="button" className="btn btn-theme btn-md w-50" onClick={() => handleGrabNow()}>
                  Grab Now
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Modal
        isOpen={isModalOpen}
        toggle="true"
        className="modal-dialog-centered"
        data-backdrop="static"
        id="BOGOForm"
      >
        <BOGOModalBody
          handleBOGOClose={() => handleBOGOClose()}
          handleBOGOSubmit={handleBOGOSubmit}
          handleCountryChange={handleCountryChange}
        />
      </Modal>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(CRMleadCaptureAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  batchInfo: state.batchInfo,
  offerInfo: state.offerReducer
});

BOGO.propTypes = {
  sendEnquiry: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  batchInfo: PropTypes.shape({}).isRequired,
  offerInfo: PropTypes.shape({}).isRequired,
  course_title: PropTypes.string.isRequired,
  unique_title: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BOGO);
