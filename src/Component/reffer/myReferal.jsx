import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Row, Col, Table, Container, Modal
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn, faTv, faWallet, faDollarSign
} from '@fortawesome/free-solid-svg-icons';

import CourseCards from '../card/coursecard';
import referalDetails from '../registration/referalAction';
import sf from '../common/safeTraverse';
import { IMAGES } from '../locales/images';
import { getBannerMarginTop, getDenomination, filterInstrLedCourse } from '../common/utilFunctions/utilFunction';
import messageFn from '../common/message'

import RegestrationSignInSection from '../registration/registration-signIn';
import RegestrationSignUpSection from '../registration/registration-signUp';
import ForgotPassword from '../registration/forgotPassword';
import authService from '../../services/authService';

import './reffer.scss';
/* componet imports */
import RedeemForm from './redeemForm';
import InternationRedeemForm from './internationalRedeemForm';
import redeemAction from './redeemAction';
import SeoContentComp from '../common/seoContentComp';

import { MESSAGES } from '../locales/locale'

const {
  ERROR: { GENERIC_ERR }, REDEEM_TITLE, REDEEM_SUCCESS,
  TOASTER_STATUS: { SUCCESS, ERROR }
} = MESSAGES

class Reffer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      courses: [],
      reffInfo: {},
      isLoading: false,
      modalObj: { },
      paymentModeObj: {}
    };
    window.scroll(0, 0);
  }

  componentDidMount () {
    const isAuthenticated = authService.isAuthenticated();
    const { currencyID } = this.state;
    if (isAuthenticated) {
      const { getRefferalDetails } = this.props;
      getRefferalDetails({ currencyID }, (resp) => { })
    } else {
      this.setState({
        modalObj: { currentStatus: 'signIn', isModalOpen: true }
      });
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { homeCourses, refferalInfo, UserPrefInfo } = props || {}
    const reffInfo = sf(refferalInfo, ['data', 'data']) || {};
    let courses = sf(homeCourses, ['data']) || [];
    courses = filterInstrLedCourse(courses);
    const { currency = 1 } = UserPrefInfo;
    if (reffInfo) {
      return {
        courses,
        reffInfo,
        currencyID: currency
      }
    }
    return null
  }

  handleRedeem = () => {
    const { UserPrefInfo } = this.props || {}
    const { currency = 1 } = UserPrefInfo;
    const paymentMode = currency === 1 ? 'intra' : 'inter';
    this.setState({
      paymentModeObj: { isRedeemOpen: true, paymentMode }
    })
  }

  redeemFormClose = () => {
    this.setState({
      paymentModeObj: { isRedeemOpen: false, paymentMode: '' }
    })
  }

  handleRedeemSubmit = (redeemData) => {
    const { redeemWalletSubmit, getRefferalDetails } = this.props;
    const { currencyID } = this.state;
    const redeemObj = { ...redeemData, currency_id: currencyID }
    this.setState({
      isLoading: true
    })
    redeemWalletSubmit({ redeemObj }, (resp = {}) => {
      const { data = {}, status } = resp;

      if (data && status === 200) {
        getRefferalDetails({ currencyID }, () => {
          messageFn(REDEEM_SUCCESS, SUCCESS)
          this.setState({
            isLoading: false,
            paymentModeObj: { isRedeemOpen: false, paymentMode: '' }
          })
        })
      } else if (status === 401) {
        this.setState({
          isLoading: false,
          paymentModeObj: { isRedeemOpen: false, paymentMode: '' }
        })
      } else {
        const { message = GENERIC_ERR } = data
        messageFn(message, ERROR)
        this.setState({
          isLoading: false
        })
      }
    })
  }

  /* autnetication code section starts here ... */
  signIn () {
    this.setState({
      modalObj: { currentStatus: 'signIn', isModalOpen: true }
    });
  }

  signUp () {
    this.setState({
      modalObj: { currentStatus: 'signUp', isModalOpen: true }
    });
  }

  forgotPassword () {
    this.setState(state => ({
      modalObj: { ...state.modalObj, currentStatus: 'forgotPass' }
    }));
  }

  handleClose (type) {
    const { history } = this.props || {};
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      this.setState({
        modalObj: { currentStatus: '', isModalOpen: false }
      });
    } else {
      history.push('/refer-earn')
    }
  }

  renderModalBody () {
    const {
      modalObj = {}
    } = this.state;
    const { currentStatus } = modalObj;
    const { refferalCode } = this.state;
    switch (currentStatus) {
      case 'signIn':
        return (
          <RegestrationSignInSection
            onRegister={this.register}
            callSignUp={() => this.signUp()}
            forgotPassword={() => this.forgotPassword()}
            handleClose={() => this.handleClose('signIn')}
          />
        );
      case 'signUp':
        return (
          <RegestrationSignUpSection
            onRegister={this.register}
            callSignIn={() => this.signIn()}
            handleClose={() => this.handleClose('signUp')}
            refferalCode={refferalCode}
          />
        );
      case 'forgotPass':
        return (
          <ForgotPassword
            handleForgetClose={() => this.handleClose('forgot')}
          />
        );
      default:
        return null;
    }
  }

  /* autnetication code section Ends here .... */
  renderRedeemForm () {
    const { paymentModeObj = {}, reffInfo } = this.state
    const { paymentMode } = paymentModeObj;
    const { wallet = {} } = reffInfo || {};
    switch (paymentMode) {
      case 'intra':
        return (
          <RedeemForm
            handleClose={this.redeemFormClose}
            handleRedeem={this.handleRedeemSubmit}
            wallet={wallet}
          />
        )
      case 'inter':
        return (
          <InternationRedeemForm
            handleClose={this.redeemFormClose}
            handleRedeem={this.handleRedeemSubmit}
            wallet={wallet}
          />
        )
      default:
        return null
    }
  }

  render () {
    const {
      courses,
      reffInfo,
      modalObj = {},
      paymentModeObj,
      isLoading
    } = this.state;
    const { isModalOpen } = modalObj;
    const { isRedeemOpen } = paymentModeObj;
    const { wallet = {}, referrals = [], info = '--' } = reffInfo || {};

    return (
      <React.Fragment>
        <SeoContentComp seoKey="reffer-earn" />
        {isLoading && <div className="loading" />}

        {/* login forms code */}
        <Modal
          isOpen={isModalOpen}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          {this.renderModalBody()}
        </Modal>

        {/* Redeem forms code */}
        <Modal
          isOpen={isRedeemOpen}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          {this.renderRedeemForm()}
        </Modal>

        <div fluid className="reffer-conatiner" style={{ marginTop: getBannerMarginTop(0, 100) }}>
          <div className="header-section" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.REFFERAL_BANNER})` }}>
            <div id="tag-line" className="d-none">
              <p>
                {'Refer and Earn'}
              </p>
              <p>
                {'Wiculty Refer & Earn | Weave a potential loom to upskill through us'}
              </p>
            </div>
          </div>
          <Row className="refferTitle">
            <p>
              {'Wiculty Wallet | Track all your earning conversions here'}
            </p>
          </Row>
          <Row className="earningTracker">
            <Col lg="2" className="earnings">
              <p className="pb-4 bb-white">
                {`Referral Code : ${info}`}
              </p>
              <p>
                {'Wallet Cash'}
              </p>
              <p>
                { `${wallet.currency || '₹'} ${getDenomination(wallet.amount) || '0'}`}
              </p>
              <button type="button" className="btn btn-primary btn-sm mb-2 d-none" onClick={this.handleRedeem} disabled={!wallet.amount} title={!wallet.amount && REDEEM_TITLE}>Redeem wallet</button>
            </Col>
            <Col lg="10" className="listing">
              <h4>
                {'Total sharing status'}
              </h4>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map(item => (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
          <Container className="mt-4">
            <Row className="mt-4">
              <Col sm="12 text-center mb-4">
                <h2 className="mb-0">
                  Grab Instant cash rewards
                </h2>
                <p className="ft22">Start sharing our courses across social media Now</p>
              </Col>
              <Col className="mt-2">
                <Row className="refer-earn-steps">
                  <Col sm="12" className="hover-card-right p-4">
                    <div className="media">
                      <FontAwesomeIcon icon={faBullhorn} className="mr-3" />
                      <div className="media-body">
                        <h5 className="mt-0">Share our Course</h5>
                        Start to share our courses across social media - create a shout among your
                        community to get upskilled through Wiculty.
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" className="hover-card-right p-4">
                    <div className="media">
                      <FontAwesomeIcon icon={faTv} className="mr-3" />
                      <div className="media-body">
                        <h5 className="mt-0">Tracking / Monitoring</h5>
                        Our system is highly capable of tracking the lead routes after
                        the purchase with us to add cash rewards against the source referee’s link
                        share.
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" className="hover-card-right p-4">
                    <div className="media">
                      <FontAwesomeIcon icon={faWallet} className="mr-3" />
                      <div className="media-body">
                        <h5 className="mt-0">Wiculty Wallet</h5>
                        Get all your cash rewards saved in the W-wallet that can be debited to
                        your bank account against every conversion through the link route.
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" className="hover-card-right p-4">
                    <div className="media">
                      <FontAwesomeIcon icon={faDollarSign} className="mr-3" />
                      <div className="media-body">
                        <h5 className="mt-0">Earnings Dashboard</h5>
                        Get to know all your earnings on the personal dashboard against each
                        learner joined us through the link shared on different social media
                        platforms.
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>

          <Row className="referText">
            <h2 className="title">
              {'Pick a Course - Share it - Once converted - Fill your wallet'}
            </h2>
            {(courses.length) > 0 ? (
              <Container fluid className="freeCourseSec">
                <Row className="freeCourseSecAlgn">
                  <Col lg="12" xl="12" className="freeCourseSecCardAlgn">
                    <Row className="justifyCenter refer-course-cards">
                      <React.Fragment>
                        {courses.map(item => (
                          <CourseCards
                            title={item.course_title}
                            is_selfpaced={item.is_selfpaced}
                            course_image={item.course_image}
                            short_description={item.short_description}
                            course_slug={item.course_slug}
                            unique_title={item.unique_title}
                            isFree
                            courseHighlighter={item.course_highlighter}
                            promoCode={reffInfo.info}
                            isSharable="true"
                            courseInfo={item}
                            shareUrl={`${process.env.REACT_APP_BASE_URL}${item.course_slug}?promo=${reffInfo.info}`}
                            {...this.props}
                          />
))} {/*eslint-disable-line */}
                      </React.Fragment>
                    </Row>
                  </Col>
                </Row>
              </Container>
            ) : ''}
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  seoContent: state.seoContent,
  homeCourses: state.homeCourses,
  refferalInfo: state.refferalInfo,
  globalDetails: state.globalDetails,
  UserPrefInfo: state.UserPrefInfo
});

const mapDispatchToProps = dispatch => ({
  getRefferalDetails: (payload, cb) => {
    dispatch(referalDetails(payload, cb));
  },
  redeemWalletSubmit: (payload, cb) => {
    dispatch(redeemAction(payload, cb));
  }
});

Reffer.defaultProps = {
  currencyID: 1
};

Reffer.propTypes = {
  seoContent: PropTypes.isRequired,
  getRefferalDetails: PropTypes.func.isRequired,
  redeemWalletSubmit: PropTypes.func.isRequired,
  globalDetails: PropTypes.isRequired,
  currencyID: PropTypes.bool,
  UserPrefInfo: PropTypes.shape({}).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reffer));
