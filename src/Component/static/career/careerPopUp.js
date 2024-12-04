import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Modal, ModalBody, FormGroup, Button, ModalHeader, Progress
} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import {
  upload, emptyFile, validateFile,
  getAutoFillDetails, getCountryVals
} from '../../common/utilFunctions/utilFunction';
import careerAction from './careerAction';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import { validations, inlineErrorMsgs } from '../../validations';
import './career.scss';
import { MESSAGES } from '../../locales/locale';
import messageFn from '../../common/message';
import sf from '../../common/safeTraverse';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

function ContactPopUp ({
  modalOpen, handlePopUpDismiss, updateCareerDetails, applied_for, profileDetails, UserPrefInfo
}) {
  const [careerInfo, setCareerInfo] = useState({});
  const [resume, setResumeKey] = useState('');
  const [isResume, setResumeErr] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(10)
  const [isDisabled, setDisabledFlag] = useState(false)
  const [isLoading, setisLoading] = useState(false);

  const formRef = useRef(null);
  const { Name, email, contact_no } = getAutoFillDetails(profileDetails);

  function RegisterCareer (event, values) {
    if (resume) {
      setCareerInfo({
        ...values, resume, applied_for
      });
      setisLoading(true);
    } else {
      setResumeErr(true)
    }
  }

  function onResumeUpload (e) {
    setDisabledFlag(true);
    const res = validateFile(e, ['pdf', 'doc', 'docx'], 10);
    if (res.success) {
      upload(e, 'career', 'resume')
        .then((resp) => {
          if (resp.result.status === 204) {
            messageFn('Resume Uploaded successfully !', SUCCESS)
            setResumeKey(resp.key)
            setResumeErr(false)
            setisLoading(false);
            setDisabledFlag(false)
          } else {
            messageFn(GENERIC_ERR, ERROR)
            setisLoading(false);
            setDisabledFlag(false)
          }
        })
        .catch(err => err)
    } else {
      const { message = GENERIC_ERR } = res;
      messageFn(message, ERROR)
      setisLoading(false);
      setDisabledFlag(false)
    }
  }

  useEffect(() => {
    setUploadProgress(40)
    if (Object.keys(careerInfo).length > 0) {
      setisLoading(true);
      const { phone_code } = getCountryVals(UserPrefInfo)
      updateCareerDetails({ ...careerInfo, 'mobile_code': phone_code }, (resp) => {
        const { data = {}, status } = resp;
        if (data && status === 200) {
          const msg = sf(data, ['data'])
          handlePopUpDismiss()
          setUploadProgress(100)
          messageFn(msg, SUCCESS)
          setResumeErr(false)
          emptyFile();
          setisLoading(false);
          formRef.current.reset();
        } else {
          const { message = GENERIC_ERR } = data;
          messageFn(message, ERROR)
          setisLoading(false);
        }
      })
    }
  }, [careerInfo]);

  function handleCountryChange (countryLang) {}

  return (
    <div>
      {isLoading && <div className="loading" />}
      <Modal isOpen={modalOpen} className="modal-dialog-centered">
        <ModalHeader toggle={() => handlePopUpDismiss()}>
          <span className="modal-hd-color">
            {'Join our Wiculty Family Now'}
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="career-form">
            <AvForm id="career-form" onValidSubmit={(event, val) => RegisterCareer(event, val)} ref={formRef}>
              <FormGroup className=" side-fileds">
                <AvField
                  type="text"
                  name="name"
                  id="name"
                  value={Name}
                  placeholder="Name*"
                  autoComplete="off"
                  className="form-control"
                  errorMessage={inlineErrorMsgs.Name}
                  validate={Object.assign(validations.name, { required: { value: true } })}
                />
              </FormGroup>
              <FormGroup className=" side-fileds">
                <AvField
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Email ID*"
                  autoComplete="off"
                  className="form-control"
                  errorMessage={inlineErrorMsgs.Email}
                  validate={validations.email}
                />
              </FormGroup>
              <div className="d-inline-flex country-code fullWidth">
                <CountryDropDown
                  onSelectCountry={countryObj => handleCountryChange(countryObj)}
                />
                <AvField
                  type="number"
                  name="contact_no"
                  id="mobile_no"
                  value={contact_no}
                  placeholder="Mobile*"
                  autoComplete="off"
                  className="form-control"
                  errorMessage={inlineErrorMsgs.Mobile_number}
                  validate={validations.mobile_number}
                />
              </div>
              <label htmlFor="resume" className="career-resume">
                <span>Upload Resume*</span>
                <input
                  id="resume"
                  type="file"
                  name="resume"
                  onChange={e => onResumeUpload(e)}
                  accept=".pdf,.doc,.docx"
                />
              </label>
              {isResume && (
                <p className="form-errors">
                  {'* Please upload your resume'}
                </p>
              )}
              {isDisabled &&
              (
                <div style={{ margin: 5 }}>
                  <Progress animated color="success" value={uploadProgress}>
                    {'Uploading in Progress'}
                  </Progress>
                </div>
              )}
              <div className="tac">
                <FormGroup className={classnames('register-button', { disabled: isDisabled })}>
                  <Button
                    type="submit"
                    style={{ color: '#000', background: '#fff', width: 110 }}
                    className={classnames('form-button', { disabled: isDisabled })}
                  >
                    {'Submit'}
                  </Button>
                </FormGroup>
              </div>
            </AvForm>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export const mapDispatchToProps = dispatch => ({
  updateCareerDetails: (payload, cb) => {
    dispatch(careerAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

ContactPopUp.propTypes = {
  modalOpen: PropTypes.isRequired,
  handlePopUpDismiss: PropTypes.func.isRequired,
  updateCareerDetails: PropTypes.func.isRequired,
  applied_for: PropTypes.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactPopUp);
