import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faAngleLeft,
  faSearchMinus,
  faSearchPlus,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import { buttonize } from '../../common/utilFunctions/utilFunction';
import { MyContext } from './pdf-viewer';
import FullScreen from '../../../img/full-screen-button.svg';
import ExitFullScreen from '../../../img/full-screen-exit.svg';

export const CustomPrevButton = (props) => {
  const {
    page,
    handlePrevClick
  } = props;
  if (page === 1) return <div />;
  return (
    <h3
      style={{
        cursor: 'pointer'
      }}
      className="d-inline-block"
      {...buttonize(handlePrevClick)}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </h3>
  );
};
CustomPrevButton.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  handlePrevClick: PropTypes.func.isRequired
};

CustomPrevButton.defaultProps = {
  pages: 0
}

export const CustomNextButton = (props) => {
  const {
    page,
    pages,
    handleNextClick
  } = props;
  if (page === pages) return <div />;

  return (
    <h3
      style={{
        cursor: 'pointer'
      }}
      className="d-inline-block"
      {...buttonize(handleNextClick)}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </h3>
  );
};
CustomNextButton.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  handleNextClick: PropTypes.func.isRequired
};

CustomNextButton.defaultProps = {
  pages: 0
}

export const CustomPages = (props) => {
  const {
    page,
    pages,
    handlePageChage
  } = props;
  const selectOptions = [];
  if (pages) {
    for (let i = 1; i <= pages; i += 1) {
      selectOptions.push(i);
    }
  }

  function pageChanged (event) {
    const newPage = Number(event.currentTarget.value);
    handlePageChage(newPage);
  }

  return (
    <h3 className="d-inline-block mt-0 mx-4">
      Page &nbsp;
      {/* {page} */}
      <select style={{ width: '60px' }} onChange={pageChanged} value={page}>
        {selectOptions.map(num => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      &nbsp;
       /
      &nbsp;
      {pages}
    </h3>
  );
};
CustomPages.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  handlePageChage: PropTypes.func.isRequired
};

CustomPages.defaultProps = {
  pages: 0
}

export const CustomZoomIn = (props) => {
  const {
    handleZoomIn
  } = props;
  return (
    <h3
      style={{
        cursor: 'pointer'
      }}
      className="d-inline-block"
      {...buttonize(handleZoomIn)}
    >
      <FontAwesomeIcon icon={faSearchPlus} />
    </h3>
  );
};
CustomZoomIn.propTypes = {
  handleZoomIn: PropTypes.func.isRequired
};

export const CustomZoomOut = (props) => {
  const {
    handleZoomOut
  } = props;
  return (
    <h3
      style={{
        cursor: 'pointer'
      }}
      className="d-inline-block mr-2"
      {...buttonize(handleZoomOut)}
    >
      <FontAwesomeIcon icon={faSearchMinus} />
    </h3>
  );
};

CustomZoomOut.propTypes = {
  handleZoomOut: PropTypes.func.isRequired
};

export const CustomRotate = (props) => {
  const {
    handleRotate
  } = props;
  return (
    <h3
      style={{
        cursor: 'pointer'
      }}
      className="d-inline-block mr-2"
      {...buttonize(handleRotate)}
    >
      <FontAwesomeIcon icon={faUndo} className="mirror-rotate" />
    </h3>
  );
};

CustomRotate.propTypes = {
  handleRotate: PropTypes.func.isRequired
};

const CustomNavigation = (props) => {
  const {
    page,
    pages,
    handlePrevClick,
    handleNextClick,
    handlePageChage,
    handleZoomIn,
    handleZoomOut,
    handleRotate
  } = props;

  const { fullScreen, toggleFullScreen } = useContext(MyContext);

  return (
    <div className="customWrapper flex justify-between">
      <div className="d-none d-sm-block">
        {fullScreen ? (
          <div
            className="exit-full-screen c-p d-none"
            title="Exit Full Screen"
            role="button"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => toggleFullScreen()}
          >
            <img src={ExitFullScreen} alt="ExitFullScreen" width="20" />
          </div>
        ) : (
          <div
            role="button"
            className="full-screen c-p"
            title="Full Screen"
            tabIndex={0}
            onKeyPress={() => { }}
            onClick={() => toggleFullScreen()}
          >
            <img src={FullScreen} alt="FullScreen" width="20" />
          </div>
        )}
      </div>
      <div className="rounded">
        <CustomPrevButton page={page} pages={pages} handlePrevClick={handlePrevClick} />
        <CustomPages page={page} pages={pages} handlePageChage={handlePageChage} />
        <CustomNextButton page={page} pages={pages} handleNextClick={handleNextClick} />
      </div>
      <div>
        <CustomRotate handleRotate={handleRotate} />
        <CustomZoomOut handleZoomOut={handleZoomOut} />
        <CustomZoomIn handleZoomIn={handleZoomIn} />
      </div>
    </div>
  );
};
CustomNavigation.propTypes = {
  page: PropTypes.number.isRequired,
  pages: PropTypes.number,
  handlePrevClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired,
  handlePageChage: PropTypes.func.isRequired,
  handleZoomIn: PropTypes.func.isRequired,
  handleZoomOut: PropTypes.func.isRequired,
  handleRotate: PropTypes.func.isRequired
};

CustomNavigation.defaultProps = {
  pages: 0
}

export default CustomNavigation;
