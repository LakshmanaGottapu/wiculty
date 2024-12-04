import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row, Col, Button, Modal,
  ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcMastercard, faCcVisa, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import chooseLater from '../../img/spellbook.svg';
import sf from '../common/safeTraverse';
import RazorPayComp from '../payment/razorpay';
import CCavenue from '../payment/cc-avenu';
import PromoCode from './promoCode';
import {
  getDenomination, handleIntervalFormat,
  getOrdinal, buttonize
} from '../common/utilFunctions/utilFunction';
import handleDataLayer from '../common/utilFunctions/seoUtil';
import gatewayObj from '../payment/gateways';

// redux actions import start
import callClubableAction from './callClubableAction';
import callCreateOrderAction from './orderSummaryAction'
import setGlobalDataAction from '../../Actions/globalDataAction';
// redux actions import end
import { VARIABLES } from '../locales/locale'

import './orderSummary.scss';

const { CHOOSE_LATER } = VARIABLES;

const getAlertInfo = () => (
  <div className="alert alert-info" role="alert">
    Heads up! &nbsp; Batch selection is pending
    <br />
    <p className="mb-0">
      Later you can select batch from my courses
      &nbsp; (or)
      call us at
      <a href="tel:+918951066177" className="c-inherit">
        <span className="pdlr5 fcb">@ +91-8951066177</span>
      </a>
    </p>
  </div>
)

class orderSummary extends Component {
  constructor (props) {
    super(props);
    this.state = {
      orderDetails: {},
      selectedCourse: '',
      isLoading: false,
      modal: false,
      profileInfo: {}
      // couponCode: ''
    };
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const {
      orderSummaryDetails,
      profileDetails,
      isLoading
    } = props || {}
    const orderDetails = sf(orderSummaryDetails, ['data', 'data']) || {};
    const profileInfo = sf(profileDetails, ['data', 'data']) || {};
    if (Object.keys(orderDetails).length > 0) {
      return {
        orderDetails,
        isLoading,
        profileInfo
      }
    }
    return null
  }

  componentDidMount () {
    const { setGlobalDetails } = this.props;
    setGlobalDetails({ currentPage: 'hideFooter' }, (resp) => {})
  }

  componentWillUnmount () {
    const { setGlobalDetails } = this.props;
    setGlobalDetails({ currentPage: 'showFooter' }, (resp) => {});
    // clearOrderSummayInfo({}, () => {})
    // window.localStorage.clear()
  }

  getBatchInfo () {
    const {
      orderDetails = {}
    } = this.state;
    const startDate = sf(orderDetails, ['batch', 'startDate']) || 0;
    const batchStartDate = handleIntervalFormat(startDate, 'DD');
    return (
      <div className="alert alert-info" role="alert">
        {`Batch starts on: ${batchStartDate}${getOrdinal(Number(batchStartDate))}  ${handleIntervalFormat(startDate, 'MMM')}`}
      </div>
    )
  }

  handleCourseSelection = (freeCourse) => {
    if (freeCourse === CHOOSE_LATER) {
      this.setState({ modal: true })
    } else {
      this.setState({
        selectedCourse: freeCourse
      });
    }
  }

  handleClose =() => {
    this.setState({
      modal: false
    })
  }

  confirmChooseLater = () => {
    this.setState({
      selectedCourse: CHOOSE_LATER
    });
    this.handleClose()
    const [paymentEle] = document.getElementsByClassName('payment-container')
    const top = paymentEle && (paymentEle.offsetTop - 100);
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }

