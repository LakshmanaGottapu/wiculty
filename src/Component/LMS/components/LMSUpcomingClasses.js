/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Alert,
  Table
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import { getOrdinal, handleIntervalFormat } from '../../common/utilFunctions/utilFunction';
import sf from '../../common/safeTraverse';
import upcomingClassesAction from '../upcomingClassesAction';

const LMSUpcomingClasses = ({
  data,
  UserPrefInfo,
  globalDetails,
  getUpcomingClasses,
  classfeedBackPopUp
}) => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const { time_zone_label = 'IST', country_name, country } = UserPrefInfo;

  useEffect(() => {
    const { courseBatchId } = globalDetails;
    getUpcomingClasses({ batch_id: courseBatchId }, (resp) => {
      const upcoming = sf(resp, ['data', 'data']) || {};
      // console.log({ upcoming, courseBatchId });
      setUpcomingClasses(upcoming.classes);
    })
  }, [])
  return (
    <>
      <Col xs={12} className="px-0">
        <Alert color="info m-2">
          <p className="tag mb-1">
            <FontAwesomeIcon
              className="mr-2"
              icon={faInfoCircle}
              alt="selected timezone info"
              title="selected timezone info"
            />
            Preffered time zone:
            <span className="font-weight-bold mx-2">
              {country === 231 ? `${country_name}` : `${country_name} (${time_zone_label})`}
            </span>
          </p>
          <p className="mb-2 text-muted">
          ( Select proper timezone to view accurate class timings )
          </p>
        </Alert>
      </Col>
      <Col lg="12" md="12" sm="12" className="py-2">
        <h5 className="tag">
          Join proceeding classes from here
        </h5>
        {upcomingClasses && (upcomingClasses.length) > 0 ? (
          <div className="p-2">
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {upcomingClasses.map(item => (
                  <tr>
                    <td>
                      <p className="classDate">
                        {`${handleIntervalFormat(item.start_date, 'DD')}${getOrdinal(Number(handleIntervalFormat(item.start_date, 'DD')))} ${handleIntervalFormat(item.start_date, 'MMM')}`}
                      </p>
                    </td>
                    <td>
                      <p className="classTime">
                        {`${handleIntervalFormat(item.start_date, 'hh:mma')} - ${handleIntervalFormat(item.end_date, 'hh:mma')}`}
                      </p>
                    </td>
                    <td>
                      {item.join_url && (
                        <>
                          <div
                            role="button"
                            tabIndex={0}
                            onKeyPress={() => {}}
                            className="btn btn-outline-primary"
                            onClick={event => classfeedBackPopUp(event)}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={faArrowRight}
                              alt="selected timezone info"
                              title="selected timezone info"
                            />
                            {'Join Now'}
                          </div>
                          <a href={item.join_url} className="join-link" rel="noopener noreferrer" target="_blank" /> {/* eslint-disable-line */}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Row>
            <Col lg="12" className="noResultsBlock">
              <p>No upcoming classes</p>
            </Col>
          </Row>
        )}
      </Col>
    </>
  )
};

LMSUpcomingClasses.propTypes = {
  data: PropTypes.shape({}).isRequired,
  globalDetails: PropTypes.shape({}).isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  upcomingClasses: PropTypes.shape({}).isRequired,
  getUpcomingClasses: PropTypes.func.isRequired,
  classfeedBackPopUp: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  getUpcomingClasses: (payload, cb) => {
    dispatch(upcomingClassesAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  getUpcomingClasses: PropTypes.func.isRequired,
  UserPrefInfo: state.UserPrefInfo
});

export default connect(mapStateToProps, mapDispatchToProps)(LMSUpcomingClasses);
