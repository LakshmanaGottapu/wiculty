import React, { Component } from 'react';
import {
  Container, Row, Col, Modal, Button
} from 'reactstrap';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import GetStarted from '../registration/getStarted';
import doubleChevron from '../../img/Arrow-Pop.png';
import authService from '../../services/authService';
import Marketingcards from './marketingcards';
import './marketing.scss';
import { homePageCounter, homePage } from '../staticJson';

class MarketigTagFirstSec extends Component {
  constructor (props) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      modal: false
    };
  }

  getStarted () {
    this.setState({
      modal: true
    });
  }

  register () {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleClose () {
    this.setState({
      modal: false
    });
  }

  render () {
    const {
      modal
    } = this.state;

    return (
      <React.Fragment>
        <Container fluid className="marketigTagFirstSec mt-4 justify-content-center">
          <Row>
            <Col lg="12" style={{ padding: 0 }}>
              <h1 className="text-heading text-center font-weight-bold pt-4">START TO SUCCESS</h1>
              <h2 className="text-dark text-center font-weight-bold">Achieve Your Goals With Wiculty</h2>
              <div className="marketingStripe display-flex Container">
                {!authService.isAuthenticated() && (
                  <div className="down-arrow d-none">
                    <img src={doubleChevron} alt="down-arrow" />
                  </div>
                )}
                <div className="outer display-flex justify-content-center mt-4">
                  {/* <div className="inner_1">
                    <h6 className="firstsecTag">Witness Wicultys </h6>
                    <h6 className="firstsecTag">up here</h6>
                  </div> */}
                  <div className="inner_2 display-flex Container">
                    {homePageCounter.map(item => (
                      <div className="chracterSec">
                        <div className="count display-flex  justify-content-center">
                          <div className="d-none d-lg-block text_color">
                            <CountUp end={item.value} duration={5} />
                            +
                          </div>
                          <div className="d-block d-lg-none text-color">
                            {item.value}
                            +
                          </div>
                        </div>
                        <h6 className="text text-center text-dark">
                          {item.text}
                        </h6>
                      </div>
                    ))}
                    {!authService.isAuthenticated() && (
                      <div className="register chracterSec d-none" role="button" tabIndex={0} onKeyPress={() => { }} onClick={() => this.getStarted()}>
                        {/* <h6 className="text">Be a part of this</h6> */}
                        <h6 className="register-text wicultythemeColor">GET STARTED</h6>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Modal
            isOpen={modal}
            toggle={this.register}
            className="modal-dialog-centered"
            data-backdrop="static"
          >
            <GetStarted
              onRegister={this.register}
              callSignIn={() => this.signIn()}
              handleClose={() => this.handleClose()}
            />
          </Modal>
          <div className=" p-0 mt-3">
            <Row className="nurture-tools-container justify-content-center image_include">
              {homePage.map(nurtureItem => (
                <Col lg="5" sm="12" md="5" className="">
                  <img src={nurtureItem.image} alt="Certificate 1" className="img" style={{ width: 600 }} />
                  <div className="text-dark d-flex align-self-center centered">
                    <div key={`s-${nurtureItem.Id}`}>
                      <div className="d-flex justify-content-center">
                        <div className="pt-5">
                          <h2 className="pt-4 font-weight-bold">
                            {nurtureItem.duration}
                          </h2>
                          <div className="pt-2">
                            <span className="">
                              {nurtureItem.cardscontent}
                            </span>
                          </div>
                          <div className="wfb-footer mt-3">
                            <Link to="/homepage">
                              <Button className="btn btn-theme btn-sm">Explore Now</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
        <div>
          <Marketingcards />
        </div>
      </React.Fragment>
    );
  }
}

export default MarketigTagFirstSec;
