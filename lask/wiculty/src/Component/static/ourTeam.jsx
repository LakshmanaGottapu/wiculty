import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Container, Row, Col
} from 'reactstrap';
import { getBannerMarginTop } from '../common/utilFunctions/utilFunction';

class OurTeam extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <React.Fragment>
        <Container fluid className="allCourses" style={{ marginTop: getBannerMarginTop(100, 20) }}>
          <Col lg="12">
            <Row className="staticRow">
              <h1>Our Team</h1>
            </Row>
          </Col>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(OurTeam);
