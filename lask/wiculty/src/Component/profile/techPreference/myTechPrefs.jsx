import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom'

import { filterInstrLedCourse } from '../../common/utilFunctions/utilFunction';
import sf from '../../common/safeTraverse';
import { BOGOIcons } from '../../staticJSON/staticIconJson';
import { courseCSS } from '../../staticJson';

import './techPreference.scss';

function TechPreferenceCategory ({
  courseList = [], profileInfo
}) {
  function getUserTechPrefs () {
    let userTechPrefs = [];
    if (profileInfo) {
      const { professional = {} } = profileInfo;
      const { user_preference = [] } = professional;
      userTechPrefs = courseList.filter(courseItem => user_preference && user_preference
        .includes(courseItem && courseItem.id.toString()));
      return userTechPrefs;
    }
    return []
  }

  const myTechPrefs = getUserTechPrefs();
  return (
    <div className="mtp-main">
      <div className="container my-5 shadow p-4 bg-white mtp-list">
        <div className="row mtp-header py-2">
          <div className="col-lg-10 col-10">
            <h1 className="title-color text-center flex-vertical-center">
              <FontAwesomeIcon
                className="wic-color mr-2"
                icon={faListAlt}
              />
            Topic Preferences
            </h1>
          </div>
          {myTechPrefs.length > 0 && (
            <div className="col-lg-2 col-2 flex-vertical-center wic-color">
              <Link className="wic-color" to="/topic-categories">
                <FontAwesomeIcon
                  className="mr-2 mb-2"
                  icon={faPencilAlt}
                />
              </Link>
            </div>
          )}
        </div>

        {myTechPrefs.length > 0 ? (
          <div className="
            tech-category-container
            my-4
            container d-flex
            justify-content-md-start
            justify-content-center
        "
          >
            {myTechPrefs.map(course => (
              <div
                className="tech-category-item bg-white p-3 shadow rounded m-2 text-center c-p'"
                lg="3"
                sm="12"
                md="3"
                title={course.unique_title}
              >
                <div>
                  <FontAwesomeIcon
                    className="tech-icon wic-color"
                    icon={BOGOIcons[course.unique_title] || faBookOpen}
                    style={{
                      color: courseCSS[course.unique_title] &&
                courseCSS[course.unique_title].color
                    }}
                  />

                  <p className="mb-0 topic-name">
                    {course.course_title}
                  </p>
                </div>
              </div>

            ))}
          </div>
        )
          : (
            <div className="mtp-add flex-vertical-center">
              <div className="text-center my-4">
                <h4 className="my-4 text-muted">
                Pick you topic preferences now
                </h4>
                <button className="btn btn-primary text-white" type="button">
                  <Link className="text-white" to="/topic-categories">Add Now</Link>
                </button>
              </div>
            </div>
          )}

      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  courseList: filterInstrLedCourse(sf(state, ['homeCourses', 'data']) || []),
  profileInfo: sf(state, ['profileDetails', 'data', 'data'])
})

TechPreferenceCategory.propTypes = {
  profileInfo: PropTypes.shape({}).isRequired,
  courseList: PropTypes.shape({}).isRequired
}

export default connect(mapStateToProps, null)(TechPreferenceCategory)
