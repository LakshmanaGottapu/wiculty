import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Sticky from 'react-stickynode';
import {
  Collapse, InputGroup, Modal, Nav, Navbar
} from 'reactstrap';
import globalDataAction from '../../../Actions/globalDataAction';
import dataClearAction from '../../../Actions/logout/dataClearAction';
import logoutAction from '../../../Actions/logout/logoutAction';
import batchInfoAction from '../../courseDetails/batchDetails/batchInfoAction';
import menuBar from '../../../img/nav-menu-bar.svg';
// redux actions import end
// services import start
import authService from '../../../services/authService';
import OfferBannerSection from '../../banner/banner';
import bannerOffer from '../../banner/bannerAction';
import SpecialOffer from '../../banner/specialOffer';
import courseDetails from '../../courseDetails/courseDetailsAction';
import { IMAGES } from '../../locales/images';

// authentication code start
import ForgotPassword from '../../registration/forgotPassword';
import RegestrationSignInSection from '../../registration/registration-signIn';
import RegestrationSignUpSection from '../../registration/registration-signUp';
import SessionExpForm from '../../session_handle/sessionExpireForm';
import ChangePassword from '../changePassword';
import { isAuthenticatedRoute, isPrivateRoute, filterInstrLedCourse } from '../utilFunctions/utilFunction';
// authentication code End

import sf from '../safeTraverse';
import SuggestCoursePopup from '../suggestCoursePopup/suggestCoursePopup';

import './navBar.scss';
import NavBarMenu from './navBarMenu';
// import TechPreferenceForm from '../../profile/techPreference/techPreferenceForm';

// redux actions import start
import searchAction from './searchAction';
import searchHint from './searchHintAction';
import profileAction from '../../profile/profileAction'
import SideBar from './sideBar';

function formattedCourseslist (courselist) {
  const formattedlist = courselist.reduce(
    (acc, item) => acc.concat({
      course_id: item.id,
      title: item.display_title,
      course_slug: item.course_slug
    }),
    []
  )
  return Array.from(new Set(formattedlist))
}

class NavbarComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selected: [],
      respOptions: [],
      query: '',
      profileOpen: false,
      modalObj: {},
      showSuggestCourse: false,
      allowNew: false,
      isCategorySideBar: false,
      isSpecialOffer: false,
      isOffer: true,
      OpenCommunity: false
    }
    this.toggle = this.toggle.bind(this);
    this.register = this.register.bind(this);
    window.scroll(0, 0);
  }

  static getDerivedStateFromProps (props, state) {
    const { profileDetails } = props || {}
    const userDetails = sf(profileDetails, ['data', 'data', 'user']) || {};
    return {
      userDetails
    }
  }

  componentDidMount () {
    document.addEventListener('mousedown', this.handleClickOutside);
    const { getProfileDetails, profileDetails } = this.props;
    const userDetails = sf(profileDetails, ['data', 'data', 'user']) || {};
    if (!userDetails.user && authService.isAuthenticated()) {
      getProfileDetails({}, () => {})
    }
  }

  componentWillUnmount () {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  getIconName = () => {
    const { profileDetails } = this.props || {}
    const userDetails = sf(profileDetails, ['data', 'data', 'user'])
      ? profileDetails.data.data.user
      : {}
    const { first_name = '', last_name = '' } = userDetails
    const firstName = (first_name && first_name.split('')[0]) || ''
    const lastName = (last_name && last_name.split('')[0]) || ''
    const iconName = `${firstName}${lastName}`
    return iconName.toUpperCase()
  }

  toExt = (link) => {
    window.open(link, '_blank')
  }

  showAvailableCourse = (input, e) => {
    const { availablecoursesList } = this.props;
    const uniqueCourseList = formattedCourseslist(availablecoursesList)
    this.setState({ respOptions: uniqueCourseList })
  }

  onKeyStrike = (input, e) => {
    const { getSearchHints, availablecoursesList } = this.props;
    const suggestArray = [
      {
        course_slug: null,
        title: 'Suggest a Course'
      }
    ]

    this.setState({ query: input })

    getSearchHints({ query: input }, (res) => {
      const courselist = sf(res, ['data', 'data', 'courses', 'list']) || [];
      const orderedCourselist = formattedCourseslist(courselist);
      let uniqueCourseList = []
      let allowNew = true
      if (orderedCourselist.length > 0) {
        uniqueCourseList = orderedCourselist
        allowNew = false
      } else {
        uniqueCourseList = input
          ? suggestArray
          : formattedCourseslist(availablecoursesList)
      }
      this.setState({
        respOptions: uniqueCourseList,
        allowNew
      })
    })
  }

  onValueChange = (input, e) => {
    const { history } = this.props;
    if (input.length > 0) {
      if (input[0].course_slug) {
        const { getCourseDetails, getBatchInfo, UserPrefInfo } = this.props;
        const { country = 1 } = UserPrefInfo;
        const [selectedCourse] = input;
        const { title, course_slug, course_id } = selectedCourse
        this.setState({ query: title })

        // course details API call
        getCourseDetails({ courseSlug: course_slug }, (data) => {
          history.push(`/${course_slug}`);
        })
        getBatchInfo({ courseID: course_id, countryID: country }, () => {});
      } else {
        this.setState({
          showSuggestCourse: true
        })
      }
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const { getSearchResults } = this.props
      const { query } = this.state
      getSearchResults(query, (data) => {
        const { history } = this.props
        history.push({
          pathname: `/search/${query}`
        })
      })
    }
  }

  handleCategoryClick =(pathname) => {
    const { history } = this.props
    this.setState({
      isCategorySideBar: false
    })
    history.push(pathname)
  }

  toggleCategoryPanel =() => {
    this.setState(state => ({
      isCategorySideBar: !state.isCategorySideBar
    }))
  }

  handleProfile = () => {
    this.setState(prevState => ({
      profileOpen: !prevState.profileOpen
    }))
  }

  handleCommunity = () => {
    this.setState(prevState => ({
      OpenCommunity: !prevState.OpenCommunity
    }))
  }

  handleLogout = () => {
    const { history, dataClear } = this.props
    dataClear();
    authService.signOut(history)
  }

  register () {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  suggest () {
    this.setState(prevState => ({
      showSuggestCourse: !prevState.showSuggestCourse
    }))
  }

  toggle () {
    this.setState(state => ({
      isOpen: !state.isOpen
    }))
  }

  handleSuggestClose () {
    this.setState({
      showSuggestCourse: false
    })
  }

  handleLogoClick () {
    const { history } = this.props
    history.push('/')
    window.scroll(0, 0)
  }

  handleOfferClose () {
    this.setState({
      isOffer: false
    })
  }

  handleSpecialOfferClose () {
    this.setState({
      isSpecialOffer: false
    })
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
      respOptions,
      isOpen,
      selected,
      profileOpen,
      showSuggestCourse,
      allowNew,
      isCategorySideBar,
      changePassModal,
      modalObj = {},
      isSpecialOffer,
      isOffer,
      userDetails,
      OpenCommunity
    } = this.state
    const { isModalOpen } = modalObj

    const { offerInfo, allEvents } = this.props || {};
    const { first_name, last_name, profile_image } = userDetails;
    const { offer_banner = {} } = offerInfo
    const isOfferBaner = Object.keys(offer_banner).length;
    return (
      <Sticky enabled top={0} bottomBoundary={12000} innerZ={1000}>
        <div>
          {isOffer ? <OfferBannerSection handleOfferClose={() => this.handleOfferClose()} /> : ''}
          {isSpecialOffer ? <SpecialOffer handleSpecialOfferClose={() => this.handleSpecialOfferClose()} /> : ''}
          <Navbar
            expand="md"
            className={
              isOfferBaner
                ? 'customNavbar customNav with-banner'
                : 'customNav customNavbar without-banner'
            }
          >
            {process.env.REACT_APP_MODE === 'TEST' && (
              <div className="testInProgress">
                <p>Test Mode</p>
              </div>
            )}
            <span
              className="nav-menu-bar d-md-block d-lg-none m-2"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={this.toggleCategoryPanel}
            >
              <img src={menuBar} alt="menuBar" />
            </span>
            <Link id="wiculty-logo" onClick={() => this.handleLogoClick()}> {/* eslint-disable-line */}
              <img
                src={`${IMAGES.WICULTYLOGO}`}
                alt="logo"
                className="wiculty-logo"
              />
            </Link>
            <SideBar
              isCategorySideBar={isCategorySideBar}
              handleLogout={this.handleLogout}
              signIn={() => this.signIn()}
              handleCategoryClick={this.handleCategoryClick}
              handleChangePassword={() => this.handleChangePassword()}
              toggleCategoryPanel={this.toggleCategoryPanel}
              profile_image={profile_image}
              userDetails={userDetails}
              first_name={first_name}
              getIconName={this.getIconName}
            />
            <Collapse className="nav-search mt-2 mt-md-0" isOpen={isOpen} navbar>
              <Nav className={this.showSearch() ? 'searchNavbar navbar' : 'searchNavbar navbar d-none d-sm-block'}>
                <InputGroup>
                  <Typeahead
                    className="searchTextArea"
                    placeholder="Enter course or keyword"
                    id="tyrpo"
                    labelKey={option => `${option.title}`}
                    onInputChange={this.onKeyStrike}
                    onChange={this.onValueChange}
                    onKeyDown={this.handleKeyDown}
                    options={respOptions}
                    selected={selected}
                    onFocus={this.showAvailableCourse}
                    isLoading
                    disabled={false}
                    allowNew={allowNew}
                    newSelectionPrefix="Suggest a Course: "
                  />
                  <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                </InputGroup>
              </Nav>
              <NavBarMenu
                last_name={last_name}
                handleLogout={this.handleLogout}
                signIn={() => this.signIn()}
                toggleCategoryPanel={this.toggleCategoryPanel}
                handleCategoryClick={this.handleCategoryClick}
                getIconName={this.getIconName}
                handleProfile={this.handleProfile}
                profileOpen={profileOpen}
                OpenCommunity={OpenCommunity}
                handleCommunity={this.handleCommunity}
                profile_image={profile_image}
                userDetails={userDetails}
                first_name={first_name}
                allEvents={allEvents}
              />
            </Collapse>
          </Navbar>
        </div>
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
        <SessionExpForm
          handleLogout={this.handleLogout}
          callSignIn={() => this.signIn()}
          first_name={first_name}
        />
        {/* {authService.isAuthenticated() && <TechPreferenceForm />} */}

        <SuggestCoursePopup
          isOpen={showSuggestCourse}
          onRegister={this.register}
          callSignUp={() => this.signUp()}
          handleSuggestClose={() => this.handleSuggestClose()}
        />
      </Sticky>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getSearchResults: (payload, cb) => {
    dispatch(searchAction(payload, cb))
  },
  getCourseDetails: (payload, cb) => {
    dispatch(courseDetails(payload, cb))
  },
  getSearchHints: (payload, cb) => {
    dispatch(searchHint(payload, cb))
  },
  setGlobalDetails: (payload, cb) => {
    dispatch(globalDataAction(payload, cb))
  },
  dataClear: () => {
    dispatch(dataClearAction())
  },
  logOut: () => {
    dispatch(logoutAction())
  },
  getOfferDetails: (payload, cb) => {
    dispatch(bannerOffer(payload, cb))
  },
  getBatchInfo: (payload, cb) => {
    dispatch(batchInfoAction(payload, cb));
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb))
  }
})

const mapStateToProps = state => ({
  profileDetails: state.profileDetails,
  offerInfo: state.offerReducer,
  UserPrefInfo: state.UserPrefInfo,
  availablecoursesList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || []),
  allEvents: state.allEvents
})

NavbarComponent.defaultProps = {
  availablecoursesList: []
}

NavbarComponent.propTypes = {
  getSearchResults: PropTypes.func.isRequired,
  getCourseDetails: PropTypes.func.isRequired,
  history: PropTypes.isRequired,
  dataClear: PropTypes.func.isRequired,
  getSearchHints: PropTypes.func.isRequired,
  availablecoursesList: PropTypes.arrayOf(PropTypes.object),
  location: PropTypes.shape({}).isRequired,
  getBatchInfo: PropTypes.func.isRequired,
  UserPrefInfo: PropTypes.shape({}).isRequired,
  profileDetails: PropTypes.shape({}).isRequired,
  getProfileDetails: PropTypes.func.isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarComponent)
)
