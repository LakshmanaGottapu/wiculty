/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Row, Col, Progress,
  FormGroup, Label, Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import TagsInput from 'react-tagsinput'
import '../../../node_modules/react-tagsinput/react-tagsinput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen, faCheckCircle, faTimesCircle, faFilePdf, faUser
} from '@fortawesome/free-solid-svg-icons';
import sf from '../common/safeTraverse';
import { MESSAGES } from '../locales/locale';
import updateProfessionalAction from './Actions/updateProfessionalInfoAction';
import { upload, emptyFile, validateFile } from '../common/utilFunctions/utilFunction';
import Message from '../common/messageSection';
import profileAction from './profileAction';

const { ERROR: { GENERIC_ERR } } = MESSAGES;

class ProfessionalInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      professionalInfo: {},
      Edit: false,
      isUpdate: false,
      isUpdateMessage: false,
      isUploadMessage: false,
      message: '',
      color: '',
      Userskills: [],
      resumeKey: '',
      isUploading: false,
      isUpdating: false,
      showResumeChip: true
    };
    this.handleSkills = this.handleSkills.bind(this);
  }

  static getDerivedStateFromProps (props, state) {
    const { profileDetails } = props || {}
    const { isUpdate } = state;
    const professionalInfo = sf(profileDetails, ['data', 'data', 'professional']) || {};

    if (profileDetails && !isUpdate) {
      return {
        professionalInfo,
        Userskills: professionalInfo.skills || []
      }
    }
    return null
  }

  onResumeUpload (e) {
    this.setState({
      isUploading: true
    })
    const res = validateFile(e, ['pdf', 'doc', 'docx'], 10);
    if (res.success) {
      upload(e, 'profileResume', 'resume')
        .then((resp) => {
          if (resp.result.status === 204) {
            this.setState({
              isUploadMessage: true,
              message: 'Resume uploaded successfully and click save to Update!',
              color: 'success',
              resumeKey: resp.key,
              isUploading: false
            })
          } else {
            this.setState({
              isUploadMessage: true,
              message: GENERIC_ERR,
              color: 'danger',
              resumeKey: '',
              isUploading: false
            })
          }
        })
        .catch(err => err)
    } else {
      this.setState({
        isUploadMessage: true,
        message: res.message || GENERIC_ERR,
        color: 'danger',
        resumeKey: '',
        isUploading: false
      })
    }
  }

  getErrorStatus () {
    const {
      professionalInfo: {
        present_joblevel, industry
      }, Userskills
    } = this.state;
    if (present_joblevel && industry && Userskills.length > 0) {
      return false
    }
    return true
  }

  getSkillList (skills) {
    const { Userskills } = this.state;
    return Userskills.map((skill) => { // eslint-disable-line
      return (
        <span style={{ textTransform: 'capitalize' }}>{`${skill}, `}</span>
      )
    })
  }

  handleEdit () {
    this.setState({
      Edit: true
    })
  }

  handleSave () {
    const { updateProfessionalDetails, getProfileDetails } = this.props;
    const { professionalInfo, Userskills, resumeKey } = this.state;
    const professionalDetails = { ...professionalInfo, 'skills': Userskills, 'resume': resumeKey };
    this.setState({
      isUpdating: true
    })
    updateProfessionalDetails(professionalDetails, (resp) => {
      if (resp.status === 200) {
        emptyFile();
        getProfileDetails({}, () => {})
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

  handlePressInfo (event, key) {
    const { professionalInfo } = this.state;
    const professionalObj = { ...professionalInfo, [key]: event.target.value }

    this.setState({
      professionalInfo: professionalObj,
      isUpdate: true
    })
  }

  handleMessageDismiss () {
    this.setState({
      isUpdateMessage: false
    })
  }

  handleSkills (tags) {
    this.setState({
      Userskills: tags,
      isUpdate: true
    })
  }

  handleUploadMessageDismiss () {
    this.setState({
      isUploadMessage: false
    })
  }

  handleResumeClear () {
    this.setState({
      showResumeChip: false
    })
  }

  render () {
    const {
      professionalInfo: {
        company_name, present_joblevel, industry, resume
      },
      Edit, message, color,
      isUpdateMessage, Userskills, isUploadMessage,
      isUploading, isUpdating, showResumeChip
    } = this.state;
    return (
      <Row className="professional-info-container bgr">
        <Col className="info-details" lg={{ size: 8 }} md={{ size: 10 }} xs={{ size: 10 }}>
          <Row>
            <Col className="ft25 fca fwn professional-info-text" lg={{ size: 6 }} md={{ size: 4 }} xs={{ size: 10 }}>
              <span className="fcr">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <span className="fct ml-2">
                {'Professional Inputs '}
              </span>
            </Col>
            <Col lg={{ size: 1 }} md={{ size: 3 }} xs={{ size: 2 }}>
              <div className="ft25 fca fwn professional-info-edit">
                { Edit
                  ? (
                    <span className={classNames({ 'error-disable': this.getErrorStatus() })}>
                      <span className="close-icon" title="Cancel Details">
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.handleClose()} />
                      </span>
                      <span className={classNames('save-icon', { 'error-disable': this.getErrorStatus() })} title="Save Details">
                        <FontAwesomeIcon icon={faCheckCircle} onClick={() => this.handleSave()} />
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
              <FormGroup>
                <Label for="company-name">Company Name</Label>
                {Edit ? (
                  <Input
                    id="company-name"
                    type="text"
                    placeholder="Company name"
                    value={company_name}
                    onChange={event => this.handlePressInfo(event, 'company_name')}
                  />
                ) : (
                  <p className="text-muted">
                    {company_name || '--'}
                  </p>
                )}
              </FormGroup>
            </Col>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <FormGroup>
                <Label for="current-job">
                Current Job Role
                </Label>
                {Edit ? (
                  <Input
                    id="current-job"
                    type="text"
                    value={present_joblevel}
                    onChange={event => this.handlePressInfo(event, 'present_joblevel')}
                    placeholder="Current job role*"
                    invalid={Edit && !present_joblevel}
                    valid={Edit && present_joblevel}
                  />
                )
                  : (
                    <p className="text-muted">
                      {present_joblevel || '--'}
                    </p>
                  )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <FormGroup>
                <Label for="current-industry">
                  Current Industry
                </Label>
                {Edit ? (
                  <Input
                    id="current-industry"
                    type="text"
                    value={industry}
                    onChange={event => this.handlePressInfo(event, 'industry')}
                    placeholder="Current organization*"
                    invalid={Edit && !industry}
                    valid={Edit && industry}
                  />
                )
                  : (
                    <p className="text-muted">
                      {industry || '--'}
                    </p>
                  )}
              </FormGroup>
            </Col>
            {Edit ? (
              <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
                { showResumeChip && resume ? (
                  <div className="resume-chip">
                  resume
                    <span className="clear-resume-chip" title="Clear resume">
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        onClick={() => this.handleResumeClear()}
                      />
                    </span>
                  </div>
                ) : (
                  <label htmlFor="resume" className="upload-resume c-p">
                    <span>Upload Resume</span>
                    <input
                      id="resume"
                      type="file"
                      name="resume"
                      onChange={e => this.onResumeUpload(e)}
                      accept=".pdf,.doc,.docx"
                      disabled={!Edit}
                    />
                  </label>
                )}
                <span className="file-types text-muted d-block">
                  {'( Accepted formats PDF, DOC & DOCX )'}
                </span>
                {isUploading &&
                (
                  <div style={{ margin: 5 }}>
                    <Progress animated color="success" value={40}>
                      {'Uploading in Progress'}
                    </Progress>
                  </div>
                )}
                <Message
                  handleMessageDismiss={() => this.handleUploadMessageDismiss()}
                  isMessageShow={isUploadMessage}
                  message={message}
                  color={color}
                />
              </Col>
            ) : (
              <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
                <h6>Resume link</h6>
                {resume ? (
                  <div className="resume-link">
                    <FontAwesomeIcon icon={faFilePdf} />
                    <a href={resume} target="_blank" rel="noopener noreferrer">
                      resume.docx
                    </a>
                  </div>
                ) : (
                  <p className="fcash">
                    {'No resume found'}
                  </p>
                )}
              </Col>
            )}
          </Row>
          <Row>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <h6>
                {'Skills'}
              </h6>
              <h6 className="fcash">
                {Edit ? (
                  <TagsInput
                    placeholder="enter skills"
                    value={Userskills}
                    onChange={this.handleSkills}
                    onlyUnique
                    className={(Edit && !Userskills.length) && 'border-err'}
                  />
                )
                  : this.getSkillList()}
              </h6>
              {Edit && (
                <p className="fcash pd10">
                  Note: Type your skills and press &nbsp;
                  <code>Enter</code>
                  &nbsp; or &nbsp;
                  <code>Tab</code>
                </p>
              )}
            </Col>
            <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
              <button type="button" className="btn btn-link">
                <Link to="/topic-categories">Add Topic Preferences</Link>
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  updateProfessionalDetails: (payload, cb) => {
    dispatch(updateProfessionalAction(payload, cb));
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails
});

ProfessionalInfo.propTypes = {
  updateProfessionalDetails: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalInfo);
