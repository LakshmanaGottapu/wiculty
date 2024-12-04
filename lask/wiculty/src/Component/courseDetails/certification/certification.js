import React, { useState } from 'react';
import { Row, Col, Button } from 'reactstrap';
import PropTypes from 'prop-types';

import { IMAGES } from '../../locales/images';
import Accordion from '../../common/accordians/accordian';
import AssetModal from '../../common/modals/assetModal';
import './certification.scss';

const CertificateComp = ({ certificationDetails, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  function onModalClose () {
    setIsOpen(false);
  }

  return (
    <div className="certificate-menu-container container mt-4">
      <h2>
        {title}
      </h2>
      <Row className="certificate-container">
        <Col className="box-shadow" lg={{ size: 12 }} md={{ size: 12 }} xs={{ size: 12 }}>
          <Row>
            <Col className="flex-vertical-center" lg={{ size: 6 }} md={{ size: 12 }} xs={{ size: 12 }} style={{ textAlign: 'center' }}>
              <div>
                <img src={`${IMAGES.WICULTYCERT}`} alt="certificate" className="img-fluid" />
                <Button color="link" onClick={() => setIsOpen(true)}>
                  Click to Zoom
                </Button>
              </div>
            </Col>
            <Col lg={{ size: 6 }} md={{ size: 12 }} xs={{ size: 12 }}>
              <Accordion
                tabArray={certificationDetails}
                openFirst
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <AssetModal
        type="image"
        src={IMAGES.WICULTYCERT}
        showModal={isOpen}
        showSupport={false}
        onModalClose={onModalClose}
      />
    </div>
  )
}
CertificateComp.propTypes = {
  certificationDetails: PropTypes.isRequired,
  title: PropTypes.string.isRequired
};

export default CertificateComp;
