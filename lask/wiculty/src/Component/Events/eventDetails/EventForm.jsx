import React, { useRef, useState } from 'react';
import {
  FormGroup, Button
} from 'reactstrap';
import { connect } from 'react-redux'
import { AvForm, AvField } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv } from '@fortawesome/free-solid-svg-icons';
import { validations, inlineErrorMsgs } from '../../validations';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import eventRegister from './eventRegistartionAction';

// utils
import { getAutoFillDetails, getCountryVals } from '../../common/utilFunctions/utilFunction';
import AlertMsg from '../../common/alertMsg';
import sf from '../../common/safeTraverse';
import { MESSAGES } from '../../locales/locale'

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, DANGER, WARNING }
} = MESSAGES

function EventForm ({
  event = {}, UserPrefInfo,
  registerToEvent, profileDetails, courseName
}) {
  const formEl = useRef(null);
  const [msgObj, setMsgObj] = useState({ showMsg: false, message: '' });

  const handleRegister = (e, values) => {
    const { phone_code } = getCountryVals(UserPrefInfo)
    registerToEvent({
      ...values,
      first_name: values.first_name || 'Wiculty',
      event_id: event.id,
      mobile_code: phone_code,
      course: courseName
    }, (response) => {
      const { data = {}, status } = response || {};
      if (status === 200) {
        formEl.current.reset();
        const msg = sf(data, ['data', 'message']);
        setMsgObj({
          color: SUCCESS,
          message: msg,
          showMsg: true
        })
      } else if (status === 206) {
        formEl.current.reset()
        const { message = GENERIC_ERR } = data || {};
        setMsgObj({
          color: WARNING,
          message,
          showMsg: true
        })
      } else {
        const { message = GENERIC_ERR } = data || {};
        setMsgObj({
          color: DANGER,
          message,
          showMsg: true
        })
      }
    })
  };

  const handleCountryChange = () => {};
  const { email, contact_no } = getAutoFillDetails(profileDetails);
  const { name } = validations;
  const { color, message, showMsg } = msgObj;
  return (
    <div className="event-form p-4">
      <h5 className="my-2">
        <FontAwesomeIcon className="mr-2 wic-color" icon={faTv} alt={event.display_title} />
        RESERVE YOUR SPOT NOW
      </h5>
      <AvForm className="w-100 my-3" id="event-form" onValidSubmit={handleRegister} ref={formEl}>
        <AvField
          type="text"
          name="first_name"
          id="first_name"
          placeholder="Name"
          autoComplete="given-name"
          className="form-control"
          errorMessage={inlineErrorMsgs.Name}
          validate={{
            ...name,
            minLength: { ...name.minLength, value: 1 }
          }}
        />
        <AvField
          type="email"
          name="email"
          id="suggestEmail"
          placeholder="Email*"
          value={email}
          autoComplete="email"
          className="form-control"
          errorMessage={inlineErrorMsgs.Email}
          validate={validations.email}
        />

        <div className="d-inline-flex fullWidth">
          <CountryDropDown name="country_code" onSelectCountry={handleCountryChange} />
          <AvField
            type="text"
            name="contact_no"
            id="enquiryTelephoneSuggest"
            placeholder="Phone Number*"
            value={contact_no}
            autoComplete="off"
            className="form-control enquiryTelephoneSuggest"
            errorMessage={inlineErrorMsgs.Mobile_number}
            validate={validations.mobile_number}
          />
        </div>

        <FormGroup className="mt-4 text-right">
          <Button color="primary" className="w-100">Submit</Button>
        </FormGroup>
        {showMsg && <AlertMsg message={message} color={color} id={Math.random()} />}
      </AvForm>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  registerToEvent: (payload, cb) => {
    dispatch(eventRegister(payload, cb))
  }
})
const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

EventForm.propTypes = {
  event: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  registerToEvent: PropTypes.func.isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  courseName: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm)
