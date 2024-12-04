import React from 'react'
import PropTypes from 'prop-types';
import sf from '../../common/safeTraverse';
import './keyStats.scss';
import { getModulesChapters } from '../../common/utilFunctions/courseUtils';

const KeyStats = ({ courseDetails }) => {
  const {
    sections = {}, course_duration = 50, trending_topic, is_selfpaced
  } = courseDetails.course || {};
  const projects = sf(sections, ['projects', 'section_details']) || [];
  const keyStatsJSON = [
    {
      number: `${course_duration}+`,
      desc: `Hrs of Extensive ${is_selfpaced ? 'Learning' : 'Training'}`
    },
    {
      number: `${getModulesChapters(sections).modulesCount}+`,
      desc: 'Modules/Tools '
    },
    {
      number: 1,
      desc: `Trending ${trending_topic} topic`
    },
    {
      number: projects.length || 3,
      desc: 'Real-time projects based training'
    }]
  return (
    <div className="keyStats-section card mb-4 d-none d-md-flex">
      <div className="card-body px-0">
        <div className="row">
          {keyStatsJSON.map(keyStat => (
            <div className="col-lg-6 col-6 text-center mb-4">
              <div className="keyStats-circle font-weight-bold mb-2">
                {keyStat.number}
              </div>
              <span>
                {keyStat.desc}
              </span>
              <div />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

KeyStats.propTypes = {
  courseDetails: PropTypes.isRequired
};

export default KeyStats;
