import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Container, Modal } from 'reactstrap';
import { useLocation } from 'react-router-dom'
import SpecialOfferForm from '../CRMLeadForms/SpecialOfferForm';
import { IMAGES } from '../locales/images';

const SpecialOffer = ({ handleSpecialOfferClose }) => {
  const [modalOpen, setModalFlag] = useState(false);

  const handleSpecialOffer = () => {
    setModalFlag(true)
  }
  const handleFormClose = () => {
    setModalFlag(false)
  }

  const showBanner = () => {
    const { pathname } = useLocation();
    return !pathname.startsWith('/class-room/')
  }

  return (
    <div className={showBanner() ? 'special-offer-container d-flex' : 'd-none'}>
      <Container>
        <div className="d-block d-md-flex flex-vertical-center">
          <h2 className="text-white text-center mb-0">
            {/* <img src={IMAGES.INDIAN_FLAG} alt="indian flag" style={{ height: 50 }} /> */}
            <embed
              src={IMAGES.INDIA_FLAG}
              height="40"
              type="image/svg+xml"
              className="align-middle mr-2"
            />
            <span className="flag-text text-center">
              Independence Day Special Offer
            </span>
          </h2>
          <div className="text-center mb-2 mb-md-0 flex-vertical-center">
            <h2 className="text-white mr-4">
              <span className="mx-2">
              -
              </span>
              <span className="text-uppercase">
              up to 35% off
              </span>
            </h2>
            <button className="btn btn-sm btn-theme" type="button" onClick={() => handleSpecialOffer()}>
            Grab Now
            </button>
          </div>

        </div>
      </Container>
      <span className="special-offer-close text-white mx-2 c-p">
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={() => handleSpecialOfferClose()}
        />
      </span>

      <Modal
        isOpen={modalOpen}
        toggle="true"
        className="modal-dialog-centered"
        data-backdrop="static"
      >
        <SpecialOfferForm handleClose={() => handleFormClose()} source="special_offer" />
      </Modal>
    </div>

  )
}

SpecialOffer.propTypes = {
  handleSpecialOfferClose: PropTypes.func.isRequired
}

export default SpecialOffer;
