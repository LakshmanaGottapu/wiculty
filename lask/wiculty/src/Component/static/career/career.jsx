import React, { useState, useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { Row, Col, Container } from 'reactstrap';
import CarerrAtWiculty from './careerAtWiculty';
import CurrentOpening from './currentOpening';
import ContactPopUp from './careerPopUp';
import SeoContentComp from '../../common/seoContentComp';

import './career.scss';
import { IMAGES } from '../../locales/images';

function Career (props) {
  const [modalOpen, setPopFlag] = useState(false);
  const [appliedFor, setAppliedFor] = useState('')

  useEffect(() => {
    window.scroll(0, 0);
  }, [])

  function handlePopUp () {
    setPopFlag(true)
  }

  function handlePopUpDismiss () {
    setPopFlag(false)
  }

  function handleWicultyOpening (openingName) {
    handlePopUp();
    setAppliedFor(openingName);
  }

  function handleWicultyCareer () {
    handlePopUp();
    setAppliedFor('');
  }

  const tagManagerArgs = {
    dataLayer: {
      userProject: 'Wiculty',
      page: 'Careers',
      url: window.location.href
    },
    dataLayerName: 'PageDataLayer'
  }

  TagManager.dataLayer(tagManagerArgs);

  return (
    <React.Fragment>
      <SeoContentComp seoKey="careers" />
      <div className="career-conatiner">
        <Row>
          <Col lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
            <div className="header-section" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.CAREER_BANNER})` }}>
              <div className="banner px-4 d-none">
                <h1 className="wicultythemeColor">
                  {'Wiculty Career'}
                </h1>
                <h2 className="career-sub-head">
                  {'Yet another cruise on training market along your job voyage'}
                  <br />
                  {'Land in potential career shores'}
                </h2>
              </div>
            </div>
            <Container>
              <Row className="section-gap">
                <Col sm="12">
                  <h2 className="text-center">
                    {'Why to pitch your career foot @Wiculty'}
                  </h2>
                </Col>
                <Col sm="12" className="content-gap">
                  <CarerrAtWiculty
                    modalOpen={modalOpen}
                    handlePopUp={() => handlePopUp()}
                    handleWicultyCareer={() => handleWicultyCareer()}
                  />
                </Col>
                <Col sm="12" className="content-gap">
                  <CurrentOpening
                    handleWicultyOpening={openingName => handleWicultyOpening(openingName)}
                    handlePopUp={() => handlePopUp()}
                  />
                </Col>
              </Row>
            </Container>
            <Container fluid className="bg-section-graident career-banner section-gap">
              <Row className="pt-4 text-center">
                <Col sm="12">
                  <h2 className="text-center bold">Wiculty Careers</h2>
                </Col>
                <Col sm="12" className="content-gap">
                  <h5>
                    {'Desperate to break open a massive career path?'}
                  </h5>
                  <h5 className="mt-2">
                    {'Wanna take a sturdy leap into a growing industry?'}
                  </h5>
                  <div className="mt-4 text-center">
                    <button
                      className="btn btn-theme rounded-pill mt-4 btn-lg"
                      type="button"
                      onClick={() => handleWicultyOpening('')}
                    >
                      {'Join Wiculty'}
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
            <ContactPopUp
              modalOpen={modalOpen}
              applied_for={appliedFor}
              handlePopUp={() => handlePopUp()}
              handlePopUpDismiss={() => handlePopUpDismiss()}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Career;
