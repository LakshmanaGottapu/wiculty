import React from 'react';
import { Row, Col } from 'reactstrap';

export default function CommunitySec (params) {
  return (
    <Row className="community my-3 p-3">
      <Col lg="8" sm="12" md="8">
        <h2 className="title-color">
            JOIN OUR COMMUNITY
        </h2>
        <ul className="text-secondary">
          <li>
            Get updated about latest technology webinars i.e DevOps, Cloud, Machine Learning etc.
          </li>
          <li>Exclusive access to curated and personalized content from wiculty</li>
          <li>Win huge and exclusive discounts on all Wiculty! courses </li>
        </ul>
      </Col>
      <Col className="flex-vertical-center" lg="4" sm="12" md="4">
        <a type="button" className="btn btn-btn btn-theme btn-md" href="http://community.wiculty.com/">
            JOIN NOW
        </a>
      </Col>
    </Row>
  )
}
