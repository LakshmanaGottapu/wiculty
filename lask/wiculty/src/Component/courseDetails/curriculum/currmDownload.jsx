import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faGift } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

// CRM leads
import CurrmLeadForm from '../../CRMLeadForms/CurrmLeadForm';
import messageFn from '../../common/message';
import { MESSAGES } from '../../locales/locale';
// utils common functions
import { getCountryVals, isShowGift, getLinuxSlug } from '../../common/utilFunctions/utilFunction';
import handleDataLayer from '../../common/utilFunctions/seoUtil';
// Actions
import CRMleadCaptureAction from '../../../Actions/CRMleadcaptureAction';
import authService from '../../../services/authService';
import courseInfoAction from '../courseDetailsAction';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

const CurrmDownload = ({
  course_curriculum, UserPrefInfo,
  sendEnquiry, unique_title, page, course_slug,
  getCourseDetails, history
}) => {
  const [isModalOpen, setModalFlag] = useState(false);
  const handleCurrmLeadClose = () => {
    setModalFlag(false);
  }
  const handleCurrmLeadSubmit = (event, values) => {
    const { Name, phone_code } = getCountryVals(UserPrefInfo);
    setModalFlag(true);
    const leadInfo = {
      name: Name || 'User',
      email: values.email,
      contact_no: values.contact_no,
      mobile_code: phone_code,
      course_interested: unique_title,
      source: 'CODO'
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'course details page',
      url: window.location.href,
      course: unique_title,
      source: 'Curriculum'
    })

    sendEnquiry({ leadInfo }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        const { data: { message = '' } } = data
        messageFn(message, SUCCESS);
        setModalFlag(false);
        window.open(course_curriculum, '_blank');
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }

  const handleCurrmDownload = () => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      window.open(course_curriculum, '_blank');
    } else {
      setModalFlag(true);
    }
  }

  const handleCountryChange = () => {};

  const handleGiftClick = () => {
    // course details API call
    getCourseDetails({ courseSlug: getLinuxSlug() }, (data) => {
      history.push(`/${getLinuxSlug()}`);
    })
  }
  return (
    <div className="row">
      <div className="col-12 col-md-12 col-lg-8 d-block d-md-flex justify-content-between align-items-center">
        {!page && (
          <h2 className="d-flex mb-2 mb-md-0">
          Curriculum
          </h2>
        )}
        {course_curriculum && (
          <button
            onClick={handleCurrmDownload}
            className={classnames('btn', { 'btn-theme-bordered': !page, 'text-white border-white currm_dwnd': page })}
            type="button"
          >
            <FontAwesomeIcon icon={faDownload} />
            <span className="pl-2">
              Download Curriculum
            </span>
          </button>
        )}
      </div>
      {!page && (
        <div className="col-12 col-md-12 col-lg-4 d-none d-lg-flex justify-content-between align-items-center">
          {isShowGift(course_slug) ? (
            <button className="text-black btn btn-link" type="button" onClick={() => handleGiftClick()}>
              <h2 className="font-weight-normal">
                <FontAwesomeIcon icon={faGift} className="mr-2 linux-gift text-info" />
          Free linux & shell scripting
              </h2>
            </button>

          ) : ''}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        toggle="true"
        className="modal-dialog-centered"
        data-backdrop="static"
        id="BOGOForm"
      >
        <CurrmLeadForm
          handleCurrmLeadClose={handleCurrmLeadClose}
          handleCurrmLeadSubmit={handleCurrmLeadSubmit}
          handleCountryChange={handleCountryChange}
        />
      </Modal>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(CRMleadCaptureAction(payload, cb));
  },
  getCourseDetails: (payload, cb) => {
    dispatch(courseInfoAction(payload, cb))
  }
});
const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  batchInfo: state.batchInfo
});

CurrmDownload.defaultProps = {
  page: ''
}

CurrmDownload.propTypes = {
  course_curriculum: PropTypes.string.isRequired,
  sendEnquiry: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  unique_title: PropTypes.string.isRequired,
  page: PropTypes.string,
  course_slug: PropTypes.string.isRequired,
  getCourseDetails: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CurrmDownload));
