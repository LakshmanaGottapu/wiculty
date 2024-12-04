import React from 'react';
import PropTypes from 'prop-types';
import FeedBackIcons from './feedBackIcons';
import { classFeedBackJSON, courseFeedBackJSON } from '../../staticJson';

import './feedBackForm.scss';

const FeedBackForm = ({
  handleFeedBack, feedBackObj = {}, handleSubmitFeedBack, feedBackError, type
}) => {
  const feedBackType = {
    classFeedBackJSON,
    courseFeedBackJSON
  }
  return (
    <>
      <hr className="mt-2" />
      <div className="course-feedback-container container">
        <h5 className="mb-4">
          <span className="d-inline-block">
            {'Share your course feedback with us'}
          </span>
          {' | '}
          <span className="d-inline-block">
            {'Equip us to nuture at fast pace'}
          </span>
        </h5>
        {feedBackType[`${type}FeedBackJSON`].map(FeedbackTitle => (
          <FeedBackIcons
            handleFeedBack={
              (feedBackValue, feedBackField) => handleFeedBack(feedBackValue, feedBackField)
            }
            feedBackObj={feedBackObj}
            FeedbackTitle={FeedbackTitle}
          />
        ))}
        <div className="feedback-comments">
          <p>
            {'Tell something about your experience & suggetions to serve you better'}
          </p>
          <textarea
            name="body"
            onChange={e => handleFeedBack(e.target.value, 'feedback')}
            value={feedBackObj.feedback || ''}
          />
          <div className="mt-2">
            <button type="button" className="btn btn-theme-bordered btn-md" onClick={() => handleSubmitFeedBack()}>
              {'submit'}
            </button>
          </div>
          {feedBackError && <p className="feedback-error">* Please provide Course and Instructor rating</p>}
        </div>
      </div>
    </>
  )
}

FeedBackForm.propTypes = {
  handleFeedBack: PropTypes.func.isRequired,
  handleSubmitFeedBack: PropTypes.func.isRequired,
  feedBackObj: PropTypes.shape({}).isRequired,
  feedBackError: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
}

export default FeedBackForm;
