import React from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const CourseTakeAways = () => (
  <div className="container-fluid bg-white my-4">
    <div className="job-assistance-menu-container container mt-4">
      <h2 className="d-flex mb-0">Job Assistance</h2>
      <div className="mt-4">
        <Row className="batch-details-usps">
          <Col xs={12} sm={6} md={4} className="batch-details-usp-item mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
            Mock Interview preparation
          </Col>
          <Col xs={12} sm={6} md={4} className="batch-details-usp-item mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
            Project explanation for interviews
          </Col>
          <Col xs={12} sm={6} md={4} className="batch-details-usp-item mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
            Resume building
          </Col>
          <Col xs={12} sm={6} md={4} className="batch-details-usp-item mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
            Dedicated Job portal
          </Col>
          <Col xs={12} sm={6} md={4} className="batch-details-usp-item mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
            Interviews with top companies
          </Col>
          <Col xs={12} sm={6} md={4} className="batch-details-usp-item mb-4">
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2 mt-1 text-success" />
            Placement assistance
          </Col>
        </Row>
      </div>
    </div>
  </div>

)

export default CourseTakeAways;
