import React from 'react';
import PropTypes from 'prop-types';
import CareerJD from './CareerJD';
import './career.scss';

export default function CareerAnnexure ({ openingsSection, handleWicultyOpening }) {
  return (
    <div className="current-opening-section">
      <p className="flex-box-class fcr">
        {openingsSection.sectionName}
      </p>
      <CareerJD
        openingsSectionJD={openingsSection.jobs}
        handleWicultyOpening={openingName => handleWicultyOpening(openingName)}
      />
    </div>
  )
}

CareerAnnexure.propTypes = {
  openingsSection: PropTypes.isRequired,
  handleWicultyOpening: PropTypes.func.isRequired
};
