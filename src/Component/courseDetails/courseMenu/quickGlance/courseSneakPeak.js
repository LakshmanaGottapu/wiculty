import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock
} from '@fortawesome/free-regular-svg-icons';
import {
  faBlog,
  faBook,
  faBookOpen,
  faCertificate,
  faChalkboardTeacher,
  faChartLine,
  faClipboardList,
  faGift,
  faTasks,
  faHandsHelping,
  faProjectDiagram,
  faUserClock,
  faVideo,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';

import sf from '../../../common/safeTraverse';
import { isShowGift } from '../../../common/utilFunctions/utilFunction';
import { getModulesChapters } from '../../../common/utilFunctions/courseUtils';

const CourseSneakPeak = ({ course }) => {
  const {
    course_duration,
    sections = {},
    is_selfpaced,
    trending_topic,
    course_slug
  } = course;
  const projects = sf(sections, ['projects', 'section_details']) || [];
  const { modulesCount = 3, chaptersCount = 3 } = getModulesChapters(sections);
  return (
    <>
      <h4>Course Sneak Peak:</h4>
      <ul className="list-unstyled course-sneak-peak mt-2">
        <li>
          <FontAwesomeIcon icon={faClock} />
          {course_duration}
          + Hrs Extensive
          {' '}
          {!is_selfpaced ? (
            <span>
              <b className="text-info">LIVE</b>
              {' '}
              training
            </span>
          ) : ''}
        </li>
        <li>
          <FontAwesomeIcon icon={faBook} />
          {`${modulesCount}+ Modules / Tools (${chaptersCount} Chapters)`}
        </li>
        {isShowGift(course_slug) && (
          <li>
            <FontAwesomeIcon icon={faGift} />
              FREE Linux & Shell scripting Course
          </li>
        )}
        <li>
          <FontAwesomeIcon icon={faChartLine} />
        With trending
          {' '}
          <b>{trending_topic}</b>
          {' '}
          topics
        </li>
        <li>
          <FontAwesomeIcon icon={faProjectDiagram} />
          Real-time projects
          {' '}
          <b>
          (
            {projects.length || 3}
          )
          </b>
          {' '}
           based training
        </li>
        {is_selfpaced ? (
          <li>
            <FontAwesomeIcon icon={faTasks} />
          Life time access to LMS class recordings
          </li>
        ) : ''}
        <li>
          <FontAwesomeIcon icon={faBookOpen} />
          Detailed, chapter based curriculum
        </li>
        {is_selfpaced ? (
          <li>
            <FontAwesomeIcon icon={faHeadset} />
            Doubt clarification support
          </li>
        ) : ''}
        {!is_selfpaced ? (
          <li>
            <FontAwesomeIcon icon={faVideo} />
          Free Access to missed classes
          </li>
        ) : ''}

        <li>
          <FontAwesomeIcon icon={faCertificate} />
          Course Completion Certificate
        </li>
        {is_selfpaced ? (
          <li>
            <FontAwesomeIcon icon={faUserClock} />
            Learn at your convenience
          </li>
        ) : ''}
        {!is_selfpaced ? (
          <li>
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          Dropout in the middle? Rejoin new live batch
          </li>
        ) : ''}
        <li>
          <FontAwesomeIcon icon={faHandsHelping} />
          Mock Interview preparation
        </li>
        <li>
          <FontAwesomeIcon icon={faClipboardList} />
          Resume preparation & Job assistance
        </li>
        <li>
          <FontAwesomeIcon icon={faBlog} />
          <a href={process.env.REACT_APP_BLOG_URL}>Blogs, Quizs & Interview Questions</a>
        </li>
      </ul>
    </>
  )
};

CourseSneakPeak.propTypes = {
  course: PropTypes.func.isRequired
}

export default CourseSneakPeak;
