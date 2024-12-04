import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';

import requestCertificateAction from '../requestCertAction';

import { IMAGES } from '../../locales/images';
import sf from '../../common/safeTraverse';
import messageFn from '../../common/message'
import { MESSAGES } from '../../locales/locale';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, WARNING }
} = MESSAGES

const LMSCertificate = ({
  globalDetails,
  mycourseDetails,
  requestCertificate
}) => {
  const { courseBatchId } = globalDetails;
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    const courseDetails = sf(mycourseDetails, ['data', 'data', 'courses']) || [];
    // console.log({ mycourseDetails, courseDetails, courseBatchId });
    const index = (courseDetails).findIndex(item => item.batch_id === courseBatchId);
    if (index !== -1) {
      setCertificate((mycourseDetails.data.data.courses)[index].certificate_link);
    }
  }, []);

  function requestCert () {
    requestCertificate({ batchID: courseBatchId }, (resp) => {
      const { data = {}, status } = resp;
      if (data && status === 200) {
        const { message } = data;
        messageFn(message, SUCCESS)
      } else {
        const { message = GENERIC_ERR } = data;
        messageFn(message, WARNING)
      }
    })
  }

  return (
    <>
      <Col lg="12" className="attendanceContainer mt-3">
        <h5 className="batchDetails">
          <strong className="mr-1">
            Preview Certificate
          </strong>
        </h5>
        <Row>
          <Col xs={12}>
            <img src={`${IMAGES.WICULTYCERT}`} alt="preview" className="mb-2" height="250" />
          </Col>
          <Col xs={12}>
            {certificate
              ? <a className="viewDetails mt-2" href={certificate} target="_blank" rel="noopener noreferrer">Download Certificate</a>
              : <Button className="requestCert" color="warning" onClick={() => requestCert()}>Request Certificate</Button>
            }
          </Col>
        </Row>
      </Col>
    </>
  )
};

LMSCertificate.propTypes = {
  globalDetails: PropTypes.shape({}).isRequired,
  attendanceData: PropTypes.shape({}).isRequired,
  upcomingClasses: PropTypes.shape({}).isRequired,
  mycourseDetails: PropTypes.shape({}).isRequired,
  requestCertificate: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  requestCertificate: (payload, cb) => {
    dispatch(requestCertificateAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  UserPrefInfo: state.UserPrefInfo,
  mycourseDetails: state.mycourseDetails,
  attendanceData: state.attendanceReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(LMSCertificate);
