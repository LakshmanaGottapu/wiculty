import React, { Component } from 'react';
import {
  Col, Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import { getDenomination } from '../common/utilFunctions/utilFunction';
import OrdersMobileView from './myordersMobileView';
import { isShowField, isFreeCourse } from './myordersUtil';

class MyOrdersRow extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  OrderSummaryJSON () {
    const {
      orderId,
      orderAmount,
      gst,
      walletCash,
      discount,
      coursePrice,
      courseTitle
    } = this.props;

    return [
      {
        Name: 'Order Id',
        Price: orderId,
        isCurrencySymbol: false
      },
      {
        Name: 'Course title',
        Price: courseTitle,
        isCurrencySymbol: false
      },
      {
        Name: 'Course price',
        Price: getDenomination(coursePrice),
        isCurrencySymbol: true
      },
      {
        Name: 'Discount',
        Price: getDenomination(discount),
        isCurrencySymbol: true,
        textClass: 'text-muted'
      },
      {
        Name: 'Wallet Cash',
        Price: getDenomination(walletCash),
        isCurrencySymbol: true
      },
      {
        Name: 'GST',
        Price: getDenomination(gst),
        isCurrencySymbol: true,
        textClass: 'text-muted'
      },
      {
        Name: 'Amount Paid',
        Price: getDenomination(orderAmount),
        isCurrencySymbol: true,
        textClass: 'font-weight-bold'
      }
    ]
  }

  render () {
    const {
      currencySymbol,
      courseImage,
      invoiceUrl
    } = this.props;
    const orderSummaryInfo = this.OrderSummaryJSON();
    const mobileViewOrderInfo = orderSummaryInfo.filter(priceItem => !['Order Id', 'Course title'].includes(priceItem.Name));
    return (
      <React.Fragment>
        {/* <!-- desktop view --> */}
        <div className="d-none d-lg-block">
          <Row className="ordersRow mb-4">
            <Col lg="2" md="2" xs="12" className="orderImageHolder">
              <img src={courseImage} className="img-fluid" alt="course card" />
            </Col>
            <Col lg="7" md="6" xs="12" className="ordersInfoHolder">
              {orderSummaryInfo.map(item => (
                isShowField(item) ? (
                  <Row className={item.textClass}>
                    <Col lg="5" md="5" xs="5" className={item.textClass}>
                      {item.Name}
                    </Col>
                    <Col lg="1" md="1" xs="1">
                      {' - '}
                    </Col>
                    <Col lg="5" md="5" xs="5" className={item.textClass}>
                      {!isFreeCourse(item) && item.isCurrencySymbol && <span className="currency-symbol">{currencySymbol}</span>}
                      {isFreeCourse(item) ? <b className="free-course-title">Free course</b> : item.Price}
                    </Col>
                  </Row>
                ) : ''
              ))}
            </Col>
            <Col lg="2" md="3" xs="12" className="invoice-button align-self-start">
              {invoiceUrl &&
            (
              <button type="button" onClick={() => window.open(invoiceUrl, '_blank')} className="btn btn-theme-bordered btn-sm rounded-pill">
                {'View Invoice'}
              </button>
            )
              }
            </Col>
          </Row>
        </div>
        {/* <!-- mobile view --> */}
        <OrdersMobileView mobileViewOrderInfo={mobileViewOrderInfo} {...this.props} />
      </React.Fragment>
    )
  }
}

MyOrdersRow.propTypes = {
  orderId: PropTypes.isRequired,
  orderAmount: PropTypes.isRequired,
  gst: PropTypes.isRequired,
  walletCash: PropTypes.isRequired,
  discount: PropTypes.isRequired,
  currencySymbol: PropTypes.isRequired,
  coursePrice: PropTypes.isRequired,
  courseTitle: PropTypes.isRequired,
  courseImage: PropTypes.isRequired,
  invoiceUrl: PropTypes.isRequired
};

export default MyOrdersRow;
