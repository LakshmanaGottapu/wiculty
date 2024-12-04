import React, { Component } from 'react'
import { Row, Col, Progress } from 'reactstrap';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen, faGraduationCap, faPlusCircle, faCheckCircle, faCertificate
} from '@fortawesome/free-solid-svg-icons';
import EducationInfo from './educationalInfo'
import CertificationInfo from './certificationInfo'
import sf from '../common/safeTraverse';
import { validateDateSelection } from '../common/utilFunctions/utilFunction';
import updateQualificationAction from './Actions/updateQualificationAction';
import Message from '../common/messageSection';
import { MESSAGES } from '../locales/locale';
import profileAction from './profileAction';

const { ERROR: { GENERIC_ERR } } = MESSAGES;

class OtherInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isUpdate: false,
      Edit: { education: false, certification: false },
      educationInfo: [],
      certificationInfo: [],
      isUpdateMessage: false,
      message: '',
      color: '',
      isUpdating: false
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { profileDetails } = props || {}
    const { isUpdate } = state;
    const educationInfo = sf(profileDetails, ['data', 'data', 'qualifications']) ? profileDetails.data.data.qualifications : [];
    const certificationInfo = sf(profileDetails, ['data', 'data', 'certifications']) ? profileDetails.data.data.certifications : [];
    if (profileDetails && !isUpdate) {
      return {
        educationInfo,
        orgEducationInfo: educationInfo,
        certificationInfo,
        orgCertificationInfo: certificationInfo
      }
    }
    return null
  }

  getErrorStatus (type) {
    const { educationInfo = [], certificationInfo = [] } = this.state;
    let errorsData;
    if (type === 'education') {
      errorsData = educationInfo
    } else if (type === 'certification') {
      errorsData = certificationInfo
    }
    function getFlag (value) {
      return !value
    }

    function validateData (item) {
      const {
        from_month, from_year, to_month, to_year,
        degree_course_certification, institute_college
      } = item;
      return (getFlag(from_month) || getFlag(from_year) ||
      getFlag(to_month) || getFlag(to_year) ||
      getFlag(degree_course_certification) || getFlag(institute_college) ||
       validateDateSelection(from_month, from_year, to_month, to_year));
    }
    const filteredData = errorsData.find(validateData) ? errorsData.find(validateData) : {};
    return Object.keys(filteredData).length > 0 ? true : false; //eslint-disable-line
  }

  handleEducationDataChange (value, key, item) {
    const { educationInfo } = this.state;
    const foundIndex = educationInfo.findIndex(obj => obj.uniqueIndex === item.uniqueIndex);
    educationInfo[foundIndex] = { ...item, [key]: value, qualification_type: 1 };
    this.setState(state => ({
      educationInfo,
      isUpdate: { ...state.isUpdate, 'education': true }
    }))
  }

  handleCertifcateDataChange (value, key, item) {
    const { certificationInfo } = this.state;
    const foundIndex = certificationInfo.findIndex(obj => obj.uniqueIndex === item.uniqueIndex);
    certificationInfo[foundIndex] = { ...item, [key]: value, qualification_type: 2 };
    this.setState(state => ({
      certificationInfo,
      isUpdate: { ...state.isUpdate, 'certification': true }
    }))
  }

  handleEdit (type) {
    const { Edit } = this.state;
    const editObj = { ...Edit, [type]: true }
    this.setState({
      Edit: editObj
    })
  }

  handleSave (type) {
    const { Edit, educationInfo, certificationInfo } = this.state;
    const { updateQualificationDetails, getProfileDetails } = this.props;
    const editObj = { ...Edit, [type]: false };
    let qualification;
    this.setState({
      isUpdating: true
    })
    if (type === 'education') {
      qualification = educationInfo
      updateQualificationDetails({ qualification }, (resp) => {
        if (resp.status === 200) {
          getProfileDetails({}, (response) => {})
          this.setState({
            isUpdateMessage: true,
            message: 'Education info Updated successfully !',
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
    } else if (type === 'certification') {
      qualification = certificationInfo
      updateQualificationDetails({ qualification }, (resp) => {
        if (resp.status === 200) {
          getProfileDetails({}, (response) => {})
          this.setState({
            isUpdateMessage: true,
            message: 'Certification info Updated successfully !',
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

    this.setState({
      Edit: editObj
    })
  }

  handleCancel (item, type) {
    const {
      educationInfo, certificationInfo
    } = this.state;
    if (type === 'education') {
      const foundIndex = educationInfo.findIndex(obj => obj.uniqueIndex === item.uniqueIndex);
      educationInfo.splice(foundIndex, 1);
    } else if (type === 'certification') {
      const foundIndex = certificationInfo.findIndex(obj => obj.uniqueIndex === item.uniqueIndex);
      certificationInfo.splice(foundIndex, 1);
    }
    this.setState(state => ({
      educationInfo,
      certificationInfo,
      isUpdate: true
    }))
  }

  handleNewField (type) {
    const {
      educationInfo, certificationInfo, Edit
    } = this.state;
    if (type === 'education') {
      educationInfo.push({ uniqueIndex: uuid.v4() })
    } else if (type === 'certification') {
      certificationInfo.push({ uniqueIndex: uuid.v4() });
    }
    const editObj = { ...Edit, [type]: true }
    this.setState(state => ({
      educationInfo,
      certificationInfo,
      Edit: editObj
    }))
  }

  highestDegree (data, uniqueIndex) { //eslint-disable-line
    return data.map((field) => {
      if (field.uniqueIndex === uniqueIndex) {
        field.highest_qualification = 1;
        return field
      }
      field.highest_qualification = 0;
      return field;
    })
  }

  handleHighestDegree (uniqueIndex, type) {
    const {
      educationInfo, certificationInfo
    } = this.state;
    let certificateArr;
    let educationArr;

    if (type === 'education') {
      educationArr = this.highestDegree(educationInfo, uniqueIndex);
      certificateArr = certificationInfo;
    } else if (type === 'certification') {
      certificateArr = this.highestDegree(certificationInfo, uniqueIndex);
      educationArr = educationInfo;
    }
    this.setState(state => ({
      educationInfo: educationArr,
      certificationInfo: certificateArr
    }))
  }

  handleMessageDismiss () {
    this.setState({
      isUpdateMessage: false
    })
  }

  render () {
    const {
      Edit, isUpdate, educationInfo = [],
      certificationInfo = [], isUpdateMessage, message, color, isUpdating
    } = this.state;
    return (
      <Row className="other-info-container">
        <Col className="info-details" lg={{ size: 8 }} md={{ size: 10 }} xs={{ size: 10 }}>
          <Row>
            <Col className="ft25 fca fwn other-info-text" lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <span className="fcr">
                <FontAwesomeIcon icon={faGraduationCap} />
              </span>
              <span className="fct mgl10">
                {'Other Details'}
              </span>
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
          <div className="education-info">
            <Row>
              <Col lg={{ size: 7 }} md={{ size: 7 }} xs={{ size: 10 }}>
                <span className="fcr">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </span>
                <span className="fct mgl10">
                  {'Educational Details (Optional)'}
                </span>
              </Col>
              <Col lg={{ size: 4 }} md={{ size: 4 }} xs={{ size: 2 }}>
                <div className={classNames('fca fwn education-info-edit', { 'error-disable': this.getErrorStatus('education') })}>
                  { Edit.education && educationInfo.length > 0
                    ? (
                      <span className={classNames('save-icon', { 'error-disable': this.getErrorStatus('education') })} title="Save All Education Details">
                        <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.handleSave('education')} />
                      </span>
                    ) : (
                      educationInfo.length > 0 && (
                        <span className="fcr" title="Edit Details">
                          <FontAwesomeIcon className="cur-pointer" icon={faPen} onClick={() => this.handleEdit('education')} />
                        </span>
                      )
                    )
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <EducationInfo
                  Edit={Edit.education}
                  isUpdate={isUpdate.education}
                  educationInfo={educationInfo}
                  handleEducationDataChange={(value,
                    key, item) => this.handleEducationDataChange(value, key, item)}
                  handleCancel={(item, type) => this.handleCancel(item, type)}
                  handleHighestDegree={(item, type) => this.handleHighestDegree(item, type)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <button type="button" className="add-details" onClick={() => this.handleNewField('education')}>
                  <span className="fcw mgr15">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </span>
                  <span>
                    {'Add Details'}
                  </span>
                </button>
              </Col>
            </Row>
          </div>
          <div className="certification-info">
            <Row>
              <Col lg={{ size: 7 }} md={{ size: 7 }} xs={{ size: 10 }}>
                <span className="fcr">
                  <FontAwesomeIcon icon={faCertificate} className="wic-color" />
                </span>
                <span className="fct mgl10">
                  {'Certification Details (Optional)'}
                </span>
              </Col>
              <Col lg={{ size: 4 }} md={{ size: 4 }} xs={{ size: 2 }}>
                <div className={classNames('fca fwn certification-info-edit', { 'error-disable': this.getErrorStatus('certification') })}>
                  { Edit.certification && certificationInfo.length > 0
                    ? (
                      <span className={classNames('save-icon', { 'error-disable': this.getErrorStatus('certification') })} title="Save All Certification Details">
                        <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.handleSave('certification')} />
                      </span>
                    ) : (
                      certificationInfo.length > 0 && (
                        <span className="fcr" title="Edit Details">
                          <FontAwesomeIcon className="cur-pointer" icon={faPen} onClick={() => this.handleEdit('certification')} />
                        </span>
                      )
                    )
                  }
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <CertificationInfo
                  Edit={Edit.certification}
                  isUpdate={isUpdate.education}
                  certificationInfo={certificationInfo}
                  handleCertifcateDataChange={(value,
                    key, item) => this.handleCertifcateDataChange(value, key, item)}
                  handleCancel={(item, type) => this.handleCancel(item, type)}
                  handleHighestDegree={(item, type) => this.handleHighestDegree(item, type)}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <button type="button" className="add-details" onClick={() => this.handleNewField('certification')}>
                  <span className="fcw mgr15">
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </span>
                  <span>
                    {'Add Details'}
                  </span>
                </button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateQualificationDetails: (payload, cb) => {
    dispatch(updateQualificationAction(payload, cb));
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails
});

OtherInfo.propTypes = {
  updateQualificationDetails: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherInfo);