  render () {
    const {
      orderDetails = {},
      selectedCourse,
      profileInfo = {},
      isLoading,
      modal
    } = this.state;
    const {
      display_title,
      course_image,
      batch = {},
      free_course_list = [],
      currency = {},
      course_price,
      discount,
      gst,
      wallet_cash,
      amount_paid,
      couponCode,
      merchant_order_id,
      gateway = 'GATEWAY_RAZORPAY',
      is_selfpaced
    } = orderDetails || {};
    const { user = {} } = profileInfo;
    const {
      email,
      contact_no,
      first_name,
      last_name
    } = user;

    const userDetails = {
      first_name,
      last_name,
      email,
      contact_no,
      city: 'Bangalore',
      country: 'India'
    }
    handleDataLayer({
      userProject: 'Wiculty',
      page: 'order summary',
      url: window.location.href,
      course: display_title
    })

    return (
      <div className="order-summary-container">
        {isLoading && <div className="loading" />}
        <div className="order-Summary-body my-5">
          <h1 className="product-info-text mb-3 text-center">
            {'REVIEW ORDER'}
          </h1>
          <Row className="shadow rounded">
            <div className="col-md-6 bg-light p-4 product-section">
              <h2 className="mb-4">
                {'Product Summary'}
              </h2>
              <div className="course-info-container">
                {/* Desktop view */}
                <Row className="d-none d-xl-flex">
                  <Col className="course-img" lg={{ size: 3 }} md={{ size: 12 }} xs={{ size: 12 }}>
                    <div>
                      <img src={course_image} alt={display_title} />
                    </div>
                  </Col>
                  <Col className="course-info" lg={{ size: 9 }} md={{ size: 12 }} xs={{ size: 12 }}>
                    <h3 className="text-dark font-weight-normal mb-3">
                      {display_title || '--'}
                    </h3>
                    {!is_selfpaced && (
                      <div>
                        {batch.startDate ? this.getBatchInfo() : getAlertInfo()}
                      </div>
                    )}
                  </Col>
                </Row>
                {/* From tablet break point view */}
                <div className="d-block d-xl-none">
                  <Row>
                    <Col className="course-img mb-2 p-0 text-start" lg={{ size: 2 }} md={{ size: 4 }} xs={{ size: 4 }}>
                      <img src={course_image} alt={display_title} />
                    </Col>
                    <Col className="course-info flex-vertical-center" lg={{ size: 10 }} md={{ size: 8 }} xs={{ size: 8 }}>
                      <h3 className="text-dark font-weight-normal mb-3">
                        {display_title || '--'}
                      </h3>
                    </Col>
                  </Row>
                  <div className="mt-2">
                    {!is_selfpaced && (
                      <div>
                        {batch.startDate ? this.getBatchInfo() : getAlertInfo()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {free_course_list && free_course_list.length > 0 && (
                <Row className="free-courses-container mt-4">
                  <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                    <h2 className="font-weight-normal">
                      Free Courses
                    </h2>
                    <div className="courses-blog mt-2">
                      <div
                        className={classNames('course-imgs-container p-2',
                          { active: selectedCourse === CHOOSE_LATER })}
                        {...buttonize(this.handleCourseSelection, CHOOSE_LATER)}
                      >
                        <div>
                          <img src={chooseLater} alt="choose later" />
                        </div>
                        <div>
                          <h6 className="fcfc">
                            {CHOOSE_LATER}
                          </h6>
                        </div>
                      </div>
                      {(free_course_list && free_course_list.length > 0) &&
                      free_course_list.map(course => (
                        <div
                          className={classNames('course-imgs-container p-2', { active: selectedCourse === course.course_id })}
                          {...buttonize(this.handleCourseSelection, course.course_id)}
                        >
                          <div>
                            <img
                              key={course.course_id}
                              src={course.course_image}
                              alt={course.display_title}
                            />
                          </div>
                          <div>
                            <h6>
                              {course.display_title ? course.display_title.toLowerCase() : '--'}
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              )}
            </div>
            <div className="col-md-6 p-3 order-section bg-white">
              <Row className="price-info-container">
                <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                  <h2 className="mb-4">
                    {'Order Summary'}
                  </h2>
                  {course_price ? (
                    <Row className="price-fields">
                      <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                        <h5>
                          {'Course Price'}
                        </h5>
                      </Col>
                      <Col className="pd0" lg={{ size: 2 }} md={{ size: 1 }} xs={{ size: 1 }}>
                        <h5>
                          {'-'}
                        </h5>
                      </Col>
                      <Col lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 5 }}>
                        <h5>{`${currency && currency.currencySymbol} ${course_price ? getDenomination(course_price) : '--'}`}</h5>
                      </Col>
                    </Row>
                  ) : ''}
                  {discount ? (
                    <Row className="price-fields">
                      <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                        <h5>
                          {'Discount'}
                        </h5>
                      </Col>
                      <Col className="pd0" lg={{ size: 2 }} md={{ size: 1 }} xs={{ size: 1 }}>
                        <h5>
                          {'-'}
                        </h5>
                      </Col>
                      <Col lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 5 }}>
                        <h5>{`${currency && currency.currencySymbol} ${getDenomination(discount) || '--'}`}</h5>
                      </Col>
                    </Row>
                  ) : ''}
                  {wallet_cash ? (
                    <Row className="price-fields">
                      <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                        <h5>
                          {'Wallet Cash'}
                        </h5>
                      </Col>
                      <Col className="pd0" lg={{ size: 2 }} md={{ size: 1 }} xs={{ size: 1 }}>
                        <h5>
                          {'-'}
                        </h5>
                      </Col>
                      <Col lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 5 }}>
                        <h5>{`${currency && currency.currencySymbol} ${getDenomination(wallet_cash) || '--'}`}</h5>
                      </Col>
                    </Row>
                  ) : ''}
                  {couponCode &&
                (
                  <Row className="price-fields">
                    <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                      <h5>
                        {'Coupon Code'}
                      </h5>
                    </Col>
                    <Col className="pd0" lg={{ size: 2 }} md={{ size: 1 }} xs={{ size: 1 }}>
                      <h5>
                        {'-'}
                      </h5>
                    </Col>
                    <Col lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 5 }}>
                      <h5>{`${currency && (currency.currencySymbol || '')} ${getDenomination(course_price) || ''}`}</h5>
                    </Col>
                  </Row>
                )}
                  {currency.id === 1 && (
                    <Row className="price-fields">
                      <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                        <h5>
                          {'GST (18%)'}
                        </h5>
                      </Col>
                      <Col className="pd0" lg={{ size: 2 }} md={{ size: 1 }} xs={{ size: 1 }}>
                        <h5>
                          {'-'}
                        </h5>
                      </Col>
                      <Col lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 5 }}>
                        <h5>{`${orderDetails.currency && (orderDetails.currency.currencySymbol || '')} ${getDenomination(gst) || '--'}`}</h5>
                      </Col>
                    </Row>
                  )}
                  <Row className="price-fields">
                    <Col lg={{ size: 11 }} md={{ size: 11 }} xs={{ size: 12 }}>
                      <hr />
                    </Col>
                  </Row>
                  <Row className="price-fields">
                    <Col lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                      <h5 className="font-weight-bold">
                        {'Total'}
                      </h5>
                    </Col>
                    <Col className="pd0" lg={{ size: 2 }} md={{ size: 1 }} xs={{ size: 1 }}>
                      <h5>
                        {'-'}
                      </h5>
                    </Col>
                    <Col lg={{ size: 4 }} md={{ size: 5 }} xs={{ size: 5 }}>
                      <h5 className="font-weight-bold">{`${orderDetails.currency && (orderDetails.currency.currencySymbol || '')} ${amount_paid ? getDenomination(amount_paid) : '--'}`}</h5>
                    </Col>
                  </Row>
                  <PromoCode
                    orderId={orderDetails.merchant_order_id}
                    updatePromoCode={this.updatePromoCode}
                    orderDetails={orderDetails}
                  />

                </Col>
              </Row>
              <Row className="payment-container mt-2">
                <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                  <div className="payment-button">
                    {gatewayObj[gateway] === 'GATEWAY_CCAVENUE' ? (
                      <CCavenue
                        orderId={merchant_order_id}
                        course={display_title}
                      />
                    ) : (

                      <RazorPayComp
                        userDetails={userDetails}
                        paymentAmount={orderDetails.amount_paid}
                        gst={orderDetails.gst}
                        merchantOrderId={orderDetails.merchant_order_id}
                        course={display_title}
                        currencyCode={currency.currency || ''}
                        orderDetails={orderDetails}
                        selectedCourse={selectedCourse === CHOOSE_LATER ? null : selectedCourse}
                      />
                    )}
                  </div>
                  {/* <div className="ft25 fca fwn payment-info-text">
                    <h5>
                      {'Payment Details'}
                    </h5>
                  </div> */}
                  <div className="payment-modes">
                    <h6 className="font-weight-normal text-muted mb-2">
                      {'Accepted mode of payment'}
                    </h6>
                    <FontAwesomeIcon icon={faCcMastercard} className="mr-1" style={{ color: '#EBA745' }} />
                    <FontAwesomeIcon icon={faCcVisa} className="mr-1" style={{ color: '#01579F' }} />
                    <FontAwesomeIcon icon={faCcAmex} className="mr-1" style={{ color: '#399BE2' }} />
                    <FontAwesomeIcon icon={faCreditCard} className="mr-1" style={{ color: '#399BE2' }} />
                  </div>

                </Col>
              </Row>
            </div>
          </Row>
          <Modal
            isOpen={modal}
            className="free-course-info modal-dialog-centered"
            data-backdrop="static"
          >
            <ModalHeader className="d-flex justify-content-center" toggle={this.handleClose}>Not Now? &nbsp; May Be Later</ModalHeader>
            <ModalBody>
              <span>
                You can choose the free course Now or later!
              </span>
              <br />
              <span>
               Reach us instantly @
                <a href="tel:+91 8951066177">+91 8951066177</a>
              &nbsp;(or) &nbsp;emails us &nbsp;
                <a href="mailto:support@wiculty.com">
                support@wiculty.com
                </a>
              </span>
            </ModalBody>
            <ModalFooter>
              <Button className="proceed-btn" color="primary" onClick={this.confirmChooseLater}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  callCreateOrder: (payload, cb) => {
    dispatch(callCreateOrderAction(payload, cb));
  },
  callClubable: (payload, cb) => {
    dispatch(callClubableAction(payload, cb));
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(setGlobalDataAction(payload, cb));
  },
  clearOrderSummayInfo: () => {
    dispatch({ type: 'CLEAR_ORDER_SUMMARY_INFO', payload: {} });
  }
});

const mapStateToProps = state => ({
  orderSummaryDetails: state.orderSummaryDetails,
  profileDetails: state.profileDetails,
  UserPrefInfo: state.UserPrefInfo
});

orderSummary.propTypes = {
  callCreateOrder: PropTypes.func.isRequired,
  callClubable: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  clearOrderSummayInfo: PropTypes.func.isRequired
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(orderSummary));
