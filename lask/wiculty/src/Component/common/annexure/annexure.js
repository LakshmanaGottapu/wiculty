import React, { Component } from 'react';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  Collapse, CardBody, Card
} from 'reactstrap';
import { buttonize } from '../utilFunctions/utilFunction';
import './annexure.scss'

class Annexure extends Component {
  constructor (props) {
    super(props);
    this.state = {
      collapseObj: {}
    };
  }

  componentDidMount () {
    const { tabArray } = this.props;
    this.setOpenFirstItemInCuricullam(tabArray);
  }

  getMultiLevel (item) {
    const { hasSubsection, description, sub_sections = [] } = item || {};
    const levelData = hasSubsection ? this.renderAccordion(sub_sections, 'level2') : parse(description);

    return levelData
  }

  setOpenFirstItemInCuricullam (tabArray) {
    // for curicullam by default open first item
    const { source } = this.props;
    const { collapseObj } = this.state;

    if (tabArray && tabArray.length > 0) {
      if (source === 'curriculum') {
        const [item] = tabArray;
        if (item) {
          collapseObj[item.id] = true;
        }
      }
      this.setState({ collapseObj });
    }
  }

  toggle = (selectedTab, level) => {
    if (level === 'level1') {
      this.setState(state => ({
        collapseObj: { [selectedTab]: !state.collapseObj[selectedTab] }
      }));
    } else {
      this.setState(state => ({
        collapseObj: { ...state.collapseObj, [selectedTab]: !state.collapseObj[selectedTab] }
      }));
    }
  }

  renderAccordion (tabArray, level) {
    const { collapseObj } = this.state
    return tabArray.map(item => (
      <div>
        <div
          className={classnames('annexure-tab mb-2', { active: collapseObj[item.id] })}
          {...buttonize(this.toggle, item.id, level)}

        >
          <div className="annexure-title">
            <p>
              <FontAwesomeIcon className="mr-2 wic-color" icon={faCircle} />
            </p>
            <p>
              {item.title}
            </p>
          </div>
          <div className="flex-vertical-center">
            {collapseObj[item.id] ? (<p className="plus">-</p>) : (<p className="minus">+</p>)}
          </div>
        </div>
        <Collapse isOpen={(collapseObj[item.id])}>
          <Card>
            <CardBody>
              {this.getMultiLevel(item)}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    ))
  }

  render () {
    const { tabArray = [] } = this.props;
    return (
      <div className="annexure-container">
        {this.renderAccordion(tabArray, 'level1')}
      </div>
    );
  }
}
Annexure.propTypes = {
  tabArray: PropTypes.isRequired,
  source: PropTypes.string.isRequired
};

export default Annexure;
