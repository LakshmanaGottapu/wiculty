import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

import updatePrefAction from '../Actions/updateProfessionalInfoAction';
import profileAction from '../profileAction';

import { buttonize, filterInstrLedCourse } from '../../common/utilFunctions/utilFunction';
import sf from '../../common/safeTraverse';
import { BOGOIcons } from '../../staticJSON/staticIconJson';
import { courseCSS } from '../../staticJson';
import messageFn from '../../common/message'

import { MESSAGES } from '../../locales/locale';

import './techPreference.scss';

const {
  ERROR: { GENERIC_ERR },
  TOASTER_STATUS: { SUCCESS, ERROR },
  TECH_PREFERENCE_UPDATED
} = MESSAGES;

function TechPreferenceCategory ({
  updatePreference, courseList = [],
  getProfileDetails, profileInfo, history
}) {
  const [selectedPrefs, setCategory] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isPrefsExist, setPrefsFlag] = useState(false);

  function getUserTechPrefs () {
    if (profileInfo) {
      const { professional = {} } = profileInfo;
      const { user_preference = [] } = professional;
      return user_preference
    }
    return []
  }

  useEffect(() => {
    let userPrefs = getUserTechPrefs();
    if (userPrefs && userPrefs.length > 0) {
      setPrefsFlag(true);
      userPrefs = userPrefs.map(i => Number(i));
      setCategory(userPrefs)
    }
  }, [profileInfo])

  const handleCategorySelection = (id) => {
    if (!selectedPrefs.includes(id)) {
      setCategory(prevState => ([...selectedPrefs, id]));
    } else {
      const index = selectedPrefs.indexOf(id);
      const newPrefsList = [...selectedPrefs.slice(0, index),
        ...selectedPrefs.slice(index + 1, selectedPrefs.length)]

      setCategory(newPrefsList);
    }
    setPrefsFlag(true);
  }

  const submitPreference = () => {
    let userSelectedPrefs;
    if (!selectedPrefs.length) {
      userSelectedPrefs = null
    } else {
      userSelectedPrefs = selectedPrefs
    }
    updatePreference({ user_preference: userSelectedPrefs }, (resp) => {
      setLoading(true);
      const { status } = resp || {};
      if (status === 200) {
        messageFn(TECH_PREFERENCE_UPDATED, SUCCESS);
        getProfileDetails({}, () => {
          setLoading(false);
          history.push('/my-topic-preferences')
        })
      } else {
        messageFn(GENERIC_ERR, ERROR);
      }
    })
  }

  return (
    <div className="container tech-category mt-5">
      {isLoading && <div className="loading" />}
      <h1 className="title-color my-4">
        Pick your topic preferences
      </h1>
      <h3 className="text-center my-4">
        This will help us inform you about technologies you love
      </h3>
      <div className="
            tech-category-container
            container d-flex
            justify-content-md-start
            justify-content-center
        "
      >
        {courseList.map(course => (
          <div
            className={classnames('tech-category-item bg-white p-3 shadow rounded m-2 text-center c-p',
              { selected: selectedPrefs.includes(course.id) && isPrefsExist })}
            lg="3"
            sm="12"
            md="3"
            {...buttonize(handleCategorySelection, course.id)}
            title={course.unique_title}
          >
            <span className="selected-pref text-white">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#fff"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z" />
              </svg>
            </span>
            <FontAwesomeIcon
              className="tech-icon wic-color"
              icon={BOGOIcons[course.unique_title] || faBookOpen}
              style={{
                color: courseCSS[course.unique_title] &&
                courseCSS[course.unique_title].color
              }}
            />

            <p className="topic-name mb-0">
              {course.course_title}
            </p>
          </div>

        ))}
      </div>
      <div className="d-flex  justify-content-center justify-content-md-end my-4">
        <button className="btn btn-primary float-right" type="button" onClick={submitPreference}>
          Submit
        </button>
      </div>

    </div>
  )
}
const mapStateToProps = state => ({
  courseList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || []),
  profileInfo: sf(state, ['profileDetails', 'data', 'data'])
})

const mapDispatchToProps = dispatch => ({
  updatePreference: (payload, cb) => {
    dispatch(updatePrefAction(payload, cb))
  },
  getProfileDetails: (payload, cb) => {
    dispatch(profileAction(payload, cb));
  }
})

TechPreferenceCategory.propTypes = {
  profileInfo: PropTypes.shape({}).isRequired,
  courseList: PropTypes.shape({}).isRequired,
  updatePreference: PropTypes.func.isRequired,
  getProfileDetails: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TechPreferenceCategory));
