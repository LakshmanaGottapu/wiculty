import React, { useState } from 'react';
import { Col, Row, Modal } from 'reactstrap';
import NurtureTools from './nurtureTools';
import FreeDemo from '../../registration/freeDemo';
import { nurtuteToolsJSON } from '../../staticJson'
import './nurtureComp.scss';

const NurtureComp = (params) => {
  const [modalOpen, setModalFlag] = useState(false);

  const handleFreeDemo = () => {
    setModalFlag(true)
  }
  const handleClose = () => {
    setModalFlag(false)
  }
  return (
    <div className="nurture-container">
      <Row className="nurture-heading">
        <Col lg="1">
          {''}
        </Col>
        <Col lg="10" className="heading-text">
          <div className="divider" />
          <h2 className="mb-2">
            {'Wiculty Analyse | Nurture the Solitary Expert Inside You'}
          </h2>
          <h5 className="font-weight-normal">
            {'Try to witness the widespread of learning experience with Wiculty that eventually shape your career in better mode - purely focused on practical skill inculcation'}
          </h5>
        </Col>
      </Row>
      <Row className="nurture-body">
        <Col lg="1">
          {''}
        </Col>
        <Col lg="10">
          <NurtureTools nurtuteToolsJSON={nurtuteToolsJSON} />
        </Col>
      </Row>
      <Row className="nurture-footer">
        <Col Col lg="1" md="12" sm="12">
          {''}
        </Col>
        <Col Col lg="4" md="12" sm="12">
          <hr />
        </Col>
        <Col className="nurture-download" Col lg="2" md="12" sm="12">
          <button className="btn btn-theme btn-md rounded-pill" type="button" onClick={() => handleFreeDemo()}>Pick our course</button>
        </Col>
        <Col Col lg="4" md="12" sm="12">
          <hr />
        </Col>
      </Row>
      <Modal
        isOpen={modalOpen}
        toggle="true"
        className="modal-dialog-centered"
        data-backdrop="static"
      >
        <FreeDemo handleClose={() => handleClose()} source="PickAcourse" />
      </Modal>
    </div>
  )
}

export default NurtureComp;
