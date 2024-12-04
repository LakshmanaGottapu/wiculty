import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { IMAGES } from '../../locales/images';
import Learnesbentifis from './learnesbentifis';
import './corapatarining.scss';

export default function career () {
  return (
    <>
      <Container className="justify-content-center p-0">
        <Container className="mb-4">
          <Row className="mt-2 justify-content-center d-flex text-center">
            <Col sm="8" md="12" lg="12" className="feature-section card shadow-lg">
              <Row>
                <Col sm="12" md="8" lg="8" className="align-self-center">
                  <h2 className="font-weight-bold">Carrer Transition</h2>
                  <p>
                    {`Our modules are tailored with top domain based case studies
                    discussion to inculcate real time understanding
                    on ways logics can be used efficiently, a strong trait for learners.`}

                  </p>
                  <button type="button" className="btn btn-md rounded-pill mt-3 pl-5 pr-5 p-2 btn-theme">
                    {'Start Refer'}
                  </button>
                </Col>
                <Col sm="12" md="4" lg="4">
                  <img src={IMAGES.CAREER_IMAGE} className="img" alt="images" style={{ height: '230px' }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <div>
        <Learnesbentifis />
      </div>
    </>
  );
}
