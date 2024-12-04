import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Jobfirst2page from './jobfirst2page';
import { IMAGES } from '../locales/images';
import './subscription.scss';

export default function Jobfirst () {
  return (
    <div>
      <div>
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.ABOUTUS_BANNER})`, height: 400 }} />
        <Container className="mt-4 Container">
          <h2 className="mt-4 text-center font-weight-bold text-color">Job First Training</h2>
          <p className="mt-1 text-center">Upgardey you life of next level</p>
          <Row>
            <Col md="6" lg="6" sm="12" className="p-0">
              <img src={IMAGES.JOBFIRST_IMAGE} className="img" alt="images" style={{ height: '420px' }} />
            </Col>
            <Col md="6" lg="6" sm="12" className="text-dark d-flex align-self-center p-0">
              <div className="text-center d-flex">
                <div className="text-justify">
                  <h2 className="title font-weight-bold text-color">Enterprise Training Solutions</h2>
                  <p>
                    {`How to optimise the tech skills of your Employees??
                    Leave it to us! We know the pulse of corporate training
                    How to optimise the tech skills of your Employees??
                    Leave it to us! We know the pulse of corporate training`}
                  </p>
                  <button type="button" className="btn btn-md rounded-pill mt-3 pl-5 pr-5 p-2 btn-theme">
                    {'Start Refer'}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
          <Container className="justify-content-center p-0">
            <Container className="m-4 Container">
              <Row className="mt-2 justify-content-center d-flex text-center ">
                <Col sm="8" md="12" lg="12" className="feature-section card bg-light">
                  <Row>
                    <Col sm="12" md="8" lg="8" className="align-self-center text-center">
                      <h2 className="font-weight-bold font_size text-color">Try Wiculty Membership Today!</h2>
                      <p className="text-danger"> How to optimise the tech skills of your Employees</p>
                      <div className="justify-content-center d-flex">
                        <button type="button" className="btn btn-md rounded-pill mt-2 pl-5 pr-5 p-2 btn-theme align-self-left d-flex justify-content-center">
                          {'Start Refer'}
                        </button>
                      </div>
                    </Col>
                    <Col sm="12" md="4" lg="4">
                      <img src={IMAGES.SUBJOBFIRST_IMAGE} className="img" alt="images" style={{ height: '250px' }} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Container>
          <div>
            <Jobfirst2page />
          </div>
        </Container>
      </div>
    </div>
  );
}
