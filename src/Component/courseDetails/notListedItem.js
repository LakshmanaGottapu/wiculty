import React from 'react';
import PropTypes from 'prop-types';

export default function NotListedMenuItem ({ menuItem }) {
  return (
    <div id="not-listed-item" className={`${menuItem}-menu-container`}>
      <p>
        <span>
          {'No data found related to'}
        </span>
        <span style={{ fontWeight: 'bold' }}>{menuItem}</span>
        <span>
          {'Menu'}
        </span>
      </p>
    </div>
  )
}

NotListedMenuItem.propTypes = {
  menuItem: PropTypes.isRequired
}
