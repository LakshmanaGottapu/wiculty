import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

class Message extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss () {
    const { handleMessageDismiss } = this.props;
    handleMessageDismiss();
  }

  render () {
    const { isMessageShow, color, message } = this.props;
    if (isMessageShow) {
      setTimeout(() => {
        this.onDismiss()
      }, 10000)
    }
    return (
      <Alert color={color} isOpen={isMessageShow} toggle={this.onDismiss}>
        {message}
      </Alert>
    );
  }
}

Message.propTypes = {
  isMessageShow: PropTypes.isRequired,
  message: PropTypes.isRequired,
  color: PropTypes.isRequired,
  handleMessageDismiss: PropTypes.func.isRequired
}

export default Message;
