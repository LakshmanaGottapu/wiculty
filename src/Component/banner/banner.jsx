import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import DateCountdown from 'react-date-countdown-timer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import bannerOffer from './bannerAction';
import sf from '../common/safeTraverse';
import userPrefAction from '../userPrefInfo/Get_UP_Action';

class OfferBannerSection extends Component {
  constructor (props) {
    super(props);
    this.state = {
      offerInfo: []
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { offerInfo } = props || {};
    return {
      offerInfo
    }
  }

  componentDidMount () {
    const {
      getOfferDetails,
      UserPrefInfo = {},
      fetchUserPref
    } = this.props;
    if (UserPrefInfo.country) {
      const { country } = UserPrefInfo
      getOfferDetails({ countryID: country }, () => {});
    } else {
      fetchUserPref({}, (resp) => {
        const UR_info = sf(resp, ['data', 'data']) || {}
        if (resp.status === 200) {
          const { country } = UR_info
          getOfferDetails({ countryID: country }, () => {});
        }
      })
    }
  }

  removeBanner = () => {
    const { clearOfferBanner } = this.props;
    clearOfferBanner();
    this.setState({
      offerInfo: {}
    })
  }

  showBanner = () => {
    const { location: { pathname } } = this.props;
    return !pathname.startsWith('/class-room/')
  }

  render () {
    const { offerInfo = {} } = this.state;
    const { offer_banner = {} } = offerInfo;
    const { discription, title, end_date } = offer_banner
    const isOfferBaner = Object.keys(offer_banner).length;
    const { handleOfferClose } = this.props;
    return (
      <React.Fragment>
        <Container fluid id="offer-banner" className={(isOfferBaner && this.showBanner()) ? 'offerBannersec offer-banners p-1' : 'd-none offer-banner'}>
          {/* <FontAwesomeIcon
            icon={faTimesCircle}
            className="bannerClose"
            onClick={this.removeBanner}
          /> */}
          <Container>
            <Row>
              <Col lg="12" sm="12" className="banner-container">
                <div className="offerBannerText">
                  <p>
                    {title}
                    {' - '}
                    <span className="offer-title">{discription}</span>
                    {' : '}
                    { isOfferBaner ? <DateCountdown dateTo={end_date} callback={() => {}} mostSignificantFigure="day" /> : '' }
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="bannerClose c-p"
            onClick={() => handleOfferClose()}
          />
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOfferDetails: (payload, cb) => {
    dispatch(bannerOffer(payload, cb));
  },
  clearOfferBanner: () => {
    dispatch({ type: 'CLEAR_OFFER_BANNER', payload: {} });
  },
  fetchUserPref: (payload, cb) => {
    dispatch(userPrefAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  offerInfo: state.offerReducer,
  UserPrefInfo: state.UserPrefInfo
});

OfferBannerSection.propTypes = {
  getOfferDetails: PropTypes.func.isRequired,
  clearOfferBanner: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
  handleOfferClose: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OfferBannerSection));
