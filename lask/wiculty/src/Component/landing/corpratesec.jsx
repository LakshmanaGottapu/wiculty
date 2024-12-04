/* eslint-disable */
import React,{ Component } from 'react';
import { Container, } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import {IMAGES} from '../locales/images';

class CorprateSec extends Component{
    render(){
        return(
            <React.Fragment>
                <Container className="text-center">
                    <h2>Wiculty For Business</h2>
                </Container>
                <div fluid className="wiculty-for-business mt-4">
                    <img data-src={IMAGES.HOME_BUSINESS} className="img img-fluid wfb-img lazyload" />
                    <div className="pitchHolderInner corprateSec">
                        <div className="coraprateContAlgn text-light">
                            <h5 className="title">Still in Perplexion?</h5>
                            <p>How to optimise the tech skills of your Employees??</p>
                            <p>Leave it to us! We know the pulse of corporate training</p>
                            <div className="wfb-footer">
                                <Link to="/corporate-training">
                                    <button className="btn btn-md btn-theme">Explore Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(CorprateSec);
