import React, { useEffect } from 'react';
import {
  Row, Col, Container
} from 'reactstrap';
import TagManager from 'react-gtm-module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InstructorForm from './instructorForm';
import SecondSecMarketingTag from '../marketingtag/marketingtag';
import './instructor.scss';
import { IMAGES } from '../locales/images';
import SeoContentComp from '../common/seoContentComp';
import {
  instructorFlowArray,
  instructorQAArray,
  instructorTabContent
} from '../staticJson';

function Instructor (props) {
  const tagManagerArgs = {
    dataLayer: {
      userProject: 'Wiculty',
      page: 'Instructor',
      url: window.location.href
    },
    dataLayerName: 'PageDataLayer'
  }
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  TagManager.dataLayer(tagManagerArgs);

  return (
    <React.Fragment>
      <SeoContentComp seoKey="instructor" />
      <div className="instructor-conatiner">
        <div className="upper-section ft30" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.INSTRUCTOR_BANNER})` }}>
          <h1 id="tag-line" className="d-none">
            <span id="training-header" style={{ fontWeight: 'bold', fontSize: '2rem', marginRight: 10 }}>TRAINING</span>
            {'IS NOT'}
            <div>
              {'JUST A'}
              <span style={{ fontWeight: 'bold', fontSize: '2rem', marginLeft: 5 }}>JOB</span>
            </div>
            {'BUT MORE THAN THAT'}
          </h1>
          <h2 className="mt-4 d-none">Wiculty caters to build a world-class instructor network for better learning delivery</h2>
        </div>
        <Container fluid className="middle-section p-0">
          <Container>
            <Row>
              <Col lg="12" md="12" xs="12">
                <h2 className="text-center">
                  {'Take a Diligent & Rapid Push into the Instructor’s Crew of Wiculty '}
                </h2>
              </Col>
              <Col lg="12" md="12" xs="12">
                <Row>
                  {instructorFlowArray.map(flowItem => (
                    <Col sm="4" className="feature-section">
                      <div className="feature-grid position-relative">
                        <div className="feature-card border-line-style px-5 my-4">
                          <div className="feature-icon">
                            <FontAwesomeIcon icon={flowItem.icon} />
                          </div>
                          <div className="feature-title mt-2 font-weight-bold">
                            <h3>{flowItem.title}</h3>
                          </div>
                          <div className="feature-desc mt-2">
                            <p className="text-gray">
                              {`It is a long established fact that a reader will be distracted by
                              the readable content of a page when looking at its layout.`}
                            </p>
                          </div>
                          <span className="border-line">.</span>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
          <Container fluid className="bg_section">
            <Container>
              <Row className="bottom-section section-gap p-4">
                <Col sm="12">
                  <h2 className="text-center text-white bold">Happily sink into our training effectiveness before on boarding</h2>
                </Col>
                <Row className="mt-2">
                  <Col lg="6" sm="12" className="flex-vertical-center">
                    <Row>
                      {instructorQAArray.map(QaItem => (
                        <Col className="mb-4 col-12">
                          <h5 className="bold font-italic text-white">
                            {QaItem.Thought}
                          </h5>
                          <p className="bold font-italic text-white">
                            {QaItem.Question}
                          </p>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                  <Col lg="6" sm="12">
                    <InstructorForm />
                  </Col>
                </Row>
              </Row>
            </Container>
          </Container>
          <Container>
            <Row className="instructor-tabs section-gap">
              <SecondSecMarketingTag tabContent={instructorTabContent} heading1="Join the Vibrant Queue of Most Happening Training Canopy" heading2="Instructor-friendliness matters a lot to us" />
            </Row>
          </Container>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Instructor;
