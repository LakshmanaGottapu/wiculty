import React, { useState } from 'react';
import { Modal } from 'reactstrap';
import DateCountdown from 'react-date-countdown-timer';
import PropTypes from 'prop-types';

import SpecialOfferForm from './SpecialOfferForm';
import { IMAGES } from '../locales/images';

const SpecialOfferCard = ({ course }) => {
  const [modalOpen, setModalFlag] = useState(false);

  const handleSpecialOffer = () => {
    setModalFlag(true)
  }
  const handleFormClose = () => {
    setModalFlag(false)
  }
  const end_date = '2020-08-15T05:33:00.000Z'
  const independenceOfferUSPs = [
    'Internationally Recognised Courses with a professional certificate.',
    'Industry- Woven Curriculum',
    'Lifetime access to the course materials & class recordings through LMS.',
    '24*7 Student Support',
    'Live Instructor-led Hands-on Training',
    'Real-time Project works',
    '100% Job Assistance post-course completion.'

  ]
  return (
    <>
      <div className="special_offer_card p-3 py-4 shadow rounded">
        <h2 className="text-white mb-3 text-center">
          <embed
            src={IMAGES.INDIA_FLAG}
            height="30"
            type="image/svg+xml"
            className="align-middle mr-2"
          />
          <span className="flag-text text-center">
              Independence Day Special Offer
          </span>
          <p className="text-capitalize mt-2">
              celebrate the joy freedom
          </p>
        </h2>
        <div className="d-flex justify-content-center">
          {/* <embed
            src={IMAGES.SPECIAL_OFFER}
            height="30"
            type="image/svg+xml"
            className="align-middle mr-2"
          /> */}
          <img
            src={IMAGES.SPECIAL_OFFER}
            alt="independence special offer"
            style={{ width: 250 }}
            className="bg-white"
          />
        </div>
        <hr className="border-white" />
        <div className="my-4 text-white">
          <ul>
            {independenceOfferUSPs.map(USPItem => (
              <li className="mt-2">
                {USPItem}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-center text-white offer_count">
          <p className="text-capitalize text-white pr-2 mb-3">
            <b>
                LIMITED PERIOD OFFER
            </b>
          </p>
          <DateCountdown className="pt-4 text-white" dateTo={end_date} callback={() => {}} mostSignificantFigure="day" />
        </div>
        <div className="text-center mt-2">
          <button className="btn btn-md btn-theme my-2" type="button" onClick={() => handleSpecialOffer()}>
            Grab Now
          </button>
        </div>

        <Modal
          isOpen={modalOpen}
          toggle="true"
          className="modal-dialog-centered"
          data-backdrop="static"
        >
          <SpecialOfferForm
            handleClose={() => handleFormClose()}
            source="special_offer"
            isCourseDD={false}
            course={course}
          />
        </Modal>
      </div>
    </>
  )
}

SpecialOfferCard.propTypes = {
  course: PropTypes.string.isRequired
};

export default SpecialOfferCard;
