import React, { Component } from 'react';
import {
  Container, Col, Row, Button
} from 'reactstrap';
import PropTypes from 'prop-types';

// const axios = require('axios');

class CCavenue extends Component {
  constructor (props) {
    super(props);
    this.callAvenue = this.callAvenue.bind(this);
    this.apiUrl1 = `${process.env.REACT_APP_USER_API_END_POINT_PAYMENT}paynow`;
    this.state = {
      orderId: props.orderId
    };
  }

  callAvenue () {
    const { orderId } = this.state;
    window.location.assign(`${this.apiUrl1}/${orderId}`);
  }

  render () {
    return (
      <Container fluid>
        <Container>
          <Row>
            <Col lg="12">
              <Button className="btn wic-btn-theme btn-lg" onClick={() => this.callAvenue()}>Pay Now</Button>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

CCavenue.propTypes = {
  orderId: PropTypes.isRequired
};

export default CCavenue;
