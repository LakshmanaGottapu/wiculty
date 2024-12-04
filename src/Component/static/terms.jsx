import React, { Component } from 'react';
import TagManager from 'react-gtm-module';
import './static.scss';
import SeoContentComp from '../common/seoContentComp';
import TermsComponent from './termsComponent';

class TermsAndConditions extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    window.scroll(0, 0);
  }

  render () {
    const tagManagerArgs = {
      dataLayer: {
        userProject: 'Wiculty',
        page: 'Terms and Conditions',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);

    return (
      <React.Fragment>
        <SeoContentComp seoKey="terms-conditions" />
        <div className="terms-conditions p-4">
          <div className="container  bg-shadow step-border bg-white rounded p-3 px-md-5 py-md-4">
            <h1 className="text-center mb-3 mb-md-4">Terms and Conditions</h1>
            <div className="container  bg-shadow step-border bg-white rounded p-4">
              <div className="termsBody">
                <TermsComponent />
              </div>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default TermsAndConditions;
