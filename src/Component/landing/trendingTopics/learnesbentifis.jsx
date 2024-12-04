import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { IMAGES } from '../../locales/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faUserPlus, faUsers, faBrain, faLaptopCode, faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import './corapatarining.scss';

export default function Learnesbentifis () {
  return (
    <React.Fragment>
      <Container fluid className="bg_colors p-3">
        <Container className="">
          <div className="curriculumHome pitchHolderInner p-2">
            <Row className="mt-4 text-center">
              <Col className="align-self-start d-flex text-white">
                <h2>Learnes Bentifics</h2>
              </Col>
            </Row>
            <div>
              <Row className="mt-2 justify-content-center d-flex text-center">
                <Col sm="12" md="4" lg="4" className="p-0">
                  <div className="card feature-section p-3">
                    <Row>
                      <Col sm="12" md="3" lg="3" className="d-flex align-self-center">
                        <div className="feature-icon">
                          <FontAwesomeIcon icon={faBook} />
                        </div>
                      </Col>
                      <Col sm="12" md="9" lg="9">
                        <div className="feature-title mt-2">
                          <h5 className="font-weight-bold">Case study based learning approach</h5>
                        </div>
                        <div className="feature-desc mt-2">
                          <p>
                            {'Our modules are tailored with top'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm="12" md="4" lg="4">
                  <div className="card feature-section p-3">
                    <Row>
                      <Col sm="12" md="3" lg="3" className="d-flex align-self-center">
                        <div className="feature-icon color2">
                          <FontAwesomeIcon icon={faUserPlus} />
                        </div>
                      </Col>
                      <Col sm="12" md="9" lg="9">
                        <div className="feature-title mt-2">
                          <h5 className="font-weight-bold">Skill grooming through psychology</h5>
                        </div>
                        <div className="feature-desc mt-2">
                          <p>
                            {'Our skill grooming approach builds'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm="12" md="4" lg="4" className="p-0">
                  <div className="card feature-section p-3">
                    <Row>
                      <Col sm="12" md="3" lg="3" className="d-flex align-self-center">
                        <div className="feature-icon color6">
                          <FontAwesomeIcon icon={faUsers} />
                        </div>
                      </Col>
                      <Col sm="12" md="9" lg="9">
                        <div className="feature-title mt-2">
                          <h5 className="font-weight-bold">Innovation-driven project ideation</h5>
                        </div>
                        <div className="feature-desc mt-2">
                          <p>
                            {'Learn & Apply - our sole mission'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm="12" md="4" lg="4" className="p-0">
                  <div className="card feature-section p-3">
                    <Row>
                      <Col sm="12" md="3" lg="3" className="d-flex align-self-center">
                        <div className="feature-icon color1">
                          <FontAwesomeIcon icon={faBrain} />
                        </div>
                      </Col>
                      <Col sm="12" md="9" lg="9">
                        <div className="feature-title mt-2">
                          <h5 className="font-weight-bold">Vibrant brainstorming sessions</h5>
                        </div>
                        <div className="feature-desc mt-2">
                          <p>
                            {'Learning through brainstorming!'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm="12" md="4" lg="4">
                  <div className="card feature-section p-3">
                    <Row>
                      <Col sm="12" md="3" lg="3" className="d-flex align-self-center">
                        <div className="feature-icon">
                          <FontAwesomeIcon icon={faLaptopCode} />
                        </div>
                      </Col>
                      <Col sm="12" md="9" lg="9">
                        <div className="feature-title mt-2">
                          <h5 className="font-weight-bold">LMS with learner’s engagement</h5>
                        </div>
                        <div className="feature-desc mt-2">
                          <p>
                            {'We built our own learner’s friendly'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col sm="12" md="4" lg="4" className="p-0">
                  <div className="card feature-section p-3">
                    <Row>
                      <Col sm="12" md="3" lg="3" className="d-flex align-self-center">
                        <div className="feature-icon color2">
                          <FontAwesomeIcon icon={faClipboardList} />
                        </div>
                      </Col>
                      <Col sm="12" md="9" lg="9">
                        <div className="feature-title mt-2">
                          <h5 className="font-weight-bold">Concept planting triggers & coding knacks</h5>
                        </div>
                        <div className="feature-desc mt-2">
                          <p>
                            {'Our concept planting triggers coding knacks'}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Container>
      </Container>

    </React.Fragment>
  );
}
