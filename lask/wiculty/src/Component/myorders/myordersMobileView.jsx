import React from 'react';
import {
  Col, Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import { isFreeCourse } from './myordersUtil';

const OrdersMobileView = ({
  mobileViewOrderInfo, orderId,
  courseTitle,
  currencySymbol,
  courseImage,
  invoiceUrl
}) => (
  <div className="mobile-view d-block d-lg-none mt-5 rounded">
    <Row className="order-item mt-3">
      <Col lg="2" md="3" xs="4">
        <img src={courseImage} className="img-fluid" alt="course card" />
      </Col>
      <Col className="order-item-id" lg="8" md="7" xs="8">
        <div>
          <h5>
            order ID:
            &nbsp;
            {orderId}
          </h5>
          <h6>
            Course Title:
            &nbsp;
            {courseTitle}
          </h6>
          {invoiceUrl && (
            <button type="button" onClick={() => window.open(invoiceUrl, '_blank')} className="btn btn-theme-bordered btn-sm rounded-pill mt-2">
              {'View Invoice'}
            </button>
          )}
        </div>

      </Col>
    </Row>
    <Row className="mt-3 mb-3">
      <Col>
        <div className="price-info p-3">
          <h5 className="mb-3">
            Price Details
          </h5>
          {mobileViewOrderInfo.map(orderInfo => (
            <p className="mt-2">
              {orderInfo.Name}
              {isFreeCourse(orderInfo) ? (
                <span className="float-right  free-course-title font-weight-bold">
                      Free course
                </span>
              ) : (
                <span className="float-right">
                  {currencySymbol}
                      &nbsp;
                  {orderInfo.Price}
                </span>
              )}
            </p>
          ))}
        </div>
      </Col>
    </Row>
  </div>
)

OrdersMobileView.propTypes = {
  orderId: PropTypes.isRequired,
  currencySymbol: PropTypes.isRequired,
  courseTitle: PropTypes.isRequired,
  courseImage: PropTypes.isRequired,
  invoiceUrl: PropTypes.isRequired,
  mobileViewOrderInfo: PropTypes.shape([{}]).isRequired
};

export default OrdersMobileView;
