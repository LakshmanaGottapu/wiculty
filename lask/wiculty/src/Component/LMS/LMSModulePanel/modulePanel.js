import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse, CardBody, Card
} from 'reactstrap';
import classNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faAngleRight,
  faAngleDown,
  faVideo,
  faBookOpen
} from '@fortawesome/free-solid-svg-icons';

import { buttonize } from '../../common/utilFunctions/utilFunction';
import redordingsDetails from './recordingsAction';
import sf from '../../common/safeTraverse';

class ModulePanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      collapseObj: {},
      selectedChapter: '',
      selectedModule: '',
      collapseRecording: false,
      recordings: []
    };
  }

  componentDidMount () {
    const { getClassRecordings, LMSDetails = [], globalDetails = {} } = this.props;
    const LMSInfo = sf(LMSDetails, ['data', 'data']) || {};
    const { is_selfpaced } = LMSInfo;
    const { courseBatchId } = globalDetails;
    !is_selfpaced && getClassRecordings({ batchID: courseBatchId }, (resp) => {
      const recordings = sf(resp, ['data', 'data', 'recordings']) || {};
      this.setState({
        recordings
      });
    })
  }

  static getDerivedStateFromProps (props, state) {
    const { globalDetails, recordingsReducer } = props || {}
    const rec = sf(recordingsReducer, ['data', 'data']) || {};
    if (globalDetails.courseBatchId) {
      return {
        recordings: rec.recordings
      }
    }
    return null
  }

  handleRecordingSelection = () => {
    this.setState(state => ({
      collapseRecording: !state.collapseRecording
    }));
  }

  handleModuleSelection = (selectedTab) => {
    this.setState(state => ({
      collapseObj: { ...state.collapseObj, [selectedTab]: !state.collapseObj[selectedTab] }
    }));
  }

  handleChapterSelection (
    chapter,
    selectedModule,
    selectedChapter,
    chapterType,
    chapterPath,
    chapterFid
  ) {
    this.setState({
      selectedChapter,
      selectedModule
    });
    const {
      getType,
      getPath,
      getFid,
      getModuleTitle,
      hideRightPanel,
      hideLeftPanel,
      setSelectedChapter
    } = this.props;
    getType(chapterType);
    getPath(chapterPath);
    getFid(chapterFid);
    getModuleTitle(selectedModule);
    hideRightPanel();
    hideLeftPanel();
    setSelectedChapter(chapter);
  }

  isOpened (title) {
    const { collapseObj } = this.state;
    return collapseObj[title];
  }

  render () {
    const {
      collapseObj,
      selectedChapter,
      selectedModule,
      collapseRecording,
      recordings
    } = this.state;
    const { LMSData = [] } = this.props;
    const course = LMSData;
    return (
      <div className="module-container mgt20" id="modulesList">
        {course.length > 0 && course.map((module, index) => (
          <div style={{ marginBottom: 20 }}>
            <div
              className="module-panel"
              {...buttonize(this.handleModuleSelection, module.title)}
            >
              <p>
                <span className="pr-2">
                  {
                    this.isOpened(module.title)
                      ? <FontAwesomeIcon icon={faAngleDown} />
                      : <FontAwesomeIcon icon={faAngleRight} />
                  }
                </span>
                {module.title}
              </p>
            </div>
            <Collapse isOpen={collapseObj[module.title]}>
              <Card>
                {module.chapters.length > 0
                  ? module.chapters.map(chapter => (
                    <CardBody className="chapter-content" onClick={() => this.handleChapterSelection(chapter, module.title, chapter.title, chapter.type, chapter.type_path, chapter.fid)}>
                      {(!chapter.type || chapter.type === 'Video') ? (
                        <p className={classNames({ selected: (selectedChapter === chapter.title && selectedModule === module.title) }, 'chapter')}>
                          { (selectedChapter === chapter.title && selectedModule === module.title) ? <FontAwesomeIcon icon={faVideo} className="fcw" /> : <FontAwesomeIcon icon={faVideo} className="video-color" />}
                          {chapter.title}
                        </p>
                      ) : (
                        <div className={classNames({ selected: (selectedChapter === chapter.title && selectedModule === module.title) }, 'chapter')}>
                          <p>
                            {
                              (selectedChapter === chapter.title && selectedModule === module.title)
                                ? <FontAwesomeIcon icon={faFilePdf} className="pdf-color" />
                                : <FontAwesomeIcon icon={faFilePdf} className="pdf-color" />
                            }
                          </p>
                          <p>
                            {chapter.title}
                          </p>
                        </div>
                      )}
                    </CardBody>
                  ))
                  : (!module.quiz || module.quiz.length === 0) && (
                    <p className="text-center text-muted mt-2">
                      No chapters Available
                    </p>
                  )
                }

                {(module.quiz !== undefined && module.quiz.length > 0) && (
                  <CardBody className="chapter-content" onClick={() => this.handleChapterSelection(module, module.title, 'Quiz', 'Quiz', '', module.quiz)}>
                    <p className={classNames({ selected: (selectedChapter === 'Quiz' && selectedModule === module.title) }, 'chapter')}>
                      <FontAwesomeIcon icon={faBookOpen} className="quiz-color" />
                      Quiz
                    </p>
                  </CardBody>
                )}
              </Card>
            </Collapse>
          </div>
        ))}
        { (recordings && recordings.length) > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div className="module-panel" {...buttonize(this.handleRecordingSelection)}>
              <p>
                {''}
              </p>
              <p>
                <span className="pr-2">
                  {
                    collapseRecording
                      ? <FontAwesomeIcon icon={faAngleDown} />
                      : <FontAwesomeIcon icon={faAngleRight} />
                  }
                </span>
                {'Recordings'}
              </p>
            </div>
            <Collapse isOpen={collapseRecording}>
              <Card>
                { (recordings && recordings.length) > 0 && recordings.map(item => (
                  <CardBody className="chapter-content" onClick={() => this.handleChapterSelection('Recordings', item, item.title, 'Video', item.recording, item.fid)}>
                    <p className="chapter">
                      <FontAwesomeIcon icon={faVideo} className="video-color" />
                      {item.title}
                    </p>
                  </CardBody>
                ))}
              </Card>
            </Collapse>
          </div>
        )}
      </div>
    );
  }
}

ModulePanel.propTypes = {
  LMSData: PropTypes.arrayOf({}).isRequired,
  getClassRecordings: PropTypes.func.isRequired,
  hideRightPanel: PropTypes.func.isRequired,
  hideLeftPanel: PropTypes.func.isRequired,
  getType: PropTypes.func.isRequired,
  getPath: PropTypes.func.isRequired,
  getFid: PropTypes.func.isRequired,
  getModuleTitle: PropTypes.func.isRequired,
  globalDetails: PropTypes.shape({}).isRequired,
  LMSDetails: PropTypes.arrayOf({}).isRequired,
  setSelectedChapter: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getClassRecordings: (payload, cb) => {
    dispatch(redordingsDetails(payload, cb));
  }
});

export const mapStateToProps = state => ({
  globalDetails: state.globalDetails,
  recordingsReducer: state.recordingsReducer,
  LMSDetails: state.LMSDetails
});

export default connect(mapStateToProps, mapDispatchToProps)(ModulePanel);
