import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen, faBriefcase, faCheckCircle, faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import sf from '../common/safeTraverse';
import { ERRORMSG, MESSAGES } from '../locales/locale';
import { IMAGES } from '../locales/images';
import updateGroomingAction from './Actions/updateGroomingInfoAction';
import Message from '../common/messageSection';
import NewCountryDropDown from '../country_dropdown/newCountryDropdown';
import profileAction from './profileAction';

const { ERROR: { GENERIC_ERR } } = MESSAGES;

class GroomingInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      groomingInfo: {},
      selectedCurrentCountryObj: { country_flag: `${IMAGES.INDIAFLAG}`, country_name: 'India' },
      selectedPrefferedCountryObj: { country_flag: `${IMAGES.INDIAFLAG}`, country_name: 'India' },
      Edit: false,
      isUpdate: false,
      isUpdateMessage: false,
      message: '',
      color: '',
      isUpdating: false
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { profileDetails } = props || {}
    const { isUpdate } = state;
    const groomingInfo = sf(profileDetails, ['data', 'data', 'career']) || {};
    if (profileDetails && !isUpdate) {
      return {
        groomingInfo,
        selectedCurrentCountryObj: { country_name: groomingInfo.current_country_name },
        selectedPrefferedCountryObj: { country_name: groomingInfo.preferred_country_name }
      }
    }
    return null
  }

  getErrorStatus () {
    const {
      groomingInfo: {
        current_city, current_ctc, jobs_interested,
        employment_type, realocate,
        preferred_city
      }
    } = this.state;
    let errorFlag;
    if (realocate) {
      errorFlag = true;
      if (current_city && current_ctc && jobs_interested &&
        employment_type && preferred_city) {
        errorFlag = false
      }
    } else {
      errorFlag = true;
      if (current_city && current_ctc &&
        jobs_interested && employment_type) {
        errorFlag = false;
      }
    }
    return errorFlag;
  }

  handleGroomInfo (val, key, type, countryCode) {
    const { groomingInfo, selectedCurrentCountryObj, selectedPrefferedCountryObj } = this.state;
    let groomingObj;
    let selectedCurrentCountry = selectedCurrentCountryObj;
    let selectedPrefferedCountry = selectedPrefferedCountryObj;
    if (key === 'realocate') {
      const value = val === 'YES' ? 1 : 0;
      groomingObj = { ...groomingInfo, [key]: value }
    } else if (type === 'countryDropDown') {
      groomingObj = { ...groomingInfo, [key]: val.country_name, [countryCode]: val.country }

      if (countryCode === 'current_country') {
        selectedCurrentCountry = { country_name: val.country_name, country_flag: val.country_flag };
      } else {
        selectedPrefferedCountry = {
          country_name: val.country_name,
          country_flag: val.country_flag
        }
      }
    } else {
      groomingObj = { ...groomingInfo, [key]: val }
      selectedCurrentCountry = selectedCurrentCountryObj;
      selectedPrefferedCountry = selectedPrefferedCountryObj;
    }
    this.setState({
      groomingInfo: groomingObj,
      selectedCurrentCountryObj: selectedCurrentCountry,
      selectedPrefferedCountryObj: selectedPrefferedCountry,
      isUpdate: true
    })
  }

  handleEdit () {
    this.setState({
      Edit: true
    })
  }

  handleSave () {
    const { updateGroomingDetails, getProfileDetails } = this.props;
    const {
      groomingInfo,
      selectedCurrentCountryObj,
      selectedPrefferedCountryObj
    } = this.state;

    if (!groomingInfo.selectedCurrentCountry) {
      groomingInfo.selectedCurrentCountry = selectedCurrentCountryObj;
    }
    if (!groomingInfo.selectedPrefferedCountry) {
      groomingInfo.selectedPrefferedCountry = selectedPrefferedCountryObj;
    }
    this.setState({
      isUpdating: true
    })
    updateGroomingDetails(groomingInfo, (resp) => {
      if (resp.status === 200) {
        getProfileDetails({}, (response) => {})
        this.setState({
          isUpdateMessage: true,
          message: 'information Updated successfully !',
          color: 'success',
          Edit: false,
          isUpdating: false
        })
      } else {
        this.setState({
          isUpdateMessage: true,
          message: GENERIC_ERR,
          color: 'danger',
          Edit: false,
          isUpdating: false
        })
      }
    })
  }

  handleClose () {
    this.setState({
      Edit: false,
      isUpdate: false
    })
  }

  handleMessageDismiss () {
    this.setState({
      isUpdateMessage: false
    })
  }

  render () {
    const {
      groomingInfo: {
        current_city, current_country_name, current_ctc, jobs_interested,
        realocate, employment_type, preferred_country_name, preferred_city
      },
      Edit, message, color, isUpdateMessage,
      selectedCurrentCountryObj, selectedPrefferedCountryObj, isUpdating
    } = this.state;
    return (
      <Row className="groomingInfo-info-container">
        <Col className="info-details" lg={{ size: 8 }} md={{ size: 10 }} xs={{ size: 10 }}>
          <Row>
            <Col className="ft25 fca fwn groomingInfo-info-text" lg={{ size: 6 }} md={{ size: 4 }} xs={{ size: 10 }}>
              <span className="fcr">
                <FontAwesomeIcon icon={faBriefcase} />
              </span>
              <span className="fct mgl10">
                {'Grooming Scope'}
              </span>
            </Col>
            <Col lg={{ size: 1 }} md={{ size: 3 }} xs={{ size: 2 }}>
              <div className="ft25 fca fwn groomingInfo-info-edit">
                { Edit
                  ? (
                    <span className={classNames({ 'error-disable': this.getErrorStatus() })}>
                      <span className="close-icon" title="Cancel Details">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.handleClose()} />
                      </span>
                      <span className={classNames('save-icon', { 'error-disable': this.getErrorStatus() })} title="Save Details">
                        <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.handleSave('saveInfo')} />
                      </span>
                    </span>
                  ) : (
                    <span className="fcr" title="Edit Details">
                      <FontAwesomeIcon className="cur-pointer" icon={faPen} onClick={() => this.handleEdit()} />
                    </span>
                  )
                }
              </div>
            </Col>
            <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 12 }}>
              {isUpdating &&
                (
                  <div style={{ margin: 5 }}>
                    <Progress animated color="success" value={40}>
                      {'Updating in Progress'}
                    </Progress>
                  </div>
                )}
              <Message
                handleMessageDismiss={() => this.handleMessageDismiss()}
                isMessageShow={isUpdateMessage}
                message={message}
                color={color}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Types of jobs you are interested in'}
              </h6>
              <h6 className="fcash">
                {Edit ? <input type="text" value={jobs_interested} onChange={event => this.handleGroomInfo(event.target.value, 'jobs_interested')} /> : jobs_interested || '--' }
                {Edit && !jobs_interested && <p className="form-errors">{ERRORMSG.JOB_INTERESTED}</p>}
              </h6>
            </Col>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Employment types looking for'}
              </h6>
              <h6 className="fcash">
                {Edit ? <input type="text" value={employment_type} onChange={event => this.handleGroomInfo(event.target.value, 'employment_type')} /> : employment_type || '--' }
                {Edit && !employment_type && <p className="form-errors">{ERRORMSG.EMPLOYEEMENT_TYPE}</p>}
              </h6>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Current Location'}
              </h6>
              <h6 className="fcash">
                {Edit ? <input type="text" value={current_city} onChange={event => this.handleGroomInfo(event.target.value, 'current_city')} /> : current_city || '--' }
                {Edit && !current_city && <p className="form-errors">{ERRORMSG.CURRENT_LOCATION}</p>}
              </h6>
            </Col>
            <Col lg={{ size: 4 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Current Country'}
              </h6>
              <h6 className="fcash w-inherit">
                {Edit
                  ? (
                    <NewCountryDropDown
                      onSelectCountry={countryObj => this.handleGroomInfo(countryObj, 'current_country_name', 'countryDropDown', 'current_country')}
                      selectedCountryObj={selectedCurrentCountryObj}
                    />
                  )
                  : current_country_name || '--' }
              </h6>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Preferred Location'}
              </h6>
              <h6 className="fcash">
                {Edit ? <input type="text" value={preferred_city} onChange={event => this.handleGroomInfo(event.target.value, 'preferred_city')} /> : preferred_city || '--' }
                {(Edit && realocate && !preferred_city) ? <p className="form-errors">{ERRORMSG.PREFFERED_LOCATION}</p> : ''}
              </h6>
            </Col>
            <Col lg={{ size: 4 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Preferred Country'}
              </h6>
              <h6 className="fcash w-inherit">
                {Edit
                  ? (
                    <NewCountryDropDown
                      onSelectCountry={selectedCountryObj => this.handleGroomInfo(selectedCountryObj, 'preferred_country_name', 'countryDropDown', 'preferred_country')}
                      selectedCountryObj={selectedPrefferedCountryObj}
                    />
                  )
                  : preferred_country_name || '--' }
              </h6>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Current/Last drawn CTC'}
              </h6>
              <h6 className="fcash">
                {Edit ? <input type="number" value={current_ctc} onChange={event => this.handleGroomInfo(event.target.value, 'current_ctc')} /> : current_ctc || '--' }
                {Edit && !current_ctc && <p className="form-errors">{ERRORMSG.CURRENT_CTC}</p>}
              </h6>
            </Col>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Relocate'}
              </h6>
              {Edit ? (
                <select className="period-dropdown" onChange={event => this.handleGroomInfo(event.target.value, 'realocate')} disabled={Edit !== true}>
                  <option selected={realocate === 1} value="YES">yes</option>
                  <option selected={realocate === 0} value="NO">no</option>
                </select>
              )
                : (
                  <h6 className="fcash">
                    {realocate ? 'Yes' : 'No'}
                  </h6>
                )
              }
              {/* {!realocate && <p className="form-errors">{ERRORMSG.RELOCATION}</p>} */}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateGroomingDetails: (payload, cb) => {
    dispatch(updateGroomingAction(payload, cb));
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails
});

GroomingInfo.propTypes = {
  updateGroomingDetails: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GroomingInfo);
