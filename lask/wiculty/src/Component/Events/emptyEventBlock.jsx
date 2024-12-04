import React from 'react';
import PropTypes from 'prop-types';
import GifContainer from '../common/gifContainer';
import EmptyEventsMsg from '../common/emptyEventsMsg';

const EmptyEventBlock = ({ isLoading }) => {
  const getEmptyEventBlock = () => {
    const loadingGif = (
      <div className="loading-gif-container container">
        <GifContainer />
        <GifContainer />
        <GifContainer />
        <GifContainer />
      </div>
    )
    return isLoading ? loadingGif : <EmptyEventsMsg />
  }
  return (
    <>
      {getEmptyEventBlock()}
    </>

  )
}

EmptyEventBlock.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default EmptyEventBlock;
