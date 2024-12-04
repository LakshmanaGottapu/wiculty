import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

const Toaster = ({ msg, color, id }) => {
  const [isOpen, setToaster] = useState(true);

  useEffect(() => {
    setToaster(1);
  }, [id])

  const handleClose = () => {
    setToaster(false);
  }

  setTimeout(() => {
    handleClose()
  }, 5000)

  return (
    <>
      <div
        className="toast"
        style={{
          backgroundColor: color,
          opacity: isOpen ? 1 : 0,
          display: isOpen ? 'block' : 'none'
        }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header text-white py-2 px-4" style={{ backgroundColor: color }}>
          <p className="mr-auto mb-0">{msg}</p>
          <button
            type="button"
            onClick={() => handleClose()}
            className="ml-2 mb-1 close"
            data-dismiss="toast"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </>
  )
}

Toaster.propTypes = {
  msg: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
export default Toaster;
