import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Modal
} from 'reactstrap'
import ProfileInfo from './profileInfo'
import ProfessionalInfo from './professionalInfo';
import GroomingInfo from './groomingInfo';
import OtherInfo from './otherInfo';
import sf from '../common/safeTraverse';
import { upload, validateFile } from '../common/utilFunctions/utilFunction';
import updateProfileAction from './Actions/updateProfileAction';
import profileAction from './profileAction';
import ChangePassword from '../common/changePassword';
import { MESSAGES } from '../locales/locale';
import messageFn from '../common/message'

import './profile.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES;

class ProfileContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      profileDetails: {},
      userInfo: {},
      isLoading: true,
      modal: false,
      profileEdit: false,
      isUserUpdated: false,
      isUpdating: false,
      progressMsg: ''
    };
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { profileDetails, isLoading } = props || {}
    const { isUserUpdated } = state;
    const profileData = sf(profileDetails, ['data', 'data']) || {};
    const userInfo = sf(profileData, ['user']) || {};
    const professionalInfo = sf(profileData, ['professional']) || {};
    const { present_joblevel, experience } = professionalInfo;
    const userDetails = { ...userInfo, present_joblevel, experience }
    if ((Object.keys(profileData).length > 0) && !isUserUpdated) {
      return {
        profileDetails: profileData,
        isLoading,
        userInfo: userDetails
      }
    }
    return null
  }

  componentDidMount () {
    const { getProfileDetails } = this.props;
    getProfileDetails({}, (resp) => {
      this.setState({
        isLoading: false
      })
    })
  }

  componentWillUnmount () {
    window.localStorage.clear()
  }

  getErrorStatus () {
    const {
      userInfo: {
        first_name, present_joblevel,
        experience, last_name
      }
    } = this.state;
    return (first_name && present_joblevel && experience && last_name)
  }

  handleClose () {
    this.setState({
      modal: false
    });
  }

  handleUpdateProfile (userInfoObj = {}, msg) {
    const { updateProfileDetails, getProfileDetails } = this.props;
    updateProfileDetails(userInfoObj, (response) => {
      const { data = {}, status } = response || {};
      if (status === 200) {
        getProfileDetails({}, () => { })
        messageFn(msg, SUCCESS)
        this.setState({
          isLoading: false,
          isUpdating: false,
          profileEdit: false,
          progressMsg: ''
        })
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, ERROR)
        this.setState({
          profileEdit: false,
          isUpdating: false,
          progressMsg: ''
        })
      }
    })
  }

  handleProfileUpload (e) {
    this.setState({
      isLoading: true,
      isUpdating: true,
      progressMsg: 'Uploading in Progress'
    })
    const res = validateFile(e, ['png', 'jpg', 'jpeg'], 10);
    if (res.success) {
      upload(e, 'profileImage', 'users')
        .then((resp) => {
          if (resp.result.status === 204) {
            this.handleUpdateProfile({ profile_image: resp.key }, 'Profile pic uploaded successfully');
          } else {
            messageFn(GENERIC_ERR, ERROR)
            this.setState({
              isLoading: false,
              isUpdating: false,
              progressMsg: '',
              profileEdit: false
            })
          }
        })
        .catch(err => err)
    } else {
      const { message = GENERIC_ERR } = res;
      messageFn(message, ERROR)
      this.setState({
        isLoading: false,
        isUpdating: false,
        progressMsg: '',
        profileEdit: true
      })
    }
  }

  handleProfileSave () {
    const { userInfo } = this.state;
    const userInfoObj = {
      ...userInfo,
      'mobile_code': 91
    }
    this.setState({
      isUpdating: true,
      progressMsg: 'Updating in Progress'
    })
    this.handleUpdateProfile(userInfoObj, 'User details updated successFully');
  }

  handleProfileCancel () {
    this.setState({
      profileEdit: false
    })
  }

  handleUserInfo (event, key) {
    const { userInfo } = this.state;
    const userInfoObj = { ...userInfo, [key]: event.target.value }
    this.setState({
      userInfo: userInfoObj,
      isUserUpdated: true
    })
  }

  handleChangePassword () {
    this.setState({
      modal: true
    })
  }

  handleSuggestClose () {
    this.setState({
      modal: false
    });
  }

  handleProfileEdit () {
    this.setState({
      profileEdit: true
    })
  }

  render () {
    const {
      profileDetails = {}, isLoading,
      modal, profileEdit, userInfo, isUpdating, progressMsg
    } = this.state;
    return (
      <React.Fragment>
        <div className="profile-summary-container">
          {isLoading && <div className="loading" />}
          <div className="profile-Summary-body">
            <ProfileInfo
              profileDetails={profileDetails || []}
              userInfo={userInfo}
              profileUpload={e => this.handleProfileUpload(e)}
              isUpdating={isUpdating}
              progressMsg={progressMsg}
              handleMessageDismiss={() => this.handleMessageDismiss()}
              handleProfileEdit={e => this.handleProfileEdit(e)}
              profileEdit={profileEdit}
              handleUserInfo={(event, key) => this.handleUserInfo(event, key)}
              handleProfileSave={() => this.handleProfileSave()}
              handleProfileCancel={() => this.handleProfileCancel()}
              getErrorStatus={() => this.getErrorStatus()}
              handleChangePassword={() => this.handleChangePassword()}
            />
            <ProfessionalInfo profileDetails={profileDetails.professional || {}} />
            <GroomingInfo profileDetails={profileDetails.career || {}} />
            <OtherInfo profileDetails={profileDetails} />
          </div>
        </div>

        <Modal
          isOpen={modal}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          {modal && <ChangePassword handleClose={() => this.handleClose()} />}
        </Modal>
      </React.Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  updateProfileDetails: (payload, cb) => {
    dispatch(updateProfileAction(payload, cb));
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  profileDetails: state.profileDetails
});

ProfileContainer.propTypes = {
  updateProfileDetails: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
