import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

import LMSVideo from './components/LMSVideo';
import LMSMiddleContentToggle from './components/LMSMiddleContentToggle';
import LMSPDFViewer from './LMSPdf/pdf-viewer';
import LMSMiddleNavBar from './LMSMIddleNavbar';
import QuizContainer from './Quiz/QuizContainer';

const LMSMiddleContainer = ({
  selectedChapter,
  leftPanelHide,
  showLeftPanel,
  isSelfpaced
}) => {
  const {
    type,
    type_path,
    quiz = [],
    id
  } = selectedChapter;
  function getStyles () {
    const styles = {
      overflowY: 'auto',
      margin: '0 auto',
      width: 'calc(100% - 345px)'
    }
    if (leftPanelHide) {
      styles.width = '100%';
      styles.padding = '0 5%';
    }
    if (!selectedChapter) {
      styles.display = 'block';
    }
    return styles;
  }
  return (
    <Row style={{ ...getStyles() }}>
      { leftPanelHide &&
        <LMSMiddleContentToggle showLeftPanel={showLeftPanel} selectedChapter={selectedChapter} />
      }
      { type === 'Video' && (
        <LMSVideo
          chapter={selectedChapter}
        />
      )}
      { type === 'PDF' && (
        <LMSPDFViewer
          chapterPath={type_path}
          fullScreen={false}
          toggleFullScreen={() => console.log('toggle full screen')}
        />
      )}
      {
        type === 'Quiz' && (
          <QuizContainer
            key={id}
            quizList={quiz}
            handleParentFid={() => console.log('handle parent fid')}
          />
        )
      }
      <LMSMiddleNavBar data={{}} isSelfpaced={isSelfpaced} />
    </Row>
  )
};

LMSMiddleContainer.propTypes = {
  selectedChapter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({})
  ]),
  leftPanelHide: PropTypes.bool.isRequired,
  showLeftPanel: PropTypes.func.isRequired,
  isSelfpaced: PropTypes.bool.isRequired
}

LMSMiddleContainer.defaultProps = {
  selectedChapter: false
}

export default LMSMiddleContainer;
