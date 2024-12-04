import React from 'react';
import PropTypes from 'prop-types';
import './LMSDisplay.scss';

const LMSDisplayPanel = ({ fid, rid }) => {
  function resizeIframe (obj) {
    // obj.style.height = `${obj.contentWindow.document.documentElement.scrollHeight}px`;
  }
  return (
    <div className="lms-display-container w-100">
      {rid !== null ? (
        <iframe
          onLoad={() => resizeIframe()}
          style={{
            width: '100%'
          }}
          title={`//www.cincopa.com/media-platform/iframe.aspx?fid=${fid}!${rid}`}
          src={`//www.cincopa.com/media-platform/iframe.aspx?fid=${fid}!${rid}`}
          frameBorder="0"
          allowFullScreen
          scrolling="no"
          allow="autoplay; fullscreen"
        />
      ) : (
        <p>No Video Avilable!</p>
      )}
    </div>
  )
}

LMSDisplayPanel.propTypes = {
  fid: PropTypes.isRequired,
  rid: PropTypes.isRequired
};
export default LMSDisplayPanel;
