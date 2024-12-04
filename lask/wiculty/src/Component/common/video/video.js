import React from 'react';
import PropTypes from 'prop-types';

import VideoPlayer from './videoplayer';
// import 'video.js/dist/video-js.css';

export default function Video ({ src }) {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.5, 2],
    height: 500,
    width: 'auto',
    sources: [
      {
        src,
        type: 'video/mp4'
      }
    ]
  };

  if (window.innerWidth < 768) {
    videoJsOptions.height = 300;
  }
  return (
    <div>
      <VideoPlayer {...videoJsOptions} />
    </div>
  );
}

Video.propTypes = {
  src: PropTypes.string.isRequired
}
