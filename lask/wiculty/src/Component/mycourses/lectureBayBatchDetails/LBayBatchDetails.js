import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { handleIntervalFormat, getOrdinal } from '../../common/utilFunctions/utilFunction';
import './LBayBatchDetails.scss';

function LectureBayBatchDetails ({ LBayBatchDetails, slug, handleLMSView }) {
  return (
    <div className="lecture-bay-batch-details">
      <Row>
        <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <h4 className="text-center mb-3" style={{ color: '#005aff' }}>
            {'Select your batch from here | Get started !!'}
          </h4>
        </Col>
      </Row>
      {LBayBatchDetails.length > 0 && LBayBatchDetails.map(batchItem => (
        <Row className="tac LBay-batch-container align-items-center">
          <Col lg={{ size: 2 }} md={{ size: 3 }} xs={{ size: 4 }}>
            {`${handleIntervalFormat(batchItem.start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(batchItem.start_date, 'DD')))} ${handleIntervalFormat(batchItem.start_date, 'MMM')}`}
          </Col>
          <Col className="pr-0" lg={{ size: 3 }} md={{ size: 3 }} xs={{ size: 3 }}>
            {batchItem.batch_type === 'Weekdays'
              ? (
                <p className="mb-0">
                  <span style={{ color: '#267a2e' }}>
                    {'Mon - Fri'}
                  </span>
                  <span className="ft16 pdl10">
                    {'(WeekDay)'}
                  </span>
                </p>
              )
              : (
                <p className="mb-0">
                  <span style={{ color: '#0b5386' }}>
                    {'Sat - Sun'}
                  </span>
                  <span className="ft16 pdl10">
                    {'(WeekEnd)'}
                  </span>
                </p>
              )}
          </Col>
          <Col lg={{ size: 4 }} md={{ size: 3 }} xs={{ size: 6 }}>
            {`${handleIntervalFormat(batchItem.start_date, 'hh:mma')} - ${handleIntervalFormat(batchItem.end_date, 'hh:mma')} (IST)`}
          </Col>
          <Col lg={{ size: 2 }} md={{ size: 3 }} xs={{ size: 5 }}>
            <button type="button" className="btn btn-theme-bordered btn-md" onClick={() => handleLMSView(batchItem.course_id, slug, batchItem.id)}>
              {'Select Now'}
            </button>
          </Col>
        </Row>
      ))}
    </div>
  )
}

LectureBayBatchDetails.propTypes = {
  LBayBatchDetails: PropTypes.isRequired,
  slug: PropTypes.isRequired,
  handleLMSView: PropTypes.func.isRequired
}

export default LectureBayBatchDetails;
