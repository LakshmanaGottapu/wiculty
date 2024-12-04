import React from 'react';
import {
  Row, Col
} from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faLightbulb,
  faSignal,
  faQuestion,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

import './career.scss';

export default function CarerrAtWiculty ({ handlePopUp }) {
  return (
    <Row>
      <Col className="career-wiculty-container">
        <div className="pitchHolderInner first flex-box-class box hover-card-right">
          <div className="career-wiculty-img-left">
            <FontAwesomeIcon icon={faBriefcase} className="fa-icon-size" />
          </div>
          <div className="career-wiculty-content">
            <div className="career-wiculty-title">
              <h5>
                When you questioned about our&nbsp;
                <strong>WORK CULTURE</strong>
                &nbsp;| &nbsp;
              </h5>
              <p>
                <i>
                  We will shout out the definition of workculture with us here!
                </i>
              </p>
            </div>
            <p className="career-wiculty-body">
              {'A work ambiance under the positive spell of free liquid-motion culture. Work in your style and inspiration by delivering us the best results. We`ll take care of your work-life balance, which in turn pitch great virtues to proceed. Our motto is to amuse in whatever you do, pairing it with professionalism inside the apiary of motivation-driven peer culture as bumblebees.'}
            </p>
          </div>
        </div>
        <div className="pitchHolderInner first flex-box-class box hover-card-right">
          <div className="career-wiculty-content">
            <div className="career-wiculty-title">
              <h5>
                When you are curious about our&nbsp;
                <strong>FREEDOM OF IDEATION</strong>
                &nbsp;| &nbsp;
              </h5>
              <p>
                <i>
                  Feel free to play with your skills in anything you do! Without that,
                  it`s hard to nurture the business!
                </i>
              </p>
            </div>
            <p className="career-wiculty-body">
              {'Everyone has their unique innate talents and ideas which can`t be skipped along with our growth. Break the reluctant zone to inject ideas and creativity in work assigned to you. Accomplish your deliverables tapping the shell. Wiculty values your expertise & strategies that can leverage results-oriented objectives.'}
            </p>
          </div>
          <div className="career-wiculty-img-right">
            <FontAwesomeIcon icon={faLightbulb} className="fa-icon-size" />
          </div>
        </div>
        <div className="pitchHolderInner first flex-box-class box hover-card-right">
          <div className="career-wiculty-img-left">
            <FontAwesomeIcon icon={faSignal} className="fa-icon-size" />
          </div>
          <div className="career-wiculty-content">
            <div className="career-wiculty-title">
              <h5>
                When someone questions on your&nbsp;
                <strong>CAREER GROWTH</strong>
                &nbsp;| &nbsp;
              </h5>
              <p>
                <i>
                  They will soon witness it from your growth with us.
                </i>
              </p>
            </div>
            <p className="career-wiculty-body">
              {'Wiculty`s career path is designed to touch higher destinations. We keep track of your excellence & hard-tied commitment with every chunk of work to honor with gratitude via promotions and pay-hikes. Your growth is proportional to the growth of Wiculty. Let that adrenalin rush pave a bright path along the career journey.'}
            </p>
          </div>
        </div>
        <div className="pitchHolderInner first flex-box-class box hover-card-right">
          <div className="career-wiculty-content">
            <div className="career-wiculty-title">
              <h5>
                When someone questions on your own&nbsp;
                <strong>LEARNING CURVE</strong>
                &nbsp;| &nbsp;
              </h5>
              <p>
                <i>
                  { `Being in the service of
                  lightning our learners, how come we'll put you in dark!
                  Get a wide chance to upskill everyday.` }
                </i>
              </p>
            </div>
            <p className="career-wiculty-body">
              {'Your learning curve boost automatically infused with new working methods, potential work approaches that possess the work bay every day. Let’s go offbeat when it comes to internal learning via mentoring sessions & teach backs to shoot up productivity by the easiness of work. Learned something interesting and new every day with Wiculty.'}
            </p>
          </div>
          <div className="career-wiculty-img-right">
            <FontAwesomeIcon icon={faQuestion} className="fa-icon-size" />
          </div>
        </div>
        <div className="pitchHolderInner first flex-box-class box hover-card-right">
          <div className="career-wiculty-img-left">
            <FontAwesomeIcon icon={faGlobe} className="fa-icon-size" />
          </div>
          <div className="career-wiculty-content">
            <div className="career-wiculty-title">
              <h5>
                When you desperately want to experience&nbsp;
                <strong>GLOBAL EXPOSURE</strong>
                &nbsp;| &nbsp;
              </h5>
              <p>
                <i>
                  Ofcourse our connecting twig always stretches across the globe, we believe
                  in global expansion while exploring globalwisdom
                </i>
              </p>
            </div>
            <p className="career-wiculty-body">
              {'Learning doesn`t have language barriers. You will get a chance to meddle up with wisdom winds in all directions, get massive boon to collaborate & exchange knowledge through our international instructors and learners to open paths for interaction-centered service delivery of courses and support - mutant soon to become a global bird at Wiculty!'}
            </p>
          </div>
        </div>
      </Col>
    </Row>
  )
}

CarerrAtWiculty.propTypes = {
  handlePopUp: PropTypes.func.isRequired
};
