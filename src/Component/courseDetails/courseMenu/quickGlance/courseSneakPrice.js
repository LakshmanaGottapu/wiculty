import React, { Component } from 'react';
import {
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock, faMoneyBill,
  faPhoneAlt, faTag
} from '@fortawesome/free-solid-svg-icons';
import DateCountdown from 'react-date-countdown-timer';
import classnames from 'classnames';

import sf from '../../../common/safeTraverse';
import handleDataLayer from '../../../common/utilFunctions/seoUtil';
import CountryDropDown from '../../../country_dropdown/country_dropdown';
// import { buttonize } from '../../../common/utilFunctions/utilFunction';
import authService from '../../../../services/authService';
import globalDataAction from '../../../../Actions/globalDataAction';
import currencyDetailsAction from '../../../../Actions/currencyDetailsAction';
import orderSummaryAction from '../../../orderSummary/orderSummaryAction';
import batchInfoAction from '../../batchDetails/batchInfoAction';
import setUPLocal from '../../../userPrefInfo/Set_UP_Local';
import setUPAction from '../../../userPrefInfo/Set_UP_Action';
import userPrefAction from '../../../userPrefInfo/Get_UP_Action';
import freeCourseEnrollAction from '../../freeCourseEnroll/freeCourseEnrollAction';
import { MESSAGES } from '../../../locales/locale';
/* component imports */
import messageFn from '../../../common/message';

import ForgotPassword from '../../../registration/forgotPassword';
import RegestrationSignInSection from '../../../registration/registration-signIn';
import RegestrationSignUpSection from '../../../registration/registration-signUp';
import ChangePassword from '../../../common/changePassword';
import { isAuthenticatedRoute, isPrivateRoute } from '../../../common/utilFunctions/utilFunction';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, WARNING }
} = MESSAGES

