import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import InfiniteCarousel from 'react-leaf-carousel';
import Career from './career';
import { IMAGES } from '../../locales/images';
import './corapatarining.scss';

export default function Corapatarining () {
  return (
    <>
      <Container fluid className="justify-content-center p-0">
        <Container className="mt-4 Container">
          <h2 className="mt-4 text-center font-weight-bold">Wiculty Bussiness</h2>
          <Row>
            <Col md="8" lg="8" sm="12" className="p-0">
              <img src={IMAGES.CORAPATARINING_BANNER} className="img upper-section height d-none d-sm-block" alt="images" />
            </Col>
            <Col md="4" lg="4" sm="12" className="text-dark d-flex align-self-center p-0">
              <div className="text-center d-flex">
                <div className="">
                  <h2 className="title font-weight-bold">Enterprise Training Solutions</h2>
                  <p>How to optimise the tech skills of your Employees??</p>
                  <p>Leave it to us! We know the pulse of corporate training</p>
                  <button type="button" className="btn btn-md rounded-pill mt-3 pl-5 pr-5 p-2 btn-theme">
                    {'Start Refer'}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="background-light p-4">
          <Row>
            <Col lg="2" sm="12" md="2" className="align-self-center text-center">
              <div>
                <p className="font-weight-bold text-white" style={{ fontSize: '26px' }}>
                  {'Corporate Clients'}
                  <br />
                  {'Around the Globe'}
                </p>
              </div>
            </Col>
            <Col lg="10" sm="12" md="10">
              <div className="">
                <InfiniteCarousel
                  breakpoints={[
                    {
                      breakpoint: 500,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                      }
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]}
                  showSides
                  sidesOpacity={0.5}
                  sideSize={0.1}
                  slidesToScroll={5}
                  slidesToShow={5}
                  autoScroll
                >
                  <div className="ml-3">
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/1.png"
                      style={{ height: '100px', width: 'auto' }}
                      className="ml-4"
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/2.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/3.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/4.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/5.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/6.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/7.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/8.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/9.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/10.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/11.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/12.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/13.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  {/* <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/14.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div> */}
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/15.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/16.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/17.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/18.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/19.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/20.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/21.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/22.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                  <div>
                    <img
                      alt=""
                      src="https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/Clients/23.png"
                      style={{ height: '100px', width: 'auto' }}
                    />
                  </div>
                </InfiniteCarousel>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <div>
        <Career />
      </div>
    </>
  );
}
