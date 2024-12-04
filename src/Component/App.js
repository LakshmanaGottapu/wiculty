import React, { Component, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect, withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import NavbarComponent from './common/navbar/navbar';
import Footer from './common/footer';
import CareerAssfooter from './common/careerAssistantFooter';
import CourseDetailsContainer from './courseDetails/courseDetailsContainer';
// import ContactPopUp from './common/contactPopup/contactpopup';
import MobileActions from './common/mobileActions/mobileActions';
import ScrollButton from './common/scrollButton';

// Action services
import authService from '../services/authService';
import homeAction from './landing/homePageContent/homeAction';
import userPrefAction from './userPrefInfo/Get_UP_Action';
import countryDdAction from './country_dropdown/countryDdAction';
import globalDataAction from '../Actions/globalDataAction';

import { getRoutes } from './routes/index';

// packages
import 'lazysizes';

// stylesheets
import ReactLazyLoadingScreen from './common/lazyLoading/lazyLoading';
import './App.scss'
import '../stylesheets/whitelist.scss';
import '../stylesheets/animate.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      privateRoutes: false,
      currentPage: 'showFooter'
    }
  }

  static getDerivedStateFromProps (props, state) {
    const { globalDetails = {} } = props || {};
    const { privateRoutes, currentPage } = globalDetails;
    if (privateRoutes || currentPage) {
      return {
        privateRoutes,
        currentPage
      }
    }
    return null
  }

  componentDidMount () {
    const {
      getHomeContent,
      fetchUserPref, setGlobalData,
      fetchCountryList, UserPrefInfo = {}
    } = this.props;
    getHomeContent({}, () => {})
    fetchCountryList('country', () => {
      if (!Object.keys(UserPrefInfo).length) {
        fetchUserPref({}, () => {})
      }
    })
    const { location: { pathname = '' } } = window || {};
    const currentPage = pathname.startsWith('/class-room') ? 'hideFooter' : 'showFooter';
    setGlobalData({ currentPage }, (resp) => {})
  }

  render () {
    const { privateRoutes, currentPage } = this.state;
    const isAuthenticated = authService.isAuthenticated()
    const reload = () => window.location.reload();
    return (
      <div className="main-app">
        <ScrollButton />
        <Router>
          <div className="app-container">
            <NavbarComponent />
            <Helmet>
              <title>Wiculty</title>
              <meta charSet="utf-8" />
              <meta name="description" content="Wiculty learning app" />
            </Helmet>
            <Suspense fallback={<ReactLazyLoadingScreen />}>
              <Switch>
                {getRoutes(isAuthenticated, privateRoutes)}
                <Route exact path="/:courseSlug" component={CourseDetailsContainer} />
                <Route path="/robots.txt" onEnter={reload} />
                <Route path="/sitemap.xml" onEnter={reload} />
                <Redirect to="/404" />
              </Switch>
            </Suspense>
            {currentPage === 'showFooter' && <Footer {...this.props} />}
            {currentPage === 'showFooter' && <CareerAssfooter {...this.props} />}
            {/* <ContactPopUp /> */}
            <MobileActions />
          </div>
        </Router>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getHomeContent: (payload, cb) => {
    dispatch(homeAction(payload, cb));
  },
  fetchUserPref: (payload, cb) => {
    dispatch(userPrefAction(payload, cb));
  },
  fetchCountryList: (payload, cb) => {
    dispatch(countryDdAction(payload, cb));
  },
  setGlobalData: (payload, cb) => {
    dispatch(globalDataAction(payload, cb));
  }
});

const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  UserPrefInfo: state.UserPrefInfo
});

App.propTypes = {
  getHomeContent: PropTypes.func.isRequired,
  fetchUserPref: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  fetchCountryList: PropTypes.func.isRequired,
  location: PropTypes.shape({}).isRequired,
  setGlobalData: PropTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
