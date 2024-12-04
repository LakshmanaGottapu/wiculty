import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Table
} from 'reactstrap';
import { connect } from 'react-redux';

import { getOrdinal, handleIntervalFormat } from '../../common/utilFunctions/utilFunction';

const LMSUpcomingClasses = ({
  globalDetails,
  attendance
}) => {
  const { courseBatchId } = globalDetails;

  return (
    <>
      {attendance && attendance.length > 0 ? (
        <Col lg="12" className="attendanceContainer mt-3">
          <h5 className="batchDetails">
            <strong className="mr-1">
              Batch No:
            </strong>
            {courseBatchId}
          </h5>
          <Table striped bordered>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(item => (
                <tr key={item.id}>
                  <td>
                    <p className="classDate">
                      {`${handleIntervalFormat(item.start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(item.start_date, 'DD')))} ${handleIntervalFormat(item.start_date, 'MMM')}`}
                    </p>
                  </td>
                  <td>
                    <p className="classTime">
                      {item.join_time ? `${handleIntervalFormat(item.join_time, 'hh:mma')} - ${handleIntervalFormat(item.leave_time, 'hh:mma')}` : 'No timings'}
                    </p>
                  </td>
                  <td>
                    <p className="mb-0">{(item.attendance === 0) ? 'Absent' : 'Present'}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      ) : (
        <Col className="text-center text-muted mt-4">
          <p>
            No Attendance found
          </p>
        </Col>
      )}
    </>
  )
};

LMSUpcomingClasses.propTypes = {
  data: PropTypes.shape({}).isRequired,
  globalDetails: PropTypes.shape({}).isRequired,
  upcomingClasses: PropTypes.shape({}).isRequired,
  attendance: PropTypes.shape({}).isRequired
}

export const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  UserPrefInfo: state.UserPrefInfo
});

export default connect(mapStateToProps, null)(LMSUpcomingClasses);
