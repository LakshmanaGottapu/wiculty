import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagManager from 'react-gtm-module';
import { Helmet } from 'react-helmet';
import {
  Container, Row, Col
} from 'reactstrap';
import sf from '../common/safeTraverse';
import { getBannerMarginTop } from '../common/utilFunctions/utilFunction';

class Disclaimer extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    window.scroll(0, 0);
  }

  render () {
    const {
      seoContent
    } = this.props;
    const DisclaimerSeo = sf(seoContent, ['data', 'data', 'disclaimer']) || {};

    const {
      meta_title,
      meta_keyword,
      meta_description
    } = DisclaimerSeo;

    const tagManagerArgs = {
      dataLayer: {
        userProject: 'Wiculty',
        page: 'Disclaimer',
        url: window.location.href
      },
      dataLayerName: 'PageDataLayer'
    }

    TagManager.dataLayer(tagManagerArgs);

    return (
      <React.Fragment>
        <Helmet>
          <title>{meta_title}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={meta_description} />
          <meta name="keywords" content={meta_keyword} />
        </Helmet>
        <Container fluid className="allCourses" style={{ marginTop: getBannerMarginTop(100, -20) }}>
          <Col lg="12">
            <Row className="staticRow">
              <h1>Disclaimer</h1>
            </Row>
          </Col>
        </Container>
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  seoContent: state.seoContent
});

Disclaimer.propTypes = {
  seoContent: PropTypes.isRequired
};

export default withRouter(connect(mapStateToProps, null)(Disclaimer));
