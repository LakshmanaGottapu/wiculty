import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import PropTypes from 'prop-types';
import CustomNavigation from './Navigation';
import './pdf-viewer.scss';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://wiculty-assets.s3.amazonaws.com/pdf/pdf.worker.js';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap'
};

const exampleWrapperStyle = {
  width: '100%'
};

export const MyContext = React.createContext();

const LMSPDFViewer = (props) => {
  const {
    chapterPath,
    fullScreen,
    toggleFullScreen
  } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(500);
  const [rotate, setRotate] = useState(undefined);

  function onDocumentLoadSuccess (res) {
    setNumPages(res.numPages);
  }

  function handlePrevClick () {
    setPageNumber(pageNumber - 1);
  }

  function handleNextClick () {
    setPageNumber(pageNumber + 1);
  }

  function handlePageChage (num) {
    setPageNumber(num);
  }

  function handleZoomIn () {
    let newWidth = width + 100;
    if (width > 1500) {
      newWidth = 1500;
    }
    setWidth(newWidth);
  }

  function handleZoomOut () {
    let newWidth = width - 100;
    if (width < 100) {
      newWidth = 100;
    }
    setWidth(newWidth);
  }

  function handleRotate () {
    let newRotate;
    let currentRotate = rotate;
    if (!currentRotate) {
      currentRotate = 0;
    }
    if (currentRotate === 360) {
      newRotate = 90;
    } else {
      newRotate = currentRotate + 90;
    }
    setRotate(newRotate);
  }

  function loadingPDF () {
    return (
      <div className="flex-vertical-center" style={{ height: 200 }}>
        Loading...
      </div>
    )
  }

  useEffect(() => {
    const ele = document.getElementsByClassName('LMS-middle-panel');
    if (ele[0] && ele[0].offsetWidth) {
      setWidth(ele[0].offsetWidth - 100);
    }
  }, []);

  useEffect(() => {
    // whenever pdf changed, set
    // page number to 1
    // rotate to 0
    setPageNumber(1);
    setRotate(undefined);
  }, [chapterPath]);

  return (
    <div className="px-4 w-100">
      <div style={wrapperStyle}>
        <div style={exampleWrapperStyle}>
          <MyContext.Provider
            value={{ fullScreen, toggleFullScreen }}
          >
            <Document
              file={chapterPath}
              onLoadSuccess={onDocumentLoadSuccess}
              renderMode="canvas"
              loading={loadingPDF}
              rotate={rotate}
            >
              <Page pageNumber={pageNumber} width={width} loading={loadingPDF} />
            </Document>
            <CustomNavigation
              page={pageNumber}
              pages={numPages}
              handlePrevClick={() => handlePrevClick()}
              handleNextClick={() => handleNextClick()}
              handlePageChage={num => handlePageChage(num)}
              handleZoomIn={() => handleZoomIn()}
              handleZoomOut={() => handleZoomOut()}
              handleRotate={() => handleRotate()}
            />
          </MyContext.Provider>
        </div>
      </div>
    </div>
  );
}

LMSPDFViewer.propTypes = {
  chapterPath: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  toggleFullScreen: PropTypes.func.isRequired
}

export default LMSPDFViewer;
