import React from 'react';
import {
  Row, Col, Container
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { marketcards } from '../staticJson';

export default function Marketingcards () {
  return (
    <>
      <Container fluid>
        <div className="Container-fluid text-center mt-5 mb-3 cardtext-dark">
          <h2 className="pt-5 font-weight-bold">Popular Category</h2>
          <p>Popular Category for learns</p>
          <div className="justify-content-center d-flex my-3">
            <Row className="p-4">
              {marketcards.map(referItem => (
                <Col sm="12" md="2" className="p-1">
                  <div className="card p-2 shadow-lg" style={{ minHeight: 270 }}>
                    <div className=" justify-content-center d-flex pt-3">
                      <FontAwesomeIcon
                        icon={referItem.icon}
                        className="fa-icon-size fa-icon-color m-2 fonticon-color"
                      />
                    </div>
                    <h3 className="m-4">
                      {referItem.Title}
                    </h3>
                    <p>
                      {referItem.Desc}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <Link to="/all-courses">
            <button type="button" className="btn btn-theme btn-md rounded-pill">
              {'Browse All Courses'}
            </button>
          </Link>
        </div>
      </Container>
    </>
  )
}
