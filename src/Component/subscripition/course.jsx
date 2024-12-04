import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { IMAGES } from '../locales/images';
import './subscription.scss';
import Subscriptionsteps from './subscriptionsteps';

const uniqueJSON = [
  {
    title: '3 Months',
    desc: '100',
    month: '/month*'
  },
  {
    title: 'Annual',
    desc: '300',
    month: '/month*'
  },
  {
    title: 'Group of 3+',
    desc: '12,500',
    month: '/month*'
  }
]

const Course = () => (
  <div>
    <Container className="">
      <Row className="my-4 text-center">
        <Col sm={12}>
          <h2 className="h1 mb-3">
            {'Unlock the full wiculty experience'}
          </h2>
          <p className="text-info">Get Ultimate access to all Devops, Aws,Azure decops</p>
        </Col>
      </Row>
      <Row>
        {uniqueJSON.map(({ title, desc, month }) => (
          <Col xs="12" sm="12" md="4">
            <Row className="wwu-item card shadow-lg wwu-height www-border">
              <Col className="p-0 m-0">
                <div>
                  <div className="p-4 text-center align-self-center text-white www-border www_color">
                    <h2>{title}</h2>
                  </div>
                  <div className="align-self-center p-5">
                    <div className=" d-flex font-weight-bold justify-content-center">
                      <div className="www-color">
                        {desc}
                        <span className="text-secondary">
                          {month}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center p-4">
                      <Link to="/all-courses">
                        <button type="button" className="btn btn-theme btn-md rounded-pill justify-content-center">
                          {'Browse All Courses'}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      <div className="text-center">
        <h2 className="pt-5">How its Works</h2>
        <p className="">Experiner the evolutions of online learning</p>
        <Row>
          <Col lg="12" md="12" sm="6">
            <img src={IMAGES.SUBSCRIPTION_IMAGE} className="img" alt="banner_ser" style={{ height: 500 }} />

          </Col>
        </Row>
        <div>
          <Link to="/all-courses">
            <button type="button" className="btn btn-theme btn-md rounded-pill justify-content-center">
              {'Browse All Courses'}
            </button>
          </Link>
        </div>
      </div>
    </Container>
    <div>
      <Subscriptionsteps />
    </div>
  </div>
)

export default Course;
