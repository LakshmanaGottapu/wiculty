import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faClock,
  faFolderOpen,
  faCogs,
  faSuitcase
} from '@fortawesome/free-solid-svg-icons';

const DemandSection = ({ courseDetails = {} }) => {
  const { course_highlighter = [] } = courseDetails.course || {};

  const highlights = [];
  for (let i = 1; i <= 10; i += 1) {
    if (course_highlighter[`highlighter_${i}`]) {
      highlights.push(course_highlighter[`highlighter_${i}`]);
    }
  }

  // dividing array into equal chunks of 5 items
  const highlightsChunks = [];

  const chunk = 5;
  const size = highlights.length;
  for (let i = 0; i < size; i += chunk) {
    const temparray = highlights.slice(i, i + chunk);
    highlightsChunks.push(temparray);
  }

  function getBackground (index) {
    const colors = ['#51a888', '#38929a', '#733999', '#cd541f', '#cd541f'];
    const iconIndex = index % 5;
    return colors[iconIndex];
  }

  function getIcon (index) {
    const icons = [faDesktop, faClock, faFolderOpen, faCogs, faSuitcase];
    const iconIndex = index % 5;
    return icons[iconIndex];
  }

  return (
    <div className="demand-container">
      {highlightsChunks.map(items => (
        <div className="mgt10 demand-analysis-container">
          {items.map((item, i) => (
            <div className="demand-analysis">
              <div className="flex-vertical-center">
                <p className="icon-design flex-vertical-center shadow" style={{ backgroundColor: getBackground(i) }}>
                  <FontAwesomeIcon icon={getIcon(i)} />
                </p>
              </div>
              <div>{item || '--'}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
};

DemandSection.propTypes = {
  courseDetails: PropTypes.isRequired
}

export default DemandSection;
