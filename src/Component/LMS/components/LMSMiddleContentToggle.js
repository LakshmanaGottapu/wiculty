import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { buttonize } from '../../common/utilFunctions/utilFunction';

const toggleStyle = {
  position: 'absolute',
  top: '10px'
}
const LMSMiddleContentToggle = ({ showLeftPanel, selectedChapter }) => (
  selectedChapter ? (
    <Col className="position-relative px-0" style={{ maxWidth: '30px' }}>
      <div style={{ ...toggleStyle }}>
        <FontAwesomeIcon
          icon={faBars}
          className="c-p"
          style={{ fontSize: '24px' }}
          {...buttonize(showLeftPanel)}
        />
      </div>
    </Col>
  ) : (
    <Col style={{ height: '60px' }}>
      <FontAwesomeIcon
        icon={faBars}
        className="c-p"
        style={{ fontSize: '24px' }}
        {...buttonize(showLeftPanel)}
      />
    </Col>
  )
)

LMSMiddleContentToggle.propTypes = {
  showLeftPanel: PropTypes.func.isRequired,
  selectedChapter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({})
  ]).isRequired
}

export default LMSMiddleContentToggle;