class CardBatchDetails extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedCurrencyId: 1,
      currencyDetails: [],
      showPreferenceModal: false,
      modalObj: {}
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { batchInfo, UserPrefInfo = {} } = props || {};
    const { currency, country } = UserPrefInfo;
    const completeBatchPrice = sf(batchInfo, ['course_price', 'price']) || [];
    return {
      completeBatchPrice,
      countryID: country,
      selectedCurrencyId: currency,
      batchInfo: completeBatchPrice.filter(currencyItem => currencyItem.currencyId === currency)
    }
  }

  componentDidMount () {
    const {
      getBatchInfo, getCurrencyDetails, fetchUserPref
    } = this.props;
    const { courseID, countryID } = this.batchAPIReqInfo();

    getCurrencyDetails({}, (response) => {
      const currencyDetails = sf(response, ['data', 'data', 'currencies']) || [];
      this.setState({
        currencyDetails
      })
    });

    if (countryID && courseID) {
      getBatchInfo({ courseID, countryID }, () => { });
    } else if (courseID) {
      fetchUserPref({}, (resp) => {
        const UR_info = sf(resp, ['data', 'data']) || {}
        if (resp.status === 200) {
          const { country } = UR_info
          getBatchInfo({ courseID, countryID: country }, () => { });
        }
      })
    }
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

  storeURInfo = (value) => {
    const {
      setUserPrefInDB,
      setUserPrefInLocal,
      UserPrefInfo
    } = this.props;
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      setUserPrefInDB({ ...UserPrefInfo, currency: Number(value) }, () => { })
      setUserPrefInLocal({ currency: Number(value) })
    } else {
      setUserPrefInLocal({ currency: Number(value) })
    }
  }

  handleSelectCountry = (countryObj = {}) => {
    const { getBatchInfo } = this.props;
    const {
      currency,
      country
    } = countryObj;
    const { courseID, countryID } = this.batchAPIReqInfo()
    this.setState({
      selectedCurrencyId: currency,
      countryID
    })
    getBatchInfo({ courseID, countryID: country }, () => {});
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

  handleEnroll = (batchId, courseId, courseGroupId, bussinessUnit, id, unique_title) => {
    const {
      courseDetails
    } = this.props;
    const { is_freecourse } = courseDetails.course || {};
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
      'batch_id': batchId
    }
    if (is_freecourse) {
      if (authService.isAuthenticated()) {
        this.handleFreeCourseEnroll(orderPayload);
      } else {
        this.setState({
          modalObj: { currentStatus: 'signIn', isModalOpen: true }
        })
      }
    } else {
      this.handleOrderInfo({ ...orderPayload, 'selected_free_course_id': null })
    }
  }

  handleOrderInfo (orderPayload) {
    const { getOrderDetails, clearOrderSummayInfo } = this.props;
    clearOrderSummayInfo({}, () => { })
    getOrderDetails(orderPayload, (response) => {
      this.handleOrderView(response)
    })
  }

  handleFreeCourseEnroll (freeCoursePayload) {
    const { freeCourseEnroll, history } = this.props;
    freeCourseEnroll(freeCoursePayload, (response) => {
      const { data = {}, status } = response || {};
      if (status === 200) {
        const { message = GENERIC_ERR } = data || {}
        messageFn(message, SUCCESS)
        history.push('/my-courses');
      } else {
        const { message = GENERIC_ERR } = data || {}
        messageFn(message, WARNING)
      }
    })
  }

  handleOrderView (response) {
    const { history } = this.props;
    history.push('/order-summary');
  }

  togglePreferenceModal () {
    this.setState(state => ({
      showPreferenceModal: !state.showPreferenceModal
    }))
  }

  /* autnetication code section starts here ... */
  signIn () {
    this.setState({
      modalObj: { currentStatus: 'signIn', isModalOpen: true }
    })
  }

  signUp () {
    this.setState({
      modalObj: { currentStatus: 'signUp', isModalOpen: true }
    })
  }

  forgotPassword () {
    this.setState(state => ({
      modalObj: { ...state.modalObj, currentStatus: 'forgotPass' }
    }))
  }

  handleClose () {
    const { history } = this.props || {};
    const { location: { pathname } } = history;
    if (!authService.isAuthenticated() &&
     (isAuthenticatedRoute(pathname) || isPrivateRoute(pathname))) {
      history.push('/');
    }
    this.setState({
      modalObj: { currentStatus: '', isModalOpen: false }
    })
  }

  handleForgetClose () {
    this.setState({
      modalObj: { currentStatus: '', isModalOpen: false }
    })
  }

  handleChangePassword () {
    this.setState({
      changePassModal: true
    })
  }

  handleChangePassClose () {
    this.setState({
      changePassModal: false
    })
  }

  showSearch () {
    const { location: { pathname } } = this.props;
    return !pathname.startsWith('/class-room/')
  }

  renderModalBody () {
    const { modalObj = {} } = this.state
    const { currentStatus } = modalObj
    switch (currentStatus) {
      case 'signIn':
        return (
          <RegestrationSignInSection
            onRegister={this.register}
            callSignUp={() => this.signUp()}
            forgotPassword={() => this.forgotPassword()}
            handleClose={() => this.handleClose()}
          />
        )
      case 'signUp':
        return (
          <RegestrationSignUpSection
            onRegister={this.register}
            callSignIn={() => this.signIn()}
            handleClose={() => this.handleClose()}
            refferalCode=""
          />
        )
      case 'forgotPass':
        return (
          <ForgotPassword handleForgetClose={() => this.handleForgetClose()} />
        )
      default:
        return null
    }
  }
  /* autnetication code section Ends here .... */

  render () {
    const {
      courseDetails,
      offerInfo
    } = this.props;
    const {
      showPreferenceModal,
      currencyDetails,
      selectedCurrencyId,
      modalObj,
      changePassModal
    } = this.state;
    const { isModalOpen } = modalObj
    const {
      course_group_id, id,
      unique_title, is_freecourse
    } = courseDetails.course || {};

    const { offer_banner = {} } = offerInfo;
    const { end_date } = offer_banner

    const {
      isPriceSame,
      currencySymbol,
      currencyId,
      discounted_price,
      actual_course_price
    } = this.getRequiredInfo()

    return (
      <>
        <div className="mb-4 course-sneak-price">
          <div>
            <h2 className={classnames('annexure-tab mb-2', { free_course: is_freecourse })}>
              {is_freecourse ? 'Free course' : (
                <>
                  {currencySymbol}
                  {((discounted_price && discounted_price.toLocaleString()) || '--') }
                </>
              )}
              {!isPriceSame && (
                <s className="actual-price text-gray mx-2 font-weight-normal">
                  {currencySymbol}
                  {(actual_course_price && actual_course_price.toLocaleString()) || '--'}
                </s>
              )}
            </h2>

            { !is_freecourse && (
              <button className="btn btn-link btn-sm px-0" type="button" onClick={() => this.togglePreferenceModal()}>
              Change Currency
              </button>
            )}
          </div>
          {!is_freecourse && (
          <>
            <div className="price-info text-success small pt-1">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
            Lowest price ever in the market
            </div>

            {currencyId === 1 && (
              <div className="price-info text-warning small pt-1" title="See option during the payment">
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
              EMI option also available
              </div>
            )}
            {end_date && (
              <div className="offer-expiry text-danger small pt-1 d-flex">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                <div>
                  <span className="mr-1">Offer expires in</span>
                  <DateCountdown className="pt-4" dateTo={end_date} callback={() => {}} mostSignificantFigure="day" />
                </div>
              </div>
            )}
          </>
          )}

          <div className="d-flex mt-3 sneak-query justify-content-center">
            <span>
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 text-primary" />
            </span>
            <div className="ml-2 pl-3 d-flex flex-column pl-1 sneak-contact-sec">
              <small>
              Have Queries? &nbsp; Talk to us
              </small>
              <a href="tel:+91-8951066177">+91-8951066177</a>
            </div>

          </div>
          <div className="mt-4 text-center price-enroll">
            <button
              type="button"
              className="btn btn-theme btn-md btn-block"
              onClick={() => this.handleEnrollRedirect(null,
                id, course_group_id, 1, 1, unique_title)}
            >
              {'Enroll Now'}
            </button>
          </div>
        </div>
        <Modal
          isOpen={showPreferenceModal}
          toggle={() => this.togglePreferenceModal()}
          className="modal-dialog-centered modal-bg-white currency-change-modal"
        >
          <ModalHeader toggle={() => this.togglePreferenceModal()}>
            Change Currency
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col className="batch-country" lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 6 }}>
                <CountryDropDown
                  onSelectCountry={this.handleSelectCountry}
                  isPhoneCode={false}
                />
              </Col>
              <Col className="curreny-dropdown" lg={{ size: 5 }} md={{ size: 5 }} xs={{ size: 6 }}>
                <select className="form-control" onChange={e => this.handleCurrency(e)} value={selectedCurrencyId}>
                  {currencyDetails.map(currency => (
                    <option value={currency.currency_id}>
                      {`${currency.currency_symbol}  ${currency.currency}`}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.togglePreferenceModal()}>Close</Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={isModalOpen}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          {this.renderModalBody()}
        </Modal>
        <Modal
          isOpen={changePassModal}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          <ChangePassword handleClose={() => this.handleChangePassClose()} />
        </Modal>
      </>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  getBatchInfo: (payload, cb) => {
    dispatch(batchInfoAction(payload, cb));
  },
  getCurrencyDetails: (payload, cb) => {
    dispatch(currencyDetailsAction(payload, cb));
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb));
  },
  getOrderDetails: (payload, cb) => {
    dispatch(orderSummaryAction(payload, cb));
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
  },
  freeCourseEnroll: (payload, cb) => {
    dispatch(freeCourseEnrollAction(payload, cb));
  }
});

export const mapStateToProps = state => ({
  offerInfo: state.offerReducer,
  UserPrefInfo: state.UserPrefInfo,
  batchInfo: state.batchInfo
});

CardBatchDetails.propTypes = {
  courseDetails: PropTypes.isRequired,
  getOrderDetails: PropTypes.func.isRequired,
  offerInfo: PropTypes.shape({}).isRequired,
  history: PropTypes.isRequired,
  setGlobalDetails: PropTypes.func.isRequired,
  getCurrencyDetails: PropTypes.func.isRequired,
  getBatchInfo: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  setUserPrefInDB: PropTypes.func.isRequired,
  setUserPrefInLocal: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  clearOrderSummayInfo: PropTypes.func.isRequired,
  freeCourseEnroll: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CardBatchDetails);
