import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import LMSAction from '../LMS/LMSAction';
import globalDetails from '../../Actions/globalDataAction';
import { handleIntervalFormat, getOrdinal } from '../common/utilFunctions/utilFunction';
import sf from '../common/safeTraverse';

import '../mycourses/myCourseCard/myCourseCard.scss';

class MyBatchCard extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  getBatchInfo (date) {
    const { courseData = {} } = this.props;
    const courseInfo = sf(courseData, ['batch_details']) || {};
    const { start_date, end_date } = courseInfo;
    const batchDD = handleIntervalFormat(courseInfo[date], 'DD');
    const batchMonth = handleIntervalFormat(courseInfo[date], 'MMM');
    const startTime = handleIntervalFormat(start_date, 'hh:mma');
    const endTime = handleIntervalFormat(end_date, 'hh:mma');
    return (`${batchDD}${getOrdinal(Number(batchDD))} ${batchMonth} ${startTime} - ${endTime}`)
  }

  handleLMSView (courseID, courseSlug, batch_id) {
    const { getLMSDetails, getBatch, history } = this.props;
    // batch_id store in global reducer
    getBatch({ courseBatchId: batch_id }, (resp) => {})

    getLMSDetails({ courseSlug, batch_id }, (resp) => {
      if (resp.status === 200) {
        history.push(`/class-room/${courseSlug}`);
      }
    })
  }

  render () {
    const {
      courseData = {}
    } = this.props;

    const {
      course_id,
      course_title,
      course_slug,
      course_image,
      batch_details = {},
      description
    } = courseData;
    const { start_date, end_date, title } = batch_details;
    return (
      <div className="mycourse-card-container mb-4">
        <div className="mycourse-card-text row px-2 pt-3">
          <div className="col-lg-2 col-md-3 col-4">
            <img src={course_image} alt={course_title} className="img-fluid" />
          </div>
          <div className="col-lg-10 col-md-8 col-8">
            <h5 className="text-capitalize">
              {title}
            </h5>
            <p className="text-black-50 mt-2 d-none d-md-block">
              {description && parse(description)}
            </p>
            <div className="row">
              <div className="col-lg-10 col-md-9 col-xs-12 p-0">
                <h5 className="mb-2 bold text-muted">Batch Information :</h5>
                <Row className="bg-light py-3">
                  <Col lg="6" md="6" sm="12">
                    <p className="mb-1">
                      {'Start Date : '}
                      <strong>
                        {`${handleIntervalFormat(start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(start_date, 'DD')))} ${handleIntervalFormat(start_date, 'MMM')}`}
                      </strong>

                    </p>
                    <p className="mb-1">
                      {'End Date: '}
                      <strong>
                        {`${handleIntervalFormat(end_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(end_date, 'DD')))} ${handleIntervalFormat(end_date, 'MMM')}`}
                      </strong>
                    </p>
                  </Col>
                  <Col>
                    <p className="mb-1">
                      {'Timings: '}
                      <strong>
                        {`${handleIntervalFormat(start_date, 'hh:mma')} - ${handleIntervalFormat(end_date, 'hh:mma')}`}
                      </strong>
                    </p>
                    <p className="mb-1">
                      {'Batch Type : '}
                      <strong>
                        {batch_details.batch_type}
                      </strong>
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center flex-vertical-center w-100 my-2">
          <button type="button" className="btn btn-theme-bordered btn-md" onClick={() => this.handleLMSView(course_id, course_slug, batch_details.id)}>
            {'Bounce to course'}
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLMSDetails: (payload, cb) => {
    dispatch(LMSAction(payload, cb));
  },
  getBatch: (payload, cb) => {
    dispatch(globalDetails(payload, cb));
  }
});

MyBatchCard.propTypes = {
  getLMSDetails: PropTypes.func.isRequired,
  getBatch: PropTypes.func.isRequired,
  courseData: PropTypes.isRequired,
  history: PropTypes.isRequired
}

export default connect(null, mapDispatchToProps)(MyBatchCard);
