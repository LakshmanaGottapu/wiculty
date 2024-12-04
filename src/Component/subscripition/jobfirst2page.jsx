import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon }
  from '@fortawesome/react-fontawesome';
import {
  matrixsJSON,
  jobfirstJSON
} from './tramJSON';
import './subscription.scss';

const Subscriptionsteps = params => (
  <div>
    <Container>
      <div className=" my-5 tram-container">
        <h2 className="h1 text-center mb-4">
          {'Here’s how it works.'}
        </h2>
        {jobfirstJSON.map(({
          img, desc, order1, order2, shape, des
        }) => (
          <div className="row my-5">
            <div className={`col-12 col-md-6 ${order1}`}>
              <img className={`img-fluid img-height mb-4 ${shape}`} src={img} alt="tram" />
            </div>
            <div className={`col-12 col-md-6 d-flex align-items-center  ${order2}`}>
              <div>
                <h2 className="text-color font-weight-bold">
                  {des}
                </h2>
                <p className="">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="">
        <h2 className="text-center mb-4">About the course</h2>
        <Row className="matrixJSON">
          {matrixsJSON.map(item => (
            <Col>
              <div className="fa-icon-size text-center">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h5 className="font-weight-bold text-color text-center">
                {item.title}
              </h5>
              <p className="text-center">
                {item.desc}
              </p>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  </div>
)
export default Subscriptionsteps;
