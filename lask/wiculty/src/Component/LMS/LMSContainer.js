import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import LMSContents from './LMSContents';
import LMSMiddleContainer from './LMSMiddleContainer';

import LMSPDFViewer from './LMSPdf/pdf-viewer';
// import LMSPdf from './LMSPdf/pdf-reader';
import LMSLeftPanel from './LMSModulePanel/LMSLeft';
import sf from '../common/safeTraverse';
import menuBar from '../../img/menu.svg';
import LMSright from './LMSright';
import FullScreen from '../../img/full-screen-button.svg';
import ExitFullScreen from '../../img/full-screen-exit.svg';
import QuizContainer from './Quiz/QuizContainer';
import setGlobalDataAction from '../../Actions/globalDataAction';
import LMSAction from './LMSAction';
import LMSVideo from './components/LMSVideo';
// import Quiz from './quiz';
import './LMS.scss';

import { IMAGES } from '../locales/images';

class LMSContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      fullScreen: false,
      leftPanelHide: false,
      rightPanelHide: false,
      orgLMSData: [],
      chapterType: null,
      chapterPath: '',
      chapterFid: null,
      moduleTitle: '',
      isMobile: false,
      moduleSearchVal: '',
      selectedChapter: false,
      isLoading: true
    };
    window.scroll(0, 0);
    this.hideRightPanel = this.hideRightPanel.bind(this);
    this.LMSContainerWidth = '100%';
  }

  componentDidMount () {
    const w = document.body.scrollWidth;
    const {
      setGlobalData,
      getLMSDetails, globalDetails = {}
    } = this.props;
    if (w < 911) {
      this.setState({
        isMobile: true,
        rightPanelHide: true
      });
    }
    const { courseSlug, courseBatchId } = globalDetails;
    getLMSDetails({ courseSlug, batch_id: courseBatchId }, (resp) => {
      const LMSData = sf(resp, ['data', 'data', 'course']) || [];
      let selectedChapter = false;
      if (LMSData.length > 0) {
        if (LMSData && LMSData[0] && LMSData[0].chapters && LMSData[0].chapters[0]) {
          selectedChapter = LMSData[0].chapters[0]; //eslint-disable-line
        }
      }
      this.setState({
        selectedChapter,
        isLoading: false
      });
    });
    setGlobalData({ currentPage: 'hideFooter' }, (resp) => {});
  }

  componentDidUpdate () {
    const ele = document.getElementsByClassName('LMS-middle-panel');
    this.LMSContainerWidth = ele[0] && ele[0].offsetWidth
  }

  componentWillUnmount () {
    const { setGlobalData } = this.props;
    setGlobalData({ currentPage: 'showFooter' }, (resp) => {})
  }

  static getDerivedStateFromProps (props, state) {
    const { LMSDetails } = props || {}
    const LMSData = sf(LMSDetails, ['data', 'data', 'course']) || [];
    if (LMSData.length > 0) {
      return {
        orgLMSData: LMSData
      }
    }
    return null
  }

  setSelectedChapter (chapter) {
    this.setState({
      selectedChapter: chapter
    })
  }

  handleParentType = (type) => {
    this.setState({
      chapterType: type
    })
  }

  handleParentPath = (path) => {
    this.setState({
      chapterPath: path
    })
  }

  handleParentFid = (fid) => {
    this.setState({
      chapterFid: fid
    })
  }

  handleModuleTitle = (mt) => {
    this.setState({
      moduleTitle: mt
    })
  }

  toggleFullScreen () {
    this.setState(state => ({
      fullScreen: !state.fullScreen
    }))
  }

  toggleRightPanel () {
    const { rightPanelHide } = this.state;
    this.setState({ rightPanelHide: !rightPanelHide })
    // const className = rightPanelHide ? 'rightPanelOutAnim' : 'rightPanelInAnim';
    // const timeout = rightPanelHide ? 500 : 0;
    // // let fade out animation happen
    // // then set the flag
    // const el = document.getElementById('LMSRightPanel');
    // if (el) {
    //   el.className = className;
    // }
    // setTimeout(() => {
    //   this.setState({ rightPanelHide: !rightPanelHide })
    // }, timeout);
  }

  hideRightPanel () {
    this.setState(state => ({
      rightPanelHide: true
    }))
  }

  showLeftPanel () {
    this.setState(state => ({
      leftPanelHide: false
    }))
  }

  hideLeftPanel () {
    this.setState(state => ({
      leftPanelHide: true
    }))
  }

  handleModuleFiltering (event) {
    const { target: { value } } = event;
    this.setState({
      moduleSearchVal: value
    })
  }

  render () {
    const {
      fullScreen,
      rightPanelHide,
      leftPanelHide,
      chapterType,
      chapterPath,
      chapterFid,
      moduleTitle,
      isMobile,
      moduleSearchVal,
      orgLMSData,
      selectedChapter,
      isLoading
    } = this.state;

    const {
      type
    } = selectedChapter;

    const {
      offerInfo,
      match: { params: { slug } },
      LMSDetails,
      recordingsReducer
    } = this.props || {};
    const rec = sf(recordingsReducer, ['data', 'data']) || {};
    const { recordings = [] } = rec;
    if (recordings && recordings.length > 0) {
      recordings.forEach((r) => {
        r.id = r.fid;
        r.type = 'Video';
        r.type_path = r.recording;
      })
    }
    const { offer_banner = {} } = offerInfo
    const isOfferBaner = Object.keys(offer_banner).length
    const isSelfpaced = Boolean(Number(sf(LMSDetails, ['data', 'data', 'is_selfpaced']))) || false;
    const filterChapters = (module = []) => module.chapters
      .filter(chapter => chapter.title.toLowerCase().replace(/ /g, '')
        .includes(moduleSearchVal.toLowerCase().replace(/ /g, '')))

    const LMSData = orgLMSData
      .filter(moduleItem => (moduleItem.title.toLowerCase().replace(/ /g, ''))
        .includes(moduleSearchVal.toLowerCase().replace(/ /g, '')) || filterChapters(moduleItem).length > 0)

    return (
      <>
        {isLoading && <div className="loading" />}
        <div className="lms-page d-none d-lg-flex">
          <LMSContents
            LMSData={LMSData}
            leftPanelHide={leftPanelHide}
            hideLeftPanel={() => this.hideLeftPanel()}
            setSelectedChapter={chapter => this.setSelectedChapter(chapter)}
            selectedChapter={selectedChapter}
            recordings={recordings}
          />
          <LMSMiddleContainer
            selectedChapter={selectedChapter}
            leftPanelHide={leftPanelHide}
            showLeftPanel={() => this.showLeftPanel()}
            isSelfpaced={isSelfpaced}
          />
        </div>
        <div className={classNames('lms-container d-block d-lg-none', { offerBaner: isOfferBaner })}>
          {!fullScreen && (
            <Row className="LMS-header-bar">
              <Col className="d-none d-lg-block" lg={{ size: 9 }} md={{ size: 12 }} xs={{ size: 12 }}>
                <div className="ml-4">
                  <span>
                    <FontAwesomeIcon icon={faTv} style={{ color: '#F7624C' }} />
                  </span>
                  <span>
                    <span style={{ color: '#ff6f00', paddingRight: 5 }}>
                      {'Wiculty'}
                    </span>
                    {'Lecture Bay'}
                  </span>
                </div>
              </Col>
              <Col className="d-flex d-lg-none justify-content-between">
                <button type="button" className="btn btn-link" onClick={() => this.showLeftPanel()}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                  <span className="pl-1">
                    Course Content
                  </span>
                </button>
                {!isSelfpaced && (
                  <button type="button" className="btn btn-link" onClick={() => this.toggleRightPanel()}>
                    <span className="pr-1">
                    Upcoming Classes
                    </span>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </button>
                )}
              </Col>
              {!isSelfpaced && rightPanelHide && (
                <Col
                  lg={{ size: 3 }}
                  md={{ size: 12 }}
                  xs={{ size: 12 }}
                  className="rightPanelInAnim d-none d-lg-flex"
                  id="LMSRightPanel"
                >
                  <div>
                    <span role="button" tabIndex={0} onKeyPress={() => {}} onClick={() => this.toggleRightPanel()}>
                      <img src={menuBar} alt="menuBar" />
                    </span>
                    <span>
                      {'Upcoming Classes'}
                    </span>
                  </div>
                </Col>
              )}
            </Row>
          )}
          <Row className="LMS-view">
            <Col
              className={classNames('LMS-left-panel', { 'full-screen': fullScreen, 'show-left-panel': (isMobile && !leftPanelHide) })}
              lg={{ size: 3 }}
              md={{ size: 12 }}
              xs={{ size: 12 }}
            >
              <LMSLeftPanel
                LMSData={LMSData}
                getParentType={this.handleParentType}
                getParentPath={this.handleParentPath}
                getParentFid={this.handleParentFid}
                getParentModuleTitle={this.handleModuleTitle}
                handleModuleFiltering={event => this.handleModuleFiltering(event)}
                hideRightPanel={this.hideRightPanel}
                hideLeftPanel={() => this.hideLeftPanel()}
                isMobile={isMobile}
                setSelectedChapter={chapter => this.setSelectedChapter(chapter)}
              />
            </Col>
            <Col
              className={classNames('LMS-middle-panel flex-vertical-center', { 'full-screen': fullScreen })}
              lg={{ size: fullScreen ? 12 : 8 }}
              md={{ size: 12 }}
              xs={{ size: 12 }}
            >
              {type === 'Video' &&
                <LMSVideo chapter={selectedChapter} />
              }
              {chapterType === 'PDF' && (
                <LMSPDFViewer
                  chapterPath={chapterPath}
                  fullScreen={fullScreen}
                  toggleFullScreen={() => this.toggleFullScreen()}
                />

              )}
              {chapterType === 'Quiz' && (
                <QuizContainer
                  quizList={chapterFid}
                  moduleTitle={moduleTitle}
                  handleParentFid={this.handleParentType}
                />
              )}
              {(chapterType === null || chapterType === undefined) && (
                <div className="no-lms-content text-center">
                  <img src={IMAGES.LMS_HOME} alt="LMS Home page" className="img img-fluid" />
                </div>
              )
              }
              {['PDF'].includes(chapterType) && (
                <div className="screen-footer d-none">
                  {fullScreen ? (
                    <div
                      className="exit-full-screen"
                      title="Exit Full Screen"
                      role="button"
                      tabIndex={0}
                      onKeyPress={() => {}}
                      onClick={() => this.toggleFullScreen()}
                    >
                      <img src={ExitFullScreen} alt="ExitFullScreen" />
                    </div>
                  ) : (
                    <div
                      role="button"
                      className="full-screen"
                      title="Full Screen"
                      tabIndex={0}
                      onKeyPress={() => {}}
                      onClick={() => this.toggleFullScreen()}
                    >
                      <img src={FullScreen} alt="FullScreen" />
                    </div>
                  )
                  }
                </div>
              )}
            </Col>
            {!isSelfpaced && (
              <Col className={classNames('LMS-right-panel',
                { 'full-screen': fullScreen, 'hide': rightPanelHide, 'offerBanner': isOfferBaner })}
              >
                <LMSright
                  toggleRightPanel={() => this.toggleRightPanel()}
                  courseName={slug || ''}
                />
              </Col>
            )}
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  LMSDetails: state.LMSDetails,
  offerInfo: state.offerReducer,
  globalDetails: state.globalDetails,
  recordingsReducer: state.recordingsReducer
});

const mapDispatchToProps = dispatch => ({
  setGlobalData: (payload, cb) => {
    dispatch(setGlobalDataAction(payload, cb));
  },
  getLMSDetails: (payload, cb) => {
    dispatch(LMSAction(payload, cb));
  }
});

LMSContainer.propTypes = {
  setGlobalData: PropTypes.func.isRequired,
  getLMSDetails: PropTypes.func.isRequired,
  globalDetails: PropTypes.shape({}).isRequired,
  LMSDetails: PropTypes.shape({}).isRequired,
  recordingsReducer: PropTypes.shape({}).isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(LMSContainer);
