import React from 'react';
import { Row, Col, Container } from 'reactstrap';
// import { Link } from 'react-router-dom';

import './subscription.scss';
// import Subscriptionsteps from './subscriptionsteps';
const after = [
  {
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/OrderSummary.png',
    numimg: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/1.png',
    content: 'I am quite happy with Gamutguru’s pay after placement services.'
  },
  {
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/login.png',
    numimg: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/2.png',
    content: 'The trainers and staff of Gamutgurus are quite helpful.'
  },
  {
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/myCourses.png',
    numimg: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/3.png',
    content: 'Always go for ggpap if you want to learn something'
  }
]

const Afterorder = () => (
  <div>
    <Container fluid className="">
      <Row className="my-4 text-center">
        <Col sm={12}>
          <h2 className="h1 mb-3 pt-4">
            {'Unlock the full wiculty experience'}
          </h2>
        </Col>
      </Row>
      <Row>
        {after.map(({ imgs, content, numimg }) => (
          <Col xs="12" sm="4" lg="4" md="4" className="p-0 m-0 container">
            <Row className="p-0 m-0">
              <Col className="p-0 m-0">
                <div>
                  <div className="cont">
                    <img src={imgs} alt="tram" style={{ height: 210 }} />
                    <div className="font-weight-bold p-2">
                      <img src={numimg} alt="tram" style={{ height: 30 }} />
                      {content}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  </div>
)

export default Afterorder;
