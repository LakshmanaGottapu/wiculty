import React, { useState } from 'react'
import {
  Modal
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';

import RequestBatchForm from './requestBatchForm';
import { getCountryVals } from '../../common/utilFunctions/utilFunction';

// Actions
import requestBatchAction from './requestBatchAction';

import messageFn from '../../common/message'
import './requestBatch.scss';

import { MESSAGES, ERRORMSG } from '../../locales/locale'

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES

const RequestBatch = ({ sendBatchRequest, UserPrefInfo, courseID }) => {
  const [isModalOpen, setModalFlag] = useState(false);

  const handleClose = () => {
    setModalFlag(false);
  }
  const handleSubmit = (event, values) => {
    const { phone_code } = getCountryVals(UserPrefInfo)
    const todaysDate = new Date();
    const requestedDate = new Date(values.batch_request_date);

    if (requestedDate > todaysDate) {
      sendBatchRequest({
        ...values,
        course_id: courseID,
        mobile_code: phone_code
      }, (resp) => {
        const { data = {} } = resp || {};
        if (data && data.status === 200) {
          setModalFlag(false);
          messageFn(data.data, SUCCESS)
        } else {
          const { message = GENERIC_ERR } = data || {}
          messageFn(message, ERROR)
        }
      })
    } else {
      messageFn(ERRORMSG.REQUEST_BATCH_MSG, ERROR)
    }
  }

  const handleModal = () => {
    setModalFlag(true);
  }

  const handleCountryChange = () => { };
  return (
    <div className="w-100">
      <div className="w-100 d-block d-md-flex justify-content-end">
        <strong className="d-flex">
          <FontAwesomeIcon className="text-info mr-2 h1" icon={faCalendarAlt} alt="calendar" />
          Can’t find a batch you were looking for?
        </strong>
        <button
          type="button"
          className="btn btn-sm btn-primary m-2 my-md-0"
          onClick={handleModal}
        >
                REQUEST A BATCH
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        toggle="true"
        className="modal-dialog-centered request-batch"
        data-backdrop="static"
        id="request-batch"
      >
        <RequestBatchForm
          handleClose={() => handleClose()}
          handleSubmit={handleSubmit}
          handleCountryChange={handleCountryChange}
        />
      </Modal>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  sendBatchRequest: (payload, cb) => {
    dispatch(requestBatchAction(payload, cb));
  }
});
const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  batchInfo: state.batchInfo,
  offerInfo: state.offerReducer
});

RequestBatch.propTypes = {
  sendBatchRequest: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  courseID: PropTypes.number.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestBatch);
