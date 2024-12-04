import React from 'react';
import { Row, Col } from 'reactstrap';
import Container from 'reactstrap/lib/Container';
import { IMAGES } from '../locales/images';
import './subscription.scss';
import Afterorder from './afterorder';

const reviewJSON = [
  {
    title: '3 Months',
    desc: '100',
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/veda.png',
    Centered: 'I am quite happy with Gamutguru’s pay after placement services, the trainers were exceptional and made all the concepts seem very simple and made my life way easier. The curriculum maintained is the latest and makes sure every learner is aware of the latest trends and techniques of the industry'
  },
  {
    title: '3 Months',
    desc: '100',
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/sasi.png',
    Centered: 'The trainers and staff of Gamutgurus are quite helpful and if you ever approach them with any query, they make you understand the concepts immediately. I am quite happy with their services and would suggest my friends join for the same.'
  },
  {
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/subbu.png',
    Centered: 'Always go for ggpap if you want to learn something related to the IT industry, I enrolled myself a few months back into this program as I had got very good reviews. And now that I am done with the program I can completely agree with those reviews, their entire curriculum is very thorough and is inclusive'
  },
  {
    imgs: 'https://test-gamutgurus.s3.ap-south-1.amazonaws.com/temp/vamsi.png',
    Centered: 'I completed the pay after placement program from Gamutgurus and I have asked a few of my friends also to join the program as well. The trainers and support staff have been very helpful throughout my learning journey and whenever I had a roadblock, the support staff was available 24x7.'
  }
]

const Review = () => (
  <div>
    <Container className="p-0 m-0">
      <h2 className="h1 mb-3 pt-4 text-center">
        {'Reviews'}
      </h2>
      <Row>
        {reviewJSON.map(({ imgs, Centered, month }) => (
          <Col xs="12" sm="6" lg="6" md="6" className="p-0 m-0 container">
            <Row className="p-0 m-0">
              <Col className="p-0 m-0">
                <div>
                  <div className="cont">
                    <img src={imgs} alt="tram" />
                    <div className="centeredes">{Centered}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
      <Container className="justify-content-center p-0">
        <Container className="m-4 Container">
          <Row className="mt-2 justify-content-center d-flex text-center">
            <Col sm="8" md="12" lg="12" className="feature-section card shadow-lg">
              <Row>
                <Col sm="12" md="9" lg="9" className="align-self-center">
                  <h2 className="font-weight-bold font_size">Try Wiculty Membership Today!</h2>
                  <div className="">
                    <button type="button" className="btn btn-md rounded-pill mt-3 pl-5 pr-5 p-2 btn-theme align-self-left d-flex justify-content-center">
                      {'Start Refer'}
                    </button>
                  </div>
                </Col>
                <Col sm="12" md="3" lg="3">
                  <img src={IMAGES.SUB_IMAGE} className="img" alt="images" style={{ height: '200px' }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>

    </Container>
    <div>
      <Afterorder />
    </div>

  </div>
)

export default Review;
