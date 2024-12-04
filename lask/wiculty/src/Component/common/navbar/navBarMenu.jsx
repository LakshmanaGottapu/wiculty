import React from 'react';
import {
  Nav,
  NavItem,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser, faSignOutAlt, faShoppingCart, faChalkboardTeacher,
  faUserCog, faHeart
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import {
  getCapitalisedName
} from '../utilFunctions/utilFunction';
// services import start
import authService from '../../../services/authService'
// services import start

const NavBarMenu = ({
  handleLogout, signIn, getIconName,
  handleCategoryClick, handleProfile, profileOpen,
  first_name, last_name, profile_image, userDetails
}) => (
  <Nav className="ml-auto nav-route-items" navbar>
    <NavItem className="nav-link">
      <Link to={authService.isAuthenticated() ? '/my-referal' : '/refer-earn'}>
        Refer & Earn
      </Link>
    </NavItem>
    <NavItem className="nav-link">
      <Link to="/events">Demos | Webinars</Link>
    </NavItem>
    <NavItem className="nav-link">
      <Link to="/instructor">Join as Instructor</Link>
    </NavItem>
    <NavItem className="nav-link">
      <Link to="/corporate-training">Corporate</Link>
    </NavItem>
    <NavItem className="nav-link">
      <a
        href={process.env.REACT_APP_BLOG_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        Blog
      </a>
    </NavItem>
    <NavItem className="divider" />
    {!authService.isAuthenticated() && (
      <NavItem className="signin-nav-item">
        <Button
          className="nav-link btn btn-sm font-weight-bold"
          onClick={signIn}
        >
          {'Sign up / Log in'}
        </Button>
      </NavItem>
    )}
    {authService.isAuthenticated() && (
      <NavItem>
        <Dropdown
          isOpen={profileOpen}
          toggle={handleProfile}
        >
          <DropdownToggle className="profile">
            {first_name ? (
              <div className="profileIcon profile-tooltip">
                {profile_image ? (
                  <p>
                    <img src={profile_image} alt="profile-pic" />
                  </p>
                ) : (
                  <span>{getIconName()}</span>
                )}
                <span className="tooltiptext">
                  {`${getCapitalisedName(
                    first_name
                  )}, ${getCapitalisedName(last_name)}`}
                </span>
              </div>
            ) : (
              <div className="profileIcon">
                <FontAwesomeIcon
                  className="default-user"
                  icon={faUser}
                />
              </div>
            )}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem className="profile-menu">
              <span className="pophover-username">
                {`Hello, ${getCapitalisedName(first_name)}`}
              </span>
            </DropdownItem>
            <DropdownItem
              className="profile-menu"
              onClick={() => handleCategoryClick('/profile')}
            >
              <span>
                <FontAwesomeIcon
                  className="default-user text-muted mr-3"
                  icon={faUserCog}
                />
              </span>

              {'My Profile'}
            </DropdownItem>
            {userDetails.is_instructor === 1 ? (
              <React.Fragment>
                <DropdownItem
                  className="profile-menu"
                  onClick={() => handleCategoryClick('/my-batches')
                  }
                >
                  <FontAwesomeIcon
                    className="default-user text-muted mr-3"
                    icon={faChalkboardTeacher}
                  />
                  {'My Batches'}
                </DropdownItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <DropdownItem
                  className="profile-menu"
                  onClick={() => handleCategoryClick('/my-courses')
                  }
                >
                  <FontAwesomeIcon
                    className="default-user text-muted mr-3"
                    icon={faChalkboardTeacher}
                  />
                  {'My Courses'}
                </DropdownItem>
                <DropdownItem
                  className="profile-menu"
                  onClick={() => handleCategoryClick('/my-orders')
                  }
                >
                  <FontAwesomeIcon
                    className="text-muted mr-3"
                    icon={faShoppingCart}
                  />
                  {'My Orders'}
                </DropdownItem>
                <DropdownItem
                  className="profile-menu"
                  onClick={() => handleCategoryClick('/my-topic-preferences')
                  }
                >
                  <FontAwesomeIcon
                    className="default-user text-muted mr-3"
                    icon={faHeart}
                  />
                  {'UP Skill Needs'}
                </DropdownItem>
              </React.Fragment>
            )}
            <DropdownItem
              className="profile-menu"
              onClick={handleLogout}
            >
              <FontAwesomeIcon
                className="text-muted mr-3"
                icon={faSignOutAlt}
              />
               Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
    )}
  </Nav>
)

NavBarMenu.defaultProps = {
  profileOpen: false
}

NavBarMenu.propTypes = {
  profileOpen: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  handleProfile: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  getIconName: PropTypes.func.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  profile_image: PropTypes.string.isRequired,
  userDetails: PropTypes.shape({}).isRequired
}

export default NavBarMenu
