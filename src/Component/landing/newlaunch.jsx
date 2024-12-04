import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faUserPlus, faUsers, faBrain, faLaptopCode, faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import Corapatarining from './trendingTopics/corapatarining';

class NewLaunchSec extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <React.Fragment>
        <Container fluid className="bg-lightes p-3 text-white">
          <Container className="">
            <div className="curriculumHome pitchHolderInner p-2">
              <Row className="mt-4 text-center">
                <Col>
                  <h2>Our Unique Pitches - Absolutely the best in training industry</h2>
                </Col>
              </Row>
              <Row className="mt-2 justify-content-center d-flex text-center">
                <Col sm="6" md="6" lg="6" className="feature-section hover-cardes p-3">
                  <Row>
                    <Col sm="12" md="2" lg="2" className="d-flex align-self-center">
                      <div className="feature-icon">
                        <FontAwesomeIcon icon={faBook} />
                      </div>
                    </Col>
                    <Col sm="12" md="10" lg="10">
                      <div className="feature-title mt-2">
                        <h5 className="font-weight-bold" style={{ color: '#0c5397' }}>Case study based learning approach</h5>
                      </div>
                      <div className="feature-desc mt-2">
                        <p>
                          {`Our modules are tailored with top domain based case studies
                          discussion to inculcate real time understanding
                          on ways logics can be used efficiently, a strong trait for learners.`}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="6" md="6" lg="6" className="feature-section hover-cardes">
                  <Row>
                    <Col sm="12" md="2" lg="2" className="d-flex align-self-center">
                      <div className="feature-icon color1">
                        <FontAwesomeIcon icon={faUserPlus} />
                      </div>
                    </Col>
                    <Col sm="12" md="10" lg="10">
                      <div className="feature-title mt-2">
                        <h5 className="font-weight-bold" style={{ color: '#ff6f00' }}>Skill grooming through psychology</h5>
                      </div>
                      <div className="feature-desc mt-2">
                        <p>
                          {`Our skill grooming approach builds a potential base for skillset planning,
                          engaging the innate & acquired skills through psychology
                          against our module-centric learning, filling the skill-gaps.`}

                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="6" md="6" lg="6" className="feature-section hover-cardes">
                  <Row>
                    <Col sm="12" md="2" lg="2" className="d-flex align-self-center">
                      <div className="feature-icon color2">
                        <FontAwesomeIcon icon={faUsers} />
                      </div>
                    </Col>
                    <Col sm="12" md="10" lg="10">
                      <div className="feature-title mt-2">
                        <h5 className="font-weight-bold" style={{ color: '#ff6f00' }}>Innovation-driven project ideation</h5>
                      </div>
                      <div className="feature-desc mt-2">
                        <p>
                          {`Learn & Apply - our sole mission is to promote practical
                          learning through hands-on training by putting the learners
                          on track of project
                          ideation & delivery, making them corporate ready.`}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="6" md="6" lg="6" className="feature-section hover-cardes">
                  <Row>
                    <Col sm="12" md="2" lg="2" className="d-flex align-self-center">
                      <div className="feature-icon color3">
                        <FontAwesomeIcon icon={faBrain} />
                      </div>
                    </Col>
                    <Col sm="12" md="10" lg="10">
                      <div className="feature-title mt-2">
                        <h5 className="font-weight-bold" style={{ color: '#0c5397' }}>Vibrant brainstorming sessions</h5>
                      </div>
                      <div className="feature-desc mt-2">
                        <p>
                          {`Learning through brainstorming! After completion of every module,
                          there will be a peer interaction on Trends/Doubts/Interview
                          bits from the topics etc. It’s indeed a worthy roll call.`}

                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="6" md="6" lg="6" className="feature-section hover-cardes">
                  <Row>
                    <Col sm="12" md="2" lg="2" className="d-flex align-self-center">
                      <div className="feature-icon  color4">
                        <FontAwesomeIcon icon={faLaptopCode} />
                      </div>
                    </Col>
                    <Col sm="12" md="10" lg="10">
                      <div className="feature-title mt-2">
                        <h5 className="font-weight-bold" style={{ color: '#0c5397' }}>LMS with learner’s engagement</h5>
                      </div>
                      <div className="feature-desc mt-2">
                        <p>
                          {`We built our own learner’s friendly LMS for high quality engagement
                          along the trial of knowledge enhancement through recorded videos,
                          quiz, interview questions, career tips etc.`}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="6" md="6" lg="6" className="feature-section hover-cardes">
                  <Row>
                    <Col sm="12" md="2" lg="2" className="d-flex align-self-center">
                      <div className="feature-icon color5">
                        <FontAwesomeIcon icon={faClipboardList} />
                      </div>
                    </Col>
                    <Col sm="12" md="10" lg="10">
                      <div className="feature-title mt-2">
                        <h5 className="font-weight-bold" style={{ color: '#ff6f00' }}>Concept planting triggers & coding knacks</h5>
                      </div>
                      <div className="feature-desc mt-2">
                        <p>
                          {`Our concept planting triggers along
                          the curriculum, loom a strong fabric on
                          concepts taught during the classes.
                          Coding knacks builds a concrete skillset of coding
                          during the hands-on sessions.`}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Container>
        </Container>
        <div>
          <Corapatarining />
        </div>
      </React.Fragment>
    );
  }
}

NewLaunchSec.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default withRouter(NewLaunchSec);
