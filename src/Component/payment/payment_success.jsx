import React, { useEffect } from 'react';
import {
  Col, Row, Container, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { IMAGES } from '../locales/images';
import { getBannerMarginTop } from '../common/utilFunctions/utilFunction';
import profileAction from '../profile/profileAction';

const PaymentSuccess = ({ clearOrderSummayInfo, getProfileDetails }) => {
  useEffect(() => {
    clearOrderSummayInfo();
    getProfileDetails();
  }, []);
  return (
    <React.Fragment>
      <Container fluid className="page-not-found" style={{ marginTop: getBannerMarginTop(30, -20) }}>
        <Row>
          <Col lg="10" className="midHolder">
            <img src={`${IMAGES.PAYMENT_SUCESS}`} alt="Payment sucess" className="img-fluid" />
            <Row className="btnRows">
              <Col lg="6" md="6" xs="12">
                <Link to="/">
                  <Button className="btn floatingButtons">Back Home</Button>
                </Link>
              </Col>
              <Col lg="6" md="6" xs="12" className="payment-courses">
                <Link to="/my-courses">
                  <Button className="btn floatingButtons">My Courses</Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export const mapDispatchToProps = dispatch => ({
  clearOrderSummayInfo: () => {
    dispatch({ type: 'CLEAR_ORDER_SUMMARY_INFO', payload: {} });
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb))
  }
});
PaymentSuccess.propTypes = {
  clearOrderSummayInfo: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(PaymentSuccess);
