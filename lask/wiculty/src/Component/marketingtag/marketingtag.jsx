import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Col, Row, Nav, NavItem, NavLink, TabContent, TabPane
} from 'reactstrap';
import classnames from 'classnames';

class SecondSecMarketingTag extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 1
    };
    this.timer = '';
  }

  componentDidMount () {
    this.setState({
      activeTab: 1
    })
    let count = 1;
    this.timer = setInterval(() => {
      count += 1;
      if (count === 5) {
        count = 1
      }
      this.toggle(count)
    }, 20 * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  toggle (tab) {
    const { activeTab } = this.state;
    if (activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render () {
    const { tabContent, heading1, heading2 } = this.props;
    const { activeTab } = this.state;
    return (
      <Col>
        {(heading1 || heading2) && (
          <Row>
            <Col className="text-center">
              <h2>{heading1}</h2>
              <h5 className="font-weight-normal">{heading2}</h5>
            </Col>
          </Row>
        )}
        <Row className="mt-4 mb-4 wiculty-tab-pills">
          <Nav tabs justified>
            {tabContent.map(item => (
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === item.tab })}
                  onClick={() => { this.toggle(item.tab); }}
                >
                  {item.header}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={activeTab} className="wiculty-img-tab-pane">
            {tabContent.map(item => (
              <TabPane tabId={item.tab}>
                <Row>
                  <Col sm="12" className="padding0">
                    <img src={item.content} className="img-fluid shadow-lg" alt="content" />
                  </Col>
                </Row>
              </TabPane>
            ))}
          </TabContent>
        </Row>
      </Col>
    );
  }
}

SecondSecMarketingTag.propTypes = {
  tabContent: PropTypes.isRequired,
  heading1: PropTypes.isRequired,
  heading2: PropTypes.isRequired
};

export default withRouter(SecondSecMarketingTag);
