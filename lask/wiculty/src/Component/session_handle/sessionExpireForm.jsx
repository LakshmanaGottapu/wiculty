import React, { useState, useEffect } from 'react';
import {
  Button, Modal, ModalHeader,
  ModalBody, ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sessionExpAction from './Actions/sessionExpire';

const SessionExpireForm = ({
  sessionExpireInfo = {}, first_name = 'User',
  handleLogout, callSignIn, renewSessionCancel
}) => {
  const [isSessExpire, setModal] = useState(false);

  const { isSessionExpired } = sessionExpireInfo;

  const toggle = () => {
    setModal(false);
    handleLogout();
    renewSessionCancel();
  }
  const handleLogin = () => {
    callSignIn();
    setModal(false);
    renewSessionCancel();
  }
  useEffect(() => {
    setModal(isSessionExpired)
  }, [isSessionExpired]);

  return (
    <div>
      <Modal
        isOpen={isSessExpire}
        toggle="true"
        className="modal-dialog-centered modal-bg-white"
        data-backdrop="static"
      >
        <ModalHeader className="modal-hd-color text-left" toggle={toggle}>Session Expired!</ModalHeader>
        <ModalBody>
          Hello
          <span className="text-capitalize pl-1 d-inline-block">{first_name}</span>
          <br />
          Please re-login to renew session.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Log Off</Button>
          <Button color="primary" onClick={handleLogin}>Stay Logged In</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
const mapStateToProps = state => ({
  sessionExpireInfo: state.sessionExpireInfo
})
const mapDispatchToProps = dispatch => ({
  renewSessionCancel: (payload, cb) => {
    dispatch(sessionExpAction(payload, cb))
  }
})

SessionExpireForm.propTypes = {
  first_name: PropTypes.string.isRequired,
  sessionExpireInfo: PropTypes.shape({}).isRequired,
  handleLogout: PropTypes.func.isRequired,
  callSignIn: PropTypes.func.isRequired,
  renewSessionCancel: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionExpireForm);
