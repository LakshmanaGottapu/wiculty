import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

const AlertMsg = ({ color, message, id }) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);
  useEffect(() => {
    setVisible(true)
  }, [id])

  return (
    <Alert
      className="my-2"
      color={color}
      isOpen={visible}
      toggle={onDismiss}
    >
      {message}
    </Alert>
  );
}

AlertMsg.propTypes = {
  message: PropTypes.isRequired,
  color: PropTypes.isRequired,
  id: PropTypes.number.isRequired
}

export default AlertMsg;
