import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Modal,
  ModalBody,
  Row,
  Col,
  Button,
  FormGroup
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import requestCallbackAction from '../../registration/requestCallback';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import { validations, inlineErrorMsgs } from '../../validations';
import {
  getCountryVals, getAutoFillDetails,
  buttonize, filterInstrLedCourse
} from '../utilFunctions/utilFunction';
import handleDataLayer from '../utilFunctions/seoUtil';
import sf from '../safeTraverse';
import messageFn from '../message'
import { MESSAGES } from '../../locales/locale';

import './assetModal.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

const AssetModal = ({
  type,
  src,
  showModal,
  showSupport,
  onModalClose,
  sendEnquiry,
  UserPrefInfo,
  profileDetails,
  unique_title,
  courseList
}) => {
  const formEl = useRef(null);
  const [isOpen, setIsOpen] = useState(showModal);
  const { email, contact_no } = getAutoFillDetails(profileDetails);

  function toggleModal () {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    setIsOpen(showModal)
  }, [showModal]);

  const handleSubmit = (event, values) => {
    const { phone_code } = getCountryVals(UserPrefInfo);
    const getOtpValues = {
      name: values.name || 'User',
      contact_no: values.contact_no,
      mobile_code: phone_code,
      email: values.email,
      course_interested: values.course
    }

    handleDataLayer({
      userProject: 'Wiculty',
      page: 'course details page',
      url: window.location.href,
      course: unique_title,
      source: 'CALLBACK_MODAL'
    })

    sendEnquiry({ getOtpValues }, (response) => {
      const { data = {}, status } = response || {};
      if (data && status === 200) {
        formEl.current.reset()
        messageFn(data.data || 'Success', SUCCESS);
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
      }
    })
  }
  const handleCountryChange = () => {};

  return (
    <Modal
      isOpen={isOpen}
      size={showSupport ? 'lg' : 'md'}
      toggle={() => toggleModal()}
      onClosed={() => onModalClose()}
      className="modal-dialog-centered asset-modal"
    >
      <div className="modal-close" {...buttonize(() => { toggleModal() })}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <ModalBody className="p-0">
        <Row>
          <Col md={12} lg={showSupport ? 8 : 12} className="px-0">
            { type === 'image' ? (
              <img src={src} className="img img-fluid w-100" alt="Asset source" />
            ) : (
              <div className="embed-responsive embed-responsive-16by9">
                <iframe title="video" src={src} frameBorder="0" allowFullScreen className="embed-responsive-item" />
              </div>
            )}
          </Col>
          <Col className={showSupport ? 'bg-white border-left col-lg-4' : 'd-none'}>
            <div className="h-100 flex-vertical-center">
              <div>
                <h4>Request a Callback</h4>
                <AvForm id="CODO-form" onValidSubmit={handleSubmit} ref={formEl}>
                  <div className="fullWidth mr-4">
                    <AvField
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Email*"
                      autoComplete="email"
                      className="form-control"
                      errorMessage={inlineErrorMsgs.Email}
                      validate={validations.email}
                    />
                  </div>
                  <div className="d-inline-flex fullWidth">
                    <CountryDropDown name="country_code" onSelectCountry={handleCountryChange} />
                    <AvField
                      type="text"
                      name="contact_no"
                      value={contact_no}
                      id="enquiryTelephoneSuggest"
                      placeholder="Phone Number*"
                      autoComplete="tel-national"
                      className="form-control enquiryTelephoneSuggest"
                      errorMessage={inlineErrorMsgs.Mobile_number}
                      validate={validations.mobile_number}
                    />
                  </div>
                  <FormGroup>
                    <AvField
                      type="select"
                      name="course"
                      errorMessage={inlineErrorMsgs.Course_select}
                      required
                    >
                      {courseList.map(courseItem => (
                        <option value={courseItem.unique_title}>
                          {courseItem.display_title}
                        </option>
                      ))}
                    </AvField>
                  </FormGroup>

                  <FormGroup className="text-right">
                    <Button color="btn btn-theme btn-md">Submit</Button>
                  </FormGroup>
                </AvForm>
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  profileDetails: state.profileDetails,
  courseList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || [])
});

const mapDispatchToProps = dispatch => ({
  sendEnquiry: (payload, cb) => {
    dispatch(requestCallbackAction(payload, cb));
  }
});

AssetModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  showSupport: PropTypes.bool,
  onModalClose: PropTypes.func.isRequired,
  sendEnquiry: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  unique_title: PropTypes.string.isRequired,
  courseList: PropTypes.arrayOf()
}

AssetModal.defaultProps = {
  showSupport: true,
  courseList: []
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetModal);
