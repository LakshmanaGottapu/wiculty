import React from 'react';
import videojs from 'video.js';

export default class VideoPlayer extends React.Component {
  componentDidMount () {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props);
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render () {
    return (
      <div
        className="d-flex justify-content-center my-4"
        onContextMenu={(event) => {
          event.stopPropagation();
          event.preventDefault();
          return false;
        }}
      >
        <div
          data-vjs-player
          onContextMenu={(event) => {
            event.stopPropagation();
            event.preventDefault();
            return false;
          }}
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            onContextMenu={(event) => {
              event.stopPropagation();
              event.preventDefault();
              return false;
            }}
            ref={node => (this.videoNode = node)}
            className="video-js vjs-big-play-centered"
          />
        </div>
      </div>
    );
  }
}
