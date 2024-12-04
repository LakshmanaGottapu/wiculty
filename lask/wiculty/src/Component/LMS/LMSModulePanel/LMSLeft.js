import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import ModulePanel from './modulePanel';
import { MESSAGES } from '../../locales/locale';

import './LMSModule.scss';

const { ERROR: { NO_CONTENT } } = MESSAGES;

class LMSModulePanel extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showModules: true,
      isMobile: false
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { isMobile } = props;
    if (isMobile !== state.isMobile) {
      // return {
      //   showModules: false,
      //   isMobile: true
      // }
      return {
        showModules: true,
        isMobile: true
      }
    }
    return null
  }

  handleType = (type) => {
    const { getParentType } = this.props;
    getParentType(type);
  }

  handlePath = (path) => {
    const { getParentPath } = this.props;
    getParentPath(path);
  }

  handleFid = (path) => {
    const { getParentFid } = this.props;
    getParentFid(path);
  }

  handleModuleTitle = (mTitle) => {
    const { getParentModuleTitle } = this.props;
    getParentModuleTitle(mTitle);
  }

  toggleShowModules = () => {
    this.setState(state => ({
      showModules: !state.showModules
    }))
  }

  render () {
    const {
      handleModuleFiltering,
      hideRightPanel,
      hideLeftPanel,
      isMobile,
      LMSData,
      setSelectedChapter
    } = this.props;
    const { showModules } = this.state;
    return (
      <div className="lms-module-container">
        <div className="lms-header d-none d-lg-block">
          <h3 className="mb-0">
            Course Material
          </h3>
        </div>
        { showModules && (
          <>
            <div className="d-flex d-lg-none justify-content-between p-1">
              <p className="mb-0 p-1 font-weight-bold">
                Course Material
              </p>
              <button type="button" className="btn btn-link" onClick={hideLeftPanel}>
                <FontAwesomeIcon icon={faTimes} />
                <span className="pl-1">
                  Close
                </span>
              </button>
            </div>
            <div className="lms-search">
              <div className="lms-input">
                <input type="text" placeholder="Search course content" onChange={event => handleModuleFiltering(event)} />
              </div>
              <div className="lms-search-button flex-vertical-center">
                <FontAwesomeIcon icon={faSearch} />
              </div>
            </div>
          </>
        )}
        {(showModules) ? (
          <ModulePanel
            getType={this.handleType}
            getPath={this.handlePath}
            getFid={this.handleFid}
            getModuleTitle={this.handleModuleTitle}
            hideRightPanel={hideRightPanel}
            hideLeftPanel={hideLeftPanel}
            LMSData={LMSData}
            setSelectedChapter={setSelectedChapter}
          />
        ) : (!isMobile && <div className="no-course-content">{NO_CONTENT}</div>)
        }
      </div>
    )
  }
}

LMSModulePanel.propTypes = {
  handleModuleFiltering: PropTypes.func.isRequired,
  getParentType: PropTypes.func.isRequired,
  getParentPath: PropTypes.func.isRequired,
  getParentFid: PropTypes.func.isRequired,
  getParentModuleTitle: PropTypes.func.isRequired,
  hideRightPanel: PropTypes.func.isRequired,
  hideLeftPanel: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  LMSData: PropTypes.arrayOf({}).isRequired,
  setSelectedChapter: PropTypes.func.isRequired
}
export default LMSModulePanel;
