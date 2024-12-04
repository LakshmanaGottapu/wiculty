import React from 'react';
import {
  Row, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import CareerAnnexure from './careerAnnexure';
import openingsLists from './openingJSON'

export default function CurrentOpening ({ handleWicultyOpening }) {
  return (
    <div className="wiculty-current-opening">
      <Row>
        <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }} className="mb-4">
          <p className="first" style={{ padding: 20 }}>
            {`Just check out the current openings at our workplace to join our magical mission in e-learning by directly shooting
            your resume to our recruitment desk at`}
            <a href="mailto:hr@wiculty.com">
              <span className="pdlr5 fcb">hr@wiculty.com</span>
            </a>
            {'Get Instant response for the Job posting listed below'}
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <div className="pitchHolderInner first career-opening-details">
            <h5 className="text-center pt-4">
              {'CURRENT JOB OPENINGS'}
            </h5>
            <Row className="mgt30">
              <Col lg={{ size: 6 }} md={{ size: 6 }} xs={{ size: 12 }}>
                {openingsLists.map(openingsSection => (
                  <CareerAnnexure
                    openingsSection={openingsSection}
                    handleWicultyOpening={openingName => handleWicultyOpening(openingName)}
                  />
                ))}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <address>
            <p className="first career-opening-contact" style={{ padding: 20 }}>
              {'Reach out to our recruitment desk'}
              <a href="tel:+919611430691" className="c-inherit">
                <span className="pdlr5 fcb">@ +91-9611430691</span>
              </a>
              {'to know updates on all our job posting !'}
            </p>
          </address>
        </Col>
      </Row>
    </div>
  )
}

CurrentOpening.propTypes = {
  handleWicultyOpening: PropTypes.func.isRequired
};
