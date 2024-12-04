import React, { Component } from 'react';
import classnames from 'classnames';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import sf from '../../common/safeTraverse';
import './batchDetails.scss';
import CountryDropDown from '../../country_dropdown/country_dropdown';
import RequestBatch from '../requestBatch/requestBatch';

import { getOrdinal, handleIntervalFormat } from '../../common/utilFunctions/utilFunction';
import handleDataLayer from '../../common/utilFunctions/seoUtil';

import currencyDetailsAction from '../../../Actions/currencyDetailsAction';
import batchInfoAction from './batchInfoAction';
import setUPLocal from '../../userPrefInfo/Set_UP_Local';
import setUPAction from '../../userPrefInfo/Set_UP_Action';
import userPrefAction from '../../userPrefInfo/Get_UP_Action';
import authService from '../../../services/authService';
import globalDataAction from '../../../Actions/globalDataAction';
import orderSummaryAction from '../../orderSummary/orderSummaryAction';
import { getModulesChapters } from '../../common/utilFunctions/courseUtils';

const isSoldOut = (tag = false) => tag === 'sold-out';

const getDisplayTag = (tag) => {
  switch (tag) {
    case 'sold-out':
      return 'sold out';
    case 'filling-soon':
      return 'filling soon';
    case 'few-seats-available':
      return 'few seats available';
    default:
      return '';
  }
}

class BatchDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedCurrencyId: 1,
      currencyDetails: [],
      time_zone_label: 'IST',
      selfPacedCourses: []
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { batchInfo, UserPrefInfo = {} } = props || {};
    const { currency, time_zone_label = 'IST', country } = UserPrefInfo;
    const completeBatchPrice = sf(batchInfo, ['course_price', 'price']) || [];
    const selfPacedCourses = sf(batchInfo, ['self_paced_courses']) || [];
    return {
      completeBatchPrice,
      time_zone_label,
      countryID: country,
      selectedCurrencyId: currency,
      batchInfo: completeBatchPrice.filter(currencyItem => currencyItem.currencyId === currency),
      selfPacedCourses
    }
  }

  componentDidMount () {
    const {
      getCurrencyDetails, getBatchInfo, fetchUserPref
    } = this.props;
    const { courseID, countryID } = this.batchAPIReqInfo()

    getCurrencyDetails({}, (response) => {
      const currencyDetails = sf(response, ['data', 'data', 'currencies']) || [];
      this.setState({
        currencyDetails
      })
    });

    if (countryID) {
      getBatchInfo({ courseID, countryID }, () => {});
    } else {
      fetchUserPref({}, (resp) => {
        const UR_info = sf(resp, ['data', 'data']) || {}
        if (resp.status === 200) {
          const { country } = UR_info
          getBatchInfo({ courseID, countryID: country }, () => {});
        }
      })
    }
  }

  getIntervalFormat = (date, format) => {
    const { UserPrefInfo } = this.props;
    const { time_zone } = UserPrefInfo;
    return handleIntervalFormat(date, format, time_zone);
  }

  getFilteredCurrency (value) {
    const { completeBatchPrice } = this.state;
    const currencydata = completeBatchPrice;
    return currencydata
      .filter(currencyItem => currencyItem.currencyId === Number(value));
  }

  getRequiredInfo () {
    const { batchInfo } = this.state;
    const [batachData = []] = batchInfo
    const batchDetails = sf(batachData, ['discount', 'batch']) || [];
    const courseOfferData = sf(batachData, ['discount', 'course']) || {};
    const { discounted_price, actual_course_price } = courseOfferData;
    const isPriceSame = (discounted_price === actual_course_price);
    const currencySymbol = batachData ? batachData.currencySymbol : '₹';
    const currencyId = batachData ? batachData.currencyId : 1;
    const durationStamp = batchType => (batchType === 'Weekdays' ? 'Days' : 'Weeks');
    return {
      batchDetails,
      isPriceSame,
      durationStamp,
      currencySymbol,
      discounted_price,
      actual_course_price,
      currencyId
    }
  }

  getCoursePrice (data) {
    const { selectedCurrencyId } = this.state;
    const price = data.find(o => o.currencyId === selectedCurrencyId);
    if (price && price.discount && price.discount.course) {
      const { course } = price.discount;
      return course.discounted_price;
    }
    return '';
  }

  batchAPIReqInfo = () => {
    const {
      UserPrefInfo, courseDetails
    } = this.props;
    const course = sf(courseDetails, ['course']) || {};
    const { country } = UserPrefInfo;
    const { id } = course
    return {
      courseID: id,
      countryID: country
    }
  }

  handleSelectCountry = (countryObj = {}) => {
    const { getBatchInfo } = this.props;
    const {
      currency,
      time_zone_label,
      country
    } = countryObj;
    const { courseID, countryID } = this.batchAPIReqInfo()
    this.setState({
      selectedCurrencyId: currency,
      time_zone_label,
      countryID
    })
    getBatchInfo({ courseID, countryID: country }, () => {});
  }

  storeURInfo =(value) => {
    const {
      setUserPrefInDB,
      setUserPrefInLocal,
      UserPrefInfo
    } = this.props;
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      setUserPrefInDB({ ...UserPrefInfo, currency: Number(value) }, () => {})
      setUserPrefInLocal({ currency: Number(value) })
    } else {
      setUserPrefInLocal({ currency: Number(value) })
    }
  }

  handleCurrency = (event) => {
    const {
      setGlobalDetails
    } = this.props;
    const { target: { value } } = event

    const filteredCurrencyData = this.getFilteredCurrency(value);
    setGlobalDetails({ currencyID: Number(value) }, () => { })

    this.storeURInfo(value)
    this.setState({
      selectedCurrencyId: value,
      batchInfo: filteredCurrencyData
    })
  }

  handleEnrollRedirect = (batchId, courseId, courseGroupId, bussinessUnit, id, unique_title) => {
    this.handleEnroll(batchId, courseId, courseGroupId, bussinessUnit, id, unique_title)
  }

  getSectionTitle = is_selfpaced => (is_selfpaced ? 'Our Unique learning features' : 'Our Unique training features')

  handleEnroll = (batchId, courseId, courseGroupId, bussinessUnit, id, unique_title) => {
    // pushing GTM data before signin check
    handleDataLayer({
      userProject: 'Wiculty',
      page: 'course details page',
      url: window.location.href,
      course: unique_title,
      source: 'Course Enroll'
    })
    const { selectedCurrencyId, countryID } = this.state;
    const orderPayload = {
      'course_id': courseId,
      'country_id': countryID,
      'course_group_id': courseGroupId,
      'currency_id': parseInt(selectedCurrencyId, 10),
      'business_unit': bussinessUnit,
      'batch_id': batchId,
      'selected_free_course_id': null
    }
    this.handleOrderInfo(orderPayload)
  }

  handleOrderInfo (orderPayload) {
    const { getOrderDetails, clearOrderSummayInfo } = this.props;
    clearOrderSummayInfo({}, () => {})
    getOrderDetails(orderPayload, (response) => {
      this.setState({
        isLoading: false
      })
      this.handleOrderView(response)
    })
  }

  handleOrderView (response) {
    const { history } = this.props;
    history.push('/order-summary');
  }

  render () {
    const {
      courseDetails,
      isFromEnroll
    } = this.props;
    const {
      course_group_id, id,
      display_title, unique_title, course_title,
      is_selfpaced, course_duration = 50,
      trending_topic,
      sections = {}
    } = courseDetails.course || {};
    const {
      isLoading, selectedCurrencyId,
      currencyDetails, time_zone_label,
      selfPacedCourses
    } = this.state;
    const {
      batchDetails,
      isPriceSame,
      durationStamp,
      currencySymbol,
      currencyId,
      discounted_price,
      actual_course_price
    } = this.getRequiredInfo()
    const { modulesCount = 3, chaptersCount = 3 } = getModulesChapters(sections);
    return (
      <>
        <div className={classnames('container mt-5', { 'd-none d-lg-block enroll-batch-container': isFromEnroll, 'batch-menu-container': !isFromEnroll })}>
          {isLoading && <div className="loading" />}
          {(!is_selfpaced && selfPacedCourses && selfPacedCourses.length > 0) ? (
            <div className="card mb-4">
              <div className="card-body">
                <Row>
                  <Col xs={12} className="px-0">
                    <h5>Self paced learning</h5>
                  </Col>
                  <Col className="px-0 mt-2">
                    <table className="table table-bordered">
                      <thead>
                        <th scope="col">
                          Title
                        </th>
                        <th scope="col">
                          Price
                        </th>
                        <th scope="col">
                          Enroll
                        </th>
                      </thead>
                      <tbody>
                        {selfPacedCourses.map(course => (
                          <tr>
                            <td>
                              {course.courseTitle}
                            </td>
                            <td>
                              {`${currencySymbol}${this.getCoursePrice(course.price).toLocaleString()}`}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-theme btn-lmd"
                                onClick={() => this.handleEnrollRedirect(null,
                                  course.id, course.courseGroupId, 1, 1, course.uniqueTitle)}
                              >
                                {'Enroll Now'}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </div>
            </div>
          ) : ''}
          <div className="card">
            <div className="card-body">
              <Row>
                <Col className="px-0" lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                  {(
                    <Row className="batch-dropdown d-none d-sm-flex justify-content-center justify-content-lg-start">
                      <Col className={`${isFromEnroll ? 'col-lg-12' : ''} px-0`}>
                        <Row>
                          <Col className="p-0 col-12 col-lg-6 d-flex align-items-center">
                            <h2 className={classnames('mb-4', { 'course-price-section px-2': isFromEnroll })}>
                              {this.getSectionTitle(is_selfpaced)}
                            </h2>
                          </Col>
                        </Row>

                        <p>
                        Hands-on Practical training + LIVE terminal execution + Less Slides
                        </p>
                        <Row className="batch-details-usps mb-3">
                          <Col xs={12} sm={6} md={4} className="batch-details-usp-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
                            {`${course_duration}+ Hrs of Instructor-led Training`}
                          </Col>
                          <Col xs={12} sm={6} md={4} className="batch-details-usp-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
                            {`${modulesCount}+ Modules / Tools (${chaptersCount} Chapters)`}
                          </Col>
                          <Col xs={12} sm={6} md={4} className="batch-details-usp-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
                            FREE Linux & Shell scripting Course
                          </Col>
                          {trending_topic && (
                            <Col xs={12} sm={6} md={4} className="batch-details-usp-item">
                              <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
                              {`With trending ${trending_topic} topics`}
                            </Col>
                          )}
                          <Col xs={12} sm={6} md={4} className="batch-details-usp-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
                            Resume preparation & Job assistance
                          </Col>
                          <Col xs={12} sm={6} md={4} className="batch-details-usp-item">
                            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
                            Videos for every missed session
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                  {/* --- From tablet batch details view  start  --- */}
                  <Row>
                    <Col className="p-0 col-12 col-lg-6 d-flex align-items-center">
                      {!is_selfpaced ? (
                        <h4 className="d-none d-lg-block mb-0">
                          {`Online ${course_title} training`}
                        </h4>
                      ) : ''}
                    </Col>
                    <Col className="p-0 col-12 col-lg-6">
                      <Row className="mb-2 d-none d-md-flex">
                        <Col className="col-12 col-md-4 col-lg-5 batch-country">
                          <CountryDropDown
                            onSelectCountry={this.handleSelectCountry}
                            isPhoneCode={false}
                          />
                        </Col>
                        <Col className="col-12 col-md-4 col-lg-6 curreny-dropdown">
                          <select
                            className="bg-white rounded text-black-50"
                            onChange={e => this.handleCurrency(e)}
                            value={selectedCurrencyId}
                          >
                            {currencyDetails.map(currency => (
                              <option value={currency.currency_id}>
                                {`${currency.currency_symbol}  ${currency.currency}`}
                              </option>
                            ))}
                          </select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mt-4 d-none d-sm-flex justify-content-center justify-content-lg-start">
                    <Col className={`time-details ${isFromEnroll ? 'd-none' : ''}`} lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
                      {batchDetails.length > 0 &&
                      (
                        <React.Fragment>
                          <div className="table-responsive-sm bg-white trending-topic-table">
                            <table className="table table-striped table-bordered table-hovered">
                              <thead className="thead-dark">
                                <th scope="col">Start Date</th>
                                <th scope="col">
                                  Days
                                </th>
                                <th scope="col">Time</th>
                                <th scope="col">Price</th>
                                <th scope="col" />
                              </thead>
                              <tbody>
                                {batchDetails.map(batch => (
                                  <tr className={isSoldOut(batch.tags) ? 'disabled' : ''}>
                                    <td>
                                      {`${this.getIntervalFormat(batch.start_date, 'DD')}`}
                                      <sup>{getOrdinal(Number(this.getIntervalFormat(batch.start_date, 'DD')))}</sup>
                                      &nbsp;
                                      {`${this.getIntervalFormat(batch.start_date, 'MMM')}`}
                                      <br />
                                      <small className="text-danger text-uppercase">{getDisplayTag(batch.tags)}</small>
                                    </td>
                                    <td>
                                      <span className="pr-2 text-uppercase">
                                        {`${batch.batch_date_label} (${batch.batch_duration} ${durationStamp(batch.batch_type)})`}
                                      </span>
                                      <br />
                                      {batch.batch_type === 'Weekend' && <span style={{ color: '#0b5386', paddingRight: 5 }}>Weekend batch</span>}
                                    </td>
                                    <td>
                                      {`${this.getIntervalFormat(batch.start_date, 'hh:mma')} - ${this.getIntervalFormat(batch.end_date, 'hh:mma')} (${time_zone_label})`}
                                    </td>
                                    <td>
                                      <span className="font-weight-bold lead">
                                        {`${currencySymbol}${batch.discounted_batch_price.toLocaleString()}`}
                                      </span>
                                      {batch.discounted_batch_price !== batch.actual_batch_price &&
                                       (
                                         <span>
                                           <strike className="ml-2 text-muted">
                                             {`${currencySymbol}${batch.actual_batch_price.toLocaleString()}`}
                                           </strike>
                                         </span>
                                       )}
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className={`btn btn-theme btn-sm  ${isSoldOut(batch.tags) ? 'disabled c-n-d' : ''}`}
                                        onClick={isSoldOut(batch.tags)
                                          ? () => { }
                                          : () => {
                                            this.handleEnroll(
                                              batch.id, batch.course_id,
                                              course_group_id, 1, 1, unique_title
                                            )
                                          }
                                        }
                                      >
                                        {'Enroll Now'}
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </React.Fragment>
                      )
                      }
                      <div className="my-2">
                        <RequestBatch courseID={id} />
                      </div>

                    </Col>
                    <Col className={`pr-0 ${isFromEnroll ? 'col-lg-12' : 'col-lg-3 d-block d-lg-none'} col-md-6 col-xs-12`}>
                      <Row>
                        <Col className="offer-details card shadow p-3">
                          <div>
                            <h5 className="card-title text-center">Course Price</h5>
                            <Row className="ft18 fcr text-center">
                              {display_title && display_title}
                            </Row>
                            <Row>
                              <Col className="tac flex-box-class justify-content-center" xl={{ size: 5 }} lg={{ size: 12 }} md={{ size: 6 }} xs={{ size: 12 }}>
                                <h5 className="ft30 ftb pd10 tac">
                                  {currencySymbol}
                                  {(discounted_price && discounted_price.toLocaleString()) || '--'}
                                </h5>
                              </Col>
                              {!isPriceSame && (
                                <Col className="text-center pr-0 flex-vertical-center justify-content-xl-start" xl={{ size: 5 }} lg={{ size: 12 }} md={{ size: 6 }} xs={{ size: 9 }}>
                                  <hr className="d-md-block d-lg-none" />
                                  <h2 className="font-weight-normal">
                                    <s className="mgr15 text-gray ">
                                      {currencySymbol}
                                      {(actual_course_price && actual_course_price.toLocaleString()) || '--'}
                                    </s>
                                  </h2>
                                </Col>
                              )}
                            </Row>
                            <Row className="offer-head-line text-center">
                              {'(Lowest price ever in the market)'}
                              {currencyId === 1 && (
                                <h5 className="text-primary mt-2" title="See option during the payment">
                                EMI option also available
                                </h5>
                              )}
                            </Row>
                            <Row>
                              <Col className="mt-2 text-center">
                                <button
                                  type="button"
                                  className="btn btn-theme btn-lmd"
                                  onClick={() => this.handleEnrollRedirect(null,
                                    id, course_group_id, 1, 1, unique_title)}
                                >
                                  {'Enroll Now'}
                                </button>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* --- From tablet batch details view end  --- */}
              {/* --- mobile batch details view  start  --- */}
              <Row className="d-block d-sm-none">
                <Col className="batch-details-container bg-white" lg={{ size: 10 }} md={{ size: 12 }} xs={{ size: 12 }}>
                  <Row className="batch-heading-container">
                    <Col className="tac pt-3 ft20 flex-box-class batch-heading" lg={{ size: 9 }} md={{ size: 12 }} xs={{ size: 12 }}>
                      {`Live online ${display_title && display_title} classes `}
                    </Col>
                    <Col lg={{ size: 3 }} md={{ size: 12 }} xs={{ size: 12 }}>
                      <Row className="batch-dropdown">
                        <Col className="col-12 col-md-4 col-lg-6 batch-country">
                          <CountryDropDown
                            onSelectCountry={this.handleSelectCountry}
                            isPhoneCode={false}
                          />
                        </Col>
                        <Col className="col-12 col-md-4 col-lg-6 curreny-dropdown">
                          <select onChange={e => this.handleCurrency(e)} value={selectedCurrencyId}>
                            {currencyDetails.map(currency => (
                              <option value={currency.currency_id}>
                                {`${currency.currency_symbol}  ${currency.currency}`}
                              </option>
                            ))}
                          </select>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row className="mgt10 mgb20">
                    <Col className="mgb30 time-details" lg={{ size: 9 }} md={{ size: 12 }} xs={{ size: 12 }}>
                      {batchDetails.length > 0 &&
                      (
                        <React.Fragment>
                          {batchDetails.map(batch => (
                            <Row className={`Batch-details box-shadow tac Batch-details-mobile pb-2 ${isSoldOut(batch.tags) ? 'disabled' : ''}`}>
                              <Col xs={{ size: 4 }} className="text-left">
                                <p>
                                  {`${this.getIntervalFormat(batch.start_date, 'DD')}${getOrdinal(Number(this.getIntervalFormat(batch.start_date, 'DD')))}  ${this.getIntervalFormat(batch.start_date, 'MMM')}`}
                                </p>
                                <small className="text-danger text-uppercase">{getDisplayTag(batch.tags)}</small>
                              </Col>
                              <Col xs={{ size: 4 }}>
                                <p className="ftb">
                                  {batch.batch_type === 'Weekdays' ? <span style={{ color: '#267a2e', paddingRight: 5 }}>Mon - Fri</span> : <span style={{ color: '#0b5386', paddingRight: 5 }}>Sat - Sun</span>}
                                </p>
                                <p>{` (${batch.batch_duration} ${durationStamp(batch.batch_type)})`}</p>
                              </Col>

                              <Col xs={{ size: 4 }}>
                                {`${this.getIntervalFormat(batch.start_date, 'hh:mma')} - ${this.getIntervalFormat(batch.end_date, 'hh:mma')} (${time_zone_label})`}
                                {}
                              </Col>
                              <Row className="w-100">
                                <Col className="d-flex justify-content-between">
                                  <div>
                                    {batch.discounted_batch_price !== batch.actual_batch_price ? (
                                      <strike className="mgr15">
                                        {currencySymbol}
                                        {(batch.actual_batch_price && batch.actual_batch_price.toLocaleString()) || '--'}
                                      </strike>
                                    ) : (
                                      <span>
                                        {''}
                                      </span>
                                    )
                                    }
                                    <span className="ft20">
                                      {currencySymbol}
                                      {(batch.discounted_batch_price && batch.discounted_batch_price.toLocaleString()) || '--'}
                                    </span>
                                  </div>
                                  <div>
                                    {isSoldOut(batch.tags)
                                      ? (
                                        <button type="button" className="btn btn-theme btn-sm c-n-d" disabled>
                                          ENROLL NOW
                                        </button>
                                      )
                                      : (
                                        <button type="button" className="btn btn-theme btn-sm" onClick={() => this.handleEnroll(batch.id, batch.course_id, course_group_id, 1, 1, unique_title)}>
                                          ENROLL NOW
                                        </button>
                                      )
                                    }
                                  </div>
                                </Col>
                              </Row>
                            </Row>
                          ))}
                        </React.Fragment>
                      )
                      }
                      <div className="my-3">
                        <RequestBatch courseID={id} />
                      </div>
                    </Col>
                    <Col lg={{ size: 3 }} md={{ size: 6 }} xs={{ size: 12 }} className="mt-2">
                      <Row>
                        <Col className="offer-details">
                          <h5 className="card-title">Course Price at</h5>
                          <Row>
                            <Col className="tac flex-box-class offer-price" lg={{ size: 5 }} md={{ size: 6 }} xs={{ size: 12 }}>
                              <div className="ft30 ftb tac">
                                {currencySymbol}
                                {(discounted_price && discounted_price.toLocaleString()) || '--'}
                              </div>
                            </Col>
                            {!isPriceSame && (
                              <Col className="actual-price-section" lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 9 }}>
                                <hr className="d-sm-block d-md-none" />
                                <div className="actual-price">
                                  <div>
                                    <p className="ftb">
                                      {'Actual Price'}
                                    </p>
                                    <p>
                                      <s className="mgr15 text-gray">
                                        {currencySymbol}
                                        {(actual_course_price && actual_course_price.toLocaleString()) || '--'}
                                      </s>
                                    </p>
                                  </div>
                                </div>
                              </Col>
                            )}
                          </Row>
                          <p className="text-success mb-0">
                            (Lowest price ever in the market)
                          </p>
                          <Row>
                            <Col className="text-center mt-2" lg={{ size: 10 }} md={{ size: 6 }} xs={{ size: 12 }}>
                              {currencyId === 1 && (
                                <h5 className="text-primary">
                                  <strong>EMI</strong>
                                  {' '}
                                option also available
                                </h5>
                              )}
                              <button type="button" className="btn btn-theme" onClick={() => this.handleEnroll(null, id, course_group_id, 1, 1, unique_title)}>
                                {'Enroll Now'}
                              </button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {/* --- mobile batch details view end  --- */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  getBatchInfo: (payload, cb) => {
    dispatch(batchInfoAction(payload, cb));
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb));
  },
  getOrderDetails: (payload, cb) => {
    dispatch(orderSummaryAction(payload, cb));
  },
  getCurrencyDetails: (payload, cb) => {
    dispatch(currencyDetailsAction(payload, cb));
  },
  setUserPrefInDB: (payload, cb) => {
    dispatch(setUPAction(payload, cb));
  },
  setUserPrefInLocal: (payload) => {
    dispatch(setUPLocal(payload));
  },
  fetchUserPref: (payload, cb) => {
    dispatch(userPrefAction(payload, cb));
  },
  clearOrderSummayInfo: () => {
    dispatch({ type: 'CLEAR_ORDER_SUMMARY_INFO', payload: {} });
  }
});

export const mapStateToProps = state => ({
  UserPrefInfo: state.UserPrefInfo,
  batchInfo: state.batchInfo
});

BatchDetails.propTypes = {
  courseDetails: PropTypes.isRequired,
  getOrderDetails: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  getCurrencyDetails: PropTypes.func.isRequired,
  getBatchInfo: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  setUserPrefInDB: PropTypes.func.isRequired,
  setUserPrefInLocal: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  isFromEnroll: PropTypes.bool,
  clearOrderSummayInfo: PropTypes.func.isRequired
};

BatchDetails.defaultProps = {
  isFromEnroll: false
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchDetails);
