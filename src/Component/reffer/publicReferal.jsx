import React from 'react';
import {
  Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import SeoContentComp from '../common/seoContentComp';
import { IMAGES } from '../locales/images';
import { referalJSON, referralFAQs } from '../staticJson'
import './reffer.scss';

const PublicReferal = ({ history }) => {
  const handleRefer = () => {
    history.push('/my-referal')
  }
  return (
    <>
      <SeoContentComp seoKey="reffer-earn" />
      <div>
        <div className="public-refer-banner container-fluid flex-vertical-center" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3) ), url(${IMAGES.PUBLIC_REFFERAL_BANNER})` }}>
          <div className="container p-3 text-white">
            <h1 className="m-4">Refer & Earn ! keep making 10% Instant cashback </h1>
            <p className="pl-md-5 pr-md-5">
              {`Wiculty Refer & Earn program gives an opportunity for all to refer your friends
              or colleagues to our courses! If the purchase is made through the referrer network on
              any courses, we will credit a cash reward that can be redeemed in your bank
              account instantly!`}
            </p>
            <button type="button" className="btn btn-md rounded-pill mt-3 pl-5 pr-5 p-2 btn-theme" onClick={handleRefer}>
              {'Start Refer'}
            </button>
          </div>
        </div>
        <div className="container text-center mt-3 mb-3">
          <h2 className="m-4">How it works</h2>
          <p className="m-4">It`s super easy to refer a friend.Give it a go!</p>
          <Row>
            {referalJSON.map(referItem => (
              <Col sm="12" md="3" className="hover-card">
                <FontAwesomeIcon
                  icon={referItem.icon}
                  className="fa-icon-size fa-icon-color m-2"
                />
                <h3 className="m-4">
                  {referItem.Title}
                </h3>
                <p>
                  {referItem.Desc}
                </p>
              </Col>
            ))}
          </Row>
        </div>
        <div className="container mt-4 mb-3">
          <h2 className="m-4 text-center">FAQ`s</h2>
          <p className="m-4 text-center">Get all your queries resolved here about the program</p>
          <ul>
            {referralFAQs.map(referItem => (
              <li sm="12" md="12" className="hover-card p-3">
                <h3 className="mt-2">
                  {referItem.Title}
                </h3>
                <p>
                  {referItem.Desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
PublicReferal.propTypes = {
  history: PropTypes.isRequired
}

export default PublicReferal;
