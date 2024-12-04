import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './noDataComp.scss';

const NoDataComp = ({ msg }) => (
  <div className="noData-msg-section">
    <h2>
      {msg}
    </h2>
    <h2>
      <Link to="/all-courses">
        {'View all courses'}
      </Link>
    </h2>
  </div>
);

NoDataComp.propTypes = {
  msg: PropTypes.string.isRequired
}

export default NoDataComp;
