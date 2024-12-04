import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FormGroup, Button, Progress } from 'reactstrap';
import {
  upload, emptyFile, validateFile, getCountryVals
} from '../common/utilFunctions/utilFunction';
import instructorAction from './instructorAction';
import CountryDropDown from '../country_dropdown/country_dropdown';
import { validations, inlineErrorMsgs } from '../validations';
import { MESSAGES } from '../locales/locale';
import messageFn from '../common/message';
import sf from '../common/safeTraverse';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

function InstructorForm ({ updateInstructorDetails, UserPrefInfo }) {
  const [instructorInfo, setInstructorInfo] = useState({});
  const [resume, setResumeKey] = useState('');
  const [isResume, setResumeErr] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(10)
  const [isDisabled, setDisabledFlag] = useState(false)
  const [isLoading, setisLoading] = useState(false);
  const formEl = useRef(null);

  function RegisterInstructor (event, values) {
    if (resume) {
      setInstructorInfo({ ...values, resume });
      setisLoading(true);
    } else {
      setResumeErr(true)
    }
  }

  function onResumeUpload (e) {
    setUploadProgress(40)
    setDisabledFlag(true);
    const res = validateFile(e, ['pdf', 'doc', 'docx'], 10);
    if (res.success) {
      upload(e, 'instructor', 'resume')
        .then((resp) => {
          if (resp.result.status === 204) {
            setUploadProgress(100)
            setResumeKey(resp.key)
            messageFn('Resume Uploaded successfully !', SUCCESS)
            setResumeErr(false)
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
    if (Object.keys(instructorInfo).length > 0) {
      const { phone_code } = getCountryVals(UserPrefInfo)
      updateInstructorDetails({ ...instructorInfo, 'mobile_code': phone_code }, (resp) => {
        const { data = {}, status } = resp;
        if (data && status === 200) {
          formEl.current.reset()
          const msg = sf(data, ['data', 'message'])
          messageFn(msg, SUCCESS)
          setisLoading(false);
          emptyFile();
        } else {
          const { message = GENERIC_ERR } = data;
          messageFn(message, ERROR)
          setisLoading(false);
        }
      })
    }
  }, [instructorInfo]);

  function handleCountryChange (countryLang) {}
  return (
    <div className="instructor-form bg-white">
      {isLoading && <div className="loading" />}
      <h6 className="ftb ft20 text-dark">Join our instructors pool Now</h6>
      <p className="text-dark">Feed in to Lead in !!</p>
      <AvForm id="instructor-form" onValidSubmit={(event, val) => RegisterInstructor(event, val)} ref={formEl}>
        <FormGroup className=" side-fileds">
          <AvField
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            autoComplete="given-name"
            className="form-control"
            errorMessage="Please enter Name"
            validate={validations.name}
          />
        </FormGroup>
        <FormGroup className=" side-fileds">
          <AvField
            type="email"
            name="email"
            id="email"
            placeholder="Email ID*"
            autoComplete="email"
            className="form-control"
            errorMessage={inlineErrorMsgs.Email}
            validate={validations.email}
          />
        </FormGroup>
        <div className="d-inline-flex country-code">
          <FormGroup className="country-code-required">
            <CountryDropDown onSelectCountry={countryObj => handleCountryChange(countryObj)} />
          </FormGroup>
          <FormGroup className="mobile-input">
            <AvField
              type="number"
              name="contact_no"
              id="mobile"
              placeholder="Mobile number*"
              autoComplete="tel-national"
              className="form-control"
              errorMessage={inlineErrorMsgs.Mobile_number}
              validate={validations.mobile_number}
            />
          </FormGroup>
        </div>
        <FormGroup className="side-fileds">
          <AvField
            type="text"
            name="linkedin_profile"
            id="linkedin_profile"
            placeholder="Your Linkedin Profile"
            autoComplete="off"
            className="form-control"
          />
        </FormGroup>
        <FormGroup className="side-fileds">
          <label htmlFor="resume" className="instructor-resume">
            <span>Upload Resume*</span>
            <input
              id="resume"
              type="file"
              name="resume"
              onChange={e => onResumeUpload(e)}
              accept=".pdf,.doc,.docx"
            />
          </label>
        </FormGroup>
        {isResume && (
          <p className="form-errors">
            {'* Please upload your resume'}
          </p>
        )}
        {isDisabled &&
          (
            <div>
              <Progress animated color="success" value={uploadProgress}>
                {'Uploading in Progress'}
              </Progress>
            </div>
          )}
        <div>
          <FormGroup className={classnames('register-button', { disabled: isDisabled })}>
            <Button
              type="submit"
              style={{ color: '#000', background: '#fff', width: 110 }}
              className={classnames('form-button', { disabled: isDisabled })}
              disabled={isDisabled}
            >
              {'Submit'}
            </Button>
          </FormGroup>
        </div>
      </AvForm>
    </div>
  )
}
export const mapDispatchToProps = dispatch => ({
  updateInstructorDetails: (payload, cb) => {
    dispatch(instructorAction(payload, cb));
  }
});
export const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo
});

InstructorForm.propTypes = {
  updateInstructorDetails: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default connect(null, mapDispatchToProps)(InstructorForm);
