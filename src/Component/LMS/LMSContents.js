import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';

import LMSContentsItem from './LMSContentsItem';

import { buttonize } from '../common/utilFunctions/utilFunction';

const LMSContents = ({
  LMSData,
  leftPanelHide,
  hideLeftPanel,
  setSelectedChapter,
  selectedChapter,
  recordings
}) => (
  <section className="lms-page-sidebar c-p" style={{ marginLeft: !leftPanelHide ? '0px' : '-364px' }}>
    <div className="lms-page-sidebar-header w-100">
      <Row
        className="px-2 py-4 border-bottom"
        {...buttonize(hideLeftPanel)}
      >
        <Col className="d-flex justify-content-between">
          <div>
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Contents
          </div>
          <div>
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </Col>
      </Row>
      <Row className="content-modules">
        <Col className="p-0">
          {LMSData.length > 0 && LMSData.map(item => (
            <LMSContentsItem
              item={item}
              setSelectedChapter={setSelectedChapter}
              selectedChapter={selectedChapter}
            />
          ))}
          {recordings.length > 0 && (
            <LMSContentsItem
              item={{ title: 'Recordings', id: 'recordings', chapters: recordings }}
              setSelectedChapter={setSelectedChapter}
              selectedChapter={selectedChapter}
            />
          )}
        </Col>
      </Row>
    </div>
  </section>
)

LMSContents.propTypes = {
  LMSData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  leftPanelHide: PropTypes.bool.isRequired,
  hideLeftPanel: PropTypes.func.isRequired,
  setSelectedChapter: PropTypes.func.isRequired,
  selectedChapter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({})
  ]),
  recordings: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

LMSContents.defaultProps = {
  selectedChapter: false
}

export default LMSContents;
