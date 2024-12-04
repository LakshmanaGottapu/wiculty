import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

function FeedBackIcons ({
  handleFeedBack, FeedbackTitle, feedBackObj
}) {
  const rangeVal = feedBackObj[FeedbackTitle.Id] || 6;
  const handleFeedBackVal = (event = {}, ID) => {
    const { target: { value } } = event;
    handleFeedBack(value, ID);
  }
  return (
    <Row className="feedback-container mb-3">
      <Col lg={6} md={6} sm={12}>
        <p>
          {FeedbackTitle.Name}
        </p>
      </Col>
      <Col lg={6} md={6} sm={12} className="feedback-slider">
        <div className="slider_container">
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={rangeVal}
            list="rangeOptions"
            className="slider"
            onChange={event => handleFeedBackVal(event, FeedbackTitle.Id)}
          />
          <datalist id="rangeOptions">
            {[...Array(10)].map((val, index) => (
              <option className="text-muted" value={index + 1} label={index + 1} />
            ))}
          </datalist>
        </div>
      </Col>
    </Row>
  )
}

FeedBackIcons.propTypes = {
  handleFeedBack: PropTypes.func.isRequired,
  FeedbackTitle: PropTypes.isRequired,
  feedBackObj: PropTypes.isRequired
}
export default FeedBackIcons;
