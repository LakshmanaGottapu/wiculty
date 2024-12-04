import React, { Fragment } from 'react';
import {
  Modal, ModalHeader, ModalBody
} from 'reactstrap';
import PropTypes from 'prop-types';
import FeedBackForm from '../../common/feedBackForm/feedbackForm';

function ClassFeedBackModal ({
  Close, handleSubmitFeedBack,
  isModalOpen, feedBackError, classTime,
  class_id, handleFeedBack, feedBackObj, batchDate
}) {
  return (
    <Fragment>
      <Modal
        style={{ top: 100, width: '100%' }}
        isOpen={isModalOpen}
        className="class-feedback"
      >
        <ModalHeader toggle={() => Close()}>
          <div className="project-modal">
            <h3 className="class-feedback-title">
              {'Class FeedBack'}
              <span id="class-date">
                {batchDate}
              </span>
            </h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <FeedBackForm
            handleFeedBack={
              (feedBackValue, feedBackField) => handleFeedBack(feedBackValue,
                feedBackField, classTime, class_id)
            }
            feedBackObj={feedBackObj}
            type="class"
            feedBackError={feedBackError}
            handleSubmitFeedBack={() => handleSubmitFeedBack(classTime)}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

ClassFeedBackModal.propTypes = {
  handleSubmitFeedBack: PropTypes.func.isRequired,
  handleFeedBack: PropTypes.func.isRequired,
  feedBackObj: PropTypes.shape({}).isRequired,
  feedBackError: PropTypes.bool.isRequired,
  Close: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  classTime: PropTypes.string,
  class_id: PropTypes.string,
  batchDate: PropTypes.string
}

ClassFeedBackModal.defaultProps = {
  batchDate: '',
  class_id: '',
  classTime: ''
}

export default ClassFeedBackModal;
