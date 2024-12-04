import React, { Component } from 'react';
import TagManager from 'react-gtm-module';
import SeoContentComp from '../common/seoContentComp';
import PrivacyComponent from './privacyComponent';
import './static.scss'

class PrivacyPolicy extends Component {
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
        page: 'Privacy Policy',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);

    return (
      <React.Fragment>
        <SeoContentComp seoKey="privacy-policy" />
        <div className="privacy-policy p-4">
          <div className="container bg-shadow step-border bg-white rounded p-3 px-md-5 py-md-4">
            <h1 className="text-center mb-3 mb-md-4">Privacy Policy</h1>
            <div className="container bg-shadow step-border bg-white rounded p-4">
              <PrivacyComponent />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PrivacyPolicy;
