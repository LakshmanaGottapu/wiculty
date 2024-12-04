import React from 'react'
import { Row, Col, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import profileImg from '../../img/profile.svg';
import editProfile from '../../img/editPencil.svg';
import { ERRORMSG } from '../locales/locale';
import { getBannerMarginTop } from '../common/utilFunctions/utilFunction';

const ProfileInfo = ({
  userInfo, profileUpload,
  handleProfileEdit, profileEdit,
  handleUserInfo, handleProfileSave, getErrorStatus, handleChangePassword, isUpdating, progressMsg,
  handleProfileCancel
}) => {
  const {
    first_name, email, contact_no,
    present_joblevel, experience,
    profile_image, last_name
  } = userInfo || {};

  return (
    <Row className="profile-info-container profile-space" style={{ marginTop: getBannerMarginTop(170, -93) }}>
      <Col className="pd0 info-details" lg={{ size: 8 }} md={{ size: 10 }} xs={{ size: 10 }}>
        <Row className="profile-img-container">
          <Col className="profile-img" lg={{ size: 8 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <div className="image-upload">
              <label htmlFor="profile-pic"> {/*eslint-disable-line */}
                <img src={profile_image || profileImg} alt="profile-pic" />
              </label>
              <input
                id="profile-pic"
                type="file"
                style={{ display: 'none' }}
                onChange={e => profileUpload(e)}
                accept="image/*"
              />
            </div>
          </Col>
          <Col className="change-password" lg={{ size: 3 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <p onClick={() => handleChangePassword()}>Change Password</p> {/* eslint-disable-line */}
          </Col>
        </Row>
        <Row>
          <Col className="profile-pic-message" lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
            {isUpdating &&
              (
                <div style={{ margin: 5, width: 300 }}>
                  <Progress animated color="success" value={40}>
                    {progressMsg}
                  </Progress>
                </div>
              )}
          </Col>
        </Row>
        <Row className="editable-user-field">
          <Col className="profile-details-container" lg={{ size: 6 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <p>
              <span className="userinfo-edit">
                {profileEdit
                  ? (
                    <span className={classNames({ 'error-disable': !getErrorStatus() })}>
                      <span className={classNames('save-icon', { 'error-disable': !getErrorStatus() })} title="Save Details">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          onClick={() => handleProfileSave()}
                        />
                      </span>
                      <span title="Cancel Details" className="cancel-icon">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          onClick={() => handleProfileCancel()}
                        />
                      </span>
                    </span>
                  ) : (
                    <span className="fcr" title="Edit Details" onClick={e => handleProfileEdit(e)}>   {/* eslint-disable-line */}
                      <img src={editProfile} alt="profile edit" />
                    </span>
                  )
                }
              </span>
            </p>
            <h4 className="fct">
              {profileEdit ? <input type="text" placeholder="Enter Full Name" value={first_name} onChange={event => handleUserInfo(event, 'first_name')} /> : first_name || 'First Name'}

              {profileEdit && !first_name && <p className="profile-form-errors">{ERRORMSG.FIRST_NAME}</p>}
            </h4>
          </Col>
        </Row>
        <Row className="editable-user-field">
          <Col className="profile-tech-container" lg={{ size: 6 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <h4 className="mt-3">
              {profileEdit ? <input type="text" placeholder="Enter Last Name" value={last_name} onChange={event => handleUserInfo(event, 'last_name')} /> : last_name || 'Last Name'}
              {profileEdit && !last_name && <p className="profile-form-errors">{ERRORMSG.LAST_NAME}</p>}
            </h4>
            <h5>
              {email || 'Email ID'}
            </h5>
            <h5>
              {contact_no || 'Mobile Number'}
            </h5>
            <h6 className="hr-line">
              <hr />
            </h6>
            <h6 className="fcash">
              {profileEdit ? <input type="text" placeholder="Enter Job Level" value={present_joblevel} onChange={event => handleUserInfo(event, 'present_joblevel')} /> : present_joblevel || 'Job Level'}
              {profileEdit && !present_joblevel && <p className="profile-form-errors">{ERRORMSG.JOB_LEVEL}</p>}
            </h6>
            <h6 className="fcash">
              {profileEdit ? <input type="text" placeholder="Enter Experience" value={experience} onChange={event => handleUserInfo(event, 'experience')} /> : experience || 'Experience'}
              {profileEdit && !experience && <p className="profile-form-errors">{ERRORMSG.EXPERIENCE}</p>}
            </h6>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
ProfileInfo.propTypes = {
  userInfo: PropTypes.isRequired,
  progressMsg: PropTypes.isRequired,
  isUpdating: PropTypes.isRequired,
  profileUpload: PropTypes.func.isRequired,
  handleProfileEdit: PropTypes.func.isRequired,
  profileEdit: PropTypes.isRequired,
  handleUserInfo: PropTypes.func.isRequired,
  handleProfileSave: PropTypes.func.isRequired,
  getErrorStatus: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleProfileCancel: PropTypes.func.isRequired
};

export default ProfileInfo;
