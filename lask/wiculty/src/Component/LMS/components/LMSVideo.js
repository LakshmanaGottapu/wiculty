import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Video from '../../common/video/video';

const validURL = (str) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

const LMSVideo = ({ chapter }) => {
  const { fid, type_path } = chapter;
  const isVideo = validURL(type_path);
  return (
    <Col className="lms-video px-0">
      {isVideo ? (
        <Video src={type_path} key={type_path} />
      ) : (
        <div className="position-relative py-2 px-3 h-100 mx-auto" style={{ maxWidth: '900px' }}>
          <div className="position-absolute h-100 w-100 d-flex align-items-center justify-content-center">
            <p>Loading...</p>
          </div>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              title="//www.cincopa.com/media-platform/iframe.aspx"
              src={`//www.cincopa.com/media-platform/iframe.aspx?fid=${fid}!${type_path}`}
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              allow="autoplay; fullscreen"
              className="embed-responsive-item"
            />
          </div>
        </div>
      )}
    </Col>
  );
};

LMSVideo.propTypes = {
  chapter: PropTypes.shape({}).isRequired
};

export default LMSVideo;
