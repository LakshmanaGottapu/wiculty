import React, { Component } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  Collapse, CardBody, Card, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import AssetModal from '../modals/assetModal';
import { buttonize } from '../utilFunctions/utilFunction'
import './accordian.scss';

const setOpenFirstItemInCuricullam = (tabArray, openFirst, collapseObj) => {
  // if open openFirst default open first
  if (tabArray && tabArray.length > 0) {
    if (openFirst) {
      const [item] = tabArray;
      if (item) {
        collapseObj[1] = item.id;
      }
    }
    return collapseObj;
  }
  return collapseObj;
}
class Accordian extends Component {
  constructor (props) {
    super(props);
    this.state = {
      collapseObj: {},
      selectedModule: '',
      videoURL: 'https://www.youtube.com/embed/HvOoxjQBMJE',
      modalOpen: false
    };
  }

  static getDerivedStateFromProps (props, state) {
    const { tabArray, openFirst = false, selectedModule } = props;
    const { collapseObj } = state;
    if (selectedModule !== state.selectedModule) {
      const collapseObjInfo = setOpenFirstItemInCuricullam(tabArray, openFirst, collapseObj);
      return {
        selectedModule,
        collapseObj: collapseObjInfo
      }
    }
    return null
  }

  componentDidMount () {
    const { tabArray, openFirst } = this.props;
    const { collapseObj } = this.state;
    const collapseObjInfo = setOpenFirstItemInCuricullam(tabArray, openFirst, collapseObj);
    this.setState({ collapseObj: collapseObjInfo });
  }

  onModalClose () {
    this.setState({
      modalOpen: false
    })
  }

  getMultiLevel (item, level) {
    const { hasSubsection, description, sub_sections = [] } = item || {};
    const levelData = hasSubsection
      ? this.renderAccordion(sub_sections, level + 1)
      : parse(description);

    return levelData
  }

  toggle =(selectedTab, level) => {
    const { collapseObj } = this.state;
    if (collapseObj &&
      collapseObj[level] &&
      collapseObj[level] === selectedTab
    ) {
      collapseObj[level] = null;
    } else {
      collapseObj[level] = selectedTab;
    }
    this.setState({ collapseObj })
  }

  toggleModal (e, url) {
    e.stopPropagation();
    this.setState({
      modalOpen: true,
      videoURL: url
    })
  }

  renderAccordion (tabArray, level) {
    const { collapseObj } = this.state
    return tabArray.map(item => (
      <div className="chapterSection">
        <div
          className={classnames('chapterSection_accordian_tab', { active: collapseObj[level] === item.id })}
          {...buttonize(this.toggle, item.id, level)}
        >
          <div className="flex-vertical-center">
            {collapseObj[level] === item.id
              ? (
                <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg>
              )
              : (
                <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              )}
          </div>
          <div className="chapterSection_accordian_title">
            <p className="chapterSection_title flex-vertical-center mb-0">
              {item.title}
            </p>
            <div>
              {item.type_path ? (
                <div>
                  <Button color="link" onClick={e => this.toggleModal(e, item.type_path)}>
                    <span className="d-none d-md-inline"> Preivew </span>
                    <FontAwesomeIcon icon={faPlayCircle} className="ml-2 preview-video" />
                  </Button>
                </div>
              ) : ''}
            </div>
          </div>
        </div>
        <Collapse isOpen={(collapseObj[level] === item.id)}>
          <Card>
            <CardBody>
              {this.getMultiLevel(item, level)}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    ))
  }

  render () {
    const { tabArray = [] } = this.props;
    const { videoURL, modalOpen } = this.state;
    return (
      <>
        <div className="accordian-container border-top">
          {this.renderAccordion(tabArray, 1)}
        </div>
        <AssetModal
          type="video"
          src={videoURL}
          showModal={modalOpen}
          onModalClose={() => this.onModalClose()}
        />
      </>
    );
  }
}
Accordian.propTypes = {
  tabArray: PropTypes.isRequired,
  openFirst: PropTypes.bool
};

Accordian.defaultProps = {
  openFirst: false
}

export default Accordian;
