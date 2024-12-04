import React from 'react';
import {
  Col, Row, Container
} from 'reactstrap';
import './404.scss';
import { withRouter } from 'react-router-dom';
import { IMAGES } from '../locales/images';

const NotFound = () => (
  <React.Fragment>
    <Container fluid className="page-not-found">
      <Row>
        <Col lg="12" md="12" className="img-container">
          {/* <div className="">
            <h1 className="text-center pb-5 font-">SORRY</h1>
            <h3 className="pb-2 pl-2">We were unable to find the page you are looking for.</h3>
            <input type="text" value=""
            name="s" id="s" className="main-search-input w-100"
            placeholder="Search from 150+ experts-made courses" />
            <div className=" d-flex mt-2 mb-3 justify-content-between">
              <p>DevOps</p>
              <p>Aws</p>
              <p>Microsoft Azure</p>
              <p>Google Cloud</p>
              <p>Python</p>
            </div>
            <div className="courses text-center">
              <add type="button">Browse courses</add>
            </div>
          </div> */}
          <a href="/">GO TO HOME</a>
          <img src={`${IMAGES.NOTFOUND}`} alt="unknown" className="img-fluid my-3" />
        </Col>
      </Row>
    </Container>
  </React.Fragment>
)

export default withRouter(NotFound);
