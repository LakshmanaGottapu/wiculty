import React from 'react';
import { IMAGES } from '../../locales/images';

import './courseBanner.scss';

const WicultyStyle = {
  color: '#ff7e00',
  margin: '0 10px 0 0'
}

function CourseBannerLatest () {
  return (
    <div className="lecture-bay-banner" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.MY_COURSES_BANNER})` }}>
      <h1 className="m-2 mycourses-heading px-4 d-none">
        <small className="font-weight-bold">
          {'Welcome to'}
        </small>
        <div className="">
          <span style={WicultyStyle}>
            {'Wiculty LectureBay'}
          </span>
          <span>
            {'| Door to explore the virtual wisdom place'}
          </span>
        </div>
        <small className="font-weight-bold d-flex justify-content-end ">
          {'Ignite your engine,stay focused !'}
        </small>
      </h1>
    </div>
  )
}

export default CourseBannerLatest;
