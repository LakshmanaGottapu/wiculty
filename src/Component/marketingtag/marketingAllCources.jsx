/* eslint-disable */
import React,{ Component } from 'react';
import { Container, Modal } from 'reactstrap';
import Callback from '../registration/callback';
import { IMAGES } from '../locales/images';

class MarketingAllCources extends Component{

  constructor (props) {
    super(props);
    this.state = {
    isOpen: false   
    };
  }

  freeDemo () {
    this.setState({
    isOpen: true
    });
  }

  handleClose () {
    this.setState({
    isOpen: false
    });
  }

  render() {
    const { isOpen } = this.state;
    return(
        <React.Fragment>
            <Container fluid className="marketingTagThirdSec">
                    <p className="freeDemo">
                        {'Our courses would drive your interest for sure! Dont wait - Get clarity from our wiculat right now'}
                        <button className="btn btn-sm btn-primary callback" onClick={() => this.freeDemo()}>Request a Call Back</button>
                    </p>
            </Container>

            <Container fluid className="padding0 tac">
                <img src={`${IMAGES.SNEAK_PEAK}`} alt="allCources" className="img-fluid" />
            </Container>
            <Modal
              isOpen={isOpen}
              toggle="true"
              className="modal-dialog-centered"
              data-backdrop="static"
            >
            <Callback handleClose={() => this.handleClose()} />
            </Modal>
        </React.Fragment>
    );
  }
}

export default MarketingAllCources; 
