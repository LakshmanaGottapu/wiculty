import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faChalkboardTeacher, faWallet, faUser, faShoppingCart, faUnlockAlt, faBuilding,
  faLaptop, faHeart
} from '@fortawesome/free-solid-svg-icons';
// services import start
import authService from '../../../services/authService'
// services import start
import {
  getCapitalisedName, buttonize
} from '../utilFunctions/utilFunction'

const SideBar = ({
  isCategorySideBar, handleLogout, signIn, getIconName,
  handleCategoryClick, handleChangePassword, toggleCategoryPanel,
  first_name, profile_image, userDetails
}) => (
  <>
    <div
      className={classnames('overlayBg', { show: isCategorySideBar })}
      role="button"
      tabIndex={0}
      onKeyPress={() => { }}
      onClick={() => toggleCategoryPanel()}
    />
    <div
      className={classnames('side-nav-bar d-md-block d-lg-none', { show: isCategorySideBar })}
    >
      <div className="heading">
        <div className="category-heading-title">
          {first_name ? (
            <div
              className="profileIcon profile-tooltip"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={() => handleCategoryClick('/profile')}
            >
              {profile_image ? (
                <p>
                  <img src={profile_image} alt="profile-pic" />
                </p>
              ) : (
                <span>{getIconName()}</span>
              )}
            </div>
          ) : (
            <div
              className="profileIcon"
              role="button"
              tabIndex={0}
              onKeyPress={() => { }}
              onClick={() => handleCategoryClick('/profile')}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>
          )}
          <p className="profile-name">
            {authService.isAuthenticated()
              ? `Hello, ${getCapitalisedName(first_name)}`
              : (
                <span {...buttonize(signIn)}>
                  {'Sign up / Log in'}
                </span>
              )}
          </p>
        </div>
        <div
          className="side-bar-close"
          role="button"
          tabIndex={0}
          onKeyPress={() => { }}
          onClick={() => toggleCategoryPanel()}
        >
          <p>&times;</p>
        </div>
      </div>
      <div className="categories">
        <div>
          <span
            className="category-tabs"
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => handleCategoryClick('/')}
          >
            <FontAwesomeIcon
              className="default-user text-muted mr-3"
              icon={faHome}
            />
            {'Home'}
          </span>
        </div>
        <div>
          <span
            className="category-tabs "
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => handleCategoryClick('/all-courses')}
          >
            <FontAwesomeIcon
              className="default-user text-muted mr-3"
              icon={faLaptop}
            />
            {'All Courses'}
          </span>
        </div>
        <div>
          <span
            className="category-tabs"
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => handleCategoryClick('/refer-earn')}
          >
            <FontAwesomeIcon
              className="default-user text-muted mr-3"
              icon={faWallet}
            />
            {'Refer & Earn'}
          </span>
        </div>
        <div>
          <span
            className="category-tabs"
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => handleCategoryClick('/events')}
          >
            <FontAwesomeIcon
              className="default-user text-muted mr-3"
              icon={faLaptop}
            />
            {'Demo | Webinars'}
          </span>
        </div>
        <div>
          <span
            className="category-tabs"
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => handleCategoryClick('/instructor')}
          >
            <FontAwesomeIcon
              className="default-user text-muted mr-3"
              icon={faUser}
            />
            {'Join as Instructor'}
          </span>
        </div>
        <div>
          <span
            className="category-tabs"
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => handleCategoryClick('/corporate-training')
            }
          >
            <FontAwesomeIcon
              className="default-user text-muted mr-3"
              icon={faBuilding}
            />
            {'Corporate'}
          </span>
        </div>
        {authService.isAuthenticated() && (
          <React.Fragment>
            <hr />
            <div>
              {userDetails.is_instructor === 1
                ? (
                  <span
                    className="category-tabs"
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => { }}
                    onClick={() => handleCategoryClick('/my-batches')}
                  >
                    <FontAwesomeIcon
                      className="default-user text-muted mr-3"
                      icon={faChalkboardTeacher}
                    />
                    {'My Batches'}
                  </span>
                ) : (
                  <span
                    className="category-tabs"
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => { }}
                    onClick={() => handleCategoryClick('/my-courses')}
                  >
                    <FontAwesomeIcon
                      className="default-user text-muted mr-3"
                      icon={faChalkboardTeacher}
                    />
                    {'My Courses'}
                  </span>
                )}
            </div>
            <div>
              <span
                className="category-tabs"
                role="button"
                tabIndex={0}
                onKeyPress={() => { }}
                onClick={() => handleCategoryClick('/my-orders')}
              >
                <FontAwesomeIcon
                  className="default-user text-muted mr-3"
                  icon={faShoppingCart}
                />
                {'My Orders'}
              </span>
            </div>
            <div>
              <span
                className="category-tabs"
                role="button"
                tabIndex={0}
                onKeyPress={() => { }}
                onClick={() => handleCategoryClick('/my-topic-preferences')}
              >
                <FontAwesomeIcon
                  className="default-user text-muted mr-3"
                  icon={faHeart}
                />
                {'Up Skill Needs'}
              </span>
            </div>
            <div>
              <div
                className="nav-change-pass"
                role="button"
                tabIndex={0}
                onKeyPress={() => { }}
                onClick={() => handleChangePassword()}
              >
                <FontAwesomeIcon
                  className="default-user text-muted mr-3"
                  icon={faUnlockAlt}
                />
                {'Change Password'}
              </div>
            </div>
          </React.Fragment>
        )}
        <div>
          {authService.isAuthenticated() && (
            <button
              type="button"
              className="signIn-button"
              onClick={() => handleLogout()}
            >
              {'Log out '}
            </button>
          )}
        </div>
      </div>
    </div>
  </>
)

SideBar.defaultProps = {
  isCategorySideBar: false
}

SideBar.propTypes = {
  isCategorySideBar: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  toggleCategoryPanel: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  getIconName: PropTypes.func.isRequired,
  first_name: PropTypes.string.isRequired,
  profile_image: PropTypes.string.isRequired,
  userDetails: PropTypes.shape({}).isRequired
}

export default SideBar;
